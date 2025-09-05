import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
  onBack: () => void;
}

/**
 * Admin login component for secure access to admin features
 */
export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (password === 'KFQPC@2024#Admin$Secure!') {
        onLogin(password);
      } else {
        setError('كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ في تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-green-dark to-brand-green-light flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/images/quran-complex-logo.png"
            alt="شعار مجمع الملك فهد لطباعة المصحف الشريف"
            className="h-20 w-auto object-contain mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">
            تسجيل دخول المشرف
          </h1>
          <p className="text-white/80 text-sm">
            مجمع الملك فهد لطباعة المصحف الشريف
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-light focus:border-transparent text-right"
                placeholder="أدخل كلمة المرور"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-green-light hover:bg-brand-green-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </button>
            </div>
          </form>

          {/* Admin Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">معلومات تسجيل الدخول:</p>
              <p className="font-mono bg-gray-100 px-3 py-1 rounded text-xs">
                كلمة المرور: admin123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} مجمع الملك فهد لطباعة المصحف الشريف
          </p>
        </div>
      </div>
    </div>
  );
};
