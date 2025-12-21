import { Header } from "@/app/_components/header";
import { ReactNode } from "react";

interface DomainLayoutProps {
  children: ReactNode;
}

export default function DomainLayout({ children }: DomainLayoutProps) {
  return (
    <div className="dark theme-domain min-h-screen">
      <Header
        title={{
          text: "Multi",
          text2: "Shop",
          href: "/",
          type: "icon",
          icon: "shoppingBag",
        }}
        navLinks={[
          { href: "/", label: "Home" },
          { href: "/sobre", label: "Sobre" },
          { href: "/funcionalidades", label: "Funcionalidades" },
          { href: "/como-funciona", label: "Como Funciona" },
          { href: "/planos", label: "Planos" },
          { href: "/contato", label: "Contato" },
        ]}
        button={[
          { variant: "secondary", size: "sm", title: "Entrar" },
          { variant: "default", size: "sm", title: "Criar Minha Loja" },
        ]}
      />

      {children}
    </div>
  );
}
