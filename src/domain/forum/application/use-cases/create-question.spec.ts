import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository';

let repository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create question tests', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(repository);
  });

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Pergunta?',
      content: 'Não sei.'
    });
  
    expect(result.isRight()).toBe(true);
    expect(repository.items[0]).toEqual(result.value?.question);
  });
});