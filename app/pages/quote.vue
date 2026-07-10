<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: new Date().getFullYear(),
  serviceRequired: 'Complete Detailing',
  vehicleCondition: 'Fair', // Fair, Needs Work, Extremely Dirty
  preferredDate: '',
  notes: '',
  imageUrls: [] as string[]
})

const servicesList = [
  'Complete Detailing',
  'Deep Interior Detailing',
  'Exterior Detailing',
  'Engine Detailing',
  'Paint Polishing & Correction',
  'Headlight Restoration',
  'Waxing & Paint Sealing',
  'Ceramic Paint Protection',
  'Multiple Vehicles / Custom Package'
]

const conditionsList = [
  { value: 'Excellent', label: 'Excellent (Clean, just needs light dust removal & seal)' },
  { value: 'Fair', label: 'Fair (Normal dust, small crumbs, minor water marks)' },
  { value: 'Needs Work', label: 'Needs Work (Pet hair, mud, beverage stains, light swirls)' },
  { value: 'Extremely Dirty', label: 'Extremely Dirty (Heavy staining, mold/mildew, deep scratches)' }
]

const loading = ref(false)
const success = ref(false)
const errorMsg = ref('')
const turnstileToken = ref('')

const uploadFiles = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return
  
  for (let i = 0; i < input.files.length; i++) {
    const file = input.files[i]
    const url = URL.createObjectURL(file)
    form.value.imageUrls.push(url)
  }
}

const removeUploadedImage = (idx: number) => {
  form.value.imageUrls.splice(idx, 1)
}

const submitQuote = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const res = await $fetch('/api/quotes', {
      method: 'POST',
      body: {
        ...form.value,
        turnstileToken: turnstileToken.value
      }
    })
    success.value = true
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to submit quote request. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="py-20 bg-slate-950 min-h-screen text-slate-200">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-3">Request A Free Custom Quote</h1>
        <p class="text-slate-400 text-sm sm:text-base">
          Submit details about your vehicle's make and condition. We will review and send you a pricing estimate.
        </p>
      </div>

      <!-- Success Screen -->
      <div v-if="success" class="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center text-3xl mx-auto">
          ✓
        </div>
        <h2 class="text-2xl font-bold text-white">Quote Request Received!</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          Thank you, {{ form.customerName }}. Your request for a custom quote on your <strong>{{ form.vehicleYear }} {{ form.vehicleMake }} {{ form.vehicleModel }}</strong> has been logged. Our detailing specialist will review your details and photos, then email you an estimate within 1-2 hours.
        </p>
        <div class="pt-4">
          <NuxtLink to="/" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-colors text-sm">
            Back to Home
          </NuxtLink>
        </div>
      </div>

      <!-- Quote Form -->
      <div v-else class="bg-slate-900 border border-slate-850 rounded-2xl shadow-2xl p-8">
        <form @submit.prevent="submitQuote" class="space-y-6">
          
          <!-- Section 1: Customer Details -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-white border-b border-slate-850 pb-2">1. Your Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="q-name" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                <input
                  id="q-name"
                  v-model="form.customerName"
                  type="text"
                  required
                  placeholder="John Doe"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label for="q-email" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                <input
                  id="q-email"
                  v-model="form.customerEmail"
                  type="email"
                  required
                  placeholder="john@example.com"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label for="q-phone" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                <input
                  id="q-phone"
                  v-model="form.customerPhone"
                  type="tel"
                  required
                  placeholder="0595118973"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Section 2: Vehicle Details -->
          <div class="space-y-4 pt-4">
            <h3 class="text-lg font-bold text-white border-b border-slate-850 pb-2">2. Vehicle Specifications</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="q-make" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Make</label>
                <input
                  id="q-make"
                  v-model="form.vehicleMake"
                  type="text"
                  required
                  placeholder="Toyota"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label for="q-model" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Model</label>
                <input
                  id="q-model"
                  v-model="form.vehicleModel"
                  type="text"
                  required
                  placeholder="Highlander"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label for="q-year" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Year</label>
                <input
                  id="q-year"
                  v-model="form.vehicleYear"
                  type="number"
                  required
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Section 3: Requirements -->
          <div class="space-y-4 pt-4">
            <h3 class="text-lg font-bold text-white border-b border-slate-850 pb-2">3. Detailing Preferences</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="q-service" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Desired Service</label>
                <select
                  id="q-service"
                  v-model="form.serviceRequired"
                  required
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option v-for="s in servicesList" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
              <div>
                <label for="q-date" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Date (Optional)</label>
                <input
                  id="q-date"
                  v-model="form.preferredDate"
                  type="date"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label for="q-cond" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Condition of Vehicle</label>
              <select
                id="q-cond"
                v-model="form.vehicleCondition"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option v-for="c in conditionsList" :key="c.value" :value="c.value">{{ c.label }}</option>
              </select>
            </div>

            <div>
              <label for="q-notes" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Specific Dirt, Stains, or Scratches to Address</label>
              <textarea
                id="q-notes"
                v-model="form.notes"
                rows="4"
                placeholder="Please describe which areas require extra work (e.g. coffee stain on driver seat, water spots on trunk)..."
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <!-- Upload Photos -->
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upload Condition Photos (Highly Recommended)</label>
              <div class="border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-xl p-6 text-center cursor-pointer relative bg-slate-950">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  @change="uploadFiles"
                />
                <span class="text-2xl block mb-2">📸</span>
                <span class="text-sm font-semibold text-white block">Drop images here or click to select</span>
                <span class="text-xs text-slate-500 mt-1 block">Help us provide an accurate estimate. Max 5 photos.</span>
              </div>

              <!-- Upload Previews -->
              <div v-if="form.imageUrls.length" class="grid grid-cols-5 gap-4 mt-4">
                <div
                  v-for="(img, idx) in form.imageUrls"
                  :key="idx"
                  class="relative h-16 rounded-lg overflow-hidden border border-slate-800 group"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                  <button
                    type="button"
                    @click="removeUploadedImage(idx)"
                    class="absolute inset-0 bg-rose-900/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div class="pt-6 border-t border-slate-850 flex items-center justify-end">
            <button
              type="submit"
              :disabled="loading"
              class="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/10 transition-all duration-200 text-sm"
            >
              {{ loading ? 'Submitting...' : 'Request Pricing Estimate' }}
            </button>
          </div>

          <p v-if="errorMsg" class="text-sm text-rose-400 font-semibold text-center mt-4">
            {{ errorMsg }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
