<script setup lang="ts">
import { ref } from 'vue'
import type { SocialLink, AdminUser } from '#shared/types'

definePageMeta({
  layout: 'default',
  middleware: 'admin'
})

const activeTab = ref('bookings') // bookings, quotes, messages

// Live data from D1. Empty arrays until real requests come in.
const { data: bookingsList, refresh: refreshBookings } = await useFetch('/api/admin/bookings', {
  lazy: true,
  default: () => []
})

const { data: quotesList, refresh: refreshQuotes } = await useFetch('/api/admin/quotes', {
  lazy: true,
  default: () => []
})

const { data: messagesList, refresh: refreshMessages } = await useFetch('/api/admin/messages', {
  lazy: true,
  default: () => []
})

// --- Search & filter ---
const searchQuery = ref('')
const statusFilter = ref('all')

watch(activeTab, () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  exportOpen.value = false
})

const statusOptions = computed(() => {
  if (activeTab.value === 'bookings') return ['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled']
  if (activeTab.value === 'quotes') return ['all', 'Pending', 'Sent', 'Declined']
  return ['all', 'unread', 'read']
})

const applyFilter = (list: any[]) => {
  const q = searchQuery.value.trim().toLowerCase()
  return list.filter((item: any) => {
    const hay = [item.customerName, item.name, item.customerEmail, item.email, item.customerPhone, item.phone]
      .filter(Boolean).join(' ').toLowerCase()
    const okSearch = !q || hay.includes(q)
    const okStatus = statusFilter.value === 'all' || item.status === statusFilter.value
    return okSearch && okStatus
  })
}

const filteredBookings = computed(() => applyFilter(bookingsList.value))
const filteredQuotes = computed(() => applyFilter(quotesList.value))
const filteredMessages = computed(() => applyFilter(messagesList.value))

// --- Export (CSV / Excel / PDF) ---
const { exportCsv, exportExcel, exportPdf } = useAdminExport()
const exportOpen = ref(false)

const exportConfig = computed(() => {
  const stamp = new Date().toISOString().slice(0, 10)
  if (activeTab.value === 'bookings') {
    return {
      title: 'Eddie APS — Bookings',
      filename: `eddie-aps-bookings-${stamp}`,
      rows: filteredBookings.value,
      columns: [
        { label: 'Customer', value: (r: any) => r.customerName },
        { label: 'Phone', value: (r: any) => r.customerPhone },
        { label: 'Email', value: (r: any) => r.customerEmail },
        { label: 'Vehicle', value: (r: any) => `${r.vehicleYear} ${r.vehicleMake} ${r.vehicleModel}` },
        { label: 'Type', value: (r: any) => r.vehicleType },
        { label: 'Service', value: (r: any) => r.serviceName },
        { label: 'Date', value: (r: any) => r.preferredDate },
        { label: 'Time', value: (r: any) => r.preferredTime },
        { label: 'Address', value: (r: any) => r.address },
        { label: 'Notes', value: (r: any) => r.notes },
        { label: 'Status', value: (r: any) => r.status },
        { label: 'Submitted', value: (r: any) => r.createdAt },
      ],
    }
  }
  if (activeTab.value === 'quotes') {
    return {
      title: 'Eddie APS — Quote Requests',
      filename: `eddie-aps-quotes-${stamp}`,
      rows: filteredQuotes.value,
      columns: [
        { label: 'Customer', value: (r: any) => r.customerName },
        { label: 'Phone', value: (r: any) => r.customerPhone },
        { label: 'Email', value: (r: any) => r.customerEmail },
        { label: 'Vehicle', value: (r: any) => `${r.vehicleYear} ${r.vehicleMake} ${r.vehicleModel}` },
        { label: 'Service Required', value: (r: any) => r.serviceRequired },
        { label: 'Condition', value: (r: any) => r.vehicleCondition },
        { label: 'Target Date', value: (r: any) => r.preferredDate },
        { label: 'Status', value: (r: any) => r.status },
        { label: 'Submitted', value: (r: any) => r.createdAt },
      ],
    }
  }
  return {
    title: 'Eddie APS — Messages',
    filename: `eddie-aps-messages-${stamp}`,
    rows: filteredMessages.value,
    columns: [
      { label: 'Name', value: (r: any) => r.name },
      { label: 'Phone', value: (r: any) => r.phone },
      { label: 'Email', value: (r: any) => r.email },
      { label: 'Message', value: (r: any) => r.message },
      { label: 'Status', value: (r: any) => r.status },
      { label: 'Submitted', value: (r: any) => r.createdAt },
    ],
  }
})

