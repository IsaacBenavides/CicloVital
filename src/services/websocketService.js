// src/services/websocketService.js
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

let stompClient = null

export const connectWebSocket = (chatId, onMessageReceived, setConnected) => {
  // ¡ruta relativa! Vite la proxea al backend
  const socket = new SockJS('/ws-chat')

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug: (s) => console.log('[STOMP]', s),

    onConnect: () => {
      console.log('[WS] ✅ Conectado vía /ws-chat (proxy)')
      setConnected?.(true)

      const dest = `/topic/chat.${chatId}`
      console.log('[WS] subscribe ->', dest)

      stompClient.subscribe(dest, (frame) => {
        try { onMessageReceived?.(JSON.parse(frame.body)) }
        catch (e) { console.error('[WS] parse error', e) }
      })
    },

    onWebSocketClose: () => {
      console.log('[WS] Desconectado')
      setConnected?.(false)
    },

    onStompError: (frame) => {
      console.error('[WS] STOMP error', frame.headers?.message, frame.body)
    },
  })

  console.log('[WS] Opening Web Socket via /ws-chat (proxied)')
  stompClient.activate()
}


export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate()
      .then(() => console.log('[WS] Desconexión completada'))
      .catch((e) => console.error('[WS] error al desconectar', e))
  }
}
