import {useMutation, useQueryClient} from "@tanstack/react-query";
import {companyDependencies} from "@/src/modules/companies/infra/di/CompanyDiContainer";
import {CreateCompanyDTO} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";

export const useCreateCompany = () => {
    const queryClient = useQueryClient();
    const createCompanyUseCase = companyDependencies.resolve('CreateCompanyUseCase');

    return useMutation({
        mutationFn: (data: CreateCompanyDTO) => createCompanyUseCase.execute(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
    });
};