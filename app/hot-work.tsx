
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface HotWorkResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'NFPA' | 'Saudi Aramco' | 'AWS' | 'General';
}

export default function HotWorkScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<HotWorkResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: HotWorkResource[] = [
    {
      title: 'NFPA 51B - Fire Prevention During Welding, Cutting, and Other Hot Work',
      description: 'Standard for fire prevention during hot work operations',
      icon: 'flame-outline',
      source: 'NFPA 51B-2019',
      category: 'NFPA',
      content: [
        'Hot work permit system must be established and implemented',
        'Fire watch required during and after hot work operations',
        'Combustible materials must be removed or protected within 35 feet',
        'Fire extinguishing equipment must be readily available',
        'Atmospheric testing required in confined spaces before hot work',
        'Hot work area inspection required before starting work',
        'Fire watch must continue for at least 30 minutes after completion',
        'Personnel must be trained in hot work safety procedures',
        'Emergency response procedures must be established',
        'Documentation and record keeping requirements for permits',
        'Contractor hot work safety requirements and oversight',
        'Coordination with facility fire protection systems'
      ]
    },
    {
      title: 'OSHA 1910.252 - General Requirements for Welding, Cutting, and Brazing',
      description: 'OSHA requirements for hot work operations safety',
      icon: 'construct-outline',
      source: 'OSHA 29 CFR 1910.252',
      category: 'OSHA',
      content: [
        'Fire prevention and protection requirements for hot work',
        'Ventilation requirements for welding and cutting operations',
        'Personal protective equipment requirements for welders',
        'Eye and face protection specifications for hot work',
        'Respiratory protection requirements in confined spaces',
        'Electrical safety requirements for welding equipment',
        'Gas cylinder storage and handling requirements',
        'Hot work in confined spaces safety procedures',
        'Training requirements for hot work personnel',
        'Medical surveillance requirements for welders',
        'Hazard communication for welding consumables',
        'Record keeping requirements for hot work operations'
      ]
    },
    {
      title: 'Hot Work Permit System Implementation',
      description: 'Comprehensive hot work permit system procedures',
      icon: 'document-text-outline',
      source: 'Industry Best Practice / NFPA 51B',
      category: 'General',
      content: [
        'Permit application and approval process procedures',
        'Hot work area inspection and preparation checklist',
        'Fire watch assignment and qualification requirements',
        'Combustible material removal and protection procedures',
        'Fire extinguishing equipment placement and inspection',
        'Atmospheric monitoring requirements and procedures',
        'Emergency contact information and response procedures',
        'Permit duration and renewal requirements',
        'Post-work inspection and fire watch procedures',
        'Permit close-out and documentation requirements',
        'Non-compliance reporting and corrective actions',
        'Permit system audit and improvement procedures'
      ]
    },
    {
      title: 'AWS D1.1 - Structural Welding Code Safety Requirements',
      description: 'Safety requirements for structural welding operations',
      icon: 'build-outline',
      source: 'AWS D1.1/D1.1M-2020',
      category: 'AWS',
      content: [
        'Welder qualification and certification requirements',
        'Welding procedure specification (WPS) development',
        'Pre-welding inspection and preparation requirements',
        'Joint preparation and fit-up specifications',
        'Welding consumable storage and handling requirements',
        'Post-weld heat treatment safety procedures',
        'Non-destructive testing safety requirements',
        'Quality control and inspection procedures',
        'Welding equipment maintenance and calibration',
        'Environmental conditions for welding operations',
        'Safety requirements for overhead and vertical welding',
        'Documentation and record keeping for welding operations'
      ]
    },
    {
      title: 'Saudi Aramco SAES-A-113 Hot Work Safety',
      description: 'Hot work safety procedures and permit system',
      icon: 'shield-outline',
      source: 'Saudi Aramco SAES-A-113',
      category: 'Saudi Aramco',
      content: [
        'Hot work classification and permit requirements',
        'Fire watch training and certification requirements',
        'Combustible material identification and removal procedures',
        'Fire protection system isolation and restoration procedures',
        'Atmospheric monitoring and gas testing requirements',
        'Personal protective equipment specifications for hot work',
        'Emergency response procedures for hot work incidents',
        'Contractor hot work safety requirements and oversight',
        'Hot work area preparation and inspection procedures',
        'Post-work fire watch and inspection requirements',
        'Hot work permit documentation and record keeping',
        'Incident investigation and reporting procedures'
      ]
    },
    {
      title: 'Fire Watch Procedures and Requirements',
      description: 'Fire watch personnel duties and qualifications',
      icon: 'eye-outline',
      source: 'NFPA 51B / Industry Standards',
      category: 'General',
      content: [
        'Fire watch personnel training and qualification requirements',
        'Fire watch duties during hot work operations',
        'Fire detection and alarm procedures for fire watch',
        'Fire extinguisher operation and emergency response',
        'Communication procedures with hot work personnel',
        'Fire watch equipment and tools requirements',
        'Post-work fire watch duration and procedures',
        'Fire watch documentation and reporting requirements',
        'Multiple fire watch coordination procedures',
        'Fire watch relief and shift change procedures',
        'Emergency evacuation procedures for fire watch',
        'Fire watch performance evaluation and feedback'
      ]
    },
    {
      title: 'Confined Space Hot Work Safety',
      description: 'Special requirements for hot work in confined spaces',
      icon: 'cube-outline',
      source: 'OSHA 1910.146 / NFPA 51B',
      category: 'OSHA',
      content: [
        'Confined space entry permit requirements for hot work',
        'Atmospheric testing before and during hot work',
        'Ventilation requirements for confined space hot work',
        'Emergency rescue procedures for confined space hot work',
        'Communication systems for confined space operations',
        'Personal protective equipment for confined space hot work',
        'Attendant duties during confined space hot work',
        'Gas monitoring and alarm systems requirements',
        'Emergency evacuation procedures from confined spaces',
        'Medical surveillance for confined space hot work personnel',
        'Training requirements for confined space hot work',
        'Documentation and record keeping for confined space hot work'
      ]
    },
    {
      title: 'Welding Fume Control and Ventilation',
      description: 'Ventilation requirements for welding operations',
      icon: 'cloud-outline',
      source: 'OSHA 1910.252(c) / ACGIH',
      category: 'OSHA',
      content: [
        'Local exhaust ventilation requirements for welding',
        'General ventilation requirements for welding areas',
        'Respiratory protection requirements for welders',
        'Air quality monitoring for welding operations',
        'Ventilation system design and performance requirements',
        'Maintenance and inspection of ventilation systems',
        'Personal protective equipment for fume exposure',
        'Health surveillance for welding personnel',
        'Training on welding fume hazards and controls',
        'Emergency procedures for ventilation system failure',
        'Documentation requirements for air quality monitoring',
        'Contractor requirements for welding fume control'
      ]
    },
    {
      title: 'Gas Cylinder Safety for Hot Work',
      description: 'Safe handling and storage of compressed gas cylinders',
      icon: 'battery-charging-outline',
      source: 'OSHA 1910.253 / CGA Standards',
      category: 'OSHA',
      content: [
        'Gas cylinder storage and segregation requirements',
        'Cylinder handling and transportation procedures',
        'Regulator and hose inspection requirements',
        'Leak detection and repair procedures',
        'Cylinder valve operation and safety procedures',
        'Emergency procedures for gas leaks and fires',
        'Personal protective equipment for gas handling',
        'Training requirements for gas cylinder operations',
        'Cylinder marking and identification requirements',
        'Maintenance and inspection of gas equipment',
        'Documentation requirements for gas cylinder operations',
        'Contractor requirements for gas cylinder safety'
      ]
    },
    {
      title: 'Hot Work Equipment Inspection and Maintenance',
      description: 'Inspection and maintenance of hot work equipment',
      icon: 'settings-outline',
      source: 'OSHA / AWS / Industry Standards',
      category: 'General',
      content: [
        'Daily inspection requirements for welding equipment',
        'Electrical safety inspection of welding machines',
        'Gas equipment leak testing and inspection procedures',
        'Personal protective equipment inspection requirements',
        'Fire extinguisher inspection and maintenance schedules',
        'Ventilation system inspection and testing procedures',
        'Gas detection equipment calibration and maintenance',
        'Documentation requirements for equipment inspections',
        'Defective equipment removal and repair procedures',
        'Preventive maintenance schedules for hot work equipment',
        'Training requirements for equipment inspection personnel',
        'Quality assurance procedures for equipment maintenance'
      ]
    },
    {
      title: 'Hot Work Emergency Response Procedures',
      description: 'Emergency response procedures for hot work incidents',
      icon: 'medical-outline',
      source: 'NFPA / OSHA / Emergency Response Standards',
      category: 'General',
      content: [
        'Fire emergency response procedures for hot work areas',
        'Medical emergency response for hot work injuries',
        'Evacuation procedures for hot work emergencies',
        'Emergency communication systems and procedures',
        'Emergency equipment location and accessibility',
        'Coordination with local emergency response services',
        'Incident command system for hot work emergencies',
        'Post-incident investigation and reporting procedures',
        'Emergency response training for hot work personnel',
        'Emergency drill requirements and procedures',
        'Documentation requirements for emergency response',
        'Continuous improvement of emergency response procedures'
      ]
    },
    {
      title: 'Hot Work Training and Competency Requirements',
      description: 'Training requirements for hot work personnel',
      icon: 'school-outline',
      source: 'OSHA / NFPA / Industry Standards',
      category: 'General',
      content: [
        'Initial training requirements for hot work personnel',
        'Refresher training schedules and requirements',
        'Competency assessment procedures for hot work personnel',
        'Fire watch training and certification requirements',
        'Supervisor training requirements for hot work operations',
        'Contractor training requirements and verification',
        'Training documentation and record keeping requirements',
        'Training program development and approval procedures',
        'Qualified instructor requirements for hot work training',
        'Training effectiveness evaluation procedures',
        'Specialized training for confined space hot work',
        'Emergency response training for hot work personnel'
      ]
    }
  ];

  const categories = [t('all'), 'NFPA', 'OSHA', 'Saudi Aramco', 'AWS', t('all')];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === t('all') || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: HotWorkResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening hot work resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'NFPA': return '#FF5722';
      case 'OSHA': return '#FF6B35';
      case 'Saudi Aramco': return '#00A651';
      case 'AWS': return '#1976D2';
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
          {t('hot.work')}
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
          Comprehensive hot work safety standards for welding, cutting, and other hot work operations
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
                    ? { backgroundColor: '#FF5722', borderColor: '#FF5722' }
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

          {filteredResources.map((resource, index) => (
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
                      alignItems: 'center',
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
                        commonStyles.row, 
                        { 
                          alignItems: 'center',
                          flexDirection: isRTL ? 'row-reverse' : 'row'
                        }
                      ]}>
                        <View 
                          style={{
                            backgroundColor: getCategoryColor(resource.category),
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 10,
                            marginRight: isRTL ? 0 : 8,
                            marginLeft: isRTL ? 8 : 0
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                            {resource.category}
                          </Text>
                        </View>
                        <Text style={[
                          commonStyles.textLight, 
                          { 
                            fontSize: 12,
                            textAlign: isRTL ? 'right' : 'left'
                          }
                        ]}>
                          {resource.source}
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
          ))}
        </View>

        {filteredResources.length === 0 && (
          <View style={[commonStyles.card, commonStyles.center, { padding: 40 }]}>
            <Icon name="search-outline" size={48} color={colors.textLight} style={{ marginBottom: 16 }} />
            <Text style={[
              commonStyles.text, 
              { textAlign: 'center' }
            ]}>
              {t('no.results')}
            </Text>
          </View>
        )}

        <View style={[
          commonStyles.card, 
          { 
            backgroundColor: '#FF5722', 
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
              name="flame-outline" 
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
                <View style={[
                  commonStyles.row, 
                  { 
                    alignItems: 'center',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <View 
                    style={{
                      backgroundColor: getCategoryColor(selectedResource.category),
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      marginRight: isRTL ? 0 : 10,
                      marginLeft: isRTL ? 10 : 0
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                      {selectedResource.category}
                    </Text>
                  </View>
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
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {selectedResource.content.map((item, index) => (
                <View key={index} style={[
                  commonStyles.row, 
                  { 
                    marginBottom: 12, 
                    alignItems: 'flex-start',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <Text style={[
                    commonStyles.text, 
                    { 
                      color: getCategoryColor(selectedResource.category), 
                      marginRight: isRTL ? 0 : 8,
                      marginLeft: isRTL ? 8 : 0,
                      fontWeight: '600' 
                    }
                  ]}>
                    •
                  </Text>
                  <Text style={[
                    commonStyles.text, 
                    { 
                      flex: 1, 
                      lineHeight: 20,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
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
