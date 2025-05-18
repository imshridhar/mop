import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiItem {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface KpiSummaryProps {
  kpis: KpiItem[];
}

const KpiSummary: React.FC<KpiSummaryProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {kpis.map((kpi, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-sm p-5 border-l-4 transition-transform duration-300 hover:scale-[1.02]"
          style={{ 
            borderLeftColor: kpi.trend === 'up' ? '#10B981' : 
              (kpi.name === 'Downtime' && kpi.trend === 'down' ? '#10B981' : '#EF4444')
          }}
        >
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-500">{kpi.name}</p>
            <div className={`flex items-center ${
              (kpi.trend === 'up' && kpi.name !== 'Downtime') || (kpi.trend === 'down' && kpi.name === 'Downtime') 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {kpi.trend === 'up' ? 
                <TrendingUp size={16} className="mr-1" /> : 
                <TrendingDown size={16} className="mr-1" />
              }
              <span className="text-xs font-medium">{kpi.change}</span>
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-800">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KpiSummary;