from fastapi import APIRouter, Depends, HTTPException
from fastapi_users import FastAPIUsers
from starlette import status

from .manager import get_user_manager
from .models import User
from .auth import JWTStrategy, auth_backend

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

jwt = APIRouter(
    prefix="/kanban",
    tags=['kanban']
)


@jwt.get("/apikey")
def generate_api_key(user: User = Depends(fastapi_users.current_user(active=True))):
    # if not user:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="You need to be authenticated to generate an API key",
    #     )
    token = fastapi_users.authenticator.current_user_token()
    return {"access_token": token}
