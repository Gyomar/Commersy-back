import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';
import { SubCategoryController } from './controllers/sub_category.controller';
import { SubCategoryService } from './services/sub_category.service';
import { SubCategory } from './entities/sub_category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Category } from './entities/category.entity';
import { PriceListController } from './controllers/price_list.controller';
import { PriceListService } from './services/price_list.service';
import { PriceList } from './entities/price_list.entity';
import { ProductPriceController } from './controllers/product_price.controller';
import { ProductPriceService } from './services/product_price.service';
import { ProductPrice } from './entities/product_price.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      SubCategory,
      Category,
      PriceList,
      ProductPrice,
    ]),
  ],
  controllers: [
    ProductController,
    SubCategoryController,
    CategoryController,
    PriceListController,
    ProductPriceController,
  ],
  providers: [
    ProductService,
    SubCategoryService,
    CategoryService,
    PriceListService,
    ProductPriceService,
  ],
})
export class ProductModule {}
