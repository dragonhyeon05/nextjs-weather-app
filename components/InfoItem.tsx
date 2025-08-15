import React from 'react';

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

export function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-6 w-6 text-slate-400" />
      <div>
        <p className="text-lg font-bold">{value}</p>
        <p className="text-xs text-slate-400 -mt-1">{label}</p>
      </div>
    </div>
  );
}