export * from './user.interface';
export * from './error_msg.interface';
export * from './cmc.interface';

export interface ResServer<T> {
  status: string;
  data: T;
}
