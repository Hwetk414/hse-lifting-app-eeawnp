
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import { useLanguage } from '../contexts/LanguageContext';

interface RiskFactor {
  id: string;
  category: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  selected: boolean;
  weight: number;
}

interface RiskAssessment {
  totalScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  criticalFactors: RiskFactor[];
}

export default function RiskAssessmentScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([
    // Weather Conditions
    {
      id: '1',
      category: t('weather.conditions'),
      description: t('high.winds'),
      riskLevel: 'high',
      selected: false,
      weight: 8,
    },
    {
      id: '2',
      category: t('weather.conditions'),
      description: t('poor.visibility'),
      riskLevel: 'medium',
      selected: false,
      weight: 5,
    },
    {
      id: '3',
      category: t('weather.conditions'),
      description: t('extreme.temperature'),
      riskLevel: 'medium',
      selected: false,
      weight: 4,
    },
    {
      id: '4',
      category: t('weather.conditions'),
      description: t('precipitation'),
      riskLevel: 'high',
      selected: false,
      weight: 7,
    },
    
    // Load Characteristics
    {
      id: '5',
      category: t('load.characteristics'),
      description: t('load.over.75.percent'),
      riskLevel: 'critical',
      selected: false,
      weight: 10,
    },
    {
      id: '6',
      category: t('load.characteristics'),
      description: t('awkward.load'),
      riskLevel: 'high',
      selected: false,
      weight: 7,
    },
    {
      id: '7',
      category: t('load.characteristics'),
      description: t('unknown.weight'),
      riskLevel: 'critical',
      selected: false,
      weight: 9,
    },
    {
      id: '8',
      category: t('load.characteristics'),
      description: t('fragile.load'),
      riskLevel: 'medium',
      selected: false,
      weight: 5,
    },
    
    // Environmental Hazards
    {
      id: '9',
      category: t('environmental.hazards'),
      description: t('overhead.powerlines'),
      riskLevel: 'critical',
      selected: false,
      weight: 10,
    },
    {
      id: '10',
      category: t('environmental.hazards'),
      description: t('congested.area'),
      riskLevel: 'high',
      selected: false,
      weight: 6,
    },
    {
      id: '11',
      category: t('environmental.hazards'),
      description: t('underground.utilities'),
      riskLevel: 'high',
      selected: false,
      weight: 7,
    },
    {
      id: '12',
      category: t('environmental.hazards'),
      description: t('unstable.ground'),
      riskLevel: 'critical',
      selected: false,
      weight: 9,
    },
    
    // Personnel Factors
    {
      id: '13',
      category: t('personnel.factors'),
      description: t('inexperienced.operator'),
      riskLevel: 'critical',
      selected: false,
      weight: 9,
    },
    {
      id: '14',
      category: t('personnel.factors'),
      description: t('multiple.personnel'),
      riskLevel: 'high',
      selected: false,
      weight: 6,
    },
    {
      id: '15',
      category: t('personnel.factors'),
      description: t('communication.issues'),
      riskLevel: 'high',
      selected: false,
      weight: 7,
    },
    {
      id: '16',
      category: t('personnel.factors'),
      description: t('fatigue.stress'),
      riskLevel: 'medium',
      selected: false,
      weight: 5,
    },
    
    // Equipment Conditions
    {
      id: '17',
      category: t('equipment.conditions'),
      description: t('complex.rigging'),
      riskLevel: 'high',
      selected: false,
      weight: 6,
    },
    {
      id: '18',
      category: t('equipment.conditions'),
      description: t('near.capacity.limits'),
      riskLevel: 'critical',
      selected: false,
      weight: 10,
    },
    {
      id: '19',
      category: t('equipment.conditions'),
      description: t('equipment.defects'),
      riskLevel: 'critical',
      selected: false,
      weight: 10,
    },
    {
      id: '20',
      category: t('equipment.conditions'),
      description: t('inadequate.maintenance'),
      riskLevel: 'high',
      selected: false,
      weight: 8,
    },
    
    // Operational Complexity
    {
      id: '21',
      category: t('operational.complexity'),
      description: t('blind.lift'),
      riskLevel: 'high',
      selected: false,
      weight: 8,
    },
    {
      id: '22',
      category: t('operational.complexity'),
      description: t('multi.crane.operation'),
      riskLevel: 'critical',
      selected: false,
      weight: 9,
    },
    {
      id: '23',
      category: t('operational.complexity'),
      description: t('precision.placement'),
      riskLevel: 'high',
      selected: false,
      weight: 7,
    },
    {
      id: '24',
      category: t('operational.complexity'),
      description: t('time.pressure'),
      riskLevel: 'medium',
      selected: false,
      weight: 4,
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
      Alert.alert(t('no.risk.factors'), t('select.risk.factors'));
      return;
    }

    let totalScore = 0;
    selectedFactors.forEach(factor => {
      totalScore += factor.weight;
    });

    const criticalFactors = selectedFactors.filter(factor => factor.riskLevel === 'critical');
    
    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    let recommendations: string[] = [];

    // If any critical factors are selected, automatically set to critical
    if (criticalFactors.length > 0) {
      riskLevel = 'critical';
      recommendations = [
        t('stop.do.not.proceed'),
        t('senior.management.approval'),
        t('comprehensive.risk.plan'),
        t('consider.postponing'),
        t('alternative.methods.required'),
        t('safety.officer.consultation'),
        t('detailed.hazard.analysis'),
      ];
    } else if (totalScore >= 25) {
      riskLevel = 'high';
      recommendations = [
        t('detailed.lift.plan.review'),
        t('senior.supervision.mandatory'),
        t('consider.alternative.methods'),
        t('additional.safety.equipment'),
        t('extended.briefing'),
        t('continuous.monitoring'),
        t('emergency.procedures.ready'),
      ];
    } else if (totalScore >= 15) {
      riskLevel = 'medium';
      recommendations = [
        t('enhanced.safety.briefing'),
        t('additional.supervision'),
        t('review.lift.plan'),
        t('consider.additional.measures'),
        t('weather.monitoring'),
        t('communication.protocols'),
      ];
    } else {
      riskLevel = 'low';
      recommendations = [
        t('standard.safety.procedures'),
        t('routine.briefing'),
        t('monitor.conditions'),
        t('follow.standard.protocols'),
        t('regular.equipment.checks'),
      ];
    }

    setAssessment({
      totalScore,
      riskLevel,
      recommendations,
      criticalFactors,
    });

    console.log('Risk assessment completed:', {
      totalScore,
      riskLevel,
      selectedFactors: selectedFactors.length,
      criticalFactors: criticalFactors.length,
    });
  };

  const resetAssessment = () => {
    setRiskFactors(prev => prev.map(factor => ({ ...factor, selected: false })));
    setAssessment(null);
    console.log('Risk assessment reset');
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

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low':
        return 'checkmark-circle-outline';
      case 'medium':
        return 'alert-circle-outline';
      case 'high':
        return 'warning-outline';
      case 'critical':
        return 'stop-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const groupedFactors = riskFactors.reduce((acc, factor) => {
    if (!acc[factor.category]) {
      acc[factor.category] = [];
    }
    acc[factor.category].push(factor);
    return acc;
  }, {} as Record<string, RiskFactor[]>);

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
          {t('risk.assessment')}
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[
          commonStyles.textLight, 
          { 
            marginBottom: 24, 
            fontSize: 16,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          {t('select.applicable.risks')}
        </Text>

        {Object.entries(groupedFactors).map(([category, factors]) => (
          <View key={category} style={commonStyles.section}>
            <Text style={[
              commonStyles.subtitle, 
              { 
                marginBottom: 16,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {category}
            </Text>

            {factors.map((factor) => (
              <TouchableOpacity
                key={factor.id}
                style={[
                  commonStyles.card,
                  {
                    borderWidth: 2,
                    borderColor: factor.selected ? getRiskColor(factor.riskLevel) : colors.border,
                    backgroundColor: factor.selected ? `${getRiskColor(factor.riskLevel)}10` : colors.card,
                    borderLeftWidth: isRTL ? 2 : (factor.selected ? 4 : 2),
                    borderRightWidth: isRTL ? (factor.selected ? 4 : 2) : 2,
                    borderLeftColor: isRTL ? (factor.selected ? getRiskColor(factor.riskLevel) : colors.border) : (factor.selected ? getRiskColor(factor.riskLevel) : colors.border),
                    borderRightColor: isRTL ? (factor.selected ? getRiskColor(factor.riskLevel) : colors.border) : (factor.selected ? getRiskColor(factor.riskLevel) : colors.border),
                  }
                ]}
                onPress={() => toggleRiskFactor(factor.id)}
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
                        marginBottom: 4,
                        flexDirection: isRTL ? 'row-reverse' : 'row'
                      }
                    ]}>
                      <View style={{
                        backgroundColor: getRiskColor(factor.riskLevel),
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 12,
                        marginRight: isRTL ? 0 : 8,
                        marginLeft: isRTL ? 8 : 0,
                      }}>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                          {t(`risk.${factor.riskLevel}`)}
                        </Text>
                      </View>
                      <Text style={[
                        commonStyles.text, 
                        { 
                          fontWeight: '600', 
                          color: colors.textLight, 
                          fontSize: 12,
                          textAlign: isRTL ? 'right' : 'left'
                        }
                      ]}>
                        {t('weight')}: {factor.weight}
                      </Text>
                    </View>
                    <Text style={[
                      commonStyles.text,
                      { textAlign: isRTL ? 'right' : 'left' }
                    ]}>
                      {factor.description}
                    </Text>
                  </View>
                  <Icon 
                    name={factor.selected ? "checkmark-circle" : "ellipse-outline"} 
                    size={24} 
                    color={factor.selected ? getRiskColor(factor.riskLevel) : colors.textLight}
                    style={{
                      marginLeft: isRTL ? 0 : 12,
                      marginRight: isRTL ? 12 : 0
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={[
          commonStyles.row, 
          { 
            marginBottom: 24,
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }
        ]}>
          <TouchableOpacity
            style={[
              buttonStyles.primary, 
              { 
                flex: 1, 
                marginRight: isRTL ? 0 : 8,
                marginLeft: isRTL ? 8 : 0
              }
            ]}
            onPress={calculateRisk}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              {t('assess.risk')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              buttonStyles.outline, 
              { 
                flex: 1, 
                marginLeft: isRTL ? 0 : 8,
                marginRight: isRTL ? 8 : 0
              }
            ]}
            onPress={resetAssessment}
          >
            <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>
              {t('reset')}
            </Text>
          </TouchableOpacity>
        </View>

        {assessment && (
          <View style={commonStyles.section}>
            <Text style={[
              commonStyles.subtitle, 
              { 
                marginBottom: 16,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}>
              {t('assessment.results')}
            </Text>

            <View style={[
              commonStyles.card, 
              { 
                borderLeftWidth: isRTL ? 0 : 4,
                borderRightWidth: isRTL ? 4 : 0,
                borderLeftColor: isRTL ? 'transparent' : getRiskColor(assessment.riskLevel),
                borderRightColor: isRTL ? getRiskColor(assessment.riskLevel) : 'transparent',
                backgroundColor: `${getRiskColor(assessment.riskLevel)}10`
              }
            ]}>
              <View style={[
                commonStyles.row, 
                { 
                  marginBottom: 12,
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }
              ]}>
                <Icon 
                  name={getRiskIcon(assessment.riskLevel)} 
                  size={32} 
                  color={getRiskColor(assessment.riskLevel)}
                />
                <View style={{ 
                  marginLeft: isRTL ? 0 : 12,
                  marginRight: isRTL ? 12 : 0,
                  flex: 1 
                }}>
                  <Text style={[
                    commonStyles.subtitle, 
                    { 
                      marginBottom: 4, 
                      color: getRiskColor(assessment.riskLevel),
                      fontSize: 20,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {t(`risk.level.${assessment.riskLevel}`)}
                  </Text>
                  <Text style={[
                    commonStyles.text,
                    { textAlign: isRTL ? 'right' : 'left' }
                  ]}>
                    {t('risk.score')}: {assessment.totalScore}
                  </Text>
                  {assessment.criticalFactors.length > 0 && (
                    <Text style={[
                      commonStyles.text,
                      { 
                        color: getRiskColor('critical'),
                        fontWeight: '600',
                        textAlign: isRTL ? 'right' : 'left'
                      }
                    ]}>
                      {t('critical.factors.detected')}: {assessment.criticalFactors.length}
                    </Text>
                  )}
                </View>
              </View>

              <Text style={[
                commonStyles.text, 
                { 
                  fontWeight: '600', 
                  marginBottom: 12,
                  textAlign: isRTL ? 'right' : 'left'
                }
              ]}>
                {t('recommendations')}:
              </Text>

              {assessment.recommendations.map((recommendation, index) => (
                <View key={index} style={[
                  commonStyles.row, 
                  { 
                    marginBottom: 8, 
                    alignItems: 'flex-start',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <Text style={[
                    commonStyles.text, 
                    { 
                      color: getRiskColor(assessment.riskLevel), 
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
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {recommendation}
                  </Text>
                </View>
              ))}
            </View>

            {assessment.criticalFactors.length > 0 && (
              <View style={[
                commonStyles.card,
                {
                  backgroundColor: '#7C2D1210',
                  borderWidth: 2,
                  borderColor: '#7C2D12',
                  marginTop: 16,
                }
              ]}>
                <View style={[
                  commonStyles.row,
                  { 
                    marginBottom: 12,
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }
                ]}>
                  <Icon name="stop-circle-outline" size={24} color="#7C2D12" />
                  <Text style={[
                    commonStyles.subtitle,
                    {
                      color: '#7C2D12',
                      marginLeft: isRTL ? 0 : 8,
                      marginRight: isRTL ? 8 : 0,
                      marginBottom: 0,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    {t('critical.factors')}
                  </Text>
                </View>
                {assessment.criticalFactors.map((factor, index) => (
                  <Text key={index} style={[
                    commonStyles.text,
                    {
                      color: '#7C2D12',
                      marginBottom: 4,
                      textAlign: isRTL ? 'right' : 'left'
                    }
                  ]}>
                    • {factor.description}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
