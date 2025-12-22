import { Header } from "@/app/_components/header";
import { ReactNode } from "react";

interface DomainLayoutProps {
  children: ReactNode;
}

export default function DomainLayout({ children }: DomainLayoutProps) {
  return (
    <div className="dark theme-domain min-h-screen flex flex-col">
      <Header
        title={{
          line1: "Multi",
          line2: "Shop",
          href: "/",
          type: "icon",
          icon: "shoppingBag",
        }}
        navLinks={[
          { value: "/", label: "Home" },
          { value: "/sobre", label: "Sobre" },
          { value: "/funcionalidades", label: "Funcionalidades" },
          { value: "/como-funciona", label: "Como Funciona" },
          { value: "/planos", label: "Planos" },
          { value: "/contato", label: "Contato" },
        ]}
        buttons={[
          { variant: "secondary", size: "sm", title: "Entrar" },
          { variant: "default", size: "sm", title: "Criar Minha Loja" },
        ]}
      />

      {children}
    </div>
  );
}
