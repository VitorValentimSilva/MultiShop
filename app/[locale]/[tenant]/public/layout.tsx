import { ReactNode } from "react";

interface TenantPublicLayoutProps {
  children: ReactNode;
}

export default function TenantPublicLayout({
  children,
}: TenantPublicLayoutProps) {
  return (
    <>
      <p>teste TenantPublicLayout</p>
      {children}
    </>
  );
}
