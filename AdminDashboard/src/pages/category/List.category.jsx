// import React from 'react'
// import { Pencil, Trash2 } from "lucide-react";


// const ListCategory = () => {
//   return (
//     <div className="p-6">
//   <h2 className="text-2xl font-semibold mb-4">Category List</h2>

//   <div className="overflow-x-auto bg-white shadow rounded-lg">
//     <table className="min-w-full text-sm text-left">
//       <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//         <tr>
//           <th className="px-6 py-3">id</th>
//           <th className="px-6 py-3">Name</th>
//           <th className="px-6 py-3">Parent</th>
//           <th className="px-6 py-3">Product</th>
//           <th className="px-6 py-3">Total Sales</th>
//           <th className="px-6 py-3 text-center">Action</th>
//         </tr>
//       </thead>

//       <tbody>
//         {categories.map((category) => (
//           <tr key={category._id} className="border-b hover:bg-gray-50">
//              <td className="px-6 py-4 font-medium">
//               {category._id}
//             </td>
//             <td className="px-6 py-4 font-medium">
//               {category.name}
//             </td>

//             {/* Parent Category */}
//             <td className="px-6 py-4">
//               {category.parent?.name || "-"}
//             </td>

//             {/* Product Count */}
//             <td className="px-6 py-4">
//               {category.totalProducts}
//             </td>

//             {/* Total Sales */}
//             <td className="px-6 py-4">
//               {category.totalSales}
//             </td>

//             {/* Action Buttons */}
//             <td className="px-6 py-4">
//               <div className="flex items-center justify-center gap-3">
//                 <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600">
//                   <Pencil size={16} />
//                 </button>

//                 <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600">
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
//   )
// }

// export default ListCategory



// export const categories = [
//   { _id: "1", name: "Electronics", parent: null, totalProducts: 5, totalSales: 10000 },
//   { _id: "2", name: "Clothing", parent: null, totalProducts: 3, totalSales: 5000 },
//   { _id: "3", name: "Books", parent: null, totalProducts: 2, totalSales: 8000 },]


import React from 'react'

const ListCategory = () => {
  return (
        <div className='text-3xl text-red-500 text-center'>Sorry! Mantainance in progress</div>

  )
}

export default ListCategory