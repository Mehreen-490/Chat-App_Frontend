<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My App</v-toolbar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <!-- Home / Login -->
        <v-list-item :to="{ name: 'Login' }" link>
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>

        <!-- Signup -->
        <v-list-item :to="{ name: 'Signup' }" link>
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Signup</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view />
        <!-- Child pages render here -->
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <span>&copy; 2025 My Company</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
const drawer = ref(true);
</script>
