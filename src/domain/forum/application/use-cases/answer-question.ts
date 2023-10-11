import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@entities/answer';
import { IAnswersRepository } from '@repositories/answers-repository';

interface AnswerQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<null, {
  answer: Answer
}>

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ){}
  async execute({ 
    authorId, 
    questionId, 
    content 
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content
    });

    await this.answersRepository.create(answer);

    return right({ answer });
  }
}