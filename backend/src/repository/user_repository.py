from contextlib import AbstractContextManager
from typing import Callable
from src.model.user import User
from src.repository.base_repository import BaseRepository
from sqlmodel import Session

class UserRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        super().__init__(session_factory, User)

    def get_by_user_name(self, name: str) -> User:
        with self.session_factory() as session:
            return session.query(self.model).filter(self.model.name == name).first()