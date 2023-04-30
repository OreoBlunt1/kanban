from fastapi import APIRouter, Depends, HTTPException, Request
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
    prefix="/jwt",
    tags=['jwt']
)


@jwt.get("/token")
def generate_api_key(request: Request, user: User = Depends(fastapi_users.current_user(active=True))):
    """
    get jwt from current session
    """
    return {"access_token": request.cookies["user_jwt"]}
