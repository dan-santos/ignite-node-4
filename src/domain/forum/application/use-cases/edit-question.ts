import { Question } from '@entities/question';
import { IQuestionsRepository } from '../repositories/questions-repository';

interface EditQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

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

    if (!question) throw new Error('Question not found');
    if (authorId !== question.authorId.toString()) {
      throw new Error('Forbidden');
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);
    
    return {
      question,
    };
  }
}