const doExport = (format: 'csv' | 'excel' | 'pdf') => {
  const cfg = exportConfig.value
  exportOpen.value = false
  if (!cfg.rows.length) return
  if (format === 'csv') exportCsv(cfg.rows, cfg.columns, cfg.filename)
  else if (format === 'excel') exportExcel(cfg.rows, cfg.columns, cfg.filename)
  else exportPdf(cfg.title, cfg.rows, cfg.columns)
}

// Administrative actions
const updateBookingStatus = async (id: number, newStatus: string) => {
  try {
    await $fetch(`/api/admin/bookings/${id}`, {
      method: 'PUT',
      body: { status: newStatus }
    })
    refreshBookings()
  } catch (err) {
    // Local mutations for demo stability if D1 isn't writable
    const idx = bookingsList.value.findIndex(b => b.id === id)
    if (idx !== -1) bookingsList.value[idx].status = newStatus
  }
}

const updateQuoteStatus = async (id: number, newStatus: string) => {
  try {
    await $fetch(`/api/admin/quotes/${id}`, {
      method: 'PUT',
      body: { status: newStatus }
    })
    refreshQuotes()
  } catch (err) {
    const idx = quotesList.value.findIndex(q => q.id === id)
    if (idx !== -1) quotesList.value[idx].status = newStatus
  }
}

const markMessageRead = async (id: number) => {
  try {
    await $fetch(`/api/admin/messages/${id}`, {
      method: 'PUT',
      body: { status: 'read' }
    })
    refreshMessages()
  } catch (err) {
    const idx = messagesList.value.findIndex(m => m.id === id)
    if (idx !== -1) messagesList.value[idx].status = 'read'
  }
}

const deleteBooking = async (id: number) => {
  if (!confirm('Delete this booking permanently? This cannot be undone.')) return
  try {
    await $fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' })
    refreshBookings()
  } catch (err) {
    const i = bookingsList.value.findIndex((b: any) => b.id === id)
    if (i !== -1) bookingsList.value.splice(i, 1)
  }
}

const deleteQuote = async (id: number) => {
  if (!confirm('Delete this quote request permanently? This cannot be undone.')) return
  try {
    await $fetch(`/api/admin/quotes/${id}`, { method: 'DELETE' })
    refreshQuotes()
  } catch (err) {
    const i = quotesList.value.findIndex((q: any) => q.id === id)
    if (i !== -1) quotesList.value.splice(i, 1)
  }
}

const deleteMessage = async (id: number) => {
  if (!confirm('Delete this message permanently? This cannot be undone.')) return
  try {
    await $fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    refreshMessages()
  } catch (err) {
    const i = messagesList.value.findIndex((m: any) => m.id === id)
    if (i !== -1) messagesList.value.splice(i, 1)
  }
}

// --- Social links ---
const { data: socialLinksList, refresh: refreshSocialLinks } = await useFetch('/api/admin/social-links', {
  lazy: true,
  default: (): SocialLink[] => [],
})

const SOCIAL_PLATFORMS = ['facebook', 'instagram', 'tiktok', 'x', 'youtube', 'linkedin', 'whatsapp', 'website']

const blankSocial = () => ({ id: 0, platform: 'facebook', label: '', url: '', sortOrder: 0, enabled: true })
const socialForm = ref(blankSocial())
const socialError = ref('')
const socialSaving = ref(false)

const editSocial = (link: SocialLink) => {
  socialForm.value = { ...link }
  socialError.value = ''
}

