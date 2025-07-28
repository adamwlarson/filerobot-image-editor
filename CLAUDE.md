# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Filerobot Image Editor (FIE) is a React-based image editing library that provides a comprehensive set of tools for image manipulation including cropping, filtering, annotation, watermarking, and more. The project is structured as a monorepo with two main packages:

- `react-filerobot-image-editor`: The core React component library
- `filerobot-image-editor`: VanillaJS wrapper for the React component

## Development Commands

### Core Development
- `yarn dev` - Start development server (runs on port 1111)
- `yarn dev:force-prebundle-deps` - Start dev server with forced prebundling
- `yarn fix` - Format code with prettier-eslint

### Building & Publishing
- `yarn build:packages` - Build all packages (runs `lerna run build:lib`)
- `yarn build:js-bundle` - Build production JS bundle using Vite
- `yarn build:gh-pages` - Build demo for GitHub Pages
- `yarn publish:packages` - Build and publish packages via Lerna
- `yarn publish:js-bundle` - Build and deploy JS bundle to Filerobot CDN

### Release Management
- `yarn release:beta` - Release beta version (packages + CDN bundle)
- `yarn release:prod` - Full production release (packages + CDN + demo)
- `yarn release:gh-pages` - Build and deploy GitHub Pages demo

### Analysis & Maintenance
- `yarn analyze:bundle` - Analyze bundle size with source-map-explorer
- `yarn update` - Update dependencies using lerna-update-wizard

## Architecture & Structure

### Monorepo Structure
The project uses Lerna with Yarn workspaces. Key directories:
- `packages/react-filerobot-image-editor/src/` - Main React component source
- `packages/filerobot-image-editor/src/` - VanillaJS wrapper
- `public/` - Demo assets and configuration

### Core Architecture Components

#### State Management (`src/context/`)
- Uses React Context + Reducer pattern
- `AppProvider.jsx` - Main context provider
- `appReducer.js` - State reducer with actions
- `getInitialAppState.js` - Initial state calculation
- `defaultConfig.js` - Default configuration values

#### Component Hierarchy (`src/components/`)
- `App/` - Root application component
- `MainCanvas/` - Canvas rendering with Konva.js
- `Layers/` - Design and transformation layers
- `ToolsBar/` - Tool selection interface
- `Topbar/` - Navigation and save controls
- `Tabs/` - Tab-based tool organization

#### Tools System (`src/components/tools/`)
Each tool (Crop, Rotate, Filters, etc.) follows a consistent pattern:
- `{Tool}Button.jsx` - Tool activation button
- `{Tool}Options.jsx` - Tool-specific options panel
- `index.js` - Tool export and configuration

#### Canvas System (`src/components/Layers/`)
- `DesignLayer/` - Handles annotations and drawing
- `TransformersLayer/` - Manages object transformations
- Uses Konva.js for canvas rendering and interactions

#### Custom Features (`src/custom/`)
- `filters/` - Instagram-style image filters
- `finetunes/` - Image adjustment utilities

### Key Dependencies
- **react-konva**: Canvas rendering and interactions
- **styled-components**: Component styling
- **@scaleflex/ui**: UI component library
- **@scaleflex/icons**: Icon components

## Configuration

### Default Configuration
The main configuration is in `packages/react-filerobot-image-editor/src/context/defaultConfig.js`. This file defines:
- Tool-specific settings
- UI behavior options
- Theme configuration
- Cloudimage integration settings

### Demo Configuration
`public/demo-config.js` shows example configurations for various tools and features.

## Development Patterns

### Adding New Properties
When adding new configuration properties, ensure they exist in:
1. `README.md` (documentation)
2. `packages/react-filerobot-image-editor/src/index.d.ts` (TypeScript definitions)
3. `defaultConfig.js` (default values)
4. `demo-config.js` (examples)
5. Feature implementation files

### Code Style
- Uses ESLint with Airbnb config + Prettier
- React functional components with arrow functions
- Styled-components for styling
- PropTypes for runtime type checking

### Testing & Quality
- ESLint configuration in `.eslintrc.js`
- Prettier configuration in `.prettierrc`
- Use `yarn fix` to format code before committing

## Build System

### Vite Configuration
- Development server on port 1111
- Production builds use Terser for minification
- Supports both library builds and demo builds
- Custom resolution for package imports

### Babel Configuration
- Uses `babel.config.json` for package builds
- Supports React JSX and modern JavaScript features
- Styled-components plugin for optimization

## Release Process

The project uses Lerna for versioning and publishing:
1. Version bumping via `lerna publish`
2. Package building via individual package scripts
3. CDN deployment for VanillaJS bundle
4. GitHub Pages deployment for demo

Version information is stored in `lerna.json` and referenced by the deploy script.