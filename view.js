export class View {
    constructor() {
        this.totalApplicants = document.getElementById('total-applicants');
        this.applicantForm = document.getElementById('applicant-form');
        this.applicantsContainer = document.getElementById('applicants-container');
        this.facultyFilter = document.getElementById('faculty-filter');
        this.searchInput = document.getElementById('search-input');
    }

    renderApplicants(applicants) {
        this.applicantsContainer.innerHTML = ''; 
        applicants.forEach((applicant, index) => {
            const card = document.createElement('div');
            card.className = 'applicant-card';
            card.innerHTML = `
                <div>
                    <p>ФИО: <strong>${applicant.fullname}</strong><br> </p>
                    <p>Email: ${applicant.email}</p>
                    <p>Телефон: ${applicant.phone}</p>
                    <p>Факультет: ${applicant.faculty}</p>
                </div>
                <button class="delete-btn" data-index="${index}">Удалить</button>
            `;
            this.applicantsContainer.appendChild(card);
        });
    }

    updateTotalApplicants(total) {
        this.totalApplicants.textContent = total;
    }

    bindAddApplicant(handler) {
        this.applicantForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const applicant = {
                fullname: document.getElementById('fullname').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                faculty: document.getElementById('faculty').value.trim(),
            };
            handler(applicant);
            this.applicantForm.reset();
        });
    }

    bindDeleteApplicant(handler) {
        this.applicantsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const index = event.target.dataset.index;
                handler(index);
            }
        });
    }

    bindFilter(handler) {
        this.facultyFilter.addEventListener('change', () => {
            handler();
        });
        this.searchInput.addEventListener('input', () => {
            handler();
        });
    }

    getFilters() {
        return {
            faculty: this.facultyFilter.value,
            search: this.searchInput.value.trim(),
        };
    }
}
