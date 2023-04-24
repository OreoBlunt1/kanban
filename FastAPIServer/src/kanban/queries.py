from sqlalchemy.ext.asyncio import AsyncSession
from .models import lobby, user, lobby_user, task
import sqlalchemy as db


async def insert_lobby(data, session: AsyncSession):
    stmt = db.insert(lobby).values(**data.dict())
    await session.execute(stmt)
    await session.commit()
    return {"result": "done"}
