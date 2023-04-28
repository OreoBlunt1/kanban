from typing import List
from fastapi import APIRouter
from ..auth.routers import fastapi_users
from .schemas import LobbyGet, LobbyPatch, LobbyPost, LobbyUserPost, Profile, TaskPost, TaskGet
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_async_session
from .queries import insert_lobby, select_lobbies, select_lobby, update_lobby, delete_lobby, insert_user, delete_user, \
    select_profile, insert_task, select_tasks, select_task, select_lobby_tasks

# current_user =
kanban = APIRouter(
    prefix="/kanban",
    tags=['kanban']
)


@kanban.post("/lobby")
async def add_lobby(lobby: LobbyPost, session: AsyncSession = Depends(get_async_session)):
    """
    create new lobby
    """
    return await insert_lobby(lobby, session)


@kanban.get("/lobby", response_model=List[LobbyGet])
async def get_lobbies(session: AsyncSession = Depends(get_async_session)):
    """
    get all lobbies
    """
    return await select_lobbies(session)


@kanban.get("/lobby/{id}", response_model=LobbyGet)
async def get_lobby(id: int, session: AsyncSession = Depends(get_async_session)):
    """
    get specific lobby
    """
    return await select_lobby(id, session)


@kanban.patch("/lobby/{id}")
async def change_lobby(lobby: LobbyPatch, id: int, session: AsyncSession = Depends(get_async_session)):
    """
    rename lobby
    """
    return await update_lobby(lobby, id, session)


@kanban.delete("/lobby/{id}")
async def remove_lobby(id: int, session: AsyncSession = Depends(get_async_session)):
    """
    delete lobby
    """
    return await delete_lobby(id, session)


@kanban.post("/lobbyuser")
async def add_user(lobby_user: LobbyUserPost, session: AsyncSession = Depends(get_async_session)):
    """
    add external user to lobby
    """
    return await insert_user(lobby_user, session)


@kanban.delete("/lobbyuser/{lobby_id}/{user_id}")
async def remove_user(lobby_id: int, user_id: int, session: AsyncSession = Depends(get_async_session)):
    """
    expel user form lobby
    """
    return await delete_user(lobby_id, user_id, session)


@kanban.get("/profile/{user_id}", response_model=Profile)
async def get_profile(user_id: int, session: AsyncSession = Depends(get_async_session)):
    """
    get user profile info
    """
    return await select_profile(user_id, session)


@kanban.post("/task")
async def create_task(task: TaskPost, session: AsyncSession = Depends(get_async_session)):
    return await insert_task(task, session)


@kanban.get("/task", response_model=List[TaskGet])
async def get_tasks(session: AsyncSession = Depends(get_async_session)):
    return await select_tasks(session)


@kanban.get("/task/{task_id}", response_model=TaskGet)
async def get_task(task_id: int, session: AsyncSession = Depends(get_async_session)):
    return await select_task(task_id, session)


@kanban.get("/lobbytasks/{lobby_id}", response_model=List[TaskGet])
async def get_lobby_tasks(lobby_id: int, session: AsyncSession = Depends(get_async_session)):
    return await select_lobby_tasks(lobby_id, session)


def create_error(field: str) -> dict:
    return {"loc": ["body", field], "msg": "readonly field"}
