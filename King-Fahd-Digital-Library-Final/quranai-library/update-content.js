// ملف تحديث المحتوى لمكتبة مجمع الملك فهد الرقمية
// يحتوي على جميع التعديلات المطلوبة

const contentUpdates = {
    // 1. تغيير "بحثي" إلى "بحث"
    searchText: {
        old: "بحثي",
        new: "بحث"
    },

    // 2. إضافة "رواية" في النوع
    addRiwayaType: true,

    // 3. دمج الكتب الصوتية مع الإصدارات الصوتية
    mergeAudioSections: {
        old: ["الكتب الصوتية", "الإصدارات الصوتية"],
        new: "الإصدارات والكتب الصوتية"
    },

    // 4. تحديث وصف المنصة
    updateDescription: {
        old: "منصة متقدمة للوصول إلى الإصدارات القرآنية والترجمات والتفاسير والتطبيقات الرسمية",
        new: "منصة متقدمة للوصول إلى إصدارات المجمع الرقمية"
    },

    // 5. معلومات التواصل من الموقع الرسمي
    contactInfo: {
        address: "المدينة المنورة - المملكة العربية السعودية",
        phone: "+966 14 832 0000",
        email: "info@qurancomplex.gov.sa",
        website: "https://qurancomplex.gov.sa",
        workingHours: "الأحد - الخميس: 8:00 ص - 5:00 م"
    },

    // 6. برامج التواصل الاجتماعي
    socialMedia: {
        twitter: "https://twitter.com/qurancomplex",
        facebook: "https://facebook.com/qurancomplex",
        instagram: "https://instagram.com/qurancomplex",
        youtube: "https://youtube.com/qurancomplex",
        linkedin: "https://linkedin.com/company/qurancomplex"
    },

    // 7. إحصائيات احترافية
    statistics: {
        publications: "190,000+",
        languages: "100+",
        countries: "4",
        years: "40+"
    }
};

// تطبيق التحديثات
function applyContentUpdates() {
    // تحديث النصوص في الصفحة
    updateTextContent();
    
    // تحديث معلومات التواصل
    addContactInfo();
    
    // إضافة برامج التواصل الاجتماعي
    addSocialMedia();
    
    // تحديث الإحصائيات
    updateStatistics();
    
    // إصلاح الشعار
    fixLogo();
    
    console.log("تم تطبيق جميع التحديثات بنجاح");
}

// تحديث النصوص
function updateTextContent() {
    // تغيير "بحثي" إلى "بحث"
    document.body.innerHTML = document.body.innerHTML.replace(/بحثي/g, contentUpdates.searchText.new);
    
    // دمج الأقسام الصوتية
    document.body.innerHTML = document.body.innerHTML.replace(
        /الكتب الصوتية.*?الإصدارات الصوتية/g, 
        contentUpdates.mergeAudioSections.new
    );
    
    // تحديث الوصف
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = metaDescription.content.replace(
            contentUpdates.updateDescription.old,
            contentUpdates.updateDescription.new
        );
    }
    
    // تحديث العنوان
    document.title = document.title.replace(
        contentUpdates.updateDescription.old,
        contentUpdates.updateDescription.new
    );
}

// إضافة معلومات التواصل
function addContactInfo() {
    const contactSection = `
        <div class="contact-section bg-brand-green-dark text-white py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">تواصل معنا</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="text-4xl mb-4">📍</div>
                        <h3 class="text-xl font-semibold mb-2">العنوان</h3>
                        <p>${contentUpdates.contactInfo.address}</p>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl mb-4">📞</div>
                        <h3 class="text-xl font-semibold mb-2">الهاتف</h3>
                        <p>${contentUpdates.contactInfo.phone}</p>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl mb-4">✉️</div>
                        <h3 class="text-xl font-semibold mb-2">البريد الإلكتروني</h3>
                        <p>${contentUpdates.contactInfo.email}</p>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl mb-4">🌐</div>
                        <h3 class="text-xl font-semibold mb-2">الموقع الرسمي</h3>
                        <p><a href="${contentUpdates.contactInfo.website}" class="text-brand-gold hover:underline">${contentUpdates.contactInfo.website}</a></p>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl mb-4">🕒</div>
                        <h3 class="text-xl font-semibold mb-2">أوقات العمل</h3>
                        <p>${contentUpdates.contactInfo.workingHours}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة قسم التواصل قبل التذييل
    const footer = document.querySelector('footer') || document.querySelector('.footer');
    if (footer) {
        footer.insertAdjacentHTML('beforebegin', contactSection);
    } else {
        document.body.insertAdjacentHTML('beforeend', contactSection);
    }
}

// إضافة برامج التواصل الاجتماعي
function addSocialMedia() {
    const socialMediaSection = `
        <div class="social-media-section bg-brand-bg py-12">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-2xl font-bold text-brand-green-dark mb-8">تابعنا على وسائل التواصل الاجتماعي</h2>
                <div class="flex justify-center space-x-6 space-x-reverse">
                    <a href="${contentUpdates.socialMedia.twitter}" target="_blank" class="social-link bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </a>
                    <a href="${contentUpdates.socialMedia.facebook}" target="_blank" class="social-link bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>
                    <a href="${contentUpdates.socialMedia.instagram}" target="_blank" class="social-link bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281h-1.969v1.969h1.969V7.707zm-1.969 9.281c-1.297 0-2.448-.49-3.323-1.297-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
                        </svg>
                    </a>
                    <a href="${contentUpdates.socialMedia.youtube}" target="_blank" class="social-link bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                    <a href="${contentUpdates.socialMedia.linkedin}" target="_blank" class="social-link bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // إضافة قسم التواصل الاجتماعي
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.insertAdjacentHTML('afterend', socialMediaSection);
    } else {
        document.body.insertAdjacentHTML('beforeend', socialMediaSection);
    }
}

// تحديث الإحصائيات
function updateStatistics() {
    const statsElements = document.querySelectorAll('[data-stat]');
    statsElements.forEach(element => {
        const statType = element.getAttribute('data-stat');
        if (contentUpdates.statistics[statType]) {
            element.textContent = contentUpdates.statistics[statType];
        }
    });
    
    // إضافة تنسيق احترافي للإحصائيات
    const style = document.createElement('style');
    style.textContent = `
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #054231;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .stat-label {
            font-size: 1.1rem;
            color: #666;
            margin-top: 0.5rem;
        }
        .stat-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .stat-card:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
}

// إصلاح الشعار
function fixLogo() {
    const logoImg = document.querySelector('img[src*="quran-complex-logo"]');
    if (logoImg) {
        // إضافة معالج خطأ للشعار
        logoImg.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDU0MjMxIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+QjzwvdGV4dD4KPC9zdmc+';
        };
        
        // إضافة CSS للشعار
        logoImg.style.cssText = `
            max-width: 120px;
            max-height: 120px;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        `;
    }
}

// تشغيل التحديثات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(applyContentUpdates, 1000); // تأخير قصير للتأكد من تحميل الصفحة
});

// تصدير الوظائف للاستخدام الخارجي
window.ContentUpdater = {
    applyUpdates: applyContentUpdates,
    updateText: updateTextContent,
    addContact: addContactInfo,
    addSocial: addSocialMedia,
    updateStats: updateStatistics,
    fixLogo: fixLogo
};
