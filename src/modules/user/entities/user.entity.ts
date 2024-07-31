import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Subscription } from './subscription.entity';
import { Coin } from '../../manage/entities/coin.entity';
import { ExchangeRate } from '../../manage/entities/exchange_rate.entity';
import { PaymentCondition } from '../../manage/entities/payment_condition.entity';
import { PaymentMethod } from '../../manage/entities/payment_method.entity';
import { Tax } from '../../manage/entities/tax.entity';
import { Category } from '../../product/entities/category.entity';
import { PriceList } from '../../product/entities/price_list.entity';
import { Product } from '../../product/entities/product.entity';
import { ProductPrice } from '../../product/entities/product_price.entity';
import { SubCategory } from '../../product/entities/sub_category.entity';
import { Expense } from '../../purchase/entities/expense.entity';
import { ProductPurchase } from '../../purchase/entities/product_purchase.entity';
import { Provider } from '../../purchase/entities/provider.entity';
import { Purchase } from '../../purchase/entities//purchase.entity';
import { Customer } from '../../sale/entities/customer.entity';
import { Income } from '../../sale/entities/income.entity';
import { ProductQuotation } from '../../sale/entities/product_quotation.entity';
import { ProductSale } from '../../sale/entities/product_sale.entity';
import { Quotation } from '../../sale/entities/quotation.entity';
import { Sale } from '../../sale/entities/sale.entity';
import { Zone } from '../../sale/entities/zone.entity';

@Entity({ name: 't001_users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'c001_rowid' })
  rowid: number;

  @Column({ type: 'varchar', nullable: false, name: 'c001_name' })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'c001_email',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'c001_role',
  })
  role: string;

  @OneToOne(() => Subscription, (subscription) => subscription.user, {
    nullable: true,
  })
  subscription: Subscription;

  @OneToMany(() => Coin, (coin) => coin.user)
  coins: Coin[];

  @OneToMany(() => ExchangeRate, (exchangeRate) => exchangeRate.user)
  exchangeRates: ExchangeRate[];

  @OneToMany(
    () => PaymentCondition,
    (paymentCondition) => paymentCondition.user,
  )
  paymentConditions: PaymentCondition[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
  paymentMethods: PaymentMethod[];

  @OneToMany(() => Tax, (tax) => tax.user)
  taxes: Tax[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => PriceList, (priceList) => priceList.user)
  priceLists: PriceList[];

  @OneToMany(() => ProductPrice, (productPrice) => productPrice.user)
  productPrices: ProductPrice[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.user)
  subCategories: SubCategory[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @OneToMany(() => ProductPurchase, (productPurchase) => productPurchase.user)
  productPurchases: ProductPurchase[];

  @OneToMany(() => Provider, (provider) => provider.user)
  providers: Provider[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @OneToMany(() => Income, (income) => income.user)
  incomes: Income[];

  @OneToMany(
    () => ProductQuotation,
    (productQuotation) => productQuotation.user,
  )
  productQuotations: ProductQuotation[];

  @OneToMany(() => ProductSale, (productSale) => productSale.user)
  productSales: ProductSale[];

  @OneToMany(() => Quotation, (quotation) => quotation.user)
  quotations: Quotation[];

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @OneToMany(() => Zone, (zone) => zone.user)
  zones: Zone[];

  @CreateDateColumn({
    type: 'timestamp',
    name: 'c001_date_create',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'c001_date_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
