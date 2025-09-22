
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

interface LiftingCalculation {
  loadWeight: number;
  liftingCapacity: number;
  safetyFactor: number;
  isWithinLimits: boolean;
  recommendedCapacity: number;
}

export default function LiftingCalculatorScreen() {
  const router = useRouter();
  const [loadWeight, setLoadWeight] = useState('');
  const [craneCapacity, setCraneCapacity] = useState('');
  const [liftHeight, setLiftHeight] = useState('');
  const [liftRadius, setLiftRadius] = useState('');
  const [calculation, setCalculation] = useState<LiftingCalculation | null>(null);

  const calculateLifting = () => {
    const weight = parseFloat(loadWeight);
    const capacity = parseFloat(craneCapacity);
    const height = parseFloat(liftHeight);
    const radius = parseFloat(liftRadius);

    if (!weight || !capacity || !height || !radius) {
      Alert.alert('Error', 'Please fill in all fields with valid numbers');
      return;
    }

    // Apply derating factors based on height and radius
    let deratingFactor = 1.0;
    
    // Height derating (simplified)
    if (height > 30) deratingFactor *= 0.95;
    if (height > 50) deratingFactor *= 0.90;
    
    // Radius derating (simplified)
    if (radius > 20) deratingFactor *= 0.90;
    if (radius > 40) deratingFactor *= 0.85;

    const effectiveCapacity = capacity * deratingFactor;
    const safetyFactor = effectiveCapacity / weight;
    const recommendedCapacity = weight * 1.25; // 25% safety margin
    const isWithinLimits = safetyFactor >= 1.25; // Minimum 25% safety margin

    setCalculation({
      loadWeight: weight,
      liftingCapacity: effectiveCapacity,
      safetyFactor,
      isWithinLimits,
      recommendedCapacity,
    });

    console.log('Lifting calculation completed:', {
      weight,
      capacity,
      effectiveCapacity,
      safetyFactor,
      isWithinLimits,
    });
  };

  const resetCalculation = () => {
    setLoadWeight('');
    setCraneCapacity('');
    setLiftHeight('');
    setLiftRadius('');
    setCalculation(null);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          Lifting Plan Calculator
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Load Weight (tonnes)</Text>
          <TextInput
            style={commonStyles.input}
            value={loadWeight}
            onChangeText={setLoadWeight}
            placeholder="Enter load weight"
            keyboardType="numeric"
            placeholderTextColor={colors.textLight}
          />
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Crane Capacity (tonnes)</Text>
          <TextInput
            style={commonStyles.input}
            value={craneCapacity}
            onChangeText={setCraneCapacity}
            placeholder="Enter crane capacity"
            keyboardType="numeric"
            placeholderTextColor={colors.textLight}
          />
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Lift Height (meters)</Text>
          <TextInput
            style={commonStyles.input}
            value={liftHeight}
            onChangeText={setLiftHeight}
            placeholder="Enter lift height"
            keyboardType="numeric"
            placeholderTextColor={colors.textLight}
          />
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Lift Radius (meters)</Text>
          <TextInput
            style={commonStyles.input}
            value={liftRadius}
            onChangeText={setLiftRadius}
            placeholder="Enter lift radius"
            keyboardType="numeric"
            placeholderTextColor={colors.textLight}
          />
        </View>

        <View style={[commonStyles.row, { marginBottom: 24 }]}>
          <TouchableOpacity
            style={[buttonStyles.primary, { flex: 1, marginRight: 8 }]}
            onPress={calculateLifting}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              Calculate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[buttonStyles.outline, { flex: 1, marginLeft: 8 }]}
            onPress={resetCalculation}
          >
            <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        {calculation && (
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
              Calculation Results
            </Text>

            <View style={[commonStyles.card, { 
              borderLeftWidth: 4, 
              borderLeftColor: calculation.isWithinLimits ? colors.accent : colors.danger 
            }]}>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon 
                  name={calculation.isWithinLimits ? "checkmark-circle-outline" : "warning-outline"} 
                  size={24} 
                  color={calculation.isWithinLimits ? colors.accent : colors.danger}
                />
                <Text style={[commonStyles.subtitle, { 
                  marginBottom: 0, 
                  marginLeft: 12,
                  color: calculation.isWithinLimits ? colors.accent : colors.danger 
                }]}>
                  {calculation.isWithinLimits ? 'SAFE TO LIFT' : 'UNSAFE - DO NOT LIFT'}
                </Text>
              </View>

              <View style={{ marginBottom: 8 }}>
                <Text style={commonStyles.text}>
                  Safety Factor: <Text style={{ fontWeight: '600' }}>
                    {calculation.safetyFactor.toFixed(2)}
                  </Text>
                </Text>
              </View>

              <View style={{ marginBottom: 8 }}>
                <Text style={commonStyles.text}>
                  Effective Capacity: <Text style={{ fontWeight: '600' }}>
                    {calculation.liftingCapacity.toFixed(2)} tonnes
                  </Text>
                </Text>
              </View>

              <View style={{ marginBottom: 8 }}>
                <Text style={commonStyles.text}>
                  Recommended Min. Capacity: <Text style={{ fontWeight: '600' }}>
                    {calculation.recommendedCapacity.toFixed(2)} tonnes
                  </Text>
                </Text>
              </View>

              {!calculation.isWithinLimits && (
                <View style={{ 
                  backgroundColor: colors.danger, 
                  padding: 12, 
                  borderRadius: 8, 
                  marginTop: 12 
                }}>
                  <Text style={{ color: 'white', fontWeight: '600' }}>
                    ⚠️ Warning: Safety factor below minimum requirement (1.25)
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: colors.secondary, marginTop: 20 }]}>
          <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 8 }]}>
            Safety Guidelines
          </Text>
          <Text style={[commonStyles.textLight, { color: 'white', opacity: 0.9 }]}>
            • Minimum safety factor: 1.25{'\n'}
            • Always verify crane load charts{'\n'}
            • Consider environmental conditions{'\n'}
            • Conduct pre-lift meetings
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
