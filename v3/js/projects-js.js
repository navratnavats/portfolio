/**
 * Projects Page JavaScript
 * Handles GitHub API integration and project card animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Fetch latest GitHub projects
    fetchGithubProjects();
});

/**
 * Fetch latest projects from GitHub API
 */
function fetchGithubProjects() {
    // GitHub username
    const username = 'navratnavats';
    
    // This is a placeholder function
    // In a real implementation, you would use the GitHub API
    console.log(`Would fetch latest projects for GitHub user: ${username}`);
    
    // Example of GitHub API call (commented out)
    /*
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
        .then(response => {
            if (!response.ok) {
                throw new Error('GitHub API request failed');
            }
            return response.json();
        })
        .then(data => {
            // Process and display the repos
            updateProjectCards(data);
        })
        .catch(error => {
            console.error('Error fetching GitHub projects:', error);
        });
    */
}

/**
 * Update project cards with GitHub data
 * @param {Array} repos - Array of repository objects from GitHub API
 */
function updateProjectCards(repos) {
    // Implementation would go here
    // This would replace or update the hardcoded project cards with live data
}