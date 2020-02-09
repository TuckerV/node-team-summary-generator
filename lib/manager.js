const Employee = require('../lib/employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = 'Manager';
    }
    getOfficeNumber(){
        // console.log(this.officeNumber);
        return this.officeNumber;
    }
}

module.exports = Manager;