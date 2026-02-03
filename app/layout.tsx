import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "GameVerse - Mini Games Collection",
  description: "A collection of fun mini games including Puzzle, Maze, Drawing, and Quiz games",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
