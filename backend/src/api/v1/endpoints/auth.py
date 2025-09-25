from fastapi import APIRouter, Depends
from dependency_injector.wiring import Provide,inject


from src.core.container import Container
from src.model.user import User
from src.services.auth_service import AuthService


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/sign-in")
@inject
def sign_in(user:User , service: AuthService = Depends(Provide[Container.auth_service])):
    return service.login(user)

@router.post("/register")
@inject
def register(new_user:User , service: AuthService = Depends(Provide[Container.auth_service])):
    return service.register(new_user)