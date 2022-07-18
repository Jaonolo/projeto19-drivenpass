import * as employeeRepository from "../repositories/employeeRepository.js"

export const get = async (id: number, companyId: number) => {

    const employee = await employeeRepository.findById(id);
    
    if(!employee) throw "Erro!";
    if(employee.companyId !== companyId) throw "Erro!";

    return employee
}