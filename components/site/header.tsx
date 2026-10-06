"use client";

import { AnimatePresence, m, useReducedMotion, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { Link } from "@/components/ui/link";
import { RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { DURATION, EASE_EVENTIA } from "@/lib/motion";
import { navigation, signature, siteConfig, type SectionId } from "@/lib/site";
import { useScrolledPast } from "@/lib/use-scrolled-past";

const MENU_ID = "menu-principal";
const DESKTOP_QUERY = "(min-width: 80rem)";
const DARK_HERO_ROUTES = ["/", "/expertises", "/realisations", "/equipe", "/recrutement", "/contact"];

const menuVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: DURATION.base, ease: EASE_EVENTIA } },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_EVENTIA, staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

function useActiveSection() {
  const pathname = usePathname();
  const [active, setActive] = useState<SectionId>("accueil");

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    // A thin band around the middle of the viewport decides which section is current.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return navigation.find(({ href }) => href === pathname)?.id ?? active;
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScrolledPast(8);
  const activeSection = useActiveSection();
  const reduceMotion = useReducedMotion();
  // Pages opening on a dark hero keep the bar transparent with light text until the user scrolls.
  const isOverHero = DARK_HERO_ROUTES.includes(usePathname()) && !isScrolled;

  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const background = Array.from(document.body.children).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && element !== headerRef.current,
    );

    root.style.overflow = "hidden";
    background.forEach((element) => {
      element.inert = true;
    });
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);
    function handleDesktop(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleDesktop);

    return () => {
      root.style.overflow = previousOverflow;
      background.forEach((element) => {
        element.inert = false;
      });
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleDesktop);
    };
  }, [isOpen]);

  function navigateFromMenu(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isOpen) return;
    setIsOpen(false);

    const id = href.split("#")[1];
    const target = id ? document.getElementById(id) : null;
    // Another route, or an anchor not on this page: let the link navigate.
    if (!target) return;
    event.preventDefault();

    // Next frame: the scroll lock and inert state have been released.
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      window.history.pushState(null, "", `#${id}`);
    });
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b text-fg transition-[background-color,border-color,box-shadow] duration-300",
        isOpen
          ? "tone-deep border-transparent bg-canvas"
          : isOverHero
            ? "tone-deep border-transparent bg-transparent"
            : isScrolled
              ? "border-line bg-white/85 shadow-soft backdrop-blur-md"
              : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-(--header-height) items-center gap-6">
        <NextLink
          href="/#accueil"
          aria-label={`${siteConfig.name} — retour à l’accueil`}
          onClick={(event) => navigateFromMenu(event, "/#accueil")}
          className="flex shrink-0 items-center gap-3 rounded-media"
        >
          <Logo preload />
          <span aria-hidden="true" className="font-display text-[1.375rem] leading-none tracking-[0.24em] text-fg lg:text-[1.5rem]">
            EVENTIA
          </span>
        </NextLink>

        <nav aria-label="Navigation principale" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-8">
            {navigation.map(({ id, label, href }) => {
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <NextLink
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block py-2 text-button uppercase transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300",
                      isActive
                        ? "text-fg after:scale-x-100"
                        : "text-fg-muted after:scale-x-0 hover:text-fg hover:after:scale-x-100",
                    )}
                  >
                    {label}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden sm:block xl:ml-4">
          <Link
            href={siteConfig.primaryCta.href}
            appearance="primary"
            onClick={(event) => navigateFromMenu(event, siteConfig.primaryCta.href)}
            className="animate-cta-pulse hover:animate-none focus-visible:animate-none"
          >
            {siteConfig.primaryCta.label}
          </Link>
        </div>

        <IconButton
          ref={toggleRef}
          label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          icon={isOpen ? <X /> : <Menu />}
          variant="ghost"
          aria-expanded={isOpen}
          aria-controls={MENU_ID}
          onClick={() => setIsOpen((open) => !open)}
          className="-mr-2 ml-auto sm:ml-0 xl:hidden"
        />
      </Container>

      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={menuRef}
            id={MENU_ID}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="tone-deep fixed inset-x-0 top-(--header-height) bottom-0 overflow-y-auto overscroll-contain bg-canvas text-fg xl:hidden"
          >
            <Container className="flex min-h-full flex-col gap-10 pt-4 pb-10">
              <nav aria-label="Menu principal">
                <ol>
                  {navigation.map(({ id, label, href }, index) => {
                    const isActive = activeSection === id;
                    return (
                      <RevealItem as="li" key={id} className="border-b border-line">
                        <NextLink
                          href={href}
                          aria-current={isActive ? "true" : undefined}
                          onClick={(event) => navigateFromMenu(event, href)}
                          className={cn(
                            "flex items-baseline gap-5 py-4 font-display text-h3 transition-colors",
                            isActive ? "text-accent" : "text-fg hover:text-accent",
                          )}
                        >
                          <span aria-hidden="true" className="w-6 font-sans text-eyebrow text-fg-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {label}
                        </NextLink>
                      </RevealItem>
                    );
                  })}
                </ol>
              </nav>

              <RevealItem className="sm:hidden">
                <Link
                  href={siteConfig.primaryCta.href}
                  appearance="primary"
                  size="lg"
                  onClick={(event) => navigateFromMenu(event, siteConfig.primaryCta.href)}
                  className="w-full"
                >
                  {siteConfig.primaryCta.label}
                </Link>
              </RevealItem>

              <RevealItem className="mt-auto flex flex-col items-start gap-2 text-small text-fg-muted">
                <Link href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</Link>
                <Link href={siteConfig.contact.phoneHref}>{siteConfig.contact.phoneDisplay}</Link>
                <p>{siteConfig.contact.address}</p>
                <p className="pt-4 text-eyebrow text-accent uppercase">
                  {signature.map((word) => `${word}.`).join(" ")}
                </p>
              </RevealItem>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
