import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  ManyToOne,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Sale } from './sale.entity';
import { Product } from '../../product/entities/product.entity';

@Entity({ name: 't021_product_sales' })
export class ProductSale {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c021_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.productSales)
  user: User;

  @Column({ type: 'varchar', nullable: false, name: 'c021_id' })
  id: string;

  @ManyToOne(() => Sale, (sale) => sale.productSales)
  sale: Sale;

  @ManyToOne(() => Product, (product) => product.productSales)
  product: Product;

  @Column({ type: 'double', nullable: false, name: 'c021_quantity' })
  quantity: number;

  @Column({ type: 'double', nullable: false, name: 'c021_unit_price' })
  unitPrice: number;

  @Column({ type: 'double', nullable: false, name: 'c021_total_price' })
  totalPrice: number;
}
