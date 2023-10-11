import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { IAnswersRepository } from '@repositories/answers-repository';
import { AnswerComment } from '@entities/answer-comment';
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  comment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerCommentsRepository: IAnswerCommentsRepository
  ){}
  async execute({ 
    authorId, 
    answerId, 
    content 
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) throw new Error('Answer not found');

    const comment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content
    });

    await this.answerCommentsRepository.create(comment);

    return {
      comment,
    };
  }
}