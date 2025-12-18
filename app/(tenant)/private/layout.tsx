import { ReactNode } from "react";

interface TenantPrivateLayoutProps {
  children: ReactNode;
}

export default function TenantPrivateLayout({
  children,
}: TenantPrivateLayoutProps) {
  return (
    <>
      <p>teste TenantPrivateLayout</p>
      {children}
    </>
  );
}
