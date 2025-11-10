import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";
import {Company} from "@/src/modules/companies/domain/entities/Company";

export type CreateCompanyDTO = Omit<Company, "id">

export type CreateCompanyResponse = {
    company: Company;
    isSaved: boolean;
    message: string;
}

export class CreateCompanyUseCase {
    constructor(private companyRepository: ICompanyRepository) {}

    async execute(command: CreateCompanyDTO) {
        const response = await this.companyRepository.create(command)

        if(!response.isSaved) {
            throw new Error(`Could not create company: ${response.message}`);
        }
        return response;
    }
}