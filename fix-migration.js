import fs from 'fs';
import path from 'path';

// This file is needed to fix the js and cjs conflict during sequelize migration. This file renamed your migration file from .js to .cjs.

const migrationsPath = path.resolve('./migrations');

fs.readdirSync(migrationsPath).forEach(file => {
		if (file.endsWith('.js')) {
				const oldPath = path.join(migrationsPath, file);
				const newPath = path.join(migrationsPath, file.replace(/\.js$/, '.cjs'));
				fs.renameSync(oldPath, newPath);
				console.log(`Renamed ${file} -> ${file.replace(/\.js$/, '.cjs')}`);
		}
});
