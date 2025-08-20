// script.js
// GitHub username - change this to your username
const githubUsername = 'myname31'; 

// Update the GitHub link
document.querySelector('.github-link').href = `https://github.com/${githubUsername}`;

// Fetch GitHub stats
async function fetchGitHubStats() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}`);
    if (!response.ok) {
      throw new Error('GitHub user not found');
    }
    
    const data = await response.json();
    
    // Update the stats
    document.getElementById('repo-count').textContent = data.public_repos;
    document.getElementById('followers').textContent = data.followers;
    document.getElementById('following').textContent = data.following;
    
    // For total stars, we need to fetch all repos
    const reposResponse = await fetch(data.repos_url);
    const repos = await reposResponse.json();
    
    const totalStars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
    document.getElementById('stars').textContent = totalStars;
    
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    
    // Show error message in the stats
    const statElements = document.querySelectorAll('.stat-number');
    statElements.forEach(el => {
      el.textContent = '?';
    });
    
    // Update the link text to show error
    const link = document.querySelector('.github-link');
    link.textContent = 'GitHub profile not found';
    link.href = '#';
    link.style.color = 'red';
  }
}

// Only attempt to fetch if the username is changed from the placeholder
if (githubUsername !== 'myname31') {
  fetchGitHubStats();
} else {
  // Show instructions if using placeholder
  const statElements = document.querySelectorAll('.stat-number');
  statElements.forEach(el => {
    el.textContent = '?';
  });
  
  const link = document.querySelector('.github-link');
  link.textContent = 'Set your GitHub username in the code';
}