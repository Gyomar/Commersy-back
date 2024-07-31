import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
} from '../dtos/category.dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.categoryRepo.save(newCategory);
  }

  async count(user: { rowid: number }) {
    const countData = await this.categoryRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterCategoryDto) {
    if (params) {
      const { limit, offset } = params;
      return this.categoryRepo.find({
        where: { user },
        take: limit,
        skip: offset,
      });
    }

    return this.categoryRepo.find({
      where: { user },
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const category = await this.categoryRepo.findOne({
      where: { user, rowid },
      relations: ['subCategories'],
    });
    if (!category) {
      throw new NotFoundException(`No exite`);
    }
    return category;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateCategoryDto,
  ) {
    const category = await this.categoryRepo.findOne({
      where: { user, rowid },
    });
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const category = await this.categoryRepo.findOne({
      where: { user, rowid },
    });
    return await this.categoryRepo.delete(category.rowid);
  }
}
