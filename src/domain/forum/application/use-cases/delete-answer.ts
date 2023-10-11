import { Either, left, right } from '@/core/either';
import { IAnswersRepository } from '@repositories/answers-repository';
import { ForbiddenError, ResourceNotFoundError } from './errors/custom-errors';

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | ForbiddenError, object>

export class DeleteAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ){}
  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());
    if (authorId !== answer.authorId.toString()) {
      return left(new ForbiddenError());
    }

    await this.answersRepository.delete(answer);

    return right({});
  }
}