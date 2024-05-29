import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Nav from './components/navbar/Nav'
import Container from './components/Container'
import GlobalProvider from './GlobalProviders'
import getSignedinUser from './actions/getSignedinUser'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Iris world',
  description: 'An online store',
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
          <Nav user={signedInUser}/>
          <Container>
            {children}
          </Container>
        </GlobalProvider>
      </body>
    </html>
  )
}
