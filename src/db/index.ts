import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:local.db', // Esto creará un archivo llamado local.db en tu proyecto
});

export const db = drizzle(client);