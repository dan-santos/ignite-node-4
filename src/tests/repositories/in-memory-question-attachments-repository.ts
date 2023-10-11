import { IQuestionAttachmentsRepository } from '@repositories/question-attachments-repository';
import { QuestionAttachment } from '@entities/question-attachment';

export class InMemoryQuestionAttachmentsRepository implements IQuestionAttachmentsRepository {
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string){
    const attachments = this.items
      .filter(attachment => attachment.questionId.toString() === questionId);

    return attachments;
  }

  async deleteManyByQuestionId(questionId: string){
    const remainingAttachments = this.items
      .filter(attachment => attachment.questionId.toString() !== questionId);
    
    this.items = remainingAttachments;
  }
}