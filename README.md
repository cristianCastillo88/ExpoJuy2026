# ExpoJuy 2026 — Innovación, Talento y Producción Sustentable 🇦🇷

Sitio web y plataforma oficial interactiva para la **ExpoJuy 2026**, la muestra multisectorial más importante del Noroeste Argentino (NOA), organizada con el respaldo de la Cámara de Comercio Exterior de Jujuy.

El proyecto está desarrollado con tecnologías modernas orientadas a rendimiento, interactividad y diseño responsivo de primer nivel.

---

## 🚀 Tecnologías Utilizadas

- **[React 19](https://react.dev/)**: Biblioteca principal para interfaces de usuario reactivas y modernas.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para un desarrollo seguro y escalable.
- **[Vite 8](https://vitejs.dev/)**: Entorno de desarrollo ultrarrápido y empaquetador para producción.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Motor de estilos y utilidades CSS de última generación con plugin nativo `@tailwindcss/vite`.
- **[oxfmt](https://oxc.rs/)**: Formateador de código rápido y ligero.

---

## 📋 Requisitos Previos

Asegúrate de tener instalado en tu sistema:

- **[Node.js](https://nodejs.org/)**: Versión 18 o superior (recomendado Node.js 20+ LTS).
- Un gestor de paquetes: **npm**, **pnpm** o **yarn**.

---

## 🛠️ Instalación y Puesta en Marcha

Sigue estos pasos para clonar y ejecutar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/cristianCastillo88/ExpoJuy2026.git
cd "ExpoJuy 2026"
```

### 2. Instalar dependencias
Usando **npm**:
```bash
npm install
```

*(O si utilizas pnpm)*:
```bash
pnpm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
*(o `pnpm dev`)*

El servidor se iniciará localmente. Abre tu navegador en la URL que aparece en la terminal (por defecto [http://localhost:5173](http://localhost:5173) o la asignada por Vite).

---

## 📜 Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo con Hot Module Replacement (HMR). |
| `npm run build` | Compila y optimiza el proyecto para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el build de producción generado. |
| `npm run format` | Da formato a los archivos fuente usando `oxfmt`. |

---

## 🌟 Funcionalidades de la Plataforma

1. **Página de Inicio (`Home`)**:
   - **Hero interactivo** con temporizador en tiempo real hacia la apertura del evento.
   - **Métricas clave**: stands, visitantes proyectados, rondas de negocios y países participantes.
   - **Sectores productivos**: Minería sustentable (Litio), Energías renovables (Solar), Bioeconomía y Agroindustria, Industria del Software y Economía del Conocimiento.
   - **Oradores y Conferencias**: Ponentes nacionales e internacionales confirmados.
   - **Preguntas Frecuentes (FAQ)** en acordeón interactivo.
   - **Ubicación y accesos** al predio ferial en San Salvador de Jujuy.

2. **Agenda y Cronograma (`Agenda`)**:
   - Calendario interactivo con filtros por día y ejes temáticos.
   - Detalle de horarios, salas, disertantes y temáticas de charlas y rondas B2B.

3. **Venta y Acreditación de Entradas (`Tickets`)**:
   - Tipos de pase: *Pase General*, *Pase Estudiante* y *Pase Business B2B*.
   - Calculadora y formulario de adquisición de entradas interactivo con resumen en tiempo real.

---

## 📁 Estructura del Proyecto

```text
ExpoJuy 2026/
├── public/                 # Archivos estáticos públicos (favicons, logos)
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Navbar.tsx      # Barra de navegación principal y mobile
│   │   └── Footer.tsx      # Pie de página con enlaces y datos de contacto
│   ├── imports/            # Recursos gráficos, logotipos e isotipos del evento
│   ├── pages/              # Vistas principales de la aplicación
│   │   ├── Home.tsx        # Portada, sectores, countdown, FAQ y oradores
│   │   ├── Agenda.tsx      # Cronograma por día y temática de actividades
│   │   └── Tickets.tsx     # Reserva y compra de pases y acreditaciones
│   ├── App.tsx             # Componente raíz con enrutamiento de estado
│   ├── index.css           # Configuración de estilos globales y Tailwind CSS v4
│   ├── main.tsx            # Punto de entrada de React
│   └── types.ts            # Definición de tipos TypeScript globales
├── index.html              # Plantilla HTML principal
├── package.json            # Dependencias y scripts del proyecto
├── tsconfig.json           # Configuración de TypeScript
└── vite.config.ts          # Configuración de Vite y plugins
```

---

## 🤝 Contribución

1. Haz un Fork del proyecto.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un **Pull Request**.

---

## 📄 Licencia

Este proyecto es de uso privado e institucional para la difusión y gestión del evento **ExpoJuy 2026**. Todos los derechos reservados.
