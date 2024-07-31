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
import { Product } from './product.entity';
import { Category } from './category.entity';

@Entity({ name: 't004_sub_categories' })
export class SubCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c004_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.subCategories)
  user: User;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @Column({ type: 'varchar', name: 'c004_id' })
  id: string;

  @Column({ type: 'varchar', nullable: false, name: 'c004_name' })
  name: string;

  @Column({ type: 'text', nullable: true, name: 'c004_description' })
  description: string;

  @Column({ type: 'boolean', default: true, name: 'c004_state' })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c004_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c004_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[];
}
