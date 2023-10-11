import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository';
import { makeAnswer } from '@/tests/factories/make-answer';
import { DeleteAnswerUseCase } from './delete-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ForbiddenError } from './errors/custom-errors';

let repository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete answer tests', () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(repository);
  });

  it('should be able to delete a answer', async () => {
    const answerId = new UniqueEntityID();
    const authorId = new UniqueEntityID();

    const fakeAnswer = makeAnswer({ authorId }, answerId);
    await repository.create(fakeAnswer);

    await sut.execute({
      answerId: answerId.toString(),
      authorId: authorId.toString()
    });

    expect(repository.items).toHaveLength(0);
  });

  it('should NOT be able to delete a answer from another user', async () => {
    const answerId = new UniqueEntityID();
    const authorId = new UniqueEntityID();

    const fakeAnswer = makeAnswer({ authorId }, answerId);
    await repository.create(fakeAnswer);

    const result = await sut.execute({
      answerId: answerId.toString(),
      authorId: 'unexistent-author-id'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ForbiddenError);
  });
});