const admin = require("./node_modules/firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const data = require("./book.json");
const collectionKey = "books"; //name of the collection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-firebase-todo-app-d287a.firebaseio.com",
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

if (data && typeof data === "object") {
  Object.keys(data).forEach((No) => {
    firestore
      .collection(collectionKey)
      .doc()
      .set(data[No])
      .then((res) => {
        console.log("Document " + No + " successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}
