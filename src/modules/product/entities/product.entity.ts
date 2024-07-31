import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { SubCategory } from './sub_category.entity';
import { ProductPrice } from './product_price.entity';
import { Tax } from '../../manage/entities/tax.entity';
import { ProductPurchase } from '../../purchase/entities/product_purchase.entity';
import { ProductSale } from '../../sale/entities/product_sale.entity';
import { ProductQuotation } from '../../sale/entities/product_quotation.entity';

@Entity({ name: 't014_products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c014_rowid' })
  rowid: number;

  @Index()
  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @Column({ type: 'varchar', name: 'c014_id' })
  id: string;

  @Column({ type: 'varchar', nullable: true, name: 'c014_reference' })
  reference: string;

  @Column({ type: 'varchar', nullable: false, name: 'c014_name' })
  name: string;

  @Column({ type: 'varchar', nullable: true, name: 'c014_location' })
  location: string;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
  subCategory: SubCategory;

  @Column({ type: 'double', nullable: false, name: 'c014_cost' })
  cost: number;

  @Column({ type: 'double', default: 0, name: 'c014_stock' })
  stock: number;

  @ManyToOne(() => Tax, (tax) => tax.products)
  tax: Tax;

  @Column({ type: 'boolean', default: true, name: 'c014_state' })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c014_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c014_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => ProductPrice, (productPrice) => productPrice.produdct)
  productPrices: ProductPrice[];

  @OneToMany(
    () => ProductPurchase,
    (productPurchase) => productPurchase.product,
  )
  productPurchases: ProductPurchase[];

  @OneToMany(() => ProductSale, (productSale) => productSale.product)
  productSales: ProductSale[];

  @OneToMany(
    () => ProductQuotation,
    (productQuotation) => productQuotation.product,
  )
  productQuotations: ProductQuotation[];
}
