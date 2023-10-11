import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionCommentsRepository } from '@/tests/repositories/in-memory-question-comments-repository';
import { DeleteQuestionCommentUseCase } from './delete-question-comment';
import { makeQuestionComment } from '@/tests/factories/make-question-comment';

let questionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe('Delete comment on question tests', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(questionCommentsRepository);
  });

  it('should be able to delete a comment on question', async () => {
    const authorId = new UniqueEntityID();
    const commentId = new UniqueEntityID();

    const fakeComment = makeQuestionComment({
      authorId,
      questionId: new UniqueEntityID(),
      content: 'Comment content'
    }, commentId);
    await questionCommentsRepository.create(fakeComment);

    await sut.execute({
      authorId: authorId.toString(),
      commentId: commentId.toString(),
    });

    expect(questionCommentsRepository.items).toHaveLength(0);
  });

  it('should NOT be able to delete a comment on question of another user', async () => {
    const authorId = new UniqueEntityID();
    const commentId = new UniqueEntityID();

    const fakeComment = makeQuestionComment({
      authorId,
      questionId: new UniqueEntityID(),
      content: 'Comment content'
    }, commentId);
    await questionCommentsRepository.create(fakeComment);

    await expect(() => 
      sut.execute({
        authorId: 'unexistent-another-id',
        commentId: commentId.toString(),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});