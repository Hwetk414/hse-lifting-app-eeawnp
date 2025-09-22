
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const router = useRouter();

  const menuItems = [
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

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 32 }}>
          <Text style={commonStyles.title}>HSE Lifting Operations</Text>
          <Text style={[commonStyles.textLight, { fontSize: 16 }]}>
            Your comprehensive tool for safe lifting operations
          </Text>
        </View>

        <View style={commonStyles.section}>
          {menuItems.map((item, index) => (
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
                    <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={commonStyles.textLight}>
                    {item.description}
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[commonStyles.card, { backgroundColor: colors.primary, marginTop: 20 }]}>
          <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 8 }]}>
            Safety First
          </Text>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            Always follow proper lifting procedures and conduct thorough risk assessments before any lifting operation.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
