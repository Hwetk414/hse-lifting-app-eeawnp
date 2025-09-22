
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('app_language', lang);
      setLanguageState(lang);
      console.log('Language changed to:', lang);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    // Main Screen
    'app.title': 'HSE Management System',
    'app.subtitle': 'Comprehensive Health, Safety & Environmental resources',
    'lifting.operations': 'Lifting Operations',
    'hse.standards': 'HSE Standards & Compliance',
    'safety.first': 'Safety First',
    'safety.message': 'Always follow proper HSE procedures and conduct thorough risk assessments before any operation. When in doubt, stop work and consult with safety professionals.',
    'standards.coverage': 'Standards Coverage',
    'standards.message': 'This app covers OSHA, NFPA, ANSI, API, Saudi Aramco, and other international HSE standards. Resources are regularly updated to reflect current regulations.',
    'language.settings': 'Language Settings',
    'select.language': 'Select Language',
    'english': 'English',
    'arabic': 'العربية',
    
    // Lifting Operations
    'lifting.calculator': 'Lifting Plan Calculator',
    'lifting.calculator.desc': 'Calculate lifting parameters and safety factors',
    'lifting.resources': 'Lifting Resources',
    'lifting.resources.desc': 'Guidelines, checklists, and safety procedures',
    'critical.lifting': 'Critical Lifting Plan',
    'critical.lifting.desc': 'Critical lift planning, risk assessment, and procedures',
    'risk.assessment': 'Risk Assessment',
    'risk.assessment.desc': 'Evaluate lifting operation risks',
    'equipment.database': 'Equipment Database',
    'equipment.database.desc': 'Crane specifications and load charts',
    
    // HSE Categories
    'fire.safety': 'Fire Safety & Prevention',
    'fire.safety.desc': 'Fire safety standards, prevention, and emergency response',
    'chemical.safety': 'Chemical Safety',
    'chemical.safety.desc': 'Chemical handling, storage, and hazard communication',
    'electrical.safety': 'Electrical Safety',
    'electrical.safety.desc': 'Electrical hazards, lockout/tagout, and safety procedures',
    'fall.protection': 'Fall Protection',
    'fall.protection.desc': 'Working at height safety and fall protection systems',
    'ladder.safety': 'Ladder Safety',
    'ladder.safety.desc': 'Ladder selection, inspection, setup, and safe use practices',
    'lifeline.safety': 'Lifeline Safety',
    'lifeline.safety.desc': 'Lifeline systems, rope access, and anchorage requirements',
    'scaffolding.standards': 'Scaffolding Standards',
    'scaffolding.standards.desc': 'Scaffold erection, inspection, and safety requirements',
    'excavations': 'Excavations',
    'excavations.desc': 'Excavation safety, soil classification, and protective systems',
    'confined.space': 'Confined Space',
    'confined.space.desc': 'Confined space entry procedures and safety requirements',
    'ppe.standards': 'Personal Protective Equipment',
    'ppe.standards.desc': 'PPE selection, use, and maintenance standards',
    'emergency.response': 'Emergency Response',
    'emergency.response.desc': 'Emergency procedures, evacuation, and incident response',
    'environmental.compliance': 'Environmental Compliance',
    'environmental.compliance.desc': 'Environmental regulations and compliance requirements',
    'hot.work': 'Hot Work Operations',
    'hot.work.desc': 'Hot work permits, fire watch, and welding safety standards',
    
    // Common UI
    'search.placeholder': 'Search standards, procedures, or organizations',
    'filter.by.organization': 'Filter by Organization',
    'available.resources': 'Available Resources',
    'no.results': 'No resources found matching your search criteria',
    'compliance.notice': 'Compliance Notice',
    'compliance.message': 'These resources are based on current OSHA, Saudi Aramco, and industry standards. Always verify with the latest regulations and your company\'s specific procedures. Consult qualified professionals for complex lifting operations.',
    'back': 'Back',
    'all': 'All',
    'search.resources': 'Search Resources',
    
    // Equipment Database
    'add.equipment': 'Add Equipment',
    'equipment.name': 'Equipment Name',
    'equipment.type': 'Equipment Type',
    'capacity': 'Capacity (tons)',
    'max.radius': 'Max Radius (m)',
    'max.height': 'Max Height (m)',
    'manufacturer': 'Manufacturer',
    'model': 'Model',
    'year': 'Year',
    'serial.number': 'Serial Number',
    'certification.date': 'Certification Date',
    'load.chart': 'Load Chart',
    'radius': 'Radius (m)',
    'add.point': 'Add Point',
    'save.equipment': 'Save Equipment',
    'cancel': 'Cancel',
    'mobile': 'Mobile Crane',
    'tower': 'Tower Crane',
    'crawler': 'Crawler Crane',
    'overhead': 'Overhead Crane',
  },
  ar: {
    // Main Screen
    'app.title': 'نظام إدارة الصحة والسلامة والبيئة',
    'app.subtitle': 'موارد شاملة للصحة والسلامة والبيئة',
    'lifting.operations': 'عمليات الرفع',
    'hse.standards': 'معايير الصحة والسلامة والبيئة',
    'safety.first': 'السلامة أولاً',
    'safety.message': 'اتبع دائماً إجراءات الصحة والسلامة والبيئة المناسبة وقم بإجراء تقييمات شاملة للمخاطر قبل أي عملية. عند الشك، توقف عن العمل واستشر متخصصي السلامة.',
    'standards.coverage': 'تغطية المعايير',
    'standards.message': 'يغطي هذا التطبيق معايير OSHA وNFPA وANSI وAPI وأرامكو السعودية ومعايير دولية أخرى. يتم تحديث الموارد بانتظام لتعكس اللوائح الحالية.',
    'language.settings': 'إعدادات اللغة',
    'select.language': 'اختر اللغة',
    'english': 'English',
    'arabic': 'العربية',
    
    // Lifting Operations
    'lifting.calculator': 'حاسبة خطة الرفع',
    'lifting.calculator.desc': 'حساب معاملات الرفع وعوامل السلامة',
    'lifting.resources': 'موارد الرفع',
    'lifting.resources.desc': 'إرشادات وقوائم مراجعة وإجراءات السلامة',
    'critical.lifting': 'خطة الرفع الحرجة',
    'critical.lifting.desc': 'تخطيط الرفع الحرج وتقييم المخاطر والإجراءات',
    'risk.assessment': 'تقييم المخاطر',
    'risk.assessment.desc': 'تقييم مخاطر عمليات الرفع',
    'equipment.database': 'قاعدة بيانات المعدات',
    'equipment.database.desc': 'مواصفات الرافعات وجداول الأحمال',
    
    // HSE Categories
    'fire.safety': 'السلامة من الحرائق والوقاية',
    'fire.safety.desc': 'معايير السلامة من الحرائق والوقاية والاستجابة للطوارئ',
    'chemical.safety': 'السلامة الكيميائية',
    'chemical.safety.desc': 'التعامل مع المواد الكيميائية والتخزين والتواصل حول المخاطر',
    'electrical.safety': 'السلامة الكهربائية',
    'electrical.safety.desc': 'المخاطر الكهربائية وإجراءات القفل/العلامة والسلامة',
    'fall.protection': 'الحماية من السقوط',
    'fall.protection.desc': 'سلامة العمل على الارتفاع وأنظمة الحماية من السقوط',
    'ladder.safety': 'سلامة السلالم',
    'ladder.safety.desc': 'اختيار السلالم والفحص والإعداد وممارسات الاستخدام الآمن',
    'lifeline.safety': 'سلامة خطوط الحياة',
    'lifeline.safety.desc': 'أنظمة خطوط الحياة والوصول بالحبال ومتطلبات التثبيت',
    'scaffolding.standards': 'معايير السقالات',
    'scaffolding.standards.desc': 'تركيب السقالات والفحص ومتطلبات السلامة',
    'excavations': 'الحفريات',
    'excavations.desc': 'سلامة الحفريات وتصنيف التربة والأنظمة الوقائية',
    'confined.space': 'المساحات المحصورة',
    'confined.space.desc': 'إجراءات دخول المساحات المحصورة ومتطلبات السلامة',
    'ppe.standards': 'معدات الحماية الشخصية',
    'ppe.standards.desc': 'اختيار واستخدام وصيانة معدات الحماية الشخصية',
    'emergency.response': 'الاستجابة للطوارئ',
    'emergency.response.desc': 'إجراءات الطوارئ والإخلاء والاستجابة للحوادث',
    'environmental.compliance': 'الامتثال البيئي',
    'environmental.compliance.desc': 'اللوائح البيئية ومتطلبات الامتثال',
    'hot.work': 'عمليات العمل الساخن',
    'hot.work.desc': 'تصاريح العمل الساخن ومراقبة الحرائق ومعايير سلامة اللحام',
    
    // Common UI
    'search.placeholder': 'البحث في المعايير والإجراءات والمنظمات',
    'filter.by.organization': 'تصفية حسب المنظمة',
    'available.resources': 'الموارد المتاحة',
    'no.results': 'لم يتم العثور على موارد تطابق معايير البحث الخاصة بك',
    'compliance.notice': 'إشعار الامتثال',
    'compliance.message': 'تستند هذه الموارد إلى معايير OSHA وأرامكو السعودية والصناعة الحالية. تحقق دائماً من أحدث اللوائح وإجراءات شركتك المحددة. استشر المتخصصين المؤهلين لعمليات الرفع المعقدة.',
    'back': 'رجوع',
    'all': 'الكل',
    'search.resources': 'البحث في الموارد',
    
    // Equipment Database
    'add.equipment': 'إضافة معدات',
    'equipment.name': 'اسم المعدة',
    'equipment.type': 'نوع المعدة',
    'capacity': 'السعة (طن)',
    'max.radius': 'أقصى نصف قطر (م)',
    'max.height': 'أقصى ارتفاع (م)',
    'manufacturer': 'الشركة المصنعة',
    'model': 'الطراز',
    'year': 'السنة',
    'serial.number': 'الرقم التسلسلي',
    'certification.date': 'تاريخ الشهادة',
    'load.chart': 'جدول الأحمال',
    'radius': 'نصف القطر (م)',
    'add.point': 'إضافة نقطة',
    'save.equipment': 'حفظ المعدة',
    'cancel': 'إلغاء',
    'mobile': 'رافعة متحركة',
    'tower': 'رافعة برجية',
    'crawler': 'رافعة زاحفة',
    'overhead': 'رافعة علوية',
  }
};
