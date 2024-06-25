from pydantic import BaseModel


class Question(BaseModel):
    image_url: str
    answer: str