import { Question } from '@entities/question';
import { IQuestionsRepository } from '../repositories/questions-repository';
import { Either, left, right } from '@/core/either';
import { ForbiddenError, ResourceNotFoundError } from './errors/custom-errors';

interface EditQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | ForbiddenError, {
  question: Question;
}>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository
  ){}

  async execute({
    questionId,
    authorId,
    title,
    content
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError());
    if (authorId !== question.authorId.toString()) {
      return left(new ForbiddenError());
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);
    
    return right({ question });
  }
}