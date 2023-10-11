import { Answer } from '@entities/answer';
import { IAnswersRepository } from '@repositories/answers-repository';

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

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

    if (!answer) throw new Error('Answer not found');
    if (authorId !== answer.authorId.toString()) {
      throw new Error('Forbidden');
    }

    answer.content = content;

    await this.answersRepository.save(answer);
    
    return {
      answer,
    };
  }
}