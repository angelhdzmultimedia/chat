<script setup lang="ts">
import { useChatStore } from 'src/stores/chat.store'
import { ref } from 'vue'


definePage({
  meta: {
    requiresConnection: true
  }
})

type Room = {
  id: string,
  locked: boolean,
}

const rooms = ref<Room[]>([
  {
    id: 'Lobby',
    locked: false,
  },
  {
    id: 'Staff',
    locked: true,
  }
])

const {join} = useChatStore()
</script>

<template>
  <div class="column items-center">
    <span class="text-h4 text-teal-14">Rooms</span>
    <div class="column">
      <q-btn @click="join(room.id)" :icon="room.locked ? 'lock' : undefined" v-for="room in rooms">{{ room.id }}</q-btn>

    </div>
  </div>
</template>

<style scoped>

</style>