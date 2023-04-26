from typing import Optional
from pydantic import BaseModel


class Lobby(BaseModel):
    lobby_id: Optional[int]
    lobby_name: str
    creator: int


class PutLobby(BaseModel):
    lobby_name: str
