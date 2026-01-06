// 🔹 Import Firebase libraries (CDN version)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 Firebase configuration (CLEAN & CORRECT)
const firebaseConfig = {
  apiKey: "AIzaSyAlKrJ_ZoXUoJ-GrEszhVR-Jkg3HZAQq-s",
  authDomain: "foodwastengo.firebaseapp.com",
  projectId: "foodwastengo",
  storageBucket: "foodwastengo.appspot.com",
  messagingSenderId: "510790574584",
  appId: "1:510790574584:web:9306a6a21f69f2b7ac360d"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 CONFIRM FILE IS RUNNING
console.log("app.js loaded successfully");

// 🔹 SIGN UP
window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await addDoc(collection(db, "users"), {
    uid: userCred.user.uid,
    email: email,
    role: role,
    createdAt: serverTimestamp()
  });

  alert("Signup successful!");
};

// 🔹 LOGIN
window.login = async function () {
  await signInWithEmailAndPassword(
    auth,
    document.getElementById("email").value,
    document.getElementById("password").value
  );
  alert("Login successful!");
  loadFood();
};

// 🔹 ADD FOOD
window.addFood = async function () {
  console.log("Add Food button clicked");

  const user = auth.currentUser;
  console.log("Current user:", user);

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    await addDoc(collection(db, "foods"), {
      providerId: user.uid,
      foodType: document.getElementById("foodType").value,
      quantity: document.getElementById("quantity").value,
      location: document.getElementById("location").value,
      expiryTime: document.getElementById("expiry").value,
      status: "available",
      postedAt: serverTimestamp()
    });

    console.log("Food document added to Firestore");
    alert("Food added successfully!");
  } catch (error) {
    console.error("Error adding food:", error);
    alert("Error adding food. Check console.");
  }
};

// 🔹 LOAD FOOD (NGO)
async function loadFood() {
  const list = document.getElementById("foodList");
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "foods"));
  snapshot.forEach(docSnap => {
    const food = docSnap.data();

    if (food.status === "available") {
      const li = document.createElement("li");
      li.innerHTML = `
        ${food.foodType} (${food.quantity}) - ${food.location}
        <button onclick="acceptFood('${docSnap.id}')">Accept</button>
      `;
      list.appendChild(li);
    }
  });
}

// 🔹 ACCEPT FOOD
window.acceptFood = async function (id) {
  const ref = doc(db, "foods", id);

  await updateDoc(ref, {
    status: "accepted",
    acceptedBy: auth.currentUser.uid
  });

  alert("Food accepted!");
  loadFood();
};
import { onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    loadFood();
  }
});