
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  const liftingItems = [
    {
      title: t('lifting.calculator'),
      description: t('lifting.calculator.desc'),
      icon: 'calculator-outline',
      route: '/lifting-calculator',
      color: colors.primary,
    },
    {
      title: t('lifting.resources'),
      description: t('lifting.resources.desc'),
      icon: 'library-outline',
      route: '/lifting-resources',
      color: colors.secondary,
    },
    {
      title: t('critical.lifting'),
      description: t('critical.lifting.desc'),
      icon: 'warning-outline',
      route: '/critical-lifting-plan',
      color: '#E91E63',
    },
    {
      title: t('risk.assessment'),
      description: t('risk.assessment.desc'),
      icon: 'shield-outline',
      route: '/risk-assessment',
      color: colors.warning,
    },
    {
      title: t('equipment.database'),
      description: t('equipment.database.desc'),
      icon: 'construct-outline',
      route: '/equipment-database',
      color: colors.accent,
    },
  ];

  const hseCategories = [
    {
      title: t('fire.safety'),
      description: t('fire.safety.desc'),
      icon: 'flame-outline',
      route: '/fire-safety',
      color: '#FF4444',
    },
    {
      title: t('chemical.safety'),
      description: t('chemical.safety.desc'),
      icon: 'flask-outline',
      route: '/chemical-safety',
      color: '#9C27B0',
    },
    {
      title: t('electrical.safety'),
      description: t('electrical.safety.desc'),
      icon: 'flash-outline',
      route: '/electrical-safety',
      color: '#FF9800',
    },
    {
      title: t('fall.protection'),
      description: t('fall.protection.desc'),
      icon: 'person-outline',
      route: '/fall-protection',
      color: '#2196F3',
    },
    {
      title: t('ladder.safety'),
      description: t('ladder.safety.desc'),
      icon: 'trending-up-outline',
      route: '/ladder-safety',
      color: '#00BCD4',
    },
    {
      title: t('lifeline.safety'),
      description: t('lifeline.safety.desc'),
      icon: 'git-branch-outline',
      route: '/lifeline-safety',
      color: '#673AB7',
    },
    {
      title: t('scaffolding.standards'),
      description: t('scaffolding.standards.desc'),
      icon: 'construct-outline',
      route: '/scaffolding-standards',
      color: '#8D6E63',
    },
    {
      title: t('excavations'),
      description: t('excavations.desc'),
      icon: 'construct-outline',
      route: '/excavations',
      color: '#795548',
    },
    {
      title: t('confined.space'),
      description: t('confined.space.desc'),
      icon: 'cube-outline',
      route: '/confined-space',
      color: '#607D8B',
    },
    {
      title: t('ppe.standards'),
      description: t('ppe.standards.desc'),
      icon: 'shield-outline',
      route: '/ppe-standards',
      color: '#4CAF50',
    },
    {
      title: t('emergency.response'),
      description: t('emergency.response.desc'),
      icon: 'medical-outline',
      route: '/emergency-response',
      color: '#F44336',
    },
    {
      title: t('environmental.compliance'),
      description: t('environmental.compliance.desc'),
      icon: 'leaf-outline',
      route: '/environmental-compliance',
      color: '#8BC34A',
    },
    {
      title: t('hot.work'),
      description: t('hot.work.desc'),
      icon: 'flame-outline',
      route: '/hot-work',
      color: '#FF5722',
    },
  ];

  return (
    <SafeAreaView style={[commonStyles.container, isRTL && { direction: 'rtl' }]}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={[
          commonStyles.row,
          { 
            marginBottom: 32,
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }
        ]}>
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.title, { textAlign: isRTL ? 'right' : 'left' }]}>
              {t('app.title')}
            </Text>
            <Text style={[
              commonStyles.textLight, 
              { 
                fontSize: 16,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {t('app.subtitle')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/language-settings')}
            style={[
              commonStyles.card,
              {
                padding: 12,
                marginBottom: 0,
                marginLeft: isRTL ? 0 : 16,
                marginRight: isRTL ? 16 : 0,
                backgroundColor: colors.primary,
              }
            ]}
          >
            <Icon name="language-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={commonStyles.section}>
          <Text style={[
            commonStyles.subtitle, 
            { 
              marginBottom: 16,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {t('lifting.operations')}
          </Text>
          {liftingItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.card, 
                { 
                  borderLeftWidth: isRTL ? 0 : 4, 
                  borderRightWidth: isRTL ? 4 : 0,
                  borderLeftColor: isRTL ? 'transparent' : item.color,
                  borderRightColor: isRTL ? item.color : 'transparent'
                }
              ]}
              onPress={() => router.push(item.route)}
              activeOpacity={0.7}
            >
              <View style={[
                commonStyles.row,
                { flexDirection: isRTL ? 'row-reverse' : 'row' }
              ]}>
                <View style={{ flex: 1 }}>
                  <View style={[
                    commonStyles.row, 
                    { 
                      marginBottom: 8,
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }
                  ]}>
                    <Icon 
                      name={item.icon as any} 
                      size={24} 
                      color={item.color} 
                      style={{ 
                        marginRight: isRTL ? 0 : 12,
                        marginLeft: isRTL ? 12 : 0
                      }}
                    />
                    <Text style={[
                      commonStyles.subtitle, 
                      { 
                        marginBottom: 0, 
                        flex: 1, 
                        fontSize: 16,
                        textAlign: isRTL ? 'right' : 'left'
                      }
                    ]}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={[
                    commonStyles.textLight, 
                    { 
                      marginLeft: isRTL ? 0 : 36,
                      marginRight: isRTL ? 36 : 0,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {item.description}
                  </Text>
                </View>
                <Icon 
                  name={isRTL ? "chevron-back-outline" : "chevron-forward-outline"} 
                  size={20} 
                  color={colors.textLight} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={commonStyles.section}>
          <Text style={[
            commonStyles.subtitle, 
            { 
              marginBottom: 16,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {t('hse.standards')}
          </Text>
          {hseCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.card, 
                { 
                  borderLeftWidth: isRTL ? 0 : 4, 
                  borderRightWidth: isRTL ? 4 : 0,
                  borderLeftColor: isRTL ? 'transparent' : item.color,
                  borderRightColor: isRTL ? item.color : 'transparent'
                }
              ]}
              onPress={() => router.push(item.route)}
              activeOpacity={0.7}
            >
              <View style={[
                commonStyles.row,
                { flexDirection: isRTL ? 'row-reverse' : 'row' }
              ]}>
                <View style={{ flex: 1 }}>
                  <View style={[
                    commonStyles.row, 
                    { 
                      marginBottom: 8,
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }
                  ]}>
                    <Icon 
                      name={item.icon as any} 
                      size={24} 
                      color={item.color} 
                      style={{ 
                        marginRight: isRTL ? 0 : 12,
                        marginLeft: isRTL ? 12 : 0
                      }}
                    />
                    <Text style={[
                      commonStyles.subtitle, 
                      { 
                        marginBottom: 0, 
                        flex: 1, 
                        fontSize: 16,
                        textAlign: isRTL ? 'right' : 'left'
                      }
                    ]}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={[
                    commonStyles.textLight, 
                    { 
                      marginLeft: isRTL ? 0 : 36,
                      marginRight: isRTL ? 36 : 0,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {item.description}
                  </Text>
                </View>
                <Icon 
                  name={isRTL ? "chevron-back-outline" : "chevron-forward-outline"} 
                  size={20} 
                  color={colors.textLight} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[commonStyles.card, { backgroundColor: colors.primary, marginTop: 20 }]}>
          <View style={[
            commonStyles.row, 
            { 
              marginBottom: 8,
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }
          ]}>
            <Icon 
              name="shield-checkmark-outline" 
              size={24} 
              color="white" 
              style={{ 
                marginRight: isRTL ? 0 : 12,
                marginLeft: isRTL ? 12 : 0
              }} 
            />
            <Text style={[
              commonStyles.subtitle, 
              { 
                color: 'white', 
                marginBottom: 0,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {t('safety.first')}
            </Text>
          </View>
          <Text style={[
            commonStyles.text, 
            { 
              color: 'white', 
              opacity: 0.9,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {t('safety.message')}
          </Text>
        </View>

        <View style={[commonStyles.card, { backgroundColor: '#f8f9fa', marginTop: 16, marginBottom: 20 }]}>
          <View style={[
            commonStyles.row, 
            { 
              marginBottom: 8,
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }
          ]}>
            <Icon 
              name="information-circle-outline" 
              size={24} 
              color={colors.primary} 
              style={{ 
                marginRight: isRTL ? 0 : 12,
                marginLeft: isRTL ? 12 : 0
              }} 
            />
            <Text style={[
              commonStyles.subtitle, 
              { 
                color: colors.primary, 
                marginBottom: 0,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {t('standards.coverage')}
            </Text>
          </View>
          <Text style={[
            commonStyles.text, 
            { 
              color: colors.text,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {t('standards.message')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
