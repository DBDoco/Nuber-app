const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var admin = require("firebase-admin");

var serviceAccount = require("./nuber-fb68d-firebase-adminsdk-n0wrz-55aab9c448.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nuber-fb68d.firebaseio.com"
});

const db = admin.firestore();

app.get('/hello', (request, response) => {
  return response.send('Hello world');
});

app.get('/getvozac', (request, response) => {
  let res = []
  if (typeof request.query.id === 'undefined') {
    var cRef = db.collection('Vozac').orderBy('ime_vozaca')
    cRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let document = {
            id: doc.id,
            data: doc.data()
          }
          res.push(document)
        })
        return response.send(res)
      })
      .catch(function (error) {
        return response.send(
          "Error getting documents: " + error
        )
      })
  } else {
    var docRef =
      db.collection('Vozac').doc(request.query.id)
    docRef.get()
      .then((doc) => {
        if (typeof doc.data() !== 'undefined') {
          let document = {
            id: doc.id,
            data: doc.data()
          }
          return response.send(document)
        } else {
          return response.send(
            "Error getting document " +
            request.query.id +
            ": The document is undefined"
          )
        }
      })
      .catch(function (error) {
        return response.send(
          "Error getting document " +
          request.query.id +
          ": " + error
        )
      })
  }
})

app.get('/getvozilo', (request, response) => {
  let res = []
  if (typeof request.query.id === 'undefined') {
    var cRef = db.collection('Vozilo').orderBy('marka_vozila')
    cRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let document = {
            id: doc.id,
            data: doc.data()
          }
          res.push(document)
        })
        return response.send(res)
      })
      .catch(function (error) {
        return response.send(
          "Error getting documents: " + error
        )
      })
  } else {
    var docRef =
      db.collection('Vozilo').doc(request.query.id)
    docRef.get()
      .then((doc) => {
        if (typeof doc.data() !== 'undefined') {
          let document = {
            id: doc.id,
            data: doc.data()
          }
          return response.send(document)
        } else {
          return response.send(
            "Error getting document " +
            request.query.id +
            ": The document is undefined"
          )
        }
      })
      .catch(function (error) {
        return response.send(
          "Error getting document " +
          request.query.id +
          ": " + error
        )
      })
  }
})

app.get('/getcijena', (request, response) => {
  let res = []
  if (typeof request.query.id === 'undefined') {
    var cRef = db.collection('Cijena').orderBy('cijena_po_km')
    cRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let document = {
            id: doc.id,
            data: doc.data()
          }
          res.push(document)
        })
        return response.send(res)
      })
      .catch(function (error) {
        return response.send(
          "Error getting documents: " + error
        )
      })
  } else {
    var docRef =
      db.collection('Cijena').doc(request.query.id)
    docRef.get()
      .then((doc) => {
        if (typeof doc.data() !== 'undefined') {
          let document = {
            id: doc.id,
            data: doc.data()
          }
          return response.send(document)
        } else {
          return response.send(
            "Error getting document " +
            request.query.id +
            ": The document is undefined"
          )
        }
      })
      .catch(function (error) {
        return response.send(
          "Error getting document " +
          request.query.id +
          ": " + error
        )
      })
  }
})

app.get('/getplacanje', (request, response) => {
  let res = []
  if (typeof request.query.id === 'undefined') {
    var cRef = db.collection('Placanje').orderBy('nacin_placanja')
    cRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let document = {
            id: doc.id,
            data: doc.data()
          }
          res.push(document)
        })
        return response.send(res)
      })
      .catch(function (error) {
        return response.send(
          "Error getting documents: " + error
        )
      })
  } else {
    var docRef =
      db.collection('Placanje').doc(request.query.id)
    docRef.get()
      .then((doc) => {
        if (typeof doc.data() !== 'undefined') {
          let document = {
            id: doc.id,
            data: doc.data()
          }
          return response.send(document)
        } else {
          return response.send(
            "Error getting document " +
            request.query.id +
            ": The document is undefined"
          )
        }
      })
      .catch(function (error) {
        return response.send(
          "Error getting document " +
          request.query.id +
          ": " + error
        )
      })
  }
})

app.post('/postvozac', (request, response) => {
  if (Object.keys(request.body).length) {
    db.collection('Vozac').doc().set(request.body)
      .then(function () {
        return response.send(
          "Document successfully written - created!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error writing document: " + error
        )
      })
  } else {
    return response.send(
      "No post data for new document. " +
      "A new document is not created!"
    )
  }
})

app.post('/postcijena', (request, response) => {
  if (Object.keys(request.body).length) {
    db.collection('Cijena').doc().set(request.body)
      .then(function () {
        return response.send(
          "Document successfully written - created!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error writing document: " + error
        )
      })
  } else {
    return response.send(
      "No post data for new document. " +
      "A new document is not created!"
    )
  }
})

