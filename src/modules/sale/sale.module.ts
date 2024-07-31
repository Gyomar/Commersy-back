import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { IncomeController } from './controllers/income.controller';
import { IncomeService } from './services/income.service';
import { ProductQuotationController } from './controllers/product_quotation.controller';
import { ProductQuotationService } from './services/product_quotation.service';
import { ProductSaleController } from './controllers/product_sale.controller';
import { ProductSaleService } from './services/product_sale.service';
import { QuotationController } from './controllers/quotation.controller';
import { QuotationService } from './services/quotation.service';
import { SaleController } from './controllers/sale.controller';
import { SaleService } from './services/sale.service';
import { ZoneController } from './controllers/zone.controller';
import { ZoneService } from './services/zone.service';
import { Customer } from './entities/customer.entity';
import { Income } from './entities/income.entity';
import { ProductQuotation } from './entities/product_quotation.entity';
import { ProductSale } from './entities/product_sale.entity';
import { Quotation } from './entities/quotation.entity';
import { Sale } from './entities/sale.entity';
import { Zone } from './entities/zone.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
      Income,
      ProductQuotation,
      ProductSale,
      Quotation,
      Sale,
      Zone,
    ]),
  ],
  controllers: [
    CustomerController,
    IncomeController,
    ProductQuotationController,
    ProductSaleController,
    QuotationController,
    SaleController,
    ZoneController,
  ],
  providers: [
    CustomerService,
    IncomeService,
    ProductQuotationService,
    ProductSaleService,
    QuotationService,
    SaleService,
    ZoneService,
  ],
})
export class SaleModule {}
