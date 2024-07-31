import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Coin } from '../../manage/entities/coin.entity';
import { PaymentMethod } from '../../manage/entities/payment_method.entity';
import { Purchase } from './purchase.entity';

@Entity({ name: 't022_expenses' })
export class Expense {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c022_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @Column({ type: 'varchar', nullable: false, name: 'c022_id' })
  id: string;

  @ManyToOne(() => Purchase, (purchase) => purchase.expenses)
  purchase: Purchase;

  @Column({ type: 'varchar', nullable: true, name: 'c022_paid_reference' })
  paidReference: string;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.expenses)
  paymentMethod: PaymentMethod;

  @ManyToOne(() => Coin, (coin) => coin.expenses)
  coin: Coin;

  @Column({ type: 'double', nullable: false, name: 'c022_value' })
  value: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c022_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c022_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
