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
    const result = await sut.execute({
      authorId: '1',
      questionId: '1',
      content: 'Não sei.'
    });
  
    expect(result.isRight()).toBe(true);
    expect(repository.items[0]).toEqual(result.value?.answer);
  });
});