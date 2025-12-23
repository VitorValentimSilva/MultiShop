import { Footer } from "@/app/_components/footer";
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

      <Footer
        title={{
          line1: "Multi",
          line2: "Shop",
          href: "/",
          type: "icon",
          icon: "shoppingBag",
        }}
        description="A solução completa para criar sua loja online de forma rápida e fácil."
        socialLinks={[
          {
            label: "Email",
            value: "mailto:contato@multishop.com",
            icon: "mail",
            type: "icon",
          },
          {
            label: "Telefone",
            value: "tel:+5511999999999",
            icon: "phone",
            type: "icon",
          },
          {
            label: "Endereço",
            value: "https://goo.gl/maps/example",
            icon: "mapPin",
            type: "icon",
          },
        ]}
        footerLinks={[
          {
            name: "Produto",
            links: [
              {
                label: "Preços",
                value: "/precos",
              },
              {
                label: "Funcionalidades",
                value: "/funcionalidades",
              },
              {
                label: "Planos",
                value: "/planos",
              },
            ],
          },
          {
            name: "Empresa",
            links: [
              {
                label: "Sobre Nós",
                value: "/sobre",
              },
              {
                label: "Carreiras",
                value: "/carreiras",
              },
              {
                label: "Blog",
                value: "/blog",
              },
            ],
          },
          {
            name: "Suporte",
            links: [
              {
                label: "Ajuda e Suporte",
                value: "/suporte",
              },
              {
                label: "Contato",
                value: "/contato",
              },
              {
                label: "Status",
                value: "/status",
              },
            ],
          },
        ]}
        contacts={[
          {
            type: "icon",
            icon: "Mail",
            label: "Email",
            value: "contato@multishop.com",
            href: "mailto:contato@multishop.com",
          },
          {
            type: "icon",
            icon: "Phone",
            label: "Telefone",
            value: "(11) 99999-9999",
            href: "tel:+5511999999999",
          },
          {
            type: "icon",
            icon: "MapPin",
            label: "Localização",
            value: "São Paulo, Brasil",
          },
        ]}
        text={{
          line1: "© 2024 MultiShop. Todos os direitos reservados.",
          line2: "Feito com ❤️ para empreendedores brasileiros",
        }}
      />
    </div>
  );
}
