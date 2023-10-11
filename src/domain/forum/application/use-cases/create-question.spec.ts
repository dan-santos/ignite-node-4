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
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Pergunta?',
      content: 'Não sei.'
    });
  
    expect(question.content).toEqual('Não sei.');
    expect(repository.items[0].id).toEqual(question.id);
  });
});