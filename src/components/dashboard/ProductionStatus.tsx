import React from 'react';
import { Clock } from 'lucide-react';

interface ProductionStatusData {
  target: number;
  current: number;
  percentComplete: number;
  timeRemaining: string;
}

interface ProductionStatusProps {
  data: ProductionStatusData;
}

const ProductionStatus: React.FC<ProductionStatusProps> = ({ data }) => {
  // Calculate colors based on progress
  const getProgressColor = (percent: number) => {
    if (percent < 40) return 'bg-red-500';
    if (percent < 70) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Current</span>
        <span className="font-semibold">{data.current} units</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">Target</span>
        <span className="font-semibold">{data.target} units</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-4 bg-gray-200 rounded-full my-3">
        <div 
          className={`h-full rounded-full ${getProgressColor(data.percentComplete)} transition-all duration-700 ease-in-out`}
          style={{ width: `${data.percentComplete}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="font-medium text-lg">{data.percentComplete.toFixed(1)}% Complete</span>
        <div className="flex items-center text-amber-600">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">{data.timeRemaining} remaining</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
          View Production Details
        </button>
      </div>
    </div>
  );
};

export default ProductionStatus;