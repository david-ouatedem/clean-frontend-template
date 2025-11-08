import {GetCompaniesUseCase} from "@/src/modules/companies/application/useCases/GetCompaniesUseCase";
import {CreateCompanyUseCase} from "@/src/modules/companies/application/useCases/CreateCompanyUseCase";
import {ICompanyRepository} from "@/src/modules/companies/domain/repositories/ICompanyRepository";
import {UpdateCompanyUseCase} from "@/src/modules/companies/application/useCases/UpdateCompanyUseCase";
import {DeleteCompanyUseCase} from "@/src/modules/companies/application/useCases/DeleteCompanyUseCase";

export interface CompanyServiceRegistry {
    CompanyApiRepository: ICompanyRepository;
    GetCompaniesUseCase: GetCompaniesUseCase;
    CreateCompanyUseCase: CreateCompanyUseCase;
    UpdateCompanyUseCase: UpdateCompanyUseCase;
    DeleteCompanyUseCase: DeleteCompanyUseCase;
}

export type CompanyServiceKey = keyof CompanyServiceRegistry;

class DICompanyContainer {
    private services = new Map<CompanyServiceKey, any>()
    private singletons = new Map<CompanyServiceKey, any>();

    /**
     * Register a service factory (creates new instance each time) this is for use-cases
     */
    register<K extends CompanyServiceKey>(key: K, factory: () => CompanyServiceRegistry[K]){
        this.services.set(key, factory);
    }

    /**
     * Register a singleton (same instance every time) this is for repositories
     */
    registerSingleton<K extends CompanyServiceKey>(
        key: K,
        instance: CompanyServiceRegistry[K]
    ): void {
        this.singletons.set(key, instance);
    }

    /**
     * Resolve a service or a repository
     */
    resolve<K extends CompanyServiceKey>(key: K): CompanyServiceRegistry[K] {
        if (this.singletons.has(key)) {
            return this.singletons.get(key);
        }

        const factory = this.services.get(key);
        if (!factory) {
            throw new Error(`Service ${key} not registered`);
        }
        return factory();
    }

    /**
     * Clear all registrations (useful for testing)
     */
    clear(): void {
        this.services.clear();
        this.singletons.clear();
    }
}

export const companyDependencies = new DICompanyContainer();
