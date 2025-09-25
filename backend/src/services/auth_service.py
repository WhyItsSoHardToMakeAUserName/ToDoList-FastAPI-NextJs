from fastapi import HTTPException,status
from src.util import jwt_handler
from src.model.user import User
from src.repository.user_repository import UserRepository


class AuthService():
    def __init__(self, user_repository: UserRepository):
        self._user_repository = user_repository

    def register(self, new_user:User):
        user = self._user_repository.create(new_user)
        
        token_data = {
            "user_id" : user.id,
            "name" : user.name
        }

        token = jwt_handler.jwt_handler.create_access_token(token_data)

        return token
    
    def login(self, user:User):
        _user  = self._user_repository.get_by_user_name(user.name)

        if not _user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password"
            )
    
        if _user.password != user.password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password"
            )
        
        token_data = {
            "user_id" : _user.id,
            "name" : _user.name
        }

        token = jwt_handler.jwt_handler.create_access_token(token_data)

        return token

