/**
 * scripts/upload-images.ts
 *
 * One-time migration script: reads all files from Resource/image/,
 * converts .HEIC files to .webp using sharp, then uploads everything
 * to Sanity via the asset upload API.
 *
 * Usage (after configuring .env.local):
 *   npx tsx scripts/upload-images.ts
 *
 * Requirements: 1.3, 2.1, 13.7
 */

import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";
import sharp from "sharp";

// ─── Config ───────────────────────────────────────────────────────────────────

// Load env vars manually (tsx doesn't auto-load .env.local)
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: path.resolve(process.cwd(), ".env.local") });

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN = process.env.SANITY_API_TOKEN;

if (!PROJECT_ID || !TOKEN) {
  console.error(
    "❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

const IMAGE_DIR = path.resolve(process.cwd(), "Resource/image");
const SUPPORTED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".HEIC",
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function convertHeicToWebp(filePath: string): Promise<Buffer | null> {
  try {
    return await sharp(filePath).webp({ quality: 85 }).toBuffer();
  } catch (err) {
    // HEIC conversion requires libheif support in sharp.
    // On Windows, the prebuilt sharp binary may not include it.
    // Skip the file and log a warning.
    console.warn(`  ⚠️  HEIC conversion not supported on this platform — skipping ${path.basename(filePath)}`);
    console.warn(`     To convert HEIC files, run this script on macOS or Linux.`);
    return null;
  }
}

async function uploadFile(
  filePath: string,
  filename: string
): Promise<{ _id: string; url: string } | null> {
  const ext = path.extname(filename).toLowerCase();

  let buffer: Buffer;
  let mimeType: string;
  let uploadFilename: string;

  if (ext === ".heic") {
    console.log(`  🔄 Converting ${filename} → webp`);
    const converted = await convertHeicToWebp(filePath);
    if (!converted) return null; // skip if conversion not supported
    buffer = converted;
    mimeType = "image/webp";
    uploadFilename = filename.replace(/\.heic$/i, ".webp");
  } else {
    buffer = fs.readFileSync(filePath);
    mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";
    uploadFilename = filename;
  }

  try {
    const asset = await client.assets.upload("image", buffer, {
      filename: uploadFilename,
      contentType: mimeType,
    });
    return { _id: asset._id, url: asset.url };
  } catch (err) {
    console.error(`  ❌ Failed to upload ${filename}:`, err);
    return null;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📁 Reading images from: ${IMAGE_DIR}\n`);

  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`❌  Directory not found: ${IMAGE_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(IMAGE_DIR)
    .filter((f) => SUPPORTED_EXTENSIONS.has(path.extname(f)));

  console.log(`Found ${files.length} image(s) to upload.\n`);

  let successCount = 0;
  let failCount = 0;

  for (const filename of files) {
    const filePath = path.join(IMAGE_DIR, filename);
    console.log(`⬆️  Uploading: ${filename}`);

    const result = await uploadFile(filePath, filename);
    if (result) {
      console.log(`  ✅ Uploaded → ${result._id}`);
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n✅ Done: ${successCount} uploaded, ${failCount} failed.\n`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
