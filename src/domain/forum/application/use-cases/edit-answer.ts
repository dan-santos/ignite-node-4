import { Either, left, right } from '@/core/either';
import { Answer } from '@entities/answer';
import { IAnswersRepository } from '@repositories/answers-repository';
import { ForbiddenError, ResourceNotFoundError } from './errors/custom-errors';

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | ForbiddenError, {
  answer: Answer
}>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository
  ){}

  async execute({
    answerId,
    authorId,
    content
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());
    if (authorId !== answer.authorId.toString()) {
      return left(new ForbiddenError());
    }

    answer.content = content;

    await this.answersRepository.save(answer);
    
    return right({ answer });
  }
}