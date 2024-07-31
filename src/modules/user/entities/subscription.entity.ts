import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 't002_subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c002_rowid' })
  rowid: number;

  @OneToOne(() => User, (user) => user.subscription)
  @JoinColumn()
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c002_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c002_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c002_date_expiration',
  })
  expirationAt: Date;
}
