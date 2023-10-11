import { IQuestionCommentsRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  commentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {
}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository
  ){}
  async execute({ 
    authorId, 
    commentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const comment = await this.questionCommentsRepository.findById(commentId);

    if (!comment) throw new Error('Comment not found');

    if (comment.authorId.toString() !== authorId) throw new Error('Forbidden');

    await this.questionCommentsRepository.delete(comment);

    return {};
  }
}