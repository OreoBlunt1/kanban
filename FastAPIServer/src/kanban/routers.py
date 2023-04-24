from typing import List
from .controllers import post_lobby
from fastapi import APIRouter
from ..auth.routers import fastapi_users
from .schemas import Lobby
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_async_session

# current_user =
kanban = APIRouter(
    prefix="/kanban",
    tags=['kanban']
)

@kanban.post("/lobby")
async def add_lobby(lobby: Lobby, session: AsyncSession = Depends(get_async_session)):
    return await post_lobby(lobby, session)