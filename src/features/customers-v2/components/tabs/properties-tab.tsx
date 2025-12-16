import React from "react";
import { Plus } from "lucide-react";
import { StatusBadge } from "@/shared/components/stripe/status-badge";
import { Button } from "@/shared/components/ui/button";
// import { usePropertyGroupsQuery } from "../../hooks/usePropertyGroupsQuery";
// import { usePropertyStore } from "../../stores/usePropertyStore";

interface PropertiesTabProps {
    customerId: string;
}

export const PropertiesTab: React.FC<PropertiesTabProps> = ({ customerId }) => {
    //   const { data: properties, isLoading } = usePropertyGroupsQuery(customerId);
    //   const { openLinkPropertyDrawer } = usePropertyStore();

    //   if (isLoading) return <div>Loading properties...</div>;

    //   return (
    //     <div className="bg-white rounded-xl shadow-sm border border-gray-100">
    //       {/* Header */}
    //       <div className="p-6 border-b border-gray-100">
    //         <div className="flex items-start justify-between">
    //           <div>
    //             <h2 className="text-xl font-bold text-gray-900 mb-2">Properties & Sites</h2>
    //             <p className="text-sm text-gray-500">All properties managed for this customer</p>
    //           </div>
    //           <div className="flex items-center gap-3">
    //             {/* View Toggle */}
    //             <div className="flex items-center bg-gray-50 rounded-lg p-1">
    //               <button className="px-4 py-1.5 bg-[#635bff] text-white text-xs font-semibold rounded-lg">
    //                 Grid
    //               </button>
    //               <button className="px-4 py-1.5 text-gray-500 text-xs font-medium">
    //                 List
    //               </button>
    //             </div>
    //             <Button
    //               onClick={() => openLinkPropertyDrawer(customerId)}
    //               className="bg-gradient-to-r from-[#635bff] to-[#7a73ff]"
    //             >
    //               <Plus className="w-4 h-4 mr-2" />
    //               Link property
    //             </Button>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Properties Grid */}
    //       <div className="p-6 grid grid-cols-3 gap-6">
    //         {properties?.map((property) => (
    //           <div key={property.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
    //             {/* Property Image Placeholder */}
    //             <div className="h-36 bg-blue-50 flex items-center justify-center text-5xl relative">
    //               🏢
    //               {/* Status Badge */}
    //               <div className="absolute top-3 left-3">
    //                 <StatusBadge status="active" />
    //               </div>
    //             </div>

    //             {/* Property Info */}
    //             <div className="p-4">
    //               <h3 className="text-base font-bold text-gray-900 mb-2">{property.name}</h3>
    //               <p className="text-sm text-gray-500 mb-3">
    //                 {property.address?.street}, {property.address?.city}
    //               </p>
    //               <div className="flex items-center justify-between text-xs text-gray-400">
    //                 <span>Budget: €50K/year</span>
    //                 <span>• 3 WO active</span>
    //               </div>
    //             </div>
    //           </div>
    //         ))}

    //         {/* Add New Card */}
    //         <button
    //           onClick={() => openLinkPropertyDrawer(customerId)}
    //           className="bg-white border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center text-gray-400 hover:border-[#635bff] hover:text-[#635bff] transition-colors"
    //         >
    //           <Plus className="w-12 h-12 mb-3" />
    //           <span className="text-sm font-medium">Link new property</span>
    //         </button>
    //       </div>
    //     </div>
    //   );

    return (<></>)
};