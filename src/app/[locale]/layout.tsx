import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import './../globals.css'
import ReduxProvider from './ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vendor',
  description: 'This is Vendor'
}

interface IRootLayout {
  params: {
    locale: string
  }
}

const RootLayout: FC<PropsWithChildren<IRootLayout>> = async ({
  children,
  params
}) => {
  let messages
  try {
    messages = (await import(`../../messages/${params.locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={params.locale}>
      <body
        className={inter.className}
        dir={params.locale === 'ar' ? 'rtl' : 'ltr'}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <main>
            <ReduxProvider>{children}</ReduxProvider>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
