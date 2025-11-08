import React from 'react';
import {AlertCircle, Building2, Loader2, Plus} from "lucide-react";
import {useCompanies} from "@/src/modules/companies/ui/hooks/useCompanies";
import CompanyCard from "@/src/modules/companies/ui/components/CompanyCard";
import CreateCompanyForm from "@/src/modules/companies/ui/components/CreateCompanyForm";

const ListCompaniesView = () => {
    const companiesBehavior = useCompanies();
    const {
        getCompaniesBehavior,
        handleOpenForEdit,
        handleDeleteCompany,
        handleOpen,
        isOpen
    } = companiesBehavior;
    const {data: companies, isLoading, isError, error} = getCompaniesBehavior;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="animate-spin text-blue-600 mb-4" size={40}/>
                <p className="text-gray-600">Loading companies...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20}/>
                <div>
                    <h3 className="font-medium text-red-900">Error loading companies</h3>
                    <p className="text-sm text-red-700 mt-1">{error?.message}</p>
                </div>
            </div>
        );
    }

    if (!companies || companies.length === 0) {
        return (
            <div className="text-center py-16">
                <Building2 className="mx-auto text-gray-300 mb-4" size={48}/>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies yet</h3>
                <p className="text-gray-600 mb-5">Get started by creating your first company</p>
                <button
                    onClick={handleOpen}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                    <Plus size={20}/>
                    Add Company
                </button>
                {
                    isOpen && <CreateCompanyForm companiesBehavior={companiesBehavior}/>
                }
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
                        <CreateCompanyForm companiesBehavior={companiesBehavior}/>
                    </div>
                    <p className="text-gray-600">Manage your company directory</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((company) => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            handleOpenEdit={handleOpenForEdit}
                            handleDelete={handleDeleteCompany}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListCompaniesView;