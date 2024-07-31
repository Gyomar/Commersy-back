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
import { Coin } from '../../manage/entities/coin.entity';
import { PaymentCondition } from '../../manage/entities/payment_condition.entity';
import { PriceList } from '../../product/entities/price_list.entity';
import { Customer } from './customer.entity';
import { ProductSale } from './product_sale.entity';
import { Income } from './income.entity';

@Entity({ name: 't020_sales' })
export class Sale {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c020_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.sales)
  user: User;

  @ManyToOne(() => Customer, (customer) => customer.sales)
  customer: Customer;

  @ManyToOne(() => PriceList, (priceList) => priceList.sales)
  priceList: PriceList;

  @ManyToOne(() => Coin, (coin) => coin.sales)
  coin: Coin;

  @ManyToOne(
    () => PaymentCondition,
    (paymentCondition) => paymentCondition.sales,
  )
  paymentCondition: PaymentCondition;

  @Column({ type: 'boolean', nullable: false, name: 'c020_paidup' })
  paidup: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c020_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c020_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => ProductSale, (productSale) => productSale.sale)
  productSales: ProductSale[];

  @OneToMany(() => Income, (income) => income.sale)
  incomes: Income[];

  @Expose()
  get total() {
    if (this.productSales) {
      return this.productSales
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.totalPrice;
          return total + totalItem;
        }, 0);
    }
    return 0;
  }
}
