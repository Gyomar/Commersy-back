import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentMethod } from '../entities/payment_method.entity';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
  FilterPaymentMethodDto,
} from '../dtos/payment_method.dtos';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepo: Repository<PaymentMethod>,
  ) {}

  create(data: CreatePaymentMethodDto) {
    const newPaymentMethod = this.paymentMethodRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.paymentMethodRepo.save(newPaymentMethod);
  }

  async count(user: { rowid: number }) {
    const countData = await this.paymentMethodRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterPaymentMethodDto) {
    if (params) {
      const { limit, offset } = params;
      return this.paymentMethodRepo.find({
        where: { user },
        take: limit,
        skip: offset,
      });
    }

    return this.paymentMethodRepo.find({
      where: { user },
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const paymentMethod = await this.paymentMethodRepo.findOne({
      where: { user, rowid },
    });
    if (!paymentMethod) {
      throw new NotFoundException(`No exite`);
    }
    return paymentMethod;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdatePaymentMethodDto,
  ) {
    const paymentMethod = await this.paymentMethodRepo.findOne({
      where: { user, rowid },
    });
    this.paymentMethodRepo.merge(paymentMethod, changes);
    return this.paymentMethodRepo.save(paymentMethod);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const paymentMethod = await this.paymentMethodRepo.findOne({
      where: { user, rowid },
    });
    return this.paymentMethodRepo.delete(paymentMethod.rowid);
  }
}
