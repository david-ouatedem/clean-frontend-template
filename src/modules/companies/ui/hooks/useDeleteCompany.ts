import {useMutation, useQueryClient} from "@tanstack/react-query";
import {companyDependencies} from "@/src/modules/companies/infra/di/container";
import {DeleteCompanyCommand} from "@/src/modules/companies/application/useCases/DeleteCompanyUseCase";

export const useDeleteCompany = () => {
    const queryClient = useQueryClient();
    const deleteCompanyUseCase = companyDependencies.resolve('DeleteCompanyUseCase');

    return useMutation({
        mutationFn: (data: DeleteCompanyCommand) => deleteCompanyUseCase.execute(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
    });
}