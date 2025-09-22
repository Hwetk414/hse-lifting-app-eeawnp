
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

interface EnvironmentalResource {
  title: string;
  description: string;
  icon: string;
  content: string[];
  source: string;
  category: 'EPA' | 'ISO' | 'Saudi Aramco' | 'RCRA' | 'General';
}

export default function EnvironmentalComplianceScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<EnvironmentalResource | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const resources: EnvironmentalResource[] = [
    {
      title: 'EPA Clean Air Act Compliance',
      description: 'Air quality regulations and emission control requirements',
      icon: 'cloud-outline',
      source: 'EPA Clean Air Act / 40 CFR',
      category: 'EPA',
      content: [
        'National Ambient Air Quality Standards (NAAQS) compliance',
        'New Source Performance Standards (NSPS) for industrial sources',
        'Prevention of Significant Deterioration (PSD) permitting',
        'Title V operating permit requirements for major sources',
        'Hazardous Air Pollutant (HAP) emission standards',
        'Leak Detection and Repair (LDAR) programs',
        'Continuous emission monitoring requirements',
        'Annual emission inventory reporting',
        'Startup, shutdown, and malfunction procedures',
        'Compliance testing and stack testing requirements',
        'Record keeping and reporting requirements',
        'Enforcement and penalty provisions for violations'
      ]
    },
    {
      title: 'Water Pollution Control',
      description: 'Clean Water Act compliance and discharge permits',
      icon: 'water-outline',
      source: 'EPA Clean Water Act / NPDES',
      category: 'EPA',
      content: [
        'National Pollutant Discharge Elimination System (NPDES) permits',
        'Stormwater pollution prevention plans',
        'Spill Prevention, Control, and Countermeasure (SPCC) plans',
        'Underground storage tank regulations',
        'Groundwater monitoring and protection',
        'Wastewater treatment and discharge limits',
        'Best Management Practices (BMPs) for stormwater',
        'Oil and hazardous substance discharge reporting',
        'Water quality monitoring and sampling',
        'Wetlands protection and mitigation',
        'Pretreatment standards for industrial users',
        'Emergency response for water pollution incidents'
      ]
    },
    {
      title: 'Hazardous Waste Management',
      description: 'RCRA compliance for hazardous waste handling',
      icon: 'trash-outline',
      source: 'EPA RCRA / 40 CFR Part 260-279',
      category: 'RCRA',
      content: [
        'Hazardous waste determination and characterization',
        'Generator requirements and waste accumulation limits',
        'Hazardous waste manifest system',
        'Treatment, storage, and disposal facility requirements',
        'Land disposal restrictions and treatment standards',
        'Corrective action for contaminated sites',
        'Underground storage tank regulations',
        'Used oil management requirements',
        'Universal waste management (batteries, lamps, etc.)',
        'Waste minimization and pollution prevention',
        'Emergency preparedness and response procedures',
        'Record keeping and reporting requirements'
      ]
    },
    {
      title: 'ISO 14001 Environmental Management',
      description: 'Environmental management system requirements',
      icon: 'leaf-outline',
      source: 'ISO 14001:2015',
      category: 'ISO',
      content: [
        'Environmental management system establishment',
        'Environmental policy development and communication',
        'Environmental aspects and impacts identification',
        'Legal and other requirements identification',
        'Environmental objectives and targets setting',
        'Environmental management programs implementation',
        'Competence, training, and awareness requirements',
        'Communication and documentation procedures',
        'Operational control and emergency preparedness',
        'Monitoring, measurement, and evaluation',
        'Internal audit and management review processes',
        'Continual improvement and corrective action'
      ]
    },
    {
      title: 'Saudi Aramco Environmental Standards',
      description: 'Environmental compliance for Saudi Aramco operations',
      icon: 'business-outline',
      source: 'Saudi Aramco SAES-A-201',
      category: 'Saudi Aramco',
      content: [
        'Environmental management system implementation',
        'Environmental impact assessment procedures',
        'Air emission monitoring and control',
        'Water and wastewater management',
        'Waste management and disposal procedures',
        'Soil and groundwater protection',
        'Noise and vibration control measures',
        'Environmental emergency response procedures',
        'Environmental training and awareness programs',
        'Contractor environmental requirements',
        'Environmental audit and compliance monitoring',
        'Environmental incident reporting and investigation'
      ]
    },
    {
      title: 'Chemical Inventory and Reporting',
      description: 'Chemical reporting requirements under various regulations',
      icon: 'flask-outline',
      source: 'EPA EPCRA / TSCA',
      category: 'EPA',
      content: [
        'Emergency Planning and Community Right-to-Know Act (EPCRA)',
        'Toxic Release Inventory (TRI) reporting',
        'Chemical inventory reporting (Tier II forms)',
        'Toxic Substances Control Act (TSCA) compliance',
        'Chemical Data Reporting (CDR) requirements',
        'Significant New Use Rules (SNUR) notifications',
        'Chemical import and export notifications',
        'Biotechnology regulations for microbial products',
        'Lead-based paint regulations',
        'Asbestos regulations and management',
        'PCB regulations and disposal requirements',
        'Mercury regulations and reporting'
      ]
    },
    {
      title: 'Environmental Monitoring and Testing',
      description: 'Environmental monitoring requirements and procedures',
      icon: 'analytics-outline',
      source: 'EPA / State Regulations',
      category: 'General',
      content: [
        'Air quality monitoring and stack testing',
        'Water quality monitoring and sampling',
        'Soil and groundwater monitoring',
        'Noise level monitoring and assessment',
        'Waste characterization and testing',
        'Emission monitoring and reporting',
        'Chain of custody procedures for samples',
        'Quality assurance and quality control (QA/QC)',
        'Laboratory certification and accreditation',
        'Data validation and reporting procedures',
        'Monitoring equipment calibration and maintenance',
        'Third-party monitoring and verification'
      ]
    },
    {
      title: 'Environmental Permits and Approvals',
      description: 'Environmental permitting requirements and procedures',
      icon: 'document-text-outline',
      source: 'EPA / State Environmental Agencies',
      category: 'General',
      content: [
        'Air quality permits and applications',
        'Water discharge permits (NPDES)',
        'Hazardous waste permits and notifications',
        'Construction and operating permits',
        'Environmental impact assessments',
        'Public participation and comment periods',
        'Permit modifications and renewals',
        'Permit compliance and reporting',
        'Permit appeals and enforcement actions',
        'Multi-media permits and coordination',
        'State and local permitting requirements',
        'International environmental agreements'
      ]
    },
    {
      title: 'Pollution Prevention and Sustainability',
      description: 'Pollution prevention and sustainable practices',
      icon: 'leaf-outline',
      source: 'EPA P2 / Sustainability Standards',
      category: 'General',
      content: [
        'Pollution prevention planning and implementation',
        'Waste minimization and source reduction',
        'Energy efficiency and conservation',
        'Water conservation and reuse',
        'Green chemistry and safer alternatives',
        'Sustainable supply chain management',
        'Life cycle assessment and analysis',
        'Carbon footprint reduction strategies',
        'Renewable energy and clean technology',
        'Environmental management accounting',
        'Sustainability reporting and disclosure',
        'Stakeholder engagement and communication'
      ]
    },
    {
      title: 'Environmental Emergency Response',
      description: 'Emergency response for environmental incidents',
      icon: 'warning-outline',
      source: 'EPA / Emergency Response',
      category: 'General',
      content: [
        'Environmental emergency response planning',
        'Spill response and containment procedures',
        'Air release response and monitoring',
        'Soil and groundwater contamination response',
        'Wildlife and habitat protection measures',
        'Community notification and evacuation',
        'Regulatory notification requirements',
        'Environmental cleanup and remediation',
        'Post-incident assessment and reporting',
        'Lessons learned and corrective actions',
        'Emergency response training and drills',
        'Coordination with regulatory agencies'
      ]
    },
    {
      title: 'Climate Change and GHG Reporting',
      description: 'Greenhouse gas reporting and climate change regulations',
      icon: 'thermometer-outline',
      source: 'EPA GHG Reporting / Climate Regulations',
      category: 'EPA',
      content: [
        'Greenhouse Gas Reporting Program (GHGRP)',
        'Mandatory GHG emission reporting',
        'GHG emission calculation methodologies',
        'Verification and quality assurance requirements',
        'Carbon dioxide equivalent calculations',
        'Scope 1, 2, and 3 emission inventories',
        'Climate change adaptation planning',
        'Carbon pricing and trading programs',
        'Renewable energy certificates and credits',
        'Energy efficiency standards and programs',
        'Transportation and fuel regulations',
        'International climate agreements and commitments'
      ]
    },
    {
      title: 'Environmental Compliance Auditing',
      description: 'Environmental audit procedures and compliance assessment',
      icon: 'checkmark-circle-outline',
      source: 'EPA / ISO 19011',
      category: 'General',
      content: [
        'Environmental compliance audit planning',
        'Audit scope and objectives definition',
        'Audit team selection and competence',
        'Pre-audit preparation and document review',
        'On-site audit procedures and interviews',
        'Audit findings and nonconformance identification',
        'Audit report preparation and distribution',
        'Corrective action planning and implementation',
        'Follow-up audits and verification',
        'Audit program management and improvement',
        'Third-party and regulatory audits',
        'Audit documentation and record keeping'
      ]
    }
  ];

  const categories = ['All', 'EPA', 'ISO', 'Saudi Aramco', 'RCRA', 'General'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const openResource = (resource: EnvironmentalResource) => {
    setSelectedResource(resource);
    setIsBottomSheetVisible(true);
    console.log('Opening environmental resource:', resource.title);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'EPA': return '#4CAF50';
      case 'ISO': return '#0066CC';
      case 'Saudi Aramco': return '#00A651';
      case 'RCRA': return '#FF6B35';
      default: return '#8BC34A';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.row, { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Icon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { marginBottom: 0, flex: 1 }]}>
          Environmental Compliance
        </Text>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.textLight, { marginBottom: 16, fontSize: 16 }]}>
          Environmental compliance standards from EPA, ISO, and industry organizations
        </Text>

        <View style={commonStyles.section}>
          <Text style={commonStyles.label}>Search Environmental Resources</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[commonStyles.input, { paddingLeft: 40 }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search environmental standards and procedures"
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
          <Text style={[commonStyles.label, { marginBottom: 12 }]}>Filter by Organization</Text>
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
                    ? { backgroundColor: '#8BC34A', borderColor: '#8BC34A' }
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
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Environmental Resources ({filteredResources.length})
          </Text>

          {filteredResources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card]}
              onPress={() => openResource(resource)}
              activeOpacity={0.7}
            >
              <View style={commonStyles.row}>
                <View style={{ flex: 1 }}>
                  <View style={[commonStyles.row, { marginBottom: 8, alignItems: 'center' }]}>
                    <Icon 
                      name={resource.icon as any} 
                      size={24} 
                      color={getCategoryColor(resource.category)} 
                      style={{ marginRight: 12 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.subtitle, { marginBottom: 4, fontSize: 16 }]}>
                        {resource.title}
                      </Text>
                      <View style={[commonStyles.row, { alignItems: 'center' }]}>
                        <View 
                          style={{
                            backgroundColor: getCategoryColor(resource.category),
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 10,
                            marginRight: 8
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                            {resource.category}
                          </Text>
                        </View>
                        <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                          {resource.source}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={[commonStyles.textLight, { marginLeft: 36 }]}>
                    {resource.description}
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={20} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredResources.length === 0 && (
          <View style={[commonStyles.card, commonStyles.center, { padding: 40 }]}>
            <Icon name="search-outline" size={48} color={colors.textLight} style={{ marginBottom: 16 }} />
            <Text style={[commonStyles.text, { textAlign: 'center' }]}>
              No environmental resources found matching your search criteria
            </Text>
          </View>
        )}

        <View style={[commonStyles.card, { backgroundColor: '#8BC34A', marginTop: 20, marginBottom: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Icon name="leaf-outline" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 0 }]}>
              Environmental Responsibility
            </Text>
          </View>
          <Text style={[commonStyles.text, { color: 'white', opacity: 0.9 }]}>
            Environmental compliance protects our planet and communities. Follow all environmental regulations, report incidents promptly, and implement sustainable practices in your daily operations.
          </Text>
        </View>
      </ScrollView>

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        {selectedResource && (
          <View style={{ padding: 20 }}>
            <View style={[commonStyles.row, { marginBottom: 20, alignItems: 'center' }]}>
              <Icon 
                name={selectedResource.icon as any} 
                size={28} 
                color={getCategoryColor(selectedResource.category)} 
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.title, { marginBottom: 4, fontSize: 20 }]}>
                  {selectedResource.title}
                </Text>
                <View style={[commonStyles.row, { alignItems: 'center' }]}>
                  <View 
                    style={{
                      backgroundColor: getCategoryColor(selectedResource.category),
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      marginRight: 10
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                      {selectedResource.category}
                    </Text>
                  </View>
                  <Text style={[commonStyles.textLight, { fontSize: 14 }]}>
                    {selectedResource.source}
                  </Text>
                </View>
              </View>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {selectedResource.content.map((item, index) => (
                <View key={index} style={[commonStyles.row, { marginBottom: 12, alignItems: 'flex-start' }]}>
                  <Text style={[commonStyles.text, { color: getCategoryColor(selectedResource.category), marginRight: 8, fontWeight: '600' }]}>
                    •
                  </Text>
                  <Text style={[commonStyles.text, { flex: 1, lineHeight: 20 }]}>
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
