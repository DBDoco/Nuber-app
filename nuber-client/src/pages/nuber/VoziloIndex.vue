<template>
  <div class="q-pa-lg row justify-center">
    <div class="col" style="max-width: 500px">
      <q-table
        v-if="isMounted"
        title="Vozila"
        :data="Vozila"
        :columns="columns"
        row-key="registarska_oznaka"
        flat
      >
        <template v-slot:top>
          <q-btn color="cyan-6" label="Dodaj vozilo" @click="onNewRow" />
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
          <div class="text-h6">Vozilo</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Marka vozila"
            :error="!Vozilo.marka_vozila || Vozilo.marka_vozila.length === 0"
            error-message="Marka vozila je obavezna."
            label="Marka vozila"
            v-model="Vozilo.marka_vozila"
          />
          <q-input
            ref="Model vozila"
            :error="!Vozilo.model_vozila || Vozilo.model_vozila.length === 0"
            error-message="Model vozila je obavezna."
            label="Model vozila"
            v-model="Vozilo.model_vozila"
          />
          <q-input
            ref="Registarska oznaka"
            :error="!Vozilo.registarska_oznaka || Vozilo.registarska_oznaka.length === 0"
            error-message="Registarska oznaka je obavezna"
            label="Registarska oznaka"
            v-model="Vozila.registarska_oznaka"
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
  name: 'VoziloIndex',
  data () {
    return {
      openDialog: false,
      Vozilo: null,
      VoziloModel: {
        registarska_oznaka: null,
        marka_vozila: null,
        model_vozila: null
      },
      isMounted: false,
      Vozila: [],
      columns: [
        {
          name: 'registarska_oznaka',
          label: 'Registarska oznaka',
          align: 'left',
          field: 'registarska_oznaka',
          sortable: true
        },
        {
          name: 'model_vozila',
          label: 'Model vozila',
          align: 'left',
          field: 'model_vozila',
          sortable: true
        },
        {
          name: 'marka_vozila',
          label: 'marka vozila',
          align: 'left',
          field: 'marka_vozila',
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
    const collectionRef = this.$db.collection('Vozilo')
    collectionRef.get().then((rows) => {
      rows.forEach((row) => {
        this.Vozila.push(row.data())
      })
      this.isMounted = true
    })
  },
  methods: {
    onNewRow () {
      this.Vozilo = JSON.parse(JSON.stringify(this.VoziloModel))
      this.openDialog = true
    },
    onOKClick () {
      if (
        !this.$refs['Marka vozila'].hasError
      ) {
        const collectionRef = this.$db.collection('Vozilo')
        if (this.Vozilo.registarska_oznaka === null) {
          collectionRef
            .add(this.Vozilo)
            .then((doc) => {
              this.Vozilo.registarska_oznaka = doc.id
              const docRef = this.$db.collection('Vozilo').doc(doc.id)
              docRef
                .update({ registarska_oznaka: doc.id })
                .then((response) => {
                  this.Vozilo.registarska_oznaka = doc.id
                  this.Vozila.push(this.Vozilo)
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
          const docRef = this.$db.collection('Vozilo').doc(this.Vozilo.registarska_oznaka)
          docRef
            .set(this.Vozilo)
            .then((response) => {
              const Vozilo = this.Vozila.find(
                (Vozilo) => Vozilo.registarska_oznaka === this.Vozilo.registarska_oznaka
              )
              if (Vozilo) {
                for (const attributeName in this.Vozilo) {
                  Vozilo[attributeName] = JSON.parse(
                    JSON.stringify(this.Vozilo[attributeName])
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
    onUpdateRow (Vozilo) {
      this.Vozilo = JSON.parse(JSON.stringify(this.VoziloModel))
      for (const attributeName in this.Vozilo) {
        this.Vozilo[attributeName] = JSON.parse(
          JSON.stringify(Vozilo[attributeName])
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
          const docRef = this.$db.collection('Vozilo').doc(row.registarska_oznaka)
          docRef
            .delete()
            .then(() => {
              const index = this.Vozila.findIndex(
                (Vozilo) => Vozilo.registarska_oznaka === row.registarska_oznaka
              )
              if (index >= 0) {
                this.Vozila.splice(index, 1)
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
