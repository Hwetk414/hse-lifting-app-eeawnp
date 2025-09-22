
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from '../components/Icon';
import { commonStyles, colors } from '../styles/commonStyles';
import SimpleBottomSheet from '../components/BottomSheet';

interface LifelineSafetyResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'ANSI' | 'Saudi Aramco' | 'IRATA' | 'General';
}

export default function LifelineSafetyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<LifelineSafetyResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const router = useRouter();

  const lifelineSafetyResources: LifelineSafetyResource[] = [
    {
      title: 'Horizontal Lifeline Systems',
      description: 'Installation, inspection, and use of horizontal lifeline systems',
      icon: 'git-branch-outline',
      source: 'OSHA 1926.502',
      category: 'OSHA',
      content: [
        'Horizontal lifelines shall be designed, installed, and used under the supervision of a qualified person',
        'Maximum deflection shall not exceed 30 degrees below horizontal',
        'Minimum breaking strength of 5,000 pounds per attached worker',
        'Anchorage points must support 5,000 lbs per worker or be certified by qualified person',
        'Regular inspection for wear, damage, and proper installation required',
        'Workers must be trained on proper attachment and use procedures',
        'Fall arrest equipment must be compatible with lifeline system',
        'Documentation of installation and inspection records mandatory'
      ]
    },
    {
      title: 'Vertical Lifeline Systems',
      description: 'Vertical lifeline installation and safety requirements',
      icon: 'arrow-down-outline',
      source: 'ANSI Z359.15',
      category: 'ANSI',
      content: [
        'Vertical lifelines must be independent of support or suspension lines',
        'Only one person per vertical lifeline unless designed for multiple users',
        'Minimum breaking strength of 5,000 pounds',
        'Proper shock absorbing lanyards required for fall arrest',
        'Lifeline must extend to ground level or safe area',
        'Regular inspection for cuts, burns, abrasion, and wear',
        'Proper storage when not in use to prevent damage',
        'Training required for installation and use procedures'
      ]
    },
    {
      title: 'Temporary Lifeline Systems',
      description: 'Temporary lifeline installation for short-term work',
      icon: 'time-outline',
      source: 'Saudi Aramco SAES-A-112',
      category: 'Saudi Aramco',
      content: [
        'Temporary systems must meet same strength requirements as permanent',
        'Installation by competent person with proper training',
        'Daily inspection before use required',
        'Proper anchorage points identified and tested',
        'Clear span limitations based on system design',
        'Weather conditions consideration for installation',
        'Removal procedures to prevent damage to structure',
        'Documentation of temporary system specifications'
      ]
    },
    {
      title: 'Lifeline Inspection Procedures',
      description: 'Comprehensive inspection protocols for lifeline systems',
      icon: 'search-outline',
      source: 'ANSI Z359.2',
      category: 'ANSI',
      content: [
        'Pre-use inspection by qualified user before each use',
        'Detailed inspection by competent person at regular intervals',
        'Annual inspection by qualified person or manufacturer',
        'Check for cuts, burns, abrasion, mold, undue stretching',
        'Hardware inspection for cracks, sharp edges, corrosion',
        'Anchorage point inspection for structural integrity',
        'Documentation of all inspection findings',
        'Immediate removal from service if defects found'
      ]
    },
    {
      title: 'Rope Access Lifelines',
      description: 'Specialized lifeline systems for rope access work',
      icon: 'fitness-outline',
      source: 'IRATA International',
      category: 'IRATA',
      content: [
        'Dual rope system with working line and safety line',
        'Static kernmantle rope construction required',
        'Minimum diameter 10.5mm for working lines',
        'Independent anchorage points for each rope',
        'Regular rotation of ropes to ensure even wear',
        'Proper edge protection at all contact points',
        'Certified rope access technician supervision',
        'Detailed logbook maintenance for each rope'
      ]
    },
    {
      title: 'Lifeline Anchorage Requirements',
      description: 'Structural requirements for lifeline anchorage points',
      icon: 'link-outline',
      source: 'OSHA 1926.502(d)',
      category: 'OSHA',
      content: [
        'Anchorages must support 5,000 lbs per attached worker',
        'Structural analysis by qualified engineer when required',
        'Proper installation with appropriate fasteners',
        'Regular inspection of anchorage integrity',
        'Clear identification and marking of anchorage points',
        'Protection from environmental factors',
        'Load testing documentation when applicable',
        'Proper spacing to minimize swing fall hazards'
      ]
    },
    {
      title: 'Personal Fall Arrest with Lifelines',
      description: 'Integration of personal fall arrest systems with lifelines',
      icon: 'person-outline',
      source: 'ANSI Z359.11',
      category: 'ANSI',
      content: [
        'Compatible connecting devices required',
        'Proper shock absorbing lanyard selection',
        'Maximum free fall distance calculations',
        'Clearance requirements below work area',
        'Proper body harness attachment points',
        'Training on rescue procedures required',
        'Regular equipment inspection protocols',
        'Emergency response plan development'
      ]
    },
    {
      title: 'Lifeline System Design',
      description: 'Engineering requirements for lifeline system design',
      icon: 'construct-outline',
      source: 'Saudi Aramco SAES-A-112',
      category: 'Saudi Aramco',
      content: [
        'Professional engineer design and certification',
        'Load calculations including dynamic factors',
        'Material specifications and quality requirements',
        'Installation procedures and tolerances',
        'Maintenance and inspection schedules',
        'User capacity and limitations',
        'Environmental condition considerations',
        'Documentation and drawing requirements'
      ]
    },
    {
      title: 'Emergency Rescue Procedures',
      description: 'Emergency response for lifeline system incidents',
      icon: 'medical-outline',
      source: 'General Safety',
      category: 'General',
      content: [
        'Immediate response procedures for suspended workers',
        'Rescue equipment readily available on site',
        'Trained rescue personnel or emergency services contact',
        'Communication systems for emergency situations',
        'Medical response procedures for fall injuries',
        'Incident investigation and reporting requirements',
        'Regular rescue drill exercises',
        'Documentation of emergency response capabilities'
      ]
    },
    {
      title: 'Lifeline Training Requirements',
      description: 'Training programs for lifeline system users',
      icon: 'school-outline',
      source: 'OSHA 1926.95',
      category: 'OSHA',
      content: [
        'Initial training before first use of lifeline systems',
        'Refresher training at regular intervals',
        'Hands-on practice with actual equipment',
        'Recognition of lifeline system limitations',
        'Proper inspection techniques training',
        'Emergency response and rescue procedures',
        'Documentation of training completion',
        'Competent person designation and responsibilities'
      ]
    }
  ];

  const filteredResources = lifelineSafetyResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openResource = (resource: LifelineSafetyResource) => {
    console.log('Opening lifeline safety resource:', resource.title);
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#1976D2';
      case 'ANSI': return '#388E3C';
      case 'Saudi Aramco': return '#F57C00';
      case 'IRATA': return '#7B1FA2';
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
        <Text style={commonStyles.headerTitle}>Lifeline Safety</Text>
      </View>

      <View style={commonStyles.content}>
        <View style={commonStyles.searchContainer}>
          <Icon name="search-outline" size={20} color={colors.textLight} />
          <TextInput
            style={commonStyles.searchInput}
            placeholder="Search lifeline safety resources..."
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
