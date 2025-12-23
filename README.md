🌱 PLLaMa – AI-Powered Plant Science Assistant

PLLaMa (Plant Large Language Model Assistant) is an AI-powered web platform for plant science and agriculture, integrating a domain-specific Large Language Model (PLLaMa / LLaMA-2) with computer vision (YOLOv8) to support plant disease analysis, agronomy queries, and agricultural decision-making.

The system extends the original PLLaMa research paper into a fully deployable, multimodal MERN-based application with real-time data retrieval and multilingual support.
.

🔍 Project Overview

General-purpose LLMs lack domain accuracy for scientific fields such as agriculture.
PLLaMa addresses this by:

Fine-tuning LLaMa-2 (7B Instruct) on large-scale plant science literature

Integrating YOLOv8 for image-based plant disease detection

Providing a chat-based, user-friendly web interface
🎯 Key Features

🌾 Plant science–specific question answering

🖼️ Plant disease detection using YOLOv8

💬 Interactive chatbot with persistent chat history

🎤 Voice-enabled interaction (STT & TTS)

🌍 Multilingual support for regional accessibility

☁️ Real-time weather and pest data integration
🚀 Tech Stack
Layer	Technology	Purpose
Frontend	React (Vite)	Chatbot UI & image uploads
API Server	Express.js + MongoDB	Authentication, chat management
AI Service	FastAPI + YOLOv8	Plant disease detection
LLM	PLLaMa / LLaMA-2 7B	Plant science QA
Database	MongoDB Atlas	Chat & detection persistence
🧠 Setup Guide
1️⃣ Clone Repository
git clone https://github.com/SreejaKodaparthi/PLLAMA.git
cd PLLAMA

2️⃣ Backend Setup (Node.js + MongoDB)
cd backend
npm install


Create .env:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ALLOWED_ORIGIN=http://localhost:3000
PORT=5000


Run server:

npm run dev

3️⃣ YOLO API Setup (FastAPI)
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
# or source venv/bin/activate (Mac/Linux)

pip install -r requirements.txt
uvicorn main:app --reload


Runs at: http://127.0.0.1:8000

4️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Runs at: http://localhost:3000

🔄 System Integration
Component	URL
Frontend	http://localhost:3000

Express API	http://localhost:5000

YOLO FastAPI	http://127.0.0.1:8000
📌 Use Cases

Crop disease diagnosis

Agricultural advisory systems

Plant science research assistance

Multilingual farming support
