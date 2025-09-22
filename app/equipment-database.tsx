
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface Equipment {
  id: string;
  name: string;
  type: 'mobile' | 'tower' | 'crawler' | 'overhead';
  capacity: number;
  maxRadius: number;
  maxHeight: number;
  specifications: {
    manufacturer: string;
    model: string;
    year: number;
    serialNumber: string;
    certificationDate: string;
  };
  loadChart: {
    radius: number;
    capacity: number;
  }[];
}

export default function EquipmentDatabaseScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Sample equipment data
  const equipment: Equipment[] = [
    {
      id: '1',
      name: 'Liebherr LTM 1200-5.1',
      type: 'mobile',
      capacity: 200,
      maxRadius: 84,
      maxHeight: 101,
      specifications: {
        manufacturer: 'Liebherr',
        model: 'LTM 1200-5.1',
        year: 2020,
        serialNumber: 'LH2020001',
        certificationDate: '2024-01-15'
      },
      loadChart: [
        { radius: 3, capacity: 200 },
        { radius: 5, capacity: 180 },
        { radius: 10, capacity: 120 },
        { radius: 20, capacity: 60 },
        { radius: 30, capacity: 35 },
        { radius: 50, capacity: 18 },
        { radius: 84, capacity: 8 }
      ]
    },
    {
      id: '2',
      name: 'Grove GMK5250L',
      type: 'mobile',
      capacity: 250,
      maxRadius: 68,
      maxHeight: 80,
      specifications: {
        manufacturer: 'Grove',
        model: 'GMK5250L',
        year: 2019,
        serialNumber: 'GR2019002',
        certificationDate: '2024-02-20'
      },
      loadChart: [
        { radius: 3, capacity: 250 },
        { radius: 5, capacity: 220 },
        { radius: 10, capacity: 150 },
        { radius: 20, capacity: 80 },
        { radius: 30, capacity: 45 },
        { radius: 50, capacity: 22 },
        { radius: 68, capacity: 12 }
      ]
    },
    {
      id: '3',
      name: 'Potain MDT 389',
      type: 'tower',
      capacity: 16,
      maxRadius: 75,
      maxHeight: 80,
      specifications: {
        manufacturer: 'Potain',
        model: 'MDT 389',
        year: 2021,
        serialNumber: 'PT2021003',
        certificationDate: '2024-03-10'
      },
      loadChart: [
        { radius: 10, capacity: 16 },
        { radius: 20, capacity: 12 },
        { radius: 30, capacity: 8 },
        { radius: 40, capacity: 6 },
        { radius: 50, capacity: 4.5 },
        { radius: 60, capacity: 3.5 },
        { radius: 75, capacity: 2.8 }
      ]
    },
    {
      id: '4',
      name: 'Terex Demag CC 2800-1',
      type: 'crawler',
      capacity: 600,
      maxRadius: 144,
      maxHeight: 174,
      specifications: {
        manufacturer: 'Terex Demag',
        model: 'CC 2800-1',
        year: 2018,
        serialNumber: 'TD2018004',
        certificationDate: '2024-01-25'
      },
      loadChart: [
        { radius: 5, capacity: 600 },
        { radius: 10, capacity: 450 },
        { radius: 20, capacity: 280 },
        { radius: 40, capacity: 150 },
        { radius: 60, capacity: 90 },
        { radius: 100, capacity: 45 },
        { radius: 144, capacity: 25 }
      ]
    }
  ];

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.specifications.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.specifications.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(item.type).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEquipmentDetails = (item: Equipment) => {
    setSelectedEquipment(item);
    setIsBottomSheetVisible(true);
    console.log('Opening equipment details:', item.name);
  };

  const navigateToAddEquipment = () => {
    router.push('/add-equipment');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mobile': return 'car-outline';
      case 'tower': return 'business-outline';
      case 'crawler': return 'construct-outline';
      case 'overhead': return 'layers-outline';
      default: return 'construct-outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mobile': return colors.primary;
      case 'tower': return colors.secondary;
      case 'crawler': return colors.accent;
      case 'overhead': return colors.warning;
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
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 }}>
          <Icon name={isRTL ? "arrow-forward-outline" : "arrow-back-outline"} size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1, textAlign: isRTL ? 'right' : 'left' }]}>
          {t('equipment.database')}
        </Text>
        <TouchableOpacity
          onPress={navigateToAddEquipment}
          style={[buttonStyles.primary, { paddingHorizontal: 16, paddingVertical: 8 }]}
        >
          <View style={[commonStyles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Icon 
              name="add-outline" 
              size={20} 
              color="white" 
              style={{ 
                marginRight: isRTL ? 0 : 8,
                marginLeft: isRTL ? 8 : 0
              }} 
            />
            <Text style={{ color: 'white', fontWeight: '600' }}>
              {t('add.equipment')}
            </Text>
          </View>
        </TouchableOpacity>
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
          {t('equipment.database.desc')}
        </Text>

        <View style={commonStyles.section}>
          <Text style={[commonStyles.label, { textAlign: isRTL ? 'right' : 'left' }]}>
            Search Equipment
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
              placeholder="Search by name, manufacturer, or type"
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
            commonStyles.subtitle, 
            { 
              marginBottom: 16,
              textAlign: isRTL ? 'right' : 'left'
            }
          ]}>
            Available Equipment ({filteredEquipment.length})
          </Text>

          {filteredEquipment.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                commonStyles.card,
                { 
                  borderLeftWidth: isRTL ? 0 : 4, 
                  borderRightWidth: isRTL ? 4 : 0,
                  borderLeftColor: isRTL ? 'transparent' : getTypeColor(item.type),
                  borderRightColor: isRTL ? getTypeColor(item.type) : 'transparent'
                }
              ]}
              onPress={() => openEquipmentDetails(item)}
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
                      name={getTypeIcon(item.type) as any} 
                      size={24} 
                      color={getTypeColor(item.type)} 
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
                        {item.name}
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
                            backgroundColor: getTypeColor(item.type),
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 10,
                            marginRight: isRTL ? 0 : 8,
                            marginLeft: isRTL ? 8 : 0
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                            {t(item.type)}
                          </Text>
                        </View>
                        <Text style={[
                          commonStyles.textLight, 
                          { 
                            fontSize: 12,
                            textAlign: isRTL ? 'right' : 'left'
                          }
                        ]}>
                          {item.capacity}t • {item.maxRadius}m • {item.maxHeight}m
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
                    {item.specifications.manufacturer} • {item.specifications.model} • {item.specifications.year}
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

        {filteredEquipment.length === 0 && (
          <View style={[commonStyles.card, commonStyles.center, { padding: 40 }]}>
            <Icon name="construct-outline" size={48} color={colors.textLight} style={{ marginBottom: 16 }} />
            <Text style={[
              commonStyles.text, 
              { 
                textAlign: 'center'
              }
            ]}>
              No equipment found matching your search criteria
            </Text>
          </View>
        )}
      </ScrollView>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        {selectedEquipment && (
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
                name={getTypeIcon(selectedEquipment.type) as any} 
                size={28} 
                color={getTypeColor(selectedEquipment.type)} 
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
                  {selectedEquipment.name}
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
                      backgroundColor: getTypeColor(selectedEquipment.type),
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      marginRight: isRTL ? 0 : 10,
                      marginLeft: isRTL ? 10 : 0
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                      {t(selectedEquipment.type)}
                    </Text>
                  </View>
                  <Text style={[
                    commonStyles.textLight, 
                    { 
                      fontSize: 14,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {selectedEquipment.specifications.manufacturer}
                  </Text>
                </View>
              </View>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              <View style={[commonStyles.card, { backgroundColor: '#f8f9fa', marginBottom: 16 }]}>
                <Text style={[
                  commonStyles.subtitle, 
                  { 
                    marginBottom: 12, 
                    fontSize: 16,
                    textAlign: isRTL ? 'right' : 'left'
                  }
                ]}>
                  Specifications
                </Text>
                <View style={[
                  commonStyles.row, 
                  { 
                    marginBottom: 8,
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <Text style={[
                    commonStyles.label, 
                    { 
                      flex: 1,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {t('capacity')}:
                  </Text>
                  <Text style={[
                    commonStyles.text,
                    { textAlign: isRTL ? 'left' : 'right' }
                  ]}>
                    {selectedEquipment.capacity} tons
                  </Text>
                </View>
                <View style={[
                  commonStyles.row, 
                  { 
                    marginBottom: 8,
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <Text style={[
                    commonStyles.label, 
                    { 
                      flex: 1,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {t('max.radius')}:
                  </Text>
                  <Text style={[
                    commonStyles.text,
                    { textAlign: isRTL ? 'left' : 'right' }
                  ]}>
                    {selectedEquipment.maxRadius} m
                  </Text>
                </View>
                <View style={[
                  commonStyles.row, 
                  { 
                    marginBottom: 8,
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <Text style={[
                    commonStyles.label, 
                    { 
                      flex: 1,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {t('max.height')}:
                  </Text>
                  <Text style={[
                    commonStyles.text,
                    { textAlign: isRTL ? 'left' : 'right' }
                  ]}>
                    {selectedEquipment.maxHeight} m
                  </Text>
                </View>
                <View style={[
                  commonStyles.row, 
                  { 
                    marginBottom: 8,
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <Text style={[
                    commonStyles.label, 
                    { 
                      flex: 1,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {t('model')}:
                  </Text>
                  <Text style={[
                    commonStyles.text,
                    { textAlign: isRTL ? 'left' : 'right' }
                  ]}>
                    {selectedEquipment.specifications.model}
                  </Text>
                </View>
                <View style={[
                  commonStyles.row, 
                  { 
                    marginBottom: 8,
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <Text style={[
                    commonStyles.label, 
                    { 
                      flex: 1,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {t('year')}:
                  </Text>
                  <Text style={[
                    commonStyles.text,
                    { textAlign: isRTL ? 'left' : 'right' }
                  ]}>
                    {selectedEquipment.specifications.year}
                  </Text>
                </View>
                <View style={[
                  commonStyles.row, 
                  { 
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <Text style={[
                    commonStyles.label, 
                    { 
                      flex: 1,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {t('certification.date')}:
                  </Text>
                  <Text style={[
                    commonStyles.text,
                    { textAlign: isRTL ? 'left' : 'right' }
                  ]}>
                    {selectedEquipment.specifications.certificationDate}
                  </Text>
                </View>
              </View>

              <View style={commonStyles.card}>
                <Text style={[
                  commonStyles.subtitle, 
                  { 
                    marginBottom: 12, 
                    fontSize: 16,
                    textAlign: isRTL ? 'right' : 'left'
                  }
                ]}>
                  {t('load.chart')}
                </Text>
                {selectedEquipment.loadChart.map((point, index) => (
                  <View key={index} style={[
                    commonStyles.row, 
                    { 
                      marginBottom: 8,
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }
                  ]}>
                    <Text style={[
                      commonStyles.text, 
                      { 
                        flex: 1,
                        textAlign: isRTL ? 'right' : 'left'
                      }
                    ]}>
                      {point.radius}m
                    </Text>
                    <Text style={[
                      commonStyles.text, 
                      { 
                        fontWeight: '600',
                        textAlign: isRTL ? 'left' : 'right'
                      }
                    ]}>
                      {point.capacity}t
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
