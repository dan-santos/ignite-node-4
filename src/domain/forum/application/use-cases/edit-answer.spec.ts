import { makeAnswer } from '@/tests/factories/make-answer';
import { EditAnswerUseCase } from './edit-answer';
import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let repository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit answer tests', () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(repository);
  });

  it('should be able to edit a answer', async () => {
    const answerId = new UniqueEntityID();
    const authorId = new UniqueEntityID();

    const fakeAnswer = makeAnswer({ authorId }, answerId);
    await repository.create(fakeAnswer);

    const { answer } = await sut.execute({
      authorId: authorId.toString(),
      answerId: answerId.toString(),
      content: 'Edited content',
    });
  
    expect(answer.content).toEqual('Edited content');
  });

  it('should NOT be able to edit a answer of another user', async () => {
    const answerId = new UniqueEntityID();
    const authorId = new UniqueEntityID();

    const fakeAnswer = makeAnswer({ authorId }, answerId);
    await repository.create(fakeAnswer);

    await expect(() => 
      sut.execute({
        authorId: 'inexistent-author-id',
        answerId: answerId.toString(),
        content: 'Edited content',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});