import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { DATABASE_CONNECTION } from "../../constants/database-connection";
import { logger } from "../../utils/logger";

export interface DatabaseModuleOptions {
  dbName: string;
  connectionName: DATABASE_CONNECTION;
  schema: Record<string, unknown>;
}

@Module({})
export class DatabaseModule {
  static forRootAsync({
    dbName,
    connectionName,
    schema,
  }: DatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: connectionName,
          useFactory: async (configService: ConfigService) => {
            const host = configService.get<string>("db.POSTGRES_HOST");
            const port = configService.get<number>("db.POSTGRES_PORT");
            const username = configService.get<string>("db.POSTGRES_USER");
            const password = configService.get<string>("db.POSTGRES_PASSWORD");
            const dbConnectionName = configService.get<string>(
              `db.POSTGRES_${dbName}_DATABASE`,
            );
            const connectionString = `postgresql://${username}:${password}@${host}:${port}/${dbConnectionName}`;

            const pool = new Pool({
              connectionString: connectionString,
            });
            try {
              await pool.query("SELECT 1");
              logger.info(
                `Successfully connected to ${dbConnectionName} database`,
              );
            } catch (error) {
              console.log(connectionString);
              logger.error(
                `Failed to connect to ${dbConnectionName} database`,
                error,
              );
              throw error;
            }
            return drizzle(pool, schema);
          },
          inject: [ConfigService],
        },
      ],
      exports: [connectionName],
    };
  }
}
