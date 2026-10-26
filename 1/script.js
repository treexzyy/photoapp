// --- 1. БАГАТОСТОРІНКОВА НАВІГАЦІЯ (SPA ROUTING) ---
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page-section');

    function navigateTo(pageId) {
        // Ховаємо всі сторінки
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Знаходимо та показуємо потрібну сторінку
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Оновлюємо активне посилання у шапці
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else if (link.classList.contains('nav-link')) {
                link.classList.remove('active');
            }
        });

        // Прокручуємо до верху сторінки
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Обробка кліків по всіх посиланнях з атрибутом data-page
    document.addEventListener('click', (e) => {
        const targetLink = e.target.closest('[data-page]');
        if (targetLink) {
            e.preventDefault();
            const pageId = targetLink.getAttribute('data-page');
            navigateTo(pageId);
        }
    });

    // --- 2. СЛАЙДЕР ПОРІВНЯННЯ ДО / ПІСЛЯ (PHOTOAPP PAGE) ---
    const sliderRange = document.getElementById('sliderRange');
    const imgBeforeWrapper = document.querySelector('.img-before-wrapper');
    const sliderBtn = document.getElementById('sliderBtn');

    if (sliderRange && imgBeforeWrapper && sliderBtn) {
        sliderRange.addEventListener('input', (e) => {
            const value = e.target.value;
            imgBeforeWrapper.style.width = `${value}%`;
            sliderBtn.style.left = `${value}%`;
        });
    }

    // --- 3. ФІЛЬТРАЦІЯ ГАЛЕРЕЇ (DESIGN PAGE) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Прибираємо клас active з усіх кнопок
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});