"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";

const navLinks = [
  { href: "/obra", label: "Obra" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/exposiciones", label: "Exposiciones" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="font-serif text-sm uppercase leading-tight tracking-wide sm:text-lg"
        >
          {site.name}
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-ink hover:text-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contacto"
            className="border border-ink px-5 py-2 text-xs uppercase tracking-widest hover:bg-ink hover:text-background"
          >
            Contacto
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="shrink-0 text-xs uppercase tracking-widest md:hidden"
        >
          {menuOpen ? "Cerrar" : "Menú"}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-line px-5 py-4 sm:px-6 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs uppercase tracking-widest">
              {link.label}
            </Link>
          ))}
          <Link href="/contacto" className="text-xs uppercase tracking-widest">
            Contacto
          </Link>
        </nav>
      )}
    </header>
  );
}
