from sqlalchemy.ext.asyncio import AsyncSession
from .models import lobby, user, lobby_user, task
import sqlalchemy as db


async def insert_lobby(data, session: AsyncSession):
    stmt = db.insert(lobby).values(**data.dict())
    await session.execute(stmt)
    await session.commit()
    return {"detail": "done"}


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


async def delete_user(lobby_id, user_id, session: AsyncSession):
    stmt = lobby_user.delete().where(lobby_user.c.user_id == user_id and lobby_user.c.lobby_id == lobby_id)
    await session.execute(stmt)
    await session.commit()
    return {"detail": "done"}


async def select_profile(user_id, session: AsyncSession):
    participant_stmt = db.select(lobby).join(lobby_user, lobby.c.lobby_id == lobby_user.c.lobby_id) \
        .where(lobby_user.c.user_id == user_id)
    res = await session.execute(participant_stmt)
    participant = res.mappings().fetchall()
    owner_stmt = db.select(lobby).where(lobby.c.creator == user_id)
    res = await session.execute(owner_stmt)
    owner = res.mappings().fetchall()
    user_stmt = db.select(user).where(user.c.id == user_id)
    res = await session.execute(user_stmt)
    user_info = res.mappings().fetchone()
    user_data = dict()
    user_data["info"] = user_info
    user_data["as_owner"] = owner
    user_data["as_participant"] = participant
    return user_data


async def insert_task(task_data, session: AsyncSession):
    data_dict = task_data.dict()
    data_dict["task_status"] = data_dict["task_status"].value
    stmt = db.insert(task).values(**data_dict)
    await session.execute(stmt)
    await session.commit()
    return {"detail": "done"}


async def select_tasks(session: AsyncSession):
    stmt = db.select(task, lobby).join(lobby, task.c.lobby_id == lobby.c.lobby_id)
    res = await session.execute(stmt)
    return res.mappings().fetchall()


async def select_task(task_id, session: AsyncSession):
    stmt = db.select(task, lobby).join(lobby, task.c.lobby_id == lobby.c.lobby_id).where(task.c.task_id == task_id)
    res = await session.execute(stmt)
    return res.mappings().fetchone()


async def select_lobby_tasks(lobby_id, session: AsyncSession):
    stmt = db.select(task, lobby).join(lobby, task.c.lobby_id == lobby.c.lobby_id).where(task.c.lobby_id == lobby_id)
    res = await session.execute(stmt)
    return res.mappings().fetchall()
