export class Model {
    constructor() {
        this.applicants = []; 
    }

    addApplicant(applicant) {
        this.applicants.push(applicant);
    }

    deleteApplicant(index) {
        this.applicants.splice(index, 1);
    }

    filterApplicants({ faculty, search }) {
        return this.applicants.filter(applicant => {
            const matchesFaculty = !faculty || applicant.faculty === faculty;
            const matchesSearch = !search || applicant.fullname.toLowerCase().includes(search.toLowerCase());
            return matchesFaculty && matchesSearch;
        });
    }

    getTotalApplicants() {
        return this.applicants.length;
    }
}
