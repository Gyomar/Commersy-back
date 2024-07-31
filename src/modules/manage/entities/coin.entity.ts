import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { PriceList } from '../../product/entities/price_list.entity';
import { ExchangeRate } from './exchange_rate.entity';
import { Expense } from '../../purchase/entities/expense.entity';
import { Income } from '../../sale/entities/income.entity';
import { Purchase } from '../../purchase/entities/purchase.entity';
import { Sale } from '../../sale/entities/sale.entity';
import { Quotation } from '../../sale/entities/quotation.entity';

@Entity({ name: 't005_coins' })
export class Coin {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c005_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.coins)
  user: User;

  @Column({ type: 'varchar', name: 'c005_id' })
  id: string;

  @Column({ type: 'varchar', nullable: false, name: 'c005_name' })
  name: string;

  @Column({ type: 'int', nullable: false, name: 'c005_round' })
  round: number;

  @Column({ type: 'int', nullable: false, name: 'c005_decimal' })
  decimal: number;

  @Column({ type: 'boolean', name: 'c005_state', default: true })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c005_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c005_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => PriceList, (priceList) => priceList.coin)
  priceLists: PriceList[];

  @OneToMany(() => ExchangeRate, (exchangeRate) => exchangeRate.fromCoin)
  exchangeRatesFrom: ExchangeRate[];

  @OneToMany(() => ExchangeRate, (exchangeRate) => exchangeRate.toCoin)
  exchangeRatesTo: ExchangeRate[];

  @OneToMany(() => Expense, (expense) => expense.coin)
  expenses: Expense[];

  @OneToMany(() => Purchase, (purchase) => purchase.coin)
  purchases: Purchase[];

  @OneToMany(() => Income, (income) => income.coin)
  incomes: Income[];

  @OneToMany(() => Sale, (sale) => sale.coin)
  sales: Sale[];

  @OneToMany(() => Quotation, (quotation) => quotation.coin)
  quotations: Quotation[];
}
