import { makeQuestion } from '@/tests/factories/make-question';
import { EditQuestionUseCase } from './edit-question';
import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ForbiddenError } from './errors/custom-errors';

let repository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit question tests', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(repository);
  });

  it('should be able to edit a question', async () => {
    const questionId = new UniqueEntityID();
    const authorId = new UniqueEntityID();

    const fakeQuestion = makeQuestion({ authorId }, questionId);
    await repository.create(fakeQuestion);

    const result = await sut.execute({
      authorId: authorId.toString(),
      questionId: questionId.toString(),
      content: 'Edited content',
      title: fakeQuestion.title
    });
  
    expect(result.isRight()).toBe(true);
    expect(repository.items[0].content).toEqual('Edited content');
  });

  it('should NOT be able to edit a question of another user', async () => {
    const questionId = new UniqueEntityID();
    const authorId = new UniqueEntityID();

    const fakeQuestion = makeQuestion({ authorId }, questionId);
    await repository.create(fakeQuestion);

    const result = await sut.execute({
      authorId: 'inexistent-author-id',
      questionId: questionId.toString(),
      content: 'Edited content',
      title: fakeQuestion.title
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ForbiddenError);
  });
});