import { Either, left, right } from '@/core/either';
import { Answer } from '@entities/answer';
import { IAnswersRepository } from '@repositories/answers-repository';
import { ForbiddenError, ResourceNotFoundError } from '@/core/errors/custom-errors';
import { AnswerAttachmentList } from '@entities/answer-attachment-list';
import { AnswerAttachment } from '@entities/answer-attachment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { IAnswerAttachmentsRepository } from '@repositories/answer-attachments-repository';

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  attachmentsIds: string[];
  content: string;
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | ForbiddenError, {
  answer: Answer
}>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerAttachmentsRepository: IAnswerAttachmentsRepository
  ) { }

  async execute({
    answerId,
    authorId,
    attachmentsIds,
    content
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());
    if (authorId !== answer.authorId.toString()) {
      return left(new ForbiddenError());
    }

    // create attachment list to be updated
    const currentAnswerAttachments = await this.answerAttachmentsRepository
      .findManyByAnswerId(answerId);
    const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments);

    // create current answer attachments
    const answerAttachments = attachmentsIds.map(attachmentId => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      });
    });

    // updates the attachment list merging changes between old and new attachment lists
    answerAttachmentList.update(answerAttachments);

    answer.content = content;
    answer.attachments = answerAttachmentList;

    await this.answersRepository.save(answer);

    return right({ answer });
  }
}