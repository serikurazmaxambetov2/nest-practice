import asyncio
import json
from typing import List
from aiohttp import ClientSession
from bs4 import BeautifulSoup

from models.topic import Topic
from models.question import Question
from services.request import RequestService
from services.proxy import ProxyService

class TestUzRuMathService:
    '''Сервис для работы с категорией математика'''
    MATH_TOPICS_URL = 'https://www.test-uz.ru/sbornik.php?cat=maths'

    @staticmethod
    async def get_all_topics(session: ClientSession) -> List[Topic]:
        '''Возвращает список тем по математике'''

        response = await RequestService.get_with_proxy(session, TestUzRuMathService.MATH_TOPICS_URL)

        # Ищем все темы, и возвращаем их
        soup = BeautifulSoup(await response.text(), 'lxml')

        input_elements = soup.select('a > input.form_buttons2')
        topics: List[Topic] = []

        for index, input_element in enumerate(input_elements):
            topic_element = input_element.parent.find_next('a')
            topics.append(Topic(
                index=index,
                name=topic_element.get_text().strip(),
                url='https://www.test-uz.ru/' + topic_element.get('href')
            ))

        return topics
    
    @staticmethod
    async def get_topic_questions_urls(session: ClientSession, topic: Topic):
        '''Возвращает список задач из тем.'''

        response = await RequestService.get_with_proxy(session, topic.url)

        # Получаем все вопросы из темы.
        soup = BeautifulSoup(await response.text(), 'lxml')

        input_elements = soup.select('a > input.form_buttons2')
        questions_urls: List[str] = []

        for input_element in input_elements:
            question_element = input_element.parent
            question_url = 'https://www.test-uz.ru/' + question_element.get('href')

            questions_urls.append(question_url)
        
        return questions_urls

    @staticmethod
    async def get_question_by_url(session: ClientSession, url: str):
        response = await RequestService.get_with_proxy(session, url)
        soup = BeautifulSoup(await response.text(), 'lxml')

        image_element = soup.select_one('img.img-fluid[alt^="Условие задачи"]')
        answer_element = soup.select_one('p#otv')

        if not image_element:
            return None

        # Если нет ответа, то возвращаем None
        try:
            image_url = 'https://www.test-uz.ru/' + image_element.get('src')
            answer = answer_element.get_text().strip()

            return Question(image_url=image_url, answer=answer)
        except Exception as e:
            return None