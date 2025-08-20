// script.js
const githubUsername = 'myname31'; // ganti dengan username GitHub asli

document.querySelector('.github-link').href = `https://github.com/${githubUsername}`;

async function fetchGitHubStats() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}`);
    if (!response.ok) throw new Error('GitHub user not found');
    
    const data = await response.json();

    document.getElementById('repo-count').textContent = data.public_repos;
    document.getElementById('followers').textContent = data.followers;
    document.getElementById('following').textContent = data.following;

    const reposResponse = await fetch(data.repos_url);
    const repos = await reposResponse.json();

    const totalStars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
    document.getElementById('stars').textContent = totalStars;

  } catch (error) {
    console.error('Error fetching GitHub data:', error);

    document.querySelectorAll('.stat-number').forEach(el => el.textContent = '?');

    const link = document.querySelector('.github-link');
    link.textContent = 'GitHub profile not found';
    link.href = '#';
    link.style.color = 'red';
  }
}

// langsung panggil
fetchGitHubStats();
