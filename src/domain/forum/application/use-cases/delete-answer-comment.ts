import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  commentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {
}

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: IAnswerCommentsRepository
  ){}
  async execute({ 
    authorId, 
    commentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const comment = await this.answerCommentsRepository.findById(commentId);

    if (!comment) throw new Error('Comment not found');

    if (comment.authorId.toString() !== authorId) throw new Error('Forbidden');

    await this.answerCommentsRepository.delete(comment);

    return {};
  }
}