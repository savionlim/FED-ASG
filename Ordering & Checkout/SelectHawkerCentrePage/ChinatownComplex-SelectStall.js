function goToMenu(stallId) {
    window.location.href = '../FoodItem Page/TianTianChickenRice.html?stall=' + stallId;
}

// Filter stalls by category
function filterStalls(category) {
    const stalls = document.querySelectorAll('.stall-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter stalls
    stalls.forEach(stall => {
        if (category === 'all' || stall.dataset.category === category) {
            stall.style.display = 'block';
        } else {
            stall.style.display = 'none';
        }
    });
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('searchBox');
    
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const stalls = document.querySelectorAll('.stall-card');
            
            stalls.forEach(stall => {
                const stallName = stall.querySelector('h3').textContent.toLowerCase();
                const cuisineType = stall.querySelector('.cuisine-type').textContent.toLowerCase();
                
                if (stallName.includes(searchTerm) || cuisineType.includes(searchTerm)) {
                    stall.style.display = 'block';
                } else {
                    stall.style.display = 'none';
                }
            });
        });
    }
});