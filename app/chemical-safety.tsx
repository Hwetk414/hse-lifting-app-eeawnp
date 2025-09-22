
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface ChemicalSafetyResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'OSHA' | 'EPA' | 'Saudi Aramco' | 'NFPA' | 'General';
}

export default function ChemicalSafetyScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<ChemicalSafetyResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: ChemicalSafetyResource[] = [
    {
      title: 'OSHA Hazard Communication Standard (HCS)',
      description: 'Chemical hazard communication and safety data sheets',
      icon: 'warning-outline',
      source: 'OSHA 29 CFR 1910.1200',
      category: 'OSHA',
      content: [
        'Safety Data Sheets (SDS) required for all hazardous chemicals',
        'Chemical inventory must be maintained and updated',
        'Hazard classification using Globally Harmonized System (GHS)',
        'Container labeling requirements with pictograms and signal words',
        'Employee training on chemical hazards and protective measures',
        'Written hazard communication program required',
        'SDS must be readily accessible to employees during work shifts',
        'Chemical manufacturers must provide SDS with first shipment',
        'Secondary container labeling requirements',
        'Trade secret protection procedures for chemical identity',
        'Multi-employer workplace coordination requirements',
        'Annual review and update of hazard communication program'
      ]
    },
    {
      title: 'OSHA Process Safety Management (PSM)',
      description: 'Management of highly hazardous chemicals',
      icon: 'cog-outline',
      source: 'OSHA 29 CFR 1910.119',
      category: 'OSHA',
      content: [
        'Process safety information documentation requirements',
        'Process hazard analysis (PHA) every 5 years minimum',
        'Operating procedures written and regularly updated',
        'Employee training on process operations and safety',
        'Contractor safety management and training requirements',
        'Pre-startup safety review for new or modified processes',
        'Mechanical integrity program for process equipment',
        'Hot work permit system for maintenance activities',
        'Management of change procedures for process modifications',
        'Incident investigation within 48 hours of occurrence',
        'Emergency planning and response procedures',
        'Compliance audits every 3 years minimum'
      ]
    },
    {
      title: 'EPA Risk Management Program (RMP)',
      description: 'Prevention of chemical accidents and emergency response',
      icon: 'shield-outline',
      source: 'EPA 40 CFR Part 68',
      category: 'EPA',
      content: [
        'Risk Management Plan submission to EPA required',
        'Worst-case and alternative release scenario analysis',
        'Five-year accident history reporting requirements',
        'Prevention program implementation and documentation',
        'Emergency response program coordination with local authorities',
        'Public participation and information availability',
        'Registration and submission deadlines compliance',
        'Offsite consequence analysis for regulated substances',
        'Management system requirements for prevention programs',
        'Hazard assessment updates every 5 years',
        'Employee participation in process safety activities',
        'Third-party auditing requirements for Program 3 processes'
      ]
    },
    {
      title: 'Saudi Aramco SAES-A-104 Chemical Management',
      description: 'Chemical procurement, storage, and handling procedures',
      icon: 'flask-outline',
      source: 'Saudi Aramco SAES-A-104',
      category: 'Saudi Aramco',
      content: [
        'Chemical approval process before procurement',
        'Chemical inventory management and tracking system',
        'Storage requirements based on chemical compatibility',
        'Secondary containment for liquid chemical storage',
        'Personal protective equipment selection for chemical handling',
        'Chemical waste disposal and treatment procedures',
        'Emergency response procedures for chemical spills',
        'Training requirements for chemical handling personnel',
        'Inspection and maintenance of chemical storage areas',
        'Chemical transportation and transfer procedures',
        'Contractor chemical management requirements',
        'Documentation and record keeping for chemical operations'
      ]
    },
    {
      title: 'NFPA 400 - Hazardous Materials Code',
      description: 'Storage, handling, and use of hazardous materials',
      icon: 'nuclear-outline',
      source: 'NFPA 400-2022',
      category: 'NFPA',
      content: [
        'Hazardous material classification and quantity limitations',
        'Storage requirements for different hazard classes',
        'Separation distances between incompatible materials',
        'Ventilation requirements for hazardous material storage',
        'Fire suppression systems for hazardous material areas',
        'Spill control and secondary containment requirements',
        'Emergency planning and response procedures',
        'Personnel training and qualification requirements',
        'Inspection and maintenance of storage systems',
        'Security requirements for hazardous materials',
        'Transportation and handling procedures',
        'Record keeping and documentation requirements'
      ]
    },
    {
      title: 'Chemical Storage and Segregation',
      description: 'Safe storage practices and chemical compatibility',
      icon: 'library-outline',
      source: 'Industry Best Practice / OSHA',
      category: 'General',
      content: [
        'Chemical compatibility matrix for storage segregation',
        'Acids and bases must be stored separately',
        'Oxidizers separated from flammable and combustible materials',
        'Toxic chemicals stored in ventilated areas',
        'Temperature-sensitive chemicals in climate-controlled storage',
        'Secondary containment capacity minimum 110% of largest container',
        'Chemical storage area ventilation requirements',
        'Inventory rotation using first-in-first-out principle',
        'Regular inspection of storage containers and areas',
        'Emergency equipment placement near storage areas',
        'Access control and security for hazardous chemical storage',
        'Labeling and identification of all stored chemicals'
      ]
    },
    {
      title: 'Personal Protective Equipment for Chemicals',
      description: 'PPE selection and use for chemical hazards',
      icon: 'person-outline',
      source: 'OSHA 29 CFR 1910.132-138',
      category: 'OSHA',
      content: [
        'Hazard assessment required before PPE selection',
        'Chemical-resistant gloves based on permeation data',
        'Eye and face protection for chemical splash hazards',
        'Respiratory protection program for airborne chemicals',
        'Chemical-resistant clothing and aprons',
        'Emergency eyewash and shower station requirements',
        'PPE inspection before each use',
        'Training on proper PPE use and limitations',
        'PPE maintenance and replacement procedures',
        'Decontamination procedures for reusable PPE',
        'Medical surveillance for employees using respirators',
        'Documentation of PPE training and fit testing'
      ]
    },
    {
      title: 'Chemical Spill Response Procedures',
      description: 'Emergency response to chemical spills and releases',
      icon: 'water-outline',
      source: 'EPA / OSHA Emergency Response',
      category: 'General',
      content: [
        'Immediate response: secure area and evacuate personnel',
        'Spill assessment and hazard identification',
        'Personal protective equipment for response personnel',
        'Spill containment using appropriate materials',
        'Neutralization procedures for specific chemicals',
        'Cleanup and decontamination procedures',
        'Waste disposal requirements for contaminated materials',
        'Notification requirements for regulatory agencies',
        'Documentation and incident reporting procedures',
        'Post-incident analysis and corrective actions',
        'Training requirements for spill response team',
        'Emergency equipment inspection and maintenance'
      ]
    },
    {
      title: 'Respiratory Protection Program',
      description: 'Protection against airborne chemical hazards',
      icon: 'fitness-outline',
      source: 'OSHA 29 CFR 1910.134',
      category: 'OSHA',
      content: [
        'Written respiratory protection program required',
        'Medical evaluation before respirator use',
        'Fit testing for tight-fitting respirators annually',
        'Training on respirator use and limitations',
        'Respirator selection based on hazard assessment',
        'Maintenance and storage of respiratory equipment',
        'Air quality requirements for supplied-air respirators',
        'Emergency procedures and equipment',
        'Program evaluation and effectiveness assessment',
        'Record keeping for medical evaluations and fit testing',
        'Voluntary use provisions for filtering facepieces',
        'Special requirements for IDLH atmospheres'
      ]
    },
    {
      title: 'Chemical Waste Management',
      description: 'Proper disposal and treatment of chemical wastes',
      icon: 'trash-outline',
      source: 'EPA RCRA / DOT Hazmat Regulations',
      category: 'EPA',
      content: [
        'Hazardous waste determination and classification',
        'Waste minimization and source reduction programs',
        'Proper labeling and dating of waste containers',
        'Waste accumulation time limits and storage requirements',
        'Manifest system for hazardous waste shipments',
        'Treatment, storage, and disposal facility selection',
        'Employee training on waste management procedures',
        'Emergency procedures for waste-related incidents',
        'Record keeping and reporting requirements',
        'Inspection requirements for waste storage areas',
        'Compatibility requirements for mixed wastes',
        'Transportation requirements for hazardous waste'
      ]
    },
    {
      title: 'Laboratory Chemical Safety',
      description: 'Chemical hygiene and safety in laboratory settings',
      icon: 'beaker-outline',
      source: 'OSHA 29 CFR 1910.1450',
      category: 'OSHA',
      content: [
        'Chemical Hygiene Plan required for laboratories',
        'Designated Chemical Hygiene Officer responsibilities',
        'Fume hood performance standards and testing',
        'Laboratory ventilation requirements and monitoring',
        'Chemical storage in laboratories and compatibility',
        'Personal protective equipment for laboratory work',
        'Training requirements for laboratory personnel',
        'Medical surveillance for high-risk exposures',
        'Emergency procedures and equipment in laboratories',
        'Waste disposal procedures for laboratory chemicals',
        'Record keeping for chemical inventories and exposures',
        'Special precautions for particularly hazardous substances'
      ]
    },
    {
      title: 'Chemical Transportation Safety',
      description: 'Safe transportation of hazardous chemicals',
      icon: 'car-outline',
      source: 'DOT 49 CFR Parts 100-185',
      category: 'General',
      content: [
        'Proper shipping names and hazard class identification',
        'Packaging requirements for different hazard classes',
        'Marking and labeling requirements for packages',
        'Placarding requirements for transport vehicles',
        'Driver training and certification requirements',
        'Vehicle inspection and maintenance procedures',
        'Emergency response information and procedures',
        'Segregation requirements for incompatible materials',
        'Loading and unloading safety procedures',
        'Route planning and security requirements',
        'Incident reporting and emergency response',
        'Documentation and shipping paper requirements'
      ]
    }
  ];

  const categories = [t('all'), 'OSHA', 'EPA', 'Saudi Aramco', 'NFPA', t('all')];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === t('all') || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: ChemicalSafetyResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening chemical safety resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'OSHA': return '#FF6B35';
      case 'EPA': return '#4CAF50';
      case 'Saudi Aramco': return '#00A651';
      case 'NFPA': return '#FF4444';
      default: return '#9C27B0';
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
          {t('chemical.safety')}
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
          Chemical safety standards from OSHA, EPA, and industry organizations
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
                    ? { backgroundColor: '#9C27B0', borderColor: '#9C27B0' }
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
            backgroundColor: '#9C27B0', 
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
              name="flask-outline" 
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
