import {
  PrimaryGeneratedColumn,
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
import { PriceList } from '../../product/entities/price_list.entity';
import { Customer } from './customer.entity';
import { ProductQuotation } from './product_quotation.entity';

@Entity({ name: 't018_quotations' })
export class Quotation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c018_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.quotations)
  user: User;

  @ManyToOne(() => Customer, (customer) => customer.quotations)
  customer: Customer;

  @ManyToOne(() => PriceList, (priceList) => priceList.quotations)
  priceList: PriceList;

  @ManyToOne(() => Coin, (coin) => coin.quotations)
  coin: Coin;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c018_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c018_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(
    () => ProductQuotation,
    (productQuotation) => productQuotation.quotation,
  )
  productQuotations: ProductQuotation[];

  @Expose()
  get total() {
    if (this.productQuotations) {
      return this.productQuotations
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.totalPrice;
          return total + totalItem;
        }, 0);
    }
    return 0;
  }
}
