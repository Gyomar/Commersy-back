import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { SubCategory } from './sub_category.entity';

@Entity({ name: 't003_categories' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c003_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @Column({ type: 'varchar', name: 'c003_id' })
  id: string;

  @Column({ type: 'varchar', nullable: false, name: 'c003_name' })
  name: string;

  @Column({ type: 'text', nullable: true, name: 'c003_description' })
  description: string;

  @Column({
    type: 'boolean',
    name: 'c003_state',
    default: true,
  })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c003_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c003_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];
}
