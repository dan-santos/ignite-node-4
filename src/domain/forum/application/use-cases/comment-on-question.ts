import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { IQuestionsRepository } from '@repositories/questions-repository';
import { QuestionComment } from '@entities/question-comment';
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository';

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  comment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository
  ){}
  async execute({ 
    authorId, 
    questionId, 
    content 
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) throw new Error('Question not found');

    const comment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content
    });

    await this.questionCommentsRepository.create(comment);

    return {
      comment,
    };
  }
}