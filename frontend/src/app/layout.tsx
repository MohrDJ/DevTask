import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solicitação de Serviço',
  description: 'Formulario para realizar solicitações de serviços de desenvolvimento',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt - Br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
