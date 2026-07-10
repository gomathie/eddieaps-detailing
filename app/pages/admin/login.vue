<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })
    
    // Redirect to admin landing
    navigateTo('/admin')
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Invalid username or password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-slate-950 px-4 py-20 text-slate-200">
    <div class="max-w-md w-full bg-slate-900 border border-slate-850 p-8 rounded-2xl shadow-2xl space-y-6">
      <div class="text-center">
        <h1 class="text-2xl font-black text-white tracking-wider">
          EDDIE <span class="text-blue-500">APS</span> PORTAL
        </h1>
        <p class="text-xs text-slate-500 mt-2 uppercase tracking-widest font-semibold">
          Secure Administration Sign-In
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="l-user" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
          <input
            id="l-user"
            v-model="username"
            type="text"
            required
            placeholder="admin"
            class="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label for="l-pass" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
          <input
            id="l-pass"
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-blue-500/10"
        >
          {{ loading ? 'Authenticating...' : 'Sign In' }}
        </button>

        <p v-if="errorMsg" class="text-sm text-rose-400 font-semibold text-center mt-2">
          {{ errorMsg }}
        </p>
      </form>
    </div>
  </div>
</template>
