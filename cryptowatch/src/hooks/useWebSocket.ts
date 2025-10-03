import { useEffect, useRef } from 'react'

// Placeholder demo websocket hook (can be wired to a real provider later)
export function useWebSocket(url: string, onMessage: (data: any) => void) {
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    wsRef.current = new WebSocket(url)

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onMessage(data)
      } catch {
        onMessage(event.data)
      }
    }

    return () => {
      wsRef.current?.close()
    }
  }, [url, onMessage])
}
