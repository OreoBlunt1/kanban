from sqlalchemy.ext.asyncio import AsyncSession
from .models import lobby, user, lobby_user, task
import sqlalchemy as db


async def insert_lobby(data, session: AsyncSession):
    stmt = db.insert(lobby).values(**data.dict())
    await session.execute(stmt)
    await session.commit()
    return {"result": "done"}


async def select_lobbies(session: AsyncSession):
    stmt = db.select(lobby)
    res = await session.execute(stmt)
    return res.mappings().fetchall()


async def select_lobby(id, session: AsyncSession):
    stmt = db.select(lobby).where(lobby.columns.lobby_id == id)
    res = await session.execute(stmt)
    return res.mappings().fetchone()