import { PaginationParams } from '@/core/repositories/pagination-params';
import { Question } from '@entities/question';

export interface IQuestionsRepository {
  create(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
  findBySlug(slug: string): Promise<Question | null>;
  findById(questionId: string): Promise<Question | null>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
}