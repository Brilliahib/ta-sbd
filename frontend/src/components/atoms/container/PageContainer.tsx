import { PropsWithChildren } from "react";

export default function PageContainer({ children }: PropsWithChildren) {
  return <div className="pad-x">{children}</div>;
}
