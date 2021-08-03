<template>
  <div class="q-pa-lg row justify-center">
    <div class="col" style="max-width: 500px">
      <q-table
        v-if="isMounted"
        title="Vozaci"
        :data="Vozaci"
        :columns="columns"
        row-key="oib_vozaca"
        flat
      >
        <template v-slot:top>
          <q-btn color="cyan-6" label="Dodaj vozaca" @click="onNewRow" />
        </template>
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <div v-if="props.col.name === 'actions'">
              <q-btn
                dense
                color="cyan-6"
                icon="edit"
                @click="onUpdateRow(props.row)"
              />
              <q-btn
                dense
                color="cyan-6"
                icon="delete"
                @click="onDeleteRow(props.row)"
              />
            </div>
            <div v-else>
              {{ props.row[props.col.field] }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-if="openDialog" v-model="openDialog">
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div class="text-h6">Vozac</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Ime vozaca"
            :error="!Vozac.ime_vozaca || Vozac.ime_vozaca.length === 0"
            error-message="Ime vozaca je obavezno."
            label="Ime vozaca"
            v-model="Vozac.ime_vozaca"
          />
          <q-input
            ref="prezime vozaca"
            :error="!Vozac.prezime_vozaca || Vozac.prezime.length === 0"
            error-message="Prezime vozaca je obavezno."
            label="Prezime vozaca"
            v-model="Vozac.prezime_vozaca"
          />
          <q-input
            ref="OIB vozaca"
            :error="!Vozac.oib_vozaca || Vozac.oib_vozaca.length === 0"
            error-message="OIB vozaca je obavezan."
            label="OIB vozaca"
            v-model="Vozac.oib_vozaca"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="cyan-6" label="OK" @click="onOKClick" />
          <q-btn color="cyan-6" label="Cancel" @click="onCancelClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: 'VozacIndex',
  data () {
    return {
      openDialog: false,
      Vozac: null,
      VozacModel: {
        oib_vozaca: null,
        ime_vozaca: null,
        prezime_vozaca: null
      },
      isMounted: false,
      Vozaci: [],
      columns: [
        {
          name: 'oib_vozaca',
          label: 'OIB vozaca',
          align: 'left',
          field: 'oib_vozaca',
          sortable: true
        },
        {
          name: 'ime_vozaca',
          label: 'Ime vozaca',
          align: 'left',
          field: 'ime_vozaca',
          sortable: true
        },
        {
          name: 'prezime_vozaca',
          label: 'Prezime vozaca',
          align: 'left',
          field: 'prezime_vozaca',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'left',
          field: null,
          sortable: false
        }
      ]
    }
  },
  mounted: function () {
    const collectionRef = this.$db.collection('Vozac')
    collectionRef.get().then((rows) => {
      rows.forEach((row) => {
        this.Vozaci.push(row.data())
      })
      this.isMounted = true
    })
  },
  methods: {
    onNewRow () {
      this.Vozac = JSON.parse(JSON.stringify(this.VozacModel))
      this.openDialog = true
    },
    onOKClick () {
      if (
        !this.$refs['Ime vozaca'].hasError
      ) {
        const collectionRef = this.$db.collection('Vozac')
        if (this.Vozac.oib_vozaca === null) {
          collectionRef
            .add(this.Vozac)
            .then((doc) => {
              this.Vozac.oib_vozaca = doc.id
              const docRef = this.$db.collection('Vozac').doc(doc.id)
              docRef
                .update({ oib_vozaca: doc.id })
                .then((response) => {
                  this.Vozac.oib_vozaca = doc.id
                  this.Vozaci.push(this.Vozac)
                  this.openDialog = false
                })
                .catch(function (error) {
                  console.error('Error adding document: ', error)
                })
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        } else {
          const docRef = this.$db.collection('Vozac').doc(this.Vozac.oib_vozaca)
          docRef
            .set(this.Vozac)
            .then((response) => {
              const Vozac = this.Vozaci.find(
                (Vozac) => Vozac.oib_vozaca === this.Vozac.oib_vozaca
              )
              if (Vozac) {
                for (const attributeName in this.Vozac) {
                  Vozac[attributeName] = JSON.parse(
                    JSON.stringify(this.Vozac[attributeName])
                  )
                }
              }
              this.openDialog = false
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
        }
      }
    },
    onCancelClick () {
      this.openDialog = false
    },
    onUpdateRow (Vozac) {
      this.Vozac = JSON.parse(JSON.stringify(this.VozacModel))
      for (const attributeName in this.Vozac) {
        this.Vozac[attributeName] = JSON.parse(
          JSON.stringify(Vozac[attributeName])
        )
      }
      this.openDialog = true
    },
    onDeleteRow (row) {
      this.$q
        .dialog({
          title: 'Delete',
          message: 'Confirm deletion.',
          ok: true,
          cancel: true
        })
        .onOk(() => {
          const docRef = this.$db.collection('Vozac').doc(row.oib_vozaca)
          docRef
            .delete()
            .then(() => {
              const index = this.Vozac.findIndex(
                (Vozac) => Vozac.oib_vozaca === row.oib_vozaca
              )
              if (index >= 0) {
                this.Vozac.splice(index, 1)
              }
            })
            .catch((error) => {
              console.error('Error removing document: ', error)
            })
        })
    }
  }
}
</script>
