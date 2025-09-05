import React, { useState, useEffect } from 'react';
import { Publication, PublicationType, Category, AdminFormData } from '../types';

interface AdminFormModalProps {
  publication: Publication | null;
  categories: Category[];
  onClose: () => void;
  onSave: (publication: AdminFormData & { id?: number }) => void;
}

const initialFormData = {
    title: '',
    description: '',
    language: '',
    categoryId: '',
    type: PublicationType.Printed,
    browseUrl: '',
    downloadUrl: '',
    coverUrl: '',
};

const translatePublicationType = (type: PublicationType, toKey = false) => {
    const map: Record<PublicationType, string> = {
      [PublicationType.Printed]: "مطبوع",
      [PublicationType.Digital]: "رقمي",
      [PublicationType.Audio]: "صوتي",
      [PublicationType.Braille]: "برايل",
      [PublicationType.App]: "تطبيق",
      [PublicationType.Research]: "بحث",
      [PublicationType.Booklet]: "كتيب",
      [PublicationType.Recitation]: "تلاوة",
      [PublicationType.Riwaya]: "رواية",
    };
    if (toKey) {
        return Object.keys(map).find(key => map[key as PublicationType] === type) || type;
    }
    return map[type] || type;
};

export const AdminFormModal: React.FC<AdminFormModalProps> = ({ publication, categories, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (publication) {
      setFormData({
        title: publication.title,
        description: publication.description,
        language: publication.language,
        categoryId: publication.categoryId,
        type: publication.type,
        browseUrl: publication.browseUrl || '',
        downloadUrl: publication.downloadUrl || '',
        coverUrl: publication.coverUrl || '',
      });
    } else {
      setFormData({
          ...initialFormData,
          language: 'العربية',
          categoryId: categories[0]?.id || ''
      });
    }
  }, [publication, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.categoryId) {
      alert('الرجاء تعبئة الحقول المطلوبة.');
      return;
    }
    
    const saveData = {
        id: publication?.id,
        ...formData
    };
    onSave(saveData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">{publication ? 'تعديل الإصدار' : 'إضافة إصدار جديد'}</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 sm:p-8 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">العنوان</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light" />
            </div>
            <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">اللغة</label>
                <input type="text" name="language" id="language" value={formData.language} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light" />
            </div>
            
            <hr className="my-6"/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">القسم</label>
                <select name="categoryId" id="categoryId" value={formData.categoryId} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light">
                  <option value="" disabled>-- اختر قسماً --</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">النوع</label>
                <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light">
                  {Object.values(PublicationType).map(type => <option key={type} value={type}>{translatePublicationType(type)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="browseUrl" className="block text-sm font-medium text-gray-700">رابط التصفح (اختياري)</label>
              <input type="url" name="browseUrl" id="browseUrl" value={formData.browseUrl} onChange={handleChange} placeholder="https://" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light" />
            </div>
            <div>
              <label htmlFor="downloadUrl" className="block text-sm font-medium text-gray-700">رابط التحميل (اختياري)</label>
              <input type="url" name="downloadUrl" id="downloadUrl" value={formData.downloadUrl} onChange={handleChange} placeholder="https://" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light" />
            </div>
            <div>
              <label htmlFor="coverUrl" className="block text-sm font-medium text-gray-700">رابط صورة الغلاف</label>
              <input type="url" name="coverUrl" id="coverUrl" value={formData.coverUrl} onChange={handleChange} placeholder="اتركه فارغاً لتوليد صورة تلقائية" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light" />
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2 space-x-reverse sticky bottom-0 border-t">
            <button type="button" onClick={onClose} className="px-5 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
              إلغاء
            </button>
            <button type="submit" className="px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-brand-green-light hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-light">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
