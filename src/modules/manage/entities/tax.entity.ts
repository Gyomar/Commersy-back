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
import { Product } from '../../product/entities/product.entity';

@Entity({ name: 't006_taxes' })
export class Tax {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c006_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.taxes)
  user: User;

  @Column({ type: 'varchar', name: 'c006_id' })
  id: string;

  @Column({ type: 'varchar', nullable: false, name: 'c006_name' })
  name: string;

  @Column({ type: 'double', nullable: false, name: 'c006_value' })
  value: number;

  @Column({ type: 'boolean', default: true, name: 'c006_state' })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c006_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c006_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => Product, (product) => product.tax)
  products: Product[];
}
