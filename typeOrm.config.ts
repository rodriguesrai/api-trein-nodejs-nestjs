// import { ConfigModule } from '@nestjs/config';
// import { join } from 'path';
// import { DataSourceOptions, DataSource } from 'typeorm';

// ConfigModule.forRoot(); // load .env file

// export const dataSourceOptions: DataSourceOptions = {
//   type: (process.env.DATABASE_TYPE as any) ?? 'mysql',
//   host: 'localhost',
//   port: parseInt(process.env.DATABASE_PORT, 10) ?? 3306,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   bigNumberStrings: true,
//   multipleStatements: true,
//   logging: true,
//   entities: [join(__dirname, 'src', 'entities', '*.entity.{ts,js}')],
//   migrations: [join(__dirname, 'src', 'database', 'migrations', '*.{ts,js}')],
//   migrationsRun: true,
// };

// const dataSource = new DataSource(dataSourceOptions);

// export default dataSource;
