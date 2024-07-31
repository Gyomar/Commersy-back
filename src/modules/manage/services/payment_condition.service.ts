import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentCondition } from '../entities/payment_condition.entity';
import {
  CreatePaymentConditionDto,
  UpdatePaymentConditionDto,
  FilterPaymentConditionDto,
} from '../dtos/payment_condition.dtos';

@Injectable()
export class PaymentConditionService {
  constructor(
    @InjectRepository(PaymentCondition)
    private paymentConditionRepo: Repository<PaymentCondition>,
  ) {}

  create(data: CreatePaymentConditionDto) {
    const newPaymentCondition = this.paymentConditionRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.paymentConditionRepo.save(newPaymentCondition);
  }

  async count(user: { rowid: number }) {
    const countData = await this.paymentConditionRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterPaymentConditionDto) {
    if (params) {
      const { limit, offset } = params;
      return this.paymentConditionRepo.find({
        where: { user },
        take: limit,
        skip: offset,
      });
    }

    return this.paymentConditionRepo.find({
      where: { user },
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const paymentCondition = await this.paymentConditionRepo.findOne({
      where: { user, rowid },
    });
    if (!paymentCondition) {
      throw new NotFoundException(`No exite`);
    }
    return paymentCondition;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdatePaymentConditionDto,
  ) {
    const paymentCondition = await this.paymentConditionRepo.findOne({
      where: { user, rowid },
    });
    this.paymentConditionRepo.merge(paymentCondition, changes);
    return this.paymentConditionRepo.save(paymentCondition);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const paymentCondition = await this.paymentConditionRepo.findOne({
      where: { user, rowid },
    });
    return this.paymentConditionRepo.delete(paymentCondition.rowid);
  }
}
