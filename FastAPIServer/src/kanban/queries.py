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
    stmt = db.select(lobby).where(lobby.c.lobby_id == id)
    res = await session.execute(stmt)
    return res.mappings().fetchone()


async def update_lobby(data, id, session: AsyncSession):
    dict_data = data.dict()
    if dict_data.get("lobby_name"):
        stmt = db.update(lobby).where(lobby.c.lobby_id == id).values(lobby_name=dict_data["lobby_name"])
        await session.execute(stmt)
        await session.commit()
        return {"detail": "done"}
    else:
        return {"detail": "nothing to update"}


async def delete_lobby(id, session: AsyncSession):
    stmt = lobby.delete().where(lobby.c.lobby_id == id)
    await session.execute(stmt)
    await session.commit()
    return {"detail": "done"}


async def insert_user(data, session: AsyncSession):
    lobby_user_data = data.dict()
    sstmt = db.select(user.c.id).where(user.c.login == lobby_user_data.get("username"))
    res = await session.execute(sstmt)
    istmt = db.insert(lobby_user).values(user_id=res.fetchone()[0], lobby_id=lobby_user_data.get("lobby_id"))
    await session.execute(istmt)
    await session.commit()
    return {"detail": "done"}

