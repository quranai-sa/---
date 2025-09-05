import React from 'react';
import { NavigationBreadcrumb } from './NavigationBreadcrumb';

interface ContactPageProps {
  onBackToHome?: () => void;
}

/**
 * Contact page component for the King Fahd Complex Digital Library
 * Displays official contact information and social media links
 */
export const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Navigation Breadcrumb */}
      <NavigationBreadcrumb
        items={[
          { label: 'تواصل معنا' }
        ]}
        onBackToHome={onBackToHome}
      />
      
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <img
                src="/images/quran-complex-logo.png"
                alt="شعار مجمع الملك فهد لطباعة المصحف الشريف"
                className="h-24 w-auto object-contain mb-6 mx-auto"
              />
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                تواصل معنا
              </h1>
              <p className="text-xl text-gray-600">
                مجمع الملك فهد لطباعة المصحف الشريف
              </p>
            </div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Official Address */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-brand-green-light p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">العنوان الرسمي</h3>
                </div>
                <div className="text-gray-600 space-y-2">
                  <p className="font-semibold">مجمع الملك فهد لطباعة المصحف الشريف</p>
                  <p>المدينة المنورة - المملكة العربية السعودية</p>
                  <p>ص.ب: 6262</p>
                  <p>الرمز البريدي: 42382</p>
                </div>
              </div>

              {/* Contact Numbers */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-brand-green-light p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">أرقام التواصل</h3>
                </div>
                <div className="text-gray-600 space-y-2">
                  <p><span className="font-semibold">الهاتف:</span> +966 14 832 0000</p>
                  <p><span className="font-semibold">الفاكس:</span> +966 14 832 0001</p>
                  <p><span className="font-semibold">البريد الإلكتروني:</span></p>
                  <p className="text-brand-green-light">info@qurancomplex.gov.sa</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-brand-green-light p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">أوقات العمل</h3>
                </div>
                <div className="text-gray-600 space-y-2">
                  <p><span className="font-semibold">الأحد - الخميس:</span> 8:00 ص - 5:00 م</p>
                  <p><span className="font-semibold">الجمعة:</span> مغلق</p>
                  <p><span className="font-semibold">السبت:</span> 8:00 ص - 12:00 م</p>
                  <p className="text-sm text-gray-500 mt-2">* أوقات العمل حسب التوقيت المحلي للمدينة المنورة</p>
                </div>
              </div>

              {/* Official Website */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-brand-green-light p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">الموقع الرسمي</h3>
                </div>
                <div className="text-gray-600">
                  <p className="mb-2">الموقع الرسمي لمجمع الملك فهد</p>
                  <a 
                    href="https://qurancomplex.gov.sa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-green-light hover:text-brand-green-dark transition-colors font-semibold"
                  >
                    qurancomplex.gov.sa
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                تابعنا على وسائل التواصل الاجتماعي
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {/* Twitter */}
                <a 
                  href="https://twitter.com/qurancomplex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="bg-blue-500 p-3 rounded-full mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">تويتر</span>
                  <span className="text-xs text-gray-500">@qurancomplex</span>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com/@qurancomplex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="bg-red-500 p-3 rounded-full mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">يوتيوب</span>
                  <span className="text-xs text-gray-500">@qurancomplex</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com/qurancomplex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">إنستغرام</span>
                  <span className="text-xs text-gray-500">@qurancomplex</span>
                </a>

                {/* Facebook */}
                <a 
                  href="https://facebook.com/qurancomplex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="bg-blue-600 p-3 rounded-full mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">فيسبوك</span>
                  <span className="text-xs text-gray-500">@qurancomplex</span>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com/company/qurancomplex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="bg-blue-700 p-3 rounded-full mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">لينكد إن</span>
                  <span className="text-xs text-gray-500">@qurancomplex</span>
                </a>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-r from-brand-green-dark to-brand-green-light text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                معلومات إضافية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">الخدمات المتاحة</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• توزيع المصاحف والترجمات</li>
                    <li>• الإصدارات والكتب الصوتية وبرايل</li>
                    <li>• خطوط حاسوبية مجانية</li>
                    <li>• تطبيقات الهواتف الذكية</li>
                    <li>• البحوث والدراسات القرآنية</li>
                    <li>• روايات القرآن الكريم</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">الرؤية والرسالة</h3>
                  <p className="text-sm leading-relaxed">
                    يسعى المجمع إلى نشر كتاب الله الكريم وخدمته بأفضل الوسائل التقنية، 
                    مع الحفاظ على دقة النص القرآني وضمان جودة الإنتاج في جميع إصدارات.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};