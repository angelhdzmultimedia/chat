<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-teal-14">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
       
        />

        <q-toolbar-title>
          Vue Chat
        </q-toolbar-title>

        <div>
          <q-chip text-color="white" :color="isConnected ? 'green' : 'red'">{{ isConnected ? 'Connected' : 'Disconnected' }}</q-chip>
          <span color="white" text-color="teal-14">
            {{ !isConnected ? 'Guest' :  userName}}
          </span>
        </div>
      </q-toolbar>
    </q-header>

  

    <q-page-container>
      <q-page class="items-center justify-center column window-width window-height">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from 'src/stores/chat.store'
import { ref } from 'vue';


const chatStore = useChatStore()
const {isConnected, userName} = storeToRefs(chatStore)
</script>
