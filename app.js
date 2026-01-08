// 🔹 Import Firebase libraries (CDN version)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
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

  await setDoc(doc(db, "users", userCred.user.uid), {
    email: email,
    role: role,
    createdAt: serverTimestamp()
  });

  alert("Signup successful!");
};

// 🔹 LOGIN
window.login = async function () {
  try {
    await signInWithEmailAndPassword(
      auth,
      document.getElementById("email").value,
      document.getElementById("password").value
    );
    alert("Login successful!");
  } catch (error) {
    alert("Login failed: " + error.message);
    console.error(error);
  }
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
      const li = document.createElement("div");
      li.className = "food-item";

      li.innerHTML = `
        <strong>${food.foodType}</strong><br>
        Quantity: ${food.quantity}<br>
        Location: ${food.location}
        <div class="food-actions">
          <button onclick="showMap('${food.location}')">View on Map</button>
          <button class="secondary" onclick="acceptFood('${docSnap.id}')">Accept</button>
        </div>
      `;

      list.appendChild(li);
    }
  });
}
// 🔹 SHOW MAP FOR FOOD LOCATION
window.showMap = function (location) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 18.5204, lng: 73.8567 } // Default Pune
  });

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: location }, (results, status) => {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert("Could not find location on map");
    }
  });
};

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



onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    console.error("User role not found in Firestore");
    return;
  }

  const role = userSnap.data().role;

  if (role === "provider") {
    document.getElementById("providerSection").style.display = "block";
    document.getElementById("ngoSection").style.display = "none";
  }

  if (role === "ngo") {
    document.getElementById("ngoSection").style.display = "block";
    document.getElementById("providerSection").style.display = "none";
    loadFood();
  }
});