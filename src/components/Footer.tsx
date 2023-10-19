import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-center w-full absolute bottom-0">
      <div className="bg-300 w-full mx-auto">
        &copy; {new Date().getFullYear()} Cantek Group
      </div>
    </footer>
  );
};
