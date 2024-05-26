
# File Splitter Electron

A utility to split large files into manageable parts using Electron.

## Features

- Split large files into smaller parts.
- User-friendly interface with progress updates.
- Cross-platform support (Windows, macOS, Linux).

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Electron

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sironekotoro/file-splitter-electron.git
   cd file-splitter-electron
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

### Development

1. **Start the application:**

   ```bash
   npm start
   ```

2. **Build the application:**

   ```bash
   npm run build
   ```

## Project Structure

- `main.js`: Main process script, handles file splitting logic and communication with renderer process.
- `renderer.js`: Renderer process script, handles UI updates and communication with main process.
- `preload.js`: Preload script, provides a secure bridge between the main and renderer processes.
- `index.html`: Main HTML file, contains the user interface.
- `package.json`: Project configuration file, includes dependencies and scripts.
- `.gitignore`: Specifies files and directories to be ignored by git.

## Scripts

- **`start`**: Runs the application in development mode.
- **`build`**: Builds the application for distribution.

## Dependencies

- **`electron`**: ^30.0.8
- **`electron-builder`**: ^24.13.3

## Development Dependencies

- **`electron`**: ^30.0.8
- **`electron-builder`**: ^24.13.3

## License

This project is licensed under the ISC License.

## Author

[sironekotoro](https://github.com/sironekotoro)
