import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpenseController } from './controllers/expense.controller';
import { ExpenseService } from './services/expense.service';
import { ProductPurchaseController } from './controllers/product_purchase.controller';
import { ProductPurchaseService } from './services/product_purchase.service';
import { ProviderController } from './controllers/provider.controller';
import { ProviderService } from './services/provider.service';
import { PurchaseController } from './controllers/purchase.controller';
import { PurchaseService } from './services/purchase.service';
import { Expense } from './entities/expense.entity';
import { ProductPurchase } from './entities/product_purchase.entity';
import { Provider } from './entities/provider.entity';
import { Purchase } from './entities/purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, ProductPurchase, Provider, Purchase]),
  ],
  controllers: [
    ExpenseController,
    ProductPurchaseController,
    ProviderController,
    PurchaseController,
  ],
  providers: [
    ExpenseService,
    ProductPurchaseService,
    ProviderService,
    PurchaseService,
  ],
})
export class PurchaseModule {}
