import fs from 'fs';
import path from 'path';
import PDFMerger from 'pdf-merger-js';
import os from 'os';

async function mergePDFsInDirectory(directoryPath) {
  try {
    console.log(`Directory: ${directoryPath}`);

    // Check if the directory exists
    if (!fs.existsSync(directoryPath)) {
      console.error(`Error: Directory "${directoryPath}" does not exist.`);
      return;
    }

    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);

    // Filter only .pdf files
    const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');

    if (pdfFiles.length === 0) {
      console.error('No PDF files found in the directory.');
      return;
    }

    const merger = new PDFMerger();

    // Add all PDF files to the merger
    for (const pdfFile of pdfFiles) {
      const pdfPath = path.join(directoryPath, pdfFile);
      try {
        await merger.add(pdfPath);
        console.log(`Added: ${pdfFile}`);
      } catch (err) {
        console.error(`Error adding ${pdfFile}:`, err);
      }
    }

    // Define output file path
    const outputFilePath = path.join(directoryPath, 'merged_output.pdf');

    // Merge the PDFs and save the output
    await merger.save(outputFilePath);

    console.log(`PDFs successfully merged into: ${outputFilePath}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Extract the directory path from arguments
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: node mergePDFs.js <relativeDirectoryPath>');
  process.exit(1);
}

// Prepend the base path to the provided argument
const basePath = os.homedir();
const directoryPath = path.join(basePath, args[0]);

// Call the function
mergePDFsInDirectory(directoryPath);

