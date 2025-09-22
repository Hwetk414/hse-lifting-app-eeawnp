
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from '../components/Icon';
import { commonStyles, colors } from '../styles/commonStyles';
import SimpleBottomSheet from '../components/BottomSheet';

interface ExcavationResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'ANSI' | 'Saudi Aramco' | 'API' | 'General';
}

export default function ExcavationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ExcavationResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const router = useRouter();

  const excavationResources: ExcavationResource[] = [
    {
      title: 'Excavation Safety Standards',
      description: 'General safety requirements for excavation work',
      icon: 'construct-outline',
      source: 'OSHA 1926 Subpart P',
      category: 'OSHA',
      content: [
        'Excavations 5 feet or deeper require protective systems',
        'Daily inspection by competent person before work begins',
        'Safe means of egress within 25 feet of workers',
        'Spoil piles must be at least 2 feet from excavation edge',
        'Protective systems required in unstable or soft material',
        'Water accumulation requires special precautions',
        'Atmospheric testing in excavations over 4 feet deep',
        'Emergency rescue equipment readily available'
      ]
    },
    {
      title: 'Soil Classification System',
      description: 'Classification of soil types for excavation safety',
      icon: 'layers-outline',
      source: 'OSHA 1926.652',
      category: 'OSHA',
      content: [
        'Type A: Cohesive soils with unconfined strength ≥ 1.5 tons/sq ft',
        'Type B: Cohesive soils with unconfined strength 0.5-1.5 tons/sq ft',
        'Type C: Cohesive soils with unconfined strength ≤ 0.5 tons/sq ft',
        'Granular soils including sand, silt, loam, and gravel',
        'Submerged soil or soil from which water is freely seeping',
        'Previously disturbed soils except stable rock',
        'Visual and manual tests required for classification',
        'Professional soil analysis when conditions are unclear'
      ]
    },
    {
      title: 'Protective Systems',
      description: 'Sloping, benching, and shoring systems for excavations',
      icon: 'shield-outline',
      source: 'OSHA 1926.652(b)',
      category: 'OSHA',
      content: [
        'Sloping: Cut back trench wall at angle to prevent cave-ins',
        'Benching: Excavate sides to form horizontal levels or steps',
        'Shoring: Install aluminum hydraulic or other shoring systems',
        'Shielding: Use trench boxes or other protective shields',
        'Maximum allowable slopes vary by soil type',
        'Proper installation by qualified personnel required',
        'Regular inspection of protective systems',
        'Removal procedures to ensure worker safety'
      ]
    },
    {
      title: 'Utility Location and Protection',
      description: 'Procedures for locating and protecting underground utilities',
      icon: 'flash-outline',
      source: 'Saudi Aramco SAES-A-120',
      category: 'Saudi Aramco',
      content: [
        'Call utility location service before excavation begins',
        'Hand digging required within tolerance zone of utilities',
        'Proper support and protection of exposed utilities',
        'Coordination with utility owners for complex excavations',
        'Use of non-conductive tools near electrical utilities',
        'Proper backfill procedures around utilities',
        'Documentation of utility locations and conditions',
        'Emergency contact information readily available'
      ]
    },
    {
      title: 'Excavation Inspection Requirements',
      description: 'Daily and periodic inspection procedures for excavations',
      icon: 'search-outline',
      source: 'OSHA 1926.651(k)',
      category: 'OSHA',
      content: [
        'Daily inspection by competent person before work starts',
        'Inspection after rainstorms or other hazard-increasing events',
        'Check for evidence of cave-ins, slides, or tension cracks',
        'Verify adequacy of protective systems',
        'Assess water accumulation and drainage',
        'Evaluate atmospheric conditions if applicable',
        'Document inspection findings and corrective actions',
        'Stop work if unsafe conditions are identified'
      ]
    },
    {
      title: 'Trenching Operations',
      description: 'Specific safety requirements for trenching work',
      icon: 'git-branch-outline',
      source: 'ANSI A10.12',
      category: 'ANSI',
      content: [
        'Minimum trench width for worker safety and equipment',
        'Proper ladder placement every 25 feet maximum',
        'Adequate lighting for work in trenches',
        'Communication systems between surface and trench workers',
        'Weather monitoring and work suspension criteria',
        'Proper entry and exit procedures',
        'Tool and material handling safety',
        'Coordination with surface activities'
      ]
    },
    {
      title: 'Atmospheric Hazards in Excavations',
      description: 'Recognition and control of atmospheric hazards',
      icon: 'cloud-outline',
      source: 'OSHA 1926.651(g)',
      category: 'OSHA',
      content: [
        'Testing required for excavations over 4 feet deep',
        'Test for oxygen deficiency, flammable gases, and toxic substances',
        'Continuous monitoring in hazardous atmospheres',
        'Ventilation systems when required',
        'Emergency evacuation procedures',
        'Respiratory protection when necessary',
        'Gas detection equipment calibration and maintenance',
        'Training on atmospheric hazard recognition'
      ]
    },
    {
      title: 'Heavy Equipment Safety',
      description: 'Safety procedures for equipment operation near excavations',
      icon: 'car-outline',
      source: 'Saudi Aramco SAES-A-120',
      category: 'Saudi Aramco',
      content: [
        'Minimum distance requirements from excavation edges',
        'Proper equipment inspection before operation',
        'Qualified operator certification requirements',
        'Communication between operators and ground personnel',
        'Proper equipment positioning and stability',
        'Load limitations near excavation edges',
        'Emergency shutdown procedures',
        'Coordination with other site activities'
      ]
    },
    {
      title: 'Excavation Emergency Procedures',
      description: 'Emergency response for excavation incidents',
      icon: 'medical-outline',
      source: 'General Safety',
      category: 'General',
      content: [
        'Immediate response procedures for cave-ins',
        'Rescue equipment and personnel availability',
        'Emergency communication systems',
        'Medical response for buried or injured workers',
        'Evacuation procedures for all personnel',
        'Incident command system activation',
        'Documentation and investigation requirements',
        'Post-incident safety assessment'
      ]
    },
    {
      title: 'Backfilling and Compaction',
      description: 'Safe procedures for backfilling excavations',
      icon: 'layers-outline',
      source: 'API RP 1102',
      category: 'API',
      content: [
        'Proper material selection for backfill',
        'Compaction requirements and testing',
        'Protection of utilities during backfill',
        'Proper equipment operation procedures',
        'Quality control and inspection requirements',
        'Environmental considerations for backfill material',
        'Documentation of backfill operations',
        'Final grade and restoration requirements'
      ]
    },
    {
      title: 'Competent Person Requirements',
      description: 'Qualifications and responsibilities of competent persons',
      icon: 'person-outline',
      source: 'OSHA 1926.650(b)',
      category: 'OSHA',
      content: [
        'Training in soil analysis and protective systems',
        'Authority to take prompt corrective measures',
        'Knowledge of excavation standards and regulations',
        'Experience in excavation operations',
        'Ability to identify existing and predictable hazards',
        'Daily inspection and documentation responsibilities',
        'Communication with workers and management',
        'Continuous presence during excavation operations'
      ]
    },
    {
      title: 'Excavation Planning and Design',
      description: 'Pre-excavation planning and engineering requirements',
      icon: 'document-text-outline',
      source: 'Saudi Aramco SAES-A-120',
      category: 'Saudi Aramco',
      content: [
        'Site investigation and soil analysis',
        'Utility location and coordination',
        'Traffic control and site access planning',
        'Environmental impact assessment',
        'Emergency response plan development',
        'Equipment selection and positioning',
        'Worker training and qualification verification',
        'Permit requirements and regulatory compliance'
      ]
    }
  ];

  const filteredResources = excavationResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openResource = (resource: ExcavationResource) => {
    console.log('Opening excavation resource:', resource.title);
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#1976D2';
      case 'ANSI': return '#388E3C';
      case 'Saudi Aramco': return '#F57C00';
      case 'API': return '#E91E63';
      case 'General': return '#5D4037';
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
        <Text style={commonStyles.headerTitle}>Excavations</Text>
      </View>

      <View style={commonStyles.content}>
        <View style={commonStyles.searchContainer}>
          <Icon name="search-outline" size={20} color={colors.textLight} />
          <TextInput
            style={commonStyles.searchInput}
            placeholder="Search excavation resources..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textLight}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle-outline" size={20} color={colors.textLight} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {filteredResources.length === 0 ? (
            <View style={commonStyles.emptyState}>
              <Icon name="search-outline" size={48} color={colors.textLight} />
              <Text style={[commonStyles.subtitle, { marginTop: 16, textAlign: 'center' }]}>
                No resources found
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
                Try adjusting your search terms
              </Text>
            </View>
          ) : (
            filteredResources.map((resource, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  commonStyles.card,
                  { 
                    borderLeftWidth: 4, 
                    borderLeftColor: getCategoryColor(resource.category),
                    marginBottom: 12
                  }
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
                        <View style={[commonStyles.row, { alignItems: 'center' }]}>
                          <View style={[
                            commonStyles.badge,
                            { backgroundColor: getCategoryColor(resource.category) }
                          ]}>
                            <Text style={[commonStyles.badgeText, { color: 'white' }]}>
                              {resource.category}
                            </Text>
                          </View>
                          <Text style={[commonStyles.textLight, { marginLeft: 8, fontSize: 12 }]}>
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
            ))
          )}
        </ScrollView>
      </View>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title={selectedResource?.title || ''}
        subtitle={`${selectedResource?.category} - ${selectedResource?.source}`}
      >
        {selectedResource && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 16 }]}>
                {selectedResource.description}
              </Text>
              
              {selectedResource.content.map((item, index) => (
                <View key={index} style={[commonStyles.row, { marginBottom: 12, alignItems: 'flex-start' }]}>
                  <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: getCategoryColor(selectedResource.category),
                    marginTop: 6,
                    marginRight: 12
                  }} />
                  <Text style={[commonStyles.text, { flex: 1, lineHeight: 20 }]}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
