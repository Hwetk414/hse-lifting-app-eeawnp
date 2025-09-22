
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const equipment: Equipment[] = [
    {
      id: '1',
      name: 'Mobile Crane MC-100',
      type: 'mobile',
      capacity: 100,
      maxRadius: 50,
      maxHeight: 80,
      specifications: {
        manufacturer: 'CraneWorks',
        model: 'MC-100T',
        year: 2020,
        serialNumber: 'CW-2020-001',
        certificationDate: '2024-01-15',
      },
      loadChart: [
        { radius: 5, capacity: 100 },
        { radius: 10, capacity: 85 },
        { radius: 15, capacity: 70 },
        { radius: 20, capacity: 55 },
        { radius: 25, capacity: 40 },
        { radius: 30, capacity: 30 },
        { radius: 35, capacity: 22 },
        { radius: 40, capacity: 15 },
        { radius: 45, capacity: 10 },
        { radius: 50, capacity: 8 },
      ],
    },
    {
      id: '2',
      name: 'Tower Crane TC-200',
      type: 'tower',
      capacity: 200,
      maxRadius: 60,
      maxHeight: 120,
      specifications: {
        manufacturer: 'TowerLift',
        model: 'TC-200H',
        year: 2019,
        serialNumber: 'TL-2019-005',
        certificationDate: '2024-02-20',
      },
      loadChart: [
        { radius: 10, capacity: 200 },
        { radius: 15, capacity: 180 },
        { radius: 20, capacity: 160 },
        { radius: 25, capacity: 140 },
        { radius: 30, capacity: 120 },
        { radius: 35, capacity: 100 },
        { radius: 40, capacity: 80 },
        { radius: 45, capacity: 60 },
        { radius: 50, capacity: 40 },
        { radius: 55, capacity: 25 },
        { radius: 60, capacity: 15 },
      ],
    },
    {
      id: '3',
      name: 'Crawler Crane CC-300',
      type: 'crawler',
      capacity: 300,
      maxRadius: 70,
      maxHeight: 100,
      specifications: {
        manufacturer: 'HeavyLift',
        model: 'CC-300X',
        year: 2021,
        serialNumber: 'HL-2021-012',
        certificationDate: '2024-03-10',
      },
      loadChart: [
        { radius: 5, capacity: 300 },
        { radius: 10, capacity: 280 },
        { radius: 15, capacity: 250 },
        { radius: 20, capacity: 220 },
        { radius: 25, capacity: 190 },
        { radius: 30, capacity: 160 },
        { radius: 35, capacity: 130 },
        { radius: 40, capacity: 100 },
        { radius: 45, capacity: 80 },
        { radius: 50, capacity: 60 },
        { radius: 55, capacity: 45 },
        { radius: 60, capacity: 30 },
        { radius: 65, capacity: 20 },
        { radius: 70, capacity: 12 },
      ],
    },
  ];

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.specifications.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEquipmentDetails = (item: Equipment) => {
    setSelectedEquipment(item);
    setIsBottomSheetVisible(true);
    console.log('Opening equipment details:', item.name);
  };

  const navigateToAddEquipment = () => {
    router.push('/add-equipment');
    console.log('Navigating to add equipment screen');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return 'car-outline';
      case 'tower':
        return 'business-outline';
      case 'crawler':
        return 'hardware-chip-outline';
      case 'overhead':
        return 'layers-outline';
      default:
        return 'construct-outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mobile':
        return colors.primary;
      case 'tower':
        return colors.secondary;
      case 'crawler':
        return colors.accent;
      case 'overhead':
        return colors.warning;
      default:
        return colors.textLight;
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          Equipment Database
        </Text>
        <TouchableOpacity onPress={navigateToAddEquipment}>
          <Icon name="add-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Search Equipment</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[commonStyles.input, { paddingLeft: 40 }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search by name, type, or manufacturer"
              placeholderTextColor={colors.textLight}
            />
            <Icon 
              name="search-outline" 
              size={20} 
              color={colors.textLight} 
              style={{ position: 'absolute', left: 12, top: 12 }}
            />
          </View>
        </View>

        <View style={commonStyles.section}>
          <View style={[commonStyles.row, { alignItems: 'center', marginBottom: 16 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
              Available Equipment ({filteredEquipment.length})
            </Text>
            <TouchableOpacity
              style={[buttonStyles.primary, { paddingHorizontal: 16, paddingVertical: 8 }]}
              onPress={navigateToAddEquipment}
              activeOpacity={0.7}
            >
              <View style={[commonStyles.row, { alignItems: 'center' }]}>
                <Icon name="add-outline" size={16} color={colors.background} style={{ marginRight: 4 }} />
                <Text style={[buttonStyles.primaryText, { fontSize: 14 }]}>Add Equipment</Text>
              </View>
            </TouchableOpacity>
          </View>

          {filteredEquipment.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[commonStyles.card, { borderLeftWidth: 4, borderLeftColor: getTypeColor(item.type) }]}
              onPress={() => openEquipmentDetails(item)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon 
                      name={getTypeIcon(item.type) as any} 
                      size={24} 
                      color={getTypeColor(item.type)} 
                      style={{ marginRight: 12 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.subtitle, { marginBottom: 0 }]}>
                        {item.name}
                      </Text>
                      <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                        {item.specifications.manufacturer} • {item.type.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[commonStyles.row, { marginTop: 8 }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Capacity</Text>
                      <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                        {item.capacity}t
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Max Radius</Text>
                      <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                        {item.maxRadius}m
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Max Height</Text>
                      <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                        {item.maxHeight}m
                      </Text>
                    </View>
                  </View>
                </View>
                <Icon name="chevron-forward-outline" size={20} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredEquipment.length === 0 && (
          <View style={[commonStyles.card, commonStyles.center, { padding: 40 }]}>
            <Icon name="search-outline" size={48} color={colors.textLight} style={{ marginBottom: 16 }} />
            <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 16 }]}>
              No equipment found matching your search criteria
            </Text>
            <TouchableOpacity
              style={[buttonStyles.primary, { paddingHorizontal: 20, paddingVertical: 10 }]}
              onPress={navigateToAddEquipment}
              activeOpacity={0.7}
            >
              <View style={[commonStyles.row, { alignItems: 'center' }]}>
                <Icon name="add-outline" size={16} color={colors.background} style={{ marginRight: 6 }} />
                <Text style={[buttonStyles.primaryText, { fontSize: 14 }]}>Add New Equipment</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        {selectedEquipment && (
          <View style={{ padding: 20 }}>
            <View style={[commonStyles.row, { marginBottom: 20 }]}>
              <Icon 
                name={getTypeIcon(selectedEquipment.type) as any} 
                size={32} 
                color={getTypeColor(selectedEquipment.type)} 
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.title, { marginBottom: 4, fontSize: 24 }]}>
                  {selectedEquipment.name}
                </Text>
                <Text style={[commonStyles.textLight, { fontSize: 14 }]}>
                  {selectedEquipment.specifications.manufacturer} • {selectedEquipment.type.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
              <View style={[commonStyles.card, { marginBottom: 16 }]}>
                <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>
                  Specifications
                </Text>
                <View style={[commonStyles.row, { marginBottom: 8 }]}>
                  <Text style={[commonStyles.text, { flex: 1 }]}>Model:</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {selectedEquipment.specifications.model}
                  </Text>
                </View>
                <View style={[commonStyles.row, { marginBottom: 8 }]}>
                  <Text style={[commonStyles.text, { flex: 1 }]}>Year:</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {selectedEquipment.specifications.year}
                  </Text>
                </View>
                <View style={[commonStyles.row, { marginBottom: 8 }]}>
                  <Text style={[commonStyles.text, { flex: 1 }]}>Serial Number:</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {selectedEquipment.specifications.serialNumber}
                  </Text>
                </View>
                <View style={[commonStyles.row]}>
                  <Text style={[commonStyles.text, { flex: 1 }]}>Last Certification:</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {selectedEquipment.specifications.certificationDate}
                  </Text>
                </View>
              </View>

              <View style={[commonStyles.card]}>
                <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>
                  Load Chart
                </Text>
                <View style={[commonStyles.row, { marginBottom: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                  <Text style={[commonStyles.text, { flex: 1, fontWeight: '600' }]}>
                    Radius (m)
                  </Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    Capacity (t)
                  </Text>
                </View>
                {selectedEquipment.loadChart.map((point, index) => (
                  <View key={index} style={[commonStyles.row, { marginBottom: 4 }]}>
                    <Text style={[commonStyles.text, { flex: 1 }]}>
                      {point.radius}
                    </Text>
                    <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                      {point.capacity}
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
