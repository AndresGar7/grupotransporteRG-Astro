# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npx drizzle-kit studio`  | Opens a local GUI to manage your database data   |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


📋 Manual de Gestión de Base de Datos (Drizzle ORM + SQLite)

Este manual contiene los comandos esenciales para administrar, modificar y sincronizar la base de datos local (local.db) a medida que el proyecto Grupo Transporte RG vaya creciendo.

⚡ Comandos Rápidos de Sincronización (Desarrollo Diario)

Durante la fase de desarrollo, cuando estés creando nuevas tablas o añadiendo columnas rápidamente en src/db/schema.ts, utiliza este comando para aplicar los cambios al instante:

Sincronización Directa (Recomendado en Desarrollo):
`npx drizzle-kit push`

¿Qué hace? Compara tu archivo schema.ts directamente con tu archivo local.db e inyecta cualquier tabla o columna nueva en un segundo sin borrar tus datos actuales.

Cuándo usarlo: Cada vez que agregues una nueva tabla (como settings, conductores, camiones) y quieras verla reflejada de inmediato para seguir programando.
-----------------------------------------------------------------

🔒 Control de Cambios Oficial (Entorno de Producción / Despliegues)

Cuando el proyecto esté más maduro o vayas a subir cambios definitivos, el flujo correcto para mantener un historial de modificaciones (Migraciones) es el Administrative:

1. Generar el archivo de migración
`npx drizzle-kit generate`

¿Qué hace? Lee tu schema.ts y crea un archivo .sql dentro de la carpeta /drizzle. Es el plano arquitectónico del cambio.

2. Aplicar la migración a la base de datos
`npx drizzle-kit migrate`

¿Qué hace? Ejecuta los archivos .sql pendientes dentro de tu local.db para asegurar que la base de datos real esté perfectamente actualizada, respetando y conservando todos los datos existentes.

📊 Panel Visual de Administración
Abrir Drizzle Studio
`npx drizzle-kit studio`

¿Qué hace? Levanta un servidor local (normalmente en https://local.drizzle.studio) con una interfaz gráfica (GUI) idéntica a un gestor de bases de datos.

Cuándo usarlo: Para revisar si la tabla settings o noticias se crearon correctamente, insertar datos de prueba manualmente, editarlos o borrarlos visualmente.

⚠️ Reset Total (Borrar todo y empezar de cero)

Si estás haciendo pruebas, la base de datos se llena de datos falsos o conflictivos, y prefieres limpiar todo por completo para arrancar de cero, sigue estos pasos:

    Borra manualmente el archivo local.db (y local.db-journal si existe) de la raíz del proyecto.

    Borra la carpeta /drizzle si deseas limpiar también el historial de SQLs anteriores.

    Ejecuta el comando de empuje para recrear todo limpio basado en tu código actual:

`npx drizzle-kit push` 