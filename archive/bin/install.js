#!/usr/bin/env node
/*
 * CLI installer from the archived JR Cologne Gulp Starter Kit.
 * Creates a project directory, initializes npm, installs the starter's declared
 * development dependencies, and copies the build configuration and example source.
 */

const fs = require("fs-extra");
const path = require("path");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);
const dependencies = require("../package.json").devDependencies;
const projectName = process.argv[2];

/** Returns long-form command-line flags supplied after the project name. */
function getFlagsFromArguments(args) {
  return args.slice(3).filter((value) => value.startsWith("--"));
}

/** Converts supported CLI flags into the installer options object. */
function getOptionsFromFlags(flags) {
  return {
    installInCurrentDir: flags.includes("--current-dir"),
  };
}

/** Checks whether the caller supplied a non-empty project name. */
function checkProjectName(name) {
  return typeof name === "string" && name.trim().length > 0;
}

/** Resolves the project folder name while preserving the --current-dir option. */
function getProjectFolderFromName(name, installOptions) {
  return installOptions.installInCurrentDir ? "" : name.trim();
}

/** Returns an absolute filesystem path for the requested project destination. */
function getProjectPath(projectFolder) {
  return path.resolve(process.cwd(), projectFolder || ".");
}

/** Initializes package.json and the starter build/config files in the destination. */
async function initProject(projectFolder) {
  const projectPath = getProjectPath(projectFolder);
  await fs.ensureDir(projectPath);

  await execFileAsync("npm", ["init", "-y"], { cwd: projectPath });

  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.scripts = {
    ...(packageJson.scripts || {}),
    start: "gulp",
    build: "gulp build",
  };
  delete packageJson.scripts.test;
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  const filesToCopy = ["gulpfile.js", ".editorconfig"];
  for (const fileName of filesToCopy) {
    const destination = path.join(projectPath, fileName);
    if (!fs.existsSync(destination)) {
      await fs.copy(path.join(__dirname, "..", fileName), destination);
    }
  }

  const gitignorePath = path.join(projectPath, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    await fs.writeFile(gitignorePath, "node_modules\ndist\n");
  }

  return true;
}

/** Formats dependency entries as npm package specifiers such as name@version. */
function getFormattedDependencies(dependencyMap) {
  return Object.entries(dependencyMap).map(
    ([name, version]) => `${name}@${version}`,
  );
}

/** Installs the starter kit's development dependencies in the destination project. */
async function installDependencies(dependencyMap, projectFolder) {
  const dependencySpecs = getFormattedDependencies(dependencyMap);
  if (dependencySpecs.length === 0) {
    return true;
  }

  const { stdout } = await execFileAsync(
    "npm",
    ["install", "--save-dev", ...dependencySpecs],
    { cwd: getProjectPath(projectFolder) },
  );

  if (stdout) {
    process.stdout.write(stdout);
  }

  return true;
}

/** Copies the archived example source tree when the destination does not already contain one. */
async function copyAdditionalFiles(projectFolder) {
  const sourcePath = path.join(__dirname, "..", "src");
  const destinationPath = path.join(getProjectPath(projectFolder), "src");

  if (!fs.existsSync(destinationPath)) {
    await fs.copy(sourcePath, destinationPath);
  }

  return true;
}

/** Runs the full starter installation workflow and returns the created folder name. */
async function install(name, dependencyMap, installOptions) {
  const projectFolder = getProjectFolderFromName(name, installOptions);

  console.log("npm init - Initializing your project...");
  await initProject(projectFolder);
  console.log("npm init successful - Your npm package has been initialized");

  console.log("Installing dependencies - This might take a few minutes...");
  await installDependencies(dependencyMap, projectFolder);
  console.log("Dependency installation successful - All dependencies have been installed");

  console.log("Copying additional files...");
  await copyAdditionalFiles(projectFolder);
  console.log("Copying additional files successful");

  return projectFolder;
}

/** Prints a concise failure message and sets a non-zero exit status for the CLI. */
function handleInstallError(error) {
  console.error("Oops, looks like something went wrong installing the Gulp Starter Kit.");
  if (error && error.message) {
    console.error(error.message);
  }
  process.exitCode = 1;
}

/** Prints the final destination after a successful installation. */
function handleInstallSuccess(projectFolder) {
  const destination = projectFolder || "current";
  console.log(`\nAll done!\nYour project has been set up to the ${destination} folder.\nHappy Coding!`);
}

const options = getOptionsFromFlags(getFlagsFromArguments(process.argv));

if (!checkProjectName(projectName)) {
  console.error(
    "Oops, looks like you have not specified any project name. Please make sure to do that.",
  );
  process.exitCode = 1;
} else {
  install(projectName, dependencies, options)
    .then(handleInstallSuccess)
    .catch(handleInstallError);
}
