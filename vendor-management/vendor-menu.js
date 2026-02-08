document.addEventListener('DOMContentLoaded', function() {
    // Navigation highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Highlight active nav item
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'vendor-menu.html') {
            link.style.background = '#0066cc';
            link.style.color = 'white';
            link.style.borderColor = '#0066cc';
        }
        
        link.addEventListener('click', function() {
            // Reset all nav links
            navLinks.forEach(l => {
                l.style.background = '#f0f0f0';
                l.style.color = '#333';
                l.style.borderColor = '#ccc';
            });
            
            // Highlight clicked link
            this.style.background = '#0066cc';
            this.style.color = 'white';
            this.style.borderColor = '#0066cc';
        });
    });
    
    // DOM Elements for remove modal
    const removeModal = document.getElementById('removeModal');
    const removeSuccess = document.getElementById('removeSuccess');
    const closeRemoveModalBtn = document.querySelector('.close-remove-modal');
    const cancelRemoveBtn = document.getElementById('cancelRemove');
    const confirmRemoveBtn = document.getElementById('confirmRemove');
    const closeRemoveSuccessBtn = document.getElementById('closeRemoveSuccess');
    const itemNameDisplay = document.getElementById('itemNameDisplay');
    const itemPriceDisplay = document.getElementById('itemPriceDisplay');
    const removedItemNameDisplay = document.getElementById('removedItemName');
    
    // Variables to store current item being removed
    let currentRemoveButton = null;
    let currentItemName = '';
    let currentItemPrice = '';
    
    // Open remove confirmation modal
    function openRemoveModal(removeButton) {
        currentRemoveButton = removeButton;
        currentItemName = removeButton.getAttribute('data-item-name');
        currentItemPrice = removeButton.getAttribute('data-item-price');
        
        // Set modal content
        itemNameDisplay.textContent = currentItemName;
        itemPriceDisplay.textContent = currentItemPrice;
        
        // Show modal
        removeModal.classList.add('show');
    }
    
    // Close remove modal
    function closeRemoveModal() {
        removeModal.classList.remove('show');
        // Reset variables
        currentRemoveButton = null;
        currentItemName = '';
        currentItemPrice = '';
    }
    
    // Confirm removal (no actual removal, just show success)
    function confirmRemoval() {
        // Update success message
        removedItemNameDisplay.textContent = currentItemName;
        
        // Close modal and show success message
        closeRemoveModal();
        removeSuccess.classList.add('show');
        
        console.log(`Item "${currentItemName}" would be removed here.`);
        console.log(`For demo: No actual removal from DOM, just showing success message.`);
    }
    
    // Close success message
    function closeRemoveSuccess() {
        removeSuccess.classList.remove('show');
    }
    
    // Event Listeners for remove buttons
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            openRemoveModal(this);
        });
    });
    
    // Add New Item Card
    const addItemCard = document.querySelector('.add-item-card');
    if (addItemCard) {
        addItemCard.addEventListener('click', function() {
        });
    }
    
    // Change Image buttons
    const changeImageButtons = document.querySelectorAll('.change-image-btn');
    changeImageButtons.forEach(button => {
        button.addEventListener('click', function() {
        });
    });
    
    // Event Listeners for modal controls
    closeRemoveModalBtn.addEventListener('click', closeRemoveModal);
    cancelRemoveBtn.addEventListener('click', closeRemoveModal);
    confirmRemoveBtn.addEventListener('click', confirmRemoval);
    closeRemoveSuccessBtn.addEventListener('click', closeRemoveSuccess);
    
    // Close modal when clicking outside
    removeModal.addEventListener('click', function(e) {
        if (e.target === removeModal) {
            closeRemoveModal();
        }
    });
    
    // Close success when clicking outside
    removeSuccess.addEventListener('click', function(e) {
        if (e.target === removeSuccess) {
            closeRemoveSuccess();
        }
    });
});