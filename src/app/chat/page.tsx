'use client'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

export default function ChatPage() {
  useEffect(() => {
    const socket = io('http://localhost:4000')

    socket.on('connect', () => {
      console.log(socket.id)
      socket.emit('hello', "i'm lou1s vuong")
      socket.on('isConnected', (agr) => {
        console.log(agr)
      })
    })

    socket.on('disconnect', () => {
      console.log(socket.id) // undefined
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  return <div>Chat Page</div>
}
