const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Function to check file sizes and report large files
function checkFileSizes(directory, maxSizeMB = 24) {
  console.log(`Checking file sizes in ${directory}...`);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const allFiles = getAllFiles(directory);
  
  const largeFiles = allFiles.filter((file) => {
    const stats = fs.statSync(file);
    return stats.size > maxSizeBytes;
  });

  if (largeFiles.length > 0) {
    console.log(`Found ${largeFiles.length} files larger than ${maxSizeMB}MB:`);
    largeFiles.forEach((file) => {
      const stats = fs.statSync(file);
      console.log(`${file}: ${(stats.size / (1024 * 1024)).toFixed(2)}MB`);
    });
    return false;
  }

  console.log('All files are within size limits.');
  return true;
}

// Function to remove the cache directory
function removeCache(directory) {
  const cachePath = path.join(directory, 'cache');
  if (fs.existsSync(cachePath)) {
    console.log(`Removing cache directory: ${cachePath}`);
    fs.rmSync(cachePath, { recursive: true, force: true });
  }
}

// Main function
async function main() {
  try {
    // Clean the build directory
    console.log('Cleaning build directory...');
    execSync('npm run clean', { stdio: 'inherit' });

    // Build the Next.js app
    console.log('Building Next.js app...');
    execSync('next build', { stdio: 'inherit' });

    // Remove the cache directory
    console.log('Removing cache directory...');
    removeCache('.next');

    // Check file sizes
    const isValid = checkFileSizes('.next', 24);
    if (!isValid) {
      console.log('Found files larger than 24MB. Deployment may fail.');
      console.log('Attempting to deploy anyway...');
    }

    // Update wrangler.toml
    console.log('Updating wrangler.toml...');
    const wranglerConfig = `
name = "canvas-lms-chatbot"
compatibility_date = "2023-06-28"
compatibility_flags = ["nodejs_compat"]

# Configure Cloudflare Pages with Next.js
[build]
command = "npm install --legacy-peer-deps && npm run build"

[site]
bucket = ".next"

# Pages specific configuration
pages_build_output_dir = ".next"

# Configure environment variables
[vars]
NODE_VERSION = "18.18.0"
`;
    fs.writeFileSync('wrangler.toml', wranglerConfig);

    // Deploy to Cloudflare Pages
    console.log('Deploying to Cloudflare Pages...');
    execSync('wrangler pages deploy .next --commit-dirty=true', { stdio: 'inherit' });

    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

main(); 