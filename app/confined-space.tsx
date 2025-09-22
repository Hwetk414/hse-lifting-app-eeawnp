
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface ConfinedSpaceResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'NIOSH' | 'Saudi Aramco' | 'API' | 'General';
}

export default function ConfinedSpaceScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ConfinedSpaceResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: ConfinedSpaceResource[] = [
    {
      title: 'OSHA Permit-Required Confined Spaces',
      description: 'Requirements for permit-required confined space entry',
      icon: 'cube-outline',
      source: 'OSHA 29 CFR 1910.146',
      category: 'OSHA',
      content: [
        'Written permit-required confined space program required',
        'Confined space identification and evaluation procedures',
        'Entry permit system with authorized entrant limitations',
        'Atmospheric testing required before and during entry',
        'Continuous atmospheric monitoring during occupied entry',
        'Ventilation requirements for confined space entry',
        'Entry supervisor responsibilities and qualifications',
        'Attendant duties and communication requirements',
        'Emergency response and rescue procedures',
        'Training requirements for all confined space personnel',
        'Equipment requirements for safe entry operations',
        'Contractor coordination for confined space work'
      ]
    },
    {
      title: 'Atmospheric Testing and Monitoring',
      description: 'Air quality testing procedures for confined spaces',
      icon: 'speedometer-outline',
      source: 'OSHA / Industry Standards',
      category: 'General',
      content: [
        'Test atmosphere before entry in this order: oxygen, flammable, toxic',
        'Oxygen levels must be between 19.5% and 23.5%',
        'Flammable gases must be below 10% of Lower Explosive Limit',
        'Toxic substances must be below Permissible Exposure Limits',
        'Calibrated direct-reading instruments required for testing',
        'Test from outside the space before entry',
        'Continuous monitoring required during occupied entry',
        'Test all levels of space due to gas stratification',
        'Ventilation may be required to maintain acceptable levels',
        'Document all atmospheric test results',
        'Retest atmosphere if conditions change',
        'Emergency evacuation if atmospheric conditions deteriorate'
      ]
    },
    {
      title: 'Saudi Aramco SAES-A-105 Confined Space Entry',
      description: 'Confined space entry procedures for Saudi Aramco',
      icon: 'business-outline',
      source: 'Saudi Aramco SAES-A-105',
      category: 'Saudi Aramco',
      content: [
        'Confined space entry permit required for all entries',
        'Gas testing by certified personnel before entry',
        'Continuous atmospheric monitoring during entry',
        'Mechanical ventilation required for most entries',
        'Emergency rescue plan must be established',
        'Communication system between entrant and attendant',
        'Personal protective equipment based on hazard assessment',
        'Hot work permits required for welding in confined spaces',
        'Medical surveillance for confined space workers',
        'Training and certification for confined space personnel',
        'Contractor confined space safety requirements',
        'Incident investigation procedures for confined space events'
      ]
    },
    {
      title: 'Ventilation Requirements',
      description: 'Ventilation systems for confined space safety',
      icon: 'refresh-outline',
      source: 'OSHA / ACGIH Guidelines',
      category: 'General',
      content: [
        'Mechanical ventilation preferred over natural ventilation',
        'Supply air must be from clean source outside space',
        'Exhaust ventilation to remove contaminants',
        'Air flow rate sufficient to maintain safe atmosphere',
        'Ventilation system must not create additional hazards',
        'Flexible ducting properly supported and positioned',
        'Ventilation equipment intrinsically safe in flammable atmospheres',
        'Continuous operation during occupied entry',
        'Backup ventilation equipment available if needed',
        'Regular inspection and maintenance of ventilation equipment',
        'Air flow patterns designed to prevent dead air spaces',
        'Ventilation effectiveness verified by atmospheric testing'
      ]
    },
    {
      title: 'Entry Permits and Documentation',
      description: 'Permit system and documentation for confined space entry',
      icon: 'document-text-outline',
      source: 'OSHA 29 CFR 1910.146',
      category: 'OSHA',
      content: [
        'Entry permit required before each entry operation',
        'Permit valid for specific entry and time period only',
        'Entry supervisor must sign and date permit',
        'Atmospheric test results documented on permit',
        'Safety equipment and procedures specified on permit',
        'Emergency contact information included on permit',
        'Permit posted at entry point during operations',
        'Permit canceled when entry operations completed',
        'Permits retained for at least one year',
        'Permit review and approval process established',
        'Permit modifications require supervisor approval',
        'Copy of permit available to all entry team members'
      ]
    },
    {
      title: 'Rescue and Emergency Response',
      description: 'Emergency response procedures for confined spaces',
      icon: 'medical-outline',
      source: 'OSHA / NIOSH Guidelines',
      category: 'General',
      content: [
        'Rescue plan required before entry operations begin',
        'Non-entry rescue preferred over entry rescue',
        'Mechanical retrieval systems for non-entry rescue',
        'Emergency services notification and coordination',
        'Rescue team training and equipment requirements',
        'Communication procedures during emergency situations',
        'Medical support availability during entry operations',
        'Emergency equipment inspection and maintenance',
        'Rescue drill requirements and frequency',
        'Post-incident medical evaluation for exposed personnel',
        'Emergency evacuation procedures and signals',
        'Coordination with local emergency response services'
      ]
    },
    {
      title: 'Personal Protective Equipment',
      description: 'PPE requirements for confined space entry',
      icon: 'shield-outline',
      source: 'OSHA / Industry Standards',
      category: 'General',
      content: [
        'PPE selection based on confined space hazard assessment',
        'Respiratory protection for atmospheric hazards',
        'Full body harness for retrieval systems',
        'Chemical-resistant clothing for chemical hazards',
        'Head protection for overhead hazards',
        'Eye and face protection as required',
        'Hearing protection for noise hazards',
        'Intrinsically safe equipment in flammable atmospheres',
        'PPE inspection before each use',
        'Training on proper PPE use and limitations',
        'PPE maintenance and storage requirements',
        'Emergency PPE for rescue operations'
      ]
    },
    {
      title: 'Hot Work in Confined Spaces',
      description: 'Special procedures for hot work in confined spaces',
      icon: 'flame-outline',
      source: 'OSHA / NFPA Standards',
      category: 'General',
      content: [
        'Hot work permit required in addition to entry permit',
        'Fire watch required during and after hot work',
        'Combustible materials removed from work area',
        'Continuous atmospheric monitoring during hot work',
        'Fire extinguishing equipment readily available',
        'Ventilation to remove welding fumes and gases',
        'Respiratory protection for welding operations',
        'Emergency evacuation procedures for fire situations',
        'Post-work inspection for fire hazards',
        'Training requirements for hot work in confined spaces',
        'Coordination between entry supervisor and fire watch',
        'Special precautions for flammable atmosphere potential'
      ]
    },
    {
      title: 'Training Requirements',
      description: 'Training requirements for confined space personnel',
      icon: 'school-outline',
      source: 'OSHA 29 CFR 1910.146',
      category: 'OSHA',
      content: [
        'Training required before initial assignment to confined space work',
        'Retraining required when job assignments change',
        'Training must cover confined space hazards and controls',
        'Entry procedures and permit system training',
        'Atmospheric testing and monitoring training',
        'PPE selection and use training',
        'Emergency response and rescue procedures training',
        'Communication procedures and equipment training',
        'Training documentation and certification requirements',
        'Refresher training requirements and frequency',
        'Competency assessment and verification',
        'Specialized training for entry supervisors and attendants'
      ]
    },
    {
      title: 'Hazard Identification and Assessment',
      description: 'Identifying and assessing confined space hazards',
      icon: 'eye-outline',
      source: 'OSHA / Industry Best Practice',
      category: 'General',
      content: [
        'Atmospheric hazards: oxygen deficiency, toxicity, flammability',
        'Physical hazards: engulfment, entrapment, falls',
        'Mechanical hazards: rotating equipment, electrical systems',
        'Process hazards: temperature extremes, pressure changes',
        'Biological hazards: bacteria, mold, animal waste',
        'Ergonomic hazards: confined posture, limited mobility',
        'Environmental hazards: weather, lighting, noise',
        'Human factors: claustrophobia, panic, fatigue',
        'Hazard assessment documentation requirements',
        'Periodic reassessment of confined space hazards',
        'Change management for modified confined spaces',
        'Contractor hazard communication requirements'
      ]
    },
    {
      title: 'Non-Permit Confined Spaces',
      description: 'Requirements for non-permit confined spaces',
      icon: 'checkmark-circle-outline',
      source: 'OSHA 29 CFR 1910.146',
      category: 'OSHA',
      content: [
        'Confined spaces without permit-required hazards',
        'Continuous forced air ventilation eliminates hazards',
        'Atmospheric testing verifies safe conditions',
        'No permit required but safety precautions still needed',
        'Reclassification procedures if conditions change',
        'Training requirements for non-permit space entry',
        'Documentation of non-permit space determination',
        'Periodic reevaluation of space classification',
        'Emergency procedures for unexpected hazards',
        'Communication requirements during entry',
        'Equipment requirements for safe entry',
        'Supervision requirements for non-permit entries'
      ]
    },
    {
      title: 'Contractor Management',
      description: 'Managing contractors for confined space work',
      icon: 'people-outline',
      source: 'OSHA / Industry Standards',
      category: 'General',
      content: [
        'Contractor qualification and certification verification',
        'Confined space hazard communication to contractors',
        'Contractor safety program review and approval',
        'Training verification for contractor personnel',
        'Equipment inspection and certification requirements',
        'Permit coordination between host and contractor',
        'Emergency response coordination and communication',
        'Incident reporting and investigation procedures',
        'Insurance and liability requirements',
        'Performance monitoring and safety oversight',
        'Corrective action procedures for safety violations',
        'Documentation requirements for contractor activities'
      ]
    }
  ];

  const categories = ['All', 'OSHA', 'NIOSH', 'Saudi Aramco', 'API', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: ConfinedSpaceResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening confined space resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#FF6B35';
      case 'NIOSH': return '#4CAF50';
      case 'Saudi Aramco': return '#00A651';
      case 'API': return '#0066CC';
      default: return '#795548';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          Confined Space Safety
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 16, fontSize: 16 }]}>
          Confined space safety standards from OSHA, NIOSH, and industry organizations
        </Text>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Search Confined Space Resources</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[commonStyles.input, { paddingLeft: 40 }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search confined space standards and procedures"
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
                    ? { backgroundColor: '#795548', borderColor: '#795548' }
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
            Confined Space Resources ({filteredResources.length})
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
              No confined space resources found matching your search criteria
            </Text>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: '#795548', marginTop: 20, marginBottom: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="cube-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              Confined Space Warning
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            Confined spaces can be deadly. Never enter without proper permits, atmospheric testing, and rescue procedures. Test the atmosphere, ventilate the space, and maintain continuous communication with attendants.
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
