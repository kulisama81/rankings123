const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../node_modules/flag-icons/flags/4x3');
const targetDir = path.join(__dirname, '../public/flags');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Read all SVG files from source
const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.svg'));

// Copy each file
let count = 0;
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  fs.copyFileSync(sourcePath, targetPath);
  count++;
});

console.log(`✓ Copied ${count} flag SVGs to public/flags/`);
