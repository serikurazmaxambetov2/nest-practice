import asyncio
import json

import aiofiles
from aiohttp import ClientSession

from services.test_uz_ru import TestUzRuMathService

async def main():
    # data -> для сохранения данных в файл
    data = []

    async with ClientSession() as session:
        topics = await TestUzRuMathService.get_all_topics(session)

        for topic in topics:
            # Просто, чтобы вы понимали, насколько быстро.
            print('Начало парсинга темы:', topic.name)

            questions_urls = await TestUzRuMathService.get_topic_questions_urls(session, topic)

            tasks = [
                asyncio.create_task(TestUzRuMathService.get_question_by_url(session, question_url))
                for question_url in questions_urls]
            
            questions = await asyncio.gather(*tasks)

            # Добавляем в массив data чтобы потом сохранить
            data.append({
                'topic': topic.model_dump(),
                'questions': [question.model_dump() for question in questions if question]
            })

            print('Конец парсинга темы:', topic.name)

    # сохраняем все в файл
    async with aiofiles.open('data.json', 'w') as file:
        await file.write(json.dumps(data, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    asyncio.run(main())