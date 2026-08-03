export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src="/dlh-plomberie/logo/dlh-logo-composite.png" alt="DLH Plomberie" />
          <p>Plomberie, dépannage, installations sanitaires et eau chaude à Romainville.</p>
        </div>
        <div><strong>Coordonnées</strong><a href="tel:+33611816559">06 11 81 65 59</a><a href="mailto:contact@dlhplomberie.fr">contact@dlhplomberie.fr</a><span>7 Rue de la Résistance</span><span>93230 Romainville</span></div>
        <div><strong>Navigation</strong><a href="#services">Services</a><a href="#realisations">Réalisations</a><a href="#avis">Avis clients</a><a href="#devis">Demande de devis</a></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} DLH Plomberie</span><span>Concept de site non officiel — maquette de démonstration</span></div>
    </footer>
  );
}
