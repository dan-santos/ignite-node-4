import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { IQuestionsRepository } from '@repositories/questions-repository';
import { Question } from '@entities/question';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ){}
  async execute({ 
    authorId, 
    title, 
    content 
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    });

    await this.questionsRepository.create(question);

    return {
      question,
    };
  }
}