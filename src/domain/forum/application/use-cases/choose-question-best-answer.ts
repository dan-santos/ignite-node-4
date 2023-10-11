import { IAnswersRepository } from '@repositories/answers-repository';
import { Question } from '@entities/question';
import { IQuestionsRepository } from '@repositories/questions-repository';

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private questionsRepository: IQuestionsRepository
  ){}
  async execute({ 
    authorId, 
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);
    if (!answer) throw new Error('Answer not found');
    
    const question = await this.questionsRepository.findById(answer.questionId.toString());
    if (!question) throw new Error('Question not found');

    if (question.authorId.toString() !== authorId) {
      throw new Error('Forbidden');
    }

    question.bestAnswerId = answer.id;
    await this.questionsRepository.save(question);
    
    return {
      question,
    };
  }
}