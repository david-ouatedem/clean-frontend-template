export const companiesApiRoutes = {
    getAll: `/companies`,
    create: `/companies`,
    getOne: (id: string) => `/companies/${id}`,
    update: (id: string) => `/companies/${id}`,
    deleteCompany: (id: string) => `/companies/${id}`,
}