import { Injectable } from '@nestjs/common/decorators';
import { drizzle, MySqlDatabase } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DBClient {
  async connect() {
    const connection = await mysql.createConnection({
      host: process.env['DB_HOST'],
      port: parseInt(process.env['DB_PORT']),
      user: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_DATABASE'],
    });
    return connection;
  }

  async db() {
    const connection = await this.connect();
    return drizzle(connection);
  }
}
