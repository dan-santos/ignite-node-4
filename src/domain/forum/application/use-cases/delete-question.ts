import { IQuestionsRepository } from '@repositories/questions-repository';

interface DeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ){}
  async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) throw new Error('Question not found');
    if (authorId !== question.authorId.toString()) {
      throw new Error('Forbidden');
    }

    await this.questionsRepository.delete(question);

    return {};
  }
}