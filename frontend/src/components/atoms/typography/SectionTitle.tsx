import PageContainer from "../container/PageContainer";

interface SectionTitleProps {
  head: string;
  body: string;
}

export default function SectionTitle({ head, body }: SectionTitleProps) {
  return (
    <PageContainer>
      <div className="w-full py-7">
        <h1 className="text-2xl font-semibold tracking-tight">{head}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
    </PageContainer>
  );
}
