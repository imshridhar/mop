import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Pause, 
  Play, 
  PlusCircle, 
  Filter, 
  Search,
  ArrowDownUp,
  FileText
} from 'lucide-react';

// Mock data for work orders
const mockWorkOrders = [
  {
    id: 'WO-1234',
    customer: 'Tata Motors',
    product: 'Motor Housing A-12',
    quantity: 500,
    dueDate: '2025-06-15',
    status: 'in_progress',
    priority: 'high',
    assignedTo: 'Production Team A',
    progress: 68
  },
  {
    id: 'WO-1235',
    customer: 'Mahindra & Mahindra',
    product: 'Gear Assembly B-45',
    quantity: 200,
    dueDate: '2025-06-10',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'Production Team B',
    progress: 0
  },
  {
    id: 'WO-1236',
    customer: 'Ashok Leyland',
    product: 'Transmission Parts',
    quantity: 150,
    dueDate: '2025-06-05',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'Production Team A',
    progress: 100
  },
  {
    id: 'WO-1237',
    customer: 'Bharat Forge',
    product: 'Crankshaft C-78',
    quantity: 75,
    dueDate: '2025-06-12',
    status: 'on_hold',
    priority: 'low',
    assignedTo: 'Production Team C',
    progress: 35
  },
  {
    id: 'WO-1238',
    customer: 'Maruti Suzuki',
    product: 'Brake Components',
    quantity: 1000,
    dueDate: '2025-06-20',
    status: 'in_progress',
    priority: 'high',
    assignedTo: 'Production Team B',
    progress: 42
  }
];

const WorkOrders: React.FC = () => {
  const [workOrders, setWorkOrders] = useState(mockWorkOrders);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get status badge elements
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 size={14} className="mr-1" />
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Play size={14} className="mr-1" />
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={14} className="mr-1" />
            Pending
          </span>
        );
      case 'on_hold':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Pause size={14} className="mr-1" />
            On Hold
          </span>
        );
      default:
        return null;
    }
  };

  // Priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1"></span>
        );
      case 'medium':
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
        );
      case 'low':
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
        );
      default:
        return null;
    }
  };

  // Filter work orders based on status and search query
  const filteredWorkOrders = workOrders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Work Orders</h1>
        <button className="mt-3 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          <PlusCircle size={18} className="mr-2" />
          Create Work Order
        </button>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-gray-500" />
            <select 
              className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 bg-white text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search work orders..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Work Orders Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer">
                    Work Order <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer">
                    Customer <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer">
                    Due Date <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getPriorityBadge(order.priority)}
                      <span className="font-medium">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>{order.product}</span>
                      <span className="text-xs text-gray-500">Qty: {order.quantity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Format the date to be more readable */}
                    {new Date(order.dueDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-32">
                      <div className="flex items-center">
                        <span className="text-xs font-medium mr-2">{order.progress}%</span>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              order.status === 'completed' ? 'bg-green-500' :
                              order.status === 'in_progress' ? 'bg-blue-500' :
                              order.status === 'on_hold' ? 'bg-gray-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${order.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <FileText size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredWorkOrders.length}</span> of{' '}
                <span className="font-medium">{filteredWorkOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <span aria-hidden="true">&laquo;</span>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrders;