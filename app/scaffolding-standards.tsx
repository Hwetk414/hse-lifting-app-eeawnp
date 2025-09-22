
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface ScaffoldingResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'ANSI' | 'Saudi Aramco' | 'EN' | 'General';
}

export default function ScaffoldingStandardsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ScaffoldingResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: ScaffoldingResource[] = [
    {
      title: 'OSHA 1926.451 - General Requirements for Scaffolds',
      description: 'General safety requirements for all scaffold types',
      icon: 'construct-outline',
      source: 'OSHA 29 CFR 1926.451',
      category: 'OSHA',
      content: [
        'Scaffolds must be erected, moved, dismantled by qualified persons',
        'Load capacity must not be exceeded - design loads plus 4:1 safety factor',
        'Platforms must be fully planked between front uprights and guardrails',
        'Platform width minimum 18 inches, except for boatswains chairs',
        'Guardrails required on all open sides and ends above 10 feet',
        'Access must be provided - no climbing on cross-braces',
        'Fall protection required for workers on scaffolds above 10 feet',
        'Scaffolds must be level, plumb, and on solid footing',
        'Electrical hazards - maintain safe distances from power lines',
        'Weather conditions - do not use during storms or high winds',
        'Daily inspection required before each work shift',
        'Competent person must inspect after any occurrence that could affect structural integrity'
      ]
    },
    {
      title: 'OSHA 1926.452 - Additional Requirements for Specific Scaffold Types',
      description: 'Specific requirements for different scaffold systems',
      icon: 'layers-outline',
      source: 'OSHA 29 CFR 1926.452',
      category: 'OSHA',
      content: [
        'Tube and coupler scaffolds - couplers must be tightened to manufacturer specifications',
        'Frame scaffolds - cross-bracing required on both front and back sides',
        'Outrigger scaffolds - thrustouts must be secured to prevent sliding',
        'Two-point suspended scaffolds - independent support lines required',
        'Multi-point adjustable suspension scaffolds - minimum 3/8 inch wire rope',
        'Mobile scaffolds - caster wheels must have positive wheel locks',
        'Repair bracket scaffolds - maximum 300 pounds including materials',
        'Stilts - maximum height 40 inches, fall protection required above 6 feet',
        'Pump jack scaffolds - poles must be secured every 10 feet of height',
        'Ladder jack scaffolds - maximum height 20 feet, ladder rungs as bearers prohibited',
        'Window jack scaffolds - not more than one story or 14 feet in height',
        'Crawling boards - minimum 18 inches wide, maximum 24 feet long'
      ]
    },
    {
      title: 'ANSI/ASSE A10.8 - Scaffolding Safety Requirements',
      description: 'American National Standard for construction and demolition scaffolds',
      icon: 'business-outline',
      source: 'ANSI/ASSE A10.8-2011',
      category: 'ANSI',
      content: [
        'Design loads: light duty 25 psf, medium duty 50 psf, heavy duty 75 psf',
        'Wind load considerations in scaffold design and use',
        'Foundation requirements - adequate to support maximum intended loads',
        'Erection procedures must follow manufacturer instructions',
        'Material specifications for scaffold components',
        'Quality assurance requirements for scaffold materials',
        'Training requirements for scaffold erectors and users',
        'Inspection criteria and frequency requirements',
        'Documentation requirements for scaffold design and inspection',
        'Special requirements for scaffolds in seismic zones',
        'Environmental considerations including temperature effects',
        'Maintenance and storage requirements for scaffold components'
      ]
    },
    {
      title: 'Saudi Aramco SAES-A-116 Scaffolding Standards',
      description: 'Saudi Aramco engineering standards for scaffolding systems',
      icon: 'shield-outline',
      source: 'Saudi Aramco SAES-A-116',
      category: 'Saudi Aramco',
      content: [
        'All scaffolds must be designed by qualified structural engineer',
        'Scaffold erection permit required before commencement of work',
        'Competent scaffolder certification required for erection crew',
        'Daily pre-use inspection checklist must be completed',
        'Green tag system for scaffold acceptance and handover',
        'Maximum platform loading: 150 kg/m² for working platforms',
        'Minimum platform width 600mm, maximum gap between planks 25mm',
        'Guardrails minimum height 1000mm with intermediate rail at 500mm',
        'Toe boards minimum height 150mm on all open edges',
        'Access ladders must be provided every 30 meters maximum',
        'Weather restrictions - wind speed above 40 km/h prohibits work',
        'Scaffold modification requires re-inspection and approval'
      ]
    },
    {
      title: 'EN 12811 - Temporary Works Equipment - Scaffolds',
      description: 'European standard for scaffold performance and general design',
      icon: 'flag-outline',
      source: 'EN 12811-1:2003',
      category: 'EN',
      content: [
        'Load classes: 1.5 kN/m², 3.0 kN/m², 4.5 kN/m², 6.0 kN/m²',
        'Wind load categories based on geographical location',
        'Material requirements including steel grade specifications',
        'Geometric requirements for scaffold dimensions',
        'Connection requirements for scaffold joints',
        'Stability requirements including bracing systems',
        'Foundation design requirements and bearing capacity',
        'Access and egress requirements for scaffold users',
        'Safety requirements including fall protection systems',
        'Inspection and maintenance requirements',
        'Documentation requirements for scaffold design',
        'Conformity assessment procedures for scaffold systems'
      ]
    },
    {
      title: 'Scaffold Inspection and Tagging',
      description: 'Inspection procedures and tagging systems for scaffolds',
      icon: 'checkmark-circle-outline',
      source: 'OSHA / Industry Best Practice',
      category: 'General',
      content: [
        'Pre-erection inspection of all scaffold components',
        'Daily inspection before each work shift by competent person',
        'Weekly formal inspection by qualified scaffold inspector',
        'Post-incident inspection after any structural damage',
        'Green tag indicates scaffold ready for use',
        'Yellow tag indicates scaffold under construction or modification',
        'Red tag indicates scaffold unsafe - do not use',
        'Inspection checklist must cover all structural elements',
        'Documentation of all inspections and corrective actions',
        'Immediate removal from service for any structural defects',
        'Re-inspection required after repairs or modifications',
        'Training requirements for scaffold inspectors'
      ]
    },
    {
      title: 'Mobile Scaffold Safety',
      description: 'Safety requirements for mobile and rolling scaffolds',
      icon: 'car-outline',
      source: 'OSHA 1926.452(w)',
      category: 'OSHA',
      content: [
        'Height to base width ratio maximum 2:1 when occupied',
        'Caster wheels must have positive wheel locks',
        'Horizontal force to move scaffold maximum 50 pounds',
        'No workers on scaffold during movement',
        'Level surface required for scaffold movement',
        'Outriggers required when height exceeds base dimension',
        'Brakes must be applied when scaffold is stationary',
        'Power lines clearance minimum 10 feet',
        'Wind conditions assessment before use',
        'Stabilizers required for scaffolds over 4:1 ratio',
        'Regular inspection of casters and locking mechanisms',
        'Training required for personnel moving mobile scaffolds'
      ]
    },
    {
      title: 'Suspended Scaffold Systems',
      description: 'Safety requirements for suspended and hanging scaffolds',
      icon: 'git-branch-outline',
      source: 'OSHA 1926.452(o)',
      category: 'OSHA',
      content: [
        'Independent support lines required for each suspension point',
        'Wire rope minimum 3/8 inch diameter for suspension',
        'Safety factor minimum 6:1 for suspension system',
        'Primary and secondary suspension points required',
        'Fall arrest systems required for all workers',
        'Counterweights must be secured against displacement',
        'Roof anchors must be designed by qualified engineer',
        'Daily inspection of all suspension components',
        'Weather limitations - no use in high winds',
        'Maximum working load must not be exceeded',
        'Emergency descent devices required',
        'Communication systems required between ground and scaffold'
      ]
    },
    {
      title: 'Scaffold Planking and Platforms',
      description: 'Requirements for scaffold working platforms and planking',
      icon: 'layers-outline',
      source: 'OSHA 1926.451(b)',
      category: 'OSHA',
      content: [
        'Platforms must be fully planked between uprights and guardrails',
        'Maximum gap between planks and uprights: 1 inch',
        'Planks must extend over supports minimum 6 inches',
        'Maximum overhang beyond supports: 12 inches',
        'Plank thickness minimum 2 inches nominal lumber',
        'Manufactured platforms must meet OSHA specifications',
        'Platform capacity must be marked on manufactured platforms',
        'Cleats required on planks to prevent sliding',
        'Damaged or defective planks must be removed immediately',
        'Platform joints must occur over supports',
        'Non-slip surfaces required in wet conditions',
        'Regular inspection of platform condition required'
      ]
    },
    {
      title: 'Scaffold Access and Egress',
      description: 'Safe access and egress requirements for scaffolds',
      icon: 'walk-outline',
      source: 'OSHA 1926.451(e)',
      category: 'OSHA',
      content: [
        'Portable ladders, hook-on ladders, or stairway-type ladders required',
        'Cross-braces may not be used as access means',
        'Ladder access required within 25 feet of work area',
        'Stair towers required for scaffolds over 60 feet high',
        'Ladder rungs and steps must be spaced 12-16 inches apart',
        'Ladders must extend 3 feet above platform level',
        'Self-retracting lifelines required for ladder climbing above 24 feet',
        'Rest platforms required every 35 feet of ladder height',
        'Ladder side rails must extend 42 inches above platform',
        'Access openings in platforms must have gates or equivalent',
        'Trapdoor access must have spring-loaded mechanisms',
        'Clear width of access must be minimum 18 inches'
      ]
    },
    {
      title: 'Scaffold Fall Protection Systems',
      description: 'Fall protection requirements for scaffold workers',
      icon: 'shield-checkmark-outline',
      source: 'OSHA 1926.451(g)',
      category: 'OSHA',
      content: [
        'Guardrail systems required on all open sides above 10 feet',
        'Top rail height 38-45 inches above platform surface',
        'Midrail height approximately 21 inches above platform',
        'Top rail must support 200 pounds applied in any direction',
        'Personal fall arrest systems as alternative to guardrails',
        'Safety nets permitted when guardrails not feasible',
        'Toeboards minimum 3.5 inches high on all open sides',
        'Screen or mesh required between toeboard and midrail',
        'Openings in guardrails maximum 19 inches',
        'Guardrail components must be smooth to prevent injury',
        'Fall protection required during scaffold erection/dismantling',
        'Anchorage points must support 5000 pounds per worker'
      ]
    },
    {
      title: 'Scaffold Training Requirements',
      description: 'Training requirements for scaffold workers and supervisors',
      icon: 'school-outline',
      source: 'OSHA 1926.454',
      category: 'OSHA',
      content: [
        'Training required before working on or with scaffolds',
        'Retraining required when work practices change',
        'Training must cover hazard recognition and avoidance',
        'Electrical hazard awareness training required',
        'Proper use of fall protection systems training',
        'Load capacity and weight distribution training',
        'Training on proper assembly and disassembly procedures',
        'Inspection procedures training for competent persons',
        'Emergency procedures and rescue training',
        'Training documentation and records required',
        'Refresher training required annually or after incidents',
        'Competent person designation and training requirements'
      ]
    }
  ];

  const categories = ['All', 'OSHA', 'ANSI', 'Saudi Aramco', 'EN', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: ScaffoldingResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening scaffolding resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#FF6B35';
      case 'ANSI': return '#2196F3';
      case 'Saudi Aramco': return '#00A651';
      case 'EN': return '#9C27B0';
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
          Scaffolding Standards
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 16, fontSize: 16 }]}>
          Comprehensive scaffolding safety standards from OSHA, ANSI, and international organizations
        </Text>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Search Scaffolding Standards</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[commonStyles.input, { paddingLeft: 40 }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search scaffolding standards and procedures"
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
                    ? { backgroundColor: '#8D6E63', borderColor: '#8D6E63' }
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
            Scaffolding Standards ({filteredResources.length})
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
              No scaffolding standards found matching your search criteria
            </Text>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: '#8D6E63', marginTop: 20, marginBottom: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="construct-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              Scaffolding Safety Notice
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            Scaffolding work requires specialized training and certification. Only qualified personnel should erect, modify, or dismantle scaffolds. Always inspect scaffolds before use and follow all safety procedures.
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
