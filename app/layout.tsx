import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Nav from './components/navbar/Nav'
import Container from './components/Container'
import GlobalProvider from './GlobalProviders'
import getSignedinUser from './actions/getSignedinUser'
import Footer from './components/footer/Footer'
import { Analytics } from '@vercel/analytics/next';

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Iris Cosmo World',
  description: 'A store located in bharatpur-10, Nepal',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: "any" }
    ]
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const signedInUser = await getSignedinUser()

  return (
    <html lang="en">
      <body className={nunito.className}>
        <GlobalProvider>
          <Nav user={signedInUser} />
          <Container>
            {children}
            <Analytics />
          </Container>
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  )
}
