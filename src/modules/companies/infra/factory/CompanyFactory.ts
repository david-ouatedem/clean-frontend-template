import {GetCompaniesApiResponse} from "@/src/modules/companies/infra/api-responses/GetCompaniesApiResponse";
import {Company} from "@/src/modules/companies/domain/entities/Company";
import {CreateCompanyApiResponse} from "@/src/modules/companies/infra/api-responses/CreateCompanyApiResponse";
import {CreateCompanyDTO, CreateCompanyResponse} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {UpdateCompanyApiResponse} from "@/src/modules/companies/infra/api-responses/UpdateCompanyApiResponse";
import {
    UpdateCompanyDTO,
    UpdateCompanyResponse
} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";

export class CompanyFactory {

    static formatGetCompaniesFromApiResponse(data: GetCompaniesApiResponse): Company[] {
        return data.companies.map((company): Company => ({
            id: company.company_id,
            companyName: company.company_name,
            email: company.company_email,
            phone: company.company_phone,
            address: company.company_address,
            creationDate: company.created_at,
        }));
    }

    static formatCreateCompanyFromApiResponse(data: CreateCompanyApiResponse, command: CreateCompanyDTO): CreateCompanyResponse {
        return {
            company: {
                id: data.companyId,
                ...command,
            },
            isSaved: data.isSaved,
            message: data.message
        }
    }

    static formatUpdateCompanyFromApiResponse(data: UpdateCompanyApiResponse, command: UpdateCompanyDTO): UpdateCompanyResponse {
        return {
            company: {
                ...command,
            },
            isUpdated: data.isUpdated,
            message: data.message
        }
    }
}
