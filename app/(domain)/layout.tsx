import { ReactNode } from "react";

interface DomainLayoutProps {
  children: ReactNode;
}

export default function DomainLayout({ children }: DomainLayoutProps) {
  return (
    <>
      <p>teste DomainLayout</p>
      {children}
    </>
  );
}
