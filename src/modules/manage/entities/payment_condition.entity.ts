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
import { Purchase } from '../../purchase/entities/purchase.entity';
import { Sale } from '../../sale/entities/sale.entity';

@Entity({ name: 't011_payment_conditions' })
export class PaymentCondition {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c011_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.paymentConditions)
  user: User;

  @Column({ type: 'varchar', name: 'c011_id' })
  id: string;

  @Column({ type: 'varchar', nullable: false, name: 'c011_name' })
  name: string;

  @Column({
    type: 'boolean',
    name: 'c011_state',
    default: true,
  })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c011_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c011_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => Purchase, (purchase) => purchase.paymentCondition)
  purchases: Purchase[];

  @OneToMany(() => Sale, (sale) => sale.paymentCondition)
  sales: Sale[];
}
