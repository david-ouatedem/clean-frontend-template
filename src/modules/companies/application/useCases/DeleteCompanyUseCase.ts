import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";

export interface DeleteCompanyDTO {
    companyId: string;
}

export interface DeleteCompanyResponse {
    isDeleted: boolean;
    message: string;
}

export class DeleteCompanyUseCase {
    constructor(private companyRepository: ICompanyRepository) {}

    async execute(command: DeleteCompanyDTO){
        const response = await this.companyRepository.deleteCompany(command);

        if (!response.isDeleted) {
            throw new Error(`Could not delete company: ${response.message}`)
        }
        return response;
    }
}