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
        return data.map((company): Company => ({
            id: company.id,
            companyName: company.companyName,
            email: company.email,
            phone: company.phone,
            address: company.address,
            creationDate: company.creationDate,
        }));
    }

    static formatCreateCompanyFromApiResponse(data: CreateCompanyApiResponse, command: CreateCompanyDTO): CreateCompanyResponse {
        return {
            company: {
                ...data
            },
            isSaved: !!data.id,
            message: "Company Created Successfully",
        }
    }

    static formatUpdateCompanyFromApiResponse(data: UpdateCompanyApiResponse, command: UpdateCompanyDTO): UpdateCompanyResponse {
        return {
            company: {
                ...data,
                id: command.id,
                creationDate: command.creationDate,
            },
            isUpdated: !!data.companyName,
            message: "Company Updated Successfully",
        }
    }
}
