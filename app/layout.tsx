import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
    title: 'WellnessPlatform - SaaS Workforce + AI Operating System',
    description: 'The unified platform where anyone can join, work, sell, earn, and collaborate through human-AI teams. Build workflows, manage teams, and scale your business.',
    keywords: ['SaaS', 'AI', 'Workflow Automation', 'Workforce Management', 'E-commerce', 'CRM'],
    authors: [{ name: 'WellnessPlatform' }],
    openGraph: {
        title: 'WellnessPlatform - SaaS Workforce + AI Operating System',
        description: 'The unified platform for human-AI collaboration',
        images: ['/opengraph-image.png'],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    )
}
