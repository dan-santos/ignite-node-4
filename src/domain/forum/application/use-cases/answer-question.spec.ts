import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository';

let repository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Answer question tests', () => {
  beforeEach(() => {
    repository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(repository);
  });

  it('should be able to asnwer a question', async () => {
    const { answer } = await sut.execute({
      authorId: '1',
      questionId: '1',
      content: 'Não sei.'
    });
  
    expect(answer.content).toEqual('Não sei.');
    expect(repository.items[0].id).toEqual(answer.id);
  });
});