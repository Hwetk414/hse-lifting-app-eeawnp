
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from '../components/Icon';
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
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<LadderSafetyResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  const categories = [t('all'), 'OSHA', 'ANSI', 'Saudi Aramco', 'NIOSH', t('all')];

  const filteredResources = ladderSafetyResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === t('all') || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: LadderSafetyResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening ladder safety resource:', resource.title);
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
    <SafeAreaView style={[commonStyles.container, isRTL && { direction: 'rtl' }]}>
      <View style={[
        commonStyles.row, 
        { 
          paddingHorizontal: 20, 
          paddingVertical: 16, 
          borderBottomWidth: 1, 
          borderBottomColor: colors.border,
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }
      ]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={{ 
            marginRight: isRTL ? 0 : 16,
            marginLeft: isRTL ? 16 : 0
          }}
        >
          <Icon 
            name={isRTL ? "arrow-forward-outline" : "arrow-back-outline"} 
            size={24} 
            color={colors.text} 
          />
        </TouchableOpacity>
        <Text style={[
          commonStyles.subtitle, 
          { 
            marginBottom: 0, 
            flex: 1,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          {t('ladder.safety')}
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[
          commonStyles.textLight, 
          { 
            marginBottom: 16, 
            fontSize: 16,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          Ladder safety standards and best practices for safe use
        </Text>

        <View style={commonStyles.section}>
          <Text style={[
            commonStyles.label,
            { textAlign: isRTL ? 'right' : 'left' }
          ]}>
            {t('search.resources')}
          </Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[
                commonStyles.input, 
                { 
                  paddingLeft: isRTL ? 12 : 40,
                  paddingRight: isRTL ? 40 : 12,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={t('search.placeholder')}
              placeholderTextColor={colors.textLight}
            />
            <Icon 
              name="search-outline" 
              size={20} 
              color={colors.textLight} 
              style={{ 
                position: 'absolute', 
                left: isRTL ? undefined : 12, 
                right: isRTL ? 12 : undefined,
                top: 12 
              }}
            />
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={[
            commonStyles.label, 
            { 
              marginBottom: 12,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {t('filter.by.organization')}
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={{ marginBottom: 16 }}
            contentContainerStyle={{ 
              paddingHorizontal: isRTL ? 0 : 0,
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: isRTL ? 0 : 8,
                    marginLeft: isRTL ? 8 : 0,
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
          <Text style={[
            commonStyles.subtitle, 
            { 
              marginBottom: 16,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            {t('available.resources')} ({filteredResources.length})
          </Text>

          {filteredResources.length === 0 ? (
            <View style={[commonStyles.card, commonStyles.center, { padding: 40 }]}>
              <Icon name="search-outline" size={48} color={colors.textLight} style={{ marginBottom: 16 }} />
              <Text style={[
                commonStyles.text, 
                { textAlign: 'center' }
              ]}>
                {t('no.results')}
              </Text>
            </View>
          ) : (
            filteredResources.map((resource, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  commonStyles.card,
                  { 
                    borderLeftWidth: isRTL ? 0 : 4, 
                    borderRightWidth: isRTL ? 4 : 0,
                    borderLeftColor: isRTL ? 'transparent' : getCategoryColor(resource.category),
                    borderRightColor: isRTL ? getCategoryColor(resource.category) : 'transparent'
                  }
                ]}
                onPress={() => openResource(resource)}
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
                        name={resource.icon as any} 
                        size={24} 
                        color={getCategoryColor(resource.category)} 
                        style={{ 
                          marginRight: isRTL ? 0 : 12,
                          marginLeft: isRTL ? 12 : 0
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={[
                          commonStyles.subtitle, 
                          { 
                            marginBottom: 4, 
                            fontSize: 16,
                            textAlign: isRTL ? 'right' : 'left'
                          }
                        ]}>
                          {resource.title}
                        </Text>
                        <View style={[
                          {
                            backgroundColor: getCategoryColor(resource.category) + '20',
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 10,
                            alignSelf: isRTL ? 'flex-end' : 'flex-start'
                          }
                        ]}>
                          <Text style={[
                            { 
                              color: getCategoryColor(resource.category),
                              fontSize: 10,
                              fontWeight: '600'
                            }
                          ]}>
                            {resource.category}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={[
                      commonStyles.textLight, 
                      { 
                        marginLeft: isRTL ? 0 : 36,
                        marginRight: isRTL ? 36 : 0,
                        textAlign: isRTL ? 'right' : 'left'
                      }
                    ]}>
                      {resource.description}
                    </Text>
                  </View>
                  <Icon 
                    name={isRTL ? "chevron-back-outline" : "chevron-forward-outline"} 
                    size={20} 
                    color={colors.textLight} 
                  />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={[
          commonStyles.card, 
          { 
            backgroundColor: colors.primary, 
            marginTop: 20, 
            marginBottom: 20 
          }
        ]}>
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
              {t('compliance.notice')}
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
            {t('compliance.message')}
          </Text>
        </View>
      </ScrollView>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        {selectedResource && (
          <View style={{ padding: 20 }}>
            <View style={[
              commonStyles.row, 
              { 
                marginBottom: 20, 
                alignItems: 'center',
                flexDirection: isRTL ? 'row-reverse' : 'row'
              }
            ]}>
              <Icon 
                name={selectedResource.icon as any} 
                size={28} 
                color={getCategoryColor(selectedResource.category)} 
                style={{ 
                  marginRight: isRTL ? 0 : 12,
                  marginLeft: isRTL ? 12 : 0
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={[
                  commonStyles.title, 
                  { 
                    marginBottom: 4, 
                    fontSize: 20,
                    textAlign: isRTL ? 'right' : 'left'
                  }
                ]}>
                  {selectedResource.title}
                </Text>
                <Text style={[
                  commonStyles.textLight, 
                  { 
                    fontSize: 14,
                    textAlign: isRTL ? 'right' : 'left'
                  }
                ]}>
                  {selectedResource.source}
                </Text>
              </View>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {selectedResource.content.map((line, index) => (
                <Text
                  key={index}
                  style={[
                    commonStyles.text,
                    {
                      marginBottom: line === '' ? 12 : 4,
                      fontWeight: line.startsWith('•') ? 'normal' : 
                                 line.endsWith(':') || (!line.startsWith('•') && !line.startsWith(' ') && line !== '') ? '600' : 'normal',
                      marginLeft: line.startsWith('•') ? (isRTL ? 0 : 16) : 0,
                      marginRight: line.startsWith('•') ? (isRTL ? 16 : 0) : 0,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}
                >
                  {line}
                </Text>
              ))}
            </ScrollView>
          </View>
        )}
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
