from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.container import Container
from src.api.v1.routes import routers as v1_routers

app = FastAPI()

#middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#set db
container = Container()
db = container.db()

db.create_database()

app.include_router(v1_routers)