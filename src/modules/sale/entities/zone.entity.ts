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
import { Customer } from './customer.entity';

@Entity({ name: 't007_zones' })
export class Zone {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c007_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.zones)
  user: User;

  @Column({ type: 'varchar', nullable: false, name: 'c007_id' })
  id: string;

  @Column({ type: 'varchar', nullable: false, name: 'c007_name' })
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c007_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c007_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => Customer, (customer) => customer.zone)
  customers: Customer[];
}
