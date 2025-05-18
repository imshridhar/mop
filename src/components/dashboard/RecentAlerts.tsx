import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface Alert {
  id: number;
  level: 'info' | 'warning' | 'error';
  message: string;
  time: string;
}

interface RecentAlertsProps {
  alerts: Alert[];
}

const RecentAlerts: React.FC<RecentAlertsProps> = ({ alerts }) => {
  // Get appropriate icon and colors based on alert level
  const getAlertStyle = (level: string) => {
    switch (level) {
      case 'error':
        return {
          icon: <AlertCircle className="text-red-500" size={18} />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="text-amber-500" size={18} />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200'
        };
      case 'info':
      default:
        return {
          icon: <Info className="text-blue-500" size={18} />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
    }
  };

  return (
    <div className="flex flex-col">
      {alerts.map((alert) => {
        const { icon, bgColor, borderColor } = getAlertStyle(alert.level);
        
        return (
          <div 
            key={alert.id}
            className={`mb-3 p-3 ${bgColor} border ${borderColor} rounded-md transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="mt-2 text-center">
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          View All Alerts →
        </button>
      </div>
    </div>
  );
};

export default RecentAlerts;