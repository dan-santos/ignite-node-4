import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository';
import { makeAnswer } from '@/tests/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { makeQuestion } from '@/tests/factories/make-question';

let answersRepository: InMemoryAnswersRepository;
let questionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose question best answer tests', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository();
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(answersRepository, questionsRepository);
  });

  it('should be able to choose best answer of question', async () => {
    const questionId = new UniqueEntityID();
    const studentId = new UniqueEntityID();

    const answerId = new UniqueEntityID();
    const instructorId = new UniqueEntityID();

    const fakeQuestion = makeQuestion({ authorId: studentId }, questionId);
    await questionsRepository.create(fakeQuestion);

    const fakeAnswer = makeAnswer(
      {
        authorId: instructorId,
        questionId: fakeQuestion.id
      }, 
      answerId
    );
    await answersRepository.create(fakeAnswer);

    await sut.execute({
      answerId: answerId.toString(),
      authorId: studentId.toString()
    });

    expect(questionsRepository.items[0].bestAnswerId).toEqual(fakeAnswer.id);
  });

  it('should NOT be able to choose best answer of question of another user', async () => {
    const questionId = new UniqueEntityID();
    const studentId = new UniqueEntityID();

    const answerId = new UniqueEntityID();
    const instructorId = new UniqueEntityID();

    const fakeQuestion = makeQuestion({ authorId: studentId }, questionId);
    await questionsRepository.create(fakeQuestion);

    const fakeAnswer = makeAnswer(
      {
        authorId: instructorId,
        questionId: fakeQuestion.id
      }, 
      answerId
    );
    await answersRepository.create(fakeAnswer);

    await expect(() => 
      sut.execute({
        answerId: answerId.toString(),
        authorId: 'unexistent-student-id'
      })
    ).rejects.toBeInstanceOf(Error);
  });
});