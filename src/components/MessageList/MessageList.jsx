import React, { useEffect, useRef, useState, useContext } from 'react'
import { IonContent } from '@ionic/react'
import { useMessage } from '../../hooks/useMessage'
import ChatContext from '../../contexts/ChatContext'
import Message from '../Message/Message'
import './MessageList.css'

const POLL_INTERVAL_MS = 2000

const MessageList = () => {
  const { currentChat } = useContext(ChatContext) // <-- id numérico
  const chatId = currentChat                      // alias claro

  const { getChatMessages } = useMessage()
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const seenRef = useRef(new Set())

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  // Normaliza para soportar tanto {chatId} como {chat:{id}}
  const normalizeIncoming = React.useCallback((m) => {
    const cid = m.chatId ?? m.chat?.id ?? chatId ?? null
    return {
      id: m.id ?? `${cid}-${m.timestamp ?? Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      chatId: cid,
      contenido: m.contenido ?? m.content ?? '',
      esUsuario: typeof m.esUsuario === 'boolean' ? m.esUsuario : (m.role ? m.role === 'user' : false),
      timestamp: m.timestamp ?? m.fechaHora ?? new Date().toISOString(),
      ...m,
    }
  }, [chatId])

  const makeKey = (nm) =>
    `${nm.chatId}|${nm.esUsuario ? 'U' : 'A'}|${nm.contenido}|${new Date(nm.timestamp).getTime()}`

  // Carga inicial por chatId
  useEffect(() => {
    let alive = true
    const run = async () => {
      if (!chatId) return
      try {
        const data = await getChatMessages(chatId)
        if (!alive) return

        if (Array.isArray(data)) {
          const list = data
            .map(normalizeIncoming)
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          seenRef.current = new Set(list.map(makeKey))
          setMessages(list)
        } else {
          console.error('[MessageList] Error cargando mensajes:', data)
          seenRef.current = new Set()
          setMessages([])
        }
      } catch (err) {
        console.error('[MessageList] Excepción cargando mensajes:', err)
      }
    }
    run()
    return () => { alive = false }
  }, [chatId, getChatMessages, normalizeIncoming])

  // Polling incremental cada 2s (pausado si la pestaña no está visible)
  useEffect(() => {
    if (!chatId) return

    let intervalId
    let cancelled = false

    const tick = async () => {
      if (document.visibilityState !== 'visible') return
      try {
        const data = await getChatMessages(chatId)
        if (cancelled || !Array.isArray(data)) return

        const normalized = data
          .map(normalizeIncoming)
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

        // Si es la primera vez (seen vacío), rehacer todo
        if (seenRef.current.size === 0 && normalized.length > 0) {
          seenRef.current = new Set(normalized.map(makeKey))
          setMessages(normalized)
          return
        }

        // Agregar solo nuevos (sin duplicar)
        const nuevos = []
        for (const nm of normalized) {
          const key = makeKey(nm)
          if (!seenRef.current.has(key)) {
            seenRef.current.add(key)
            nuevos.push(nm)
          }
        }
        if (nuevos.length) {
          setMessages(prev =>
            [...prev, ...nuevos].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          )
        }
      } catch (err) {
        console.warn('[MessageList] Polling falló:', err?.message || err)
      }
    }

    // Arranca el intervalo
    intervalId = setInterval(tick, POLL_INTERVAL_MS)

    // Refrescar inmediatamente al volver a foco
    const onVisible = () => { if (document.visibilityState === 'visible') tick() }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      clearInterval(intervalId)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [chatId, getChatMessages, normalizeIncoming])

  // Auto‑scroll cuando cambia el length
  useEffect(() => { scrollToBottom() }, [messages.length])

  return (
    <IonContent color="secondary" className="message-list-container">
      {messages.map((msg) => (
        <Message key={msg.id} mensaje={msg} />
      ))}
      <div ref={messagesEndRef} />
    </IonContent>
  )
}

export default MessageList