app.post('/postplacanje', (request, response) => {
  if (Object.keys(request.body).length) {
    db.collection('Placanje').doc().set(request.body)
      .then(function () {
        return response.send(
          "Document successfully written - created!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error writing document: " + error
        )
      })
  } else {
    return response.send(
      "No post data for new document. " +
      "A new document is not created!"
    )
  }
})

app.post('/postvozilo', (request, response) => {
  if (Object.keys(request.body).length) {
    db.collection('Vozilo').doc().set(request.body)
      .then(function () {
        return response.send(
          "Document successfully written - created!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error writing document: " + error
        )
      })
  } else {
    return response.send(
      "No post data for new document. " +
      "A new document is not created!"
    )
  }
})

app.put('/putvozac', (request, response) => {
  if (Object.keys(request.body).length) {
    if (typeof request.query.id !== 'undefined') {
      db.collection('Vozac')
        .doc(request.query.id)
        .set(request.body)
        .then(function () {
          return response.send(
            "Document successfully written - " +
            "updated!"
          )
        })
        .catch(function (error) {
          return response.send(
            "Error writing document: " + error
          )
        })
    } else {
      return response.send(
        "A parameter id is not set. " +
        "A document is not updated!"
      )
    }
  } else {
    return response.send(
      "No post data for new document. " +
      "A document is not updated!"
    )
  }
})

app.put('/putvozilo', (request, response) => {
  if (Object.keys(request.body).length) {
    if (typeof request.query.id !== 'undefined') {
      db.collection('Vozilo')
        .doc(request.query.id)
        .set(request.body)
        .then(function () {
          return response.send(
            "Document successfully written - " +
            "updated!"
          )
        })
        .catch(function (error) {
          return response.send(
            "Error writing document: " + error
          )
        })
    } else {
      return response.send(
        "A parameter id is not set. " +
        "A document is not updated!"
      )
    }
  } else {
    return response.send(
      "No post data for new document. " +
      "A document is not updated!"
    )
  }
})

app.put('/putplacanje', (request, response) => {
  if (Object.keys(request.body).length) {
    if (typeof request.query.id !== 'undefined') {
      db.collection('Placanje')
        .doc(request.query.id)
        .set(request.body)
        .then(function () {
          return response.send(
            "Document successfully written - " +
            "updated!"
          )
        })
        .catch(function (error) {
          return response.send(
            "Error writing document: " + error
          )
        })
    } else {
      return response.send(
        "A parameter id is not set. " +
        "A document is not updated!"
      )
    }
  } else {
    return response.send(
      "No post data for new document. " +
      "A document is not updated!"
    )
  }
})

app.put('/putcijena', (request, response) => {
  if (Object.keys(request.body).length) {
    if (typeof request.query.id !== 'undefined') {
      db.collection('Cijena')
        .doc(request.query.id)
        .set(request.body)
        .then(function () {
          return response.send(
            "Document successfully written - " +
            "updated!"
          )
        })
        .catch(function (error) {
          return response.send(
            "Error writing document: " + error
          )
        })
    } else {
      return response.send(
        "A parameter id is not set. " +
        "A document is not updated!"
      )
    }
  } else {
    return response.send(
      "No post data for new document. " +
      "A document is not updated!"
    )
  }
})

app.delete('/deletevozac', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
    db.collection('Vozac').doc(request.query.id).delete()
      .then(function () {
        return response.send(
          "Document successfully deleted!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error removing document: " + error
        )
      })
  } else {
    return response.send(
      "A parameter id is not set. " +
      "A document is not deleted!"
    )
  }
})

app.delete('/deletevozilo', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
    db.collection('Vozilo').doc(request.query.id).delete()
      .then(function () {
        return response.send(
          "Document successfully deleted!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error removing document: " + error
        )
      })
  } else {
    return response.send(
      "A parameter id is not set. " +
      "A document is not deleted!"
    )
  }
})

app.delete('/deleteplacanje', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
    db.collection('Placanje').doc(request.query.id).delete()
      .then(function () {
        return response.send(
          "Document successfully deleted!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error removing document: " + error
        )
      })
  } else {
    return response.send(
      "A parameter id is not set. " +
      "A document is not deleted!"
    )
  }
})

app.delete('/deletecijena', (request, response) => {
  if (typeof request.query.id !== 'undefined') {
    db.collection('Cijena').doc(request.query.id).delete()
      .then(function () {
        return response.send(
          "Document successfully deleted!"
        )
      })
      .catch(function (error) {
        return response.send(
          "Error removing document: " + error
        )
      })
  } else {
    return response.send(
      "A parameter id is not set. " +
      "A document is not deleted!"
    )
  }
})



app.listen(3000, () => {
  console.log("Server running on port 3000");
});