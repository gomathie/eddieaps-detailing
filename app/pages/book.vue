<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Step control
const currentStep = ref(1)

// Form fields
const form = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: new Date().getFullYear(),
  vehicleType: 'Sedan',
  serviceName: '',
  preferredDate: '',
  preferredTime: '',
  address: '',
  isMobile: true,
  notes: '',
  imageUrls: [] as string[]
})

// Options
const vehicleTypes = ['Sedan', 'SUV', 'Crossover', 'Pickup Truck', 'Minivan / Van', 'Sport Coupe', 'Motorcycle']
const servicesList = [
  'Complete Detailing',
  'Deep Interior Detailing',
  'Exterior Detailing',
  'Engine Detailing',
  'Paint Polishing & Correction',
  'Headlight Restoration',
  'Waxing & Paint Sealing',
  'Ceramic Paint Protection'
]
const timeSlots = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM'
]

// Captcha and loading state
const loading = ref(false)
const success = ref(false)
const errorMsg = ref('')
const turnstileToken = ref('')

onMounted(() => {
  // Capture service query param if coming from a service page
  if (route.query.service) {
    form.value.serviceName = String(route.query.service)
  }
})

// Progress steps
const goToNextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const goToPrevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Custom file upload placeholder
const uploadFiles = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return
  
  // Create static mock urls or send to R2 if DB connects
  for (let i = 0; i < input.files.length; i++) {
    const file = input.files[i]
    // Generate object url for local display
    const url = URL.createObjectURL(file)
    form.value.imageUrls.push(url)
  }
}

const removeUploadedImage = (idx: number) => {
  form.value.imageUrls.splice(idx, 1)
}

// Captures the token from cloudflare turnstile callback
const onTurnstileVerify = (token: string) => {
  turnstileToken.value = token
}

