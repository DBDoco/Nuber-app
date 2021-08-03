<template>
  <div class="q-pa-lg row justify-center">
    <div class="col" style="max-width: 500px">
      <q-table
        v-if="isMounted"
        title="Placanja"
        :data="Placanja"
        :columns="columns"
        row-key="nacin_placanja"
        flat
      >
        <template v-slot:top>
          <q-btn color="cyan-6" label="Dodaj nacin placanja" @click="onNewRow" />
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
          <div class="text-h6">Placanje</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Nacin placanja"
            :error="!Placanje.nacin_placanja || Placanje.nacin_placanja.length === 0"
            error-message="Nacin placanja je obavezan."
            label="Nacin placanja"
            v-model="Placanje.nacin_placanja"
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
  name: 'PlacanjeIndex',
  data () {
    return {
      openDialog: false,
      Placanje: null,
      PlacanjeModel: {
        nacin_placanja: null
      },
      isMounted: false,
      Placanja: [],
      columns: [
        {
          name: 'nacin_placanja',
          label: 'Nacin placanja',
          align: 'left',
          field: 'nacin_placanja',
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
    const collectionRef = this.$db.collection('Placanje')
    collectionRef.get().then((rows) => {
      rows.forEach((row) => {
        this.Placanja.push(row.data())
      })
      this.isMounted = true
    })
  },
  methods: {
    onNewRow () {
      this.Placanje = JSON.parse(JSON.stringify(this.PlacanjeModel))
      this.openDialog = true
    },
    onOKClick () {
      if (
        !this.$refs['Nacin placanja'].hasError
      ) {
        const collectionRef = this.$db.collection('Placanje')
        if (this.Placanje.nacin_placanja === null) {
          collectionRef
            .add(this.Placanje)
            .then((doc) => {
              this.Placanje.nacin_placanja = doc.id
              const docRef = this.$db.collection('Placanje').doc(doc.id)
              docRef
                .update({ nacin_placanja: doc.id })
                .then((response) => {
                  this.Placanje.nacin_placanja = doc.id
                  this.Placanja.push(this.Placanje)
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
          const docRef = this.$db.collection('Placanje').doc(this.Placanje.nacin_placanja)
          docRef
            .set(this.Placanje)
            .then((response) => {
              const Placanje = this.Placanja.find(
                (Placanje) => Placanje.nacin_placanja === this.Placanje.nacin_placanja
              )
              if (Placanje) {
                for (const attributeName in this.Placanje) {
                  Placanje[attributeName] = JSON.parse(
                    JSON.stringify(this.Placanje[attributeName])
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
    onUpdateRow (Placanje) {
      this.Placanje = JSON.parse(JSON.stringify(this.PlacanjeModel))
      for (const attributeName in this.Placanje) {
        this.Placanje[attributeName] = JSON.parse(
          JSON.stringify(Placanje[attributeName])
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
          const docRef = this.$db.collection('Placanje').doc(row.nacin_placanja)
          docRef
            .delete()
            .then(() => {
              const index = this.Placanje.findIndex(
                (Placanje) => Placanje.nacin_placanja === row.nacin_placanja
              )
              if (index >= 0) {
                this.Placanje.splice(index, 1)
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
