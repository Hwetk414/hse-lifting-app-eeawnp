
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface FallProtectionResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'ANSI' | 'Saudi Aramco' | 'CSA' | 'General';
}

export default function FallProtectionScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<FallProtectionResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: FallProtectionResource[] = [
    {
      title: 'OSHA Fall Protection Standards',
      description: 'General fall protection requirements for construction',
      icon: 'person-outline',
      source: 'OSHA 29 CFR 1926.501',
      category: 'OSHA',
      content: [
        'Fall protection required at 6 feet in construction industry',
        'Fall protection required at 4 feet in general industry',
        'Guardrail systems must be 42 inches high with midrails',
        'Safety net systems must be installed as close as possible under work',
        'Personal fall arrest systems must limit free fall to 6 feet',
        'Holes must be covered or guarded to prevent falls',
        'Leading edge work requires fall protection systems',
        'Low-slope roofs require fall protection at 6 feet from edge',
        'Steep roofs require fall protection regardless of height',
        'Excavations require fall protection for personnel access',
        'Training required for employees using fall protection systems',
        'Fall protection equipment must be inspected before each use'
      ]
    },
    {
      title: 'Personal Fall Arrest Systems',
      description: 'Requirements for personal fall arrest equipment',
      icon: 'fitness-outline',
      source: 'OSHA 29 CFR 1926.502',
      category: 'OSHA',
      content: [
        'Full body harness required for personal fall arrest systems',
        'Deceleration distance must not exceed 3.5 feet',
        'Maximum arresting force on employee limited to 1,800 pounds',
        'Anchorage points must support 5,000 pounds per employee',
        'Snap hooks must be locking type and compatible with system',
        'Lifelines must have minimum breaking strength of 5,000 pounds',
        'Self-retracting lifelines must limit free fall to 2 feet',
        'Vertical lifelines must be used by only one employee',
        'Horizontal lifelines must be designed by qualified person',
        'Fall arrest equipment must be removed from service after fall',
        'Inspection required before each use and annually',
        'Training required on proper use and inspection procedures'
      ]
    },
    {
      title: 'ANSI Z359 Fall Protection Standards',
      description: 'Comprehensive fall protection equipment standards',
      icon: 'shield-outline',
      source: 'ANSI Z359.1-2019',
      category: 'ANSI',
      content: [
        'Fall protection equipment design and performance requirements',
        'Full body harness design and attachment point requirements',
        'Connecting devices and energy absorber specifications',
        'Anchorage connector strength and design requirements',
        'Self-retracting device performance and testing standards',
        'Horizontal lifeline system design requirements',
        'Fall protection equipment marking and identification',
        'Inspection and maintenance requirements for equipment',
        'Training requirements for fall protection system users',
        'Rescue plan requirements for fall arrest situations',
        'Equipment retirement and replacement criteria',
        'Documentation requirements for fall protection programs'
      ]
    },
    {
      title: 'Saudi Aramco SAES-A-116 Fall Protection',
      description: 'Fall protection requirements for Saudi Aramco facilities',
      icon: 'business-outline',
      source: 'Saudi Aramco SAES-A-116',
      category: 'Saudi Aramco',
      content: [
        'Fall protection required at 1.8 meters (6 feet) height',
        'Competent person required for fall protection system design',
        'Fall protection plan required for all work at height',
        'Personal fall arrest system inspection before each use',
        'Rescue procedures must be established before work begins',
        'Fall protection training required for all personnel',
        'Contractor fall protection requirements and oversight',
        'Fall protection equipment certification and testing',
        'Incident investigation procedures for fall-related events',
        'Medical surveillance for personnel using fall protection',
        'Fall protection system maintenance and storage requirements',
        'Documentation and record keeping for fall protection activities'
      ]
    },
    {
      title: 'Ladder Safety Requirements',
      description: 'Safe use and inspection of ladders',
      icon: 'trending-up-outline',
      source: 'OSHA 29 CFR 1926.1053',
      category: 'OSHA',
      content: [
        'Ladder inspection required before each use',
        'Ladders must extend 3 feet above upper landing surface',
        'Ladder base must be placed 1 foot out for every 4 feet up',
        'Portable ladders must support 4 times maximum intended load',
        'Fixed ladders over 24 feet require fall protection systems',
        'Ladder cages required for fixed ladders over 20 feet',
        'Three-point contact maintained while climbing ladders',
        'Ladders must not be placed on boxes or other unstable bases',
        'Metal ladders prohibited near electrical equipment',
        'Ladder defects must result in immediate removal from service',
        'Training required for proper ladder use and inspection',
        'Step ladders must be fully opened and locked before use'
      ]
    },
    {
      title: 'Scaffold Fall Protection',
      description: 'Fall protection requirements for scaffold systems',
      icon: 'construct-outline',
      source: 'OSHA 29 CFR 1926.451',
      category: 'OSHA',
      content: [
        'Guardrails required on all open sides of scaffolds over 10 feet',
        'Personal fall arrest systems alternative to guardrails',
        'Scaffold platforms must be fully planked between uprights',
        'Midrails required when guardrails are used on scaffolds',
        'Toeboards required when tools or materials could fall',
        'Cross-bracing cannot be used as guardrails',
        'Scaffold access must be provided by ladder or stairway',
        'Fall protection required during scaffold erection/dismantling',
        'Competent person required for scaffold inspection',
        'Training required for employees working on scaffolds',
        'Scaffold load capacity must not be exceeded',
        'Weather conditions must be considered for scaffold use'
      ]
    },
    {
      title: 'Roof Work Fall Protection',
      description: 'Fall protection for roofing and roof maintenance',
      icon: 'home-outline',
      source: 'OSHA Construction Standards',
      category: 'OSHA',
      content: [
        'Low-slope roofs require fall protection at 6 feet from edge',
        'Steep roofs require fall protection regardless of height',
        'Warning line systems acceptable for low-slope roofs',
        'Safety monitoring systems for small roofing jobs',
        'Conventional fall protection preferred method',
        'Hole covers must be secured and marked on roofs',
        'Skylights must be guarded or covered to prevent falls',
        'Leading edge work requires fall arrest or guardrail systems',
        'Built-up roof work has specific fall protection requirements',
        'Roofing contractor training requirements for fall protection',
        'Weather restrictions for roof work activities',
        'Emergency response procedures for roof work incidents'
      ]
    },
    {
      title: 'Fall Protection Training Requirements',
      description: 'Training requirements for fall protection systems',
      icon: 'school-outline',
      source: 'OSHA 29 CFR 1926.503',
      category: 'OSHA',
      content: [
        'Training required before employees use fall protection systems',
        'Retraining required when changes in workplace occur',
        'Training must cover nature of fall hazards in work area',
        'Proper construction and use of fall protection systems',
        'Proper use of personal fall arrest systems',
        'Role of each employee in safety monitoring systems',
        'Limitations on use of mechanical equipment during roofing',
        'Correct procedures for handling and storage of materials',
        'Role of employees in fall protection plans',
        'Training certification and documentation requirements',
        'Competent person training for fall protection oversight',
        'Refresher training requirements and frequency'
      ]
    },
    {
      title: 'Anchorage Systems and Design',
      description: 'Design and installation of fall protection anchorages',
      icon: 'link-outline',
      source: 'ANSI Z359.1 / Engineering Standards',
      category: 'General',
      content: [
        'Anchorage points must support 5,000 pounds per employee',
        'Qualified person required for anchorage system design',
        'Structural analysis required for permanent anchorage points',
        'Temporary anchorage systems must be engineered',
        'Anchorage connector compatibility with personal equipment',
        'Multiple employee anchorage systems require higher capacity',
        'Anchorage point inspection and certification requirements',
        'Documentation required for anchorage system installations',
        'Anchorage point marking and identification requirements',
        'Load testing requirements for critical anchorage points',
        'Maintenance and inspection schedules for anchorage systems',
        'Removal criteria for damaged or questionable anchorages'
      ]
    },
    {
      title: 'Rescue Procedures and Planning',
      description: 'Emergency rescue procedures for fall arrest situations',
      icon: 'medical-outline',
      source: 'Industry Best Practice / ANSI Z359',
      category: 'General',
      content: [
        'Rescue plan required before beginning work with fall arrest',
        'Rescue must be accomplished within 15 minutes of fall',
        'Self-rescue preferred method when feasible',
        'Assisted rescue procedures and equipment requirements',
        'Emergency services notification and coordination',
        'Rescue equipment inspection and maintenance',
        'Training requirements for rescue team personnel',
        'Communication procedures during rescue operations',
        'Medical considerations for suspended workers',
        'Post-rescue medical evaluation requirements',
        'Rescue drill requirements and frequency',
        'Documentation and analysis of rescue incidents'
      ]
    },
    {
      title: 'Fall Protection Equipment Inspection',
      description: 'Inspection requirements for fall protection equipment',
      icon: 'eye-outline',
      source: 'OSHA / ANSI Standards',
      category: 'General',
      content: [
        'Visual inspection required before each use',
        'Competent person inspection requirements',
        'Annual detailed inspection by qualified person',
        'Inspection checklist for different equipment types',
        'Documentation requirements for inspection activities',
        'Equipment removal criteria for defects or damage',
        'Inspection of webbing, hardware, and stitching',
        'Load-bearing component inspection procedures',
        'Storage and handling inspection considerations',
        'Manufacturer inspection recommendations',
        'Third-party inspection requirements for critical equipment',
        'Record keeping requirements for inspection activities'
      ]
    },
    {
      title: 'Working at Height Risk Assessment',
      description: 'Risk assessment procedures for work at height',
      icon: 'analytics-outline',
      source: 'Industry Best Practice',
      category: 'General',
      content: [
        'Hazard identification for work at height activities',
        'Risk evaluation and control hierarchy application',
        'Elimination and substitution considerations',
        'Engineering controls for fall hazard reduction',
        'Administrative controls and work procedures',
        'Personal protective equipment as last resort',
        'Weather and environmental factor assessment',
        'Worker competency and training evaluation',
        'Emergency response capability assessment',
        'Equipment selection based on risk assessment',
        'Periodic review and update of risk assessments',
        'Documentation requirements for risk assessment activities'
      ]
    }
  ];

  const categories = ['All', 'OSHA', 'ANSI', 'Saudi Aramco', 'CSA', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: FallProtectionResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening fall protection resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#FF6B35';
      case 'ANSI': return '#0066CC';
      case 'Saudi Aramco': return '#00A651';
      case 'CSA': return '#FF4444';
      default: return '#2196F3';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          Fall Protection
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 16, fontSize: 16 }]}>
          Fall protection standards from OSHA, ANSI, and industry organizations
        </Text>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Search Fall Protection Resources</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[commonStyles.input, { paddingLeft: 40 }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search fall protection standards and procedures"
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
                    ? { backgroundColor: '#2196F3', borderColor: '#2196F3' }
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
            Fall Protection Resources ({filteredResources.length})
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
              No fall protection resources found matching your search criteria
            </Text>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: '#2196F3', marginTop: 20, marginBottom: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="person-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              Fall Protection Safety
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            Falls are a leading cause of workplace fatalities. Always use appropriate fall protection when working at height, inspect equipment before use, and ensure rescue procedures are in place.
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
