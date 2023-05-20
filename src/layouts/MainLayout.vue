<template>
  <q-layout view="hHh LpR fff">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer bordered show-if-above v-model="leftDrawerOpen" side="left">
      <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item @click="switchCurrentItem(menuItem)" clickable :active="menuItem.path === currentItemPath" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const leftDrawerOpen = ref(false);
const currentItemPath = ref('Today');

const menuList = [
  {
    icon: 'today',
    label: 'Today',
    path: '/',
    separator: true
  },
  {
    icon: 'check_box_outline_blank',
    label: 'All To-Dos',
    path: '/todos',
    separator: false
  },
  {
    icon: 'check',
    label: 'Done',
    path: '/done',
    separator: false
  },
  {
    icon: 'delete_outline',
    label: 'Removed',
    path: '/removed',
    separator: true
  },
  {
    icon: 'o_settings',
    label: 'Settings',
    path: '/settings',
    separator: false
  }
]

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function switchCurrentItem(item) {
  currentItemPath.value = item.path;
  router.push(item.path);
}
</script>