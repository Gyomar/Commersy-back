import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subscription } from '../entities/subscription.entity';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  FilterSubscriptionDto,
} from '../dtos/subscription.dtos';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepo: Repository<Subscription>,
  ) {}

  create(data: CreateSubscriptionDto) {
    const newSubscription = this.subscriptionRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.subscriptionRepo.save(newSubscription);
  }

  async count(user: { rowid: number }) {
    const countData = await this.subscriptionRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterSubscriptionDto) {
    if (params) {
      const { limit, offset } = params;
      return this.subscriptionRepo.find({
        where: { user },
        relations: ['user'],
        take: limit,
        skip: offset,
      });
    }

    return this.subscriptionRepo.find({
      where: { user },
      relations: ['user'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const subscription = await this.subscriptionRepo.findOne({
      where: { user, rowid },
      relations: ['user'],
    });
    if (!subscription) {
      throw new NotFoundException(`No exite`);
    }
    return subscription;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateSubscriptionDto,
  ) {
    const subscription = await this.subscriptionRepo.findOne({
      where: { user, rowid },
    });
    this.subscriptionRepo.merge(subscription, changes);
    return this.subscriptionRepo.save(subscription);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const subscription = await this.subscriptionRepo.findOne({
      where: { user, rowid },
    });
    return this.subscriptionRepo.delete(subscription.rowid);
  }
}
