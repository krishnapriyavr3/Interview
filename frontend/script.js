// Adjust API base URL if backend runs on another port
const API_BASE = "http://localhost:5000/api/auth";

// Register
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (res.ok) {
    alert("Registered successfully!");
    window.location.href = "login.html";
  } else {
    alert("Registration failed!");
  }
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed!");
  }
});

// Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
// Fetch and display users
async function loadUsers() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You need to log in first!");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/users`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (res.ok) {
      const users = await res.json();
      const userTable = document.getElementById("userTable");
      userTable.innerHTML = "";

      users.forEach(user => {
        const row = `
          <tr class="hover:bg-gray-100">
            <td class="px-6 py-3">${user.name}</td>
            <td class="px-6 py-3">${user.email}</td>
            <td class="px-6 py-3">${user.role || "User"}</td>
          </tr>
        `;
        userTable.innerHTML += row;
      });
    } else {
      alert("Failed to load users!");
    }
  } catch (err) {
    console.error(err);
    alert("Error fetching data!");
  }
}

// Run on table.html load
if (window.location.pathname.includes("table.html")) {
  loadUsers();
}
// Practice Questions
const sampleQuestions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "What are your strengths and weaknesses?",
  "Describe a challenging situation and how you handled it.",
  "Where do you see yourself in 5 years?",
  "Explain a project you worked on recently."
];

function loadQuestion() {
  const questionText = document.getElementById("questionText");
  if (questionText) {
    const random = Math.floor(Math.random() * sampleQuestions.length);
    questionText.textContent = sampleQuestions[random];
  }
}

// Resume Builder
document.getElementById("resumeForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const resumeHTML = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: auto; padding: 20px;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0;">${document.getElementById("name").value}</h1>
        <p style="margin: 4px 0;">${document.getElementById("address").value}</p>
        <p style="margin: 4px 0;">${document.getElementById("phone").value} | ${document.getElementById("email").value}</p>
      </div>

      <!-- Summary -->
      <p><strong>${document.getElementById("summary").value}</strong></p>

      <!-- Sections -->
      <h2 style="margin-top: 20px; border-bottom: 2px solid #444;">Education</h2>
      <p>${document.getElementById("education").value.replace(/\n/g, "<br>")}</p>

      <h2 style="margin-top: 20px; border-bottom: 2px solid #444;">Technical Skills</h2>
      <p>${document.getElementById("skills").value.replace(/\n/g, "<br>")}</p>

      <h2 style="margin-top: 20px; border-bottom: 2px solid #444;">Internships</h2>
      <p>${document.getElementById("internships").value.replace(/\n/g, "<br>")}</p>

      <h2 style="margin-top: 20px; border-bottom: 2px solid #444;">Academic Projects</h2>
      <p>${document.getElementById("projects").value.replace(/\n/g, "<br>")}</p>

      <h2 style="margin-top: 20px; border-bottom: 2px solid #444;">Trainings & Workshops</h2>
      <p>${document.getElementById("trainings").value.replace(/\n/g, "<br>")}</p>

      <h2 style="margin-top: 20px; border-bottom: 2px solid #444;">Achievements</h2>
      <p>${document.getElementById("achievements").value.replace(/\n/g, "<br>")}</p>

      <h2 style="margin-top: 20px; border-bottom: 2px solid #444;">Extra-curricular Activities</h2>
      <p>${document.getElementById("activities").value.replace(/\n/g, "<br>")}</p>
    </div>
  `;

  const newWindow = window.open();
  newWindow.document.write(`
    <html>
    <head><title>Resume</title></head>
    <body>${resumeHTML}</body>
    </html>
  `);
  newWindow.document.close();
  newWindow.print(); // lets user download as PDF
});

// Fetch random question (with optional category filter)
async function fetchQuestion() {
  const category = document.getElementById("category")?.value || "";
  let url = "http://localhost:5000/api/questions/random";
  if (category) url += `?category=${encodeURIComponent(category)}`;

  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      document.getElementById("questionText").textContent = data?.text || "No questions found.";
      document.getElementById("answerInput").value = "";
      document.getElementById("reviewSection").classList.add("hidden");
    } else {
      document.getElementById("questionText").textContent = "Failed to load question.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("questionText").textContent = "Error fetching question.";
  }
}

// Submit answer (just shows review for now)
function submitAnswer() {
  const answer = document.getElementById("answerInput").value.trim();
  if (!answer) {
    alert("Please type an answer first!");
    return;
  }
  document.getElementById("answerReview").textContent = answer;
  document.getElementById("reviewSection").classList.remove("hidden");
}

// Load all questions
async function loadQuestions() {
  try {
    const res = await fetch("http://localhost:5000/api/questions");
    if (res.ok) {
      const data = await res.json();
      const table = document.getElementById("questionTable");
      table.innerHTML = "";
      data.forEach(q => {
        table.innerHTML += `
          <tr class="border-b">
            <td class="px-6 py-3">${q.text}</td>
            <td class="px-6 py-3">
              <button onclick="deleteQuestion('${q._id}')" class="bg-red-500 text-white px-3 py-1 rounded-lg">Delete</button>
            </td>
          </tr>
        `;
      });
    }
  } catch (err) {
    console.error(err);
  }
}

// Add new question
document.getElementById("addQuestionForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("questionTextInput").value;
  if (!text) return;
  await fetch("http://localhost:5000/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  document.getElementById("questionTextInput").value = "";
  loadQuestions();
});

// Delete question
async function deleteQuestion(id) {
  await fetch(`http://localhost:5000/api/questions/${id}`, { method: "DELETE" });
  loadQuestions();
}

// Run only on questions.html
if (window.location.pathname.includes("questions.html")) {
  loadQuestions();
}

