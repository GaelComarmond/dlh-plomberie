"use client";

import { useState } from "react";

const PHONE_DISPLAY = "06 11 81 65 59";
const PHONE_LINK = "+33611816559";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.8 3.7 10.5 8 8.3 9.8a14.8 14.8 0 0 0 5.9 5.9l1.8-2.2 4.3 2.7c.5.3.7.9.5 1.5l-.8 2.4c-.2.7-.9 1.2-1.7 1.1C10.2 20.5 3.5 13.8 2.8 5.7c-.1-.8.4-1.5 1.1-1.7l2.4-.8c.6-.2 1.2 0 1.5.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#accueil" aria-label="DLH Plomberie — accueil" onClick={close}>
          <img src="/dlh-plomberie/logo/dlh-mark.png" alt="Logo DLH Plomberie" />
          <span><strong>DLH Plomberie</strong><small>Dépannage · Service · Assistance</small></span>
        </a>

        <nav className={open ? "nav nav-open" : "nav"} aria-label="Navigation principale">
          <a href="#services" onClick={close}>Services</a>
          <a href="#realisations" onClick={close}>Réalisations</a>
          <a href="#avis" onClick={close}>Avis</a>
          <a href="#zone" onClick={close}>Coordonnées</a>
          <a className="nav-mobile-call" href={`tel:${PHONE_LINK}`} onClick={close}><PhoneIcon />{PHONE_DISPLAY}</a>
          <a className="nav-mobile-quote" href="#devis" onClick={close}>Demander un devis</a>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={`tel:${PHONE_LINK}`}><PhoneIcon /><span>{PHONE_DISPLAY}</span></a>
          <a className="header-quote" href="#devis">Devis en ligne</a>
          <button className={open ? "menu-toggle menu-toggle-open" : "menu-toggle"} type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
