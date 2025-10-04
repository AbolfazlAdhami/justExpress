const output = document.querySelector("#output");
const button = document.querySelector("#get-post-btn");
const form = document.querySelector("#add-post-form");
// Fetch posts
async function showPost() {
  try {
    const res = await fetch("http://localhost:8080/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    const posts = await res.json();
    output.innerHTML = "";
    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.log(error);
  }
}

// Submit a new post
async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get("title");
  try {
    const res = await fetch("http://localhost:8080/api/posts", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Faild to Post New ");

    const newPost = await res.json();
    const postEl = document.createElement("div");
    postEl.textContent = newPost.title;
    output.appendChild(postEl);
    showPost();
  } catch (error) {
    console.error(error);
  }
}

// Event Listner
button.addEventListener("click", showPost);
form.addEventListener("submit", addPost);
