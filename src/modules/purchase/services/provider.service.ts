import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Provider } from '../entities/provider.entity';
import {
  CreateProviderDto,
  UpdateProviderDto,
  FilterProviderDto,
} from '../dtos/provider.dtos';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider) private providerRepo: Repository<Provider>,
  ) {}

  create(data: CreateProviderDto) {
    const newProvider = this.providerRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.providerRepo.save(newProvider);
  }

  async count(user: { rowid: number }) {
    const countData = await this.providerRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterProviderDto) {
    if (params) {
      const { limit, offset } = params;
      return this.providerRepo.find({
        where: { user },
        relations: ['typeDoc'],
        take: limit,
        skip: offset,
      });
    }

    return this.providerRepo.find({
      where: { user },
      relations: ['typeDoc'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const provider = await this.providerRepo.findOne({
      where: { user, rowid },
      relations: ['typeDoc', 'purchases'],
    });
    if (!provider) {
      throw new NotFoundException(`No exite`);
    }
    return provider;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateProviderDto,
  ) {
    const provider = await this.providerRepo.findOne({
      where: { user, rowid },
    });
    this.providerRepo.merge(provider, changes);
    return this.providerRepo.save(provider);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const provider = await this.providerRepo.findOne({
      where: { user, rowid },
    });
    return this.providerRepo.delete(provider.rowid);
  }
}
