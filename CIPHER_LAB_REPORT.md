# SHRI MADHWA VADIRAJA INSTITUTE OF TECHNOLOGY AND MANAGEMENT
### (A Unit of Shri Sode Vadiraja Mutt Education Trust ®)
**Vishwothama Nagar, BANTAKAL – 574 115, Udupi District, Karnataka**  
*Accredited by NAAC with 'A' Grade | Recognized by AICTE | Affiliated to VTU, Belagavi*

---

## DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING

| Academic Record | Details |
| :--- | :--- |
| **Course Title** | Cryptography and Network Security |
| **Course Code** | BCS703 |
| **Semester / Year** | VII Semester / IV Year B.E. |
| **Academic Year** | 2026 – 2027 |
| **Project / Assignment Title** | **CIPHER: Design and Implementation of Monoalphabetic Substitution Cipher** |

---

### **Submitted By:**
1. **Name:** ___________________________ &emsp; **USN:** 4MW22CS______  
2. **Name:** ___________________________ &emsp; **USN:** 4MW22CS______  

### **Submitted To:**
**Mrs. Sowmya NH**  
Senior Assistant Professor  
Department of Computer Science & Engineering  
Shri Madhwa Vadiraja Institute of Technology and Management, Bantakal – 574115  

---

## 1. AIM
To design, implement, and analyze a classical **Monoalphabetic Substitution Cipher** using Python, verify its encryption and decryption workflows using a 26-character permutation key (`QWERTYUIOPASDFGHJKLZXCVBNM`), validate the implementation against the standard **Virtual Labs Cryptography Simulation Platform**, and evaluate its cryptographic strength and vulnerabilities against statistical cryptanalysis.

---

## 2. THEORY

### 2.1 Principle of Substitution Ciphers
In classical cryptography, a cipher is an algorithm for performing encryption and decryption. Classical ciphers fall into two broad categories:
1. **Transposition Ciphers:** The positions held by plaintext units are shifted according to a regular system, while keeping the identity of characters intact.
2. **Substitution Ciphers:** Plaintext units (single letters, pairs of letters, or groups) are systematically replaced with ciphertext units according to a defined key.

A **Monoalphabetic Cipher** (also known as a simple substitution cipher) is a substitution cipher in which a single, fixed substitution character replaces each occurrence of a given character throughout the entire message.

### 2.2 Mathematical Formulation
Let the standard plaintext alphabet be defined as an ordered finite set:
$$\mathcal{P} = \{A, B, C, \dots, Z\}, \quad |\mathcal{P}| = n = 26$$

Let the ciphertext alphabet be defined as:
$$\mathcal{C} = \{c_1, c_2, \dots, c_{26}\}$$

A key $K$ represents a bijective (one-to-one and onto) mapping function:
$$f_K: \mathcal{P} \to \mathcal{C}$$

#### 1. Encryption Transformation:
For any plaintext string $M = (m_1, m_2, \dots, m_L)$ where $m_i \in \mathcal{P}$:
$$E_K(m_i) = f_K(m_i) = c_i$$
Non-alphabetic characters (e.g., whitespace, punctuation marks, digits) remain invariant under the transformation:
$$E_K(x) = x, \quad \forall x \notin \mathcal{P}$$

#### 2. Decryption Transformation:
Because $f_K$ is a bijection, there exists a unique inverse mapping $f_K^{-1}$:
$$f_K^{-1}: \mathcal{C} \to \mathcal{P}$$
For any ciphertext string $C = (c_1, c_2, \dots, c_L)$ where $c_i \in \mathcal{C}$:
$$D_K(c_i) = f_K^{-1}(c_i) = m_i$$
This guarantees the fundamental cryptographic correctness invariant:
$$D_K(E_K(M)) = M$$

---

### 2.3 Substitution Key Mapping Scheme
In this implementation, the shared key is a 26-character string representing the standard **QWERTY layout permutation**:
$$\text{Key } K = \texttt{"QWERTYUIOPASDFGHJKLZXCVBNM"}$$

The one-to-one character mapping table is constructed as follows:

| Plaintext ($P$) | A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Ciphertext ($C$)** | **Q** | **W** | **E** | **R** | **T** | **Y** | **U** | **I** | **O** | **P** | **A** | **S** | **D** | **F** | **G** | **H** | **J** | **K** | **L** | **Z** | **X** | **C** | **V** | **B** | **N** | **M** |

---

### 2.4 Cryptographic Strength and Key Space Analysis
- The key space $|\mathcal{K}|$ for a monoalphabetic cipher over the 26-letter English alphabet corresponds to the total number of permutations of 26 distinct elements:
  $$|\mathcal{K}| = 26! = 403,291,461,126,605,635,584,000,000 \approx 4.0329 \times 10^{26}$$
