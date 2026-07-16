import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
    paddingBottom: 10,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  dateInfo: {
    fontSize: 10,
    color: '#64748B',
  },
  content: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  leftColumn: {
    flex: 1,
    paddingRight: 20,
  },
  rightColumn: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  fieldGroup: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  qrImage: {
    width: 150,
    height: 150,
  },
  qrLabel: {
    marginTop: 10,
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
});

interface LotReportProps {
  data: {
    lotno: string;
    deviceCode: string;
    wipCode: string;
    status?: string;
  };
  qrDataUrl: string;
  operatorId?: string;
}

export const LotReport = ({ data, qrDataUrl, operatorId }: LotReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.logoIcon} />
          <Text style={styles.title}>IWS WebAS400</Text>
        </View>
        <View>
          <Text style={styles.dateInfo}>Generated: {new Date().toLocaleString('en-GB')}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Left Column - Information */}
        <View style={styles.leftColumn}>
          <Text style={styles.sectionTitle}>Lot Information</Text>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Assembly Lot No:</Text>
            <Text style={styles.fieldValue}>{data.lotno || '-'}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Device Code:</Text>
            <Text style={styles.fieldValue}>{data.deviceCode || '-'}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Process (WIPCODE):</Text>
            <Text style={styles.fieldValue}>{data.wipCode || '-'}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Status:</Text>
            <Text style={styles.fieldValue}>{data.status || 'FOUND'}</Text>
          </View>
        </View>

        {/* Right Column - QR Code */}
        <View style={styles.rightColumn}>
          <View style={styles.qrContainer}>
            {qrDataUrl ? (
              <Image src={qrDataUrl} style={styles.qrImage} />
            ) : (
              <Text style={{ fontSize: 10, color: 'red' }}>QR Generation Failed</Text>
            )}
            <Text style={styles.qrLabel}>Scan for details</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Printed by Operator: {operatorId || 'Unknown'} — IWS WebAS400 System
      </Text>
    </Page>
  </Document>
);
