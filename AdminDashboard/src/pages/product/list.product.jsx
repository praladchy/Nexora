// import React from "react";
// import Filters from "../../utils/Filters";
// import Pagination from "../../utils/Pagination";
// import { NavLink, useNavigate } from "react-router-dom";
// const ProductManag = () => {
//   const products = [
//     {
//       name: "Wireless Bluetooth Speaker",
//       category: "Electronics",
//       brand: "SoundWave",
//       price: "₹1,500",
//       sku: "SW",
//       offer: "10%",
//       type: "Variant",
//       stock: "40 pcs",
//       limit: "10 pcs",
//       status: "In Stock",
//       marketplace: "Pending",
//     },
//     {
//       name: "TP-Link Mini Router",
//       category: "Networking Devices",
//       brand: "TP-Link",
//       price: "₹1,800",
//       sku: "TPL",
//       offer: "15%",
//       type: "Single",
//       stock: "12 pcs",
//       limit: "15 pcs",
//       status: "Low Stock",
//       marketplace: "Live",
//     },
//   ];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Product Management List</h2>

//         <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
//             <NavLink to="/product/create">+ Add New Product</NavLink>
//         </button>
//       </div>

//       <Filters />

//       {/* TABLE */}
//       <div className="bg-white rounded-lg shadow overflow-x-auto">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3">Product Name</th>
//               <th className="p-3">Category</th>
//               <th className="p-3">Brand</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">SKU</th>
//               <th className="p-3">Offer</th>
//               <th className="p-3">Type</th>
//               <th className="p-3">Stock Level</th>
//               <th className="p-3">Stock Limit</th>
//               <th className="p-3">Stock Status</th>
//               <th className="p-3">Marketplace</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((p, i) => (
//               <tr key={i} className="border-t hover:bg-gray-50">
//                 <td className="p-3 flex items-center gap-3">
//                   <img
//                     src="https://via.placeholder.com/40"
//                     className="w-10 h-10 rounded"
//                   />
//                   {p.name}
//                 </td>

//                 <td className="p-3">{p.category}</td>
//                 <td className="p-3">{p.brand}</td>
//                 <td className="p-3">{p.price}</td>
//                 <td className="p-3">{p.sku}</td>
//                 <td className="p-3">{p.offer}</td>
//                 <td className="p-3">{p.type}</td>
//                 <td className="p-3">{p.stock}</td>
//                 <td className="p-3">{p.limit}</td>

//                 <td className="p-3">
//                   <span
//                     className={`px-2 py-1 rounded text-xs
//                           ${
//                             p.status === "In Stock"
//                               ? "bg-green-100 text-green-600"
//                               : "bg-red-100 text-red-600"
//                           }`}
//                   >
//                     {p.status}
//                   </span>
//                 </td>

//                 <td className="p-3">
//                   <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-600">
//                     {p.marketplace}
//                   </span>
//                 </td>

//                 <td className="p-3 text-center">
//                   <button className="text-purple-600 mr-2">✏️</button>
//                   <button className="text-red-500">🗑</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Pagination />
//     </div>
//   );
// };

// export default ProductManag;


import React from 'react'

const ProductList = () => {
  return (
    <div className='text-3xl text-red-500 text-center'>Sorry! Mantainance in progress</div>
  )   
}

export default ProductList