<template>
  <div class="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
    <!-- Navigation Header -->
    <AppHeader />

    <!-- Main Content Page -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Floating Quick Actions -->
    <WhatsAppButton />
  </div>
</template>

<style>
/* Global page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
