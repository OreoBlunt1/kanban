from typing import List
from fastapi import APIRouter
from ..auth.routers import fastapi_users
from .schemas import LobbyGet, LobbyPatch, LobbyPost, LobbyUserPost
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_async_session
from .queries import insert_lobby, select_lobbies, select_lobby, update_lobby, delete_lobby, insert_user

# current_user =
kanban = APIRouter(
    prefix="/kanban",
    tags=['kanban']
)


@kanban.post("/lobby")
async def add_lobby(lobby: LobbyPost, session: AsyncSession = Depends(get_async_session)):
    return await insert_lobby(lobby, session)


@kanban.get("/lobby", response_model=List[LobbyGet])
async def get_lobbies(session: AsyncSession = Depends(get_async_session)):
    return await select_lobbies(session)


@kanban.get("/lobby/{id}", response_model=LobbyGet)
async def get_lobby(id: int, session: AsyncSession = Depends(get_async_session)):
    return await select_lobby(id, session)


@kanban.patch("/lobby/{id}")
async def change_lobby(lobby: LobbyPatch, id: int, session: AsyncSession = Depends(get_async_session)):
    return await update_lobby(lobby, id, session)


@kanban.delete("/lobby/{id}")
async def remove_lobby(id: int, session: AsyncSession = Depends(get_async_session)):
    return await delete_lobby(id, session)

@kanban.post("/lobbyuser")
async def add_user(lobby_user: LobbyUserPost, session: AsyncSession = Depends(get_async_session)):
    return await insert_user(lobby_user, session)


def create_error(field: str) -> dict:
    return {"loc": ["body", field], "msg": "readonly field"}
