import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, PenTool as Tool } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { useTranslation } from 'react-i18next';

const WorkerDashboard: React.FC = () => {
  const { t } = useTranslation();

  // Mock data for worker's assigned tasks
  const assignedTasks = [
    {
      id: 'TASK-001',
      workOrder: 'WO-1234',
      product: 'Motor Housing A-12',
      startTime: '09:00 AM',
      status: 'in_progress',
      completionPercentage: 75
    },
    {
      id: 'TASK-002',
      workOrder: 'WO-1235',
      product: 'Gear Assembly B-45',
      startTime: '02:00 PM',
      status: 'pending',
      completionPercentage: 0
    }
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('worker.dashboard')}</h1>
        <div className="flex items-center space-x-2">
          <Clock className="text-gray-500" size={20} />
          <span className="text-gray-600">08:45:32</span>
        </div>
      </div>

      {/* Current Task */}
      <DashboardCard 
        title={t('worker.currentTask')} 
        icon={<Tool className="text-indigo-600" />}
        className="mb-6"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Motor Housing A-12</h3>
              <p className="text-sm text-gray-500">WO-1234</p>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                In Progress
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 block">Start Time</span>
              <span className="font-medium">09:00 AM</span>
            </div>
            <div>
              <span className="text-gray-500 block">Estimated Completion</span>
              <span className="font-medium">11:30 AM</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200">
              Report Issue
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Mark Complete
            </button>
          </div>
        </div>
      </DashboardCard>

      {/* Upcoming Tasks */}
      <DashboardCard 
        title={t('worker.upcomingTasks')} 
        icon={<CheckCircle2 className="text-green-600" />}
      >
        <div className="space-y-4">
          {assignedTasks.map(task => (
            <div key={task.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{task.product}</h4>
                  <p className="text-sm text-gray-500">{task.workOrder}</p>
                </div>
                <span className="text-sm text-gray-500">{task.startTime}</span>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
};

export default WorkerDashboard;