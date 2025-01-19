import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/config/env';
import * as schema from '@/db/schema';

export const connection = postgres(env.DATABASE_URL);

export const db = drizzle(connection, { schema, logger: true });
