import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  Index,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Purchase } from './purchase.entity';
import { Product } from '../../product/entities/product.entity';

@Entity({ name: 't017_product_purchases' })
export class ProductPurchase {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c017_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.productPurchases)
  user: User;

  @Column({ type: 'varchar', nullable: false, name: 'c017_id' })
  id: string;

  @ManyToOne(() => Purchase, (purchase) => purchase.productPurchases)
  purchase: Purchase;

  @ManyToOne(() => Product, (product) => product.productPurchases)
  product: Product;

  @Column({ type: 'double', nullable: false, name: 'c017_quantity' })
  quantity: number;

  @Column({ type: 'double', nullable: false, name: 'c017_unit_cost' })
  unitCost: number;

  @Column({ type: 'double', nullable: false, name: 'c017_total_cost' })
  totalCost: number;
}
