import { IAnswersRepository } from '@repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ){}
  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) throw new Error('Answer not found');
    if (authorId !== answer.authorId.toString()) {
      throw new Error('Forbidden');
    }

    await this.answersRepository.delete(answer);

    return {};
  }
}