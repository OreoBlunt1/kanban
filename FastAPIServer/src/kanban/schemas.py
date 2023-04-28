from datetime import datetime
from enum import Enum
from typing import Optional, List
from pydantic import BaseModel
from src.auth.schemas import UserRead


class LobbyGet(BaseModel):
    lobby_id: int
    lobby_name: str
    creator: int


class LobbyPatch(BaseModel):
    lobby_name: str


class LobbyPost(BaseModel):
    lobby_name: str
    creator: int


class LobbyUserPost(BaseModel):
    username: str
    lobby_id: int


class Profile(BaseModel):
    info: UserRead
    as_owner: List[LobbyGet]
    as_participant: List[LobbyGet]


class TaskStatus(Enum):
    done = "done"
    doing = "doing"
    to_do = "to do"
    failed = "failed"


class TaskPost(BaseModel):
    task_tittle: str
    task_deadline: datetime
    task_status: TaskStatus
    actor: str
    lobby_id: int


class TaskGet(BaseModel):
    task_id: int
    task_tittle: str
    task_inittime: datetime
    task_deadline: datetime
    task_status: TaskStatus
    actor: str
    lobby_id: int
    lobby_name: str
    creator: int

