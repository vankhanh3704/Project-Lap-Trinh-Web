function activateLink(event) {
    var links = document.querySelectorAll('.sidebar-menu a');
    links.forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}
// JavaScript xử lý phân trang
document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('tableList');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const itemsPerPage = 5;
    let currentPage = 1;


    // Hàm hiển thị trang
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        rows.forEach((row, index) => {
            row.style.display = (index >= start && index < end) ? '' : 'none';
        });
    }

    // Hàm tạo nút phân trang
    function updatePagination() {
        const totalPages = Math.ceil(rows.length / itemsPerPage);
        const pageNumbers = document.getElementById('pageNumbers');
        pageNumbers.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.className = `page-number ${i === currentPage ? 'active' : ''}`;
            button.textContent = i;
            button.onclick = () => {
                currentPage = i;
                showPage(currentPage);
                updatePagination();
            };
            pageNumbers.appendChild(button);
        }
    }

    // Xử lý nút Previous
    document.getElementById('prevPage').onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePagination();
        }
    };

    // Xử lý nút Next
    document.getElementById('nextPage').onclick = () => {
        const totalPages = Math.ceil(rows.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            updatePagination();
        }
    };

    // Khởi tạo
    showPage(currentPage);
    updatePagination();

    function generatePageNumbers(totalPages, currentPage) {
        const pages = [];
        const maxVisible = 3; // Số trang hiển thị tối đa không bao gồm ...

        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        pages.push(1);

        if (start > 2) pages.push('...');
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages - 1) pages.push('...');

        pages.push(totalPages);

        return pages;
    }

    function updatePagination() {
        const totalPages = Math.ceil(rows.length / itemsPerPage);
        const pageNumbers = document.getElementById('pageNumbers');
        pageNumbers.innerHTML = '';

        const pages = generatePageNumbers(totalPages, currentPage);

        pages.forEach(page => {
            if (page === '...') {
                const span = document.createElement('span');
                span.className = 'ellipsis';
                span.textContent = '...';
                pageNumbers.appendChild(span);
            } else {
                const button = document.createElement('button');
                button.className = `page-number ${page === currentPage ? 'active' : ''}`;
                button.textContent = page;
                button.onclick = () => {
                    currentPage = page;
                    showPage(currentPage);
                    updatePagination();
                };
                pageNumbers.appendChild(button);
            }
        });

        // Update trạng thái nút Previous/Next
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages;
    }
});