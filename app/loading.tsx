import TechLoadingSpinner from '../components/TechLoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <TechLoadingSpinner 
        showText={false}
      />
    </div>
  );
} 