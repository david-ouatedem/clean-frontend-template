import {useGetCompanies} from "@/src/modules/companies/ui/hooks/useGetCompanies";
import {useCreateCompany} from "@/src/modules/companies/ui/hooks/useCreateCompany";
import {PathValue, useForm} from "react-hook-form";
import {
    CreateCompanySchemaType,
    createCompanySchemaValidate
} from "@/src/modules/companies/ui/validators/CreateCompanySchemaValidate";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useUpdateCompany} from "@/src/modules/companies/ui/hooks/useUpdateCompany";
import {Company} from "@/src/modules/companies/domain/entities/Company";
import {UpdateCompanyDTO} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";
import {useDeleteCompany} from "@/src/modules/companies/ui/hooks/useDeleteCompany";

export type CompaniesBehavior = ReturnType<typeof useCompanies>;

export const useCompanies = () => {
    const form = useForm<CreateCompanySchemaType>({
        mode: "onChange",
        resolver: zodResolver(createCompanySchemaValidate),
        defaultValues: {
            address: "",
            companyName: "",
            email: "",
            phone: "",
            creationDate: ""
        }
    })

    const getCompaniesBehavior = useGetCompanies();
    const createCompaniesBehavior = useCreateCompany()
    const updateCompanyBehavior = useUpdateCompany()
    const deleteCompanyBehavior = useDeleteCompany()

    const {mutate: createCompany, isPending, error, isSuccess, reset} = createCompaniesBehavior;

    const {
        mutate: updateCompany,
        isPending: isUpdatePending,
        error: updateError,
        isSuccess: isUpdateSuccess,
        reset: updateReset
    } = updateCompanyBehavior;

    const {
        mutate: deleteCompany,
        isPending: isDeletePending,
        error: deleteError,
        isSuccess: isDeleteSuccess,
        reset: deleteReset
    } = deleteCompanyBehavior;

    const [isOpen, setIsOpen] = useState(false);
    const [companyToUpdateId, setCompanyToUpdateId] = useState<string | null>(null);

    function handleChange<K extends keyof CreateCompanySchemaType>({key, value}: {
        key: K,
        value: PathValue<CreateCompanySchemaType, K>;
    }) {
        form.setValue(key, value);
    }

    function onSubmit(data: CreateCompanySchemaType) {
        if (!companyToUpdateId) {
            createCompany({
                ...data,
            }, {
                onSuccess: (res) => {
                    console.log(res.message)
                    setTimeout(() => {
                        handleClose()
                    }, 1500);
                }
            });
        } else {
            handleUpdateCompany({
                id: companyToUpdateId,
                ...data,
            })
        }

    }

    function handleUpdateCompany(command: UpdateCompanyDTO) {
        if (!companyToUpdateId) {
            throw new Error("No company to update");
        }
        updateCompany({
            ...command,
        }, {
            onSuccess: (res) => {
                console.log(res.message)
                setTimeout(() => {
                    handleClose()
                }, 1500);
            }
        })
    }

    function handleDeleteCompany(companyId: string) {
        deleteCompany({
            companyId
        }, {
            onSuccess: (res) => {
                console.log(res.message)
                setTimeout(() => {
                    handleClose()
                }, 1500);
            }
        })
    }

    function handleOpen() {
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
        reset()
        updateReset();
        deleteReset();
        resetForm();
        setCompanyToUpdateId(null);
    }

    function resetForm() {
        form.reset({
            address: "",
            companyName: "",
            email: "",
            phone: "",
            creationDate: ""
        })
    }

    function handleOpenForEdit(data: Company) {
        setIsOpen(true);
        setCompanyToUpdateId(data.id);
        form.reset({
            address: data.address,
            companyName: data.companyName,
            email: data.email,
            creationDate: data.creationDate.split("T")[0],
            phone: data.phone,
        })
    }

    return {
        handleOpen,
        isPending: isPending || isUpdatePending || isDeletePending,
        isSuccess: isSuccess || isUpdateSuccess || isDeleteSuccess,
        error: error || updateError || deleteError,
        handleChange,
        isOpen,
        handleClose,
        form,
        getCompaniesBehavior,
        createCompaniesBehavior,
        updateCompanyBehavior,
        onSubmit,
        handleUpdateCompany,
        isEdit: !!companyToUpdateId,
        handleOpenForEdit,
        handleDeleteCompany
    }
}