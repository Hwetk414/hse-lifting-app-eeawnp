
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
    
    // Risk Assessment Categories
    'weather.conditions': 'Weather Conditions',
    'load.characteristics': 'Load Characteristics',
    'environmental.hazards': 'Environmental Hazards',
    'personnel.factors': 'Personnel Factors',
    'equipment.conditions': 'Equipment Conditions',
    'operational.complexity': 'Operational Complexity',
    
    // Risk Factors - Weather
    'high.winds': 'High winds (>20 mph / 32 km/h)',
    'poor.visibility': 'Poor visibility (fog, dust, darkness)',
    'extreme.temperature': 'Extreme temperature conditions',
    'precipitation': 'Rain, snow, or ice conditions',
    
    // Risk Factors - Load
    'load.over.75.percent': 'Load exceeds 75% of crane capacity',
    'awkward.load': 'Awkward, unbalanced, or irregular shaped load',
    'unknown.weight': 'Unknown or estimated load weight',
    'fragile.load': 'Fragile or valuable load requiring precision',
    
    // Risk Factors - Environment
    'overhead.powerlines': 'Overhead power lines within 10m',
    'congested.area': 'Congested work area with limited space',
    'underground.utilities': 'Underground utilities in work area',
    'unstable.ground': 'Unstable or uneven ground conditions',
    
    // Risk Factors - Personnel
    'inexperienced.operator': 'Inexperienced or uncertified operator',
    'multiple.personnel': 'Multiple personnel in lift zone',
    'communication.issues': 'Communication difficulties or language barriers',
    'fatigue.stress': 'Operator fatigue or stress factors',
    
    // Risk Factors - Equipment
    'complex.rigging': 'Complex rigging or multiple sling configuration',
    'near.capacity.limits': 'Equipment operating near capacity limits',
    'equipment.defects': 'Known equipment defects or maintenance issues',
    'inadequate.maintenance': 'Inadequate maintenance records or overdue inspections',
    
    // Risk Factors - Operational
    'blind.lift': 'Blind lift (operator cannot see load or landing area)',
    'multi.crane.operation': 'Multi-crane or coordinated lifting operation',
    'precision.placement': 'Precision placement or tight tolerance requirements',
    'time.pressure': 'Time pressure or schedule constraints',
    
    // Risk Levels
    'risk.low': 'LOW',
    'risk.medium': 'MEDIUM',
    'risk.high': 'HIGH',
    'risk.critical': 'CRITICAL',
    
    // Risk Assessment UI
    'select.applicable.risks': 'Select all applicable risk factors for your lifting operation',
    'no.risk.factors': 'No Risk Factors Selected',
    'select.risk.factors': 'Please select at least one risk factor to assess.',
    'assess.risk': 'Assess Risk',
    'reset': 'Reset',
    'assessment.results': 'Risk Assessment Results',
    'risk.score': 'Risk Score',
    'weight': 'Weight',
    'recommendations': 'Recommendations',
    'critical.factors': 'Critical Risk Factors Identified',
    'critical.factors.detected': 'Critical factors detected',
    
    // Risk Level Descriptions
    'risk.level.low': 'LOW RISK',
    'risk.level.medium': 'MEDIUM RISK',
    'risk.level.high': 'HIGH RISK',
    'risk.level.critical': 'CRITICAL RISK',
    
    // Recommendations - Critical
    'stop.do.not.proceed': 'STOP - Do not proceed with lift operation',
    'senior.management.approval': 'Senior management approval required before proceeding',
    'comprehensive.risk.plan': 'Comprehensive risk mitigation plan must be developed',
    'consider.postponing': 'Consider postponing until conditions improve',
    'alternative.methods.required': 'Alternative lifting methods must be evaluated',
    'safety.officer.consultation': 'Safety officer consultation mandatory',
    'detailed.hazard.analysis': 'Detailed hazard analysis and job safety analysis required',
    
    // Recommendations - High
    'detailed.lift.plan.review': 'Detailed lift plan review with all stakeholders required',
    'senior.supervision.mandatory': 'Senior supervision and competent person oversight mandatory',
    'consider.alternative.methods': 'Consider alternative lifting methods or equipment',
    'additional.safety.equipment': 'Additional safety equipment and backup systems required',
    'extended.briefing': 'Extended pre-lift safety briefing with all personnel',
    'continuous.monitoring': 'Continuous monitoring of conditions throughout operation',
    'emergency.procedures.ready': 'Emergency response procedures and equipment ready',
    
    // Recommendations - Medium
    'enhanced.safety.briefing': 'Enhanced safety briefing with focus on identified risks',
    'additional.supervision': 'Additional supervision and qualified spotter recommended',
    'review.lift.plan': 'Review lift plan with all personnel involved',
    'consider.additional.measures': 'Consider additional safety measures and controls',
    'weather.monitoring': 'Continuous weather and environmental monitoring',
    'communication.protocols': 'Establish clear communication protocols and signals',
    
    // Recommendations - Low
    'standard.safety.procedures': 'Proceed with standard safety procedures and protocols',
    'routine.briefing': 'Conduct routine pre-lift safety briefing',
    'monitor.conditions': 'Monitor conditions throughout lift operation',
    'follow.standard.protocols': 'Follow standard operating procedures and checklists',
    'regular.equipment.checks': 'Perform regular equipment and rigging checks',
    
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
    
    // Risk Assessment Categories
    'weather.conditions': 'الظروف الجوية',
    'load.characteristics': 'خصائص الحمولة',
    'environmental.hazards': 'المخاطر البيئية',
    'personnel.factors': 'عوامل الأفراد',
    'equipment.conditions': 'حالة المعدات',
    'operational.complexity': 'تعقيد العملية',
    
    // Risk Factors - Weather
    'high.winds': 'رياح عالية (أكثر من 32 كم/ساعة)',
    'poor.visibility': 'ضعف الرؤية (ضباب، غبار، ظلام)',
    'extreme.temperature': 'ظروف درجات حرارة قصوى',
    'precipitation': 'ظروف المطر أو الثلج أو الجليد',
    
    // Risk Factors - Load
    'load.over.75.percent': 'الحمولة تتجاوز 75% من سعة الرافعة',
    'awkward.load': 'حمولة غير متوازنة أو غير منتظمة الشكل',
    'unknown.weight': 'وزن الحمولة غير معروف أو مقدر',
    'fragile.load': 'حمولة هشة أو قيمة تتطلب دقة',
    
    // Risk Factors - Environment
    'overhead.powerlines': 'خطوط الكهرباء العلوية ضمن 10 متر',
    'congested.area': 'منطقة عمل مزدحمة بمساحة محدودة',
    'underground.utilities': 'مرافق تحت الأرض في منطقة العمل',
    'unstable.ground': 'ظروف أرضية غير مستقرة أو غير مستوية',
    
    // Risk Factors - Personnel
    'inexperienced.operator': 'مشغل غير مؤهل أو غير معتمد',
    'multiple.personnel': 'عدة أفراد في منطقة الرفع',
    'communication.issues': 'صعوبات في التواصل أو حواجز لغوية',
    'fatigue.stress': 'إرهاق المشغل أو عوامل الضغط',
    
    // Risk Factors - Equipment
    'complex.rigging': 'تجهيز معقد أو تكوين حبال متعددة',
    'near.capacity.limits': 'المعدات تعمل قريباً من حدود السعة',
    'equipment.defects': 'عيوب معروفة في المعدات أو مشاكل صيانة',
    'inadequate.maintenance': 'سجلات صيانة غير كافية أو فحوصات متأخرة',
    
    // Risk Factors - Operational
    'blind.lift': 'رفع أعمى (المشغل لا يرى الحمولة أو منطقة الهبوط)',
    'multi.crane.operation': 'عملية رافعات متعددة أو رفع منسق',
    'precision.placement': 'وضع دقيق أو متطلبات تفاوت ضيق',
    'time.pressure': 'ضغط الوقت أو قيود الجدولة',
    
    // Risk Levels
    'risk.low': 'منخفض',
    'risk.medium': 'متوسط',
    'risk.high': 'عالي',
    'risk.critical': 'حرج',
    
    // Risk Assessment UI
    'select.applicable.risks': 'اختر جميع عوامل المخاطر المطبقة على عملية الرفع الخاصة بك',
    'no.risk.factors': 'لم يتم اختيار عوامل مخاطر',
    'select.risk.factors': 'يرجى اختيار عامل مخاطر واحد على الأقل للتقييم.',
    'assess.risk': 'تقييم المخاطر',
    'reset': 'إعادة تعيين',
    'assessment.results': 'نتائج تقييم المخاطر',
    'risk.score': 'نقاط المخاطر',
    'weight': 'الوزن',
    'recommendations': 'التوصيات',
    'critical.factors': 'عوامل المخاطر الحرجة المحددة',
    'critical.factors.detected': 'تم اكتشاف عوامل حرجة',
    
    // Risk Level Descriptions
    'risk.level.low': 'مخاطر منخفضة',
    'risk.level.medium': 'مخاطر متوسطة',
    'risk.level.high': 'مخاطر عالية',
    'risk.level.critical': 'مخاطر حرجة',
    
    // Recommendations - Critical
    'stop.do.not.proceed': 'توقف - لا تتابع عملية الرفع',
    'senior.management.approval': 'موافقة الإدارة العليا مطلوبة قبل المتابعة',
    'comprehensive.risk.plan': 'يجب وضع خطة شاملة للتخفيف من المخاطر',
    'consider.postponing': 'فكر في التأجيل حتى تتحسن الظروف',
    'alternative.methods.required': 'يجب تقييم طرق الرفع البديلة',
    'safety.officer.consultation': 'استشارة مسؤول السلامة إلزامية',
    'detailed.hazard.analysis': 'تحليل مفصل للمخاطر وتحليل سلامة العمل مطلوب',
    
    // Recommendations - High
    'detailed.lift.plan.review': 'مراجعة مفصلة لخطة الرفع مع جميع أصحاب المصلحة مطلوبة',
    'senior.supervision.mandatory': 'الإشراف العليا ومراقبة الشخص المختص إلزامية',
    'consider.alternative.methods': 'فكر في طرق الرفع البديلة أو المعدات',
    'additional.safety.equipment': 'معدات السلامة الإضافية وأنظمة النسخ الاحتياطي مطلوبة',
    'extended.briefing': 'إحاطة سلامة مطولة قبل الرفع مع جميع الأفراد',
    'continuous.monitoring': 'مراقبة مستمرة للظروف طوال العملية',
    'emergency.procedures.ready': 'إجراءات ومعدات الاستجابة للطوارئ جاهزة',
    
    // Recommendations - Medium
    'enhanced.safety.briefing': 'إحاطة سلامة محسنة مع التركيز على المخاطر المحددة',
    'additional.supervision': 'إشراف إضافي ومراقب مؤهل موصى به',
    'review.lift.plan': 'مراجعة خطة الرفع مع جميع الأفراد المشاركين',
    'consider.additional.measures': 'فكر في تدابير وضوابط السلامة الإضافية',
    'weather.monitoring': 'مراقبة مستمرة للطقس والبيئة',
    'communication.protocols': 'وضع بروتوكولات وإشارات تواصل واضحة',
    
    // Recommendations - Low
    'standard.safety.procedures': 'تابع بإجراءات وبروتوكولات السلامة المعيارية',
    'routine.briefing': 'قم بإحاطة سلامة روتينية قبل الرفع',
    'monitor.conditions': 'راقب الظروف طوال عملية الرفع',
    'follow.standard.protocols': 'اتبع إجراءات التشغيل المعيارية وقوائم المراجعة',
    'regular.equipment.checks': 'قم بفحوصات منتظمة للمعدات والتجهيز',
    
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
