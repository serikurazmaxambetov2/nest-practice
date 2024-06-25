import { promises as fs } from 'fs';
import { join } from 'path';
import dataSource from 'src/database/data.source';
import QuestionEntity from 'src/database/entities/question.entity';
import TopicEntity from 'src/database/entities/topic.entity';
import { Repository } from 'typeorm';

interface JsonQuestion {
  image_url: string;
  answer: 'A' | 'B' | 'C' | 'D';
}

interface JsonTopic {
  index: number;
  name: string;
}

// Добавление спаршенных данных в БД.
export default async function initializeDatabase() {
  await dataSource.initialize();

  const questionRepository = dataSource.getRepository(QuestionEntity);
  const topicRepository = dataSource.getRepository(TopicEntity);

  const rawData = await fs.readFile(
    join(__dirname, '../../scraper/data.json'),
    'utf-8',
  );

  const jsonData = JSON.parse(rawData) as {
    topic: JsonTopic;
    questions: JsonQuestion[];
  }[];

  for (const { topic, questions } of jsonData) {
    let topicInDb = await topicRepository.findOne({
      where: { name: topic.name },
      relations: { questions: true },
    });

    /** Если есть, предпологаем что все уже записано в бд */
    if (topicInDb) {
      return;
    }

    if (!topicInDb) {
      topicInDb = await topicRepository.save(topic);
    }

    for (const question of questions) {
      await saveQuestionIfNotExist(questionRepository, question, topicInDb);
    }
  }
}

async function saveQuestionIfNotExist(
  questionRepository: Repository<QuestionEntity>,
  question: JsonQuestion,
  topic: TopicEntity,
) {
  const questionInDb = await questionRepository.findOne({
    where: { imageUrl: question['image_url'] },
  });

  if (!questionInDb) {
    await questionRepository.save({
      imageUrl: question['image_url'],
      answer: question.answer,
      topic,
    });
  }
}
