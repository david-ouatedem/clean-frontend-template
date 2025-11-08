import React from "react";
import {CompaniesBehavior} from "@/src/modules/companies/ui/hooks/useCompanies";
import {AlertCircle, Building2, Calendar, Check, Loader2, Mail, MapPin, Phone, Plus, X,} from "lucide-react";

type OwnProps = {
    companiesBehavior: CompaniesBehavior
}

const CreateCompanyForm: React.FC<OwnProps> = ({companiesBehavior}) => {
    const {
        form,
        isOpen,
        handleClose,
        handleChange,
        isSuccess,
        isPending,
        error,
        handleOpen,
        onSubmit,
        isEdit
    } = companiesBehavior;

    const {
        handleSubmit,
        formState: { errors },
        watch,
    } = form;

    if (!isOpen) {
        return (
            <button
                onClick={handleOpen}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
                <Plus size={20} />
                Add Company
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {isEdit ? "Edit Company" : "Create New Company"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {/* Company Name */}
                    <div>
                        <label
                            htmlFor="companyName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Company Name *
                        </label>
                        <div className="relative">
                            <Building2
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                id="companyName"
                                name="companyName"
                                type="text"
                                value={watch("companyName")}
                                onChange={(e) =>
                                    handleChange({ key: "companyName", value: e.target.value })
                                }
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                                    errors.companyName
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Enter company name"
                            />
                        </div>
                        {errors.companyName && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.companyName.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email *
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={watch("email")}
                                onChange={(e) =>
                                    handleChange({ key: "email", value: e.target.value })
                                }
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                                    errors.email
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="company@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Creation Date *
                        </label>
                        <div className="relative">
                            <Calendar
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                id="email"
                                name="email"
                                type="date"
                                value={watch("creationDate")}
                                onChange={(e) =>
                                    handleChange({ key: "creationDate", value: e.target.value })
                                }
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                                    errors.creationDate
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="company@example.com"
                            />
                        </div>
                        {errors.creationDate && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.creationDate.message}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Phone *
                        </label>
                        <div className="relative">
                            <Phone
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={watch("phone")}
                                onChange={(e) =>
                                    handleChange({ key: "phone", value: e.target.value })
                                }
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                                    errors.phone
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Address *
                        </label>
                        <div className="relative">
                            <MapPin
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />
                            <textarea
                                id="address"
                                name="address"
                                value={watch("address")}
                                onChange={(e) =>
                                    handleChange({ key: "address", value: e.target.value })
                                }
                                rows={3}
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none ${
                                    errors.address
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Enter full address"
                            />
                        </div>
                        {errors.address && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    {/* General Error */}
                    {error && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle
                                className="text-red-600 flex-shrink-0 mt-0.5"
                                size={18}
                            />
                            <p className="text-sm text-red-800">{error.message}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {isSuccess && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <Check className="text-green-600" size={18} />
                            <p className="text-sm text-green-800">
                                Company created successfully!
                            </p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Creating...
                                </>
                            ) : (
                                isEdit ? "Edit Company" : "Create Company"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCompanyForm;
