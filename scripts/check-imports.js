const fs = require('fs');
const path = require('path');

const checkBadImports = (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      checkBadImports(fullPath);
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf-8');

      const badImports = content.match(/(import .* from ['"]{1}['"]{1})|(require\(['"]{1}['"]{1}\))/g);

      if (badImports) {
        console.log(`❌ Mauvais import dans: ${fullPath}`);
        badImports.forEach((line) => console.log(`   → ${line}`));
      }
    }
  }
};

console.log('🔍 Vérification des imports vides ou incorrects...');
checkBadImports(path.join(__dirname, '..', 'app'));
