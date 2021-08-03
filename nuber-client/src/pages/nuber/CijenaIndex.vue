<template>
  <div class="q-pa-lg row justify-center">
    <div class="col" style="max-width: 500px">
      <q-table
        v-if="isMounted"
        title="Cijene"
        :data="Cijene"
        :columns="columns"
        row-key="cijena_po_km"
        flat
      >
        <template v-slot:top>
          <q-btn color="cyan-6" label="Dodaj cijenu" @click="onNewRow" />
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
          <div class="text-h6">Cijena</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input
            ref="Cijena po km"
            :error="!Cijena.cijena_po_km || Cijena.cijena_po_km.length === 0"
            error-message="Cijena po km je obavezna."
            label="Cijena po km"
            v-model="Cijena.cijena_po_km"
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
  name: 'CijenaIndex',
  data () {
    return {
      openDialog: false,
      Cijena: null,
      CijenaModel: {
        cijena_po_km: null
      },
      isMounted: false,
      Cijene: [],
      columns: [
        {
          name: 'cijena_po_km',
          label: 'Cijena po km',
          align: 'left',
          field: 'cijena_po_km',
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
    const collectionRef = this.$db.collection('Cijena')
    collectionRef.get().then((rows) => {
      rows.forEach((row) => {
        this.Cijene.push(row.data())
      })
      this.isMounted = true
    })
  },
  methods: {
    onNewRow () {
      this.Cijena = JSON.parse(JSON.stringify(this.CijenaModel))
      this.openDialog = true
    },
    onOKClick () {
      if (
        !this.$refs['Cijena po km'].hasError
      ) {
        const collectionRef = this.$db.collection('Cijena')
        if (this.Cijena.cijena_po_km === null) {
          collectionRef
            .add(this.Cijena)
            .then((doc) => {
              this.Cijena.cijena_po_km = doc.id
              const docRef = this.$db.collection('Cijena').doc(doc.id)
              docRef
                .update({ cijena_po_km: doc.id })
                .then((response) => {
                  this.Cijena.cijena_po_km = doc.id
                  this.Cijene.push(this.Cijena)
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
          const docRef = this.$db.collection('Cijena').doc(this.Cijena.cijena_po_km)
          docRef
            .set(this.Cijena)
            .then((response) => {
              const Cijena = this.Cijene.find(
                (Cijena) => Cijena.cijena_po_km === this.Cijena.cijena_po_km
              )
              if (Cijena) {
                for (const attributeName in this.Cijena) {
                  Cijena[attributeName] = JSON.parse(
                    JSON.stringify(this.Cijena[attributeName])
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
    onUpdateRow (Cijena) {
      this.Cijena = JSON.parse(JSON.stringify(this.CijenaModel))
      for (const attributeName in this.Cijena) {
        this.Cijena[attributeName] = JSON.parse(
          JSON.stringify(Cijena[attributeName])
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
          const docRef = this.$db.collection('Cijena').doc(row.cijena_po_km)
          docRef
            .delete()
            .then(() => {
              const index = this.Cijena.findIndex(
                (Cijena) => Cijena.cijena_po_km === row.cijena_po_km
              )
              if (index >= 0) {
                this.Cijena.splice(index, 1)
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
