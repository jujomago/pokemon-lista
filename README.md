This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Poke Lista

Una aplicación React con TypeScript que implementa autenticación y visualización de datos de la PokéAPI con más de 2000 elementos.

<div align="center">
  <img src="https://github.com/user-attachments/assets/29bf2dbf-43bf-489e-b1a6-46ef285313a2" width="600" />
</div>


## 🛠️ Tecnologías Utilizadas

- **React 19** con TypeScript
- **Next.js 15** (App Router)
- **Tailwind CSS** con colores personalizados Pokémon
- **shadcn/ui** para componentes de interfaz
- **Axios** para peticiones HTTP a PokéAPI
- **Context API** para manejo de estado global
- **LocalStorage** para persistencia de tokens
- **PokéAPI** para datos de Pokémon


## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio**
   \`\`\`bash
   git clone https://github.com/jujomago/pokemon-lista.git   
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   # o
   yarn install
   \`\`\`

3. **Ejecutar en modo desarrollo**
   \`\`\`bash
   npm run dev
   # o
   yarn dev
   \`\`\`

4. **Abrir en el navegador**
   - Navega a \`http://localhost:3000\`
   - Usa cualquier email y contraseña para hacer login (es un fake login)


## 🎮 Integración con PokéAPI

La aplicación utiliza la [PokéAPI](https://pokeapi.co/) para obtener datos de Pokémon:

- **1200+ Pokémon** de la lista principal
- **600+ especies** con información detallada  
- **18+ tipos** de Pokémon
- **400+ habilidades** disponibles

## 🔄 Scripts Disponibles

- \`npm run dev\`: Ejecuta en modo desarrollo
- \`npm run build\`: Construye para producción
- \`npm run start\`: Ejecuta build de producción
- \`npm run lint\`: Ejecuta linter

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
