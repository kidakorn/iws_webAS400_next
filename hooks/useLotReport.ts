import { useState } from 'react';
import QRCode from 'qrcode';
import { pdf } from '@react-pdf/renderer';
import { LotReport } from '@/components/reports/LotReport';
import { useAuth } from '@/components/providers/AuthProvider';
import { TalinfRecord } from '@/types/talinf';

export function useLotReport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { operator } = useAuth();

  const generateReport = async (row: TalinfRecord, searchTerm?: string) => {
    setIsGenerating(true);
    try {
      const lotno = searchTerm || row["ASSEMBLY LOT NO."] || '';
      const deviceCode = row.P_DEVICECODE || row["DEVICE CODE"] || '';
      const wipCode = row.P_WIPCODE || row["PROCESS CODE"] || '';
      
      const qrPayload = {
        lotno,
        deviceCode,
        wipCode,
        OP_CODE: operator?.empId || undefined
      };

      // Generate QR Code as Data URL
      const qrDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload), {
        errorCorrectionLevel: 'M',
        margin: 1,
        width: 300,
      });

      // Report Data
      const reportData = {
        lotno: String(lotno),
        deviceCode: String(deviceCode),
        wipCode: String(wipCode),
        status: String(row.P_ISFOUND == 1 ? 'FOUND' : (row.P_ISFOUND || 'UNKNOWN'))
      };

      // Create PDF Blob
      const blob = await pdf(LotReport({ data: reportData, qrDataUrl, operatorId: operator?.empId })).toBlob();
      
      // Create URL and open in new tab
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      // We don't revoke the URL immediately because the new tab needs to load it
      setTimeout(() => URL.revokeObjectURL(url), 60000); // Revoke after 1 min
    } catch (error) {
      console.error('Failed to generate report:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateReport, isGenerating };
}
