const fs = require('fs');
const path = require('path');


function renameFilesInDirectory(directoryPath) {
  try {
    // Check if the directory exists
    if (!fs.existsSync(directoryPath)) {
      console.error(`Error: Directory "${directoryPath}" does not exist.`);
      return;
    }

    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
      const oldPath = path.join(directoryPath, file);

      // Skip directories and only process files
      if (fs.lstatSync(oldPath).isFile()) {
        // Replace spaces with underscores in the filename
        const newFileName = file.replace(/ /g, '_').toLowerCase();
	console.log("NewNameFile:", newFileName) 
        const newPath = path.join(directoryPath, newFileName);

        // Rename the file if the name has changed
        if (oldPath !== newPath) {
          fs.renameSync(oldPath, newPath);
          console.log(`Renamed: "${file}" -> "${newFileName}"`);
        }
      }
    });

    console.log('Renaming complete.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Get command-line arguments
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: node renameFiles.js <directoryPath>');
  process.exit(1);
}

// Extract the directory path from arguments
const directoryPath = args[0];

// Call the function
renameFilesInDirectory(directoryPath);

