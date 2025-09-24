import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusCard = ({ title, status, lastUpdated, details }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'error':
        return 'bg-error/10';
      default:
        return 'bg-muted/10';
    }
  };

  const formatLastUpdated = (timestamp) => {
    const now = new Date();
    const updated = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updated) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return updated?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-heading font-semibold text-foreground">{title}</h4>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getStatusBg(status)}`}>
          <Icon name={getStatusIcon(status)} size={12} className={getStatusColor(status)} />
          <span className={`text-xs font-caption capitalize ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>
      <p className="text-xs font-caption text-muted-foreground mb-2">
        Last updated: {formatLastUpdated(lastUpdated)}
      </p>
      {details && (
        <div className="space-y-1">
          {details?.map((detail, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="font-body text-muted-foreground">{detail?.label}</span>
              <span className="font-mono text-foreground">{detail?.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SystemStatusCard;