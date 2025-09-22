
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface ElectricalSafetyResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'NFPA' | 'IEEE' | 'Saudi Aramco' | 'General';
}

export default function ElectricalSafetyScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ElectricalSafetyResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: ElectricalSafetyResource[] = [
    {
      title: 'OSHA Electrical Safety Standards',
      description: 'General electrical safety requirements in the workplace',
      icon: 'flash-outline',
      source: 'OSHA 29 CFR 1910.301-399',
      category: 'OSHA',
      content: [
        'Electrical equipment must be listed by recognized testing laboratory',
        'Ground-fault circuit interrupters required in wet locations',
        'Electrical panels must have minimum 3-foot working clearance',
        'Lockout/tagout procedures required for electrical maintenance',
        'Only qualified persons may work on energized electrical equipment',
        'Electrical equipment must be properly grounded',
        'Extension cords must be inspected before each use',
        'Temporary wiring limited to 90 days maximum',
        'Electrical hazard training required for affected employees',
        'Arc flash hazard assessment required for electrical equipment',
        'Personal protective equipment based on hazard analysis',
        'Electrical safety program must be documented and implemented'
      ]
    },
    {
      title: 'NFPA 70E Arc Flash Protection',
      description: 'Arc flash hazard analysis and protection requirements',
      icon: 'shield-outline',
      source: 'NFPA 70E-2021',
      category: 'NFPA',
      content: [
        'Arc flash hazard analysis required every 5 years',
        'Incident energy calculations for electrical equipment',
        'Arc flash boundary determination and marking',
        'Personal protective equipment selection based on incident energy',
        'Arc-rated clothing and equipment requirements',
        'Face protection with arc rating for electrical work',
        'Approach boundaries for shock protection',
        'Energized electrical work permit requirements',
        'Electrical safety training for qualified and unqualified persons',
        'Maintenance requirements for electrical safety equipment',
        'Electrical safety program audits and reviews',
        'Emergency response procedures for electrical incidents'
      ]
    },
    {
      title: 'Lockout/Tagout (LOTO) Procedures',
      description: 'Control of hazardous energy during maintenance',
      icon: 'lock-closed-outline',
      source: 'OSHA 29 CFR 1910.147',
      category: 'OSHA',
      content: [
        'Written energy control procedures for each piece of equipment',
        'Energy isolation devices must be capable of being locked out',
        'Standardized lockout/tagout devices and procedures',
        'Employee training on energy control procedures',
        'Authorized employee responsibilities and requirements',
        'Affected employee notification and training requirements',
        'Periodic inspection of energy control procedures annually',
        'Group lockout procedures for multiple employees',
        'Shift or personnel changes during lockout procedures',
        'Testing or positioning of machines during lockout',
        'Outside personnel (contractors) lockout coordination',
        'Removal of lockout/tagout devices procedures'
      ]
    },
    {
      title: 'Saudi Aramco SAES-P-109 Electrical Safety',
      description: 'Electrical safety standards for Saudi Aramco facilities',
      icon: 'business-outline',
      source: 'Saudi Aramco SAES-P-109',
      category: 'Saudi Aramco',
      content: [
        'Electrical permit system for all electrical work',
        'Qualified electrician certification requirements',
        'Electrical isolation and lockout procedures',
        'Personal protective equipment for electrical work',
        'Electrical equipment inspection and testing schedules',
        'Hot work permits for electrical installations',
        'Emergency response procedures for electrical incidents',
        'Electrical safety training requirements for personnel',
        'Contractor electrical safety management',
        'Electrical equipment maintenance standards',
        'Hazardous area electrical equipment classification',
        'Lightning protection system requirements'
      ]
    },
    {
      title: 'IEEE 1584 Arc Flash Calculations',
      description: 'Guide for performing arc flash hazard calculations',
      icon: 'calculator-outline',
      source: 'IEEE 1584-2018',
      category: 'IEEE',
      content: [
        'Incident energy calculation methods for arc flash analysis',
        'Arc flash boundary calculation procedures',
        'Equipment-specific calculation methods and parameters',
        'Low-voltage and medium-voltage calculation differences',
        'DC arc flash calculation methods and considerations',
        'Enclosure size effects on incident energy calculations',
        'Working distance determination for different equipment types',
        'Arc duration factors and protective device coordination',
        'Calculation software validation and verification',
        'Documentation requirements for arc flash studies',
        'Periodic review and update of arc flash calculations',
        'Integration with electrical system protective device settings'
      ]
    },
    {
      title: 'Electrical Personal Protective Equipment',
      description: 'Selection and use of electrical PPE',
      icon: 'person-outline',
      source: 'OSHA / NFPA 70E',
      category: 'General',
      content: [
        'Arc-rated clothing selection based on incident energy',
        'Electrical-rated gloves with proper voltage rating',
        'Insulated tools for electrical work requirements',
        'Face shields with arc rating for electrical hazards',
        'Hard hats with electrical insulation properties',
        'Safety shoes with electrical hazard protection',
        'Voltage-rated mats and blankets for electrical work',
        'PPE inspection requirements before each use',
        'PPE testing and certification requirements',
        'Storage and care of electrical PPE',
        'Training on proper use and limitations of electrical PPE',
        'Replacement criteria for damaged electrical PPE'
      ]
    },
    {
      title: 'Electrical Equipment Maintenance',
      description: 'Maintenance requirements for electrical systems',
      icon: 'construct-outline',
      source: 'NFPA 70B / Industry Standards',
      category: 'General',
      content: [
        'Preventive maintenance schedules for electrical equipment',
        'Infrared thermography inspections for electrical connections',
        'Insulation resistance testing procedures and frequency',
        'Circuit breaker testing and maintenance requirements',
        'Motor control center maintenance and inspection',
        'Transformer maintenance and oil analysis procedures',
        'Emergency generator testing and maintenance schedules',
        'Electrical panel cleaning and inspection procedures',
        'Cable and wiring system inspection requirements',
        'Grounding system testing and maintenance',
        'Documentation and record keeping for maintenance activities',
        'Qualified personnel requirements for electrical maintenance'
      ]
    },
    {
      title: 'Ground Fault Circuit Interrupters (GFCI)',
      description: 'GFCI requirements and testing procedures',
      icon: 'outlet-outline',
      source: 'OSHA / NEC Requirements',
      category: 'OSHA',
      content: [
        'GFCI protection required in wet and damp locations',
        'Construction sites require GFCI protection for temporary power',
        'Monthly testing of GFCI devices using test and reset buttons',
        'GFCI protection for portable tools and equipment',
        'Assured equipment grounding conductor program alternative',
        'GFCI protection for outdoor electrical outlets',
        'Replacement requirements for non-functioning GFCI devices',
        'Training requirements for GFCI testing procedures',
        'Documentation of GFCI testing and maintenance',
        'GFCI protection for bathroom and kitchen electrical outlets',
        'Temporary GFCI protection for construction activities',
        'GFCI protection requirements for swimming pool areas'
      ]
    },
    {
      title: 'Electrical Hazard Identification',
      description: 'Identifying and assessing electrical hazards',
      icon: 'eye-outline',
      source: 'OSHA / NFPA 70E',
      category: 'General',
      content: [
        'Shock hazard assessment and boundary determination',
        'Arc flash hazard identification and analysis',
        'Electrical equipment condition assessment',
        'Overhead power line hazard identification',
        'Wet location electrical hazard assessment',
        'Temporary electrical installation hazard evaluation',
        'Electrical equipment overcurrent protection verification',
        'Grounding system integrity assessment',
        'Electrical panel and enclosure hazard identification',
        'Extension cord and portable equipment hazard assessment',
        'Environmental factors affecting electrical safety',
        'Human factors in electrical hazard assessment'
      ]
    },
    {
      title: 'Electrical Emergency Response',
      description: 'Emergency procedures for electrical incidents',
      icon: 'medical-outline',
      source: 'OSHA / Emergency Response Guidelines',
      category: 'General',
      content: [
        'Immediate response to electrical shock incidents',
        'De-energization procedures for emergency situations',
        'First aid procedures for electrical shock victims',
        'Emergency contact procedures for electrical incidents',
        'Rescue procedures for energized electrical equipment',
        'Fire suppression for electrical equipment fires',
        'Evacuation procedures for electrical emergencies',
        'Emergency shutdown procedures for electrical systems',
        'Communication procedures during electrical emergencies',
        'Post-incident investigation and analysis procedures',
        'Medical treatment requirements for electrical injuries',
        'Reporting requirements for electrical incidents'
      ]
    },
    {
      title: 'Electrical Work Permits',
      description: 'Permit systems for electrical work activities',
      icon: 'document-text-outline',
      source: 'Industry Best Practice',
      category: 'General',
      content: [
        'Electrical work permit requirements and procedures',
        'Hazard assessment and risk evaluation for electrical work',
        'Isolation and lockout verification procedures',
        'Personal protective equipment requirements specification',
        'Qualified personnel assignment and verification',
        'Emergency response planning for electrical work',
        'Work area preparation and safety measures',
        'Testing and verification procedures before energization',
        'Permit approval and authorization procedures',
        'Work completion and system restoration procedures',
        'Documentation and record keeping requirements',
        'Permit system audit and improvement procedures'
      ]
    },
    {
      title: 'Electrical Training Requirements',
      description: 'Training requirements for electrical safety',
      icon: 'school-outline',
      source: 'OSHA / NFPA 70E',
      category: 'General',
      content: [
        'Qualified person training and certification requirements',
        'Electrical safety training for unqualified persons',
        'Arc flash and shock hazard awareness training',
        'Personal protective equipment training and fit testing',
        'Lockout/tagout training for electrical systems',
        'Emergency response training for electrical incidents',
        'Electrical equipment operation and maintenance training',
        'Hazard recognition and risk assessment training',
        'Electrical safety program training requirements',
        'Refresher training schedules and requirements',
        'Training documentation and record keeping',
        'Competency assessment and verification procedures'
      ]
    }
  ];

  const categories = ['All', 'OSHA', 'NFPA', 'IEEE', 'Saudi Aramco', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: ElectricalSafetyResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening electrical safety resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#FF6B35';
      case 'NFPA': return '#FF4444';
      case 'IEEE': return '#0066CC';
      case 'Saudi Aramco': return '#00A651';
      default: return '#FF9800';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          Electrical Safety
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 16, fontSize: 16 }]}>
          Electrical safety standards from OSHA, NFPA, IEEE, and industry organizations
        </Text>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Search Electrical Safety Resources</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[commonStyles.input, { paddingLeft: 40 }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search electrical safety standards and procedures"
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
                    ? { backgroundColor: '#FF9800', borderColor: '#FF9800' }
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
            Electrical Safety Resources ({filteredResources.length})
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
              No electrical safety resources found matching your search criteria
            </Text>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: '#FF9800', marginTop: 20, marginBottom: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="flash-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              Electrical Safety Warning
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            Electrical hazards can be fatal. Always follow lockout/tagout procedures, use appropriate PPE, and ensure only qualified personnel work on electrical systems. When in doubt, de-energize and consult with electrical professionals.
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