- Expressed in bits of entropy:
  $$H(K) = \log_2(26!) \approx 88.38 \text{ bits}$$
- **Brute-Force Resistance:** A supercomputer testing $10^{12}$ keys per second would require approximately:
  $$\frac{4.0329 \times 10^{26}}{10^{12} \times 3600 \times 24 \times 365.25} \approx 1.278 \times 10^7 \text{ years}$$
  Exhaustive key search (brute-force attack) is computationally infeasible.

### 2.5 Security Limitations: Frequency Analysis Vulnerability
Despite the astronomically large key space, monoalphabetic substitution ciphers provide **zero confusion and diffusion** (Shannon's principles):
1. **Preservation of Statistical Distributions:** Every occurrence of a given plaintext letter always maps to the exact same ciphertext letter.
2. **Frequency Cryptanalysis:** In natural English text, letters exhibit a highly non-uniform frequency distribution (e.g., `E` $\approx 12.7\%$, `T` $\approx 9.1\%$, `A` $\approx 8.2\%$, `O` $\approx 7.5\%$, `I` $\approx 7.0\%$, `N` $\approx 6.7\%$).
3. **Digram and Trigram Patterns:** Common word combinations and frequent digrams (`TH`, `HE`, `IN`, `ER`) and trigrams (`THE`, `AND`, `ING`) are completely preserved in the ciphertext, allowing an adversary to break the cipher using simple frequency counts without testing all keys.

---

## 3. PROCEDURE & ALGORITHM

### 3.1 Algorithm: Key Mapping Generation (`create_cipher_dict`)
1. **Input:** A 26-character permutation key string $K$.
2. Define the reference alphabet string: $A = \text{"ABCDEFGHIJKLMNOPQRSTUVWXYZ"}$.
3. Pair each character $A_i$ with the corresponding key character $K_i$ for $i = 0, \dots, 25$.
4. Return the key-value dictionary $D_{\text{enc}} = \{(A_i, K_i)\}$.

### 3.2 Algorithm: Encryption Workflow (`encrypt`)
1. **Input:** Plaintext string $M$, Substitution key $K$.
2. Generate the forward substitution dictionary: $D_{\text{enc}} = \text{create\_cipher\_dict}(K)$.
3. Convert all characters in $M$ to uppercase: $M \leftarrow \text{upper}(M)$.
4. Initialize an empty ciphertext accumulator: $C \leftarrow \text{""}$.
5. For each character $\text{char}$ in $M$:
   - If $\text{char} \in D_{\text{enc}}$, append $D_{\text{enc}}[\text{char}]$ to $C$.
   - Else (spaces, numbers, symbols), append $\text{char}$ unchanged to $C$.
6. Return the accumulated ciphertext string $C$.

### 3.3 Algorithm: Decryption Workflow (`decrypt`)
1. **Input:** Ciphertext string $C$, Substitution key $K$.
2. Generate the forward substitution dictionary: $D_{\text{enc}} = \text{create\_cipher\_dict}(K)$.
3. Construct the reverse lookup dictionary by inverting keys and values:
   $$D_{\text{dec}} = \{v: k \text{ for } k, v \in D_{\text{enc}}.\text{items}()\}$$
4. Convert all characters in $C$ to uppercase: $C \leftarrow \text{upper}(C)$.
5. Initialize an empty recovered plaintext accumulator: $M \leftarrow \text{""}$.
6. For each character $\text{char}$ in $C$:
   - If $\text{char} \in D_{\text{dec}}$, append $D_{\text{dec}}[\text{char}]$ to $M$.
   - Else, append $\text{char}$ unchanged to $M$.
7. Return the recovered plaintext string $M$.

---

## 4. SOURCE CODE (`1.py`)

```python
"""
=============================================================================
COURSE      : Cryptography and Network Security (BCS703)
INSTITUTION : Shri Madhwa Vadiraja Institute of Technology and Management
PROGRAM     : Implementation of Classical Monoalphabetic Substitution Cipher
FILE        : 1.py
=============================================================================
"""

import string

def create_cipher_dict(key):
    """
    Constructs a one-to-one character mapping between the standard
    uppercase English alphabet and the 26-character substitution key.
    """
    alphabet = string.ascii_uppercase
    return dict(zip(alphabet, key))

def encrypt(plaintext, key):
    """
    Encrypts plaintext by substituting each alphabetic character
    according to the forward substitution dictionary.
    Preserves whitespace, punctuation, and non-alphabetic symbols.
    """
    cipher_dict = create_cipher_dict(key)
    plaintext = plaintext.upper()
    ciphertext = ""
    for char in plaintext:
        if char in cipher_dict:
            ciphertext += cipher_dict[char]
        else:
            ciphertext += char
    return ciphertext

def decrypt(ciphertext, key):
    """
    Decrypts ciphertext by inverting the substitution dictionary
    and replacing each ciphertext character with its original plaintext letter.
    """
    cipher_dict = create_cipher_dict(key)
    reverse_dict = {v: k for k, v in cipher_dict.items()}
    ciphertext = ciphertext.upper()
    decrypted_text = ""
    for char in ciphertext:
        if char in reverse_dict:
            decrypted_text += reverse_dict[char]
        else:
            decrypted_text += char
    return decrypted_text

if __name__ == "__main__":
    # 26-character QWERTY substitution key
    key = "QWERTYUIOPASDFGHJKLZXCVBNM"
    
    print("=== Monoalphabetic Cipher ===")
    choice = input("Do you want to (E)ncrypt or (D)ecrypt? ").upper()
    
    if choice == "E":
        plaintext = input("Enter the plaintext: ")
        encrypted = encrypt(plaintext, key)
        print("\nEncrypted Text:", encrypted)
    elif choice == "D":
        ciphertext = input("Enter the ciphertext: ")
        decrypted = decrypt(ciphertext, key)
        print("\nDecrypted Text:", decrypted)
    else:
        print("Invalid choice!")
```

---

## 5. SIMULATION & EXPERIMENTAL VALIDATION

### 5.1 Virtual Labs Simulation Setup
- **Simulation Environment:** Virtual Labs (Ministry of Education, Govt. of India / Amrita Vishwa Vidyapeetham Cryptography Virtual Lab).
- **Module:** Classical Ciphers – Monoalphabetic Substitution Cipher.
- **Shared Key Configuration:**
  ```
  Substitution Key: QWERTYUIOPASDFGHJKLZXCVBNM
  ```

### 5.2 Simulation Trace & Character-by-Character Mapping

#### Part 1: Encryption Simulation
- **Plaintext Input:**
  ```
  VIRTUAL LABS IS A GREAT INITIATIVE
  ```
- **Step-by-step Substitution Derivation:**
  - `V` $\to$ **C**, `I` $\to$ **O**, `R` $\to$ **K**, `T` $\to$ **Z**, `U` $\to$ **X**, `A` $\to$ **Q**, `L` $\to$ **S** $\implies$ **`COKZXQS`**
  - *(space)* $\to$ *(space)*
  - `L` $\to$ **S**, `A` $\to$ **Q**, `B` $\to$ **W**, `S` $\to$ **L** $\implies$ **`SQWL`**
  - *(space)* $\to$ *(space)*
  - `I` $\to$ **O**, `S` $\to$ **L** $\implies$ **`OL`**
  - *(space)* $\to$ *(space)*
  - `A` $\to$ **Q** $\implies$ **`Q`**
  - *(space)* $\to$ *(space)*
  - `G` $\to$ **U**, `R` $\to$ **K**, `E` $\to$ **T**, `A` $\to$ **Q**, `T` $\to$ **Z** $\implies$ **`UKTQZ`**
  - *(space)* $\to$ *(space)*
  - `I` $\to$ **O**, `N` $\to$ **F**, `I` $\to$ **O**, `T` $\to$ **Z**, `I` $\to$ **O**, `A` $\to$ **Q**, `T` $\to$ **Z**, `I` $\to$ **O**, `V` $\to$ **C**, `E` $\to$ **T** $\implies$ **`OFOZOQZOCT`**
- **Ciphertext Output (Generated):**
  ```
  COKZXQS SQWL OL Q UKTQZ OFOZOQZOCT
  ```

#### Part 2: Decryption Simulation
- **Ciphertext Input:**
  ```
  COKZXQS SQWL OL Q UKTQZ OFOZOQZOCT
  ```
- **Reverse Mapping Application:** Each character is matched with the inverse dictionary $D_{\text{dec}}$ to restore the original plaintext.
- **Plaintext Output (Recovered):**
  ```
  VIRTUAL LABS IS A GREAT INITIATIVE
  ```

---

## 6. TERMINAL OUTPUT & TEST EXECUTION

### Test Case 1: Encryption Execution
```text
D:\crpto>python 1.py
=== Monoalphabetic Cipher ===
Do you want to (E)ncrypt or (D)ecrypt? e
Enter the plaintext: hello

Encrypted Text: ITSSG
```
**Verification Table:**
| Plaintext Character | Index in Standard Alphabet | Substitution Key Character | Ciphertext Character |
| :---: | :---: | :---: | :---: |
| `H` | 8th letter | Key[7] = `I` | **`I`** |
| `E` | 5th letter | Key[4] = `T` | **`T`** |
| `L` | 12th letter | Key[11] = `S` | **`S`** |
| `L` | 12th letter | Key[11] = `S` | **`S`** |
| `O` | 15th letter | Key[14] = `G` | **`G`** |

*Result:* `HELLO` correctly enciphers to **`ITSSG`**. Note that identical plaintext letters (`LL`) strictly produce identical ciphertext letters (`SS`), visibly demonstrating frequency preservation.

---

### Test Case 2: Decryption Execution
```text
D:\crpto>python 1.py
=== Monoalphabetic Cipher ===
Do you want to (E)ncrypt or (D)ecrypt? D
Enter the ciphertext: ITSSG

Decrypted Text: HELLO
```
**Verification Table:**
| Ciphertext Character | Position in Key (`QWERTY...`) | Matching Alphabet Character | Recovered Plaintext |
| :---: | :---: | :---: | :---: |
| `I` | Index 7 | Alphabet[7] | **`H`** |
| `T` | Index 4 | Alphabet[4] | **`E`** |
| `S` | Index 11 | Alphabet[11] | **`L`** |
| `S` | Index 11 | Alphabet[11] | **`L`** |
| `G` | Index 14 | Alphabet[14] | **`O`** |

*Result:* `ITSSG` is completely and reversibly recovered to **`HELLO`** with zero information loss ($D_K(E_K(M)) = M$).

---

## 7. COMPARATIVE CRYPTOGRAPHIC ANALYSIS

| Parameter / Feature | Monoalphabetic Cipher | Polyalphabetic Cipher (Vigenère) | Modern Block Cipher (AES-256) |
| :--- | :--- | :--- | :--- |
| **Cipher Type** | Classical Single Substitution | Classical Periodic Substitution | Modern Symmetric Block Cipher |
| **Key Size / Space** | $26! \approx 4.03 \times 10^{26}$ ($\approx 88$ bits) | $26^m$ (where $m$ = key length) | $2^{256} \approx 1.15 \times 10^{77}$ bits |
| **Letter Mapping** | One-to-one (Static bijective) | One-to-many (Dynamic shift) | Non-linear S-Box, Round Permutations |
| **Confusion & Diffusion** | None | Partial confusion; no diffusion | High confusion and high diffusion |
| **Cryptanalytic Vulnerability**| Trivially broken via **Letter Frequency Analysis** | Broken via Kasiski examination & Index of Coincidence | Immune to practical linear & differential cryptanalysis |
| **Modern Application** | Pedagogical / Historical | Pedagogical / Historical | Commercial, Military, Banking Standard |

---

## 8. CONCLUSION

1. The classical **Monoalphabetic Substitution Cipher** was successfully designed, implemented in Python (`1.py`), and experimentally validated.
2. The implementation accurately constructs a bidirectional mapping between the standard alphabet and a 26-character permutation key (`QWERTYUIOPASDFGHJKLZXCVBNM`).
3. Both encryption and decryption operations were verified on single-word inputs (`hello` $\leftrightarrow$ `ITSSG`) and multi-word sentences (`VIRTUAL LABS IS A GREAT INITIATIVE` $\leftrightarrow$ `COKZXQS SQWL OL Q UKTQZ OFOZOQZOCT`), perfectly matching the standard **Virtual Labs Cryptography Platform**.
4. The experiment proves that while a Monoalphabetic Cipher provides a vast theoretical key space ($26! \approx 4.03 \times 10^{26}$ keys) that rules out brute-force attacks, it is fundamentally insecure against **Frequency Analysis** because the statistical properties and digram/trigram patterns of the language remain completely unmasked in the ciphertext.
5. This foundational experiment illustrates the critical necessity of **Confusion and Diffusion**, paving the way for polyalphabetic ciphers, stream ciphers, and modern cryptographic standards such as the **Advanced Encryption Standard (AES)** studied in **VTU BCS703**.

---

### **Faculty Evaluation & Sign-off:**

| Criteria | Max Marks | Marks Awarded |
| :--- | :---: | :---: |
| Conduction & Algorithm Understanding | 10 | |
| Execution & Simulation Output Verification | 10 | |
| Viva-Voce / Technical Discussion | 10 | |
| **Total** | **30** | |

<br><br>
**Signature of Faculty In-Charge:** ___________________________ &emsp;&emsp; **Date:** ______________  
*(Mrs. Sowmya NH, Sr. Assistant Professor, Dept. of CSE)*
