// One-off utility: replaces the AI-approximated logo mark on each frame of the
// animated email banner with the real Northgate Vault brand mark.
//
// The generated banner art drew its own loose interpretation of the logo (a
// hexagon with an isometric box in frame 0; a pointed arch in frames 1-2).
// This composites the authentic SVG mark over each occurrence, colour-matched
// to that frame's wordmark ink so it sits naturally in the illustration.

import sharp from 'sharp'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// Usage: node scripts/fix-banner-logos.mjs [sourceGif] [destGif]
// Defaults to editing the banner in place; pass an explicit source when
// re-running against a pristine copy of the original art.
const SRC = process.argv[2] || path.join(root, 'src/assets/northgate-vault-email-banner.gif')
const DEST = process.argv[3] || path.join(root, 'src/assets/northgate-vault-email-banner.gif')
const LOGO_SVG = path.join(root, 'public/northgate-vault-icon-navy.svg')

const PAGE_HEIGHT = 400
const DELAYS = [2500, 2500, 3500]

// Measured from the source art: bounding box of the drawn mark, the flat
// body colour behind it, and that frame's wordmark ink.
const FRAMES = [
  { box: { left: 485, top: 154, width: 62, height: 86 }, bg: { r: 243, g: 244, b: 246 }, ink: '#0d2c4c' },
  { box: { left: 633, top: 140, width: 54, height: 71 }, bg: { r: 254, g: 254, b: 254 }, ink: '#012550' },
  { box: { left: 885, top: 137, width: 44, height: 65 }, bg: { r: 254, g: 254, b: 254 }, ink: '#052751' },
]

const ERASE_PAD = 3

async function buildMark(ink, width, height) {
  const svg = readFileSync(LOGO_SVG, 'utf8').replace(/fill="#0a1f44"/g, `fill="${ink}"`)
  const big = await sharp(Buffer.from(svg), { density: 72 }).resize(1200, 1200, { fit: 'inside' }).png().toBuffer()
  const trimmed = await sharp(big).trim({ threshold: 5 }).png().toBuffer()
  return sharp(trimmed).resize(width, height, { fit: 'fill' }).png().toBuffer()
}

async function main() {
  const meta = await sharp(SRC, { animated: true }).metadata()
  if (meta.pages !== FRAMES.length) {
    throw new Error(`Expected ${FRAMES.length} frames, found ${meta.pages}`)
  }

  // Aspect ratio of the real mark, so the replacement is never distorted.
  const probe = await sharp(readFileSync(LOGO_SVG), { density: 72 }).resize(1000, 1000, { fit: 'inside' }).png().toBuffer()
  const probeInfo = await sharp(probe).trim({ threshold: 5 }).toBuffer({ resolveWithObject: true })
  const aspect = probeInfo.info.width / probeInfo.info.height

  const composites = []

  for (const [i, frame] of FRAMES.entries()) {
    const { box, bg, ink } = frame
    const yOffset = i * PAGE_HEIGHT

    // Keep the drawn mark's height; derive width from the true aspect ratio,
    // centred on the original so it occupies the same optical position.
    const newH = box.height
    const newW = Math.round(newH * aspect)
    const centerX = box.left + box.width / 2
    const newLeft = Math.round(centerX - newW / 2)

    // Erase the union of old and new footprints, padded slightly to catch
    // anti-aliased edges. Verified not to reach the wordmark or truck stripe.
    const unionLeft = Math.min(box.left, newLeft)
    const unionRight = Math.max(box.left + box.width, newLeft + newW)
    const eraseLeft = unionLeft - ERASE_PAD
    const eraseTop = box.top - ERASE_PAD
    const eraseW = unionRight - unionLeft + ERASE_PAD * 2
    const eraseH = box.height + ERASE_PAD * 2

    const patch = await sharp({
      create: { width: eraseW, height: eraseH, channels: 3, background: bg },
    }).png().toBuffer()

    composites.push({ input: patch, left: eraseLeft, top: eraseTop + yOffset })
    composites.push({ input: await buildMark(ink, newW, newH), left: newLeft, top: box.top + yOffset })

    console.log(`frame ${i}: mark ${newW}x${newH} at (${newLeft}, ${box.top}), ink ${ink}`)
  }

  const buffer = await sharp(SRC, { animated: true })
    .composite(composites)
    .gif({ delay: DELAYS, loop: 0 })
    .toBuffer()

  await sharp(buffer, { animated: true }).toFile(DEST)

  const after = await sharp(DEST, { animated: true }).metadata()
  console.log('written:', DEST)
  console.log('pages', after.pages, 'pageHeight', after.pageHeight, 'loop', after.loop, 'delay', JSON.stringify(after.delay))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
