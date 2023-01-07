import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import { io, Socket } from "socket.io-client";
import { ref } from 'vue'
import router from '../router'

type Message = {
  content: string 
  id: string,
  user: User,
  type: 'broadcast' | 'notify',
}

type User = {
  userName: string,
  id: string
}


export const useChatStore = defineStore('chat', () => {
  const socket = ref<Socket | null>(null)
  const isConnected = ref<boolean>(false)
  const userName = ref<string>('')
  const currentRoom = ref<string | null>(null)
  const messages = ref<Message[]>([

  ])
  const message = ref<string>('')
  const users = ref<User[]>([])

  async function connect(): Promise<void> {
    await router.push('/connecting')
    try {
      socket.value = io('http://localhost:5000')
      isConnected.value = true
      socket.value.emit('userConnected', userName.value)

      socket.value .on('connect', async(): Promise<void> => {
        await router.push('/rooms')
        
        
        Notify.create({
          message: 'Connected!'
        })
      })

      socket.value.on('broadcast', async(message: Message): Promise<void> => {
        messages.value.push({
          content: message.content,
          id: `${Date.now()}`,
          user: message.user,
          type: 'broadcast',
        })
      })

      socket.value.on('userJoined', async(user: User): Promise<void> => {
        users.value.push(user)
        const content = ``
        messages.value.push({
          content: `${user.userName} has joined the room.`,
          id: `${Date.now()}`,
          user,
          type: 'notify',
        })
      })

      socket.value.on('userLeft', async(user: User): Promise<void> => {
        users.value = users.value.filter(item => item.userName !== user.userName)
      })
    } catch (error: unknown) {
      isConnected.value = false
      Notify.create({message: error as string})
    }
  }

  async function join(roomId: string): Promise<void> {
    socket.value!.emit('joinRoom', roomId)
    currentRoom.value = roomId 
    await router.push(`/rooms/${roomId}`)
  }

  async function sendMessage(): Promise<void> {
    socket.value!.emit('newMessage', {
      content: message.value,
      user: {
        userName: userName.value,
        id: Date.now(),
      },
    })
    message.value = ''
  }

  async function leave() {
    socket.value!.emit('leaveRoom',  currentRoom.value)
    currentRoom.value = null
    messages.value = []
    await router.push('/rooms')
  }

  return {
    users,
    leave,
    messages,
    message,
    sendMessage,
    userName,
    connect,
    join,
    isConnected,
    currentRoom,
  }
})