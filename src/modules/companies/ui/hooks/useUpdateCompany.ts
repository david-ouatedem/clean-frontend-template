import {useMutation, useQueryClient} from "@tanstack/react-query";
import {companyDependencies} from "@/src/modules/companies/infra/di/CompanyDiContainer";
import {UpdateCompanyDTO} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();
    const updateCompanyUseCase = companyDependencies.resolve('UpdateCompanyUseCase');

    return useMutation({
        mutationFn: (data: UpdateCompanyDTO) => updateCompanyUseCase.execute(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['companies']});
        },
    });
}