import React, { useContext, useState, useEffect, useRef } from 'react'
import ChatItem from '../ChatItem/ChatItem'
import { useChat } from '../../hooks/useChat'
import UserContext from '../../contexts/UserContext'

const POLL_INTERVAL_MS = 5000;

const shallowEqualChats = (a, b) => {
  if (a === b) return true
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false
  // Compara ids + títulos para evitar renders si no cambió nada relevante
  for (let i = 0; i < a.length; i++) {
    if (a[i]?.id !== b[i]?.id || a[i]?.titulo !== b[i]?.titulo) return false
  }
  return true
}

const ChatsList = () => {
  const { user } = useContext(UserContext)
  const { chatsList, deleteChat } = useChat()

  const [chats, setChats] = useState([])
  const lastSnapshotRef = useRef([])

  const fetchChats = async () => {
    if (!user) return
    try {
      const result = await chatsList(user)
      if (Array.isArray(result)) {
        // (Opcional) ordenar por fecha si tu API la envía: result.sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt))
        if (!shallowEqualChats(result, lastSnapshotRef.current)) {
          lastSnapshotRef.current = result
          setChats(result)
        }
      } else {
        console.error('Error al obtener los chats:', result)
      }
    } catch (e) {
      console.warn('Polling chats falló:', e?.message || e)
    }
  }

  // Carga inicial
  useEffect(() => {
    fetchChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, chatsList])

  // Polling cada 2s (pausa si la pestaña no está visible)
  useEffect(() => {
    if (!user) return
    const tick = () => {
      if (document.visibilityState === 'visible') fetchChats()
    }
    const id = setInterval(tick, POLL_INTERVAL_MS)
    const onVisible = () => { if (document.visibilityState === 'visible') fetchChats() }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, chatsList])

  const handleDeleteChat = async (id) => {
    const result = await deleteChat(id)
    if (result === 'Chat eliminado') {
      setChats(prev => prev.filter(chat => chat.id !== id))
      lastSnapshotRef.current = lastSnapshotRef.current.filter(c => c.id !== id)
      // refresco inmediato (por si el backend reordena la lista o cambia algo más)
      fetchChats()
    } else {
      console.error('Error al eliminar:', result)
    }
  }

  return (
    <>
      {chats.length > 0 ? (
        chats.map(chat => (
          <ChatItem
            key={chat.id}
            title={chat.titulo}
            chatId={chat.id}
            onDelete={handleDeleteChat}
          />
        ))
      ) : (
        <p color="primary">No se encuentran chats registrados</p>
      )}
    </>
  )
}

export default ChatsList;
