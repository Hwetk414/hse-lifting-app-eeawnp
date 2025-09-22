
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Icon from '../components/Icon';
import { commonStyles, colors } from '../styles/commonStyles';
import SimpleBottomSheet from '../components/BottomSheet';

interface LadderSafetyResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'ANSI' | 'Saudi Aramco' | 'NIOSH' | 'General';
}

export default function LadderSafetyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<LadderSafetyResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const router = useRouter();

  const ladderSafetyResources: LadderSafetyResource[] = [
    {
      title: 'OSHA Ladder Safety Standards',
      description: '29 CFR 1926.1053 - Ladders safety requirements for construction',
      icon: 'construct-outline',
      source: 'OSHA 29 CFR 1926.1053',
      category: 'OSHA',
      content: [
        'Ladder Selection and Inspection',
        '• Choose the right ladder for the job (step, extension, platform)',
        '• Inspect ladders before each use for defects, damage, or wear',
        '• Check for bent or broken rungs, rails, or hardware',
        '• Ensure locks, hinges, and spreaders function properly',
        '',
        'Setup and Positioning',
        '• Place ladder on firm, level surface',
        '• Use 4:1 rule - for every 4 feet of height, base should be 1 foot from wall',
        '• Extend ladder 3 feet above landing surface',
        '• Secure ladder at top and bottom when possible',
        '• Never place ladder on boxes, barrels, or unstable surfaces',
        '',
        'Safe Use Practices',
        '• Maintain three points of contact (two hands, one foot or two feet, one hand)',
        '• Face ladder when climbing up or down',
        '• Do not carry tools or materials while climbing',
        '• Never exceed maximum load capacity',
        '• Do not use ladder in high winds or storms',
        '',
        'Prohibited Uses',
        '• Do not use damaged or defective ladders',
        '• Never use ladder as horizontal platform or runway',
        '• Do not place ladder against movable objects',
        '• Never use metal ladders near electrical equipment',
        '• Do not exceed maximum reach - keep belt buckle between rails'
      ]
    },
    {
      title: 'ANSI A14 Ladder Standards',
      description: 'American National Standards for portable ladders',
      icon: 'library-outline',
      source: 'ANSI A14.1, A14.2, A14.5',
      category: 'ANSI',
      content: [
        'ANSI A14.1 - Wood Ladders',
        '• Construction requirements for wooden ladders',
        '• Load ratings: Type IA (300 lbs), Type I (250 lbs), Type II (225 lbs)',
        '• Rung spacing: 12 inches on center maximum',
        '• Side rail requirements and wood specifications',
        '',
        'ANSI A14.2 - Metal Ladders',
        '• Aluminum and steel ladder construction standards',
        '• Corrosion resistance requirements',
        '• Load testing and certification requirements',
        '• Hardware and connection specifications',
        '',
        'ANSI A14.5 - Fiberglass Ladders',
        '• Non-conductive ladder requirements',
        '• Electrical safety ratings and testing',
        '• UV resistance and weathering standards',
        '• Structural integrity requirements',
        '',
        'Common Requirements',
        '• Slip-resistant feet required on all portable ladders',
        '• Proper labeling and marking requirements',
        '• Regular inspection and maintenance schedules',
        '• Training requirements for users'
      ]
    },
    {
      title: 'Saudi Aramco Ladder Safety',
      description: 'SAES-A-112 Ladder and portable scaffold safety requirements',
      icon: 'business-outline',
      source: 'Saudi Aramco SAES-A-112',
      category: 'Saudi Aramco',
      content: [
        'General Requirements',
        '• All ladders must be inspected before use',
        '• Defective ladders must be tagged and removed from service',
        '• Only trained personnel may use ladders above 6 feet',
        '• Fall protection required for work above 6 feet',
        '',
        'Inspection Checklist',
        '• Check all rungs, rails, and hardware',
        '• Verify proper operation of locks and hinges',
        '• Inspect for cracks, bends, or corrosion',
        '• Ensure safety feet are in good condition',
        '• Verify load capacity labels are legible',
        '',
        'Setup Requirements',
        '• Minimum 3-foot clearance from overhead power lines',
        '• Secure ladder at top when height exceeds 10 feet',
        '• Use ladder safety devices for fixed ladders over 20 feet',
        '• Maintain proper angle (75-degree rule)',
        '',
        'Training Requirements',
        '• Annual ladder safety training for all users',
        '• Competent person inspection training',
        '• Documentation of training records',
        '• Refresher training after incidents'
      ]
    },
    {
      title: 'Ladder Inspection Checklist',
      description: 'Comprehensive pre-use inspection procedures',
      icon: 'checkmark-circle-outline',
      source: 'Industry Best Practice',
      category: 'General',
      content: [
        'Visual Inspection',
        '• Overall condition and cleanliness',
        '• Proper identification labels and load ratings',
        '• No obvious damage or defects',
        '• All parts present and properly assembled',
        '',
        'Structural Components',
        '• Rails: Check for cracks, bends, or splits',
        '• Rungs: Ensure secure attachment and no damage',
        '• Hardware: Verify all bolts, rivets, and connections',
        '• Spreaders: Check operation and locking mechanism',
        '',
        'Safety Features',
        '• Slip-resistant feet in good condition',
        '• Safety shoes or spikes properly attached',
        '• Rope and pulley system (extension ladders)',
        '• Locks function properly and hold securely',
        '',
        'Documentation',
        '• Record inspection date and inspector name',
        '• Note any defects or repairs needed',
        '• Tag defective ladders "DO NOT USE"',
        '• Maintain inspection records',
        '',
        'Action Items',
        '• Remove defective ladders from service immediately',
        '• Schedule repairs or replacement as needed',
        '• Report incidents or near-misses',
        '• Update training based on findings'
      ]
    },
    {
      title: 'Ladder Incident Prevention',
      description: 'Common causes of ladder accidents and prevention strategies',
      icon: 'shield-outline',
      source: 'NIOSH Publication 2017-112',
      category: 'NIOSH',
      content: [
        'Leading Causes of Ladder Accidents',
        '• Improper ladder selection (wrong type/size)',
        '• Poor setup and positioning',
        '• Overreaching while on ladder',
        '• Carrying tools or materials while climbing',
        '• Using damaged or defective ladders',
        '',
        'Prevention Strategies',
        '• Proper training and certification programs',
        '• Regular inspection and maintenance',
        '• Use of appropriate fall protection',
        '• Job hazard analysis before ladder use',
        '• Alternative methods when possible (scaffolds, lifts)',
        '',
        'Environmental Considerations',
        '• Weather conditions (wind, rain, ice)',
        '• Surface conditions (level, stable, clean)',
        '• Overhead hazards (power lines, structures)',
        '• Lighting and visibility',
        '',
        'Emergency Procedures',
        '• Immediate response to ladder incidents',
        '• First aid and medical attention',
        '• Incident investigation and reporting',
        '• Corrective actions and lessons learned',
        '',
        'Statistics and Trends',
        '• Ladder accidents result in over 164,000 injuries annually',
        '• Falls from ladders cause approximately 300 deaths per year',
        '• Most accidents occur during routine maintenance tasks',
        '• Proper training reduces accident rates by 60%'
      ]
    },
    {
      title: 'Specialty Ladder Requirements',
      description: 'Requirements for step ladders, extension ladders, and platform ladders',
      icon: 'layers-outline',
      source: 'OSHA/ANSI Standards',
      category: 'General',
      content: [
        'Step Ladders',
        '• Self-supporting with spreader bars',
        '• Never use as straight ladder',
        '• Do not stand on top two steps',
        '• Keep spreaders fully opened and locked',
        '• Maximum height typically 20 feet',
        '',
        'Extension Ladders',
        '• Minimum 3-foot extension above landing',
        '• Maximum extended length varies by ladder',
        '• Secure at top and bottom when possible',
        '• Check rope and pulley system regularly',
        '• Use proper climbing angle (4:1 ratio)',
        '',
        'Platform Ladders',
        '• Large standing platform at top',
        '• Guardrails required on platforms',
        '• Tool trays and holders available',
        '• More stable for extended work periods',
        '• Follow manufacturer weight limits',
        '',
        'Multi-Position Ladders',
        '• Can be configured multiple ways',
        '• Follow setup instructions carefully',
        '• Ensure locks engage properly',
        '• Check stability in each configuration',
        '',
        'Fixed Ladders',
        '• Permanent installation requirements',
        '• Cages or safety devices for heights over 20 feet',
        '• Regular structural inspections required',
        '• Landing platforms at specified intervals'
      ]
    }
  ];

  const filteredResources = ladderSafetyResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openResource = (resource: LadderSafetyResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#1976D2';
      case 'ANSI': return '#388E3C';
      case 'Saudi Aramco': return '#F57C00';
      case 'NIOSH': return '#7B1FA2';
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
        <Text style={commonStyles.headerTitle}>Ladder Safety</Text>
      </View>

      <View style={commonStyles.content}>
        <View style={commonStyles.searchContainer}>
          <Icon name="search-outline" size={20} color={colors.textLight} />
          <TextInput
            style={commonStyles.searchInput}
            placeholder="Search ladder safety resources..."
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
