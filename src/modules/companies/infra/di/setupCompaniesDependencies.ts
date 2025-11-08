import {CompanyApiRepository} from "@/src/modules/companies/infra/api/CompanyApiRepository";
import {companyDependencies} from "@/src/modules/companies/infra/di/container";
import {GetCompaniesUseCase} from "@/src/modules/companies/application/useCases/GetCompaniesUseCase";
import {CreateCompanyUseCase} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {UpdateCompanyUseCase} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";
import {DeleteCompanyUseCase} from "@/src/modules/companies/application/useCases/DeleteCompanyUseCase";

export function setupCompaniesDependencies() {
    // 1. Register infrastructure (repositories)
    const companyRepository = new CompanyApiRepository()
    companyDependencies.registerSingleton("CompanyApiRepository", companyRepository);

    // 2. Register use cases with their dependencies
    companyDependencies.register(
        "GetCompaniesUseCase",
        () => new GetCompaniesUseCase(companyRepository)
    );
    companyDependencies.register(
        "CreateCompanyUseCase",
        () => new CreateCompanyUseCase(companyRepository)
    );
    companyDependencies.register(
        "UpdateCompanyUseCase",
        () => new UpdateCompanyUseCase(companyRepository)
    );
    companyDependencies.register(
        "DeleteCompanyUseCase",
        () => new DeleteCompanyUseCase(companyRepository)
    );
}