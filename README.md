
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## Base de Datos y Almacenamiento de Imágenes

### Base de Datos
- **Archivo SQLite:** `fif_store.db` ubicado en la raíz del proyecto.
- **Script SQL / Respaldo:** `fif_store.sql` con el esquema DDL y la carga de 100 productos clasificados y usuarios de prueba.
- **Acceso / ORM:** Conexión mediante `better-sqlite3` en `app/lib/db.ts` con soporte WAL.

### ¿Dónde se almacenan las fotos de los productos?
1. **Fotografías de productos nuevos (subidas por usuarios):**
   - Se capturan y procesan desde el formulario `app/components/products/productForm.tsx` (reducidas a max 800px vía HTML5 Canvas en formato JPEG).
   - Se almacenan codificadas como Data URLs (Base64 `data:image/jpeg;base64,...`) directamente en la base de datos SQLite (`fif_store.db`), en la tabla `productos`, columna `imagenes` (almacenado como un arreglo JSON de strings: `["data:image/jpeg;base64,..."]`).
2. **Catálogo inicial (100 productos precargados):**
   - Almacenados en la misma columna `imagenes` de la tabla `productos` en `fif_store.db` como URLs web públicas optimizadas.
3. **Íconos por categoría (fallback cuando un producto no tiene foto o falla):**
   - Ruta física: `public/icons/`
   - Ejemplos: `/icons/fries.png` (Papas), `/icons/cookie.png` (Galletas), `/icons/candy.png` (Gomitas / Dulces), `/icons/soda.png` (Bebidas), `/icons/pizza.png` (Comida).
4. **Imágenes estáticas de marca / logos:**
   - Ruta física: `public/images/` (`FIF_STORE-removebg-preview.png`, `7-removebg-preview.png`).

