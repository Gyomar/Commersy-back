import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Zone } from '../entities/zone.entity';
import { CreateZoneDto, UpdateZoneDto, FilterZoneDto } from '../dtos/zone.dtos';

@Injectable()
export class ZoneService {
  constructor(@InjectRepository(Zone) private zoneRepo: Repository<Zone>) {}

  create(data: CreateZoneDto) {
    const newZone = this.zoneRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.zoneRepo.save(newZone);
  }

  async count(user: { rowid: number }) {
    const countData = await this.zoneRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterZoneDto) {
    if (params) {
      const { limit, offset } = params;
      return this.zoneRepo.find({
        where: { user },
        take: limit,
        skip: offset,
      });
    }

    return this.zoneRepo.find({
      where: { user },
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const zone = await this.zoneRepo.findOne({
      where: { user, rowid },
      relations: ['customers'],
    });
    if (!zone) {
      throw new NotFoundException(`No exite`);
    }
    return zone;
  }

  async update(user: { rowid: number }, rowid: number, changes: UpdateZoneDto) {
    const zone = await this.zoneRepo.findOne({
      where: { user, rowid },
    });
    this.zoneRepo.merge(zone, changes);
    return this.zoneRepo.save(zone);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const zone = await this.zoneRepo.findOne({
      where: { user, rowid },
    });
    return this.zoneRepo.delete(zone.rowid);
  }
}
