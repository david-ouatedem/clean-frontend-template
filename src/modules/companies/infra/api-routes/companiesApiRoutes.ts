export const companiesApiRoutes = {
    getAll: `/companies`,
    create: `/companies/create`,
    update: `/companies/update`,
    deleteCompany: (id: string) => `/companies/delete/${id}`,
}