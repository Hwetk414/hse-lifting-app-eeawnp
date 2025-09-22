
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Icon from '../components/Icon';
import { commonStyles, colors } from '../styles/commonStyles';
import SimpleBottomSheet from '../components/BottomSheet';

interface CriticalLiftingResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'ASME' | 'Saudi Aramco' | 'API' | 'General';
}

export default function CriticalLiftingPlanScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<CriticalLiftingResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const router = useRouter();

  const criticalLiftingResources: CriticalLiftingResource[] = [
    {
      title: 'Critical Lift Definition & Criteria',
      description: 'What constitutes a critical lift and when special planning is required',
      icon: 'warning-outline',
      source: 'ASME B30.5 & Industry Standards',
      category: 'ASME',
      content: [
        'Critical Lift Criteria',
        '• Lifts exceeding 75% of crane rated capacity',
        '• Lifts over or near operating units or critical equipment',
        '• Lifts requiring multiple cranes (tandem lifts)',
        '• Lifts with limited clearance or tight tolerances',
        '• Lifts of hazardous materials or pressure vessels',
        '',
        'Load Weight Thresholds',
        '• Mobile cranes: >75% of rated capacity at radius',
        '• Tower cranes: >80% of rated capacity',
        '• Overhead cranes: >90% of rated capacity',
        '• Any lift where load approaches capacity limits',
        '',
        'Environmental Factors',
        '• Wind speeds approaching crane limitations',
        '• Lifts during adverse weather conditions',
        '• Night operations or limited visibility',
        '• Lifts over water or environmentally sensitive areas',
        '',
        'Operational Complexity',
        '• Blind lifts where operator cannot see load',
        '• Lifts requiring precise positioning',
        '• Lifts through or around obstacles',
        '• Personnel lifts or man-riding operations',
        '',
        'Regulatory Requirements',
        '• OSHA 1926.1404 requires critical lift procedures',
        '• Qualified rigger and signal person mandatory',
        '• Pre-lift meeting and planning required',
        '• Documentation and approval process needed'
      ]
    },
    {
      title: 'Critical Lift Planning Process',
      description: 'Step-by-step process for planning and executing critical lifts',
      icon: 'document-text-outline',
      source: 'Saudi Aramco SAES-L-007',
      category: 'Saudi Aramco',
      content: [
        'Pre-Planning Phase',
        '• Identify lift as critical based on established criteria',
        '• Assemble qualified lifting team (supervisor, operator, rigger)',
        '• Conduct site survey and hazard identification',
        '• Review equipment specifications and load charts',
        '• Develop preliminary lift plan and procedures',
        '',
        'Detailed Planning',
        '• Calculate actual load weight including rigging',
        '• Determine crane position and setup requirements',
        '• Select appropriate rigging equipment and configuration',
        '• Identify potential hazards and mitigation measures',
        '• Establish communication protocols and signals',
        '',
        'Plan Review and Approval',
        '• Technical review by qualified engineer',
        '• Safety review by HSE department',
        '• Operations approval from area supervisor',
        '• Final approval by lifting operations manager',
        '• Distribution to all involved personnel',
        '',
        'Pre-Lift Meeting',
        '• Review lift plan with all team members',
        '• Discuss roles, responsibilities, and procedures',
        '• Review emergency procedures and abort criteria',
        '• Confirm communication methods and signals',
        '• Address questions and concerns',
        '',
        'Execution and Monitoring',
        '• Verify all equipment and rigging per plan',
        '• Conduct final safety checks and inspections',
        '• Execute lift according to approved procedures',
        '• Monitor conditions throughout operation',
        '• Document completion and lessons learned'
      ]
    },
    {
      title: 'Load Calculation & Rigging Design',
      description: 'Methods for calculating total load weight and designing rigging systems',
      icon: 'calculator-outline',
      source: 'ASME B30.9 & B30.20',
      category: 'ASME',
      content: [
        'Load Weight Determination',
        '• Actual weight of item to be lifted',
        '• Weight of all rigging equipment (slings, shackles, blocks)',
        '• Weight of lifting attachments and spreader beams',
        '• Dynamic load factors for acceleration/deceleration',
        '• Safety factors per applicable standards',
        '',
        'Rigging Equipment Selection',
        '• Sling capacity based on configuration and angle',
        '• Shackle and hardware working load limits',
        '• Spreader beam or lifting frame requirements',
        '• Attachment point design and verification',
        '• Backup rigging for critical applications',
        '',
        'Load Distribution Analysis',
        '• Center of gravity determination',
        '• Load sharing between multiple attachment points',
        '• Sling angle effects on capacity',
        '• Dynamic loading during lift operations',
        '• Stability analysis for asymmetric loads',
        '',
        'Safety Factors',
        '• Minimum 5:1 safety factor for wire rope slings',
        '• Minimum 7:1 safety factor for synthetic slings',
        '• Reduced capacity for damaged or worn rigging',
        '• Environmental factors (temperature, chemicals)',
        '• Fatigue considerations for repeated use',
        '',
        'Documentation Requirements',
        '• Rigging design calculations and drawings',
        '• Equipment certificates and inspection records',
        '• Load test results for custom rigging',
        '• Approval signatures from qualified personnel',
        '• As-built documentation for future reference'
      ]
    },
    {
      title: 'Tandem Lift Operations',
      description: 'Special requirements for lifts involving multiple cranes',
      icon: 'git-merge-outline',
      source: 'OSHA 1926.1404(h)',
      category: 'OSHA',
      content: [
        'Planning Requirements',
        '• Qualified person must plan and supervise operation',
        '• Load sharing analysis between cranes required',
        '• Detailed lift plan with crane positions and movements',
        '• Communication plan between operators established',
        '• Emergency procedures for crane failure scenarios',
        '',
        'Load Sharing Calculations',
        '• Determine load distribution between cranes',
        '• Account for load center of gravity shifts',
        '• Calculate maximum load on each crane',
        '• Verify capacity at all lift positions',
        '• Include dynamic loading factors',
        '',
        'Equipment Requirements',
        '• Cranes must have similar operating characteristics',
        '• Load block rigging must prevent load transfer',
        '• Positive communication system between operators',
        '• Qualified signal person for each crane',
        '• Backup rigging systems where practical',
        '',
        'Operational Procedures',
        '• Synchronized movement of both cranes',
        '• Continuous monitoring of load distribution',
        '• Immediate stop capability for either crane',
        '• Regular communication between all personnel',
        '• Abort procedures if problems develop',
        '',
        'Special Considerations',
        '• Ground conditions must support both cranes',
        '• Adequate clearance between cranes and obstacles',
        '• Weather limitations more restrictive',
        '• Additional personnel for monitoring and control',
        '• Enhanced documentation and approval process'
      ]
    },
    {
      title: 'Risk Assessment for Critical Lifts',
      description: 'Comprehensive risk evaluation and mitigation strategies',
      icon: 'shield-checkmark-outline',
      source: 'API RP 2D',
      category: 'API',
      content: [
        'Hazard Identification',
        '• Structural failure of crane or rigging',
        '• Load dropping or uncontrolled movement',
        '• Contact with overhead power lines',
        '• Ground instability or crane overturning',
        '• Personnel injury from moving equipment',
        '',
        'Risk Assessment Matrix',
        '• Probability: Rare, Unlikely, Possible, Likely, Almost Certain',
        '• Consequence: Insignificant, Minor, Moderate, Major, Catastrophic',
        '• Risk Level: Low, Medium, High, Extreme',
        '• Acceptability criteria and approval levels',
        '• Residual risk after mitigation measures',
        '',
        'Mitigation Strategies',
        '• Engineering controls (barriers, load blocks, outriggers)',
        '• Administrative controls (procedures, training, permits)',
        '• Personal protective equipment requirements',
        '• Emergency response and rescue procedures',
        '• Continuous monitoring and inspection',
        '',
        'Environmental Factors',
        '• Wind speed and direction monitoring',
        '• Ground conditions and stability',
        '• Visibility and lighting requirements',
        '• Temperature effects on equipment',
        '• Proximity to hazardous operations',
        '',
        'Human Factors',
        '• Competency and certification of personnel',
        '• Fatigue and work schedule considerations',
        '• Communication effectiveness',
        '• Stress and pressure factors',
        '• Training and experience levels'
      ]
    },
    {
      title: 'Critical Lift Documentation',
      description: 'Required documentation and record keeping for critical lifts',
      icon: 'folder-outline',
      source: 'Industry Best Practice',
      category: 'General',
      content: [
        'Pre-Lift Documentation',
        '• Critical lift identification and classification',
        '• Detailed lift plan with drawings and calculations',
        '• Equipment inspection certificates and load charts',
        '• Personnel qualifications and certifications',
        '• Risk assessment and mitigation measures',
        '',
        'Approval Documentation',
        '• Technical review and approval signatures',
        '• Safety department review and sign-off',
        '• Operations management approval',
        '• Permit to work or lift authorization',
        '• Insurance and liability considerations',
        '',
        'Execution Records',
        '• Pre-lift meeting attendance and minutes',
        '• Equipment setup and inspection checklists',
        '• Weather conditions and environmental factors',
        '• Actual lift execution timeline and notes',
        '• Any deviations from planned procedures',
        '',
        'Post-Lift Documentation',
        '• Lift completion certification',
        '• Equipment post-operation inspection',
        '• Lessons learned and improvement opportunities',
        '• Incident reports if applicable',
        '• Performance metrics and KPIs',
        '',
        'Record Retention',
        '• Minimum 5-year retention for critical lift records',
        '• Electronic storage with backup systems',
        '• Access controls and confidentiality',
        '• Regular audit and review processes',
        '• Integration with overall safety management system'
      ]
    }
  ];

  const filteredResources = criticalLiftingResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openResource = (resource: CriticalLiftingResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#1976D2';
      case 'ASME': return '#388E3C';
      case 'Saudi Aramco': return '#F57C00';
      case 'API': return '#7B1FA2';
      default: return colors.primary;
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={commonStyles.backButton}
        >
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Critical Lifting Plan</Text>
      </View>

      <View style={commonStyles.content}>
        <View style={commonStyles.searchContainer}>
          <Icon name="search-outline" size={20} color={colors.textLight} />
          <TextInput
            style={commonStyles.searchInput}
            placeholder="Search critical lifting resources..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textLight}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredResources.length === 0 ? (
            <View style={commonStyles.emptyState}>
              <Icon name="search-outline" size={48} color={colors.textLight} />
              <Text style={commonStyles.emptyStateText}>
                No resources found matching "{searchQuery}"
              </Text>
            </View>
          ) : (
            filteredResources.map((resource, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  commonStyles.card,
                  { borderLeftWidth: 4, borderLeftColor: getCategoryColor(resource.category) }
                ]}
                onPress={() => openResource(resource)}
                activeOpacity={0.7}
              >
                <View style={commonStyles.row}>
                  <View style={{ flex: 1 }}>
                    <View style={[commonStyles.row, { marginBottom: 8 }]}>
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
                        <View style={[commonStyles.badge, { backgroundColor: getCategoryColor(resource.category) + '20' }]}>
                          <Text style={[commonStyles.badgeText, { color: getCategoryColor(resource.category) }]}>
                            {resource.category}
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
            ))
          )}
        </ScrollView>
      </View>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title={selectedResource?.title || ''}
        subtitle={selectedResource?.source || ''}
      >
        {selectedResource && (
          <ScrollView style={{ maxHeight: 400 }}>
            {selectedResource.content.map((line, index) => (
              <Text
                key={index}
                style={[
                  commonStyles.text,
                  {
                    marginBottom: line === '' ? 12 : 4,
                    fontWeight: line.startsWith('•') ? 'normal' : 
                               line.endsWith(':') || (!line.startsWith('•') && !line.startsWith(' ') && line !== '') ? '600' : 'normal',
                    marginLeft: line.startsWith('•') ? 16 : 0,
                  }
                ]}
              >
                {line}
              </Text>
            ))}
          </ScrollView>
        )}
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
