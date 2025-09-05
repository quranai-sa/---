// نظام تكامل لوحة تحكم المشرف
class AdminIntegration {
    constructor() {
        this.changes = this.loadChanges();
        this.applyChanges();
        this.setupEventListeners();
    }

    // تحميل التغييرات المحفوظة
    loadChanges() {
        const savedChanges = localStorage.getItem('adminChanges');
        return savedChanges ? JSON.parse(savedChanges) : {};
    }

    // تطبيق التغييرات على الصفحة
    applyChanges() {
        Object.keys(this.changes).forEach(elementId => {
            const change = this.changes[elementId];
            this.applyElementChange(elementId, change);
        });
    }

    // تطبيق تغيير على عنصر محدد
    applyElementChange(elementId, change) {
        if (change.type === 'text') {
            this.updateTextElement(elementId, change);
        } else if (change.type === 'design') {
            this.updateDesignElement(change);
        }
    }

    // تحديث عنصر نص
    updateTextElement(elementId, change) {
        const element = this.findElement(elementId);
        if (element) {
            element.textContent = change.content;
            
            // تطبيق الأنماط
            if (change.style) {
                element.style.fontWeight = change.style === 'bold' ? 'bold' : 'normal';
                element.style.fontStyle = change.style === 'italic' ? 'italic' : 'normal';
                element.style.textDecoration = change.style === 'underline' ? 'underline' : 'none';
            }
            
            // تطبيق الحجم
            if (change.size) {
                element.className = element.className.replace(/text-\w+/g, '') + ' ' + change.size;
            }
        }
    }

    // تحديث التصميم
    updateDesignElement(change) {
        if (change.colors) {
            const root = document.documentElement;
            root.style.setProperty('--brand-green-dark', change.colors.darkGreen);
            root.style.setProperty('--brand-green-light', change.colors.lightGreen);
            root.style.setProperty('--brand-gold', change.colors.gold);
            root.style.setProperty('--brand-bg', change.colors.bg);
        }
        
        if (change.fontFamily) {
            document.body.style.fontFamily = change.fontFamily;
        }
    }

    // البحث عن عنصر في الصفحة
    findElement(elementId) {
        const selectors = {
            'title': 'h1, .title, [data-element="title"]',
            'subtitle': 'h2, .subtitle, [data-element="subtitle"]',
            'features': '.features, [data-element="features"]',
            'footer': 'footer, .footer, [data-element="footer"]'
        };
        
        const selector = selectors[elementId];
        if (selector) {
            return document.querySelector(selector);
        }
        return null;
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // مراقبة التغييرات من لوحة التحكم
        window.addEventListener('storage', (e) => {
            if (e.key === 'adminChanges') {
                this.changes = JSON.parse(e.newValue);
                this.applyChanges();
            }
        });

        // مراقبة التغييرات في الصفحة
        this.observePageChanges();
    }

    // مراقبة تغييرات الصفحة
    observePageChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // إعادة تطبيق التغييرات عند تغيير DOM
                    setTimeout(() => {
                        this.applyChanges();
                    }, 100);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // تحديث معاينة مباشرة
    updatePreview() {
        this.changes = this.loadChanges();
        this.applyChanges();
    }

    // حفظ التغييرات
    saveChanges() {
        localStorage.setItem('adminChanges', JSON.stringify(this.changes));
    }

    // إعادة تعيين التغييرات
    resetChanges() {
        this.changes = {};
        localStorage.removeItem('adminChanges');
        location.reload();
    }
}

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.adminIntegration = new AdminIntegration();
});

// وظائف مساعدة للوصول من لوحة التحكم
window.AdminHelper = {
    // تحديث معاينة مباشرة
    updatePreview: () => {
        if (window.adminIntegration) {
            window.adminIntegration.updatePreview();
        }
    },
    
    // حفظ التغييرات
    saveChanges: () => {
        if (window.adminIntegration) {
            window.adminIntegration.saveChanges();
        }
    },
    
    // إعادة تعيين
    resetChanges: () => {
        if (window.adminIntegration) {
            window.adminIntegration.resetChanges();
        }
    }
};
