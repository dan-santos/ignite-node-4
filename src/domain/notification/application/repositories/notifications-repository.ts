import { Notification } from '../../enterprise/notification';

export interface INotificationsRepository {
  create(notification: Notification): Promise<void>;
  save(notification: Notification): Promise<void>;
  findById(notificationId: string): Promise<Notification | null>;
}