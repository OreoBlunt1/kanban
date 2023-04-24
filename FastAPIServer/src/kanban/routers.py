from fastapi import APIRouter

kanban = APIRouter(
    prefix="/kanban",
    tags=['kanban']
)

@kanban.get("/")
def get():
    return {"detail":""}