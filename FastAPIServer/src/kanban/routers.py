from typing import List
from .controllers import post_lobby, get_all_lobbies, get_one_lobby, patch_lobby
from fastapi import APIRouter
from ..auth.routers import fastapi_users
from .schemas import Lobby, PutLobby
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


@kanban.get("/lobby", response_model=List[Lobby])
async def get_lobbies(session: AsyncSession = Depends(get_async_session)):
    return await get_all_lobbies(session)


@kanban.get("/lobby/{id}", response_model=Lobby)
async def get_lobby(id: int, session: AsyncSession = Depends(get_async_session)):
    return await get_one_lobby(id, session)


@kanban.patch("/lobby/{id}")
async def change_lobby(lobby: PutLobby, id: int, session: AsyncSession = Depends(get_async_session)):
    return await patch_lobby(lobby, id, session)

def create_error(field: str) -> dict:
    return {"loc": ["body", field], "msg": "readonly field"}
