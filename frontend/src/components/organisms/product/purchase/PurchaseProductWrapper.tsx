import PageContainer from "@/components/atoms/container/PageContainer";
import PurchaseCreateContent from "./PurchaseCreateContent";
import CardPurchaseExchangeProduct from "@/components/molecules/card/CardPurchaseExchangeProduct";

interface PurchaseProductWrapperProps {
  id: string;
}

export default function PurchaseProductWrapper({
  id,
}: PurchaseProductWrapperProps) {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <PurchaseCreateContent id={id} />
        </div>
        <CardPurchaseExchangeProduct id={id} />
      </div>
    </PageContainer>
  );
}
