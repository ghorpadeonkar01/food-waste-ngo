# 🍽️ Food Waste to NGO Connector  

> A real-time platform that connects surplus food providers with NGOs to reduce food wastage and fight hunger.

🔗 **Live Demo:** (https://foodwastengo.web.app)  
🏆 **Hackathon Project | Powered by Firebase & Google Maps**

---

## 🚨 Problem  

Every day, tons of perfectly edible food are wasted by restaurants, hostels, events, and households, while NGOs struggle to source food on time for people in need.

### Key Challenges
- No real-time visibility of surplus food  
- Poor coordination between food providers and NGOs  
- No location-based discovery of food donations  

---

## 💡 Solution  

**Food Waste to NGO Connector** is a web application that:

- Allows food providers to post surplus food details  
- Enables NGOs to view and accept food in real time  
- Shows food pickup locations on Google Maps  
- Uses role-based access for a clean user experience  

The platform ensures faster food redistribution and reduced food wastage.

---

## ✨ Key Features  

### 🔐 Authentication & Roles
- Firebase Authentication (Email & Password)
- Roles:
  - Food Provider
  - NGO

### 🧑‍🍳 Food Provider
- Add leftover food details:
  - Food type
  - Quantity
  - Location
  - Expiry time
- Data stored securely in Firestore

### 🏥 NGO
- View available food in real time  
- Accept food donations  
- View food locations on Google Maps  

### 🗺️ Google Maps Integration
- Interactive map with markers
- Easy food pickup navigation

### ☁️ Cloud Backend
- Firebase Firestore
- Firebase Hosting

---

## 🛠️ Tech Stack  

| Technology | Usage |
|----------|------|
| HTML, CSS, JavaScript | Frontend |
| Firebase Authentication | User management |
| Firebase Firestore | Database |
| Firebase Hosting | Deployment |
| Google Maps JavaScript API | Location services |

---

## 🏗️ Project Structure  

food-waste-ngo/
├── index.html
├── style.css
├── app.js
├── firebase.json
├── screenshots/
└── README.md
---

## 📸 Screenshots  

### 🔐 Login / Signup
![Login](screenshots/login.png)

### 🧑‍🍳 Food Provider Dashboard
![Provider](screenshots/provider.png)

### 🏥 NGO Dashboard
![NGO](screenshots/ngo.png)

### 🗺️ Food Location Map
![Map](screenshots/map.png)

---

## 🚀 How It Works  

1. User signs up as Provider or NGO  
2. Role is stored in Firestore  
3. UI changes based on role  
4. Providers add food  
5. NGOs view and accept food  
6. Location shown via Google Maps  
7. App hosted on Firebase  

---

## 🎯 Impact  

- Reduces food wastage  
- Improves NGO response time  
- Encourages community food sharing  
- Promotes sustainability  

---

## 🔮 Future Enhancements  

- AI-based food expiry suggestions  
- Push notifications  
- Auto-location detection  
- Progressive Web App (PWA)  
- Admin analytics dashboard  

---

## 👨‍💻 Developer  

**Onkar Ghorpade**  
IT Engineering Student  

GitHub: https://github.com/ghorpadeonkar01  

---

## 🏆 Hackathon Highlights  

- Real-world problem solving  
- Scalable cloud architecture  
- Role-based UI  
- Google API integration  

⭐ If you like this project, please star the repository!