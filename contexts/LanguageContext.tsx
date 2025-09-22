
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
    'work.at.height': 'Work at Height',
    
    // Risk Assessment Categories
    'weather.conditions': 'Weather Conditions',
    'load.characteristics': 'Load Characteristics',
    'environmental.hazards': 'Environmental Hazards',
    'personnel.factors': 'Personnel Factors',
    'equipment.conditions': 'Equipment Conditions',
    'operational.complexity': 'Operational Complexity',
    
    // Hot Work Risk Categories
    'fire.hazards': 'Fire Hazards',
    'equipment.tools': 'Equipment & Tools',
    'environmental.conditions': 'Environmental Conditions',
    'personnel.training': 'Personnel & Training',
    
    // Ladder Risk Categories
    'ladder.condition': 'Ladder Condition',
    'setup.positioning': 'Setup & Positioning',
    'environmental.factors': 'Environmental Factors',
    'user.behavior': 'User Behavior',
    
    // Work at Height Risk Categories
    'fall.hazards': 'Fall Hazards',
    'fall.protection.equipment': 'Fall Protection Equipment',
    'training.competency': 'Training & Competency',
    
    // Scaffolding Risk Categories
    'structural.integrity': 'Structural Integrity',
    'fall.protection': 'Fall Protection',
    'access.egress': 'Access & Egress',
    'inspection.maintenance': 'Inspection & Maintenance',
    
    // Lifeline Risk Categories
    'anchorage.systems': 'Anchorage Systems',
    'equipment.condition': 'Equipment Condition',
    'installation.setup': 'Installation & Setup',
    'user.factors': 'User Factors',
    
    // Excavation Risk Categories
    'soil.conditions': 'Soil Conditions',
    'protective.systems': 'Protective Systems',
    'utilities.hazards': 'Utilities & Hazards',
    
    // Confined Space Risk Categories
    'atmospheric.hazards': 'Atmospheric Hazards',
    'entry.procedures': 'Entry Procedures',
    'ventilation.air.quality': 'Ventilation & Air Quality',
    'emergency.preparedness': 'Emergency Preparedness',
    
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
    
    // Hot Work Risk Factors
    'combustible.materials.nearby': 'Combustible materials within 35 feet',
    'flammable.liquids.present': 'Flammable liquids or gases present',
    'inadequate.fire.watch': 'Inadequate fire watch or no fire watch present',
    'no.fire.extinguisher': 'No appropriate fire extinguisher available',
    'defective.welding.equipment': 'Defective or poorly maintained welding equipment',
    'improper.gas.connections': 'Improper gas cylinder connections or leaks',
    'inadequate.ventilation': 'Inadequate ventilation in work area',
    'windy.conditions': 'Windy conditions affecting spark control',
    'confined.space.work': 'Hot work in or near confined spaces',
    'overhead.work': 'Hot work performed overhead',
    'untrained.welder': 'Untrained or unqualified welder',
    'no.fire.watch.training': 'Fire watch personnel without proper training',
    'inadequate.ppe': 'Inadequate personal protective equipment',
    
    // Ladder Risk Factors
    'damaged.ladder': 'Damaged, bent, or defective ladder',
    'wrong.ladder.type': 'Wrong type of ladder for the job',
    'overloaded.ladder': 'Ladder loaded beyond its capacity',
    'missing.safety.feet': 'Missing or damaged safety feet',
    'incorrect.angle': 'Incorrect ladder angle (not 4:1 ratio)',
    'unstable.surface': 'Unstable or uneven surface',
    'inadequate.top.support': 'Inadequate top support or securing',
    'near.electrical.hazards': 'Ladder positioned near electrical hazards',
    'wet.slippery.conditions': 'Wet or slippery ladder or surfaces',
    'high.winds.ladder': 'High winds affecting ladder stability',
    'overreaching': 'Overreaching while on ladder',
    'carrying.tools.while.climbing': 'Carrying tools or materials while climbing',
    
    // Work at Height Risk Factors
    'unprotected.edges': 'Unprotected edges or openings',
    'inadequate.guardrails': 'Inadequate or missing guardrails',
    'fragile.roof.surfaces': 'Fragile roof surfaces or skylights',
    'openings.holes': 'Unprotected openings or holes',
    'no.fall.protection': 'No fall protection system in use',
    'defective.harness': 'Defective or expired safety harness',
    'improper.anchorage': 'Improper or inadequate anchorage points',
    'incorrect.lanyard.length': 'Incorrect lanyard length allowing excessive fall',
    'adverse.weather': 'Adverse weather conditions',
    'poor.lighting': 'Poor lighting conditions',
    'untrained.workers': 'Untrained workers in fall protection',
    'inadequate.supervision': 'Inadequate supervision of height work',
    
    // Scaffolding Risk Factors
    'improper.assembly': 'Improper scaffold assembly or erection',
    'missing.components': 'Missing scaffold components or hardware',
    'overloaded.scaffold': 'Scaffold loaded beyond design capacity',
    'inadequate.base.support': 'Inadequate base plates or mudsills',
    'missing.guardrails': 'Missing guardrails or midrails',
    'inadequate.toe.boards': 'Inadequate or missing toe boards',
    'gaps.in.planking': 'Gaps in scaffold planking',
    'unsafe.access.methods': 'Unsafe access methods to scaffold',
    'blocked.exit.routes': 'Blocked emergency exit routes',
    'high.winds.scaffold': 'High winds affecting scaffold stability',
    'electrical.hazards.nearby': 'Electrical hazards near scaffold',
    'no.competent.person.inspection': 'No competent person inspection',
    'damaged.components': 'Damaged or worn scaffold components',
    
    // Lifeline Risk Factors
    'inadequate.anchorage.strength': 'Anchorage point below 5000 lbs capacity',
    'improper.anchorage.location': 'Improper anchorage point location',
    'multiple.users.single.anchor': 'Multiple users on single anchorage point',
    'worn.damaged.lifeline': 'Worn, cut, or damaged lifeline',
    'improper.rope.type': 'Improper rope type for application',
    'inadequate.hardware': 'Inadequate or incompatible hardware',
    'improper.installation': 'Improper lifeline installation',
    'excessive.sag': 'Excessive sag in horizontal lifeline',
    'sharp.edges.contact': 'Lifeline contact with sharp edges',
    'untrained.users': 'Untrained lifeline system users',
    'improper.connection': 'Improper connection to lifeline',
    
    // Excavation Risk Factors
    'unstable.soil.type': 'Type C or unstable soil conditions',
    'water.saturated.soil': 'Water saturated or submerged soil',
    'no.soil.classification': 'No proper soil classification performed',
    'previously.disturbed.soil': 'Previously disturbed or backfilled soil',
    'no.cave.in.protection': 'No cave-in protection system',
    'inadequate.shoring': 'Inadequate or improper shoring system',
    'improper.sloping': 'Improper slope angles for soil type',
    'unmarked.utilities': 'Unmarked or unknown underground utilities',
    'gas.lines.present': 'Gas lines in excavation area',
    'electrical.cables': 'Electrical cables in excavation area',
    'inadequate.exit.means': 'Inadequate means of egress from excavation',
    'unsafe.ladder.access': 'Unsafe ladder access to excavation',
    'water.accumulation': 'Water accumulation in excavation',
    'heavy.equipment.vibration': 'Heavy equipment causing vibration',
    
    // Confined Space Risk Factors
    'oxygen.deficiency': 'Oxygen deficiency (<19.5%)',
    'toxic.gases.present': 'Toxic gases or vapors present',
    'flammable.atmosphere': 'Flammable or explosive atmosphere',
    'no.atmospheric.testing': 'No atmospheric testing performed',
    'no.entry.permit': 'No confined space entry permit',
    'no.attendant.present': 'No trained attendant present',
    'inadequate.communication': 'Inadequate communication systems',
    'inadequate.ventilation': 'Inadequate mechanical ventilation',
    'no.continuous.monitoring': 'No continuous atmospheric monitoring',
    'no.rescue.plan': 'No emergency rescue plan',
    'inadequate.rescue.equipment': 'Inadequate rescue equipment available',
    'untrained.entrants': 'Untrained confined space entrants',
    'unqualified.attendant': 'Unqualified or untrained attendant',
    
    // Risk Levels
    'risk.low': 'LOW',
    'risk.medium': 'MEDIUM',
    'risk.high': 'HIGH',
    'risk.critical': 'CRITICAL',
    
    // Risk Assessment UI
    'select.assessment.category': 'Select Risk Assessment Category',
    'select.applicable.risks': 'Select all applicable risk factors for your operation',
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
    'stop.do.not.proceed': 'STOP - Do not proceed with operation',
    'senior.management.approval': 'Senior management approval required before proceeding',
    'comprehensive.risk.plan': 'Comprehensive risk mitigation plan must be developed',
    'consider.postponing': 'Consider postponing until conditions improve',
    'alternative.methods.required': 'Alternative methods must be evaluated',
    'safety.officer.consultation': 'Safety officer consultation mandatory',
    'detailed.hazard.analysis': 'Detailed hazard analysis and job safety analysis required',
    
    // Recommendations - High
    'detailed.lift.plan.review': 'Detailed plan review with all stakeholders required',
    'senior.supervision.mandatory': 'Senior supervision and competent person oversight mandatory',
    'consider.alternative.methods': 'Consider alternative methods or equipment',
    'additional.safety.equipment': 'Additional safety equipment and backup systems required',
    'extended.briefing': 'Extended pre-operation safety briefing with all personnel',
    'continuous.monitoring': 'Continuous monitoring of conditions throughout operation',
    'emergency.procedures.ready': 'Emergency response procedures and equipment ready',
    
    // Recommendations - Medium
    'enhanced.safety.briefing': 'Enhanced safety briefing with focus on identified risks',
    'additional.supervision': 'Additional supervision and qualified spotter recommended',
    'review.lift.plan': 'Review operation plan with all personnel involved',
    'consider.additional.measures': 'Consider additional safety measures and controls',
    'weather.monitoring': 'Continuous weather and environmental monitoring',
    'communication.protocols': 'Establish clear communication protocols and signals',
    
    // Recommendations - Low
    'standard.safety.procedures': 'Proceed with standard safety procedures and protocols',
    'routine.briefing': 'Conduct routine pre-operation safety briefing',
    'monitor.conditions': 'Monitor conditions throughout operation',
    'follow.standard.protocols': 'Follow standard operating procedures and checklists',
    'regular.equipment.checks': 'Perform regular equipment and safety checks',
    
    // Common UI
    'search.placeholder': 'Search standards, procedures, or organizations',
    'filter.by.organization': 'Filter by Organization',
    'available.resources': 'Available Resources',
    'no.results': 'No resources found matching your search criteria',
    'compliance.notice': 'Compliance Notice',
    'compliance.message': 'These resources are based on current OSHA, Saudi Aramco, and industry standards. Always verify with the latest regulations and your company\'s specific procedures. Consult qualified professionals for complex operations.',
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
    'risk.assessment.desc': 'تقييم مخاطر العمليات',
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
    'work.at.height': 'العمل على الارتفاع',
    
    // Risk Assessment Categories
    'weather.conditions': 'الظروف الجوية',
    'load.characteristics': 'خصائص الحمولة',
    'environmental.hazards': 'المخاطر البيئية',
    'personnel.factors': 'عوامل الأفراد',
    'equipment.conditions': 'حالة المعدات',
    'operational.complexity': 'تعقيد العملية',
    
    // Hot Work Risk Categories
    'fire.hazards': 'مخاطر الحرائق',
    'equipment.tools': 'المعدات والأدوات',
    'environmental.conditions': 'الظروف البيئية',
    'personnel.training': 'الأفراد والتدريب',
    
    // Ladder Risk Categories
    'ladder.condition': 'حالة السلم',
    'setup.positioning': 'الإعداد والوضع',
    'environmental.factors': 'العوامل البيئية',
    'user.behavior': 'سلوك المستخدم',
    
    // Work at Height Risk Categories
    'fall.hazards': 'مخاطر السقوط',
    'fall.protection.equipment': 'معدات الحماية من السقوط',
    'training.competency': 'التدريب والكفاءة',
    
    // Scaffolding Risk Categories
    'structural.integrity': 'السلامة الهيكلية',
    'fall.protection': 'الحماية من السقوط',
    'access.egress': 'الدخول والخروج',
    'inspection.maintenance': 'الفحص والصيانة',
    
    // Lifeline Risk Categories
    'anchorage.systems': 'أنظمة التثبيت',
    'equipment.condition': 'حالة المعدات',
    'installation.setup': 'التركيب والإعداد',
    'user.factors': 'عوامل المستخدم',
    
    // Excavation Risk Categories
    'soil.conditions': 'ظروف التربة',
    'protective.systems': 'الأنظمة الوقائية',
    'utilities.hazards': 'المرافق والمخاطر',
    
    // Confined Space Risk Categories
    'atmospheric.hazards': 'المخاطر الجوية',
    'entry.procedures': 'إجراءات الدخول',
    'ventilation.air.quality': 'التهوية وجودة الهواء',
    'emergency.preparedness': 'الاستعداد للطوارئ',
    
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
    
    // Hot Work Risk Factors
    'combustible.materials.nearby': 'مواد قابلة للاشتعال ضمن 35 قدم',
    'flammable.liquids.present': 'سوائل أو غازات قابلة للاشتعال موجودة',
    'inadequate.fire.watch': 'مراقبة حرائق غير كافية أو غير موجودة',
    'no.fire.extinguisher': 'لا يوجد طفاية حريق مناسبة',
    'defective.welding.equipment': 'معدات لحام معيبة أو سيئة الصيانة',
    'improper.gas.connections': 'توصيلات غاز غير صحيحة أو تسريبات',
    'inadequate.ventilation': 'تهوية غير كافية في منطقة العمل',
    'windy.conditions': 'ظروف رياح تؤثر على التحكم في الشرر',
    'confined.space.work': 'عمل ساخن في أو بالقرب من مساحات محصورة',
    'overhead.work': 'عمل ساخن يتم تنفيذه في الأعلى',
    'untrained.welder': 'لحام غير مدرب أو غير مؤهل',
    'no.fire.watch.training': 'أفراد مراقبة الحرائق بدون تدريب مناسب',
    'inadequate.ppe': 'معدات حماية شخصية غير كافية',
    
    // Ladder Risk Factors
    'damaged.ladder': 'سلم تالف أو منحني أو معيب',
    'wrong.ladder.type': 'نوع خاطئ من السلم للعمل',
    'overloaded.ladder': 'سلم محمل بما يتجاوز سعته',
    'missing.safety.feet': 'أقدام أمان مفقودة أو تالفة',
    'incorrect.angle': 'زاوية سلم غير صحيحة (ليس نسبة 4:1)',
    'unstable.surface': 'سطح غير مستقر أو غير مستوي',
    'inadequate.top.support': 'دعم علوي غير كافي أو تثبيت',
    'near.electrical.hazards': 'سلم موضوع بالقرب من مخاطر كهربائية',
    'wet.slippery.conditions': 'سلم أو أسطح مبللة أو زلقة',
    'high.winds.ladder': 'رياح عالية تؤثر على استقرار السلم',
    'overreaching': 'الوصول المفرط أثناء وجود على السلم',
    'carrying.tools.while.climbing': 'حمل أدوات أو مواد أثناء التسلق',
    
    // Work at Height Risk Factors
    'unprotected.edges': 'حواف أو فتحات غير محمية',
    'inadequate.guardrails': 'حواجز حماية غير كافية أو مفقودة',
    'fragile.roof.surfaces': 'أسطح أسقف هشة أو مناور',
    'openings.holes': 'فتحات أو ثقوب غير محمية',
    'no.fall.protection': 'لا يوجد نظام حماية من السقوط قيد الاستخدام',
    'defective.harness': 'حزام أمان معيب أو منتهي الصلاحية',
    'improper.anchorage': 'نقاط تثبيت غير صحيحة أو غير كافية',
    'incorrect.lanyard.length': 'طول حبل أمان غير صحيح يسمح بسقوط مفرط',
    'adverse.weather': 'ظروف جوية سيئة',
    'poor.lighting': 'ظروف إضاءة ضعيفة',
    'untrained.workers': 'عمال غير مدربين في الحماية من السقوط',
    'inadequate.supervision': 'إشراف غير كافي على العمل على الارتفاع',
    
    // Scaffolding Risk Factors
    'improper.assembly': 'تجميع أو تركيب سقالة غير صحيح',
    'missing.components': 'مكونات أو أجهزة سقالة مفقودة',
    'overloaded.scaffold': 'سقالة محملة بما يتجاوز سعة التصميم',
    'inadequate.base.support': 'ألواح قاعدة أو دعامات طين غير كافية',
    'missing.guardrails': 'حواجز حماية أو حواجز وسطى مفقودة',
    'inadequate.toe.boards': 'ألواح أصابع القدم غير كافية أو مفقودة',
    'gaps.in.planking': 'فجوات في ألواح السقالة',
    'unsafe.access.methods': 'طرق وصول غير آمنة للسقالة',
    'blocked.exit.routes': 'طرق خروج طوارئ مسدودة',
    'high.winds.scaffold': 'رياح عالية تؤثر على استقرار السقالة',
    'electrical.hazards.nearby': 'مخاطر كهربائية بالقرب من السقالة',
    'no.competent.person.inspection': 'لا يوجد فحص شخص مختص',
    'damaged.components': 'مكونات سقالة تالفة أو مهترئة',
    
    // Lifeline Risk Factors
    'inadequate.anchorage.strength': 'نقطة تثبيت أقل من سعة 5000 رطل',
    'improper.anchorage.location': 'موقع نقطة تثبيت غير صحيح',
    'multiple.users.single.anchor': 'مستخدمون متعددون على نقطة تثبيت واحدة',
    'worn.damaged.lifeline': 'خط حياة مهترئ أو مقطوع أو تالف',
    'improper.rope.type': 'نوع حبل غير صحيح للتطبيق',
    'inadequate.hardware': 'أجهزة غير كافية أو غير متوافقة',
    'improper.installation': 'تركيب خط حياة غير صحيح',
    'excessive.sag': 'ترهل مفرط في خط الحياة الأفقي',
    'sharp.edges.contact': 'اتصال خط الحياة بحواف حادة',
    'untrained.users': 'مستخدمو نظام خط الحياة غير مدربين',
    'improper.connection': 'اتصال غير صحيح بخط الحياة',
    
    // Excavation Risk Factors
    'unstable.soil.type': 'ظروف تربة من النوع C أو غير مستقرة',
    'water.saturated.soil': 'تربة مشبعة بالماء أو مغمورة',
    'no.soil.classification': 'لم يتم إجراء تصنيف صحيح للتربة',
    'previously.disturbed.soil': 'تربة مضطربة سابقاً أو مردومة',
    'no.cave.in.protection': 'لا يوجد نظام حماية من الانهيار',
    'inadequate.shoring': 'نظام دعم غير كافي أو غير صحيح',
    'improper.sloping': 'زوايا ميل غير صحيحة لنوع التربة',
    'unmarked.utilities': 'مرافق تحت الأرض غير مميزة أو غير معروفة',
    'gas.lines.present': 'خطوط غاز في منطقة الحفر',
    'electrical.cables': 'كابلات كهربائية في منطقة الحفر',
    'inadequate.exit.means': 'وسائل خروج غير كافية من الحفر',
    'unsafe.ladder.access': 'وصول سلم غير آمن للحفر',
    'water.accumulation': 'تراكم الماء في الحفر',
    'heavy.equipment.vibration': 'معدات ثقيلة تسبب اهتزاز',
    
    // Confined Space Risk Factors
    'oxygen.deficiency': 'نقص الأكسجين (<19.5%)',
    'toxic.gases.present': 'غازات أو أبخرة سامة موجودة',
    'flammable.atmosphere': 'جو قابل للاشتعال أو الانفجار',
    'no.atmospheric.testing': 'لم يتم إجراء اختبار جوي',
    'no.entry.permit': 'لا يوجد تصريح دخول مساحة محصورة',
    'no.attendant.present': 'لا يوجد مرافق مدرب',
    'inadequate.communication': 'أنظمة تواصل غير كافية',
    'inadequate.ventilation': 'تهوية ميكانيكية غير كافية',
    'no.continuous.monitoring': 'لا يوجد مراقبة جوية مستمرة',
    'no.rescue.plan': 'لا توجد خطة إنقاذ طوارئ',
    'inadequate.rescue.equipment': 'معدات إنقاذ غير كافية متاحة',
    'untrained.entrants': 'داخلون مساحة محصورة غير مدربين',
    'unqualified.attendant': 'مرافق غير مؤهل أو غير مدرب',
    
    // Risk Levels
    'risk.low': 'منخفض',
    'risk.medium': 'متوسط',
    'risk.high': 'عالي',
    'risk.critical': 'حرج',
    
    // Risk Assessment UI
    'select.assessment.category': 'اختر فئة تقييم المخاطر',
    'select.applicable.risks': 'اختر جميع عوامل المخاطر المطبقة على عمليتك',
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
    'stop.do.not.proceed': 'توقف - لا تتابع العملية',
    'senior.management.approval': 'موافقة الإدارة العليا مطلوبة قبل المتابعة',
    'comprehensive.risk.plan': 'يجب وضع خطة شاملة للتخفيف من المخاطر',
    'consider.postponing': 'فكر في التأجيل حتى تتحسن الظروف',
    'alternative.methods.required': 'يجب تقييم الطرق البديلة',
    'safety.officer.consultation': 'استشارة مسؤول السلامة إلزامية',
    'detailed.hazard.analysis': 'تحليل مفصل للمخاطر وتحليل سلامة العمل مطلوب',
    
    // Recommendations - High
    'detailed.lift.plan.review': 'مراجعة مفصلة للخطة مع جميع أصحاب المصلحة مطلوبة',
    'senior.supervision.mandatory': 'الإشراف العليا ومراقبة الشخص المختص إلزامية',
    'consider.alternative.methods': 'فكر في الطرق أو المعدات البديلة',
    'additional.safety.equipment': 'معدات السلامة الإضافية وأنظمة النسخ الاحتياطي مطلوبة',
    'extended.briefing': 'إحاطة سلامة مطولة قبل العملية مع جميع الأفراد',
    'continuous.monitoring': 'مراقبة مستمرة للظروف طوال العملية',
    'emergency.procedures.ready': 'إجراءات ومعدات الاستجابة للطوارئ جاهزة',
    
    // Recommendations - Medium
    'enhanced.safety.briefing': 'إحاطة سلامة محسنة مع التركيز على المخاطر المحددة',
    'additional.supervision': 'إشراف إضافي ومراقب مؤهل موصى به',
    'review.lift.plan': 'مراجعة خطة العملية مع جميع الأفراد المشاركين',
    'consider.additional.measures': 'فكر في تدابير وضوابط السلامة الإضافية',
    'weather.monitoring': 'مراقبة مستمرة للطقس والبيئة',
    'communication.protocols': 'وضع بروتوكولات وإشارات تواصل واضحة',
    
    // Recommendations - Low
    'standard.safety.procedures': 'تابع بإجراءات وبروتوكولات السلامة المعيارية',
    'routine.briefing': 'قم بإحاطة سلامة روتينية قبل العملية',
    'monitor.conditions': 'راقب الظروف طوال العملية',
    'follow.standard.protocols': 'اتبع إجراءات التشغيل المعيارية وقوائم المراجعة',
    'regular.equipment.checks': 'قم بفحوصات منتظمة للمعدات والسلامة',
    
    // Common UI
    'search.placeholder': 'البحث في المعايير والإجراءات والمنظمات',
    'filter.by.organization': 'تصفية حسب المنظمة',
    'available.resources': 'الموارد المتاحة',
    'no.results': 'لم يتم العثور على موارد تطابق معايير البحث الخاصة بك',
    'compliance.notice': 'إشعار الامتثال',
    'compliance.message': 'تستند هذه الموارد إلى معايير OSHA وأرامكو السعودية والصناعة الحالية. تحقق دائماً من أحدث اللوائح وإجراءات شركتك المحددة. استشر المتخصصين المؤهلين للعمليات المعقدة.',
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
