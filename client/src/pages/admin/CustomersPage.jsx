// import { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react';
// import setDocumentTitle from "../../hooks/set-document-title";
// import { customersAPI } from '../../services/api';
// import { CustomerForm } from '../../components/CustomerForm';
// import { Button } from '../../components/ui/button';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '../../components/ui/alert-dialog';

// export function CustomersPage() {
//   setDocumentTitle("Customers | Delivery Hub");

//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [deleteCustomerId, setDeleteCustomerId] = useState(null);

//   useEffect(() => {
//     loadCustomers();
//   }, []);

//   const loadCustomers = async () => {
//     try {
//       // const data = await customersAPI.getAll();
//       await fetch('http://localhost:8081/customers')
//         .then(res => res.json())
//         .then(data => setCustomers(data))
//         .catch(err => console.log(err));

//     } catch (error) {
//       console.error('Error loading customers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (deleteCustomerId === null) return;

//     try {
//       await customersAPI.delete(deleteCustomerId);
//       setCustomers(customers.filter((c) => c.id !== deleteCustomerId));
//       setDeleteCustomerId(null);
//     } catch (error) {
//       console.error('Error deleting customer:', error);
//     }
//   };

//   const handleFormSubmit = () => {
//     loadCustomers();
//     setShowForm(false);
//     setEditingCustomer(null);
//   };

//   return (
//     <div className="p-8">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-2xl mb-1">Customers Management</h2>
//           <p className="text-gray-600">Manage customer information</p>
//         </div>
//         <Button
//           onClick={() => {
//             setEditingCustomer(null);
//             setShowForm(true);
//           }}
//           className="flex items-center gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           New Customer
//         </Button>
//       </div>

//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
//               <div className="h-6 bg-gray-200 rounded mb-4"></div>
//               <div className="space-y-2">
//                 <div className="h-4 bg-gray-200 rounded"></div>
//                 <div className="h-4 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {customers.map((customer) => (
//             <div
//               key={customer.id}
//               className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-lg mb-1">{customer.customer_name}</h3>
//                   <p className="text-sm text-gray-500">
//                     Customer #{customer.id}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => {
//                       setEditingCustomer(customer);
//                       setShowForm(true);
//                     }}
//                     className="p-2 text-gray-600 hover:bg-gray-50 rounded"
//                     title="Edit"
//                   >
//                     <Edit className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => setDeleteCustomerId(customer.id)}
//                     className="p-2 text-red-600 hover:bg-red-50 rounded"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center gap-2 text-sm">
//                   <Mail className="w-4 h-4 text-gray-400" />
//                   <span className="text-gray-700">{customer.email}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm">
//                   <Phone className="w-4 h-4 text-gray-400" />
//                   <span className="text-gray-700">{customer.phone_number}</span>
//                 </div>
//                 <div className="flex items-start gap-2 text-sm">
//                   <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
//                   <span className="text-gray-700">{customer.address}</span>
//                 </div>
//               </div>

//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <p className="text-xs text-gray-500">
//                   Joined {new Date(customer.created_at).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {!loading && customers.length === 0 && (
//         <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
//           <p className="text-gray-500">No customers found. Add your first customer!</p>
//         </div>
//       )}

//       {showForm && (
//         <CustomerForm
//           customer={editingCustomer}
//           onClose={() => {
//             setShowForm(false);
//             setEditingCustomer(null);
//           }}
//           onSubmit={handleFormSubmit}
//         />
//       )}

//       <AlertDialog
//         open={deleteCustomerId !== null}
//         onOpenChange={() => setDeleteCustomerId(null)}
//       >
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Customer</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete this customer? This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }
