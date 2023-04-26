from .queries import insert_lobby, select_lobbies, select_lobby, update_lobby


async def post_lobby(data, session):
    return await insert_lobby(data, session)


async def get_all_lobbies(session):
    return await select_lobbies(session)


async def get_one_lobby(id, session):
    return await select_lobby(id, session)


async def patch_lobby(data, id, session):
    return await update_lobby(data, id, session)
