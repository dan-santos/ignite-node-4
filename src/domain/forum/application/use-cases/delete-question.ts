import { Either, left, right } from '@/core/either';
import { IQuestionsRepository } from '@repositories/questions-repository';
import { ForbiddenError, ResourceNotFoundError } from '@/core/errors/custom-errors';

interface DeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | ForbiddenError, object>

export class DeleteQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ){}
  async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError());
    if (authorId !== question.authorId.toString()) {
      return left(new ForbiddenError());
    }

    await this.questionsRepository.delete(question);

    return right({});
  }
}