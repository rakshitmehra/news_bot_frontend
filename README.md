This project is a **full-stack chatbot** that answers queries over a news corpus using a **Retrieval-Augmented Generation (RAG)** pipeline with the **Google Gemini API**.  
It was built as part of an assignment for the **Full Stack Developer role at Voosh**.

---

## ✨ Features
- Ingests ~50 news articles (RSS feed or scraped HTML)
- Embeds text using Jina Embeddings (or other open-source embeddings)
- Stores embeddings in a vector database (Chroma, Qdrant, or FAISS)
- Retrieves top-k results and generates answers with **Gemini API**
- Session-based chat:
  - New session for each user
  - Chat history stored in Redis
  - Reset session option
- Frontend with **React + SCSS**
- Backend with **Node.js (Express) + Redis**

---

## Features
- Simple chat screen with messages
- Input box to send queries
- Reset session button
- Clean SCSS styling

---

## Tech Stack
- React
- SCSS
- Axios (for API calls)

---

## Setup Instructions

1. Clone the repo
```bash
git clone https://github.com/your-username/frontend-rag-chatbot.git
cd frontend-rag-chatbot
npm install
npm start
