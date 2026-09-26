const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
let allStudents = [];

// Fetch student data
async function init() {
  try {
    const response = await fetch("./data/students.json");
    allStudents = await response.json();
    render(allStudents);
  } catch (err) {
    console.error("Failed to load student data:", err);
    grid.innerHTML = `<p>Error loading students. Check console.</p>`;
  }
}

// Render student data as cards
function render(students) {
  grid.innerHTML = students
    .map((s) => {
      const imagePlaceholder =
        "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=";
      const onerror = `this.src='${imagePlaceholder + s.name}'`;
      return `<div class="card">
            <img src="${s.photo}" alt="${s.name}" onerror="${onerror}">
            <div class="card-info">
                <h2>${s.name}</h2>
                <p>Cohort ${s.cohort}</p>
            </div>
        </div>`;
    })
    .join("");
}

// Filter students based on search input
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allStudents.filter((s) =>
    s.name.toLowerCase().includes(term)
  );
  render(filtered);
});

init();
