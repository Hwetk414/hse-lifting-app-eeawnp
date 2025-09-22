
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const router = useRouter();

  const liftingItems = [
    {
      title: 'Lifting Plan Calculator',
      description: 'Calculate lifting parameters and safety factors',
      icon: 'calculator-outline',
      route: '/lifting-calculator',
      color: colors.primary,
    },
    {
      title: 'Lifting Resources',
      description: 'Guidelines, checklists, and safety procedures',
      icon: 'library-outline',
      route: '/lifting-resources',
      color: colors.secondary,
    },
    {
      title: 'Risk Assessment',
      description: 'Evaluate lifting operation risks',
      icon: 'warning-outline',
      route: '/risk-assessment',
      color: colors.warning,
    },
    {
      title: 'Equipment Database',
      description: 'Crane specifications and load charts',
      icon: 'construct-outline',
      route: '/equipment-database',
      color: colors.accent,
    },
  ];

  const hseCategories = [
    {
      title: 'Fire Safety & Prevention',
      description: 'Fire safety standards, prevention, and emergency response',
      icon: 'flame-outline',
      route: '/fire-safety',
      color: '#FF4444',
    },
    {
      title: 'Chemical Safety',
      description: 'Chemical handling, storage, and hazard communication',
      icon: 'flask-outline',
      route: '/chemical-safety',
      color: '#9C27B0',
    },
    {
      title: 'Electrical Safety',
      description: 'Electrical hazards, lockout/tagout, and safety procedures',
      icon: 'flash-outline',
      route: '/electrical-safety',
      color: '#FF9800',
    },
    {
      title: 'Fall Protection',
      description: 'Working at height safety and fall protection systems',
      icon: 'person-outline',
      route: '/fall-protection',
      color: '#2196F3',
    },
    {
      title: 'Lifeline Safety',
      description: 'Lifeline systems, rope access, and anchorage requirements',
      icon: 'git-branch-outline',
      route: '/lifeline-safety',
      color: '#673AB7',
    },
    {
      title: 'Excavations',
      description: 'Excavation safety, soil classification, and protective systems',
      icon: 'construct-outline',
      route: '/excavations',
      color: '#8D6E63',
    },
    {
      title: 'Confined Space',
      description: 'Confined space entry procedures and safety requirements',
      icon: 'cube-outline',
      route: '/confined-space',
      color: '#795548',
    },
    {
      title: 'Personal Protective Equipment',
      description: 'PPE selection, use, and maintenance standards',
      icon: 'shield-outline',
      route: '/ppe-standards',
      color: '#4CAF50',
    },
    {
      title: 'Emergency Response',
      description: 'Emergency procedures, evacuation, and incident response',
      icon: 'medical-outline',
      route: '/emergency-response',
      color: '#F44336',
    },
    {
      title: 'Environmental Compliance',
      description: 'Environmental regulations and compliance requirements',
      icon: 'leaf-outline',
      route: '/environmental-compliance',
      color: '#8BC34A',
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 32 }}>
          <Text style={commonStyles.title}>HSE Management System</Text>
          <Text style={[commonStyles.textLight, { fontSize: 16 }]}>
            Comprehensive Health, Safety & Environmental resources
          </Text>
        </View>

        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Lifting Operations
          </Text>
          {liftingItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card, { borderLeftWidth: 4, borderLeftColor: item.color }]}
              onPress={() => router.push(item.route)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon 
                      name={item.icon as any} 
                      size={24} 
                      color={item.color} 
                      style={{ marginRight: 12 }}
                    />
                    <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1, fontSize: 16 }]}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={[commonStyles.textLight, { marginLeft: 36 }]}>
                    {item.description}
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            HSE Standards & Compliance
          </Text>
          {hseCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card, { borderLeftWidth: 4, borderLeftColor: item.color }]}
              onPress={() => router.push(item.route)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon 
                      name={item.icon as any} 
                      size={24} 
                      color={item.color} 
                      style={{ marginRight: 12 }}
                    />
                    <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1, fontSize: 16 }]}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={[commonStyles.textLight, { marginLeft: 36 }]}>
                    {item.description}
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[commonStyles.card, { backgroundColor: colors.primary, marginTop: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="shield-checkmark-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              Safety First
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            Always follow proper HSE procedures and conduct thorough risk assessments before any operation. When in doubt, stop work and consult with safety professionals.
          </Text>
        </View>

        <View style={[commonStyles.card, { backgroundColor: '#f8f9fa', marginTop: 16, marginBottom: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="information-circle-outline" size={24} color={colors.primary} style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 0 }]}>
              Standards Coverage
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: colors.text }]}>
            This app covers OSHA, NFPA, ANSI, API, Saudi Aramco, and other international HSE standards. Resources are regularly updated to reflect current regulations.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
