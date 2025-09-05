import React, { useState, useEffect } from 'react';
import { Publication, Category, AdminFormData } from '../types';
import { getPublications, getCategories } from '../services/publicationService';
import { AdminFormModal } from './AdminFormModal';
import { PublicationStatsModal } from './PublicationStatsModal';

interface AdminDashboardProps {
  onLogout: () => void;
  onBack: () => void;
}

/**
 * Admin dashboard component for managing publications and viewing statistics
 */
export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onBack }) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditingModalOpen, setEditingModalOpen] = useState(false);
  const [publicationToEdit, setPublicationToEdit] = useState<Publication | null>(null);
  const [statsPublication, setStatsPublication] = useState<Publication | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [pubs, cats] = await Promise.all([getPublications(), getCategories()]);
        setPublications(pubs);
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPublications = publications.filter(pub => {
    const matchesCategory = selectedCategory === 'all' || pub.categoryId === selectedCategory;
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddPublication = () => {
    setPublicationToEdit(null);
    setEditingModalOpen(true);
  };

  const handleEditPublication = (publication: Publication) => {
    setPublicationToEdit(publication);
    setEditingModalOpen(true);
  };

  const handleSavePublication = (publicationData: AdminFormData) => {
    if (publicationToEdit) {
      // Edit existing publication
      setPublications(pubs =>
        pubs.map(pub =>
          pub.id === publicationToEdit.id
            ? { ...pub, ...publicationData }
            : pub
        )
      );
    } else {
      // Add new publication
      const newPublication: Publication = {
        ...publicationData,
        id: Date.now(),
        coverUrl: publicationData.coverUrl || `https://picsum.photos/seed/${Date.now()}/400/600`,
      } as Publication;
      setPublications(pubs => [newPublication, ...pubs]);
    }
    setEditingModalOpen(false);
  };

  const handleDeletePublication = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنشور؟')) {
      setPublications(pubs => pubs.filter(pub => pub.id !== id));
    }
  };

  const handleViewStats = (publication: Publication) => {
    setStatsPublication(publication);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Admin Header */}
      <header className="bg-brand-green-dark shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <img
                src="/images/quran-complex-logo.png"
                alt="شعار مجمع الملك فهد لطباعة المصحف الشريف"
                className="h-12 w-auto object-contain"
              />
              <div>
                <h1 className="text-white text-lg font-bold">لوحة تحكم المشرف</h1>
                <p className="text-white/80 text-sm">إدارة المكتبة الرقمية</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي المنشورات</p>
                <p className="text-2xl font-bold text-gray-900">{publications.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الفئات</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">المشاهدات</p>
                <p className="text-2xl font-bold text-gray-900">
                  {publications.reduce((sum, pub) => sum + (pub.stats?.views || 0), 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">التحميلات</p>
                <p className="text-2xl font-bold text-gray-900">
                  {publications.reduce((sum, pub) => sum + (pub.stats?.downloads || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث في المنشورات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-light focus:border-transparent text-right"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-light focus:border-transparent"
              >
                <option value="all">جميع الفئات</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddPublication}
              className="bg-brand-green-light hover:bg-brand-green-dark text-white px-6 py-2 rounded-lg transition-colors font-semibold"
            >
              إضافة منشور جديد
            </button>
          </div>
        </div>

        {/* Publications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الغلاف
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العنوان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإحصائيات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      جاري التحميل...
                    </td>
                  </tr>
                ) : filteredPublications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      لا توجد منشورات
                    </td>
                  </tr>
                ) : (
                  filteredPublications.map((publication) => (
                    <tr key={publication.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={publication.coverUrl}
                          alt={publication.title}
                          className="h-12 w-8 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {publication.title}
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {publication.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {categories.find(cat => cat.id === publication.categoryId)?.name || 'غير محدد'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {publication.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex space-x-2 space-x-reverse">
                          <span className="text-blue-600">{publication.stats?.views || 0} مشاهدة</span>
                          <span className="text-green-600">{publication.stats?.downloads || 0} تحميل</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleViewStats(publication)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            إحصائيات
                          </button>
                          <button
                            onClick={() => handleEditPublication(publication)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDeletePublication(publication.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEditingModalOpen && (
        <AdminFormModal
          publication={publicationToEdit}
          categories={categories}
          onSave={handleSavePublication}
          onClose={() => setEditingModalOpen(false)}
        />
      )}

      {statsPublication && (
        <PublicationStatsModal
          publication={statsPublication}
          onClose={() => setStatsPublication(null)}
        />
      )}
    </div>
  );
};
