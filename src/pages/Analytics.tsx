import React, { useState } from 'react';
import { Calendar, Filter, Download, BarChart2, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('last30Days');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Line chart data - Production Output Trend
  const productionTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Assembly Line A',
        data: [4200, 4500, 4800, 4600, 5000, 5200],
        borderColor: 'rgba(79, 70, 229, 1)',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Assembly Line B',
        data: [3800, 4000, 3900, 4200, 4500, 4700],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.3,
      }
    ]
  };

  // Bar chart data - OEE by Department
  const oeeData = {
    labels: ['Assembly', 'Machining', 'Welding', 'Painting', 'Packaging'],
    datasets: [
      {
        label: 'Overall Equipment Effectiveness',
        data: [78, 82, 75, 85, 92],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
      {
        label: 'Target',
        data: [85, 85, 85, 85, 85],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderDash: [5, 5],
        type: 'line' as const,
      }
    ]
  };

  // Doughnut chart data - Downtime Causes
  const downtimeData = {
    labels: ['Maintenance', 'Setup/Changeover', 'Breakdowns', 'Material Shortage', 'Other'],
    datasets: [
      {
        data: [28, 22, 32, 15, 3],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 1,
      }
    ]
  };

  // Bar chart data - Quality Metrics
  const qualityData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'First Pass Yield (%)',
        data: [95.2, 96.1, 94.8, 97.3],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
      {
        label: 'Rejection Rate (%)',
        data: [2.3, 1.9, 2.5, 1.6],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <div className="flex items-center mt-3 md:mt-0 space-x-3">
          <div className="flex items-center">
            <Calendar size={18} className="mr-2 text-gray-500" />
            <select 
              className="block rounded-md border-gray-300 shadow-sm py-2 px-3 bg-white text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="last7Days">Last 7 Days</option>
              <option value="last30Days">Last 30 Days</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="lastYear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-500">OEE</h3>
            <span className="text-green-600 text-xs font-medium flex items-center">
              <TrendingUp size={14} className="mr-1" />
              +2.3%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">78.5%</p>
          <div className="text-xs text-gray-500 mt-1">Industry avg: 72%</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-500">Production Output</h3>
            <span className="text-green-600 text-xs font-medium flex items-center">
              <TrendingUp size={14} className="mr-1" />
              +4.7%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">12,548 units</p>
          <div className="text-xs text-gray-500 mt-1">Target: 12,000 units</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-amber-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-500">Downtime</h3>
            <span className="text-green-600 text-xs font-medium flex items-center">
              <TrendingUp size={14} className="mr-1" />
              -5.2%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">8.2 hours</p>
          <div className="text-xs text-gray-500 mt-1">Target: &lt;10 hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-500">First Pass Yield</h3>
            <span className="text-red-600 text-xs font-medium flex items-center">
              <TrendingUp size={14} className="mr-1" />
              -0.8%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">95.8%</p>
          <div className="text-xs text-gray-500 mt-1">Target: 98%</div>
        </div>
      </div>

      {/* Analytics Sections */}
      <div className="space-y-6">
        {/* Production Trend Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div 
            className="flex justify-between items-center px-4 py-3 border-b border-gray-100 cursor-pointer"
            onClick={() => toggleSection('production')}
          >
            <div className="flex items-center">
              <BarChart2 size={20} className="text-indigo-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Production Output Trend</h2>
            </div>
            {expandedSection === 'production' ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          <div className={`px-4 py-3 ${expandedSection === 'production' ? 'block' : 'hidden'}`}>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-gray-500" />
                <select className="block rounded-md border-gray-300 shadow-sm py-1 px-2 bg-white text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  <option>All Production Lines</option>
                  <option>Assembly Line A</option>
                  <option>Assembly Line B</option>
                </select>
              </div>
            </div>
            <div className="h-64">
              <Line 
                data={productionTrendData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    tooltip: {
                      mode: 'index' as const,
                      intersect: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      title: {
                        display: true,
                        text: 'Units Produced',
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Month',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* OEE by Department Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div 
            className="flex justify-between items-center px-4 py-3 border-b border-gray-100 cursor-pointer"
            onClick={() => toggleSection('oee')}
          >
            <div className="flex items-center">
              <BarChart2 size={20} className="text-green-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">OEE by Department</h2>
            </div>
            {expandedSection === 'oee' ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          <div className={`px-4 py-3 ${expandedSection === 'oee' ? 'block' : 'hidden'}`}>
            <div className="h-64">
              <Bar 
                data={oeeData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: 'OEE %',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Downtime Analysis */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div 
            className="flex justify-between items-center px-4 py-3 border-b border-gray-100 cursor-pointer"
            onClick={() => toggleSection('downtime')}
          >
            <div className="flex items-center">
              <BarChart2 size={20} className="text-red-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Downtime Analysis</h2>
            </div>
            {expandedSection === 'downtime' ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          <div className={`p-4 ${expandedSection === 'downtime' ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Downtime by Category</h3>
                <div className="h-64">
                  <Doughnut 
                    data={downtimeData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Top Downtime Reasons</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
                        <span className="text-sm text-gray-700">Machine Breakdown (Lathe 3)</span>
                      </div>
                      <span className="text-sm font-semibold">12.5 hrs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
                        <span className="text-sm text-gray-700">Material Delay (Supplier A)</span>
                      </div>
                      <span className="text-sm font-semibold">8.2 hrs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-600 mr-2"></div>
                        <span className="text-sm text-gray-700">Tool Change (Milling)</span>
                      </div>
                      <span className="text-sm font-semibold">6.7 hrs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-600 mr-2"></div>
                        <span className="text-sm text-gray-700">Power Outage</span>
                      </div>
                      <span className="text-sm font-semibold">4.5 hrs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                        <span className="text-sm text-gray-700">Operator Absence</span>
                      </div>
                      <span className="text-sm font-semibold">3.8 hrs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div 
            className="flex justify-between items-center px-4 py-3 border-b border-gray-100 cursor-pointer"
            onClick={() => toggleSection('quality')}
          >
            <div className="flex items-center">
              <BarChart2 size={20} className="text-amber-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Quality Metrics</h2>
            </div>
            {expandedSection === 'quality' ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </div>
          <div className={`px-4 py-3 ${expandedSection === 'quality' ? 'block' : 'hidden'}`}>
            <div className="h-64">
              <Bar 
                data={qualityData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    tooltip: {
                      mode: 'index' as const,
                      intersect: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Percentage (%)',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;