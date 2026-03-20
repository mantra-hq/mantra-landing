import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const require = createRequire(import.meta.url)

async function main() {
  // Load icon as base64
  const iconPath = join(root, 'src/assets/icon-mantra.png')
  const iconBase64 = readFileSync(iconPath).toString('base64')
  const iconDataUri = `data:image/png;base64,${iconBase64}`

  // Inter: static WOFF from @fontsource/inter
  const interRegular = readFileSync(require.resolve('@fontsource/inter/files/inter-latin-400-normal.woff'))
  const interBold = readFileSync(require.resolve('@fontsource/inter/files/inter-latin-700-normal.woff'))

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090f',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'img',
            props: {
              src: iconDataUri,
              width: 80,
              height: 80,
              style: { marginBottom: '20px' },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '48px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
              },
              children: 'Mantra',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '24px',
                fontWeight: 400,
                color: '#a1a1aa',
                marginBottom: '12px',
              },
              children: 'The time machine for AI coding',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '18px',
                fontWeight: 400,
                color: '#71717a',
              },
              children: 'Replay \u00b7 Review \u00b7 Keep it local',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      ],
    }
  )

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  })
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  const outPath = join(root, 'public/og-image.png')
  writeFileSync(outPath, pngBuffer)
  console.log(`Generated: ${outPath} (${pngBuffer.length} bytes)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
