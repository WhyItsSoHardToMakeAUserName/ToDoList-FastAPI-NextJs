from jwt import JWT
from src.repository import task_repository
from src.util import jwt_handler
from src.repository.task_repository import TaskRepository
from src.services.base_service import BaseService
from src.model.task import Task

class TaskService(BaseService):
    def __init__(self, task_repository: TaskRepository):
        self.task_repository = task_repository
        super().__init__(self.task_repository)

    def get_tasks_by_userId(self, token:str):
        payload = jwt_handler.jwt_handler.verify_token(token)
        print(payload)
        userId = payload.get("user_id")

        return self.task_repository.get_by_user_id(userId)