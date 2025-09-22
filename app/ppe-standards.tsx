
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface PPEResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'ANSI' | 'NIOSH' | 'Saudi Aramco' | 'General';
}

export default function PPEStandardsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<PPEResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: PPEResource[] = [
    {
      title: 'OSHA Personal Protective Equipment Standards',
      description: 'General requirements for PPE in the workplace',
      icon: 'shield-outline',
      source: 'OSHA 29 CFR 1910.132',
      category: 'OSHA',
      content: [
        'PPE hazard assessment required for all workplaces',
        'Employer must provide PPE at no cost to employees',
        'PPE must be properly fitted to each employee',
        'Training required on proper PPE use and care',
        'PPE must be maintained in sanitary and reliable condition',
        'Defective or damaged PPE must be replaced immediately',
        'PPE selection based on hazard assessment results',
        'Employee training certification and documentation required',
        'PPE program evaluation and effectiveness assessment',
        'Retraining required when PPE or hazards change',
        'PPE must not create additional hazards for users',
        'Personal PPE may be used if equivalent protection provided'
      ]
    },
    {
      title: 'Head Protection Requirements',
      description: 'Hard hat and head protection standards',
      icon: 'construct-outline',
      source: 'OSHA 29 CFR 1910.135 / ANSI Z89.1',
      category: 'ANSI',
      content: [
        'Hard hats required where danger of head injury exists',
        'Type I hard hats protect against vertical impacts',
        'Type II hard hats protect against lateral and vertical impacts',
        'Class G hard hats protect against low-voltage electrical hazards',
        'Class E hard hats protect against high-voltage electrical hazards',
        'Class C hard hats provide no electrical protection',
        'Hard hat suspension system must be properly adjusted',
        'Hard hats must be inspected before each use',
        'Damaged or cracked hard hats must be replaced',
        'Hard hat accessories must not compromise protection',
        'Reverse wearing may void manufacturer warranty',
        'Replacement schedule based on manufacturer recommendations'
      ]
    },
    {
      title: 'Eye and Face Protection',
      description: 'Safety glasses, goggles, and face shield requirements',
      icon: 'eye-outline',
      source: 'OSHA 29 CFR 1910.133 / ANSI Z87.1',
      category: 'ANSI',
      content: [
        'Eye protection required where eye hazards exist',
        'Safety glasses must meet ANSI Z87.1 standards',
        'Side shields required for impact hazards',
        'Chemical splash goggles for chemical hazards',
        'Welding helmets for arc welding operations',
        'Face shields used in combination with safety glasses',
        'Prescription safety glasses available for vision correction',
        'Tinted lenses for bright light and glare protection',
        'Anti-fog coatings for humid or temperature-change environments',
        'Regular cleaning and maintenance of eye protection',
        'Replacement of scratched or damaged lenses',
        'Proper storage to prevent damage to eye protection'
      ]
    },
    {
      title: 'Respiratory Protection Program',
      description: 'Comprehensive respiratory protection requirements',
      icon: 'fitness-outline',
      source: 'OSHA 29 CFR 1910.134',
      category: 'OSHA',
      content: [
        'Written respiratory protection program required',
        'Medical evaluation before respirator use',
        'Fit testing required for tight-fitting respirators',
        'Training on respirator use, limitations, and maintenance',
        'Respirator selection based on hazard assessment',
        'Air-purifying respirators for specific contaminants',
        'Supplied-air respirators for oxygen-deficient atmospheres',
        'Self-contained breathing apparatus for IDLH conditions',
        'Regular inspection and maintenance of respirators',
        'Proper storage and cleaning of respiratory equipment',
        'Program evaluation and effectiveness assessment',
        'Record keeping for medical evaluations and fit testing'
      ]
    },
    {
      title: 'Hand and Arm Protection',
      description: 'Glove selection and hand protection standards',
      icon: 'hand-left-outline',
      source: 'OSHA 29 CFR 1910.138 / ANSI Standards',
      category: 'General',
      content: [
        'Hand protection required where hand hazards exist',
        'Glove selection based on specific hazard assessment',
        'Cut-resistant gloves for sharp object handling',
        'Chemical-resistant gloves for chemical exposure',
        'Heat-resistant gloves for thermal hazards',
        'Electrical-insulating gloves for electrical work',
        'Puncture-resistant gloves for needle and sharp hazards',
        'Disposable gloves for biological hazard protection',
        'Proper glove sizing for dexterity and protection',
        'Regular inspection of gloves before use',
        'Replacement of worn, torn, or contaminated gloves',
        'Proper removal and disposal of contaminated gloves'
      ]
    },
    {
      title: 'Foot and Leg Protection',
      description: 'Safety footwear and leg protection requirements',
      icon: 'walk-outline',
      source: 'OSHA 29 CFR 1910.136 / ASTM Standards',
      category: 'General',
      content: [
        'Safety footwear required where foot hazards exist',
        'Steel-toe boots for compression and impact protection',
        'Composite-toe boots for electrical hazard environments',
        'Puncture-resistant soles for sharp object protection',
        'Slip-resistant soles for wet and oily surfaces',
        'Chemical-resistant boots for chemical exposure',
        'Electrical hazard boots for electrical work environments',
        'Metatarsal guards for additional foot protection',
        'Leg protection for chemical splash and cut hazards',
        'Proper fit and comfort for extended wear',
        'Regular inspection and maintenance of safety footwear',
        'Replacement based on wear patterns and damage'
      ]
    },
    {
      title: 'Saudi Aramco SAES-A-102 PPE Requirements',
      description: 'Personal protective equipment standards for Saudi Aramco',
      icon: 'business-outline',
      source: 'Saudi Aramco SAES-A-102',
      category: 'Saudi Aramco',
      content: [
        'Minimum PPE requirements for all work areas',
        'Hard hat, safety glasses, and safety shoes mandatory',
        'High-visibility clothing in designated areas',
        'Flame-resistant clothing for hydrocarbon exposure',
        'Respiratory protection program implementation',
        'PPE inspection and maintenance procedures',
        'Training requirements for PPE use and care',
        'Contractor PPE compliance and verification',
        'PPE procurement and quality assurance standards',
        'Incident investigation for PPE-related injuries',
        'PPE program audit and compliance monitoring',
        'Documentation and record keeping for PPE activities'
      ]
    },
    {
      title: 'Hearing Protection Requirements',
      description: 'Hearing conservation and protection standards',
      icon: 'volume-off-outline',
      source: 'OSHA 29 CFR 1910.95',
      category: 'OSHA',
      content: [
        'Hearing protection required when noise exceeds 85 dBA TWA',
        'Audiometric testing program for noise-exposed employees',
        'Noise exposure assessment and monitoring',
        'Hearing protector selection based on noise reduction rating',
        'Earplugs for individual hearing protection',
        'Earmuffs for higher noise level protection',
        'Dual protection for extreme noise environments',
        'Proper insertion and fit of hearing protection',
        'Training on hearing conservation and protection',
        'Regular replacement of disposable hearing protection',
        'Cleaning and maintenance of reusable hearing protection',
        'Medical surveillance for hearing loss prevention'
      ]
    },
    {
      title: 'High-Visibility Clothing',
      description: 'High-visibility safety apparel requirements',
      icon: 'shirt-outline',
      source: 'ANSI/ISEA 107 / OSHA Guidelines',
      category: 'ANSI',
      content: [
        'High-visibility clothing required in traffic work zones',
        'Class 1 garments for low-risk environments',
        'Class 2 garments for moderate-risk environments',
        'Class 3 garments for high-risk environments',
        'Fluorescent background colors: orange, yellow-green, red',
        'Retroreflective materials for low-light visibility',
        'Combined-performance materials with both properties',
        'Proper care and maintenance to preserve visibility',
        'Inspection for damage, fading, and contamination',
        'Replacement when visibility performance degrades',
        'Flame-resistant high-visibility clothing for fire hazards',
        'Weather-appropriate high-visibility outer garments'
      ]
    },
    {
      title: 'Fall Protection PPE',
      description: 'Personal protective equipment for fall protection',
      icon: 'person-outline',
      source: 'OSHA / ANSI Z359 Standards',
      category: 'General',
      content: [
        'Full body harness required for fall arrest systems',
        'Harness inspection before each use',
        'Proper harness fit and adjustment procedures',
        'D-ring attachment points for different applications',
        'Connecting devices: lanyards, self-retracting lifelines',
        'Energy absorbers to limit fall arrest forces',
        'Snap hooks must be locking type',
        'Compatibility between harness and connecting devices',
        'Fall protection equipment retirement criteria',
        'Training on proper donning and use of harnesses',
        'Storage and care of fall protection PPE',
        'Documentation of fall protection equipment inspections'
      ]
    },
    {
      title: 'Chemical Protective Clothing',
      description: 'Chemical-resistant clothing and equipment',
      icon: 'flask-outline',
      source: 'OSHA / NFPA Standards',
      category: 'General',
      content: [
        'Chemical protective clothing selection based on hazard assessment',
        'Level A suits for maximum respiratory and skin protection',
        'Level B suits for maximum respiratory protection',
        'Level C suits for known chemical concentrations',
        'Level D suits for minimal chemical hazard protection',
        'Chemical compatibility testing for protective materials',
        'Breakthrough time and permeation rate considerations',
        'Proper donning and doffing procedures',
        'Decontamination procedures for reusable equipment',
        'Heat stress considerations with chemical protective clothing',
        'Emergency procedures for chemical protective equipment failure',
        'Training requirements for chemical protective clothing use'
      ]
    },
    {
      title: 'PPE Training and Compliance',
      description: 'Training requirements and compliance monitoring for PPE',
      icon: 'school-outline',
      source: 'OSHA Standards / Best Practices',
      category: 'General',
      content: [
        'Initial PPE training before workplace assignment',
        'Retraining when PPE or workplace hazards change',
        'Training on proper PPE selection and use',
        'Limitations and useful life of PPE equipment',
        'Proper care, maintenance, and storage of PPE',
        'Signs of wear and damage requiring replacement',
        'Proper disposal of contaminated or damaged PPE',
        'Training documentation and certification requirements',
        'Supervisor responsibilities for PPE compliance',
        'Employee responsibilities for PPE use and care',
        'PPE compliance monitoring and enforcement',
        'Corrective action procedures for PPE violations'
      ]
    }
  ];

  const categories = ['All', 'OSHA', 'ANSI', 'NIOSH', 'Saudi Aramco', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: PPEResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening PPE resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#FF6B35';
      case 'ANSI': return '#0066CC';
      case 'NIOSH': return '#4CAF50';
      case 'Saudi Aramco': return '#00A651';
      default: return '#4CAF50';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          Personal Protective Equipment
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 16, fontSize: 16 }]}>
          PPE standards from OSHA, ANSI, NIOSH, and industry organizations
        </Text>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Search PPE Resources</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[commonStyles.input, { paddingLeft: 40 }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search PPE standards and procedures"
              placeholderTextColor={colors.textLight}
            />
            <Icon 
              name="search-outline" 
              size={20} 
              color={colors.textLight} 
              style={{ position: 'absolute', left: 12, top: 12 }}
            />
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={[commonStyles.label, { marginBottom: 12 }]}>Filter by Organization</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: 8,
                    borderWidth: 1,
                  },
                  selectedCategory === category
                    ? { backgroundColor: '#4CAF50', borderColor: '#4CAF50' }
                    : { backgroundColor: 'transparent', borderColor: colors.border }
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    { fontSize: 14, fontWeight: '500' },
                    selectedCategory === category
                      ? { color: 'white' }
                      : { color: colors.text }
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            PPE Resources ({filteredResources.length})
          </Text>

          {filteredResources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card]}
              onPress={() => openResource(resource)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.row, { marginBottom: 8, alignItems: 'center' }]}>
                    <Icon 
                      name={resource.icon as any} 
                      size={24} 
                      color={getCategoryColor(resource.category)} 
                      style={{ marginRight: 12 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.subtitle, { marginBottom: 4, fontSize: 16 }]}>
                        {resource.title}
                      </Text>
                      <View style={[commonStyles.row, { alignItems: 'center' }]}>
                        <View 
                          style={{
                            backgroundColor: getCategoryColor(resource.category),
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 10,
                            marginRight: 8
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                            {resource.category}
                          </Text>
                        </View>
                        <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                          {resource.source}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={[commonStyles.textLight, { marginLeft: 36 }]}>
                    {resource.description}
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredResources.length === 0 && (
          <View style={[commonStyles.card, commonStyles.center, { padding: 40 }]}>
            <Icon name="search-outline" size={48} color={colors.textLight} style={{ marginBottom: 16 }} />
            <Text style={[commonStyles.text, { textAlign: 'center' }]}>
              No PPE resources found matching your search criteria
            </Text>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: '#4CAF50', marginTop: 20, marginBottom: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="shield-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              PPE Safety Reminder
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            PPE is your last line of defense against workplace hazards. Always inspect PPE before use, ensure proper fit, and replace damaged equipment immediately. Remember: PPE protects you only when used correctly.
          </Text>
        </View>
      </ScrollView>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        {selectedResource && (
          <View style={{ padding: 20 }}>
            <View style={[commonStyles.row, { marginBottom: 20, alignItems: 'center' }]}>
              <Icon 
                name={selectedResource.icon as any} 
                size={28} 
                color={getCategoryColor(selectedResource.category)} 
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.title, { marginBottom: 4, fontSize: 20 }]}>
                  {selectedResource.title}
                </Text>
                <View style={[commonStyles.row, { alignItems: 'center' }]}>
                  <View 
                    style={{
                      backgroundColor: getCategoryColor(selectedResource.category),
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      marginRight: 10
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                      {selectedResource.category}
                    </Text>
                  </View>
                  <Text style={[commonStyles.textLight, { fontSize: 14 }]}>
                    {selectedResource.source}
                  </Text>
                </View>
              </View>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {selectedResource.content.map((item, index) => (
                <View key={index} style={[commonStyles.row, { marginBottom: 12, alignItems: 'flex-start' }]}>
                  <Text style={[commonStyles.text, { color: getCategoryColor(selectedResource.category), marginRight: 8, fontWeight: '600' }]}>
                    •
                  </Text>
                  <Text style={[commonStyles.text, { flex: 1, lineHeight: 20 }]}>
                    {item}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
