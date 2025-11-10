import {Company} from "@/src/modules/companies/domain/entities/Company";
import {CreateCompanyDTO, CreateCompanyResponse} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {
    UpdateCompanyDTO,
    UpdateCompanyResponse
} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";
import {
    DeleteCompanyDTO,
    DeleteCompanyResponse
} from "@/src/modules/companies/application/useCases/DeleteCompanyUseCase";

export interface ICompanyRepository {
    getAll(): Promise<Company[]>;
    create(command: CreateCompanyDTO): Promise<CreateCompanyResponse>;
    update(command: UpdateCompanyDTO): Promise<UpdateCompanyResponse>;
    deleteCompany(command: DeleteCompanyDTO): Promise<DeleteCompanyResponse>;
}
