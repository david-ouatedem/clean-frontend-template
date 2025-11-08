import {useMutation, useQueryClient} from "@tanstack/react-query";
import {companyDependencies} from "@/src/modules/companies/infra/di/container";
import {UpdateCompanyCommand} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();
    const updateCompanyUseCase = companyDependencies.resolve('UpdateCompanyUseCase');

    return useMutation({
        mutationFn: (data: UpdateCompanyCommand) => updateCompanyUseCase.execute(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['companies']});
        },
    });
}