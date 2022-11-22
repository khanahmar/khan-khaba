const display = document.getElementById("display");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  updateDoc,
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
      editItem(change.doc);
    }
    if (change.type === "removed") {
      delData(change.doc.id);
    }
  });
});

// Form to add item

const form = document.getElementById("form");
const img = document.getElementById("img-url");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const price = document.getElementById("price");
const submitBtn = document.getElementById("submit");
const itemId = document.getElementById("item-id");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = itemId.value;
  const pizza = {
    img: img.value,
    title: title.value,
    desc: desc.value,
    price: price.value,
  };
  if (id) {
    updateData(id, pizza);
  } else {
    addData(pizza);
  }
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
      await getDoc(doc(db, "menu", e.target.dataset.id))
        .then((item) => {
          itemId.value = item.id;
          img.value = item.data().img;
          title.value = item.data().title;
          desc.value = item.data().desc;
          price.value = item.data().price;
          submitBtn.classList.add("btn-success");
          submitBtn.innerHTML = "Update";
        })
        .catch((err) => console.log(err));
    });
  });
};

// Updating Data
const updateData = async (id, pizza) => {
  await updateDoc(doc(db, "menu", id), pizza)
    .then((item) => console.log(item))
    .catch((err) => console.log(err));
};

// Deleting data
const delData = (id) => {
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    if (item.dataset.id === id) {
      item.remove();
    }
  });
};

const editItem = (item) => {
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((row) => {
    if (row.dataset.id === item.id) {
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
    }
  });
};