const submitBooking = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const res = await $fetch('/api/bookings', {
      method: 'POST',
      body: {
        ...form.value,
        turnstileToken: turnstileToken.value
      }
    })
    success.value = true
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to submit booking. Please verify details and try again.'
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
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-3">Book Your Detailing Session</h1>
        <p class="text-slate-400 text-sm sm:text-base">
          Fill out our step-by-step form to schedule. We will reach out to confirm details.
        </p>
      </div>

      <!-- Success Screen -->
      <div v-if="success" class="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center text-3xl mx-auto">
          ✓
        </div>
        <h2 class="text-2xl font-bold text-white">Booking Request Received!</h2>
        <p class="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          Thank you, {{ form.customerName }}. Your request for <strong>{{ form.serviceName }}</strong> has been logged. Our coordinator will contact you at <strong>{{ form.customerPhone }}</strong> shortly to finalize details.
        </p>
        <div class="pt-4">
          <NuxtLink to="/" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-colors text-sm">
            Return to Homepage
          </NuxtLink>
        </div>
      </div>

      <!-- Wizard Form -->
      <div v-else class="bg-slate-900 border border-slate-850 rounded-2xl shadow-2xl overflow-hidden">
        <!-- Progress Bar -->
        <div class="bg-slate-950 p-4 border-b border-slate-850 flex items-center justify-between text-xs font-bold text-slate-500">
          <div class="flex items-center space-x-1" :class="{ 'text-blue-500': currentStep >= 1 }">
            <span class="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800" :class="{ 'border-blue-500 bg-blue-500/10': currentStep >= 1 }">1</span>
            <span class="hidden sm:inline">Contact</span>
          </div>
          <div class="flex items-center space-x-1" :class="{ 'text-blue-500': currentStep >= 2 }">
            <span class="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800" :class="{ 'border-blue-500 bg-blue-500/10': currentStep >= 2 }">2</span>
            <span class="hidden sm:inline">Vehicle</span>
          </div>
          <div class="flex items-center space-x-1" :class="{ 'text-blue-500': currentStep >= 3 }">
            <span class="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800" :class="{ 'border-blue-500 bg-blue-500/10': currentStep >= 3 }">3</span>
            <span class="hidden sm:inline">Schedule</span>
          </div>
          <div class="flex items-center space-x-1" :class="{ 'text-blue-500': currentStep >= 4 }">
            <span class="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800" :class="{ 'border-blue-500 bg-blue-500/10': currentStep >= 4 }">4</span>
            <span class="hidden sm:inline">Submit</span>
          </div>
        </div>

        <form @submit.prevent="submitBooking" class="p-8 space-y-6">
          <!-- Step 1: Customer Details -->
          <div v-if="currentStep === 1" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-2">Step 1: Contact Information</h3>
            <div>
              <label for="b-name" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              <input
                id="b-name"
                v-model="form.customerName"
                type="text"
                required
                placeholder="Kwasi Sarpong"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label for="b-email" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <input
                id="b-email"
                v-model="form.customerEmail"
                type="email"
                required
                placeholder="edmond@example.com"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label for="b-phone" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
              <input
                id="b-phone"
                v-model="form.customerPhone"
                type="tel"
                required
                placeholder="0595118973"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Step 2: Vehicle Details -->
          <div v-if="currentStep === 2" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-2">Step 2: Vehicle Information</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="b-make" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Make</label>
                <input
                  id="b-make"
                  v-model="form.vehicleMake"
                  type="text"
                  required
                  placeholder="Toyota"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label for="b-model" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Model</label>
                <input
                  id="b-model"
                  v-model="form.vehicleModel"
                  type="text"
                  required
                  placeholder="Camry"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="b-year" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Year</label>
                <input
                  id="b-year"
                  v-model="form.vehicleYear"
                  type="number"
                  required
                  min="1950"
                  max="2030"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label for="b-vtype" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Vehicle Type</label>
                <select
                  id="b-vtype"
                  v-model="form.vehicleType"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option v-for="t in vehicleTypes" :key="t" :value="t">{{ t }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 3: Service Selection & Scheduling -->
          <div v-if="currentStep === 3" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-2">Step 3: Service & Time</h3>
            <div>
              <label for="b-service" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Package</label>
              <select
                id="b-service"
                v-model="form.serviceName"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled>Choose a detailing plan...</option>
                <option v-for="s in servicesList" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="b-date" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Preferred Date</label>
                <input
                  id="b-date"
                  v-model="form.preferredDate"
                  type="date"
                  required
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label for="b-time" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Preferred Time</label>
                <select
                  id="b-time"
                  v-model="form.preferredTime"
                  required
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Choose a time slot...</option>
                  <option v-for="t in timeSlots" :key="t" :value="t">{{ t }}</option>
                </select>
              </div>
            </div>

            <!-- Service Mode (Mobile vs Stationed) -->
            <div class="space-y-3 pt-2">
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider">Service Location Mode</label>
              <div class="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  @click="form.isMobile = true"
                  class="px-4 py-3 rounded-xl border text-sm font-semibold transition-all"
                  :class="[
                    form.isMobile 
                      ? 'bg-blue-600/10 border-blue-500 text-white' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  ]"
                >
                  📍 Mobile (We Come To You)
                </button>
                <button
                  type="button"
                  @click="form.isMobile = false"
                  class="px-4 py-3 rounded-xl border text-sm font-semibold transition-all"
                  :class="[
                    !form.isMobile 
                      ? 'bg-blue-600/10 border-blue-500 text-white' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  ]"
                >
                  🏬 Stationed (At Our Shop)
                </button>
              </div>
            </div>

            <!-- Mobile address field -->
            <div v-if="form.isMobile">
              <label for="b-addr" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Address/Location</label>
              <input
                id="b-addr"
                v-model="form.address"
                type="text"
                required
                placeholder="123 Driveway St, City"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Step 4: Notes & Photo upload -->
          <div v-if="currentStep === 4" class="space-y-4">
            <h3 class="text-lg font-bold text-white mb-2">Step 4: Additional Details & Photos</h3>
            <div>
              <label for="b-notes" class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Special Notes/Requests</label>
              <textarea
                id="b-notes"
                v-model="form.notes"
                rows="3"
                placeholder="Specify stubborn stains, scratch areas, or preferences..."
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <!-- Photo Upload -->
            <div>
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Upload Vehicle Images (Optional)</label>
              <div class="border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-xl p-6 text-center cursor-pointer relative bg-slate-950">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  @change="uploadFiles"
                />
                <span class="text-2xl block mb-2">📤</span>
                <span class="text-sm font-semibold text-white block">Click to upload files</span>
                <span class="text-xs text-slate-500 mt-1 block">Supports JPG, PNG, WEBP</span>
              </div>

              <!-- Previews -->
              <div v-if="form.imageUrls.length" class="grid grid-cols-4 gap-4 mt-4">
                <div
                  v-for="(img, idx) in form.imageUrls"
                  :key="idx"
                  class="relative h-20 rounded-lg overflow-hidden border border-slate-800 group"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                  <button
                    type="button"
                    @click="removeUploadedImage(idx)"
                    class="absolute inset-0 bg-rose-900/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <!-- Turnstile Placeholder -->
            <div class="pt-2 flex items-center justify-center">
              <div class="cf-turnstile" data-sitekey="1x00000000000000000000AA"></div>
            </div>
          </div>

          <!-- Wizard Nav Buttons -->
          <div class="pt-6 border-t border-slate-850 flex items-center justify-between gap-4">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="goToPrevStep"
              class="px-6 py-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold rounded-xl transition-colors text-sm"
            >
              Previous
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < 4"
              type="button"
              @click="goToNextStep"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-colors text-sm"
            >
              Next Step
            </button>
            <button
              v-else
              type="submit"
              :disabled="loading"
              class="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/10 transition-all duration-200 text-sm"
            >
              {{ loading ? 'Booking...' : 'Confirm Appointment' }}
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
