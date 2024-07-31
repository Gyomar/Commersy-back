import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  ManyToOne,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Quotation } from './quotation.entity';
import { Product } from '../../product/entities/product.entity';

@Entity({ name: 't019_product_quotations' })
export class ProductQuotation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c019_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.productQuotations)
  user: User;

  @Column({ type: 'varchar', nullable: false, name: 'c019_id' })
  id: string;

  @ManyToOne(() => Quotation, (quotation) => quotation.productQuotations)
  quotation: Quotation;

  @ManyToOne(() => Product, (product) => product.productQuotations)
  product: Product;

  @Column({ type: 'double', nullable: false, name: 'c019_quantity' })
  quantity: number;

  @Column({ type: 'double', nullable: false, name: 'c019_unit_price' })
  unitPrice: number;

  @Column({ type: 'double', nullable: false, name: 'c019_total_price' })
  totalPrice: number;
}
