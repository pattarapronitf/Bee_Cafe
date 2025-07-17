document.addEventListener('DOMContentLoaded', function() {
    
    // --- Page Elements ---
    const loginPage = document.getElementById('login-page');
    const appPage = document.getElementById('app');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');

    // --- Navigation ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-content');

    // --- POS Elements ---
    const menuItems = document.querySelectorAll('.menu-item');
    const orderList = document.getElementById('order-list');
    const totalPriceEl = document.getElementById('total-price');
    let currentTotal = 0;

    // --- Login/Logout Logic ---
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        loginPage.classList.add('hidden');
        appPage.classList.remove('hidden');
    });

    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        appPage.classList.add('hidden');
        loginPage.classList.remove('hidden');
        // Reset POS on logout
        orderList.innerHTML = '';
        currentTotal = 0;
        updateTotalPrice();
    });

    // --- Navigation Logic ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Don't switch page if it's the logout button
            if (this.id === 'logout-btn') return;

            const targetId = this.getAttribute('data-target');
            
            // Toggle active state on nav links
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Toggle active state on pages
            pages.forEach(page => {
                if (page.id === targetId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });

    // --- POS Logic ---
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            
            // Add to order list
            const li = document.createElement('li');
            li.innerHTML = `<span>${name}</span><span>${price.toFixed(2)} ฿</span>`;
            orderList.appendChild(li);

            // Update total
            currentTotal += price;
            updateTotalPrice();
        });
    });

    function updateTotalPrice() {
        totalPriceEl.textContent = `${currentTotal.toFixed(2)} ฿`;
    }

    // --- Chart.js Logic ---
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'line', // Type of chart: line, bar, pie, etc.
        data: {
            labels: ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
            datasets: [{
                label: 'ยอดขาย (บาท)',
                data: [1200, 1900, 3000, 5000, 2300, 4200, 7500],
                backgroundColor: 'rgba(106, 79, 75, 0.2)',
                borderColor: 'rgba(106, 79, 75, 1)',
                borderWidth: 2,
                tension: 0.4, // Makes the line smooth
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

});