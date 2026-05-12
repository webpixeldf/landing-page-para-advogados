const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = 'E:/Anetrams/Imagens/Revista Anetrams 15 anos/Revista Goiás Que dá Certo/Imagens revistas/smallpdf-convert-20260506-180217/editadas';
const tempDir = 'E:/temp-compress';

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// Get files using Node.js fs (which handles encoding better)
const files = fs.readdirSync(srcDir).filter(f => f.match(/-(esquerda|direita)\.jpg$/));
console.log('Found ' + files.length + ' images\n');

async function process() {
  let originalTotal = 0;
  let compressedTotal = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(srcDir, file);
    const tempPath = path.join(tempDir, file);

    // Read from source
    const inputBuffer = fs.readFileSync(inputPath);
    originalTotal += inputBuffer.length;

    // Compress
    const buffer = await sharp(inputBuffer)
      .jpeg({ quality: 75, progressive: true, mozjpeg: true })
      .toBuffer();

    // Write to temp
    fs.writeFileSync(tempPath, buffer);
    compressedTotal += buffer.length;

    const reduction = ((1 - buffer.length / inputBuffer.length) * 100).toFixed(0);
    console.log((i+1) + '/' + files.length + ': ' + file + ' ' + (inputBuffer.length/1024).toFixed(0) + 'KB -> ' + (buffer.length/1024).toFixed(0) + 'KB (-' + reduction + '%)');
  }

  console.log('\n---');
  console.log('Original: ' + (originalTotal/1024/1024).toFixed(1) + ' MB');
  console.log('Comprimido: ' + (compressedTotal/1024/1024).toFixed(1) + ' MB');
  console.log('Redução: ' + ((1 - compressedTotal/originalTotal) * 100).toFixed(0) + '%');
  console.log('\nArquivos salvos em: ' + tempDir);
  console.log('Copie manualmente para a pasta editadas depois.');
}

process().catch(e => console.error('ERROR:', e));
