<template>
    <q-layout>
        <q-header elevated>
            <q-toolbar class="bg-cyan">
                <q-toolbar-title>
                    Nuber
                </q-toolbar-title>
                <q-btn
                    flat
                    dense
                    @click = "openWelcomePage"
                    icon = "home"
                />
                <q-space />
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
  name: 'LoginPageLayout',
  methods: {
    openWelcomePage () {
      this.$router.push('/')
    }
  }
}
</script>
