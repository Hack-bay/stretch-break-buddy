
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClaimedVoucher } from '../types/voucher';
import { Calendar, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClaimedVoucherCardProps {
  claimedVoucher: ClaimedVoucher;
}

const ClaimedVoucherCard: React.FC<ClaimedVoucherCardProps> = ({ claimedVoucher }) => {
  const { toast } = useToast();
  const { voucher } = claimedVoucher;
  
  const isExpired = new Date(claimedVoucher.expiresAt) < new Date();
  const daysLeft = Math.ceil((new Date(claimedVoucher.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const copyCode = () => {
    navigator.clipboard.writeText(claimedVoucher.code);
    toast({
      title: "Code kopiert!",
      description: "Der Gutschein-Code wurde in die Zwischenablage kopiert.",
    });
  };

  return (
    <Card className={`${isExpired ? 'opacity-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-800">
            {voucher.title}
          </h3>
          <Badge variant={isExpired ? "destructive" : "default"}>
            {isExpired ? 'Abgelaufen' : `${daysLeft} Tage`}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          {voucher.description}
        </p>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Gutschein-Code:</p>
              <p className="font-mono font-semibold text-lg">{claimedVoucher.code}</p>
            </div>
            <button 
              onClick={copyCode}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>Gültig bis: {new Date(claimedVoucher.expiresAt).toLocaleDateString('de-DE')}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimedVoucherCard;
