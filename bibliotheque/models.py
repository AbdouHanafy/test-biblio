import os
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Book(Base):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    year = Column(Integer)
    isbn = Column(String, unique=True)

# Base SQLite dans le même dossier
db_path = os.path.join(os.path.dirname(__file__), "bibliotheque.db")
engine = create_engine(f'sqlite:///{db_path}', echo=True)
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)
