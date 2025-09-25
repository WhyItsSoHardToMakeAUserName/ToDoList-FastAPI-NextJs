from fastapi import APIRouter
from src.api.v1.endpoints.task import router as task_router
from src.api.v1.endpoints.auth import router as auth_router

routers = APIRouter()

router_list = [task_router,auth_router]

for router in router_list:
    router.tags = routers.tags.append("v1")
    routers.include_router(router)