<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface SubmenuItem {
  name: string;
  url: string;
}

interface MenuItem {
  name: string;
  url: string;
  submenu: SubmenuItem[];
  showSubmenu?: boolean;
}

const props = defineProps<{
  initialMenuItems: MenuItem[]
}>();

const menuItems = ref<MenuItem[]>(
  props.initialMenuItems.map(item => ({
    ...item,
    showSubmenu: false
  }))
);

const isMobileMenuOpen = ref(false);

function toggleSubmenu(index: number) {
  const wasOpen = menuItems.value[index].showSubmenu;
  menuItems.value.forEach((item) => { item.showSubmenu = false; });
  menuItems.value[index].showSubmenu = !wasOpen;
}

function hoverSubmenu(index: number, value: boolean) {
  if (window.innerWidth >= 768) {
    menuItems.value[index].showSubmenu = value;
  }
}

const phoneLink = ref('tel:+573225019305');
onMounted(async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    if (data.country_code === 'CO') phoneLink.value = 'tel:3225019305';
  } catch (e) {}
});
</script>

<template>
  <header class="w-full fixed top-0 left-0 z-50 font-sans">
    <div class="bg-[#f0ba18] p-2 text-sm text-center md:text-left w-full shadow-sm relative z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div class="hidden sm:flex items-center gap-2">
          <a href="mailto:grupotransporterg@gmail.com" class="font-bold text-gray-800 hover:text-black transition-colors">
            <i class="fa-solid fa-envelope mr-1"></i> grupotransporterg@gmail.com
          </a>
        </div>
        <a :href="phoneLink" class="font-bold text-gray-800 hover:text-black md:text-lg flex items-center gap-2">
          <i class="fa-solid fa-phone-volume animate-pulse"></i> (+57) 322 - 5019305
        </a>
        <div class="hidden sm:flex gap-4">
          <a href="https://www.facebook.com/grupotransporterg" target="_blank" class="text-2xl text-gray-800 hover:text-black transition-transform hover:scale-110"><i class="fa-brands fa-square-facebook"></i></a>
          <a href="https://www.instagram.com/grupotransporterg?igsh=MWl0NThubzc1ZWxkdQ==" target="_blank" class="text-2xl text-gray-800 hover:text-black transition-transform hover:scale-110"><i class="fa-brands fa-square-instagram"></i></a>
        </div>
      </div>
    </div>

    <nav class="bg-white/95 dark:bg-[#2a2a2a]/95 backdrop-blur-md shadow-md transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <a href="/" class="h-14 md:h-16 transition-transform hover:scale-105">
          <img src="/img/logo_dark.svg" alt="Logo" class="h-full block dark:hidden" />
          <img src="/img/logo_light.svg" alt="Logo" class="h-full hidden dark:block" />
        </a>

        <div class="hidden md:flex flex-1 justify-center items-center h-full">
          <ul class="flex space-x-8 text-lg font-bold text-gray-800 dark:text-gray-100">
            <li v-for="(item, index) in menuItems" :key="index" 
                class="relative h-full flex items-center"
                @mouseenter="hoverSubmenu(index, true)" 
                @mouseleave="hoverSubmenu(index, false)">
              
              <div class="flex items-center gap-1 hover:text-[#f0ba18] transition-colors py-2 cursor-pointer">
                <a :href="item.url">{{ item.name }}</a>
                <i v-if="item.submenu.length > 0" 
                   class="fas fa-chevron-down text-xs transition-transform duration-300"
                   :class="{'rotate-180 text-[#f0ba18]': item.showSubmenu}">
                </i>
              </div>

              <transition name="fade-y">
                <ul v-show="item.submenu.length > 0 && item.showSubmenu" 
                    class="absolute left-1/2 -translate-x-1/2 top-[80%] bg-white dark:bg-[#1f1f1f] border border-gray-100 dark:border-zinc-700 rounded-xl py-3 w-60 z-50 shadow-2xl overflow-hidden">
                  <li v-for="sub in item.submenu" :key="sub.name">
                    <a :href="sub.url" class="block px-6 py-3 text-base text-gray-600 dark:text-gray-300 hover:text-[#f0ba18] hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                      {{ sub.name }}
                    </a>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </div>

        <div class="hidden md:flex">
          <a href="https://wa.me/573225019305?text=Hola,%20vengo%20de%20la%20web,%20quiero%20más%20información."
             target="_blank"
             class="bg-black hover:bg-[#f0ba18] text-white hover:text-black font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-transparent hover:border-[#f0ba18]/20 flex items-center gap-2">
             <span>¡Cotiza ahora!</span>
             <i class="fas fa-arrow-right text-sm"></i>
          </a>
        </div>

        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-3xl text-gray-800 dark:text-white focus:outline-none">
          <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>

      <transition name="slide-down">
        <div v-show="isMobileMenuOpen" class="md:hidden bg-white dark:bg-[#2a2a2a] border-t border-gray-100 dark:border-zinc-800 shadow-inner overflow-hidden">
          <ul class="p-4 space-y-2">
            <li v-for="(item, index) in menuItems" :key="index">
              <div @click="item.submenu.length ? toggleSubmenu(index) : null" 
                   class="flex justify-between items-center py-3 px-2 cursor-pointer border-b border-gray-100 dark:border-zinc-800">
                <a v-if="!item.submenu.length" :href="item.url" class="font-bold text-lg text-gray-800 dark:text-gray-100 w-full">{{ item.name }}</a>
                <span v-else class="font-bold text-lg text-gray-800 dark:text-gray-100">{{ item.name }}</span>
                <i v-if="item.submenu.length" class="fas fa-chevron-down transition-transform duration-300" :class="{'rotate-180 text-[#f0ba18]': item.showSubmenu}"></i>
              </div>
              
              <div v-show="item.submenu.length && item.showSubmenu" class="pl-4 bg-gray-50 dark:bg-black/20 border-l-4 border-[#f0ba18] mt-1 mb-2 rounded-r-lg">
                <a v-for="sub in item.submenu" :key="sub.name" :href="sub.url" class="block py-3 text-gray-600 dark:text-gray-300 hover:text-[#f0ba18]" @click="isMobileMenuOpen = false">
                  {{ sub.name }}
                </a>
              </div>
            </li>

            <li class="pt-6 pb-2">
              <a href="https://wa.me/573225019305?text=Hola,%20vengo%20de%20la%20web,%20quiero%20más%20información."
                 target="_blank"
                 class="block w-full bg-[#f0ba18] hover:bg-yellow-400 text-black font-bold text-center text-lg py-3 rounded-xl shadow-md active:scale-95 transition-all">
                 ¡Cotiza Ahora!
              </a>
            </li>
          </ul>
        </div>
      </transition>
    </nav>
  </header>
</template>

<style scoped>
.fade-y-enter-active, .fade-y-leave-active { transition: all 0.2s ease; }
.fade-y-enter-from, .fade-y-leave-to { opacity: 0; transform: translate(-50%, 10px); }
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.3s ease; max-height: 1000px; }
.slide-down-enter-from, .slide-down-leave-to { max-height: 0; opacity: 0; }
</style>