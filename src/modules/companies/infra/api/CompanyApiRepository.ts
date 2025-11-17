import {HttpClient} from "@/src/shared/infrastructure/http/HttpClient";
import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";
import {CreateCompanyDTO} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {Company} from "@/src/modules/companies/domain/entities/Company";
import {UpdateCompanyDTO, UpdateCompanyResponse} from "../../application/useCases/UpdateCompanyUseCase";
import {DeleteCompanyDTO, DeleteCompanyResponse} from "../../application/useCases/DeleteCompanyUseCase";
import {companiesApiRoutes} from "@/src/modules/companies/infra/api-routes/companiesApiRoutes";
import {UpdateCompanyApiResponse} from "@/src/modules/companies/infra/api-responses/UpdateCompanyApiResponse";
import {CompanyFactory} from "@/src/modules/companies/infra/factory/CompanyFactory";
import {GetCompaniesApiResponse} from "@/src/modules/companies/infra/api-responses/GetCompaniesApiResponse";
import {CreateCompanyApiResponse} from "@/src/modules/companies/infra/api-responses/CreateCompanyApiResponse";

export class CompanyApiRepository extends HttpClient implements ICompanyRepository {
    private companies: Company[] = [
        {
            id: "1",
            companyName: "SABC",
            email: "sabc@ccontact.com",
            phone: "19900312",
            address: "bali, douala, cameroun",
            creationDate: "2025-11-07T00:00:00Z",
        }
    ];

    constructor() {
        super(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/");
    }


    async deleteCompany(command: DeleteCompanyDTO): Promise<DeleteCompanyResponse> {
        const data = await this.delete<{
            isDeleted: boolean;
            message: string;
        }>(companiesApiRoutes.deleteCompany(command.companyId));
        return {
            isDeleted: data.isDeleted,
            message: data.message
        }
    }

    // async deleteCompany(command: DeleteCompanyDTO): Promise<DeleteCompanyResponse> {
    //     const index = this.companies.findIndex(c => c.id === command.companyId);
    //
    //     if (index === -1) {
    //         throw new Error("Company not found");
    //     }
    //
    //     this.companies.splice(index, 1);
    //
    //     return {
    //         isDeleted: true,
    //         message: `Company ${command.companyId} deleted`,
    //     }
    // }

    async update(command: UpdateCompanyDTO): Promise<UpdateCompanyResponse> {
        const data = await this.put<UpdateCompanyApiResponse>(companiesApiRoutes.update(command.id), command);
        return CompanyFactory.formatUpdateCompanyFromApiResponse(data, command);
    }

    // async update(command: UpdateCompanyDTO): Promise<UpdateCompanyResponse> {
    //     const index = this.companies.findIndex(c => c.id === command.id);
    //     if (index === -1) {
    //         throw new Error("Company not found");
    //     }
    //
    //     const updatedCompany: Company = {
    //         ...this.companies[index],
    //         ...command,
    //     };
    //
    //     this.companies[index] = updatedCompany;
    //
    //     return {
    //         company: updatedCompany,
    //         isUpdated: true,
    //         message: "Company updated successfully"
    //     }
    // }

    // Implementation with real API

    async getAll() {
        const data = await this.get<GetCompaniesApiResponse>(companiesApiRoutes.getAll);
        return CompanyFactory.formatGetCompaniesFromApiResponse(data)
    }

    // async getAll(): Promise<Company[]> {
    //     // return mock data instead of calling real API
    //     return this.companies;
    //
    // }

    // Implementation with real API

    async create(command: CreateCompanyDTO) {
        const data = await this.post<CreateCompanyApiResponse>(companiesApiRoutes.create, command);
        return CompanyFactory.formatCreateCompanyFromApiResponse(data, command);
    }

    // async create(command: CreateCompanyDTO): Promise<CreateCompanyResponse> {
    //     // Mock Save
    //     const company: Company = {
    //         id: generateUUID(),
    //         ...command,
    //     }
    //     this.companies.push(company)
    //
    //     return {
    //         company: company,
    //         isSaved: true,
    //         message: "Company created successfully",
    //     }
    // }
}
