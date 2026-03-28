const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");
const clearAllBtn = document.getElementById("clearAllBtn");
const totalGoals = document.getElementById("totalGoals");
const completedGoals = document.getElementById("completedGoals");
const streakDays = document.getElementById("streakDays");
const journalInput = document.getElementById("journalInput");
const saveJournalBtn = document.getElementById("saveJournalBtn");
const savedMessage = document.getElementById("savedMessage");
const currentDate = document.getElementById("currentDate");

const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupBtn = document.getElementById("signupBtn");
const signupMessage = document.getElementById("signupMessage");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const loginMessage = document.getElementById("loginMessage");

const welcomeUser = document.getElementById("welcomeUser");
const logoutBtn = document.getElementById("logoutBtn");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileTotalGoals = document.getElementById("profileTotalGoals");
const profileCompletedGoals = document.getElementById("profileCompletedGoals");
const profileJournalStatus = document.getElementById("profileJournalStatus");

const summaryTotalGoals = document.getElementById("summaryTotalGoals");
const summaryCompletedGoals = document.getElementById("summaryCompletedGoals");
const summaryPendingGoals = document.getElementById("summaryPendingGoals");
const summaryStreakDays = document.getElementById("summaryStreakDays");


const editName = document.getElementById("editName");
const editPassword = document.getElementById("editPassword");
const updateProfileBtn = document.getElementById("updateProfileBtn");
const updateProfileMessage = document.getElementById("updateProfileMessage");


const API_BASE_URL = "https://lifeos-web-bk4z.onrender.com";

let goals = [];
let journal = "";

let savedUser = null;
let isLoggedIn = localStorage.getItem("isLoggedIn");
try {
  savedUser = JSON.parse(localStorage.getItem("currentUser"));
} catch (error) {
  savedUser = null;
}

const token = localStorage.getItem("token");


if (!savedUser) {
  localStorage.removeItem("currentUser");
  if (isLoggedIn === "true") {
    localStorage.removeItem("isLoggedIn");
    isLoggedIn = "false";
  }
}

let userGoalsKey = "";
let userJournalKey = "";

const currentPath = window.location.pathname;
const authPages = ["/login.html", "/signup.html"];
if (authPages.some(page => currentPath.endsWith(page)) && isLoggedIn === "true") {
  window.location.href = "dashboard.html";
}

if (savedUser) {
  userGoalsKey = `goals_${savedUser.email}`;
  userJournalKey = `journal_${savedUser.email}`;
}

const needsAuth = goalInput || journalInput || profileName || welcomeUser;
if (needsAuth && isLoggedIn !== "true") {
  window.location.href = "login.html";
}

if (currentDate) {
  const today = new Date();
  currentDate.textContent = today.toDateString();
}

if (savedUser) {
  journal = "";
}


if (welcomeUser && savedUser && isLoggedIn === "true") {
  welcomeUser.textContent = `Welcome, ${savedUser.name}`;
}


if (profileName && profileEmail && savedUser && isLoggedIn === "true") {
  fetchProfileFromBackend();
}



if (welcomeUser && isLoggedIn !== "true") {
  window.location.href = "login.html";
}

if (profileName && isLoggedIn !== "true") {
  window.location.href = "login.html";
}


function saveGoals() {
  if (userGoalsKey) {
    localStorage.setItem(userGoalsKey, JSON.stringify(goals));
  }
}

async function fetchGoalsFromBackend() {
  try {
    if (!savedUser || !savedUser.email || !token) return;

    const response = await fetch(`${API_BASE_URL}/api/goals/${savedUser.email}`, {
      headers: {
        Authorization: `Bearer ${token}`

      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message || "Failed to fetch goals");
      return;
    }

    goals = data;
    renderGoals();
  } catch (error) {
    console.error("Error fetching goals:", error);
  }
}




function updateProgress() {
  const total = goals.length;
  const completed = goals.filter(goal => goal.completed).length;
  const pending = total - completed;

  if (totalGoals) totalGoals.textContent = total;
  if (completedGoals) completedGoals.textContent = completed;

  if (summaryTotalGoals) summaryTotalGoals.textContent = total;
  if (summaryCompletedGoals) summaryCompletedGoals.textContent = completed;
  if (summaryPendingGoals) summaryPendingGoals.textContent = pending;

  if (profileTotalGoals) profileTotalGoals.textContent = total;
  if (profileCompletedGoals) profileCompletedGoals.textContent = completed;
}

function renderGoals() {
  if (!goalList) return;

  goalList.innerHTML = "";

  if (goals.length === 0) {
    goalList.innerHTML = "<li>No goals added yet.</li>";
    updateProgress();
    return;
  }

  goals.forEach((goal) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = goal.text;
    span.classList.add("goal-text");

    if (goal.completed) {
      span.classList.add("completed");
    }

    const actions = document.createElement("div");
    actions.classList.add("goal-actions");

    const completeBtn = document.createElement("button");
completeBtn.textContent = goal.completed ? "Undo" : "Complete";
completeBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/goals/${goal._id}`, {
      method: "PUT",
      headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
},
      body: JSON.stringify({
        completed: !goal.completed
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update goal.");
      return;
    }

    fetchGoalsFromBackend();
  } catch (error) {
    alert("Server error while updating goal.");
  }
});

    const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/goals/${goal._id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete goal.");
      return;
    }

    fetchGoalsFromBackend();
  } catch (error) {
    alert("Server error while deleting goal.");
  }
});
    
  async function fetchJournalFromBackend() {
  try {
    if (!savedUser || !savedUser.email || !journalInput || !token) return;

    const response = await fetch(`${API_BASE_URL}/api/journal/${savedUser.email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message || "Failed to fetch journal");
      return;
    }

    journal = data.content || "";
    journalInput.value = journal;
  } catch (error) {
    console.error("Error fetching journal:", error);
  }
}  

    async function fetchProfileFromBackend() {
  try {
    if (!savedUser || !savedUser.email || !token) return;

    const response = await fetch(`${API_BASE_URL}/api/profile/${savedUser.email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message || "Failed to fetch profile");
      return;
    }

    if (profileName) profileName.textContent = data.name;
    if (profileEmail) profileEmail.textContent = data.email;
    if (profileTotalGoals) profileTotalGoals.textContent = data.totalGoals;
    if (profileCompletedGoals) profileCompletedGoals.textContent = data.completedGoals;
    if (profileJournalStatus) profileJournalStatus.textContent = data.journalStatus;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}
    
    

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    goalList.appendChild(li);
  });

  updateProgress();
}

if (addGoalBtn) {
  addGoalBtn.addEventListener("click", async () => {
    const text = goalInput.value.trim();

    if (text === "") {
      alert("Please enter a goal.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/goals`, {
        method: "POST",
        headers: {
       "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
        body: JSON.stringify({
          userEmail: savedUser.email,
          text: text
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add goal.");
        return;
      }

      goalInput.value = "";
      fetchGoalsFromBackend();
    } catch (error) {
      alert("Server error while adding goal.");
    }
  });
}

if (goalInput) {
  goalInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addGoalBtn.click();
    }
  });
}

