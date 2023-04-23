from fastapi import FastAPI

app = FastAPI(title="kanban App")


@app.get("/test")
def test():
    return {"test": "test"}
