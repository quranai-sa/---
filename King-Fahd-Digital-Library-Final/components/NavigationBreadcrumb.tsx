import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavigationBreadcrumbProps {
  items: BreadcrumbItem[];
  onBackToHome?: () => void;
}

/**
 * Navigation breadcrumb component for easy navigation between pages
 */
export const NavigationBreadcrumb: React.FC<NavigationBreadcrumbProps> = ({ 
  items, 
  onBackToHome 
}) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="flex items-center text-brand-green-light hover:text-brand-green-dark transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                الصفحة الرئيسية
              </button>
            )}
            
            {items.length > 0 && (
              <>
                <span className="text-gray-400">|</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  {items.map((item, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                      {item.onClick ? (
                        <button
                          onClick={item.onClick}
                          className="text-gray-600 hover:text-brand-green-light transition-colors text-sm"
                        >
                          {item.label}
                        </button>
                      ) : item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-600 hover:text-brand-green-light transition-colors text-sm"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-gray-900 font-medium text-sm">
                          {item.label}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="bg-brand-green-light hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                العودة للرئيسية
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
