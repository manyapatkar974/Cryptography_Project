from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class Student(Base):
    """
    Student academic registry created and managed by Admin.
    Stores complete academic group identity:
    Branch (e.g. CSE, ISE, ECE, AIML, ME, CV)
    Year (1, 2, 3, 4)
    Semester (1..8)
    Section (A, B, C)
    When student self-registers via /register with the same email, user_id is automatically linked.
    """
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    usn = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    branch = Column(String, default="CSE", nullable=False)
    year = Column(Integer, default=3, nullable=False)
    semester = Column(Integer, default=6, nullable=False)
    section = Column(String, default="A", nullable=False)
    class_code = Column(String, default="BCS703 — Cryptography & Network Security", nullable=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", backref="student_profile")
