import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubCategory } from '../entities/sub_category.entity';
import {
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
  FilterSubCategoryDto,
} from '../dtos/sub_category.dtos';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private subSubCategoryRepo: Repository<SubCategory>,
  ) {}

  create(data: CreateSubCategoryDto) {
    const newSubCategory = this.subSubCategoryRepo.create({
      ...data,
      user: { rowid: data.userRowid },
      category: { rowid: data.categoryRowid },
    });
    return this.subSubCategoryRepo.save(newSubCategory);
  }

  async count(user: { rowid: number }) {
    const countData = await this.subSubCategoryRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterSubCategoryDto) {
    if (params) {
      const { limit, offset } = params;
      return this.subSubCategoryRepo.find({
        where: { user },
        relations: ['category'],
        take: limit,
        skip: offset,
      });
    }

    return this.subSubCategoryRepo.find({
      where: { user },
      relations: ['category'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const subSubCategory = await this.subSubCategoryRepo.findOne({
      where: { user, rowid },
      relations: ['category', 'products'],
    });
    if (!subSubCategory) {
      throw new NotFoundException(`No exite`);
    }
    return subSubCategory;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateSubCategoryDto,
  ) {
    const subSubCategory = await this.subSubCategoryRepo.findOne({
      where: { user, rowid },
    });
    const subCategoryChanges = {
      ...changes,
      category: { rowid: changes.categoryRowid },
    };
    this.subSubCategoryRepo.merge(subSubCategory, subCategoryChanges);
    return this.subSubCategoryRepo.save(subSubCategory);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const subSubCategory = await this.subSubCategoryRepo.findOne({
      where: { user, rowid },
    });
    return this.subSubCategoryRepo.delete(subSubCategory.rowid);
  }
}
