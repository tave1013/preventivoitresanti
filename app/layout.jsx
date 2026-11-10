import './globals.css'

export const metadata = {
  title: 'Trattoria I Tre Santi · Preventivo 2026',
  description: 'Proposta di servizio di Tavella Distribuzione per Trattoria I Tre Santi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
