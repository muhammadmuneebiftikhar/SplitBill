"use client"

import { useState } from "react"
import { AppSidebar } from "./AppSidebar"

export function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex">
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(prev => !prev)}
      />

      <main className="flex-1 bg-background p-6">
        {children}
      </main>
    </div>
  )
}