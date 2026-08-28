import sharp from 'sharp'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const WIDTH = 1200
const HEIGHT = 360

const iconSvg = readFileSync(path.join(root, 'public/northgate-vault-icon-white.svg'), 'utf8')

// Pure illustration: a large centered vault-shield mark on a navy field, with a
// thin concentric ring motif suggesting a vault door. The wordmark itself lives
// in real HTML text below the banner, not baked into the image.
async function main() {
  const iconBuffer = await sharp(Buffer.from(iconSvg)).resize(150, 150).png().toBuffer()

  const ringsSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${WIDTH / 2}" cy="${HEIGHT / 2}" r="150" fill="none" stroke="#15305c" stroke-width="2" />
      <circle cx="${WIDTH / 2}" cy="${HEIGHT / 2}" r="120" fill="none" stroke="#1a3f6f" stroke-width="1.5" />
    </svg>
  `
  const ringsBuffer = await sharp(Buffer.from(ringsSvg)).png().toBuffer()

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: { r: 10, g: 31, b: 68 },
    },
  })
    .composite([
      { input: ringsBuffer, left: 0, top: 0 },
      { input: iconBuffer, left: Math.round(WIDTH / 2 - 75), top: Math.round(HEIGHT / 2 - 75) },
    ])
    .png({ quality: 90 })
    .toFile(path.join(root, 'public/email/status-banner.png'))

  console.log('Banner written to public/email/status-banner.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
