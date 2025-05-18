import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement,
  LineElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProductionProgress: React.FC = () => {
  // Sample data for production progress by product line
  const productionData = {
    labels: ['Assembly Line A', 'Assembly Line B', 'Machine Shop', 'Fabrication', 'Packaging'],
    datasets: [
      {
        label: 'Actual',
        data: [120, 95, 85, 110, 75],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
      {
        label: 'Target',
        data: [100, 100, 100, 100, 100],
        backgroundColor: 'rgba(209, 213, 219, 0.5)',
        borderColor: 'rgba(156, 163, 175, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Units Produced',
          font: {
            size: 12,
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Production Lines',
          font: {
            size: 12,
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} units`;
          }
        }
      }
    },
    animation: {
      duration: 1000,
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <select className="text-sm border border-gray-300 rounded-md p-1">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Actual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-600">Target</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <Bar data={productionData} options={options} />
      </div>
    </div>
  );
};

export default ProductionProgress;