const resetSocialForm = () => {
  socialForm.value = blankSocial()
  socialError.value = ''
}

const saveSocial = async () => {
  socialSaving.value = true
  socialError.value = ''
  const { id, ...payload } = socialForm.value
  try {
    if (id) await $fetch(`/api/admin/social-links/${id}`, { method: 'PUT', body: payload })
    else await $fetch('/api/admin/social-links', { method: 'POST', body: payload })
    resetSocialForm()
    await refreshSocialLinks()
  } catch (err: any) {
    socialError.value = err?.data?.statusMessage || 'Could not save this link.'
  } finally {
    socialSaving.value = false
  }
}

const deleteSocial = async (id: number) => {
  if (!confirm('Delete this social link? It will disappear from the site footer.')) return
  try {
    await $fetch(`/api/admin/social-links/${id}`, { method: 'DELETE' })
    await refreshSocialLinks()
  } catch (err: any) {
    socialError.value = err?.data?.statusMessage || 'Could not delete this link.'
  }
}

// --- Admin users ---
const { data: usersList, refresh: refreshUsers } = await useFetch('/api/admin/users', {
  lazy: true,
  default: (): AdminUser[] => [],
})

const USER_ROLES = ['administrator', 'staff']

const blankUser = () => ({ id: 0, username: '', password: '', role: 'staff' })
const userForm = ref(blankUser())
const userError = ref('')
const userSaving = ref(false)

const editUser = (user: AdminUser) => {
  // password stays blank on edit; sending it empty leaves the existing one alone
  userForm.value = { id: user.id, username: user.username, password: '', role: user.role }
  userError.value = ''
}

const resetUserForm = () => {
  userForm.value = blankUser()
  userError.value = ''
}

const saveUser = async () => {
  userSaving.value = true
  userError.value = ''
  const { id, ...payload } = userForm.value
  try {
    if (id) await $fetch(`/api/admin/users/${id}`, { method: 'PUT', body: payload })
    else await $fetch('/api/admin/users', { method: 'POST', body: payload })
    resetUserForm()
    await refreshUsers()
  } catch (err: any) {
    userError.value = err?.data?.statusMessage || 'Could not save this user.'
  } finally {
    userSaving.value = false
  }
}

const deleteUser = async (id: number) => {
  if (!confirm('Delete this admin user? They will lose portal access immediately.')) return
  try {
    await $fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    await refreshUsers()
  } catch (err: any) {
    userError.value = err?.data?.statusMessage || 'Could not delete this user.'
  }
}

// the search/filter/export toolbar only applies to submitted form data
const isSubmissionsTab = computed(() => ['bookings', 'quotes', 'messages'].includes(activeTab.value))

const logout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/admin/login')
}
</script>

