import { IQuestionCommentsRepository } from '@repositories/question-comments-repository';
import { QuestionComment } from '@entities/question-comment';

interface FetchQuestionCommentsUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionCommentsUseCaseResponse {
  comments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ){}
  async execute({ questionId, page }: FetchQuestionCommentsUseCaseRequest): 
    Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page });

    return {
      comments,
    };
  }
}