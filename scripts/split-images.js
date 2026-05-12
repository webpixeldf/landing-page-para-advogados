const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = 'E:/Anetrams/Imagens/Revista Anetrams 15 anos/Revista Goiás Que dá Certo/Imagens revistas/smallpdf-convert-20260506-180217';
const outDir = 'E:/temp-imagens-editadas';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
console.log('Found ' + files.length + ' images\n');

async function process() {
  let count = 0;
  for (const file of files) {
    const inputPath = path.join(srcDir, file);
    const name = path.parse(file).name;
    const metadata = await sharp(inputPath).metadata();
    const halfW = Math.floor(metadata.width / 2);

    // Right side = first half
    await sharp(inputPath)
      .extract({ left: 0, top: 0, width: halfW, height: metadata.height })
      .resize({ height: 2000, fit: 'inside', withoutEnlargement: false })
      .jpeg({ quality: 92 })
      .toFile(path.join(outDir, name + '-direita.jpg'));

    // Left side = second half
    await sharp(inputPath)
      .extract({ left: halfW, top: 0, width: metadata.width - halfW, height: metadata.height })
      .resize({ height: 2000, fit: 'inside', withoutEnlargement: false })
      .jpeg({ quality: 92 })
      .toFile(path.join(outDir, name + '-esquerda.jpg'));

    count++;
    console.log(count + '/' + files.length + ': ' + file);
  }
  console.log('\nDone! ' + (count * 2) + ' files saved to E:/temp-imagens-editadas/');
}

process().catch(e => console.error('ERROR:', e));
