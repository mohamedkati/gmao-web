// 'use client'

// import { useState } from 'react'
// import { ColumnDef } from '@tanstack/react-table'
// import { DataTable } from '@/shared/components/data-table/data-table'
// import { DataTableColumnHeader } from '@/shared/components/data-table/data-table-column-header'
// import { DataTableRowActions } from '@/shared/components/data-table/data-table-row-actions'


// // Type de données pour le test
// type Equipment = {
//     id: number
//     name: string
//     type: string
//     status: string
//     lastMaintenance: string
// }

// // Données factices
// const mockData: Equipment[] = [
//     { id: 1, name: 'Chaudière A1', type: 'Gaz', status: 'En service', lastMaintenance: '2025-01-10' },
//     { id: 2, name: 'Pompe PX-200', type: 'Hydraulique', status: 'En panne', lastMaintenance: '2024-12-18' },
//     { id: 3, name: 'Ventilateur V9', type: 'Électrique', status: 'En maintenance', lastMaintenance: '2025-02-05' },
//     { id: 4, name: 'Chaudière A2', type: 'Gaz', status: 'En service', lastMaintenance: '2025-01-15' },
//     { id: 5, name: 'Pompe S300', type: 'Hydraulique', status: 'En attente', lastMaintenance: '2025-03-20' },
// ]

// // Colonnes de la table
// const columns: ColumnDef<Equipment>[] = [
//     {
//         accessorKey: 'name',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Équipement" />
//         ),
//         cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
//     },
//     {
//         accessorKey: 'type',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Type" />
//         ),
//     },
//     {
//         accessorKey: 'status',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Statut" />
//         ),
//         cell: ({ row }) => {
//             const status = row.getValue('status') as string
//             const color =
//                 status === 'En service'
//                     ? 'text-green-600 bg-green-50'
//                     : status === 'En panne'
//                         ? 'text-red-600 bg-red-50'
//                         : status === 'En maintenance'
//                             ? 'text-orange-600 bg-orange-50'
//                             : 'text-slate-600 bg-slate-50'
//             return (
//                 <span className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
//                     {status}
//                 </span>
//             )
//         },
//     },
//     {
//         accessorKey: 'lastMaintenance',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Dernière maintenance" />
//         ),
//     },
//     {
//         id: 'actions',
//         header: '',
//         cell: ({ row }) => (
//             <DataTableRowActions
//                 row={row}
//                 onView={(data) => alert(`Voir ${data.name}`)}
//                 onEdit={(data) => alert(`Modifier ${data.name}`)}
//                 onDelete={(data) => alert(`Supprimer ${data.name}`)}
//             />
//         ),
//         enableSorting: false,
//     },
// ]

// export default function DataTableTestPage() {
//     const [data] = useState<Equipment[]>(mockData)

//     return (
//         <div className="p-8 space-y-6">
//             <h1 className="text-3xl font-bold text-foreground">Test DataTable</h1>
//             <p className="text-muted-foreground">
//                 Ceci est un aperçu du composant <code>DataTable</code> avec des données factices.
//             </p>
          
//             <DataTable
//                 columns={columns}
//                 data={data}
//                 searchKey="name"
//                 searchPlaceholder="Rechercher un équipement..."
//             />
//         </div>
//     )
// }


"use client"

import { WorkOrdersList } from "@/features/work-orders/components/work-order-list"

export default function Page() {
    return <WorkOrdersList></WorkOrdersList>
}