import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(process.env.PORT || 3000),
      DATABASE_URL: Joi.string().required(),
      PAGINATION_SKIP: Joi.number().default(process.env.PAGINATION_SKIP || 0),
      PAGINATION_LIMIT: Joi.number().default(
        process.env.PAGINATION_LIMIT || 20,
      ),
      JWT_SECRET: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get port(): number {
    return Number(this.get('PORT'));
  }

  get databaseUrl(): string {
    return this.get('DATABASE_URL');
  }

  get jwtSecret(): string {
    return this.get('JWT_SECRET');
  }

  get pagination(): any {
    return {
      skip: this.get('PAGINATION_SKIP'),
      limit: this.get('PAGINATION_LIMIT'),
    };
  }

  get paginationLimit(): number {
    return Number(this.get('PAGINATION_LIMIT'));
  }

  get paginationSkip(): number {
    return Number(this.get('PAGINATION_SKIP'));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
