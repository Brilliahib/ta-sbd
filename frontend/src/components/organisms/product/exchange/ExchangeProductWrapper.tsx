import PageContainer from "@/components/atoms/container/PageContainer";
import ExchangeCreateContent from "./ExchangeCreateContent";
import CardPurchaseExchangeProduct from "@/components/molecules/card/CardPurchaseExchangeProduct";

interface ExchangeProductWrapperProps {
  id: string;
}

export default function ExchangeProductWrapper({
  id,
}: ExchangeProductWrapperProps) {
  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2">
          <ExchangeCreateContent id={id} />
        </div>
        <CardPurchaseExchangeProduct id={id} />
      </div>
    </PageContainer>
  );
}
