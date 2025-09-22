
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';
import { useLanguage } from '../contexts/LanguageContext';

interface FireSafetyResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'NFPA' | 'OSHA' | 'Saudi Aramco' | 'API' | 'General';
}

export default function FireSafetyScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<FireSafetyResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(t('all'));

  const resources: FireSafetyResource[] = [
    {
      title: 'NFPA 70E - Electrical Safety in the Workplace',
      description: 'Electrical safety requirements for employee workplaces',
      icon: 'flash-outline',
      source: 'NFPA 70E-2021',
      category: 'NFPA',
      content: [
        'Arc flash hazard analysis required for electrical equipment',
        'Personal protective equipment selection based on incident energy',
        'Electrical safety program must be documented and implemented',
        'Qualified person requirements for electrical work',
        'Lockout/tagout procedures for electrical energy sources',
        'Safe work practices for energized electrical work',
        'Electrical safety training requirements for employees',
        'Incident energy calculations for arc flash boundaries',
        'Approach boundaries for shock protection',
        'Electrical safety audits and inspections required',
        'Emergency response procedures for electrical incidents',
        'Maintenance requirements for electrical safety equipment'
      ]
    },
    {
      title: 'NFPA 30 - Flammable and Combustible Liquids Code',
      description: 'Storage, handling, and use of flammable liquids',
      icon: 'flask-outline',
      source: 'NFPA 30-2021',
      category: 'NFPA',
      content: [
        'Classification of flammable and combustible liquids by flash point',
        'Storage tank requirements and spacing from property lines',
        'Secondary containment for above-ground storage tanks',
        'Vapor recovery systems for loading and unloading operations',
        'Fire suppression systems for storage areas',
        'Electrical equipment classification in hazardous areas',
        'Hot work permit requirements near flammable liquids',
        'Emergency response planning for spills and fires',
        'Inspection and maintenance of storage systems',
        'Training requirements for personnel handling flammables',
        'Dispensing and transfer operation safety procedures',
        'Waste disposal requirements for contaminated materials'
      ]
    },
    {
      title: 'OSHA 1910.38 - Emergency Action Plans',
      description: 'Emergency evacuation procedures and planning',
      icon: 'exit-outline',
      source: 'OSHA 29 CFR 1910.38',
      category: 'OSHA',
      content: [
        'Written emergency action plan required for workplaces',
        'Emergency evacuation procedures and escape route assignments',
        'Procedures for employees who remain to operate critical equipment',
        'Procedures to account for all employees after evacuation',
        'Rescue and medical duties for designated employees',
        'Preferred means of reporting fires and emergencies',
        'Names or job titles of persons who can be contacted',
        'Employee training on emergency action plan procedures',
        'Review of plan with each employee covered by the plan',
        'Plan must be kept at workplace and available to employees',
        'Alarm system requirements for emergency notification',
        'Coordination with local emergency response services'
      ]
    },
    {
      title: 'NFPA 101 - Life Safety Code',
      description: 'Building design and egress requirements for life safety',
      icon: 'business-outline',
      source: 'NFPA 101-2021',
      category: 'NFPA',
      content: [
        'Means of egress requirements for different occupancy types',
        'Exit capacity calculations based on occupant load',
        'Travel distance limitations to exits',
        'Emergency lighting and exit sign requirements',
        'Fire alarm and detection system requirements',
        'Automatic sprinkler system requirements by occupancy',
        'Smoke control systems for high-rise buildings',
        'Special provisions for hazardous materials storage',
        'Accessibility requirements for emergency egress',
        'Maintenance and testing of life safety systems',
        'Fire safety education and training programs',
        'Emergency evacuation plans and drills'
      ]
    },
    {
      title: 'Saudi Aramco SAES-A-112 Fire Protection',
      description: 'Fire protection systems and emergency response',
      icon: 'shield-outline',
      source: 'Saudi Aramco SAES-A-112',
      category: 'Saudi Aramco',
      content: [
        'Fire water system design and capacity requirements',
        'Fixed fire suppression system selection criteria',
        'Fire detection and alarm system specifications',
        'Emergency response team organization and training',
        'Hot work permit system and fire watch requirements',
        'Fire prevention inspection and maintenance programs',
        'Contractor fire safety requirements and oversight',
        'Fire incident investigation and reporting procedures',
        'Fire safety training requirements for all personnel',
        'Emergency evacuation procedures and assembly points',
        'Coordination with local fire department services',
        'Fire safety equipment inspection and testing schedules'
      ]
    },
    {
      title: 'NFPA 25 - Water-Based Fire Protection Systems',
      description: 'Inspection, testing, and maintenance of fire protection systems',
      icon: 'water-outline',
      source: 'NFPA 25-2020',
      category: 'NFPA',
      content: [
        'Weekly inspection of sprinkler system control valves',
        'Monthly inspection of fire pump operation and condition',
        'Quarterly inspection of sprinkler heads and piping',
        'Annual flow testing of fire department connections',
        'Five-year internal inspection of dry pipe systems',
        'Ten-year hydrostatic testing of fire department connections',
        'Obstruction investigation for sprinkler systems',
        'Impairment procedures for out-of-service systems',
        'Record keeping requirements for all inspections',
        'Qualified personnel requirements for testing',
        'Corrective action procedures for deficiencies',
        'Coordination with authority having jurisdiction'
      ]
    },
    {
      title: 'OSHA 1910.157 - Portable Fire Extinguishers',
      description: 'Selection, installation, and maintenance of fire extinguishers',
      icon: 'fitness-outline',
      source: 'OSHA 29 CFR 1910.157',
      category: 'OSHA',
      content: [
        'Fire extinguisher selection based on fire class and hazard',
        'Maximum travel distance to extinguishers: 75 feet for Class A',
        'Maximum travel distance to extinguishers: 50 feet for Class B',
        'Monthly visual inspection of all portable extinguishers',
        'Annual maintenance by qualified service company',
        'Six-year internal examination for stored pressure units',
        'Twelve-year hydrostatic testing for most extinguisher types',
        'Employee training on proper use of fire extinguishers',
        'Mounting height requirements: 3.5 to 5 feet above floor',
        'Extinguisher marking and identification requirements',
        'Record keeping for inspections and maintenance',
        'Removal from service criteria for damaged units'
      ]
    },
    {
      title: 'API RP 2003 - Protection Against Ignitions',
      description: 'Protection against ignitions arising from static electricity',
      icon: 'flash-off-outline',
      source: 'API RP 2003-2008',
      category: 'API',
      content: [
        'Bonding and grounding requirements for flammable liquid handling',
        'Static electricity generation and accumulation prevention',
        'Conductive and static dissipative materials selection',
        'Personal grounding requirements for personnel',
        'Equipment grounding verification procedures',
        'Relaxation time calculations for static charge dissipation',
        'Minimum conductivity requirements for materials',
        'Static electricity hazard assessment procedures',
        'Training requirements for personnel on static hazards',
        'Inspection and testing of grounding systems',
        'Special precautions for low conductivity liquids',
        'Documentation requirements for grounding programs'
      ]
    },
    {
      title: 'NFPA 497 - Electrical Equipment in Chemical Process Areas',
      description: 'Classification of hazardous locations for electrical equipment',
      icon: 'settings-outline',
      source: 'NFPA 497-2021',
      category: 'NFPA',
      content: [
        'Area classification methodology for chemical process facilities',
        'Division and zone classification systems comparison',
        'Ventilation requirements for hazardous area classification',
        'Release source identification and characterization',
        'Electrical equipment selection for classified areas',
        'Installation requirements for electrical equipment',
        'Maintenance procedures for explosion-proof equipment',
        'Documentation requirements for area classification',
        'Periodic review and updating of classifications',
        'Training requirements for electrical personnel',
        'Inspection procedures for classified electrical equipment',
        'Coordination with process safety management programs'
      ]
    },
    {
      title: 'Hot Work Safety Procedures',
      description: 'Safe practices for welding, cutting, and hot work operations',
      icon: 'flame-outline',
      source: 'NFPA 51B / Industry Best Practice',
      category: 'General',
      content: [
        'Hot work permit system implementation and management',
        'Fire watch requirements during and after hot work',
        'Combustible material removal from work area',
        'Fire extinguishing equipment placement and readiness',
        'Atmospheric testing in confined spaces before hot work',
        'Personal protective equipment for hot work operations',
        'Training requirements for hot work personnel',
        'Contractor hot work safety requirements',
        'Emergency response procedures for hot work incidents',
        'Post-work fire watch duration requirements',
        'Documentation and record keeping for hot work permits',
        'Coordination with facility fire protection systems'
      ]
    },
    {
      title: 'Fire Prevention and Housekeeping',
      description: 'Fire prevention through good housekeeping practices',
      icon: 'trash-outline',
      source: 'OSHA / NFPA General Principles',
      category: 'General',
      content: [
        'Combustible waste material disposal procedures',
        'Smoking policy and designated smoking areas',
        'Electrical equipment maintenance and inspection',
        'Storage of flammable materials in approved containers',
        'Housekeeping standards for work areas',
        'Heat-producing equipment placement and clearances',
        'Regular inspection of fire hazards in workplace',
        'Employee training on fire prevention practices',
        'Contractor fire prevention requirements',
        'Maintenance of emergency egress routes',
        'Control of ignition sources in work areas',
        'Fire prevention inspection checklists and procedures'
      ]
    },
    {
      title: 'Emergency Response Team Organization',
      description: 'Organization and training of industrial fire brigades',
      icon: 'people-outline',
      source: 'NFPA 600 / OSHA 1910.156',
      category: 'NFPA',
      content: [
        'Fire brigade organization and command structure',
        'Training requirements for fire brigade members',
        'Personal protective equipment for fire brigade',
        'Fire suppression equipment and apparatus requirements',
        'Medical surveillance requirements for fire brigade members',
        'Standard operating procedures for emergency response',
        'Coordination with municipal fire departments',
        'Fire brigade member fitness and health requirements',
        'Equipment maintenance and testing procedures',
        'Emergency communication systems and protocols',
        'Incident command system implementation',
        'Post-incident analysis and improvement procedures'
      ]
    }
  ];

  const categories = [t('all'), 'NFPA', 'OSHA', 'Saudi Aramco', 'API', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === t('all') || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: FireSafetyResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening fire safety resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'NFPA': return '#FF4444';
      case 'OSHA': return '#FF6B35';
      case 'Saudi Aramco': return '#00A651';
      case 'API': return '#0066CC';
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
          {t('fire.safety')}
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
          Comprehensive fire safety standards from NFPA, OSHA, and industry organizations
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
                    ? { backgroundColor: '#FF4444', borderColor: '#FF4444' }
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
              style={[commonStyles.card]}
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
              { 
                textAlign: 'center'
              }
            ]}>
              {t('no.results')}
            </Text>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: '#FF4444', marginTop: 20, marginBottom: 20 }]}>
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
              Fire Safety Notice
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
            Fire safety is everyone&apos;s responsibility. Always follow established procedures, maintain fire protection systems, and report fire hazards immediately. In case of fire emergency, evacuate immediately and call emergency services.
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
