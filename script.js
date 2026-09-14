// GitHub API configuration
const GITHUB_USERNAME = 'vishrut-vanga';
const GITHUB_API = 'https://api.github.com';

// Projects to display (excluding learning exercises and forks)
const FEATURED_REPOS = [
    'BasketBall-Analysis-Project',
    'CollegeCompletionandEmploymentAnalysisClassProject',
    'AI-Project-3',
    'men_basketball_project',
    'GuessingGame',
    'weather_app',
    'trading_bot',
    'Out-Of-Frying-Pan-And-Into-Fryer',
    'pizzerianov1',
    'sql_covid_project',
    'transportation-data-science-project',
    'ProbabilisticLeakDetectors'
];

// Fetch repositories from GitHub API
async function fetchRepositories() {
    try {
        const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=100`);
        const repos = await response.json();
        
        // Filter to only show featured repos
        const filteredRepos = repos.filter(repo => FEATURED_REPOS.includes(repo.name));
        
        // Sort by stars
        filteredRepos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
        
        displayProjects(filteredRepos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        displayErrorMessage();
    }
}

// Display projects in the grid
function displayProjects(repos) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    
    repos.forEach(repo => {
        const card = createProjectCard(repo);
        container.appendChild(card);
    });
}

// Create a project card element
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const title = repo.name.replace(/-/g, ' ');
    const description = repo.description || 'No description available';
    const language = repo.language || 'Other';
    const stars = repo.stargazers_count || 0;
    const starsText = stars > 0 ? ` · ${stars} ⭐` : '';
    
    card.innerHTML = `
        <h3>${title}</h3>
        <p class="project-description">${description}</p>
        <span class="project-language">${language}</span>
        <a href="${repo.html_url}" target="_blank" class="project-link">View on GitHub →</a>
    `;
    
    return card;
}

// Display error message if API fails
function displayErrorMessage() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #999;">Unable to load projects. Please visit my GitHub profile directly.</p>';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchRepositories();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});