import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom Vite plugin to handle local admin catalog saving and image listing
function catalogApiPlugin() {
  return {
    name: 'catalog-api-plugin',
    configureServer(server) {
      // Endpoint 1: GET /api/local-images
      server.middlewares.use('/api/local-images', (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          const publicDir = path.resolve(__dirname, 'public')
          const productsDir = path.join(publicDir, 'products')
          const bannersDir1 = path.join(publicDir, 'banners')
          const bannersDir2 = path.join(publicDir, 'banner')

          if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true })
          if (!fs.existsSync(bannersDir1)) fs.mkdirSync(bannersDir1, { recursive: true })

          const productFiles = fs.existsSync(productsDir)
            ? fs.readdirSync(productsDir).filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f)).map(f => `/products/${f}`)
            : []

          const bannerFiles = []
          if (fs.existsSync(bannersDir1)) {
            fs.readdirSync(bannersDir1).filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f)).forEach(f => {
              bannerFiles.push(`/banners/${f}`)
            })
          }
          if (fs.existsSync(bannersDir2) && bannersDir1 !== bannersDir2) {
            fs.readdirSync(bannersDir2).filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f)).forEach(f => {
              if (!bannerFiles.includes(`/banner/${f}`)) {
                bannerFiles.push(`/banner/${f}`)
              }
            })
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ products: productFiles, banners: bannerFiles }))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: err.message }))
        }
      })

      // Endpoint 2: POST /api/save-catalog
      server.middlewares.use('/api/save-catalog', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', chunk => {
          body += chunk.toString()
        })

        req.on('end', () => {
          try {
            const data = JSON.parse(body)
            const targetPath = path.resolve(__dirname, 'src/data/sarees.json')
            fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8')

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, message: 'Catalog saved successfully to disk' }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, error: err.message }))
          }
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), catalogApiPlugin()],
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/*.zip', '**/dist/**', '**/.git/**', '**/*.tmp']
    }
  }
})
