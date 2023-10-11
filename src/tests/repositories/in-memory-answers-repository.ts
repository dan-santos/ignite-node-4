import { PaginationParams } from '@/core/repositories/pagination-params';
import { Answer } from '@entities/answer';
import { IAnswersRepository } from '@repositories/answers-repository';

export class InMemoryAnswersRepository implements IAnswersRepository {
  private answers: Answer[] = [];
  
  get items() {
    return [...this.answers];
  }

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer);
  }

  async findById(answerId: string){
    const answer = this.answers.find(q => q.id.toString() === answerId);

    if (!answer) return null;

    return answer;
  }

  async delete(answer: Answer){
    const answerIndex = this.answers.findIndex(q => q.id === answer.id);
    this.answers.splice(answerIndex, 1);
  }

  async save(answer: Answer){
    const answerIndex = this.answers.findIndex(q => q.id === answer.id);

    this.answers[answerIndex] = answer;
  }

  async findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]> {
    const { page } = params;
    const answers = this.answers
      .filter(answer => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }
}