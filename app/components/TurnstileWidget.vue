<script setup lang="ts">
/**
 * Cloudflare Turnstile widget.
 *
 * Renders explicitly rather than via auto-discovery: these forms live inside a
 * SPA, so the widget has to be created on mount and torn down on unmount, and
 * reset after a successful submit (a token is single-use).
 *
 * Renders nothing when no sitekey is configured, so the forms keep working
 * before the keys are set.
 */
defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const siteKey = useRuntimeConfig().public.turnstileSiteKey

const container = ref<HTMLElement | null>(null)
const failed = ref(false)
let widgetId: string | undefined

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

const loadScript = () => new Promise<void>((resolve, reject) => {
  const w = window as any
  if (w.turnstile) return resolve()

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
  if (existing) {
    existing.addEventListener('load', () => resolve())
    existing.addEventListener('error', () => reject(new Error('Turnstile script failed')))
    return
  }

  const script = document.createElement('script')
  script.src = SCRIPT_SRC
  script.async = true
  script.defer = true
  script.onload = () => resolve()
  script.onerror = () => reject(new Error('Turnstile script failed'))
  document.head.appendChild(script)
})

const render = async () => {
  if (!siteKey || !container.value) return
  try {
    await loadScript()
  } catch {
    failed.value = true
    return
  }

  const turnstile = (window as any).turnstile
  if (!turnstile) { failed.value = true; return }

  widgetId = turnstile.render(container.value, {
    sitekey: siteKey,
    action: 'turnstile-spin-v1',
    theme: 'dark',
    callback: (token: string) => emit('update:modelValue', token),
    'expired-callback': () => emit('update:modelValue', ''),
    'error-callback': () => emit('update:modelValue', ''),
  })
}

/** Clears the widget so a new token can be issued after a submit. */
const reset = () => {
  const turnstile = (window as any).turnstile
  if (turnstile && widgetId !== undefined) turnstile.reset(widgetId)
  emit('update:modelValue', '')
}

defineExpose({ reset })

onMounted(render)

onBeforeUnmount(() => {
  const turnstile = (window as any).turnstile
  if (turnstile && widgetId !== undefined) turnstile.remove(widgetId)
})
</script>

<template>
  <div v-if="siteKey" class="pt-2 flex flex-col items-center gap-2">
    <div ref="container" class="cf-turnstile" data-action="turnstile-spin-v1" />
    <p v-if="failed" class="text-xs text-rose-400">
      The verification widget could not load. Please refresh the page.
    </p>
  </div>
</template>
