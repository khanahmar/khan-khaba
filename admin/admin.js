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

// Read  Data
const querySnapshot = await getDocs(collection(db, "menu"));

let i = 1;
querySnapshot.forEach((doc) => {
  display.innerHTML += `  <tr>
  <th scope="row">${i++}</th>
  <td>${doc.data().img}</td>
  <td>${doc.data().title}</td>
  <td>${doc.data().desc}</td>
  <td>${doc.data().price}</td>
  <td><button  class="btn btn-danger">Delete</button></td>
</tr>
`;
});

const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const imgUrl = document.getElementById("img-url").value;
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const price = document.getElementById("price").value;

  const pizza = {
    imgUrl,
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
  let itmDelt = await deleteDoc(doc(db, "menu", id));
  console.log(itmDelt);
};
