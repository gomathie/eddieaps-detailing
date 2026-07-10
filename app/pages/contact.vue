<script setup lang="ts">
const config = useRuntimeConfig()
const phonePrimary = config.public.phonePrimary
const phoneSecondary = config.public.phoneSecondary
const whatsappNumber = config.public.whatsappNumber

useSeoMeta({
  title: 'Contact Us',
  description: 'Get in touch with Eddie APS Detailing. Call, WhatsApp, or send us a message to book your mobile or stationed auto detailing service.',
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const feedback = ref('')

const submit = async () => {
  status.value = 'loading'
  feedback.value = ''
  try {
    const res = await $fetch<{ success: boolean, message: string }>('/api/messages', {
      method: 'POST',
      body: { ...form },
    })
    status.value = 'success'
    feedback.value = res.message || 'Your message has been sent successfully.'
    form.name = ''
    form.email = ''
    form.phone = ''
    form.message = ''
  } catch (err: any) {
    status.value = 'error'
    feedback.value = err?.data?.statusMessage || err?.statusMessage || `Something went wrong. Please call us directly on ${phonePrimary}.`
  }
}

const contactMethods = [
  { icon: 'i-heroicons-phone', label: 'Call Primary', value: phonePrimary, href: `tel:${phonePrimary}` },
  { icon: 'i-heroicons-phone', label: 'Call Secondary', value: phoneSecondary, href: `tel:${phoneSecondary}` },
  { icon: 'i-heroicons-chat-bubble-left-right', label: 'WhatsApp', value: whatsappNumber, href: `https://wa.me/${whatsappNumber.replace(/^0/, '233')}` },
  { icon: 'i-heroicons-envelope', label: 'Email', value: 'info@eddieapsdetailing.com', href: 'mailto:info@eddieapsdetailing.com' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden gradient-hero pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <img
        src="/images/deep-interior.webp"
        alt="Professional auto detailing"
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/90 z-0"></div>
      <div class="relative z-10 container-narrow text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">Get In Touch</h1>
        <p class="text-xl text-white/80 max-w-3xl mx-auto">
          Have a question or ready to book? Reach out and we'll get your vehicle looking its best.
        </p>
      </div>
    </section>

    <!-- Contact grid -->
    <section class="section-padding bg-slate-950">
      <div class="container-narrow">
        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <!-- Contact details -->
          <div>
            <h2 class="text-3xl font-bold text-white mb-4">Contact Details</h2>
            <p class="text-slate-400 mb-8 leading-relaxed">
              We offer both mobile and stationed detailing. Call or WhatsApp us to arrange a convenient time and location.
            </p>

            <div class="space-y-4">
              <a
                v-for="method in contactMethods"
                :key="method.label"
                :href="method.href"
                class="flex items-center gap-4 bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                  <UIcon :name="method.icon" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="text-sm text-slate-500">{{ method.label }}</div>
                  <div class="text-lg font-semibold text-white">{{ method.value }}</div>
                </div>
              </a>
            </div>

            <div class="mt-8 bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <div class="flex items-center gap-2 text-white font-bold mb-2">
                <UIcon name="i-heroicons-clock" class="w-5 h-5 text-blue-500" />
                Working Hours
              </div>
              <p class="text-slate-400 text-sm leading-relaxed">
                Monday – Saturday: 8:00 AM – 6:00 PM<br>
                Sunday: By appointment only
              </p>
            </div>
          </div>

          <!-- Message form -->
          <div class="bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-800">
            <h2 class="text-3xl font-bold text-white mb-6">Send a Message</h2>

            <form class="space-y-5" @submit.prevent="submit">
              <div>
                <label for="name" class="block text-sm font-semibold text-slate-300 mb-1.5">Full Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-blue-500 outline-none transition"
                  placeholder="Your name"
                >
              </div>

              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label for="email" class="block text-sm font-semibold text-slate-300 mb-1.5">Email</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-blue-500 outline-none transition"
                    placeholder="you@example.com"
                  >
                </div>
                <div>
                  <label for="phone" class="block text-sm font-semibold text-slate-300 mb-1.5">Phone</label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-blue-500 outline-none transition"
                    placeholder="0595118973"
                  >
                </div>
              </div>

              <div>
                <label for="message" class="block text-sm font-semibold text-slate-300 mb-1.5">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-blue-500 outline-none transition resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                :disabled="status === 'loading'"
                class="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-500 hover:to-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {{ status === 'loading' ? 'Sending...' : 'Send Message' }}
              </button>

              <p v-if="status === 'success'" class="text-sm font-medium text-emerald-400 flex items-center gap-2">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
                {{ feedback }}
              </p>
              <p v-else-if="status === 'error'" class="text-sm font-medium text-red-400 flex items-center gap-2">
                <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5" />
                {{ feedback }}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
