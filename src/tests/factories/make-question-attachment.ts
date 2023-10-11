import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionAttachment, QuestionAttachmentProps } from '@entities/question-attachment';

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const fakeQuestionAttachment = QuestionAttachment.create({
    questionId: new UniqueEntityID(),
    attachmentId: new UniqueEntityID(),
    ...override,
  },
  id,
  );

  return fakeQuestionAttachment;
}