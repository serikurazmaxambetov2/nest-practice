from pydantic import BaseModel


class Topic(BaseModel):
    index: int
    name: str
    url: str