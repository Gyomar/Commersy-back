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
import { Coin } from './coin.entity';

@Entity({ name: 't010_exchange_rates' })
export class ExchangeRate {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c010_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.exchangeRates)
  user: User;

  @Column({ type: 'double', nullable: false, name: 'c010_rate' })
  rate: number;

  @ManyToOne(() => Coin, (coin) => coin.exchangeRatesFrom)
  fromCoin: number;

  @ManyToOne(() => Coin, (coin) => coin.exchangeRatesTo)
  toCoin: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c010_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c010_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
