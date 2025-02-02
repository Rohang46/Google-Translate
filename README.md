# FAQ System API

## 📌 Overview
This is a simple FAQ API that allows users to retrieve frequently asked questions in different languages. It uses **MongoDB** for data storage, **Redis** for caching, and is built using **Express.js**.

## 🚀 Features
- Retrieve FAQs in different languages (English, Hindi, Bengali, etc.)
- Caching using Redis to improve performance
- RESTful API architecture

---

## 📦 Installation & Setup

### 1️⃣ Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/faq-system-api.git
cd faq-system-api
```

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/faqDB
REDIS_URL=redis://localhost:6379
```

### 5️⃣ Start the Server
```sh
npm start
```
The server will be running on: `http://localhost:8000`

---

## 📖 API Usage

### 🔹 Get FAQs
**Endpoint:** `GET /api/faqs`

#### Query Parameters:
| Parameter | Type   | Description |
|-----------|--------|-------------|
| `lang`    | String | Language code (default: `en`) |

#### Example Request:
```sh
curl -X GET "http://localhost:8000/api/faqs?lang=bn"
```

#### Example Response:
```json
[
  { "question": "এটি কী?", "answer": "এটি একটি FAQ সিস্টেম।" }
]
```

---

## 💡 Contributing
1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature-name`)
3. **Commit** changes (`git commit -m "Added new feature"`)
4. **Push** to the branch (`git push origin feature-name`)
5. **Submit** a Pull Request 🚀

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

