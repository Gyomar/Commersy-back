import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DB_URL,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/modules/database/migrations/*.ts'],
  migrationsTableName: 't000_migrations',
});
