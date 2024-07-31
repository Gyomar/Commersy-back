import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Expense } from '../../purchase/entities/expense.entity';
import { Income } from '../../sale/entities/income.entity';

@Entity({ name: 't012_payment_methods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c012_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.paymentMethods)
  user: User;

  @Column({ type: 'varchar', name: 'c014_id' })
  id: string;

  @Column({ type: 'varchar', nullable: false, name: 'c012_name' })
  name: string;

  @Column({ type: 'boolean', default: true, name: 'c012_state' })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c012_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c012_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => Expense, (expense) => expense.paymentMethod)
  expenses: Expense[];

  @OneToMany(() => Income, (income) => income.paymentMethod)
  incomes: Income[];
}
