import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { makeQuestion } from '@/tests/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

let repository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get question by slug tests', () => {
  beforeEach(() => {
    repository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(repository);
  });

  it('should be able to create a question', async () => {
    const fakeQuestion = makeQuestion({
      slug: Slug.create('example-question')
    });

    await repository.create(fakeQuestion);
    
    const result = await sut.execute({ 
      slug: 'example-question'
    });

    expect(result.isRight()).toBe(true);
    
    expect(result.value?.question.title).toEqual(fakeQuestion.title);
  });
});