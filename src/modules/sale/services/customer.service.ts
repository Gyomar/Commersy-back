import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from '../dtos/customer.dtos';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.customerRepo.save(newCustomer);
  }

  async count(user: { rowid: number }) {
    const countData = await this.customerRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterCustomerDto) {
    if (params) {
      const { limit, offset } = params;
      return this.customerRepo.find({
        where: { user },
        relations: ['typeDoc'],
        take: limit,
        skip: offset,
      });
    }

    return this.customerRepo.find({
      where: { user },
      relations: ['typeDoc'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const customer = await this.customerRepo.findOne({
      where: { user, rowid },
      relations: ['typeDoc', 'sales', 'quotations'],
    });
    if (!customer) {
      throw new NotFoundException(`No exite`);
    }
    return customer;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateCustomerDto,
  ) {
    const customer = await this.customerRepo.findOne({
      where: { user, rowid },
    });
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const customer = await this.customerRepo.findOne({
      where: { user, rowid },
    });
    return this.customerRepo.delete(customer.rowid);
  }
}
