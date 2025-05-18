import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  Edit, 
  Trash2, 
  AlertOctagon, 
  ArrowDownUp,
  FileText,
  BarChart
} from 'lucide-react';

// Mock data for inventory items
const mockInventoryItems = [
  {
    id: 'INV-001',
    name: 'Aluminum Sheets',
    category: 'Raw Materials',
    sku: 'RM-ALU-001',
    currentStock: 120,
    minStock: 150,
    location: 'Warehouse A',
    lastUpdated: '2025-05-28',
    unit: 'sheets'
  },
  {
    id: 'INV-002',
    name: 'Steel Rods (10mm)',
    category: 'Raw Materials',
    sku: 'RM-STL-010',
    currentStock: 500,
    minStock: 200,
    location: 'Warehouse A',
    lastUpdated: '2025-05-27',
    unit: 'units'
  },
  {
    id: 'INV-003',
    name: 'Copper Wires',
    category: 'Raw Materials',
    sku: 'RM-CPR-001',
    currentStock: 1200,
    minStock: 500,
    location: 'Warehouse B',
    lastUpdated: '2025-05-26',
    unit: 'meters'
  },
  {
    id: 'INV-004',
    name: 'Hydraulic Fluid',
    category: 'Maintenance',
    sku: 'MT-HYD-001',
    currentStock: 15,
    minStock: 20,
    location: 'Store Room C',
    lastUpdated: '2025-05-25',
    unit: 'liters'
  },
  {
    id: 'INV-005',
    name: 'Ball Bearings (Type A)',
    category: 'Components',
    sku: 'CP-BLB-001',
    currentStock: 350,
    minStock: 100,
    location: 'Assembly Area',
    lastUpdated: '2025-05-28',
    unit: 'pieces'
  },
  {
    id: 'INV-006',
    name: 'Mounting Screws M6',
    category: 'Components',
    sku: 'CP-SCR-M6',
    currentStock: 5,
    minStock: 1000,
    location: 'Assembly Area',
    lastUpdated: '2025-05-22',
    unit: 'pieces'
  }
];

const Inventory: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState(mockInventoryItems);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Get inventory categories
  const categories = [...new Set(inventoryItems.map(item => item.category))];

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort inventory items
  const filteredItems = inventoryItems
    .filter(item => {
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const fieldA = a[sortField as keyof typeof a];
      const fieldB = b[sortField as keyof typeof b];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc' 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortDirection === 'asc' 
          ? fieldA - fieldB
          : fieldB - fieldA;
      }
      return 0;
    });

  // Get stock status indicator
  const getStockStatus = (current: number, min: number) => {
    if (current <= 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertOctagon size={12} className="mr-1" />
          Out of Stock
        </span>
      );
    } else if (current < min) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertOctagon size={12} className="mr-1" />
          Low Stock
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          In Stock
        </span>
      );
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <button className="mt-3 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          <PlusCircle size={18} className="mr-2" />
          Add Inventory Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500">
          <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
          <p className="text-2xl font-bold text-gray-800">{inventoryItems.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-amber-500">
          <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
          <p className="text-2xl font-bold text-gray-800">
            {inventoryItems.filter(item => item.currentStock < item.minStock && item.currentStock > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500">Out of Stock</h3>
          <p className="text-2xl font-bold text-gray-800">
            {inventoryItems.filter(item => item.currentStock <= 0).length}
          </p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-gray-500" />
            <select 
              className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 bg-white text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name or SKU..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Item Name <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort('currentStock')}
                  >
                    Stock <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <span className={`font-medium ${item.currentStock < item.minStock ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.currentStock} {item.unit}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        Min: {item.minStock} {item.unit}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStockStatus(item.currentStock, item.minStock)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <BarChart size={18} />
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <Edit size={18} />
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredItems.length}</span> of{' '}
                <span className="font-medium">{filteredItems.length}</span> results
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

export default Inventory;