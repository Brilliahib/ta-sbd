import ProductDetailContent from "./ProductDetailContent";

interface ProductDetailWrapperProps {
  id: string;
}

export default function ProductDetailWrapper({
  id,
}: ProductDetailWrapperProps) {
  return (
    <div className="pt-8 md:pt-12">
      <ProductDetailContent id={id} />
    </div>
  );
}
