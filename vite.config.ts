import path from 'node:path'
import fs from 'node:fs'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Extensionless path so download managers (e.g. IDM) do not intercept the resume. */
const RESUME_ROUTE = '/resume-file'
const RESUME_SOURCE = 'resume.pdf'

function pdfInlinePlugin(): Plugin {
  const sendResume = (filePath: string, res: import('http').ServerResponse) => {
    res.statusCode = 200
    // Octet-stream + no filename avoids download managers auto-saving on fetch.
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', 'inline')
    res.setHeader('Cache-Control', 'no-cache')
    fs.createReadStream(filePath).pipe(res)
  }

  const mount = (root: string, base: string, filePath: string): import('connect').NextHandleFunction => {
    return (req, res, next) => {
      const rawUrl = req.url?.split('?')[0] ?? ''
      const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
      const pathWithoutBase =
        normalizedBase && normalizedBase !== '/' && rawUrl.startsWith(normalizedBase)
          ? rawUrl.slice(normalizedBase.length)
          : rawUrl

      if (pathWithoutBase !== RESUME_ROUTE) {
        next()
        return
      }

      if (!fs.existsSync(filePath)) {
        next()
        return
      }

      sendResume(filePath, res)
    }
  }

  return {
    name: 'pdf-inline',
    configureServer(server) {
      const filePath = path.join(server.config.root, 'public', RESUME_SOURCE)
      server.middlewares.use(mount(server.config.root, server.config.base, filePath))
    },
    configurePreviewServer(server) {
      const filePath = path.join(server.config.root, 'dist', 'resume-file')
      const fallback = path.join(server.config.root, 'public', RESUME_SOURCE)
      server.middlewares.use(
        mount(server.config.root, server.config.base, fs.existsSync(filePath) ? filePath : fallback),
      )
    },
    closeBundle() {
      const src = path.resolve('public', RESUME_SOURCE)
      const dest = path.resolve('dist', 'resume-file')
      if (fs.existsSync(src)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true })
        fs.copyFileSync(src, dest)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), pdfInlinePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
