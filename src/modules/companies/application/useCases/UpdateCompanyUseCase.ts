import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";
import {CreateCompanyDTO} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {Company} from "@/src/modules/companies/domain/entities/Company";

export interface UpdateCompanyDTO extends CreateCompanyDTO {
    id: string;
}

export interface UpdateCompanyResponse {
    company: Company;
    isUpdated: boolean;
    message: string;
}

export class UpdateCompanyUseCase {
    constructor(private companyRepository: ICompanyRepository) {}

    async execute(command: UpdateCompanyDTO) {
        const response = await this.companyRepository.update(command);

        if (!response.isUpdated) {
            throw new Error(`Could not update company: ${response.message}`);
        }
        return response;
    }
}