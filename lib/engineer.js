const Employee = require('../lib/employee');

class Engineer extends Employee {
    constructor(name, id, email, githubUsername) {
        super(name, id, email, githubUsername);
        this.role = 'Engineer';
        this.githubUsername = githubUsername;
    }
    getGithub() {
        return this.githubUsername;
    }
}

module.exports = Engineer;