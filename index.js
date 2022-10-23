// Capturing id's
let display = document.getElementById("h1");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
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
querySnapshot.forEach((doc) => {
  // console.log(`${doc.id} => ${doc.data()}`);

  display.innerHTML += ` 
  <div class="col-md-3">
  <div id="card" class="card mt-3 card-set">
    <img
      src=${doc.data().img}
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${doc.data().title}</h5>
      <p class="card-text">${doc.data().detail}</p>
    </div>
    <div class="card-footer d-grid">
      <a href="#" class="btn btn-set">Add <span class="float-end">Rs.${
        doc.data().price
      }</span></a>
    </div>
  </div>
</div>
`;
});
