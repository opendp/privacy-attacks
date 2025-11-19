document.addEventListener('DOMContentLoaded', function() {
    const expandableCells = document.querySelectorAll('.expandable-authors');

    expandableCells.forEach(cell => {
        const text = cell.textContent.trim();
        const commaIndex = text.indexOf(',');

        if (commaIndex !== -1) { // If there's at least one comma, suggesting multiple authors
            const firstAuthor = text.substring(0, commaIndex).trim();
            const truncatedText = firstAuthor + ' et al.';
            const fullText = text;

            cell.innerHTML = `
                <span class="truncated-text" style="cursor: pointer;">${truncatedText}</span>
                <span class="full-text" style="display: none;">${fullText}</span>
            `;

            const truncatedSpan = cell.querySelector('.truncated-text');
            const fullTextSpan = cell.querySelector('.full-text');

            cell.addEventListener('click', function() {
                if (fullTextSpan.style.display === 'none') {
                    truncatedSpan.style.display = 'none';
                    fullTextSpan.style.display = 'inline';
                } else {
                    truncatedSpan.style.display = 'inline';
                    fullTextSpan.style.display = 'none';
                }
            });
        }
        // If no comma, display the full text as is (no truncation or "et al.")
    });
});