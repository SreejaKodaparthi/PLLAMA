# 🌱 **PLLaMa – AI-Powered Plant Science Assistant**

> **An intelligent, multimodal AI system for plant science and agriculture**

**PLLaMa (Plant Large Language Model Assistant)** is an **AI-powered web platform** designed to support **plant disease detection, agronomy queries, and agricultural decision-making**.

It integrates a **domain-specific Large Language Model (PLLaMa / LLaMA-2)** with **computer vision (YOLOv8)** to deliver accurate, real-world agricultural insights.

This project extends the **original PLLaMa research paper** into a **fully deployable, multimodal MERN-based application** with **real-time data retrieval** and **multilingual support**.

---

## 🔍 **Project Overview**

*General-purpose LLMs lack accuracy in scientific domains such as agriculture.*

**PLLaMa addresses this gap by:**

- **Fine-tuning _LLaMA-2 (7B Instruct)_** on large-scale plant science literature  
- **Integrating _YOLOv8_** for image-based plant disease detection  
- Providing a **chat-based, user-friendly web interface**  
- Supporting **text, image, and voice-based interaction**

---

## 🎯 **Key Features**

- 🌾 **Plant science-specific question answering**
- 🖼️ **Plant disease detection** using **YOLOv8**
- 💬 **Interactive chatbot** with persistent chat history
- 🎤 **Voice-enabled interaction** (_Speech-to-Text & Text-to-Speech_)
- 🌍 **Multilingual support** for regional accessibility
- ☁️ **Real-time weather and pest data integration**

---

## 🚀 **Tech Stack**

| **Layer** | **Technology** | **Purpose** |
|---------|---------------|------------|
| **Frontend** | React (Vite) | Chatbot UI & image uploads |
| **API Server** | Express.js + MongoDB | Authentication & chat management |
| **AI Service** | FastAPI + YOLOv8 | Plant disease detection |
| **LLM** | PLLaMa / LLaMA-2 (7B) | Plant science Q&A |
| **Database** | MongoDB Atlas | Chat & detection persistence |

---

## 🧠 **System Architecture**

```text
User
 └──▶ React Chatbot (Text / Voice / Image)
        └──▶ Express.js API ───▶ MongoDB
                └──▶ FastAPI (YOLOv8)
                        └──▶ PLLaMa (LLaMA-2)
```

---

## 🧠 **Setup Guide**

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/SreejaKodaparthi/PLLAMA.git
cd PLLAMA
```

---

### 2️⃣ **Backend Setup (Node.js + MongoDB)**
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ALLOWED_ORIGIN=http://localhost:3000
PORT=5000
```

Run the server:
```bash
npm run dev
```

> ✅ Backend runs at **http://localhost:5000**

---

### 3️⃣ **YOLO API Setup (FastAPI)**
```bash
cd backend
python -m venv venv
```

Activate environment:

**Windows**
```bash
venv\Scripts\activate
```

**Mac / Linux**
```bash
source venv/bin/activate
```

Install dependencies and start API:
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

> ✅ YOLO API runs at **http://127.0.0.1:8000**

---

### 4️⃣ **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

> ✅ Frontend runs at **http://localhost:3000**

---

## 🔄 **System Integration**

| **Component** | **URL** |
|--------------|--------|
| **Frontend** | http://localhost:3000 |
| **Express API** | http://localhost:5000 |
| **YOLO FastAPI** | http://127.0.0.1:8000 |

> 📸 Upload a plant image using the **➕ button** in the chatbot to receive:
> - Disease label with confidence score  
> - Annotated output image  
> - Stored chat history in MongoDB  

---

## 📌 **Use Cases**

- 🌿 **Crop disease diagnosis**
- 📊 **Agricultural advisory systems**
- 🔬 **Plant science research assistance**
- 🌍 **Multilingual farming support**

---

## 🧠 **Developer Notes**

- **YOLO weights:** `backend/src/yolo_model/weights/best.pt`
- **Uploads:** `backend/src/uploads/`
- **Results:** `backend/src/results/`
- **MongoDB collection:** `conversations`
- ⚠️ **`.env` files are ignored for security**

---
