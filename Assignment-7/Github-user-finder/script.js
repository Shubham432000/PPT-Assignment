function getUserData() {
  const username = document.getElementById("username").value.trim();

  if (username === "") {
      alert("Please enter a GitHub username.");
      return;
  }

  fetch(`https://api.github.com/users/${username}`)
      .then(response => {
          if (!response.ok) {
              throw new Error("User not found.");
          }
          return response.json();
      })
      .then(data => {
          displayUserInfo(data);
      })
      .catch(error => {
          alert("Error fetching user data. Please check the username and try again.");
          console.error(error);
      });
}

function displayUserInfo(userData) {
  const avatarElement = document.getElementById("avatar");
  const nameElement = document.getElementById("name");
  const bioElement = document.getElementById("bio");
  const followersElement = document.getElementById("followers");
  const reposElement = document.getElementById("repos");

  avatarElement.src = userData.avatar_url;
  nameElement.textContent = `Name:${userData.name || userData.login}`;
  bioElement.textContent = userData.bio || "No bio available.";
  followersElement.textContent = `Followers: ${userData.followers}`;
  reposElement.textContent = `Public Repositories: ${userData.public_repos}`;
}

