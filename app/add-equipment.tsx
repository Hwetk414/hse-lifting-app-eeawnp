
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

interface LoadChartPoint {
  radius: number;
  capacity: number;
}

interface EquipmentFormData {
  name: string;
  type: 'mobile' | 'tower' | 'crawler' | 'overhead';
  capacity: string;
  maxRadius: string;
  maxHeight: string;
  manufacturer: string;
  model: string;
  year: string;
  serialNumber: string;
  certificationDate: string;
}

export default function AddEquipmentScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<EquipmentFormData>({
    name: '',
    type: 'mobile',
    capacity: '',
    maxRadius: '',
    maxHeight: '',
    manufacturer: '',
    model: '',
    year: '',
    serialNumber: '',
    certificationDate: '',
  });

  const [loadChart, setLoadChart] = useState<LoadChartPoint[]>([
    { radius: 0, capacity: 0 }
  ]);

  const [showLoadChart, setShowLoadChart] = useState(false);

  const updateFormData = (field: keyof EquipmentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log(`Updated ${field}:`, value);
  };

  const addLoadChartPoint = () => {
    setLoadChart(prev => [...prev, { radius: 0, capacity: 0 }]);
    console.log('Added new load chart point');
  };

  const removeLoadChartPoint = (index: number) => {
    if (loadChart.length > 1) {
      setLoadChart(prev => prev.filter((_, i) => i !== index));
      console.log('Removed load chart point at index:', index);
    }
  };

  const updateLoadChartPoint = (index: number, field: 'radius' | 'capacity', value: string) => {
    const numValue = parseFloat(value) || 0;
    setLoadChart(prev => prev.map((point, i) => 
      i === index ? { ...point, [field]: numValue } : point
    ));
    console.log(`Updated load chart point ${index} ${field}:`, numValue);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Equipment name is required');
      return false;
    }
    if (!formData.capacity || parseFloat(formData.capacity) <= 0) {
      Alert.alert('Validation Error', 'Valid capacity is required');
      return false;
    }
    if (!formData.maxRadius || parseFloat(formData.maxRadius) <= 0) {
      Alert.alert('Validation Error', 'Valid max radius is required');
      return false;
    }
    if (!formData.maxHeight || parseFloat(formData.maxHeight) <= 0) {
      Alert.alert('Validation Error', 'Valid max height is required');
      return false;
    }
    if (!formData.manufacturer.trim()) {
      Alert.alert('Validation Error', 'Manufacturer is required');
      return false;
    }
    if (!formData.model.trim()) {
      Alert.alert('Validation Error', 'Model is required');
      return false;
    }
    if (!formData.year || parseInt(formData.year) < 1900 || parseInt(formData.year) > new Date().getFullYear()) {
      Alert.alert('Validation Error', 'Valid year is required');
      return false;
    }
    if (!formData.serialNumber.trim()) {
      Alert.alert('Validation Error', 'Serial number is required');
      return false;
    }
    if (!formData.certificationDate.trim()) {
      Alert.alert('Validation Error', 'Certification date is required');
      return false;
    }
    return true;
  };

  const saveEquipment = () => {
    console.log('Attempting to save equipment...');
    
    if (!validateForm()) {
      return;
    }

    // Create the equipment object
    const newEquipment = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      type: formData.type,
      capacity: parseFloat(formData.capacity),
      maxRadius: parseFloat(formData.maxRadius),
      maxHeight: parseFloat(formData.maxHeight),
      specifications: {
        manufacturer: formData.manufacturer.trim(),
        model: formData.model.trim(),
        year: parseInt(formData.year),
        serialNumber: formData.serialNumber.trim(),
        certificationDate: formData.certificationDate.trim(),
      },
      loadChart: loadChart.filter(point => point.radius > 0 && point.capacity > 0)
    };

    console.log('New equipment created:', newEquipment);

    // For now, we'll just show a success message
    // In a real app, this would be saved to a database or state management system
    Alert.alert(
      'Success',
      'Equipment has been added successfully!',
      [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]
    );
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'mobile',
      capacity: '',
      maxRadius: '',
      maxHeight: '',
      manufacturer: '',
      model: '',
      year: '',
      serialNumber: '',
      certificationDate: '',
    });
    setLoadChart([{ radius: 0, capacity: 0 }]);
    setShowLoadChart(false);
    console.log('Form reset');
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
          Add New Equipment
        </Text>
        <TouchableOpacity onPress={resetForm}>
          <Icon name="refresh-outline" size={24} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Basic Information
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={commonStyles.label}>Equipment Name *</Text>
            <TextInput
              style={commonStyles.input}
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              placeholder="Enter equipment name"
              placeholderTextColor={colors.textLight}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={commonStyles.label}>Equipment Type *</Text>
            <View style={[commonStyles.row, { flexWrap: 'wrap', gap: 8 }]}>
              {(['mobile', 'tower', 'crawler', 'overhead'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    commonStyles.card,
                    {
                      flex: 0,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      backgroundColor: formData.type === type ? getTypeColor(type) : colors.surface,
                      borderWidth: 1,
                      borderColor: formData.type === type ? getTypeColor(type) : colors.border,
                    }
                  ]}
                  onPress={() => updateFormData('type', type)}
                  activeOpacity={0.7}
                >
                  <View style={[commonStyles.row, { alignItems: 'center' }]}>
                    <Icon 
                      name={getTypeIcon(type) as any} 
                      size={20} 
                      color={formData.type === type ? colors.background : getTypeColor(type)} 
                      style={{ marginRight: 8 }}
                    />
                    <Text style={[
                      commonStyles.text,
                      {
                        color: formData.type === type ? colors.background : colors.text,
                        fontWeight: formData.type === type ? '600' : '400',
                        textTransform: 'capitalize'
                      }
                    ]}>
                      {type}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[commonStyles.row, { gap: 12, marginBottom: 16 }]}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.label}>Capacity (tons) *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.capacity}
                onChangeText={(value) => updateFormData('capacity', value)}
                placeholder="0"
                placeholderTextColor={colors.textLight}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.label}>Max Radius (m) *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.maxRadius}
                onChangeText={(value) => updateFormData('maxRadius', value)}
                placeholder="0"
                placeholderTextColor={colors.textLight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={commonStyles.label}>Max Height (m) *</Text>
            <TextInput
              style={commonStyles.input}
              value={formData.maxHeight}
              onChangeText={(value) => updateFormData('maxHeight', value)}
              placeholder="0"
              placeholderTextColor={colors.textLight}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Specifications
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={commonStyles.label}>Manufacturer *</Text>
            <TextInput
              style={commonStyles.input}
              value={formData.manufacturer}
              onChangeText={(value) => updateFormData('manufacturer', value)}
              placeholder="Enter manufacturer name"
              placeholderTextColor={colors.textLight}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={commonStyles.label}>Model *</Text>
            <TextInput
              style={commonStyles.input}
              value={formData.model}
              onChangeText={(value) => updateFormData('model', value)}
              placeholder="Enter model number"
              placeholderTextColor={colors.textLight}
            />
          </View>

          <View style={[commonStyles.row, { gap: 12, marginBottom: 16 }]}>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.label}>Year *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.year}
                onChangeText={(value) => updateFormData('year', value)}
                placeholder="2024"
                placeholderTextColor={colors.textLight}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.label}>Serial Number *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.serialNumber}
                onChangeText={(value) => updateFormData('serialNumber', value)}
                placeholder="Enter serial number"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={commonStyles.label}>Certification Date *</Text>
            <TextInput
              style={commonStyles.input}
              value={formData.certificationDate}
              onChangeText={(value) => updateFormData('certificationDate', value)}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textLight}
            />
          </View>
        </View>

        <View style={commonStyles.section}>
          <TouchableOpacity
            style={[commonStyles.row, { alignItems: 'center', marginBottom: 16 }]}
            onPress={() => setShowLoadChart(!showLoadChart)}
            activeOpacity={0.7}
          >
            <Text style={[commonStyles.subtitle, { flex: 1, marginBottom: 0 }]}>
              Load Chart (Optional)
            </Text>
            <Icon 
              name={showLoadChart ? "chevron-up-outline" : "chevron-down-outline"} 
              size={24} 
              color={colors.textLight} 
            />
          </TouchableOpacity>

          {showLoadChart && (
            <View>
              <View style={[commonStyles.row, { marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
                <Text style={[commonStyles.text, { flex: 1, fontWeight: '600' }]}>
                  Radius (m)
                </Text>
                <Text style={[commonStyles.text, { flex: 1, fontWeight: '600' }]}>
                  Capacity (t)
                </Text>
                <View style={{ width: 40 }} />
              </View>

              {loadChart.map((point, index) => (
                <View key={index} style={[commonStyles.row, { marginBottom: 8, alignItems: 'center' }]}>
                  <TextInput
                    style={[commonStyles.input, { flex: 1, marginRight: 8, marginBottom: 0 }]}
                    value={point.radius.toString()}
                    onChangeText={(value) => updateLoadChartPoint(index, 'radius', value)}
                    placeholder="0"
                    placeholderTextColor={colors.textLight}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[commonStyles.input, { flex: 1, marginRight: 8, marginBottom: 0 }]}
                    value={point.capacity.toString()}
                    onChangeText={(value) => updateLoadChartPoint(index, 'capacity', value)}
                    placeholder="0"
                    placeholderTextColor={colors.textLight}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    onPress={() => removeLoadChartPoint(index)}
                    style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
                    disabled={loadChart.length === 1}
                  >
                    <Icon 
                      name="trash-outline" 
                      size={20} 
                      color={loadChart.length === 1 ? colors.textLight : colors.error} 
                    />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity
                style={[commonStyles.card, { backgroundColor: colors.surface, borderStyle: 'dashed', borderWidth: 2, borderColor: colors.border }]}
                onPress={addLoadChartPoint}
                activeOpacity={0.7}
              >
                <View style={[commonStyles.row, commonStyles.center, { padding: 8 }]}>
                  <Icon name="add-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                  <Text style={[commonStyles.text, { color: colors.primary }]}>
                    Add Load Chart Point
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={[commonStyles.section, { paddingBottom: 40 }]}>
          <View style={[commonStyles.row, { gap: 12 }]}>
            <TouchableOpacity
              style={[buttonStyles.secondary, { flex: 1 }]}
              onPress={resetForm}
              activeOpacity={0.7}
            >
              <Text style={buttonStyles.secondaryText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttonStyles.primary, { flex: 1 }]}
              onPress={saveEquipment}
              activeOpacity={0.7}
            >
              <Text style={buttonStyles.primaryText}>Save Equipment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
