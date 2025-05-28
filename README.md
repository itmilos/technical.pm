# Technical Product Manager Portfolio

A modern, responsive portfolio website built with Astro and Tailwind CSS.

## Features

- 🚀 Built with Astro for optimal performance
- 💅 Styled with Tailwind CSS
- 📱 Fully responsive design
- 🎨 Modern and clean UI
- ⚡ Fast page loads
- 🔍 SEO friendly

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd technical.pm
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
technical.pm/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   ├── layouts/     # Page layouts
│   ├── pages/       # Astro pages
│   └── styles/      # Global styles
├── astro.config.mjs # Astro configuration
└── tailwind.config.mjs # Tailwind CSS configuration
```

## Customization

1. Update the content in `src/pages/index.astro` with your personal information
2. Modify the styles in `src/styles/global.css`
3. Update the favicon in `public/favicon.svg`
4. Customize the color scheme in `tailwind.config.mjs`

## License

MIT License - feel free to use this template for your own portfolio!

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

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

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
