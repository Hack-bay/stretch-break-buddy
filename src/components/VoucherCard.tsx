
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Voucher } from '../types/voucher';
import { Coffee, ShoppingCart, Utensils, Beer } from 'lucide-react';

interface VoucherCardProps {
  voucher: Voucher;
  userPoints: number;
  onClaim: (voucher: Voucher) => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ voucher, userPoints, onClaim }) => {
  const canAfford = userPoints >= voucher.pointCost;

  const getCategoryIcon = () => {
    switch (voucher.category) {
      case 'food':
        return <Coffee className="w-5 h-5" />;
      case 'market':
        return <ShoppingCart className="w-5 h-5" />;
      case 'specialty':
        return <Utensils className="w-5 h-5" />;
      case 'drink':
        return <Beer className="w-5 h-5" />;
      default:
        return <Coffee className="w-5 h-5" />;
    }
  };

  const getCategoryColor = () => {
    switch (voucher.category) {
      case 'food':
        return 'bg-orange-100 text-orange-700';
      case 'market':
        return 'bg-green-100 text-green-700';
      case 'specialty':
        return 'bg-red-100 text-red-700';
      case 'drink':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className={`transition-all duration-200 ${canAfford ? 'hover:shadow-md' : 'opacity-75'}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2 rounded-lg ${getCategoryColor()}`}>
            {getCategoryIcon()}
          </div>
          <Badge variant="outline" className="text-sm font-semibold">
            {voucher.pointCost} Punkte
          </Badge>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2">
          {voucher.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {voucher.description}
        </p>
        
        <p className="text-xs text-gray-500 mb-4">
          {voucher.terms}
        </p>
        
        <Button
          onClick={() => onClaim(voucher)}
          disabled={!canAfford}
          className="w-full"
          variant={canAfford ? "default" : "outline"}
        >
          {canAfford ? 'Einlösen' : 'Nicht genug Punkte'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoucherCard;