<template>
  <div class="py-12 bg-slate-950 min-h-screen text-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Dashboard Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-8 mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-white tracking-tight">Eddie APS Admin Portal</h1>
          <p class="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">
            Real-time Bookings, Quotes, and Communications
          </p>
        </div>
        <button
          @click="logout"
          class="sm:self-end px-4 py-2 text-xs font-bold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900 rounded-lg transition-colors"
        >
          Sign Out Portal
        </button>
      </div>

      <!-- Overview Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div class="bg-slate-900 border border-slate-850 p-6 rounded-xl">
          <span class="text-xs text-slate-500 uppercase tracking-wider font-bold">Total Bookings</span>
          <div class="text-3xl font-black text-white mt-2">{{ bookingsList.length }}</div>
        </div>
        <div class="bg-slate-900 border border-slate-850 p-6 rounded-xl">
          <span class="text-xs text-slate-500 uppercase tracking-wider font-bold">Pending Quotes</span>
          <div class="text-3xl font-black text-blue-500 mt-2">
            {{ quotesList.filter(q => q.status === 'Pending').length }}
          </div>
        </div>
        <div class="bg-slate-900 border border-slate-850 p-6 rounded-xl">
          <span class="text-xs text-slate-500 uppercase tracking-wider font-bold">Unread Messages</span>
          <div class="text-3xl font-black text-emerald-500 mt-2">
            {{ messagesList.filter(m => m.status === 'unread').length }}
          </div>
        </div>
      </div>

      <!-- Tab Selectors -->
      <div class="flex border-b border-slate-900 mb-8">
        <button
          @click="activeTab = 'bookings'"
          class="px-6 py-3 border-b-2 text-sm font-bold transition-colors"
          :class="[
            activeTab === 'bookings'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          ]"
        >
          📅 Bookings ({{ bookingsList.length }})
        </button>
        <button
          @click="activeTab = 'quotes'"
          class="px-6 py-3 border-b-2 text-sm font-bold transition-colors"
          :class="[
            activeTab === 'quotes'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          ]"
        >
          📄 Quote Requests ({{ quotesList.length }})
        </button>
        <button
          @click="activeTab = 'messages'"
          class="px-6 py-3 border-b-2 text-sm font-bold transition-colors"
          :class="[
            activeTab === 'messages'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          ]"
        >
          ✉ Messages ({{ messagesList.length }})
        </button>
        <button
          @click="activeTab = 'socials'"
          class="px-6 py-3 border-b-2 text-sm font-bold transition-colors"
          :class="[
            activeTab === 'socials'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          ]"
        >
          🔗 Social Links ({{ socialLinksList.length }})
        </button>
        <button
          @click="activeTab = 'users'"
          class="px-6 py-3 border-b-2 text-sm font-bold transition-colors"
          :class="[
            activeTab === 'users'
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          ]"
        >
          👤 Users ({{ usersList.length }})
        </button>
      </div>

      <!-- Toolbar: search, status filter, export -->
      <div v-if="isSubmissionsTab" class="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div class="flex flex-1 gap-3">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search name, email, or phone…"
            class="flex-1 max-w-sm bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
          />
          <select
            v-model="statusFilter"
            class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option v-for="opt in statusOptions" :key="opt" :value="opt">
              {{ opt === 'all' ? 'All statuses' : opt }}
            </option>
          </select>
        </div>
        <div class="relative shrink-0">
          <button
            @click="exportOpen = !exportOpen"
            class="px-4 py-2 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center gap-2"
          >
            ⬇ Export <span class="text-xs">▾</span>
          </button>
          <div
            v-if="exportOpen"
            class="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-20 overflow-hidden"
          >
            <button @click="doExport('csv')" class="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">📄 CSV (.csv)</button>
            <button @click="doExport('excel')" class="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">📊 Excel (.xls)</button>
            <button @click="doExport('pdf')" class="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">🧾 PDF (print)</button>
          </div>
        </div>
      </div>

      <!-- TAB CONTENTS -->
      
      <!-- Tab 1: Bookings List -->
      <div v-if="activeTab === 'bookings'" class="space-y-4">
        <div
          v-for="b in filteredBookings"
          :key="b.id"
          class="bg-slate-900 border border-slate-850 rounded-xl p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6 hover:border-slate-800 transition-colors"
        >
          <div class="space-y-3">
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="text-base font-bold text-white">{{ b.customerName }}</h3>
              <span class="text-xs px-2 py-0.5 rounded font-bold border" :class="[
                b.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/25 text-amber-500' :
                b.status === 'Confirmed' ? 'bg-blue-500/10 border-blue-500/25 text-blue-500' :
                'bg-emerald-500/10 border-emerald-500/25 text-emerald-500'
              ]">{{ b.status }}</span>
              <span class="text-xs text-slate-500">{{ b.createdAt }}</span>
            </div>

            <!-- Booking details -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs text-slate-450">
              <div>📞 Phone: <a :href="`tel:${b.customerPhone}`" class="text-slate-300 font-semibold">{{ b.customerPhone }}</a></div>
              <div>✉ Email: <span class="text-slate-300">{{ b.customerEmail }}</span></div>
              <div>🚗 Car: <strong class="text-slate-300">{{ b.vehicleYear }} {{ b.vehicleMake }} {{ b.vehicleModel }} ({{ b.vehicleType }})</strong></div>
              <div>🛠 Plan: <strong class="text-blue-400">{{ b.serviceName }}</strong></div>
              <div>📅 Slot: <span class="text-slate-300 font-semibold">{{ b.preferredDate }} at {{ b.preferredTime }}</span></div>
              <div>📍 Address: <span class="text-slate-300">{{ b.address || 'Stationed Facility' }}</span></div>
            </div>
            
            <p v-if="b.notes" class="text-xs text-slate-400 italic bg-slate-950 p-3 rounded-lg border border-slate-900">
              Note: "{{ b.notes }}"
            </p>
          </div>

          <!-- Quick actions -->
          <div class="flex flex-row md:flex-col items-center justify-end gap-2 shrink-0 self-end md:self-start">
            <button
              v-if="b.status === 'Pending'"
              @click="updateBookingStatus(b.id, 'Confirmed')"
              class="px-4.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Confirm
            </button>
            <button
              v-if="b.status === 'Confirmed'"
              @click="updateBookingStatus(b.id, 'Completed')"
              class="px-4.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
            >
              Complete
            </button>
            <button
              v-if="b.status !== 'Cancelled'"
              @click="updateBookingStatus(b.id, 'Cancelled')"
              class="px-4.5 py-2 text-xs font-bold text-rose-400 hover:text-white border border-slate-800 hover:bg-rose-900/20 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteBooking(b.id)"
              title="Delete permanently"
              class="px-4.5 py-2 text-xs font-bold text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 rounded-lg transition-colors"
            >
              🗑 Delete
            </button>
          </div>
        </div>

        <div v-if="!filteredBookings.length" class="text-center py-20 text-slate-500">
          {{ bookingsList.length ? 'No bookings match your search.' : 'No bookings logged.' }}
        </div>
      </div>

      <!-- Tab 2: Quotes List -->
      <div v-if="activeTab === 'quotes'" class="space-y-4">
        <div
          v-for="q in filteredQuotes"
          :key="q.id"
          class="bg-slate-900 border border-slate-850 rounded-xl p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6 hover:border-slate-800 transition-colors"
        >
          <div class="space-y-3">
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="text-base font-bold text-white">{{ q.customerName }}</h3>
              <span class="text-xs px-2 py-0.5 rounded font-bold border" :class="[
                q.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/25 text-amber-500' :
                'bg-emerald-500/10 border-emerald-500/25 text-emerald-500'
              ]">{{ q.status }}</span>
              <span class="text-xs text-slate-500">{{ q.createdAt }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs text-slate-450">
              <div>📞 Phone: <a :href="`tel:${q.customerPhone}`" class="text-slate-300 font-semibold">{{ q.customerPhone }}</a></div>
              <div>✉ Email: <span class="text-slate-300">{{ q.customerEmail }}</span></div>
              <div>🚗 Car: <strong class="text-slate-300">{{ q.vehicleYear }} {{ q.vehicleMake }} {{ q.vehicleModel }}</strong></div>
              <div>🛠 Req: <strong class="text-blue-400">{{ q.serviceRequired }}</strong></div>
              <div>🛡 Condition: <strong class="text-slate-300">{{ q.vehicleCondition }}</strong></div>
              <div>📅 Target: <span class="text-slate-300">{{ q.preferredDate || 'No date set' }}</span></div>
            </div>

            <p v-if="q.notes" class="text-xs text-slate-400 italic bg-slate-950 p-3 rounded-lg border border-slate-900">
              Notes: "{{ q.notes }}"
            </p>
          </div>

          <div class="flex flex-row md:flex-col gap-2 shrink-0 self-end md:self-start">
            <button
              v-if="q.status === 'Pending'"
              @click="updateQuoteStatus(q.id, 'Sent')"
              class="px-4.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Mark Estimate Sent
            </button>
            <button
              @click="updateQuoteStatus(q.id, 'Declined')"
              class="px-4.5 py-2 text-xs font-bold text-rose-450 hover:text-white border border-slate-800 hover:bg-rose-900/20 rounded-lg transition-colors"
            >
              Reject
            </button>
            <button
              @click="deleteQuote(q.id)"
              title="Delete permanently"
              class="px-4.5 py-2 text-xs font-bold text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 rounded-lg transition-colors"
            >
              🗑 Delete
            </button>
          </div>
        </div>

        <div v-if="!filteredQuotes.length" class="text-center py-20 text-slate-500">
          {{ quotesList.length ? 'No quotes match your search.' : 'No quotes requested.' }}
        </div>
      </div>

      <!-- Tab 3: Contact Messages -->
      <div v-if="activeTab === 'messages'" class="space-y-4">
        <div
          v-for="m in filteredMessages"
          :key="m.id"
          class="bg-slate-900 border border-slate-855 rounded-xl p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6 hover:border-slate-800 transition-colors"
          :class="{ 'opacity-60': m.status === 'read' }"
        >
          <div class="space-y-3">
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="text-base font-bold text-white">{{ m.name }}</h3>
              <span class="text-xs px-2 py-0.5 rounded font-bold border" :class="[
                m.status === 'unread' ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-500' :
                'bg-slate-800 border-slate-700 text-slate-500'
              ]">{{ m.status }}</span>
              <span class="text-xs text-slate-500">{{ m.createdAt }}</span>
            </div>

            <div class="text-xs text-slate-450 flex flex-wrap gap-4">
              <div>📞 Phone: <a :href="`tel:${m.phone}`" class="text-slate-300 font-semibold">{{ m.phone }}</a></div>
              <div>✉ Email: <span class="text-slate-300">{{ m.email }}</span></div>
            </div>

            <div class="text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-900 leading-relaxed">
              {{ m.message }}
            </div>
          </div>

          <div class="flex flex-row md:flex-col gap-2 shrink-0 self-end md:self-start">
            <button
              v-if="m.status === 'unread'"
              @click="markMessageRead(m.id)"
              class="px-4.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
            >
              Mark Read
            </button>
            <button
              @click="deleteMessage(m.id)"
              title="Delete permanently"
              class="px-4.5 py-2 text-xs font-bold text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 rounded-lg transition-colors"
            >
              🗑 Delete
            </button>
          </div>
        </div>

        <div v-if="!filteredMessages.length" class="text-center py-20 text-slate-500">
          {{ messagesList.length ? 'No messages match your search.' : 'No message inbox history.' }}
        </div>
      </div>

      <!-- Social Links -->
      <div v-if="activeTab === 'socials'" class="grid gap-8 lg:grid-cols-[22rem_1fr] items-start">
        <!-- Add / edit form -->
        <form
          class="bg-slate-900 border border-slate-850 rounded-xl p-6 space-y-4"
          @submit.prevent="saveSocial"
        >
          <h3 class="text-sm font-bold text-white uppercase tracking-wider">
            {{ socialForm.id ? 'Edit Link' : 'Add Social Link' }}
          </h3>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Platform</label>
            <select
              v-model="socialForm.platform"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option v-for="p in SOCIAL_PLATFORMS" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Label</label>
            <input
              v-model="socialForm.label"
              type="text"
              required
              placeholder="Eddie APS on Facebook"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">URL</label>
            <input
              v-model="socialForm.url"
              type="url"
              required
              placeholder="https://facebook.com/eddieaps"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
            >
          </div>

          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Order</label>
              <input
                v-model.number="socialForm.sortOrder"
                type="number"
                class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
            </div>
            <label class="flex items-end gap-2 pb-2.5 text-sm text-slate-300">
              <input v-model="socialForm.enabled" type="checkbox" class="w-4 h-4 accent-blue-600">
              Visible
            </label>
          </div>

          <p v-if="socialError" class="text-xs text-rose-400">{{ socialError }}</p>

          <div class="flex gap-3 pt-1">
            <button
              type="submit"
              :disabled="socialSaving"
              class="flex-1 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg transition-colors"
            >
              {{ socialSaving ? 'Saving…' : socialForm.id ? 'Update Link' : 'Add Link' }}
            </button>
            <button
              v-if="socialForm.id"
              type="button"
              class="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white border border-slate-800 rounded-lg transition-colors"
              @click="resetSocialForm"
            >
              Cancel
            </button>
          </div>
        </form>

        <!-- Existing links -->
        <div class="space-y-4">
          <div
            v-for="link in socialLinksList"
            :key="link.id"
            class="bg-slate-900 border border-slate-850 rounded-xl p-5 flex flex-wrap items-center gap-4"
          >
            <div class="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center text-slate-300 flex-shrink-0">
              <SocialIcon :platform="link.platform" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-sm font-bold text-white flex items-center gap-2">
                {{ link.label }}
                <span
                  v-if="!link.enabled"
                  class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 rounded"
                >Hidden</span>
              </div>
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs text-slate-500 hover:text-blue-400 break-all"
              >{{ link.url }}</a>
            </div>
            <div class="flex gap-2">
              <button
                class="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white border border-slate-800 rounded-lg transition-colors"
                @click="editSocial(link)"
              >
                Edit
              </button>
              <button
                class="px-4 py-2 text-xs font-bold text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 rounded-lg transition-colors"
                @click="deleteSocial(link.id)"
              >
                🗑
              </button>
            </div>
          </div>

          <div v-if="!socialLinksList.length" class="text-center py-20 text-slate-500">
            No social links yet. Add one and it appears in the site footer.
          </div>
        </div>
      </div>

      <!-- Users -->
      <div v-if="activeTab === 'users'" class="grid gap-8 lg:grid-cols-[22rem_1fr] items-start">
        <!-- Add / edit form -->
        <form
          class="bg-slate-900 border border-slate-850 rounded-xl p-6 space-y-4"
          @submit.prevent="saveUser"
        >
          <h3 class="text-sm font-bold text-white uppercase tracking-wider">
            {{ userForm.id ? 'Edit User' : 'Add New User' }}
          </h3>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Username</label>
            <input
              v-model="userForm.username"
              type="text"
              required
              autocomplete="off"
              placeholder="kwame"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Password
              <span v-if="userForm.id" class="text-slate-600 normal-case font-medium">(leave blank to keep)</span>
            </label>
            <input
              v-model="userForm.password"
              type="password"
              autocomplete="new-password"
              :required="!userForm.id"
              placeholder="At least 10 characters"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Role</label>
            <select
              v-model="userForm.role"
              class="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option v-for="r in USER_ROLES" :key="r" :value="r">{{ r }}</option>
            </select>
          </div>

          <p v-if="userError" class="text-xs text-rose-400">{{ userError }}</p>

          <div class="flex gap-3 pt-1">
            <button
              type="submit"
              :disabled="userSaving"
              class="flex-1 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg transition-colors"
            >
              {{ userSaving ? 'Saving…' : userForm.id ? 'Update User' : 'Create User' }}
            </button>
            <button
              v-if="userForm.id"
              type="button"
              class="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white border border-slate-800 rounded-lg transition-colors"
              @click="resetUserForm"
            >
              Cancel
            </button>
          </div>
        </form>

        <!-- Existing users -->
        <div class="space-y-4">
          <div
            v-for="user in usersList"
            :key="user.id"
            class="bg-slate-900 border border-slate-850 rounded-xl p-5 flex flex-wrap items-center gap-4"
          >
            <div class="w-9 h-9 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-black flex-shrink-0">
              {{ user.username.charAt(0).toUpperCase() }}
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-sm font-bold text-white">{{ user.username }}</div>
              <div class="text-xs text-slate-500 uppercase tracking-wider font-semibold">{{ user.role }}</div>
            </div>
            <div class="flex gap-2">
              <button
                class="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white border border-slate-800 rounded-lg transition-colors"
                @click="editUser(user)"
              >
                Edit
              </button>
              <button
                class="px-4 py-2 text-xs font-bold text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 rounded-lg transition-colors"
                @click="deleteUser(user.id)"
              >
                🗑
              </button>
            </div>
          </div>

          <div v-if="!usersList.length" class="text-center py-20 text-slate-500">
            No portal users yet. You are signed in with the credentials from the environment secrets — add a user here to manage access from the database.
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
