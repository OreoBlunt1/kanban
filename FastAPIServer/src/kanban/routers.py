from typing import List
from .controllers import post_lobby, get_all_lobbies, get_one_lobby
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


@kanban.get("/lobby")
async def get_lobbies(session: AsyncSession = Depends(get_async_session)):
    return await get_all_lobbies(session)

@kanban.get("/lobby/{id}")
async def get_lobby(id: int, session: AsyncSession = Depends(get_async_session)):
    return await get_one_lobby(id, session)
