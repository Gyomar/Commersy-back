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

import { Expose } from 'class-transformer';

import { User } from '../../user/entities/user.entity';
import { ProductPurchase } from './product_purchase.entity';
import { Provider } from './provider.entity';
import { Coin } from '../../manage/entities/coin.entity';
import { PaymentCondition } from '../../manage/entities/payment_condition.entity';
import { Expense } from './expense.entity';

@Entity({ name: 't016_purchases' })
export class Purchase {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c016_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @ManyToOne(() => Provider, (provider) => provider.purchases)
  provider: Provider;

  @ManyToOne(() => Coin, (coin) => coin.purchases)
  coin: Coin;

  @ManyToOne(
    () => PaymentCondition,
    (paymentCondition) => paymentCondition.purchases,
  )
  paymentCondition: PaymentCondition;

  @Column({ type: 'boolean', nullable: false, name: 'c016_paidup' })
  paidup: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c016_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c016_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(
    () => ProductPurchase,
    (productPurchase) => productPurchase.product,
  )
  productPurchases: ProductPurchase[];

  @OneToMany(() => Expense, (expense) => expense.purchase)
  expenses: Expense[];

  @Expose()
  get total() {
    if (this.productPurchases) {
      return this.productPurchases
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.totalCost;
          return total + totalItem;
        }, 0);
    }
    return 0;
  }
}
