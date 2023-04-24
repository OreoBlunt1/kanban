from fastapi import FastAPI, Depends

from src.auth.auth import auth_backend
from src.auth.models import User
from src.auth.routers import fastapi_users
from src.auth.routers import jwt
from src.auth.schemas import UserRead, UserCreate
from src.kanban.routers import kanban

app = FastAPI(title="kanban App")

current_user = fastapi_users.current_user()


@app.get("/test")
def protected_route(user: User = Depends(current_user)):
    return f"Hello, {user.email}"



app.include_router(kanban)
app.include_router(jwt)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
