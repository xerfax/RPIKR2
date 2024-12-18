import { Model } from './model.js';
import { View } from './view.js';

export class Presenter {
    constructor() {
        this.model = new Model();
        this.view = new View();

        this.view.bindAddApplicant(this.handleAddApplicant.bind(this));
        this.view.bindDeleteApplicant(this.handleDeleteApplicant.bind(this));
        this.view.bindFilter(this.handleFilter.bind(this));

        this.updateView();
    }

    handleAddApplicant(applicant) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{10,15}$/;

        if (!applicant.fullname || !emailRegex.test(applicant.email) || !phoneRegex.test(applicant.phone) || !applicant.faculty) {
            alert('Некорректные данные. Проверьте правильность заполнения всех полей.');
            return;
        }

        this.model.addApplicant(applicant);
        this.updateView();
    }

    handleDeleteApplicant(index) {
        this.model.deleteApplicant(index);
        this.updateView();
    }

    handleFilter() {
        const filters = this.view.getFilters();
        const filteredApplicants = this.model.filterApplicants(filters);
        this.view.renderApplicants(filteredApplicants);
    }

    updateView() {
        const applicants = this.model.applicants;
        this.view.renderApplicants(applicants);
        this.view.updateTotalApplicants(this.model.getTotalApplicants());
    }
}
