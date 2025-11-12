/*
 * This script adds search functionality to the 'attacks-table'.
 * It listens to the 'search-filter' input and filters rows
 * based on the 'Title' (1st column) and 'Authors' (2nd column).
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Get the search input and table rows
    const searchInput = document.getElementById('search-filter');
    const tableRows = document.querySelectorAll('.attack-row');

    // Make sure the elements exist before adding listeners
    if (searchInput && tableRows.length > 0) {
        
        // 2. Add an event listener for when the user types
        searchInput.addEventListener('input', function() {
            const searchText = searchInput.value.toLowerCase();

            // 3. Loop through every table row
            tableRows.forEach(function(row) {
                
                // 4. Get the text from the Title and Authors cells
                // (Change these if your columns move)
                const titleCell = row.querySelector('td:nth-child(1)');
                const authorsCell = row.querySelector('td:nth-child(2)');

                // Get the text, making sure the cells exist
                const titleText = titleCell ? titleCell.textContent.toLowerCase() : '';
                const authorsText = authorsCell ? authorsCell.textContent.toLowerCase() : '';

                // 5. Check if search text is in EITHER the title OR the authors
                const isMatch = titleText.includes(searchText) || authorsText.includes(searchText);

                // 6. Show or hide the row
                if (isMatch) {
                    row.style.display = ''; // Show the row
                } else {
                    row.style.display = 'none'; // Hide the row
                }
            });
        });
    }
});