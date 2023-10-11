import { IQuestionsRepository } from '@repositories/questions-repository';
import { Question } from '@entities/question';

interface FetchRecentQuestionsUseCaseRequest {
  page: number;
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[];
}

export class FetchRecentQuestionsUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ){}
  async execute({ page }: FetchRecentQuestionsUseCaseRequest): 
    Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });

    return {
      questions,
    };
  }
}