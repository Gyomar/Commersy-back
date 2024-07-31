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
import { Provider } from '../../purchase/entities/provider.entity';
import { Customer } from '../../sale/entities/customer.entity';

@Entity({ name: 't024_type_document' })
export class TypeDocument {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c024_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.coins)
  user: User;

  @Column({ type: 'varchar', name: 'c024_id' })
  id: string;

  @Column({ type: 'varchar', nullable: false, name: 'c024_reference' })
  reference: string;

  @Column({ type: 'varchar', nullable: false, name: 'c024_description' })
  descripction: string;

  @Column({ type: 'boolean', name: 'c024_state', default: true })
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

  @OneToMany(() => Provider, (provider) => provider.typeDoc)
  providers: Provider[];

  @OneToMany(() => Customer, (customer) => customer.typeDoc)
  customers: Customer[];
}
