const display = document.getElementById("display");

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
onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      displayData(change.doc);
    }
    if (change.type === "modified") {
      console.log("Modified city: ", change.doc.data());
    }
    if (change.type === "removed") {
      delData(change.doc.id);
    }
  });
});

// Form to add item
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
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
  addData(pizza);
  form.reset();
});

// Add data
const addData = async (pizza) => {
  await addDoc(collection(db, "menu"), pizza)
    .then((doc) => console.log("data added"))
    .catch((err) => console.log(err));
};

// Display data
let i = 1;
const displayData = async (item) => {
  display.innerHTML += `  <tr class="menu-item" data-id=${item.id}>
    <th scope="row">${i++}</th>
    <td>${item.data().img}</td>
    <td>${item.data().title}</td>
    <td>${item.data().desc}</td>
    <td>${item.data().price}</td>
    <td class="d-flex">
    <button data-id=${item.id} class="btn btn-danger del-btn">Delete</button>
    <button data-id=${
      item.id
    } class="btn btn-primary update-btn">Update</button>
    </td>
  </tr>
  `;
  // Delete function
  const delBtns = document.querySelectorAll(".del-btn");
  delBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      await deleteDoc(doc(db, "menu", e.target.dataset.id))
        .then(() => console.log("data deleted"))
        .catch((err) => console.log(err));
    });
  });

  // Update function
  const upBtns = document.querySelectorAll(".update-btn");
  upBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      console.log(e.target.dataset.id);
    });
  });
};

const delData = (id) => {
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    if (item.dataset.id === id) {
      item.remove();
    }
  });
};
