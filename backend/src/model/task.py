from typing import Optional
from sqlmodel import Field, Relationship
from src.model.base_model import BaseModel

class Task(BaseModel, table=True):
    title: str
    completed: bool = Field(default=False)

    user_id: int = Field(foreign_key="user.id")
    user: Optional["User"] = Relationship(back_populates="tasks")