import {HttpClient} from "@/src/shared/infrastructure/http/HttpClient";
import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";
import {
    CreateCompanyCommand,
    CreateCompanyResponse
} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {Company} from "@/src/modules/companies/domain/entities/Company";
import {generateUUID} from "@/src/shared/utils/GenerateUUID";
import {UpdateCompanyCommand, UpdateCompanyResponse} from "../../application/useCases/UpdateCompanyUseCase";
import {DeleteCompanyCommand, DeleteCompanyResponse} from "../../application/useCases/DeleteCompanyUseCase";

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
        super(process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com");
    }

    // async deleteCompany(command: DeleteCompanyCommand): Promise<DeleteCompanyResponse> {
    //     const data = await this.delete<{
    //         isDeleted: boolean;
    //         message: string;
    //     }>(companiesApiRoutes.deleteCompany(command.companyId));
    //     return {
    //         isDeleted: data.isDeleted,
    //         message: data.message
    //     }
    // }

    async deleteCompany(command: DeleteCompanyCommand): Promise<DeleteCompanyResponse> {
        const index = this.companies.findIndex(c => c.id === command.companyId);

        if (index === -1) {
            throw new Error("Company not found");
        }

        this.companies.splice(index, 1);

        return {
            isDeleted: true,
            message: `Company ${command.companyId} deleted`,
        }
    }

    // async update(command: UpdateCompanyCommand): Promise<UpdateCompanyResponse> {
    //     const data = await this.put<UpdateCompanyApiResponse>(companiesApiRoutes.update, command);
    //     return CompanyFactory.formatUpdateCompanyFromApiResponse(data, command);
    // }

    async update(command: UpdateCompanyCommand): Promise<UpdateCompanyResponse> {
        const index = this.companies.findIndex(c => c.id === command.id);
        if (index === -1) {
            throw new Error("Company not found");
        }

        const updatedCompany: Company = {
            ...this.companies[index],
            ...command,
        };

        this.companies[index] = updatedCompany;

        return {
            company: updatedCompany,
            isUpdated: true,
            message: "Company updated successfully"
        }
    }

    // Implementation with real API

    // async getAll() {
    //     const data = await this.get<GetCompaniesApiResponse>(companiesApiRoutes.getAll);
    //     return CompanyFactory.formatGetCompaniesFromApiResponse(data)
    // }

    async getAll(): Promise<Company[]> {
        // return mock data instead of calling real API
        return this.companies;

    }

    // Implementation with real API

    // async create(command: CreateCompanyCommand) {
    //     const data = await this.post<CreateCompanyApiResponse>(companiesApiRoutes.create, command);
    //     return CompanyFactory.formatCreateCompanyFromApiResponse(data, command);
    // }

    async create(command: CreateCompanyCommand): Promise<CreateCompanyResponse> {
        // Mock Save
        const company: Company = {
            id: generateUUID(),
            ...command,
        }
        this.companies.push(company)

        return {
            company: company,
            isSaved: true,
            message: "Company created successfully",
        }
    }
}
