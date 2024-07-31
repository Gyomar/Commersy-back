import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Coin } from '../../manage/entities/coin.entity';
import { ProductPrice } from './product_price.entity';
import { Sale } from '../../sale/entities/sale.entity';
import { Quotation } from '../../sale/entities/quotation.entity';

@Entity({ name: 't013_price_lists' })
export class PriceList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c013_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.priceLists)
  user: User;

  @Column({ type: 'varchar', name: 'c013_id' })
  id: string;

  @Column({ type: 'varchar', nullable: false, name: 'c013_name' })
  name: string;

  @ManyToOne(() => Coin, (coin) => coin.priceLists)
  coin: Coin;

  @Column({ type: 'int', nullable: false, name: 'c013_type' })
  type: number;

  @Column({ type: 'double', nullable: true, name: 'c013_value' })
  value: number;

  @Column({
    type: 'boolean',
    name: 'c013_state',
    default: true,
  })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c013_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c013_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => ProductPrice, (productPrice) => productPrice.priceList)
  productPrices: ProductPrice[];

  @OneToMany(() => Sale, (sale) => sale.priceList)
  sales: Sale[];

  @OneToMany(() => Quotation, (quotation) => quotation.priceList)
  quotations: Quotation[];
}
