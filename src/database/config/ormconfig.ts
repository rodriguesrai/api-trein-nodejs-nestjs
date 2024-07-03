import { ConfigModule } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';

ConfigModule.forRoot(); // load .env file
export const dataSourceOptions: DataSourceOptions = {
  type: (process.env.DATABASE_TYPE as any) ?? 'mysql',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) ?? 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  bigNumberStrings: true,
  multipleStatements: true,
  logging: true,
  entities: ['**/*.entity{ .ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
