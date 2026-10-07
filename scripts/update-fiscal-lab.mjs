// Run with the local Fiscal Lab source directory as the first argument.
import {execFileSync} from 'node:child_process';
import {cpSync, existsSync, rmSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/update-fiscal-lab.mjs /path/to/fiscal-lab');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const checkout = resolve(source);
if (!existsSync(resolve(checkout, 'backend/site_snapshot.py'))) throw new Error('Not a Fiscal Lab checkout');
execFileSync('npm', ['run', 'build'], {cwd:checkout, stdio:'inherit', env:{...process.env,VITE_PORTFOLIO_URL:'../projects/finland-fiscal-lab'}});
const destination = resolve(root, 'public/finland-fiscal-lab');
rmSync(destination, {recursive:true, force:true});
cpSync(resolve(checkout, 'dist'), destination, {recursive:true});
console.log('Updated public/finland-fiscal-lab. Build the portfolio to publish it.');
