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

// Function to copy worker file to the build directory
function copyWorkerFile() {
  console.log('Copying _worker.js to .next directory...');
  if (fs.existsSync('_worker.js')) {
    fs.copyFileSync('_worker.js', '.next/_worker.js');
    console.log('Worker file copied successfully.');
  } else {
    console.log('Worker file not found. Creating it...');
    const workerContent = `
import { createPagesFunctionHandler } from '@cloudflare/next-on-pages';

// Create a handler for the Pages Function
export const onRequest = createPagesFunctionHandler({
  // Provide the path to the Next.js app build output directory
  dir: '.',
});
`;
    fs.writeFileSync('.next/_worker.js', workerContent);
    console.log('Worker file created successfully.');
  }
}

// Function to copy functions directory to the build directory
function copyFunctionsDirectory() {
  console.log('Copying functions directory to .next directory...');
  if (fs.existsSync('functions')) {
    // Create the functions directory in .next if it doesn't exist
    if (!fs.existsSync('.next/functions')) {
      fs.mkdirSync('.next/functions', { recursive: true });
    }
    
    // Copy all files from functions to .next/functions
    const functionsFiles = fs.readdirSync('functions');
    functionsFiles.forEach(file => {
      const sourcePath = path.join('functions', file);
      const destPath = path.join('.next/functions', file);
      fs.copyFileSync(sourcePath, destPath);
    });
    
    console.log('Functions directory copied successfully.');
  } else {
    console.log('Functions directory not found. Skipping...');
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

    // Build for Cloudflare Pages
    console.log('Building for Cloudflare Pages...');
    execSync('npx @cloudflare/next-on-pages', { stdio: 'inherit' });

    // Remove the cache directory
    console.log('Removing cache directory...');
    removeCache('.next');
    
    // Check if .vercel/output exists
    if (fs.existsSync('.vercel/output')) {
      removeCache('.vercel/output/functions/_next/static/.next/cache');
    } else {
      console.log('.vercel/output directory not found. Skipping cache removal.');
      // Create the directory structure
      fs.mkdirSync('.vercel/output/static', { recursive: true });
      fs.mkdirSync('.vercel/output/functions', { recursive: true });
      
      // Copy the .next directory to .vercel/output/static
      console.log('Copying .next directory to .vercel/output/static...');
      execSync('cp -R .next/* .vercel/output/static/', { stdio: 'inherit' });
    }

    // Copy worker file to the build directory
    copyWorkerFile();
    
    // Copy functions directory to the build directory
    copyFunctionsDirectory();

    // Check file sizes
    const isValid = checkFileSizes('.vercel/output', 24);
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
command = "npm install --legacy-peer-deps && npm run build && npx @cloudflare/next-on-pages"

[site]
bucket = ".vercel/output/static"

# Pages specific configuration
pages_build_output_dir = ".vercel/output/static"

# Configure environment variables
[vars]
NODE_VERSION = "18.18.0"
`;
    fs.writeFileSync('wrangler.toml', wranglerConfig);

    // Deploy to Cloudflare Pages
    console.log('Deploying to Cloudflare Pages...');
    execSync('wrangler pages deploy .vercel/output/static --commit-dirty=true', { stdio: 'inherit' });

    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

main(); 