import {Company} from "@/src/modules/companies/domain/entities/Company";
import {CreateCompanyCommand, CreateCompanyResponse} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {
    UpdateCompanyCommand,
    UpdateCompanyResponse
} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";
import {
    DeleteCompanyCommand,
    DeleteCompanyResponse
} from "@/src/modules/companies/application/useCases/DeleteCompanyUseCase";

export interface ICompanyRepository {
    getAll(): Promise<Company[]>;
    create(command: CreateCompanyCommand): Promise<CreateCompanyResponse>;
    update(command: UpdateCompanyCommand): Promise<UpdateCompanyResponse>;
    deleteCompany(command: DeleteCompanyCommand): Promise<DeleteCompanyResponse>;

}
