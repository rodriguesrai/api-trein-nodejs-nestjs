import { ConfigModule } from '@nestjs/config';
import { Cats } from './entities/cats.entity';
import { Users } from './entities/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot();
export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Cats, Users],
  synchronize: false,
};

const dataSourceInstance = new DataSource(typeOrmConfig);
export default dataSourceInstance;
