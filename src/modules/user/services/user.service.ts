import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dtos/user.dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  async count() {
    const countData = await this.userRepo.count();
    return countData;
  }

  async findAll(params?: FilterUserDto) {
    if (params) {
      const { limit, offset } = params;
      return this.userRepo.find({
        relations: ['subscription'],
        take: limit,
        skip: offset,
      });
    }

    return this.userRepo.find({ relations: ['subscription'] });
  }

  async findOne(rowid: number) {
    const user = await this.userRepo.findOne({
      where: { rowid },
      relations: ['subscription'],
    });
    if (!user) {
      throw new NotFoundException(`Categoria no exite`);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async update(rowid: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ rowid });
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  delete(rowid: number) {
    return this.userRepo.delete(rowid);
  }
}