if (savedUser) {
  journal = "";
}

function loadJournal() {
  if (journalInput) {
    fetchJournalFromBackend();
  }
}

if (clearAllBtn) {
  clearAllBtn.addEventListener("click", async () => {
    const confirmDelete = confirm("Are you sure you want to delete all goals?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/user/${savedUser.email}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete all goals.");
        return;
      }

      fetchGoalsFromBackend();
      alert(data.message);
    } catch (error) {
      alert("Server error while deleting all goals.");
    }
  });
}

if (streakDays || summaryStreakDays) {
  let streak = localStorage.getItem("streak") || 1;

  if (streakDays) streakDays.textContent = streak;
  if (summaryStreakDays) summaryStreakDays.textContent = streak;
}

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();

    if (name === "" || email === "" || password === "") {
      signupMessage.textContent = "Please fill all fields.";
      signupMessage.style.color = "red";
      return;
    }

    if (!email.includes("@")) {
      signupMessage.textContent = "Enter a valid email.";
      signupMessage.style.color = "red";
      return;
    }

    if (password.length < 6) {
      signupMessage.textContent = "Password must be at least 6 characters.";
      signupMessage.style.color = "red";
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        signupMessage.textContent = data.message;
        signupMessage.style.color = "red";
        return;
      }

      signupMessage.textContent = data.message;
      signupMessage.style.color = "green";

      console.log(data);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      signupName.value = "";
      signupEmail.value = "";
      signupPassword.value = "";

      window.location.href = "dashboard.html";
    } catch (error) {
      signupMessage.textContent = "Server error. Please try again.";
      signupMessage.style.color = "red";
      console.error(error);
    }
  });
}


if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (email === "" || password === "") {
      loginMessage.textContent = "Please fill all fields.";
      loginMessage.style.color = "red";
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        loginMessage.textContent = data.message;
        loginMessage.style.color = "red";
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      loginMessage.textContent = data.message;
      loginMessage.style.color = "green";

      window.location.href = "dashboard.html";
    } catch (error) {
      loginMessage.textContent = "Server error. Please try again.";
      loginMessage.style.color = "red";
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
}

if (updateProfileBtn) {
  updateProfileBtn.addEventListener("click", () => {
    const newName = editName.value.trim();
    const newPassword = editPassword.value.trim();

    if (newName === "" && newPassword === "") {
      updateProfileMessage.textContent = "Enter at least one field to update.";
      updateProfileMessage.style.color = "red";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map(user => {
      if (savedUser && user.email === savedUser.email) {
        return {
          ...user,
          name: newName !== "" ? newName : user.name,
          password: newPassword !== "" ? newPassword : user.password
        };
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedCurrentUser = updatedUsers.find(
      user => savedUser && user.email === savedUser.email
    );

    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    updateProfileMessage.textContent = "Profile updated successfully.";
    updateProfileMessage.style.color = "green";

    if (welcomeUser) welcomeUser.textContent = `Welcome, ${updatedCurrentUser.name}`;
    fetchProfileFromBackend();

    editName.value = "";
    editPassword.value = "";
  });
}

if (goalList && savedUser && isLoggedIn === "true") {
  fetchGoalsFromBackend();
}

if (profileName && savedUser && isLoggedIn === "true") {
  fetchProfileFromBackend();
}

loadJournal();




if (streakDays) {
  let streak = localStorage.getItem("streak") || 1;
  streakDays.textContent = streak;
}