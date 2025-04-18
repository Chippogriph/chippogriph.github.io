document.addEventListener("DOMContentLoaded", () => {
  const pageId = document.body.id;

  if (pageId === "workout-diary") {
    document
      .querySelectorAll(".delete-btn")
      .forEach((button) => button.addEventListener("click", deletePost));
    document
      .querySelectorAll(".edit-btn")
      .forEach((button) => button.addEventListener("click", editPost));
    handlePosts();
  } else if (pageId === "home") {
    setupMobileMenu();
  }
});

function setupMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuItems = document.querySelectorAll("#mobile-menu li");

  function toggleMenu() {
    mobileMenu.classList.toggle("hidden");
    hamburgerIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  }

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }

  hamburgerBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  mobileMenu.addEventListener("click", (event) => {
    if (!event.target.closest("li")) {
      closeMenu();
    }
  });

  window.addEventListener("click", (event) => {
    if (
      !hamburgerBtn.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

let posts = []; // Gör posts globalt

function handlePosts() {
  const form = document.querySelector("form");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const postList = document.querySelector("#posts ul");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const date = new Date().toLocaleDateString();

    if (!title || !content) {
      alert("Fyll i både titel och innehåll!");
      return;
    }

    posts.push({ title, content, date });
    renderPosts();

    titleInput.value = "";
    contentInput.value = "";
  });

  renderPosts(); // Anropa direkt för att visa "Inga inlägg finns"
}

function renderPosts() {
  const postList = document.querySelector("#posts ul");
  postList.innerHTML = ""; // Rensa listan

  if (posts.length === 0) {
    postList.innerHTML =
      "<p class='text-gray-500 text-center'>Inga inlägg finns</p>";
    return;
  }

  posts.forEach((post, index) => {
    const li = document.createElement("li");
    li.className = "border-b p-4";

    li.innerHTML = `
      <article class="flex flex-col">
        <div class="flex">
          <p class="text-lg font-bold flex-1">${post.title}</p>
          <p class="text-gray-700 text-lg flex-1">${post.date}</p>
          <div class="space-x-6">
            <i class="fa-solid fa-pen-to-square edit-btn cursor-pointer" data-index="${index}"></i>
            <i class="fa-solid fa-trash-can delete-btn cursor-pointer" data-index="${index}"></i>
          </div>
        </div>
        <div class="flex-1 py-4">
          <p class="text-gray-700">${post.content}</p>
        </div>
      </article>
    `;

    postList.appendChild(li);
  });

  addEventListeners();

  // Lägg till event-lyssnare för redigering och radering
  function addEventListeners() {
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        editPost(index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        deletePost(index);
      });
    });
  }

  // Funktion för att redigera ett inlägg
  function editPost(index) {
    const post = posts[index];

    // Skapa redigeringsformulär direkt i DOM
    const li = postList.children[index];
    li.innerHTML = `
        <div class="mb-2">
        <form>
        <label for="title" class="font-medium">Titel:</label>
          <input type="text" class="edit-title w-full border border-gray-300 rounded p-2 mb-2" name="title" value="${post.title}">

          <label for="content" class="font-medium">Innehåll:</label>
          <textarea name="content" class="edit-content w-full border border-gray-300 rounded p-2 mt-2">${post.content}</textarea>
        </form>
        </div>
        <div>
          <button class="save-btn bg-signatureGreen text-white px-4 py-2 rounded">Spara</button>
          <button class="cancel-btn bg-gray-800 text-white px-4 py-2 rounded">Avbryt</button>
        </div>
      `;

    li.querySelector(".save-btn").addEventListener("click", () => {
      const newTitle = li.querySelector(".edit-title").value.trim();
      const newContent = li.querySelector(".edit-content").value.trim();

      if (!newTitle || !newContent) {
        alert("Fyll i både titel och innehåll!");
        return;
      }

      // Uppdatera inlägget i arrayen
      posts[index] = { ...posts[index], title: newTitle, content: newContent };

      // Rendera om inläggslistan
      renderPosts();
    });

    li.querySelector(".cancel-btn").addEventListener("click", () => {
      // Återställ till originalinlägg om redigering avbryts
      renderPosts();
    });
  }

  // Funktion för att ta bort ett inlägg
  function deletePost(index) {
    if (confirm("Är du säker på att du vill radera detta inlägg?")) {
      posts.splice(index, 1); // Ta bort från arrayen
      renderPosts(); // Rendera om
    }
  }
}
