// src/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Tabla para las noticias
export const noticias = sqliteTable('noticias', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titulo: text('titulo').notNull(),
  contenido: text('contenido').notNull(),
  imagen: text('imagen'), // Aquí guardaremos la ruta de la foto del camión/viaje
  fecha: text('fecha').default(new Date().toISOString()),
});

// Tabla para la configuración de la Home (Textos dinámicos)
export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(), // Ej: "titulo_hero"
  value: text('value').notNull(),
});