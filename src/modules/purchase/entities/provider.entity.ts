import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Purchase } from './purchase.entity';
import { TypeDocument } from '../../manage/entities/type_document.entity';

@Entity({ name: 't009_providers' })
export class Provider {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c009_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.providers)
  user: User;

  @Column({ type: 'varchar', name: 'c009_id' })
  id: string;

  @ManyToOne(() => TypeDocument, (typeDoc) => typeDoc.providers)
  typeDoc: TypeDocument;

  @Column({ type: 'varchar', nullable: false, name: 'c009_doc' })
  doc: string;

  @Column({ type: 'varchar', nullable: false, name: 'c009_name' })
  name: string;

  @Column({ type: 'boolean', default: true, name: 'c009_state' })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c009_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c009_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => Purchase, (purchase) => purchase.provider)
  purchases: Purchase[];
}
