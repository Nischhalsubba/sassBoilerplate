# sassBoilerplate

A historical copy of the **JR Cologne Gulp Starter Kit** used for learning and experimenting with Sass, Pug, Babel, BrowserSync, image optimization, and Gulp 4 workflows.

## Important status

This repository is not the canonical source of the starter kit and should not be presented as an independently maintained npm package.

The package metadata identifies the upstream project as:

- Package: `@jr-cologne/create-gulp-starter-kit`
- Original author: JR Cologne
- Original repository: https://github.com/jr-cologne/gulp-starter-kit
- License: MIT

Use the original project and its current documentation when you need authoritative installation, issue tracking, releases, or licensing information.

## What the archived workflow includes

- Gulp 4 task automation
- Sass, SCSS, Less, and Stylus compilation
- Pug template compilation
- Babel-based JavaScript transpilation
- JavaScript concatenation and minification
- BrowserSync development server
- CSS autoprefixing and minification
- image optimization
- sourcemaps
- dependency and asset copying

## Historical requirements

The package declares Node.js 10 or newer, but several dependencies and build assumptions are now old. Modern Node.js versions may expose incompatibilities, especially around:

- `gulp-sass` 4 and its native Sass implementation
- older image-minification packages
- deprecated dependency versions
- older Babel and webpack-stream behavior

Do not assume the project builds on a current runtime without testing and dependency migration.

## Run the archived version

```bash
npm install
npm start
```

Build without the development server:

```bash
npm run build
```

These commands describe the historical package scripts, not a guarantee of compatibility with modern Node.js.

## Recommended modern direction

For new static projects, consider:

- Dart Sass instead of deprecated native Sass bindings
- Vite or another supported build tool
- PostCSS and Autoprefixer
- native ES modules
- modern image pipelines
- explicit linting and formatting

## Repository purpose

This copy is retained as a learning archive showing an earlier static-site automation workflow. It should not be published to npm under the upstream package name or used to report issues to the original project without first reproducing them against the canonical repository.
