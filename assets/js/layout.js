
function toggleMobileSidebar() {
    const sidebar = document.querySelector('.docs-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('visible');
        document.body.classList.toggle('sidebar-open');
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector('.docs-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
}

window.toggleMobileSidebar = toggleMobileSidebar;
window.toggleSidebar = toggleSidebar;
