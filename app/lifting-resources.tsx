
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
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
}

export default function LiftingResourcesScreen() {
  const router = useRouter();
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const resources: ResourceItem[] = [
    {
      title: 'Pre-Lift Checklist',
      description: 'Essential checks before any lifting operation',
      icon: 'checkmark-done-outline',
      content: [
        'Verify crane capacity and load charts',
        'Inspect lifting equipment (slings, shackles, hooks)',
        'Check weather conditions and visibility',
        'Ensure proper ground conditions and outrigger setup',
        'Verify load weight and center of gravity',
        'Establish communication protocols',
        'Brief all personnel on lift plan',
        'Check for overhead hazards and power lines',
        'Ensure adequate clearances',
        'Test crane functions and safety devices'
      ]
    },
    {
      title: 'Rigging Guidelines',
      description: 'Proper rigging techniques and best practices',
      icon: 'link-outline',
      content: [
        'Select appropriate sling type and capacity',
        'Calculate sling angles and load distribution',
        'Inspect rigging hardware before use',
        'Use proper hitching techniques',
        'Protect slings from sharp edges',
        'Never exceed working load limits',
        'Consider dynamic loading factors',
        'Use tag lines for load control',
        'Ensure balanced lifting points',
        'Follow manufacturer specifications'
      ]
    },
    {
      title: 'Safety Procedures',
      description: 'Critical safety protocols for lifting operations',
      icon: 'shield-checkmark-outline',
      content: [
        'Establish exclusion zones around crane',
        'Use qualified signal person',
        'Maintain clear communication',
        'Never work under suspended loads',
        'Stop work in adverse weather',
        'Conduct daily equipment inspections',
        'Follow lockout/tagout procedures',
        'Wear appropriate PPE',
        'Report any defects immediately',
        'Emergency response procedures'
      ]
    },
    {
      title: 'Load Calculation Methods',
      description: 'How to properly calculate loads and capacities',
      icon: 'calculator-outline',
      content: [
        'Determine actual load weight',
        'Account for rigging weight',
        'Calculate load block weight',
        'Consider dynamic factors (1.15-1.25)',
        'Apply safety factors (minimum 1.25)',
        'Check crane capacity at radius',
        'Account for boom angle effects',
        'Consider side loading restrictions',
        'Verify ground bearing pressure',
        'Document all calculations'
      ]
    }
  ];

  const openResource = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening resource:', resource.title);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          Lifting Resources
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 24, fontSize: 16 }]}>
          Essential resources for safe lifting operations
        </Text>

        <View style={commonStyles.section}>
          {resources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card]}
              onPress={() => openResource(resource)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon 
                      name={resource.icon as any} 
                      size={24} 
                      color={colors.primary} 
                      style={{ marginRight: 12 }}
                    />
                    <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
                      {resource.title}
                    </Text>
                  </View>
                  <Text style={commonStyles.textLight}>
                    {resource.description}
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[commonStyles.card, { backgroundColor: colors.warning, marginTop: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="warning-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              Important Notice
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            These resources are for guidance only. Always follow your company's specific procedures and local regulations.
          </Text>
        </View>
      </ScrollView>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        {selectedResource && (
          <View style={{ padding: 20 }}>
            <View style={[commonStyles.row, { marginBottom: 20 }]}>
              <Icon 
                name={selectedResource.icon as any} 
                size={28} 
                color={colors.primary} 
                style={{ marginRight: 12 }}
              />
              <Text style={[commonStyles.title, { marginBottom: 0, flex: 1, fontSize: 24 }]}>
                {selectedResource.title}
              </Text>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {selectedResource.content.map((item, index) => (
                <View key={index} style={[commonStyles.row, { marginBottom: 12, alignItems: 'flex-start' }]}>
                  <Text style={[commonStyles.text, { color: colors.primary, marginRight: 8, fontWeight: '600' }]}>
                    •
                  </Text>
                  <Text style={[commonStyles.text, { flex: 1 }]}>
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
