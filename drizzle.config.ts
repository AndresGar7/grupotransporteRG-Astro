import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // Donde definiremos tus tablas (noticias, imágenes)
  out: './drizzle',             // Carpeta donde se guardará el historial de cambios
  dialect: 'sqlite',            // Usaremos SQLite para que sea local
  dbCredentials: {
    url: 'file:local.db',       // El nombre del archivo de tu base de datos
  },
});