
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface EmergencyResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'FEMA' | 'NFPA' | 'Saudi Aramco' | 'General';
}

export default function EmergencyResponseScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<EmergencyResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: EmergencyResource[] = [
    {
      title: 'Emergency Action Plans',
      description: 'Workplace emergency evacuation and response procedures',
      icon: 'exit-outline',
      source: 'OSHA 29 CFR 1910.38',
      category: 'OSHA',
      content: [
        'Written emergency action plan required for workplaces',
        'Emergency evacuation procedures and escape route assignments',
        'Procedures for employees who remain to operate critical equipment',
        'Procedures to account for all employees after evacuation',
        'Rescue and medical duties for designated employees',
        'Preferred means of reporting fires and other emergencies',
        'Names or job titles of persons to contact for plan information',
        'Employee training on emergency action plan procedures',
        'Review of plan with each employee covered by the plan',
        'Plan must be kept at workplace and available to employees',
        'Alarm system requirements for emergency notification',
        'Coordination with local emergency response services'
      ]
    },
    {
      title: 'Incident Command System (ICS)',
      description: 'Standardized emergency management system',
      icon: 'people-outline',
      source: 'FEMA / NIMS Standards',
      category: 'FEMA',
      content: [
        'Standardized organizational structure for emergency response',
        'Command function responsible for overall incident management',
        'Operations section manages tactical response activities',
        'Planning section develops action plans and resource tracking',
        'Logistics section provides support and resources',
        'Finance/Administration section tracks costs and administrative needs',
        'Unified command for multi-agency or multi-jurisdictional incidents',
        'Span of control typically 3-7 subordinates per supervisor',
        'Common terminology and communication procedures',
        'Integrated communications plan for all response agencies',
        'Establishment and transfer of command procedures',
        'Resource management and accountability systems'
      ]
    },
    {
      title: 'Medical Emergency Response',
      description: 'First aid and medical emergency procedures',
      icon: 'medical-outline',
      source: 'OSHA / American Red Cross',
      category: 'General',
      content: [
        'First aid trained personnel available during all work shifts',
        'First aid supplies readily accessible to all employees',
        'Emergency medical services contact information posted',
        'CPR and AED training for designated response personnel',
        'Medical emergency response procedures and protocols',
        'Communication procedures for medical emergencies',
        'Transportation arrangements for injured employees',
        'Documentation requirements for workplace injuries',
        'Blood-borne pathogen protection for first aid responders',
        'Regular inspection and restocking of first aid supplies',
        'Training requirements for workplace first aid responders',
        'Coordination with local emergency medical services'
      ]
    },
    {
      title: 'Fire Emergency Response',
      description: 'Fire emergency procedures and evacuation',
      icon: 'flame-outline',
      source: 'NFPA / OSHA Standards',
      category: 'NFPA',
      content: [
        'Fire alarm system activation and notification procedures',
        'Immediate evacuation procedures for fire emergencies',
        'Fire department notification and communication',
        'Designated assembly areas for evacuated personnel',
        'Employee accountability procedures during evacuation',
        'Fire extinguisher use by trained personnel only',
        'Shutdown procedures for equipment and utilities',
        'Special procedures for hazardous material areas',
        'Fire watch procedures during hot work operations',
        'Emergency lighting and exit sign requirements',
        'Fire drill requirements and frequency',
        'Coordination with local fire department services'
      ]
    },
    {
      title: 'Chemical Spill Response',
      description: 'Emergency response to chemical spills and releases',
      icon: 'flask-outline',
      source: 'EPA / OSHA HAZWOPER',
      category: 'General',
      content: [
        'Immediate response: secure area and evacuate personnel',
        'Spill assessment and hazard identification procedures',
        'Personal protective equipment for response personnel',
        'Spill containment using appropriate materials and methods',
        'Neutralization procedures for specific chemical types',
        'Cleanup and decontamination procedures',
        'Waste disposal requirements for contaminated materials',
        'Notification requirements for regulatory agencies',
        'Documentation and incident reporting procedures',
        'Post-incident analysis and corrective action procedures',
        'Training requirements for spill response team members',
        'Emergency equipment inspection and maintenance'
      ]
    },
    {
      title: 'Saudi Aramco Emergency Response',
      description: 'Emergency response procedures for Saudi Aramco facilities',
      icon: 'business-outline',
      source: 'Saudi Aramco SAES-A-101',
      category: 'Saudi Aramco',
      content: [
        'Emergency response organization and command structure',
        'Emergency notification and communication procedures',
        'Evacuation procedures and assembly point assignments',
        'Emergency response team training and qualifications',
        'Coordination with local emergency services',
        'Emergency equipment and resource management',
        'Incident investigation and reporting procedures',
        'Business continuity and recovery planning',
        'Contractor emergency response requirements',
        'Emergency drill requirements and evaluation',
        'Crisis communication and public information',
        'Post-emergency analysis and improvement procedures'
      ]
    },
    {
      title: 'Severe Weather Response',
      description: 'Emergency procedures for severe weather events',
      icon: 'thunderstorm-outline',
      source: 'NOAA / Emergency Management',
      category: 'General',
      content: [
        'Weather monitoring and early warning systems',
        'Tornado warning response and shelter procedures',
        'Hurricane and high wind preparation procedures',
        'Flood emergency response and evacuation procedures',
        'Lightning safety procedures for outdoor workers',
        'Extreme temperature protection procedures',
        'Communication procedures during weather emergencies',
        'Utility shutdown procedures for severe weather',
        'Post-storm damage assessment and recovery',
        'Employee safety during weather-related travel',
        'Emergency supplies and equipment for weather events',
        'Coordination with local emergency management agencies'
      ]
    },
    {
      title: 'Workplace Violence Response',
      description: 'Response procedures for workplace violence incidents',
      icon: 'shield-checkmark-outline',
      source: 'OSHA Guidelines / Security Standards',
      category: 'General',
      content: [
        'Workplace violence prevention program implementation',
        'Threat assessment and reporting procedures',
        'Immediate response to violent incidents',
        'Law enforcement notification and coordination',
        'Employee safety and evacuation procedures',
        'Lockdown procedures for active threat situations',
        'Communication procedures during violent incidents',
        'Post-incident support and counseling services',
        'Investigation procedures for workplace violence',
        'Training requirements for workplace violence response',
        'Security measures and access control procedures',
        'Coordination with local law enforcement agencies'
      ]
    },
    {
      title: 'Hazardous Material Emergencies',
      description: 'Response to hazardous material incidents and releases',
      icon: 'nuclear-outline',
      source: 'EPA / DOT Emergency Response',
      category: 'General',
      content: [
        'Hazardous material identification and classification',
        'Emergency response guidebook utilization',
        'Isolation and evacuation distance determination',
        'Personal protective equipment for hazmat response',
        'Decontamination procedures for personnel and equipment',
        'Air monitoring and atmospheric testing',
        'Notification requirements for hazmat incidents',
        'Specialized response team activation procedures',
        'Transportation incident response procedures',
        'Environmental protection and cleanup procedures',
        'Public information and media relations',
        'Recovery and restoration procedures'
      ]
    },
    {
      title: 'Emergency Communication Systems',
      description: 'Communication procedures and systems for emergencies',
      icon: 'radio-outline',
      source: 'Emergency Management Standards',
      category: 'General',
      content: [
        'Primary and backup communication systems',
        'Emergency notification procedures and methods',
        'Communication with emergency response agencies',
        'Public address and alarm system operation',
        'Two-way radio communication procedures',
        'Emergency contact lists and notification trees',
        'Communication during power outages',
        'Social media and public information procedures',
        'Communication with families and next of kin',
        'Multi-language communication capabilities',
        'Communication equipment testing and maintenance',
        'Backup communication center establishment'
      ]
    },
    {
      title: 'Business Continuity Planning',
      description: 'Maintaining operations during and after emergencies',
      icon: 'business-outline',
      source: 'Business Continuity Standards',
      category: 'General',
      content: [
        'Business impact analysis and risk assessment',
        'Critical business function identification',
        'Recovery time objectives and priorities',
        'Alternate facility and workspace arrangements',
        'Data backup and recovery procedures',
        'Supply chain and vendor contingency planning',
        'Employee notification and work arrangements',
        'Financial and insurance considerations',
        'Stakeholder communication procedures',
        'Testing and exercising of continuity plans',
        'Plan maintenance and update procedures',
        'Integration with emergency response plans'
      ]
    },
    {
      title: 'Emergency Training and Drills',
      description: 'Training requirements and drill procedures',
      icon: 'school-outline',
      source: 'OSHA / Emergency Management',
      category: 'General',
      content: [
        'Emergency response training for all employees',
        'Specialized training for emergency response team members',
        'Regular emergency drill requirements and frequency',
        'Drill evaluation and improvement procedures',
        'Training documentation and record keeping',
        'New employee emergency response orientation',
        'Annual refresher training requirements',
        'Tabletop exercises for emergency scenarios',
        'Full-scale emergency response exercises',
        'Training coordination with local emergency services',
        'Emergency response competency assessment',
        'Lessons learned integration into training programs'
      ]
    }
  ];

  const categories = ['All', 'OSHA', 'FEMA', 'NFPA', 'Saudi Aramco', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: EmergencyResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening emergency response resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#FF6B35';
      case 'FEMA': return '#0066CC';
      case 'NFPA': return '#FF4444';
      case 'Saudi Aramco': return '#00A651';
      default: return '#F44336';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          Emergency Response
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 16, fontSize: 16 }]}>
          Emergency response standards from OSHA, FEMA, NFPA, and industry organizations
        </Text>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Search Emergency Response Resources</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[commonStyles.input, { paddingLeft: 40 }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search emergency response standards and procedures"
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
                    ? { backgroundColor: '#F44336', borderColor: '#F44336' }
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
            Emergency Response Resources ({filteredResources.length})
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
              No emergency response resources found matching your search criteria
            </Text>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: '#F44336', marginTop: 20, marginBottom: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="medical-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              Emergency Preparedness
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            Emergency preparedness saves lives. Know your evacuation routes, understand emergency procedures, and participate in drills. In an emergency, stay calm and follow established procedures.
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
