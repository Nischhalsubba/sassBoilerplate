<div align="center">

# ⚙️ sassBoilerplate

### Gulp 4 Starter Kit for Modern Static Frontend Development

**A practical frontend workflow for compiling Sass/SCSS, Less, Stylus, Pug templates, ES6+ JavaScript, optimized images, sourcemaps, dependencies, and live-reloaded static sites.**

[![npm](https://img.shields.io/npm/v/@jr-cologne/create-gulp-starter-kit.svg?style=for-the-badge)](https://www.npmjs.com/package/@jr-cologne/create-gulp-starter-kit)
![Gulp](https://img.shields.io/badge/Gulp-4.0-CF4647?style=for-the-badge&logo=gulp&logoColor=white)
![Sass](https://img.shields.io/badge/Sass%20%2F%20SCSS-Ready-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Pug](https://img.shields.io/badge/Templates-Pug-A86454?style=for-the-badge)
![Babel](https://img.shields.io/badge/JavaScript-Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=111111)
![MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## ✨ Overview

**sassBoilerplate** is a Gulp 4 starter workflow for building static websites with a more organized frontend development setup.

It helps automate repetitive tasks such as:

- compiling Sass/SCSS, Less, or Stylus into CSS
- autoprefixing CSS
- minifying CSS
- compiling Pug templates into HTML
- transpiling ES6+ JavaScript through Babel
- concatenating and minifying JavaScript
- optimizing images
- copying dependencies into the distribution folder
- generating sourcemaps
- running a BrowserSync development server
- watching files and reloading automatically

This repo is especially useful for designers and front-end developers who want a simple but capable static-site workflow without immediately reaching for a large framework.

---

## 🧭 Table of Contents

- [Why This Exists](#-why-this-exists)
- [Designer’s Perspective](#-designers-perspective)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Requirements](#-requirements)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Supported CSS Preprocessors](#-supported-css-preprocessors)
- [Image Support](#-image-support)
- [Recommended Folder Structure](#-recommended-folder-structure)
- [Usage FAQ](#-usage-faq)
- [Quality Checklist](#-quality-checklist)
- [Contributing](#-contributing)
- [Versioning](#-versioning)
- [License](#-license)

---

## 🎯 Why This Exists

Many static websites still need a reliable development workflow:

- designers need organized Sass files
- developers need live reload
- projects need optimized images
- teams need compiled templates
- browsers need prefixed CSS
- production files need minification

`sassBoilerplate` brings those needs into one reusable starter kit.

---

## 🎨 Designer’s Perspective

This project is useful for design-led frontend work because it allows a designer who knows code to build faster without manually repeating boring setup tasks.

Instead of manually compiling styles, refreshing pages, minifying files, and copying assets, the workflow lets the designer focus on:

- layout
- spacing
- typography
- component structure
- responsive behavior
- visual polish
- interaction details

The tool is intentionally practical. It is not trying to become a full application framework. It is a build workflow for static websites and frontend prototypes.

---

## 🌟 Features

| Feature | Description |
|---|---|
| HTML copy | Copies HTML files from `src` to `dist` |
| Pug compilation | Compiles `.pug` templates into HTML |
| CSS preprocessing | Supports Sass, SCSS, Less, and Stylus |
| Autoprefixing | Adds browser-specific CSS prefixes |
| CSS minification | Minifies production CSS |
| JavaScript transpilation | Compiles ES6+ code through Babel |
| JS concat/minify | Concatenates and minifies scripts |
| Image optimization | Compresses supported image assets |
| Dependency copy | Copies package dependencies into `dist` where configured |
| ES modules | Supports importing dependencies with ES6 modules |
| BrowserSync | Runs local server at `http://localhost:3000` with auto reload |
| Sourcemaps | Helps debug compiled CSS/JS during development |

---

## 🛠 Tech Stack

| Area | Packages / Tools |
|---|---|
| Task Runner | Gulp 4 |
| Local Server | BrowserSync |
| CSS | Sass, SCSS, Less, Stylus, Autoprefixer, CleanCSS |
| JavaScript | Babel, webpack-stream, Uglify |
| Templates | Pug |
| Images | gulp-imagemin |
| File Handling | del, fs-extra, gulp-dependents, gulp-plumber |
| Debugging | sourcemaps |

---

## 📋 Requirements

Install these before running the project:

- Node.js `>= 10.0`
- npm
- Gulp 4 / Gulp CLI

Install Gulp CLI globally if needed:

```bash
npm install --global gulp-cli
```

---

## 🚀 Getting Started

### Option 1: npm initializer

```bash
npm init @jr-cologne/gulp-starter-kit your-project-name
cd your-project-name
npm start
```

One-line version:

```bash
npm init @jr-cologne/gulp-starter-kit your-project-name && cd your-project-name && npm start
```

### Option 2: Git clone

```bash
git clone https://github.com/Nischhalsubba/sassBoilerplate.git your-project-name
cd your-project-name
npm install
npm start
```

---

## 📜 Scripts

| Command | Purpose |
|---|---|
| `npm start` | Builds files, starts BrowserSync, and watches for changes |
| `npm run build` | Builds all files without starting dev server/watch mode |

---

## 🎨 Supported CSS Preprocessors

| Preprocessor | Source Folder |
|---|---|
| Sass | `src/assets/sass` |
| SCSS | `src/assets/scss` |
| Less | `src/assets/less` |
| Stylus | `src/assets/stylus` |

To switch preprocessors, move your source styles into the matching folder and remove the unused preprocessor folder if needed.

---

## 🖼 Image Support

Supported image types:

- PNG
- JPG / JPEG
- GIF
- SVG
- ICO, copied but not compressed

Image optimization is useful for static sites where large assets can slow down first load.

---

## 📁 Recommended Folder Structure

```text
.
├── src/
│   ├── assets/
│   │   ├── img/
│   │   ├── js/
│   │   ├── sass/ or scss/
│   │   └── fonts/
│   ├── pug/
│   └── index.html
├── dist/
├── gulpfile.js
├── package.json
└── README.md
```

---

## ❓ Usage FAQ

### How do I install into the current directory?

Append `--current-dir` to the npm init command:

```bash
npm init @jr-cologne/gulp-starter-kit your-project-name --current-dir
```

### How do I set browser targets for autoprefixer?

Add `browserslist` to `package.json`:

```json
{
  "browserslist": [
    "last 3 versions",
    "> 0.5%"
  ]
}
```

### How do I import npm dependencies?

Install the dependency:

```bash
npm install axios
```

Then import it in your JavaScript:

```js
import axios from 'axios';
```

---

## ✅ Quality Checklist

Before using this for a production static site:

- [ ] Confirm `npm install` works.
- [ ] Confirm `npm start` runs BrowserSync.
- [ ] Confirm `npm run build` creates production files.
- [ ] Confirm CSS compiles from the chosen preprocessor.
- [ ] Confirm JavaScript builds and minifies.
- [ ] Confirm images are optimized.
- [ ] Confirm sourcemaps work in development.
- [ ] Confirm final `dist` folder contains all required assets.
- [ ] Remove unused preprocessors or starter files.

---

## 🤝 Contributing

Contributions are welcome.

Recommended flow:

1. Open an issue describing the change.
2. Fork the repository.
3. Clone your fork.
4. Make and test changes.
5. Open a detailed pull request.

---

## 🧾 Versioning

This project follows semantic versioning principles.

For more details, see:

```text
https://semver.org/
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

<div align="center">

A practical frontend starter for designers and developers who want a clean static-site workflow.

</div>
