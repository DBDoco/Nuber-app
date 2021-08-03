<script src="https://kit.fontawesome.com/bf8eee5f8a.js" crossorigin="anonymous"></script>
<template>
  <q-layout>
    <q-header elevated class="bg-cyan">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title> Nuber </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable to="/Vozac">
          <q-item-section avatar>
            <i class="fas fa-user-alt"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Vozaci</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/Vozilo">
          <q-item-section avatar>
            <i class="fas fa-car"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Vozila</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/Cijena">
          <q-item-section avatar>
            <i class="fas fa-money-bill"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Cijene</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/Placanje">
          <q-item-section avatar>
            <i class="fas fa-wallet"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label>Placanje</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable @click="home">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>LogOut</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: 'ZeljeznickaPostaja_OutlawsLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$auth.signOut().then(() => {
        this.$router.push('/')
      })
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>
