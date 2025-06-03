
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VoucherCard from './VoucherCard';
import ClaimedVoucherCard from './ClaimedVoucherCard';
import { UserProgress } from '../types/exercise';
import { Voucher, ClaimedVoucher } from '../types/voucher';
import { availableVouchers } from '../data/vouchers';
import { Gift, Wallet } from 'lucide-react';

interface RewardsScreenProps {
  userProgress: UserProgress;
  onClaimVoucher: (voucher: Voucher) => void;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ userProgress, onClaimVoucher }) => {
  const [activeTab, setActiveTab] = useState('available');

  return (
    <div className="space-y-6">
      {/* Points Balance */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wallet className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Verfügbare Punkte</h2>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {userProgress.totalPoints}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Sammle Punkte durch Übungen und löse tolle Belohnungen ein!
          </p>
        </div>
      </Card>

      {/* Voucher Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Verfügbare Gutscheine
          </TabsTrigger>
          <TabsTrigger value="claimed" className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Meine Gutscheine ({userProgress.claimedVouchers?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Nürnberger Belohnungen
            </h3>
            <p className="text-gray-600">
              Löse deine Punkte für lokale Vergünstigungen und Genüsse ein
            </p>
          </div>
          
          <div className="grid gap-4">
            {availableVouchers.map((voucher) => (
              <VoucherCard
                key={voucher.id}
                voucher={voucher}
                userPoints={userProgress.totalPoints}
                onClaim={onClaimVoucher}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="claimed" className="space-y-4">
          {userProgress.claimedVouchers && userProgress.claimedVouchers.length > 0 ? (
            <div className="grid gap-4">
              {userProgress.claimedVouchers
                .sort((a, b) => new Date(b.claimedAt).getTime() - new Date(a.claimedAt).getTime())
                .map((claimedVoucher) => (
                  <ClaimedVoucherCard
                    key={claimedVoucher.id}
                    claimedVoucher={claimedVoucher}
                  />
                ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Noch keine Gutscheine eingelöst
              </h3>
              <p className="text-gray-500">
                Sammle mehr Punkte und löse deine ersten Belohnungen ein!
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsScreen;
