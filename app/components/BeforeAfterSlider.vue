<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  before: {
    type: String,
    required: true,
  },
  after: {
    type: String,
    required: true,
  },
  beforeLabel: {
    type: String,
    default: 'Before',
  },
  afterLabel: {
    type: String,
    default: 'After',
  },
})

const containerRef = ref<HTMLDivElement | null>(null)
const sliderPosition = ref(50) // Percentage 0 - 100
const isDragging = ref(false)

const handleMove = (clientX: number) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
  sliderPosition.value = percentage
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  handleMove(e.clientX)
}

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  if (e.touches.length > 0) {
    handleMove(e.touches[0].clientX)
  }
}

const startDragging = () => {
  isDragging.value = true
}

const stopDragging = () => {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopDragging)
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend', stopDragging)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDragging)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', stopDragging)
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-2xl border border-slate-800 cursor-ew-resize bg-slate-900 select-none"
    @mousedown.prevent="startDragging"
    @touchstart="startDragging"
  >
    <!-- After Image (Background) -->
    <img
      :src="props.after"
      alt="After detailing work"
      class="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
    />
    <div class="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider select-none pointer-events-none z-10">
      {{ props.afterLabel }}
    </div>

    <!-- Before Image (Clipped Overlay via clip-path) -->
    <div
      class="absolute inset-0 w-full h-full select-none pointer-events-none"
      :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
    >
      <img
        :src="props.before"
        alt="Before detailing work"
        class="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />
      <div class="absolute bottom-4 left-4 bg-blue-600/95 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider select-none pointer-events-none z-10">
        {{ props.beforeLabel }}
      </div>
    </div>

    <!-- Slider Drag Handle Line and Button -->
    <div
      class="absolute top-0 bottom-0 w-0.5 bg-blue-500 cursor-ew-resize select-none z-20"
      :style="{ left: `${sliderPosition}%` }"
    >
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-blue-600 border-2 border-white text-white rounded-full flex items-center justify-center shadow-lg pointer-events-none">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M8 9l-4 4 4 4m8-8l4 4-4 4" />
        </svg>
      </div>
    </div>
  </div>
</template>
