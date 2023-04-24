from .queries import insert_lobby


async def post_lobby(data, session):
    return await insert_lobby(data, session)
