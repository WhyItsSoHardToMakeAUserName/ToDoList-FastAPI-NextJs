from dependency_injector import containers,providers

from src.repository.user_repository import UserRepository
from src.services.auth_service import AuthService
from src.core.database.sqlite import SqlDatabase
from src.repository.task_repository import TaskRepository
from src.services.task_service import TaskService

class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules = [
            "src.api.v1.endpoints.task",
            "src.api.v1.endpoints.auth"
        ]
    )


    db = providers.Singleton(SqlDatabase , f"sqlite:///database.db")


    task_repository = providers.Factory(TaskRepository ,session_factory=db.provided.session)
    user_repository = providers.Factory(UserRepository ,session_factory=db.provided.session)


    task_service = providers.Factory(TaskService, task_repository = task_repository)
    auth_service = providers.Factory(AuthService, user_repository = user_repository)
