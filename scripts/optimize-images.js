import fs from "fs"
import path from "path"
import sharp from "sharp"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ASSETS_DIR = path.join(__dirname, "..", "src", "assets", "images")
const OUTPUT_DIR = path.join(__dirname, "..", "public", "images")

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase()
    const basename = path.basename(inputPath, ext)
    const webpPath = path.join(path.dirname(outputPath), `${basename}.webp`)

    // Convert to WebP with quality 85
    await sharp(inputPath).webp({ quality: 85 }).toFile(webpPath)

    const originalSize = fs.statSync(inputPath).size
    const optimizedSize = fs.statSync(webpPath).size
    const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1)

    console.log(
      `✓ ${basename}: ${(originalSize / 1024).toFixed(0)}KB → ${(optimizedSize / 1024).toFixed(0)}KB (${reduction}% reduction)`,
    )

    return { original: originalSize, optimized: optimizedSize }
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message)
    return null
  }
}

async function processDirectory(dir, outputDir) {
  const items = fs.readdirSync(dir)
  let totalOriginal = 0
  let totalOptimized = 0
  let count = 0

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      const newOutputDir = path.join(outputDir, item)
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir, { recursive: true })
      }
      const result = await processDirectory(fullPath, newOutputDir)
      totalOriginal += result.totalOriginal
      totalOptimized += result.totalOptimized
      count += result.count
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      const result = await optimizeImage(fullPath, path.join(outputDir, item))
      if (result) {
        totalOriginal += result.original
        totalOptimized += result.optimized
        count++
      }
    }
  }

  return { totalOriginal, totalOptimized, count }
}

console.log("🚀 Starting image optimization...\n")

const { totalOriginal, totalOptimized, count } = await processDirectory(
  ASSETS_DIR,
  OUTPUT_DIR,
)

const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1)

console.log("\n✅ Optimization complete!")
console.log(`📊 Processed ${count} images`)
console.log(
  `📉 Total size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`,
)
console.log(`🎯 Overall reduction: ${totalReduction}%`)
console.log(`\n💾 Optimized images saved to: ${OUTPUT_DIR}`)
