
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface ResourceItem {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'Saudi Aramco' | 'General' | 'ANSI' | 'ASME';
}

export default function LiftingResourcesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: ResourceItem[] = [
    {
      title: 'OSHA 1926.1400 - Crane Safety Standards',
      description: 'Federal crane and derrick safety requirements',
      icon: 'shield-checkmark-outline',
      source: 'OSHA 29 CFR 1926.1400',
      category: 'OSHA',
      content: [
        'Operator certification requirements per OSHA 1926.1427',
        'Daily inspection requirements before equipment use',
        'Ground conditions must support crane and maximum rated capacity',
        'Assembly/disassembly must be supervised by competent person',
        'Power line safety clearances: 10 feet minimum for lines up to 50kV',
        'Load block height limiting device required',
        'Two-blocking prevention system mandatory',
        'Rated capacity indicator or load moment system required',
        'Boom hoist limiting device for lattice boom cranes',
        'Anti two-block system must prevent damage to equipment',
        'Outrigger float requirements for proper load distribution',
        'Signal person must be qualified per OSHA standards'
      ]
    },
    {
      title: 'OSHA Rigging Standards 1926.251',
      description: 'Rigging equipment and procedures per OSHA',
      icon: 'link-outline',
      source: 'OSHA 29 CFR 1926.251',
      category: 'OSHA',
      content: [
        'Alloy steel chain slings: 4:1 safety factor minimum',
        'Wire rope slings: 5:1 safety factor for improved plow steel',
        'Synthetic web slings: 5:1 safety factor minimum',
        'Natural fiber rope slings: 8:1 safety factor minimum',
        'Hooks must have safety latches or be moused',
        'Sling angles less than 30° from horizontal prohibited',
        'Damaged or defective rigging equipment must be removed',
        'Rigging equipment must be inspected before each use',
        'Load ratings must be permanently marked on equipment',
        'Proof testing required for alloy steel chain slings',
        'Wire rope clips must be installed per manufacturer specs',
        'Synthetic slings protected from sharp edges and heat'
      ]
    },
    {
      title: 'Saudi Aramco SAES-L-112 Lifting Operations',
      description: 'Saudi Aramco lifting operations standard',
      icon: 'business-outline',
      source: 'Saudi Aramco SAES-L-112',
      category: 'Saudi Aramco',
      content: [
        'Lifting plan required for all critical lifts over 75% capacity',
        'Pre-job safety meeting mandatory for all lifting operations',
        'Crane operator must hold valid Saudi Aramco certification',
        'Rigger certification required for all rigging personnel',
        'Weather limitations: Wind speed max 39 km/h (24 mph)',
        'Exclusion zone minimum 1.5 times crane height plus boom length',
        'Load test certificates required for all lifting equipment',
        'Monthly inspection of cranes by certified inspector',
        'Lift supervisor required for critical and complex lifts',
        'Emergency response plan must be in place',
        'Hot work permit required if welding during rigging',
        'Simultaneous operations matrix must be followed'
      ]
    },
    {
      title: 'Saudi Aramco Construction Manual - Chapter 15',
      description: 'Construction lifting and rigging guidelines',
      icon: 'construct-outline',
      source: 'Saudi Aramco Construction Manual Ch.15',
      category: 'Saudi Aramco',
      content: [
        'Dynamic amplification factor: 1.15 minimum for normal lifts',
        'Side loading on crane boom limited to 2% of rated capacity',
        'Outrigger blocking must extend beyond float by 12 inches minimum',
        'Tag lines required for loads over 1000 kg in windy conditions',
        'Crane setup on slopes limited to manufacturer specifications',
        'Load block must have overhaul ball or equivalent weight',
        'Multiple crane lifts require detailed engineering analysis',
        'Crawler crane track pressure limited to ground bearing capacity',
        'Boom angle limitations per manufacturer load charts',
        'Counterweight requirements must match manufacturer specs',
        'Jib operations require additional safety factors',
        'Personnel platforms prohibited unless specifically designed'
      ]
    },
    {
      title: 'OSHA Signal Person Requirements',
      description: 'Qualified signal person standards and hand signals',
      icon: 'hand-left-outline',
      source: 'OSHA 1926.1428',
      category: 'OSHA',
      content: [
        'Signal person must be qualified through written and practical tests',
        'Must demonstrate ability to judge distances and crane capacity',
        'Continuous communication required during lifting operations',
        'Standard hand signals per ASME B30.5 or agreed upon signals',
        'Voice signals acceptable if hand signals not practical',
        'Signal person must have unobstructed view of load and crane',
        'Only one person gives signals unless transfer of responsibility',
        'Emergency stop signal: Both arms extended, move back and forth',
        'Hoist signal: Point up, move hand in small horizontal circle',
        'Lower signal: Point down, move hand in small horizontal circle',
        'Boom up: Arm extended, thumb pointing up',
        'Boom down: Arm extended, thumb pointing down'
      ]
    },
    {
      title: 'ANSI/ASME B30.5 Mobile Crane Standard',
      description: 'Industry standard for mobile crane safety',
      icon: 'car-outline',
      source: 'ANSI/ASME B30.5-2018',
      category: 'ANSI',
      content: [
        'Load rating chart must be visible to operator at all times',
        'Boom angle indicator accuracy within ±1 degree',
        'Load moment indicator required for cranes over 15 tons',
        'Outrigger position indicators required for proper setup',
        'Boom length indicator for telescopic boom cranes',
        'Anti-two-block system must shut down hoist function',
        'Rated capacity indicator must be accurate within ±5%',
        'Boom hoist disconnect required for lattice boom cranes',
        'Load block height limiting device prevents over-hoisting',
        'Swing brake must hold 125% of maximum static load',
        'Travel alarm required when crane is in motion',
        'Operator compartment must meet ROPS/FOPS standards'
      ]
    },
    {
      title: 'Critical Lift Planning Procedures',
      description: 'Planning requirements for high-risk lifting operations',
      icon: 'clipboard-outline',
      source: 'Industry Best Practice',
      category: 'General',
      content: [
        'Critical lift defined: >75% capacity, over personnel, or complex rigging',
        'Lift plan must be approved by qualified lifting engineer',
        'Site survey required including ground conditions assessment',
        'Weather monitoring plan with defined stop work criteria',
        'Emergency response procedures specific to the lift',
        'Personnel qualifications verified before lift execution',
        'Equipment inspection certificates current and valid',
        'Rigging calculations documented and peer reviewed',
        'Communication plan established with backup methods',
        'Exclusion zones marked and monitored during lift',
        'Post-lift inspection of equipment and rigging',
        'Lessons learned documentation for future reference'
      ]
    },
    {
      title: 'Wire Rope Inspection Criteria',
      description: 'OSHA and industry standards for wire rope inspection',
      icon: 'scan-outline',
      source: 'OSHA 1926.1413 / ASME B30.5',
      category: 'OSHA',
      content: [
        'Daily visual inspection before first use each day',
        'Monthly inspection by competent person documented',
        'Annual inspection by qualified person with records',
        'Removal criteria: 6 broken wires in one lay length',
        'Removal criteria: 3 broken wires in one strand',
        'Kinking, crushing, bird caging requires immediate removal',
        'Corrosion causing loss of rope diameter requires removal',
        'Heat damage evidenced by discoloration requires removal',
        'Core protrusion between strands indicates internal damage',
        'Wear exceeding 1/3 of original wire diameter',
        'Reduction in rope diameter exceeding 5% of nominal',
        'Distortion of rope structure requires engineering evaluation'
      ]
    },
    {
      title: 'Load Chart Interpretation',
      description: 'How to properly read and apply crane load charts',
      icon: 'analytics-outline',
      source: 'Manufacturer Guidelines / NCCCO',
      category: 'General',
      content: [
        'Load charts based on crane on firm, level surface',
        'Capacity decreases with increased boom length and angle',
        'Working radius measured horizontally from centerline of rotation',
        'Deductions required for auxiliary equipment weight',
        'Load block and hook weight included in rated capacity',
        'Side loading reduces capacity and may cause instability',
        'Outrigger position affects capacity ratings significantly',
        'Boom angle affects both capacity and working radius',
        'Multiple part line reduces capacity due to reeving losses',
        'Jib attachment reduces main boom capacity',
        'Temperature effects on hydraulic system capacity',
        'Dynamic loading factors must be considered in planning'
      ]
    },
    {
      title: 'Sling Angle Calculations',
      description: 'Mathematical approach to sling loading and angles',
      icon: 'calculator-outline',
      source: 'Engineering Principles / OSHA',
      category: 'General',
      content: [
        'Sling tension = Load ÷ (2 × sin(sling angle))',
        'Minimum sling angle: 30° from horizontal per OSHA',
        'Optimal sling angle: 60° for balanced loading',
        'Sling angle affects load distribution between legs',
        'Basket hitch doubles the working load limit',
        'Choker hitch reduces capacity to 75% of straight pull',
        'Bridle sling calculations require vector analysis',
        'Unequal sling lengths create uneven loading',
        'Center of gravity affects sling tension distribution',
        'Multiple leg slings: assume only 2 legs carry full load',
        'Sling protection required for sharp edges and corners',
        'Temperature effects on synthetic sling capacity'
      ]
    },
    {
      title: 'Ground Bearing Pressure Analysis',
      description: 'Calculating and ensuring adequate ground support',
      icon: 'earth-outline',
      source: 'Geotechnical Engineering / OSHA',
      category: 'General',
      content: [
        'Soil bearing capacity must exceed maximum outrigger loads',
        'Crane weight distribution includes counterweight effects',
        'Dynamic loading increases ground pressure by 15-25%',
        'Outrigger float size determines pressure distribution',
        'Soft soils may require timber mats or steel plates',
        'Slope operations require engineering analysis',
        'Underground utilities affect ground stability',
        'Seasonal variations in soil bearing capacity',
        'Groundwater effects on soil strength',
        'Compaction requirements for fill materials',
        'Load spreading techniques for weak soils',
        'Monitoring for settlement during lifting operations'
      ]
    },
    {
      title: 'Overhead Power Line Safety',
      description: 'OSHA requirements for working near electrical hazards',
      icon: 'flash-outline',
      source: 'OSHA 1926.1408-1410',
      category: 'OSHA',
      content: [
        'Minimum clearance 10 feet for lines up to 50kV',
        'Add 4 inches per kV over 50kV for higher voltages',
        'Dedicated spotter required when working near power lines',
        'De-energization preferred method when possible',
        'Insulating link or device required in certain situations',
        'Ground personnel must maintain safe distances',
        'Equipment operators must be trained on electrical hazards',
        'Boom or load contact with lines can be fatal',
        'Utility company notification required before work',
        'Voltage determination required before establishing clearances',
        'Weather conditions affect electrical hazard levels',
        'Emergency procedures for accidental contact'
      ]
    }
  ];

  const categories = ['All', 'OSHA', 'Saudi Aramco', 'ANSI', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#FF6B35';
      case 'Saudi Aramco': return '#00A651';
      case 'ANSI': return '#0066CC';
      case 'ASME': return '#8B4513';
      default: return colors.primary;
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          HSE Lifting Resources
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 16, fontSize: 16 }]}>
          Comprehensive HSE resources from OSHA, Saudi Aramco, and industry standards
        </Text>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Search Resources</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[commonStyles.input, { paddingLeft: 40 }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search standards, procedures, or organizations"
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
                    ? { backgroundColor: colors.primary, borderColor: colors.primary }
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
            Available Resources ({filteredResources.length})
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
              No resources found matching your search criteria
            </Text>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: colors.warning, marginTop: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="warning-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              Compliance Notice
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            These resources are based on current OSHA, Saudi Aramco, and industry standards. Always verify with the latest regulations and your company's specific procedures. Consult qualified professionals for complex lifting operations.
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
