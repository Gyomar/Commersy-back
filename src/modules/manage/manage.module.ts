import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoinController } from './controllers/coin.controller';
import { ExchangeRateController } from './controllers/exchange_rate.controller';
import { PaymentConditionController } from './controllers/payment_condition.controller';
import { PaymentMethodController } from './controllers/payment_method.controller';
import { TaxController } from './controllers/tax.controller';
import { TypeDocumentController } from './controllers/type_document.controller';
import { CoinService } from './services/coin.service';
import { ExchangeRateService } from './services/exchange_rate.service';
import { PaymentConditionService } from './services/payment_condition.service';
import { PaymentMethodService } from './services/payment_method.service';
import { TaxService } from './services/tax.service';
import { TypeDocumentService } from './services/type_document.service';
import { Coin } from './entities/coin.entity';
import { ExchangeRate } from './entities/exchange_rate.entity';
import { PaymentCondition } from './entities/payment_condition.entity';
import { PaymentMethod } from './entities/payment_method.entity';
import { Tax } from './entities/tax.entity';
import { TypeDocument } from './entities/type_document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Coin,
      ExchangeRate,
      PaymentCondition,
      PaymentMethod,
      Tax,
      TypeDocument,
    ]),
  ],
  controllers: [
    CoinController,
    ExchangeRateController,
    PaymentConditionController,
    PaymentMethodController,
    TaxController,
    TypeDocumentController,
  ],
  providers: [
    CoinService,
    ExchangeRateService,
    PaymentConditionService,
    PaymentMethodService,
    TaxService,
    TypeDocumentService,
  ],
})
export class ManageModule {}
