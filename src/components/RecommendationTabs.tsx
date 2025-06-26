import React from 'react';
import { Brain, Users, Zap } from 'lucide-react';

interface RecommendationTabsProps {
  activeTab: 'hybrid' | 'content' | 'collaborative';
  onTabChange: (tab: 'hybrid' | 'content' | 'collaborative') => void;
}

export const RecommendationTabs: React.FC<RecommendationTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    {
      id: 'hybrid' as const,
      label: 'Smart Mix',
      icon: Zap,
      description: 'Best of both algorithms'
    },
    {
      id: 'content' as const,
      label: 'Similar Movies',
      icon: Brain,
      description: 'Based on your preferences'
    },
    {
      id: 'collaborative' as const,
      label: 'Popular Choice',
      icon: Users,
      description: 'What others like you enjoy'
    }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 p-4 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
              <div className="text-left">
                <div className="font-semibold">{tab.label}</div>
                <div className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                  {tab.description}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};