import { IAnswersRepository } from '@repositories/answers-repository';
import { Answer } from '@entities/answer';

interface FetchQuestionAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ){}
  async execute({ questionId, page }: FetchQuestionAnswersUseCaseRequest): 
    Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return {
      answers,
    };
  }
}