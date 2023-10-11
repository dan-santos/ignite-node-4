import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository';
import { makeQuestion } from '@/tests/factories/make-question';
import { DeleteQuestionUseCase } from './delete-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ForbiddenError } from './errors/custom-errors';

let repository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete question tests', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(repository);
  });

  it('should be able to delete a question', async () => {
    const questionId = new UniqueEntityID();
    const authorId = new UniqueEntityID();

    const fakeQuestion = makeQuestion({ authorId }, questionId);
    await repository.create(fakeQuestion);

    await sut.execute({
      questionId: questionId.toString(),
      authorId: authorId.toString()
    });

    expect(repository.items).toHaveLength(0);
  });

  it('should NOT be able to delete a question from another user', async () => {
    const questionId = new UniqueEntityID();
    const authorId = new UniqueEntityID();

    const fakeQuestion = makeQuestion({ authorId }, questionId);
    await repository.create(fakeQuestion);

    const result = await sut.execute({
      questionId: questionId.toString(),
      authorId: 'unexistent-author-id'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ForbiddenError);
  });
});