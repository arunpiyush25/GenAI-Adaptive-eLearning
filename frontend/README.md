# 🎓 GenAI-Driven Personalized Learning System using Bloom’s Taxonomy

A full-stack AI-based learning platform that leverages **LLMs (via Gemini API)**, **Bloom’s Taxonomy**, and **backend-engineered prompt transformation** to simulate the behavior of an intelligent tutoring system. This solution addresses a critical challenge in education: adapting instructional content to the learner’s evolving cognitive stage — without relying on static datasets or predefined curriculums.

## 💡 Problem Statement

In modern educational systems, personalized learning is largely limited to superficial recommendation engines or rigid adaptive quizzes. There is a lack of **cognitively-aware content generation systems** that can dynamically adjust content **based on how the learner thinks**. This project explores how **Generative AI** can bridge that gap through:
- **Real-time Bloom-level classification of learner queries**
- **Semantic prompt transformation to scaffold learning complexity**
- **Visual feedback to track cognitive development over time**

## 🧠 Conceptual Framework

The platform is grounded in **Bloom’s Taxonomy**, a pedagogical framework classifying cognitive tasks into six hierarchical levels:  
`Remember → Understand → Apply → Analyze → Evaluate → Create`

Using this, the system:
- Classifies incoming learner prompts to determine their **current cognitive engagement**
- Reconstructs the prompt using prompt engineering to elevate or fine-tune the **cognitive demand**
- Generates adaptive educational content using **LLMs (Gemini API)**

## 🏗️ System Architecture

- **Frontend (Angular)**: Provides a reactive dashboard where users can input prompts and visualize Bloom-level feedback.
- **Backend (Node.js + Express)**:
  - Performs semantic analysis and classification of prompts.
  - Crafts optimized instructions using Bloom-aligned **meta-prompts**.
  - Interfaces with Gemini API to fetch intelligent and personalized responses.
- **No database or persistence layer**: Stateless architecture focused on real-time adaptation.

## 🔁 Workflow

1. User submits a query (e.g., *“What is backpropagation?”*)
2. Backend invokes Gemini API to classify the prompt’s **Bloom level** (e.g., *Understand*)
3. System transforms the prompt to raise complexity (e.g., *“Compare backpropagation and gradient descent with examples”*)
4. Gemini generates enhanced content aligned with the desired cognitive level
5. The frontend displays:
   - The Bloom level trajectory
   - The modified prompt and AI response
   - Visual analytics on learning progression

## 🛠️ Tech Stack

| Layer       | Tech Used               |
|-------------|-------------------------|
| Frontend    | Angular, TypeScript     |
| Backend     | Node.js, Express.js     |
| LLM Engine  | Gemini API (Google)     |
| DevOps      | None (local prototype)  |
| Database    | None (stateless design) |

## 🔍 Key Features

- 🎯 **Cognitive-Aware Prompt Engineering**: Backend-driven dynamic prompt rewriting tailored to learner’s cognitive level.
- 🧠 **Semantic Classification**: Uses Gemini’s understanding to categorize prompts into Bloom’s levels with high accuracy.
- 📊 **Real-Time Feedback Loop**: Angular dashboard presents a timeline of the learner's cognitive growth.
- ⚡ **Stateless and Lightweight**: No database dependencies; low latency and deployable as a microservice.

## 📈 Impact

- Enables **truly personalized learning** at cognitive level — beyond surface-level personalization.
- Reduces **content irrelevance** by tailoring both topic and complexity to learner intent.
- Simulates a **one-on-one tutor** interaction model using LLMs.

## 🧪 Sample Use Case

```plaintext
User Input: "Explain recursion"

→ Gemini Classifies Bloom's Level: Understand

→ Backend Modifies to (with the help of LLM): "Compare recursion and iteration with real-world use cases" 

→ Gemini Generates: Analytical-level response with contextual depth

