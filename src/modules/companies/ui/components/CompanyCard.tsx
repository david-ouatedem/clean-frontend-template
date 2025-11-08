import {Company} from "@/src/modules/companies/domain/entities/Company";
import {Building2, Edit, Mail, MapPin, Phone, Trash} from "lucide-react";

type OwnProps = {
    company: Company
    handleOpenEdit: (company: Company) => void
    handleDelete: (id: string) => void
}

const CompanyCard: React.FC<OwnProps> = ({
                                             company,
                                             handleOpenEdit,
                                             handleDelete
                                         }) => {
    const date = new Date(company.creationDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="text-blue-600" size={24}/>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">{company.companyName}</h3>
                        <p className="text-sm text-gray-500">Created {date}</p>
                    </div>
                </div>
                <div className={"flex items-center gap-3"}>
                    <button onClick={() => handleOpenEdit(company)} className={"border border-gray-400 p-1 rounded-md"}
                            type="button">
                        <Edit size={16} className="text-gray-400"/>
                    </button>
                    <button onClick={() => handleDelete(company.id)} className={"border border-red-400 p-1 rounded-md"} type="button">
                        <Trash size={16} className="text-red-400"/>
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} className="text-gray-400"/>
                    <span className="text-sm">{company.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} className="text-gray-400"/>
                    <span className="text-sm">{company.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                    <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0"/>
                    <span className="text-sm">{company.address}</span>
                </div>
            </div>
        </div>
    );
};

export default CompanyCard;
