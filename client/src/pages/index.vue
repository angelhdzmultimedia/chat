<template>
  <q-form class="q-gutter-md column">
    <q-input color="teal-14" v-model="userName" label="Username"></q-input>
    <q-btn @click="connect" color="teal-14">Connect</q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from 'src/stores/chat.store'
import { ref } from 'vue'

const chatStore = useChatStore()

const {userName} = storeToRefs(chatStore)
const {connect} = chatStore
</script>
