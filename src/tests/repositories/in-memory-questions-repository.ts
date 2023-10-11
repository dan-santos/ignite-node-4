import { PaginationParams } from '@/core/repositories/pagination-params';
import { Question } from '@entities/question';
import { IQuestionsRepository } from '@repositories/questions-repository';

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  private questions: Question[] = [];

  get items() {
    return [...this.questions];
  }

  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }

  async findBySlug(slug: string) {
    const question = this.questions.find(q => q.slug.content === slug);

    if (!question) return null;

    return question;
  }

  async findById(questionId: string){
    const question = this.questions.find(q => q.id.toString() === questionId);

    if (!question) return null;

    return question;
  }

  async delete(question: Question){
    const questionIndex = this.questions.findIndex(q => q.id === question.id);
    this.questions.splice(questionIndex, 1);
  }

  async save(question: Question){
    const questionIndex = this.questions.findIndex(q => q.id === question.id);

    this.questions[questionIndex] = question;
  }

  async findManyRecent(params: PaginationParams){
    const { page } = params;
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}