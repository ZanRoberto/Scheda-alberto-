// Collaudo automatico: file presenti, manifest valido, script della pagina senza errori di sintassi.
const fs = require('fs'), vm = require('vm');
const fail = m => { console.error('ERRORE: ' + m); process.exit(1); };
for (const f of ['index.html', 'manifest.json', 'sw.js', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'])
  if (!fs.existsSync(f)) fail('manca ' + f);
const man = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
if (!man.name || !man.start_url || man.display !== 'standalone' || !man.icons.some(i => i.sizes === '512x512')) fail('manifest incompleto');
const html = fs.readFileSync('index.html', 'utf8');
if (!html.startsWith('<!DOCTYPE html>')) fail('index.html non inizia con <!DOCTYPE html>');
if (!html.includes('rel="manifest"')) fail('index.html non collega il manifest');
if (!html.includes("serviceWorker")) fail('index.html non registra il service worker');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (!scripts.length) fail('nessuno script nella pagina');
scripts.forEach((s, i) => { try { new vm.Script(s, {filename: 'script' + i}); } catch (e) { fail('script ' + i + ': ' + e.message); } });
try { new vm.Script(fs.readFileSync('sw.js', 'utf8')); } catch (e) { fail('sw.js: ' + e.message); }
const n = (html.match(/X\('|M\('/g) || []).length;
if (n < 60) fail('esercizi trovati: ' + n + ' (attesi almeno 60)');
console.log('Collaudo OK: ' + n + ' esercizi, manifest e service worker a posto.');
