import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  ManyToOne,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Product } from './product.entity';
import { PriceList } from './price_list.entity';

@Entity({ name: 't015_product_prices' })
export class ProductPrice {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c015_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.productPrices)
  user: User;

  @Column({ type: 'varchar', nullable: false, name: 'c015_id' })
  id: string;

  @ManyToOne(() => Product, (product) => product.productPrices)
  produdct: Product;

  @ManyToOne(() => PriceList, (priceList) => priceList.productPrices)
  priceList: PriceList;

  @Column({ type: 'double', nullable: false, name: 'c015_value' })
  value: number;
}
