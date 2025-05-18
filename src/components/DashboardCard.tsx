import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  icon, 
  children,
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        {/* Optionally, you could add action buttons here */}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;