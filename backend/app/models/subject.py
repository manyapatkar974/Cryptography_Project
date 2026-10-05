from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String
from app.db.base import Base


class Subject(Base):
    """
    Academic Course / Subject model (e.g. BCS703 Cryptography & Network Security).
    Can be associated with Branch, Year, and Semester.
    """
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True, nullable=False)  # e.g. "BCS703"
    name = Column(String, nullable=False)  # e.g. "Cryptography & Network Security"
    branch = Column(String, default="CSE", nullable=False)
    year = Column(Integer, default=3, nullable=False)
    semester = Column(Integer, default=6, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
