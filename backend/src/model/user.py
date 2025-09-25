
from typing import List
from sqlmodel import Field, Relationship
from src.model.base_model import BaseModel


class User(BaseModel, table=True):
    name: str = Field(unique=True,  index=True)
    password: str

    tasks: List["Task"] = Relationship(back_populates="user")