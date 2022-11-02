const display = document.getElementById("display");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbTiEEaGTbAe5O79gwVg2cAwrj9hJBgfE",
  authDomain: "khan-khaba.firebaseapp.com",
  projectId: "khan-khaba",
  storageBucket: "khan-khaba.appspot.com",
  messagingSenderId: "848556442457",
  appId: "1:848556442457:web:70b22612b8b79d4f000248",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get  Data

const q = query(collection(db, "menu"));
onSnapshot(q, (querySnapshot) => {
  let i = 1;
  querySnapshot.forEach((doc) => {
    console.log(doc);
    if (change.type === "added") {
      addingData();
    }
    if (change.type === "modified") {
      console.log("Modified city: ", change.doc.data());
    }
    if (change.type === "removed") {
      console.log("Removed city: ", change.doc.data());
    }
  });
});
const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const img = document.getElementById("img-url").value;
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const price = document.getElementById("price").value;

  const pizza = {
    img,
    title,
    desc,
    price,
  };

  try {
    const docRef = await addDoc(collection(db, "menu"), pizza);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

const deleteItem = async (id) => {
  await deleteDoc(doc(db, "menu", id));
};

display.addEventListener("click", (e) => {
  const delId = e.target.getAttribute("data-delid");
  console.log(
    "🚀 ~ file: admin.js ~ line 77 ~ display.addEventListener ~ delId",
    delId
  );

  if (delId) {
    deleteItem(delId);
  }
});

// Adding data
function addingData() {
  display.innerHTML += `  <tr>
  <th scope="row">${i++}</th>
  <td>${doc.data().img}</td>
  <td>${doc.data().title}</td>
  <td>${doc.data().desc}</td>
  <td>${doc.data().price}</td>
  <td><button data-delid="${doc.id}" class="btn btn-danger">Delete</button></td>
</tr>
`;
}
