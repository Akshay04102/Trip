import React from 'react';

// Card Component
export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// Card Header Component
export const CardHeader = ({ children }) => {
  return (
    <div className="bg-gray-100 p-4 border-b">
      <h3 className="text-xl font-semibold">{children}</h3>
    </div>
  );
};

// Card Title Component
export const CardTitle = ({ children }) => {
  return (
    <h3 className="text-lg font-bold text-gray-800">
      {children}
    </h3>
  );
};

// Card Content Component
export const CardContent = ({ children }) => {
  return (
    <div className="p-4">
      {children}
    </div>
  );
};

// Card Description Component
export const CardDescription = ({ children }) => {
  return (
    <p className="text-gray-600">{children}</p>
  );
};
