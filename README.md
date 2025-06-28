# Link Shortener

Acortador de enlaces sencillo creado con Next.js (App Router), base de dat Noseon (PostgreSQL serverless) y desplegado en Vercel.  
Permite ingresar una URL larga y obtener un enlace corto personalizado. Al acceder al enlace corto, redirige automáticamente a la URL original.

No utiliza un servicio de dominios personalizados por un tema de mantenimiento.

---

## Demo

👉 [https://mi-app.vercel.app](https://mi-app.vercel.app)

---

## Características

- Generación de códigos únicos alfanuméricos para enlaces cortos
- Guardado de enlaces originales y códigos en Neon (PostgreSQL)
- Endpoint para crear enlaces cortos vía API REST (POST)
- Ruta dinámica para redirección automática
- Frontend React con formulario para acortar enlaces y mostrar resultados

---

## Tecnologías usadas

- [Next.js](https://nextjs.org/) (App Router)
- [Neon](https://neon.tech/) — PostgreSQL serverless
- [Vercel](https://vercel.com/) para despliegue
- TypeScript
- React
- Tailwind CSS

---

## Instalación local

1. Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/link-shortener.git
cd link-shortener

npm install
```

2. Crear un archivo `.env.local` para la conexión con la base de datos.

3. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```