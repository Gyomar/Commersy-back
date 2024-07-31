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
import { Sale } from './sale.entity';
import { Coin } from '../../manage/entities/coin.entity';
import { PaymentMethod } from '../../manage/entities/payment_method.entity';

@Entity({ name: 't023_incomes' })
export class Income {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c023_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.incomes)
  user: User;

  @Column({ type: 'varchar', nullable: false, name: 'c023_id' })
  id: string;

  @ManyToOne(() => Sale, (sale) => sale.incomes)
  sale: Sale;

  @Column({ type: 'varchar', nullable: false, name: 'c023_paid_reference' })
  paidReference: string;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.incomes)
  paymentMethod: PaymentMethod;

  @Column({ type: 'double', nullable: false, name: 'c023_value' })
  value: number;

  @ManyToOne(() => Coin, (coin) => coin.incomes)
  coin: Coin;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c023_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c023_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
