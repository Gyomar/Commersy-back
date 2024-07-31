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
import { Zone } from './zone.entity';
import { Sale } from './sale.entity';
import { Quotation } from './quotation.entity';
import { TypeDocument } from '../../manage/entities/type_document.entity';

@Entity({ name: 't008_customers' })
export class Customer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c008_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.customers)
  user: User;

  @Column({ type: 'varchar', nullable: false, name: 'c008_id' })
  id: string;

  @ManyToOne(() => TypeDocument, (typeDoc) => typeDoc.customers)
  typeDoc: TypeDocument;

  @Column({ type: 'varchar', nullable: false, name: 'c008_doc' })
  doc: string;

  @Column({ type: 'varchar', nullable: false, name: 'c008_name' })
  name: string;

  @Column({ type: 'varchar', nullable: true, name: 'c008_address' })
  address: string;

  @Column({ type: 'varchar', nullable: true, name: 'c008_phone' })
  phone: string;

  @Column({ type: 'varchar', nullable: true, name: 'c008_email' })
  email: string;

  @ManyToOne(() => Zone, (zone) => zone.customers)
  zone: Zone;

  @Column({ type: 'boolean', nullable: false, name: 'c008_state' })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c008_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c008_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => Sale, (sale) => sale.customer)
  sales: Sale[];

  @OneToMany(() => Quotation, (quotation) => quotation.customer)
  quotations: Quotation[];
}
