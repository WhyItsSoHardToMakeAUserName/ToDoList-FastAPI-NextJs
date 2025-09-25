from contextlib import AbstractContextManager
from typing import Callable, List
from src.model.task import Task
from src.repository.base_repository import BaseRepository
from sqlmodel import Session

class TaskRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        super().__init__(session_factory, Task)

    def get_by_user_id(self, user_id: int) -> List[Task]:
        with self.session_factory() as session:
            return session.query(self.model).filter(self.model.user_id == user_id).all()