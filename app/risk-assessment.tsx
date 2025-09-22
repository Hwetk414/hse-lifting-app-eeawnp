
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';

interface RiskFactor {
  id: string;
  category: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  selected: boolean;
}

interface RiskAssessment {
  totalScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

export default function RiskAssessmentScreen() {
  const router = useRouter();
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([
    {
      id: '1',
      category: 'Weather',
      description: 'High winds (>20 mph)',
      riskLevel: 'high',
      selected: false,
    },
    {
      id: '2',
      category: 'Weather',
      description: 'Poor visibility',
      riskLevel: 'medium',
      selected: false,
    },
    {
      id: '3',
      category: 'Load',
      description: 'Load >75% of crane capacity',
      riskLevel: 'high',
      selected: false,
    },
    {
      id: '4',
      category: 'Load',
      description: 'Awkward or unbalanced load',
      riskLevel: 'medium',
      selected: false,
    },
    {
      id: '5',
      category: 'Environment',
      description: 'Overhead power lines nearby',
      riskLevel: 'high',
      selected: false,
    },
    {
      id: '6',
      category: 'Environment',
      description: 'Congested work area',
      riskLevel: 'medium',
      selected: false,
    },
    {
      id: '7',
      category: 'Personnel',
      description: 'Inexperienced operator',
      riskLevel: 'high',
      selected: false,
    },
    {
      id: '8',
      category: 'Personnel',
      description: 'Multiple personnel in lift zone',
      riskLevel: 'medium',
      selected: false,
    },
    {
      id: '9',
      category: 'Equipment',
      description: 'Complex rigging required',
      riskLevel: 'medium',
      selected: false,
    },
    {
      id: '10',
      category: 'Equipment',
      description: 'Equipment near capacity limits',
      riskLevel: 'high',
      selected: false,
    },
  ]);

  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

  const toggleRiskFactor = (id: string) => {
    setRiskFactors(prev => 
      prev.map(factor => 
        factor.id === id ? { ...factor, selected: !factor.selected } : factor
      )
    );
    console.log('Toggled risk factor:', id);
  };

  const calculateRisk = () => {
    const selectedFactors = riskFactors.filter(factor => factor.selected);
    
    if (selectedFactors.length === 0) {
      Alert.alert('No Risk Factors', 'Please select at least one risk factor to assess.');
      return;
    }

    let totalScore = 0;
    selectedFactors.forEach(factor => {
      switch (factor.riskLevel) {
        case 'low':
          totalScore += 1;
          break;
        case 'medium':
          totalScore += 3;
          break;
        case 'high':
          totalScore += 5;
          break;
      }
    });

    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    let recommendations: string[] = [];

    if (totalScore <= 3) {
      riskLevel = 'low';
      recommendations = [
        'Proceed with standard safety procedures',
        'Conduct routine pre-lift briefing',
        'Monitor conditions throughout lift'
      ];
    } else if (totalScore <= 8) {
      riskLevel = 'medium';
      recommendations = [
        'Enhanced safety briefing required',
        'Additional supervision recommended',
        'Review lift plan with all personnel',
        'Consider additional safety measures'
      ];
    } else if (totalScore <= 15) {
      riskLevel = 'high';
      recommendations = [
        'Detailed lift plan review required',
        'Senior supervision mandatory',
        'Consider alternative lifting methods',
        'Additional safety equipment required',
        'Extended pre-lift briefing'
      ];
    } else {
      riskLevel = 'critical';
      recommendations = [
        'STOP - Do not proceed with lift',
        'Senior management approval required',
        'Comprehensive risk mitigation plan needed',
        'Consider postponing until conditions improve',
        'Alternative methods must be evaluated'
      ];
    }

    setAssessment({
      totalScore,
      riskLevel,
      recommendations,
    });

    console.log('Risk assessment completed:', {
      totalScore,
      riskLevel,
      selectedFactors: selectedFactors.length,
    });
  };

  const resetAssessment = () => {
    setRiskFactors(prev => prev.map(factor => ({ ...factor, selected: false })));
    setAssessment(null);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return colors.accent;
      case 'medium':
        return colors.warning;
      case 'high':
        return colors.danger;
      case 'critical':
        return '#7C2D12';
      default:
        return colors.textLight;
    }
  };

  const getRiskLevelColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return colors.accent;
      case 'medium':
        return colors.warning;
      case 'high':
        return colors.danger;
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
          Risk Assessment
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 24, fontSize: 16 }]}>
          Select all applicable risk factors for your lifting operation
        </Text>

        <View style={commonStyles.section}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Risk Factors
          </Text>

          {riskFactors.map((factor) => (
            <TouchableOpacity
              key={factor.id}
              style={[
                commonStyles.card,
                {
                  borderWidth: 2,
                  borderColor: factor.selected ? getRiskLevelColor(factor.riskLevel) : colors.border,
                  backgroundColor: factor.selected ? `${getRiskLevelColor(factor.riskLevel)}10` : colors.card,
                }
              ]}
              onPress={() => toggleRiskFactor(factor.id)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.row, { marginBottom: 4 }]}>
                    <Text style={[commonStyles.text, { fontWeight: '600', color: colors.textLight, fontSize: 12 }]}>
                      {factor.category.toUpperCase()}
                    </Text>
                    <View style={{
                      backgroundColor: getRiskLevelColor(factor.riskLevel),
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                      marginLeft: 8,
                    }}>
                      <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                        {factor.riskLevel.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={commonStyles.text}>
                    {factor.description}
                  </Text>
                </View>
                <Icon 
                  name={factor.selected ? "checkmark-circle" : "ellipse-outline"} 
                  size={24} 
                  color={factor.selected ? getRiskLevelColor(factor.riskLevel) : colors.textLight}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[commonStyles.row, { marginBottom: 24 }]}>
          <TouchableOpacity
            style={[buttonStyles.primary, { flex: 1, marginRight: 8 }]}
            onPress={calculateRisk}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              Assess Risk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[buttonStyles.outline, { flex: 1, marginLeft: 8 }]}
            onPress={resetAssessment}
          >
            <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        {assessment && (
          <View style={commonStyles.section}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
              Risk Assessment Results
            </Text>

            <View style={[commonStyles.card, { 
              borderLeftWidth: 4, 
              borderLeftColor: getRiskColor(assessment.riskLevel),
              backgroundColor: `${getRiskColor(assessment.riskLevel)}10`
            }]}>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon 
                  name={assessment.riskLevel === 'critical' ? "stop-circle-outline" : 
                        assessment.riskLevel === 'high' ? "warning-outline" :
                        assessment.riskLevel === 'medium' ? "alert-circle-outline" : "checkmark-circle-outline"} 
                  size={28} 
                  color={getRiskColor(assessment.riskLevel)}
                />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={[commonStyles.subtitle, { 
                    marginBottom: 4, 
                    color: getRiskColor(assessment.riskLevel),
                    fontSize: 20
                  }]}>
                    {assessment.riskLevel.toUpperCase()} RISK
                  </Text>
                  <Text style={commonStyles.text}>
                    Risk Score: {assessment.totalScore}
                  </Text>
                </View>
              </View>

              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
                Recommendations:
              </Text>

              {assessment.recommendations.map((recommendation, index) => (
                <View key={index} style={[commonStyles.row, { marginBottom: 8, alignItems: 'flex-start' }]}>
                  <Text style={[commonStyles.text, { color: getRiskColor(assessment.riskLevel), marginRight: 8, fontWeight: '600' }]}>
                    •
                  </Text>
                  <Text style={[commonStyles.text, { flex: 1 }]}>
                    {recommendation}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
