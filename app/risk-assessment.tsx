
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
  
  const [selectedCategory, setSelectedCategory] = useState<string>('lifting');
  
  const riskCategories = [
    { id: 'lifting', name: t('lifting.operations'), icon: 'construct-outline' },
    { id: 'hotwork', name: t('hot.work'), icon: 'flame-outline' },
    { id: 'ladder', name: t('ladder.safety'), icon: 'git-merge-outline' },
    { id: 'height', name: t('work.at.height'), icon: 'arrow-up-outline' },
    { id: 'scaffolding', name: t('scaffolding.standards'), icon: 'grid-outline' },
    { id: 'lifelines', name: t('lifeline.safety'), icon: 'link-outline' },
    { id: 'excavation', name: t('excavations'), icon: 'layers-outline' },
    { id: 'confined', name: t('confined.space'), icon: 'cube-outline' },
  ];

  const getRiskFactorsForCategory = (category: string): RiskFactor[] => {
    switch (category) {
      case 'lifting':
        return [
          // Weather Conditions
          {
            id: 'l1',
            category: t('weather.conditions'),
            description: t('high.winds'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          {
            id: 'l2',
            category: t('weather.conditions'),
            description: t('poor.visibility'),
            riskLevel: 'medium',
            selected: false,
            weight: 5,
          },
          {
            id: 'l3',
            category: t('weather.conditions'),
            description: t('extreme.temperature'),
            riskLevel: 'medium',
            selected: false,
            weight: 4,
          },
          {
            id: 'l4',
            category: t('weather.conditions'),
            description: t('precipitation'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          
          // Load Characteristics
          {
            id: 'l5',
            category: t('load.characteristics'),
            description: t('load.over.75.percent'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'l6',
            category: t('load.characteristics'),
            description: t('awkward.load'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'l7',
            category: t('load.characteristics'),
            description: t('unknown.weight'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'l8',
            category: t('load.characteristics'),
            description: t('fragile.load'),
            riskLevel: 'medium',
            selected: false,
            weight: 5,
          },
          
          // Environmental Hazards
          {
            id: 'l9',
            category: t('environmental.hazards'),
            description: t('overhead.powerlines'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'l10',
            category: t('environmental.hazards'),
            description: t('congested.area'),
            riskLevel: 'high',
            selected: false,
            weight: 6,
          },
          {
            id: 'l11',
            category: t('environmental.hazards'),
            description: t('underground.utilities'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'l12',
            category: t('environmental.hazards'),
            description: t('unstable.ground'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          
          // Personnel Factors
          {
            id: 'l13',
            category: t('personnel.factors'),
            description: t('inexperienced.operator'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'l14',
            category: t('personnel.factors'),
            description: t('multiple.personnel'),
            riskLevel: 'high',
            selected: false,
            weight: 6,
          },
          {
            id: 'l15',
            category: t('personnel.factors'),
            description: t('communication.issues'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'l16',
            category: t('personnel.factors'),
            description: t('fatigue.stress'),
            riskLevel: 'medium',
            selected: false,
            weight: 5,
          },
          
          // Equipment Conditions
          {
            id: 'l17',
            category: t('equipment.conditions'),
            description: t('complex.rigging'),
            riskLevel: 'high',
            selected: false,
            weight: 6,
          },
          {
            id: 'l18',
            category: t('equipment.conditions'),
            description: t('near.capacity.limits'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'l19',
            category: t('equipment.conditions'),
            description: t('equipment.defects'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'l20',
            category: t('equipment.conditions'),
            description: t('inadequate.maintenance'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          
          // Operational Complexity
          {
            id: 'l21',
            category: t('operational.complexity'),
            description: t('blind.lift'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          {
            id: 'l22',
            category: t('operational.complexity'),
            description: t('multi.crane.operation'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'l23',
            category: t('operational.complexity'),
            description: t('precision.placement'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'l24',
            category: t('operational.complexity'),
            description: t('time.pressure'),
            riskLevel: 'medium',
            selected: false,
            weight: 4,
          },
        ];

      case 'hotwork':
        return [
          // Fire Hazards
          {
            id: 'h1',
            category: t('fire.hazards'),
            description: t('combustible.materials.nearby'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'h2',
            category: t('fire.hazards'),
            description: t('flammable.liquids.present'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'h3',
            category: t('fire.hazards'),
            description: t('inadequate.fire.watch'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          {
            id: 'h4',
            category: t('fire.hazards'),
            description: t('no.fire.extinguisher'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          
          // Equipment & Tools
          {
            id: 'h5',
            category: t('equipment.tools'),
            description: t('defective.welding.equipment'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'h6',
            category: t('equipment.tools'),
            description: t('improper.gas.connections'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'h7',
            category: t('equipment.tools'),
            description: t('inadequate.ventilation'),
            riskLevel: 'high',
            selected: false,
            weight: 6,
          },
          
          // Environmental Conditions
          {
            id: 'h8',
            category: t('environmental.conditions'),
            description: t('windy.conditions'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'h9',
            category: t('environmental.conditions'),
            description: t('confined.space.work'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'h10',
            category: t('environmental.conditions'),
            description: t('overhead.work'),
            riskLevel: 'medium',
            selected: false,
            weight: 5,
          },
          
          // Personnel & Training
          {
            id: 'h11',
            category: t('personnel.training'),
            description: t('untrained.welder'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'h12',
            category: t('personnel.training'),
            description: t('no.fire.watch.training'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'h13',
            category: t('personnel.training'),
            description: t('inadequate.ppe'),
            riskLevel: 'high',
            selected: false,
            weight: 6,
          },
        ];

      case 'ladder':
        return [
          // Ladder Condition
          {
            id: 'la1',
            category: t('ladder.condition'),
            description: t('damaged.ladder'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'la2',
            category: t('ladder.condition'),
            description: t('wrong.ladder.type'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'la3',
            category: t('ladder.condition'),
            description: t('overloaded.ladder'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          {
            id: 'la4',
            category: t('ladder.condition'),
            description: t('missing.safety.feet'),
            riskLevel: 'medium',
            selected: false,
            weight: 5,
          },
          
          // Setup & Positioning
          {
            id: 'la5',
            category: t('setup.positioning'),
            description: t('incorrect.angle'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          {
            id: 'la6',
            category: t('setup.positioning'),
            description: t('unstable.surface'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'la7',
            category: t('setup.positioning'),
            description: t('inadequate.top.support'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'la8',
            category: t('setup.positioning'),
            description: t('near.electrical.hazards'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          
          // Environmental Factors
          {
            id: 'la9',
            category: t('environmental.factors'),
            description: t('wet.slippery.conditions'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'la10',
            category: t('environmental.factors'),
            description: t('high.winds.ladder'),
            riskLevel: 'high',
            selected: false,
            weight: 6,
          },
          
          // User Behavior
          {
            id: 'la11',
            category: t('user.behavior'),
            description: t('overreaching'),
            riskLevel: 'high',
            selected: false,
            weight: 6,
          },
          {
            id: 'la12',
            category: t('user.behavior'),
            description: t('carrying.tools.while.climbing'),
            riskLevel: 'medium',
            selected: false,
            weight: 4,
          },
        ];

      case 'height':
        return [
          // Fall Hazards
          {
            id: 'wh1',
            category: t('fall.hazards'),
            description: t('unprotected.edges'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'wh2',
            category: t('fall.hazards'),
            description: t('inadequate.guardrails'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'wh3',
            category: t('fall.hazards'),
            description: t('fragile.roof.surfaces'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'wh4',
            category: t('fall.hazards'),
            description: t('openings.holes'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          
          // Personal Fall Protection
          {
            id: 'wh5',
            category: t('fall.protection.equipment'),
            description: t('no.fall.protection'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'wh6',
            category: t('fall.protection.equipment'),
            description: t('defective.harness'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'wh7',
            category: t('fall.protection.equipment'),
            description: t('improper.anchorage'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'wh8',
            category: t('fall.protection.equipment'),
            description: t('incorrect.lanyard.length'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          
          // Environmental Conditions
          {
            id: 'wh9',
            category: t('environmental.conditions'),
            description: t('adverse.weather'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          {
            id: 'wh10',
            category: t('environmental.conditions'),
            description: t('poor.lighting'),
            riskLevel: 'medium',
            selected: false,
            weight: 5,
          },
          
          // Training & Competency
          {
            id: 'wh11',
            category: t('training.competency'),
            description: t('untrained.workers'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'wh12',
            category: t('training.competency'),
            description: t('inadequate.supervision'),
            riskLevel: 'high',
            selected: false,
            weight: 6,
          },
        ];

      case 'scaffolding':
        return [
          // Structural Integrity
          {
            id: 's1',
            category: t('structural.integrity'),
            description: t('improper.assembly'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 's2',
            category: t('structural.integrity'),
            description: t('missing.components'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 's3',
            category: t('structural.integrity'),
            description: t('overloaded.scaffold'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 's4',
            category: t('structural.integrity'),
            description: t('inadequate.base.support'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          
          // Fall Protection
          {
            id: 's5',
            category: t('fall.protection'),
            description: t('missing.guardrails'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 's6',
            category: t('fall.protection'),
            description: t('inadequate.toe.boards'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 's7',
            category: t('fall.protection'),
            description: t('gaps.in.planking'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          
          // Access & Egress
          {
            id: 's8',
            category: t('access.egress'),
            description: t('unsafe.access.methods'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 's9',
            category: t('access.egress'),
            description: t('blocked.exit.routes'),
            riskLevel: 'medium',
            selected: false,
            weight: 5,
          },
          
          // Environmental Factors
          {
            id: 's10',
            category: t('environmental.factors'),
            description: t('high.winds.scaffold'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          {
            id: 's11',
            category: t('environmental.factors'),
            description: t('electrical.hazards.nearby'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          
          // Inspection & Maintenance
          {
            id: 's12',
            category: t('inspection.maintenance'),
            description: t('no.competent.person.inspection'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 's13',
            category: t('inspection.maintenance'),
            description: t('damaged.components'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
        ];

      case 'lifelines':
        return [
          // Anchorage Systems
          {
            id: 'll1',
            category: t('anchorage.systems'),
            description: t('inadequate.anchorage.strength'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'll2',
            category: t('anchorage.systems'),
            description: t('improper.anchorage.location'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          {
            id: 'll3',
            category: t('anchorage.systems'),
            description: t('multiple.users.single.anchor'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          
          // Equipment Condition
          {
            id: 'll4',
            category: t('equipment.condition'),
            description: t('worn.damaged.lifeline'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'll5',
            category: t('equipment.condition'),
            description: t('improper.rope.type'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'll6',
            category: t('equipment.condition'),
            description: t('inadequate.hardware'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          
          // Installation & Setup
          {
            id: 'll7',
            category: t('installation.setup'),
            description: t('improper.installation'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'll8',
            category: t('installation.setup'),
            description: t('excessive.sag'),
            riskLevel: 'medium',
            selected: false,
            weight: 5,
          },
          {
            id: 'll9',
            category: t('installation.setup'),
            description: t('sharp.edges.contact'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          
          // User Factors
          {
            id: 'll10',
            category: t('user.factors'),
            description: t('untrained.users'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'll11',
            category: t('user.factors'),
            description: t('improper.connection'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
        ];

      case 'excavation':
        return [
          // Soil Conditions
          {
            id: 'e1',
            category: t('soil.conditions'),
            description: t('unstable.soil.type'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'e2',
            category: t('soil.conditions'),
            description: t('water.saturated.soil'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'e3',
            category: t('soil.conditions'),
            description: t('no.soil.classification'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'e4',
            category: t('soil.conditions'),
            description: t('previously.disturbed.soil'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          
          // Protective Systems
          {
            id: 'e5',
            category: t('protective.systems'),
            description: t('no.cave.in.protection'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'e6',
            category: t('protective.systems'),
            description: t('inadequate.shoring'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'e7',
            category: t('protective.systems'),
            description: t('improper.sloping'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          
          // Utilities & Hazards
          {
            id: 'e8',
            category: t('utilities.hazards'),
            description: t('unmarked.utilities'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'e9',
            category: t('utilities.hazards'),
            description: t('gas.lines.present'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'e10',
            category: t('utilities.hazards'),
            description: t('electrical.cables'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          
          // Access & Egress
          {
            id: 'e11',
            category: t('access.egress'),
            description: t('inadequate.exit.means'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          {
            id: 'e12',
            category: t('access.egress'),
            description: t('unsafe.ladder.access'),
            riskLevel: 'medium',
            selected: false,
            weight: 6,
          },
          
          // Environmental Conditions
          {
            id: 'e13',
            category: t('environmental.conditions'),
            description: t('water.accumulation'),
            riskLevel: 'high',
            selected: false,
            weight: 7,
          },
          {
            id: 'e14',
            category: t('environmental.conditions'),
            description: t('heavy.equipment.vibration'),
            riskLevel: 'medium',
            selected: false,
            weight: 5,
          },
        ];

      case 'confined':
        return [
          // Atmospheric Hazards
          {
            id: 'c1',
            category: t('atmospheric.hazards'),
            description: t('oxygen.deficiency'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'c2',
            category: t('atmospheric.hazards'),
            description: t('toxic.gases.present'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'c3',
            category: t('atmospheric.hazards'),
            description: t('flammable.atmosphere'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'c4',
            category: t('atmospheric.hazards'),
            description: t('no.atmospheric.testing'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          
          // Entry Procedures
          {
            id: 'c5',
            category: t('entry.procedures'),
            description: t('no.entry.permit'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'c6',
            category: t('entry.procedures'),
            description: t('no.attendant.present'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'c7',
            category: t('entry.procedures'),
            description: t('inadequate.communication'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          
          // Ventilation & Air Quality
          {
            id: 'c8',
            category: t('ventilation.air.quality'),
            description: t('inadequate.ventilation'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'c9',
            category: t('ventilation.air.quality'),
            description: t('no.continuous.monitoring'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          
          // Emergency Preparedness
          {
            id: 'c10',
            category: t('emergency.preparedness'),
            description: t('no.rescue.plan'),
            riskLevel: 'critical',
            selected: false,
            weight: 10,
          },
          {
            id: 'c11',
            category: t('emergency.preparedness'),
            description: t('inadequate.rescue.equipment'),
            riskLevel: 'high',
            selected: false,
            weight: 8,
          },
          
          // Training & Competency
          {
            id: 'c12',
            category: t('training.competency'),
            description: t('untrained.entrants'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
          {
            id: 'c13',
            category: t('training.competency'),
            description: t('unqualified.attendant'),
            riskLevel: 'critical',
            selected: false,
            weight: 9,
          },
        ];

      default:
        return [];
    }
  };

  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>(getRiskFactorsForCategory('lifting'));
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setRiskFactors(getRiskFactorsForCategory(categoryId));
    setAssessment(null);
    console.log('Selected category:', categoryId);
  };

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
            marginBottom: 16, 
            fontSize: 16,
            textAlign: isRTL ? 'right' : 'left'
          }
        ]}>
          {t('select.assessment.category')}
        </Text>

        {/* Category Selection */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginBottom: 24 }}
          contentContainerStyle={{ paddingHorizontal: isRTL ? 0 : 0 }}
        >
          {riskCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                {
                  backgroundColor: selectedCategory === category.id ? colors.primary : colors.card,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 20,
                  marginRight: isRTL ? 0 : 12,
                  marginLeft: isRTL ? 12 : 0,
                  borderWidth: 1,
                  borderColor: selectedCategory === category.id ? colors.primary : colors.border,
                  minWidth: 120,
                  alignItems: 'center',
                }
              ]}
              onPress={() => selectCategory(category.id)}
            >
              <Icon 
                name={category.icon} 
                size={20} 
                color={selectedCategory === category.id ? 'white' : colors.text}
                style={{ marginBottom: 4 }}
              />
              <Text style={[
                {
                  color: selectedCategory === category.id ? 'white' : colors.text,
                  fontSize: 12,
                  fontWeight: '600',
                  textAlign: 'center',
                }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
