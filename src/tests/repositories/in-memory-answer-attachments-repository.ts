import { IAnswerAttachmentsRepository } from '@repositories/answer-attachments-repository';
import { AnswerAttachment } from '@entities/answer-attachment';

export class InMemoryAnswerAttachmentsRepository implements IAnswerAttachmentsRepository {
  public items: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string){
    const attachments = this.items
      .filter(attachment => attachment.answerId.toString() === answerId);

    return attachments;
  }

  async deleteManyByAnswerId(answerId: string){
    const remainingAttachments = this.items
      .filter(attachment => attachment.answerId.toString() !== answerId);
    
    this.items = remainingAttachments;
  }
}