<script setup lang="ts">
import { ref } from 'vue'

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
      </div>

      <!-- Toolbar: search, status filter, export -->
      <div class="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
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

    </div>
  </div>
</template>
