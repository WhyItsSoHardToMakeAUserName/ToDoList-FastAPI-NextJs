from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from dependency_injector.wiring import Provide,inject
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field

from src.core.container import Container
from src.services.task_service import TaskService


router = APIRouter(
    prefix="/task",
    tags=["task"]
)

security = HTTPBearer()

class CreateTask(BaseModel):
    user_id:int
    title:str
    completed:bool

class UpdateTask(BaseModel):
    title: str = Field(default=None)
    completed: bool = Field(default=None)


@router.get("/")
@inject
def get_tasks(credentials: HTTPAuthorizationCredentials = Depends(security),service: TaskService = Depends(Provide[Container.task_service])):
    token = credentials.credentials

    try:
        return service.get_tasks_by_userId(token)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

# Остальным эндпойнтам тоже нужно по хорошему добавить привязку к юзеру но мне лень
# Желательно сделать middleware но с fastapi не особо приятно делать на отдельные роутеры 

@router.post("/")
@inject
def create_task(new_task: CreateTask, service: TaskService = Depends(Provide[Container.task_service])):
    return service.add(new_task)


@router.delete("/{task_id}")
@inject
def delete_task(task_id: int, service: TaskService = Depends(Provide[Container.task_service])):
    return service.remove_by_id(task_id)


@router.patch("/{task_id}")
@inject
def update_task(new_task: UpdateTask, task_id: int, service: TaskService = Depends(Provide[Container.task_service])):
    return service.patch(task_id, new_task)