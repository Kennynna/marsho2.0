"use client"

import { CheckCircle } from "lucide-react"

interface CopyNotificationProps {
  sku: string
}

export default function CopyNotification({ sku }: CopyNotificationProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-primary text-primary-foreground rounded-lg p-4 flex items-center gap-3 shadow-lg animate-in slide-in-from-bottom">
      <CheckCircle className="w-5 h-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium text-sm">Article Copied!</p>
        <p className="text-xs opacity-90">{sku}</p>
      </div>
    </div>
  )
}
