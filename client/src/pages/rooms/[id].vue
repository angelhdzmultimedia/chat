<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from 'src/stores/chat.store'
import { ref } from 'vue'

type User = {
  userName: string,
  id: string
}

definePage({
  meta: {
    requiresConnection: true
  }
})


const chatStore = useChatStore()
const {currentRoom, message, messages, users} = storeToRefs(chatStore)
const {sendMessage, leave} = chatStore
const mierda = ref([])
</script>

<template>
  <div class="column q-gutter-md q-ma-lg">
    <span class="text-h4">{{ currentRoom }}</span>
    <q-btn @click="leave" color="teal-14">Exit</q-btn>
    <q-card 
   
      elevated
    
    >
      <q-item v-if="!messages.length" class="">
        <q-item-section>No messages.</q-item-section>
      </q-item>
      <q-list v-else class="window-width">
        
        <q-item class="" v-for="message in messages" :key="message.id">
          <q-item-section> 
            {{
              message.type === 'broadcast' 
              ?
                message.user.userName + ': ' 
              : ''
            }}:
            {{ message.content  }}
          
          </q-item-section>
          </q-item>
      </q-list>
    </q-card>
    <q-card>
      <q-form @submit.prevent="sendMessage" class="row">
        <q-input color="teal-14" v-model="message" label="Message">
        <template #append>
          <q-btn color="teal-14" @click="sendMessage">Send</q-btn>
        </template>
        </q-input>
       
      </q-form>
    </q-card>
  </div>
</template>

<style scoped>

</style>