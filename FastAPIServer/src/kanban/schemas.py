from typing import Optional
from pydantic import BaseModel


class LobbyGet(BaseModel):
    lobby_id: int
    lobby_name: str
    creator: int


class LobbyPatch(BaseModel):
    lobby_name: str


class LobbyPost(BaseModel):
    lobby_name: str
    creator: int
