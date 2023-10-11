import { IAnswerCommentsRepository } from '@repositories/answer-comments-repository';
import { AnswerComment } from '@entities/answer-comment';

interface FetchAnswerCommentsUseCaseRequest {
  page: number;
  answerId: string;
}

interface FetchAnswerCommentsUseCaseResponse {
  comments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
  constructor(
    private answerCommentsRepository: IAnswerCommentsRepository,
  ){}
  async execute({ answerId, page }: FetchAnswerCommentsUseCaseRequest): 
    Promise<FetchAnswerCommentsUseCaseResponse> {
    const comments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page });

    return {
      comments,
    };
  }
}