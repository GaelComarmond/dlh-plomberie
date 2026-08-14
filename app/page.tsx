"use client";

import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const PHONE_DISPLAY = "06 11 81 65 59";
const PHONE_LINK = "+33611816559";

const serviceFamilies = [
  {
    number: "01",
    eyebrow: "Diagnostic",
    title: "Recherche de fuite",
    description: "Localisation du problème et préparation de la réparation sur les réseaux d’eau et les équipements sanitaires.",
    items: ["Recherche de fuite", "Réparation de tuyauterie"],
  },
  {
    number: "02",
    eyebrow: "Sanitaires",
    title: "WC : pose et réparation",
    description: "Installation d’un WC, remplacement d’un équipement existant ou remise en état d’un mécanisme défectueux.",
    items: ["Installation de WC", "Réparation de WC"],
  },
  {
    number: "03",
    eyebrow: "Robinetterie",
    title: "Robinets et mitigeurs",
    description: "Pose et réparation de robinetterie pour cuisine, salle d’eau et autres points d’eau.",
    items: ["Installation de robinet", "Réparation de robinet"],
  },
  {
    number: "04",
    eyebrow: "Salle d’eau",
    title: "Douches",
    description: "Installation ou réparation des équipements de douche et de leurs raccordements.",
    items: ["Installation de douche", "Réparation de douche"],
  },
  {
    number: "05",
    eyebrow: "Eau chaude",
    title: "Chauffe-eau",
    description: "Installation, remplacement et réparation de chauffe-eau selon l’état de l’équipement.",
    items: ["Installation de chauffe-eau", "Réparation de chauffe-eau"],
  },
  {
    number: "06",
    eyebrow: "Évacuations",
    title: "Débouchage et canalisations",
    description: "Intervention sur les évacuations bouchées ou endommagées et réparation des conduites concernées.",
    items: ["Débouchage de canalisation", "Réparation d’évacuation", "Réparation de tuyauterie"],
  },
];

const reviews = [
  { name: "Marie-Laure Hélard", date: "Mai 2026", text: "DLH PLOMBERIE a assuré la rénovation complète d'un petit 2 pièces : le résultat est top ! Un grand merci pour les conseils avisés et la réalisation réussie !" },
  { name: "Lydie Chahine", date: "Juin 2026", text: "Appeler en urgence pour un chauffe eau qui fuit lors d'un Weekend problème réglé les deux jours suivants je recommande fortement" },
  { name: "Marjorie Guiguen", date: "Avril 2026", text: "Appel suite à fuite de chauffe eau. Intervention, changement dans la journée. Équipe agréable." },
  { name: "Sonia Molinaro", date: "Octobre 2025", text: "Super réactif, travail vraiment professionnel, il m’a même changé un réseau d’arrivée d’eau pour m’aider. Je recommande et les tarifs sont de normes" },
  { name: "Rafael Tubiana", date: "Décembre 2025", text: "David est super réactif et très sympa. Super boulot et surtout très propre après passage" },
  { name: "Gaëtan Piquenot", date: "Août 2025", text: "Quick, polite, efficient" },
];

const galleryItems = [
  {
    src: "/dlh-plomberie/images/intervention-facade.webp",
    alt: "Technicien DLH Plomberie intervenant en hauteur sur une façade",
    eyebrow: "Accès technique",
    title: "Intervention en façade",
  },
  {
    src: "/dlh-plomberie/images/coin-eau-renove.webp",
    alt: "Coin d’eau avec meuble blanc et évier",
    eyebrow: "Aménagement",
    title: "Coin d’eau",
  },
  {
    src: "/dlh-plomberie/images/sanitaire.webp",
    alt: "Équipement sanitaire et robinetterie",
    eyebrow: "Sanitaire",
    title: "Raccordement et équipement",
  },
];


const quoteServices = [
  "Recherche de fuite",
  "Installation de WC",
  "Débouchage de canalisation",
  "Installation de chauffe-eau",
  "Installation de douche",
  "Installation de robinet",
  "Réparation de chauffe-eau",
  "Réparation de douche",
  "Réparation d’évacuation",
  "Réparation de robinet",
  "Réparation de WC",
  "Réparation de tuyauterie",
  "Autre demande",
];

const urgencyOptions = ["Urgence / dès que possible", "Dans les 24 à 48 heures", "Dans la semaine", "Date flexible"];
const propertyTypes = ["Appartement", "Maison", "Local professionnel", "Copropriété", "Autre"];
const preferredTimes = ["Matin", "Après-midi", "Fin de journée", "Peu importe"];

type QuoteData = {
  services: string[]; urgency: string; propertyType: string; details: string; address: string; postcode: string; preferredDate: string; preferredTime: string; firstName: string; lastName: string; email: string; phone: string; consent: boolean; companyWebsite: string;
};

const initialQuoteData: QuoteData = { services: [], urgency: "", propertyType: "", details: "", address: "", postcode: "", preferredDate: "", preferredTime: "", firstName: "", lastName: "", email: "", phone: "", consent: false, companyWebsite: "" };

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 3.7 10.5 8 8.3 9.8a14.8 14.8 0 0 0 5.9 5.9l1.8-2.2 4.3 2.7c.5.3.7.9.5 1.5l-.8 2.4c-.2.7-.9 1.2-1.7 1.1C10.2 20.5 3.5 13.8 2.8 5.7c-.1-.8.4-1.5 1.1-1.7l2.4-.8c.6-.2 1.2 0 1.5.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function ArrowIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function CheckIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function CameraIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5h4l1.4-2h5.2l1.4 2h4a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="12" cy="13.5" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>; }


function GalleryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = galleryItems[activeIndex];

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? galleryItems.length - 1 : current - 1,
    );
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % galleryItems.length);
  }

  return (
    <div className="gallery-carousel">
      <div className="gallery-carousel-stage">
        <img
          src={activeItem.src}
          alt={activeItem.alt}
          className="gallery-carousel-image"
        />

        <div className="gallery-carousel-caption">
          <span>{activeItem.eyebrow}</span>
          <strong>{activeItem.title}</strong>
        </div>

        <button
          type="button"
          className="gallery-carousel-arrow gallery-carousel-arrow-left"
          onClick={showPrevious}
          aria-label="Photo précédente"
        >
          ←
        </button>

        <button
          type="button"
          className="gallery-carousel-arrow gallery-carousel-arrow-right"
          onClick={showNext}
          aria-label="Photo suivante"
        >
          →
        </button>
      </div>

      <div className="gallery-carousel-footer">
        <div className="gallery-carousel-dots" aria-label="Choisir une photo">
          {galleryItems.map((item, index) => (
            <button
              type="button"
              key={item.src}
              className={
                index === activeIndex
                  ? "gallery-carousel-dot gallery-carousel-dot-active"
                  : "gallery-carousel-dot"
              }
              onClick={() => setActiveIndex(index)}
              aria-label={`Afficher la photo ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>

        <span className="gallery-carousel-count">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(galleryItems.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function QuoteWorkflow() {
  const [step, setStep] = useState(0);
  const [quoteData, setQuoteData] = useState<QuoteData>(initialQuoteData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [formError, setFormError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [confirmationSent, setConfirmationSent] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stepTitles = [
    "Votre besoin",
    "Le contexte",
    "Le lieu et la date",
    "Vos coordonnées",
  ];

  const selectedPhotoSize = useMemo(
    () => photos.reduce((total, photo) => total + photo.size, 0),
    [photos],
  );

  function updateField<K extends keyof QuoteData>(
    key: K,
    value: QuoteData[K],
  ) {
    setQuoteData((current) => ({
      ...current,
      [key]: value,
    }));

    setFormError("");
  }

  function toggleService(service: string) {
    setQuoteData((current) => {
      const selected = current.services.includes(service);

      return {
        ...current,
        services: selected
          ? current.services.filter((item) => item !== service)
          : [...current.services, service],
      };
    });

    setFormError("");
  }

  function validateCurrentStep() {
    if (step === 0) {
      if (quoteData.services.length === 0) {
        return "Sélectionnez au moins un service.";
      }

      if (!quoteData.urgency) {
        return "Indiquez le délai souhaité.";
      }
    }

    if (step === 1 && !quoteData.propertyType) {
      return "Sélectionnez le type de propriété.";
    }

    if (step === 2) {
      if (!quoteData.address.trim()) {
        return "Indiquez l’adresse de l’intervention.";
      }

      if (!quoteData.postcode.trim()) {
        return "Indiquez le code postal.";
      }

      if (!quoteData.preferredDate) {
        return "Choisissez une date souhaitée.";
      }

      if (!quoteData.preferredTime) {
        return "Sélectionnez un moment de la journée.";
      }
    }

    return "";
  }

  function goToNextStep() {
    const error = validateCurrentStep();

    if (error) {
      setFormError(error);
      return;
    }

    setStep((current) => Math.min(current + 1, stepTitles.length - 1));
    setFormError("");
  }

  function handlePhotoSelection(event: ChangeEvent<HTMLInputElement>) {
    const incomingFiles = Array.from(event.target.files ?? []);

    if (incomingFiles.length === 0) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const validFiles: File[] = [];

    for (const file of incomingFiles) {
      if (!allowedTypes.includes(file.type)) {
        setFormError(
          "Les photographies doivent être au format JPG, PNG ou WebP.",
        );
        continue;
      }

      if (file.size > 4 * 1024 * 1024) {
        setFormError(`${file.name} dépasse la limite de 4 Mo par image.`);
        continue;
      }

      validFiles.push(file);
    }

    setPhotos((current) => [...current, ...validFiles].slice(0, 5));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removePhoto(index: number) {
    setPhotos((current) =>
      current.filter((_, photoIndex) => photoIndex !== index),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !quoteData.firstName.trim() ||
      !quoteData.lastName.trim() ||
      !quoteData.email.trim() ||
      !quoteData.phone.trim()
    ) {
      setFormError(
        "Indiquez votre nom, votre adresse e-mail et votre téléphone.",
      );
      return;
    }

    if (!quoteData.consent) {
      setFormError(
        "Vous devez autoriser l’utilisation de ces informations pour traiter votre demande.",
      );
      return;
    }

    setSubmissionStatus("sending");
    setFormError("");

    const formData = new FormData();

    quoteData.services.forEach((service) => {
      formData.append("services", service);
    });

    formData.append("urgency", quoteData.urgency);
    formData.append("propertyType", quoteData.propertyType);
    formData.append("details", quoteData.details);
    formData.append("address", quoteData.address);
    formData.append("postcode", quoteData.postcode);
    formData.append("preferredDate", quoteData.preferredDate);
    formData.append("preferredTime", quoteData.preferredTime);
    formData.append("firstName", quoteData.firstName);
    formData.append("lastName", quoteData.lastName);
    formData.append("email", quoteData.email);
    formData.append("phone", quoteData.phone);
    formData.append("companyWebsite", quoteData.companyWebsite);

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        confirmationSent?: boolean;
      };

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message ||
            "La demande n’a pas pu être envoyée. Veuillez réessayer.",
        );
      }

      setConfirmationSent(result.confirmationSent !== false);
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
      setFormError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l’envoi.",
      );
    }
  }

  if (submissionStatus === "success") {
    return (
      <div className="quote-success">
        <span className="quote-success-icon">
          <CheckIcon />
        </span>

        <p className="section-kicker">Demande reçue</p>

        <h2>Votre demande a bien été transmise.</h2>

        <p>
          Votre demande contient les informations utiles pour examiner le besoin et organiser le prochain échange.
        </p>

        {!confirmationSent ? (
          <p className="confirmation-warning">
            La demande a bien été reçue, mais l’e-mail de confirmation n’a pas
            pu être délivré.
          </p>
        ) : null}

        <a className="button button-gold" href={`tel:${PHONE_LINK}`}>
          <PhoneIcon />
          Appeler directement
        </a>
      </div>
    );
  }

  return (
    <form className="quote-workflow" onSubmit={handleSubmit}>
      <aside className="quote-sidebar">
        <p className="section-kicker section-kicker-light">Demande de devis</p>

        <h2>Préparez votre demande en quelques étapes.</h2>

        <p>
          Les réponses permettent de comprendre la situation avant de vous
          rappeler.
        </p>

        <div className="quote-progress-list">
          {stepTitles.map((title, index) => (
            <button
              type="button"
              className={[
                "quote-progress-item",
                index === step ? "quote-progress-active" : "",
                index < step ? "quote-progress-complete" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                if (index <= step) {
                  setStep(index);
                  setFormError("");
                }
              }}
              key={title}
            >
              <span>
                {index < step ? <CheckIcon /> : String(index + 1).padStart(2, "0")}
              </span>
              <strong>{title}</strong>
            </button>
          ))}
        </div>

        <div className="quote-callout">
          <span>Besoin d’échanger directement ?</span>
          <a href={`tel:${PHONE_LINK}`}>
            <PhoneIcon />
            {PHONE_DISPLAY}
          </a>
        </div>
      </aside>

      <div className="quote-form-panel">
        <div className="quote-mobile-progress">
          <span>
            Étape {step + 1} sur {stepTitles.length}
          </span>
          <strong>{stepTitles[step]}</strong>
          <div>
            <span
              style={{
                width: `${((step + 1) / stepTitles.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {step === 0 ? (
          <div className="quote-step">
            <div className="quote-step-heading">
              <span>01</span>
              <div>
                <h3>De quoi avez-vous besoin ?</h3>
                <p>Vous pouvez sélectionner plusieurs éléments.</p>
              </div>
            </div>

            <div className="choice-grid choice-grid-services">
              {quoteServices.map((service) => {
                const selected = quoteData.services.includes(service);

                return (
                  <button
                    type="button"
                    className={`choice-button ${
                      selected ? "choice-button-selected" : ""
                    }`}
                    onClick={() => toggleService(service)}
                    key={service}
                  >
                    <span>{selected ? <CheckIcon /> : "+"}</span>
                    {service}
                  </button>
                );
              })}
            </div>

            <fieldset className="field-group">
              <legend>Quel délai vous conviendrait ?</legend>

              <div className="choice-grid choice-grid-two">
                {urgencyOptions.map((option) => (
                  <button
                    type="button"
                    className={`choice-button ${
                      quoteData.urgency === option
                        ? "choice-button-selected"
                        : ""
                    }`}
                    onClick={() => updateField("urgency", option)}
                    key={option}
                  >
                    <span>
                      {quoteData.urgency === option ? <CheckIcon /> : ""}
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="quote-step">
            <div className="quote-step-heading">
              <span>02</span>
              <div>
                <h3>Donnez un peu de contexte.</h3>
                <p>
                  Une description claire aide à anticiper le matériel et le
                  temps nécessaires.
                </p>
              </div>
            </div>

            <fieldset className="field-group">
              <legend>Type de propriété</legend>

              <div className="choice-grid choice-grid-property">
                {propertyTypes.map((property) => (
                  <button
                    type="button"
                    className={`choice-button ${
                      quoteData.propertyType === property
                        ? "choice-button-selected"
                        : ""
                    }`}
                    onClick={() => updateField("propertyType", property)}
                    key={property}
                  >
                    <span>
                      {quoteData.propertyType === property ? (
                        <CheckIcon />
                      ) : (
                        ""
                      )}
                    </span>
                    {property}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="text-area-field">
              <span>Description du problème ou du projet</span>
              <textarea
                value={quoteData.details}
                onChange={(event) =>
                  updateField("details", event.target.value)
                }
                rows={7}
                placeholder="Expliquez ce qui se passe, depuis quand, les équipements concernés et toute information utile."
              />
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="quote-step">
            <div className="quote-step-heading">
              <span>03</span>
              <div>
                <h3>Où et quand faut-il intervenir ?</h3>
                <p>
                  La date demandée reste indicative jusqu’à sa confirmation.
                </p>
              </div>
            </div>

            <div className="input-grid">
              <label className="input-field input-field-wide">
                <span>Adresse de l’intervention</span>
                <input
                  type="text"
                  value={quoteData.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  placeholder="Numéro et nom de rue"
                  autoComplete="street-address"
                />
              </label>

              <label className="input-field">
                <span>Code postal</span>
                <input
                  type="text"
                  value={quoteData.postcode}
                  onChange={(event) =>
                    updateField("postcode", event.target.value)
                  }
                  placeholder="93230"
                  inputMode="numeric"
                  autoComplete="postal-code"
                />
              </label>

              <label className="input-field">
                <span>Date souhaitée</span>
                <input
                  type="date"
                  value={quoteData.preferredDate}
                  onChange={(event) =>
                    updateField("preferredDate", event.target.value)
                  }
                />
              </label>
            </div>

            <fieldset className="field-group">
              <legend>Moment de la journée</legend>

              <div className="choice-grid choice-grid-two">
                {preferredTimes.map((time) => (
                  <button
                    type="button"
                    className={`choice-button ${
                      quoteData.preferredTime === time
                        ? "choice-button-selected"
                        : ""
                    }`}
                    onClick={() => updateField("preferredTime", time)}
                    key={time}
                  >
                    <span>
                      {quoteData.preferredTime === time ? <CheckIcon /> : ""}
                    </span>
                    {time}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="quote-step">
            <div className="quote-step-heading">
              <span>04</span>
              <div>
                <h3>Comment peut-on vous recontacter ?</h3>
                <p>
                  Une confirmation automatique sera envoyée après la demande.
                </p>
              </div>
            </div>

            <div className="input-grid">
              <label className="input-field">
                <span>Prénom</span>
                <input
                  type="text"
                  value={quoteData.firstName}
                  onChange={(event) =>
                    updateField("firstName", event.target.value)
                  }
                  autoComplete="given-name"
                />
              </label>

              <label className="input-field">
                <span>Nom</span>
                <input
                  type="text"
                  value={quoteData.lastName}
                  onChange={(event) =>
                    updateField("lastName", event.target.value)
                  }
                  autoComplete="family-name"
                />
              </label>

              <label className="input-field">
                <span>Adresse e-mail</span>
                <input
                  type="email"
                  value={quoteData.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  autoComplete="email"
                />
              </label>

              <label className="input-field">
                <span>Téléphone</span>
                <input
                  type="tel"
                  value={quoteData.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  autoComplete="tel"
                />
              </label>
            </div>

            <div className="photo-upload">
              <div className="photo-upload-copy">
                <span className="photo-upload-icon">
                  <CameraIcon />
                </span>

                <div>
                  <strong>Ajouter des photographies</strong>
                  <p>
                    Jusqu’à 5 images JPG, PNG ou WebP, avec une limite de 4 Mo
                    par image.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={photos.length >= 5}
              >
                Choisir des photos
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handlePhotoSelection}
                hidden
              />
            </div>

            {photos.length > 0 ? (
              <div className="selected-files">
                <div className="selected-files-heading">
                  <strong>
                    {photos.length} photographie
                    {photos.length > 1 ? "s" : ""} sélectionnée
                    {photos.length > 1 ? "s" : ""}
                  </strong>
                  <span>
                    {(selectedPhotoSize / (1024 * 1024)).toFixed(1)} Mo
                  </span>
                </div>

                {photos.map((photo, index) => (
                  <div className="selected-file" key={`${photo.name}-${index}`}>
                    <span>{photo.name}</span>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      aria-label={`Retirer ${photo.name}`}
                    >
                      Retirer
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            <label className="honeypot-field" aria-hidden="true">
              Site internet de l’entreprise
              <input
                type="text"
                value={quoteData.companyWebsite}
                onChange={(event) =>
                  updateField("companyWebsite", event.target.value)
                }
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <label className="consent-field">
              <input
                type="checkbox"
                checked={quoteData.consent}
                onChange={(event) =>
                  updateField("consent", event.target.checked)
                }
              />
              <span>
                J’autorise DLH Plomberie à utiliser ces
                informations uniquement pour traiter cette demande et me
                recontacter.
              </span>
            </label>
          </div>
        ) : null}

        {formError ? (
          <p className="quote-error" role="alert">
            {formError}
          </p>
        ) : null}

        <div className="quote-navigation">
          {step > 0 ? (
            <button
              type="button"
              className="quote-back"
              onClick={() => {
                setStep((current) => Math.max(current - 1, 0));
                setFormError("");
              }}
            >
              ← Étape précédente
            </button>
          ) : (
            <span />
          )}

          {step < stepTitles.length - 1 ? (
            <button
              type="button"
              className="button button-gold"
              onClick={goToNextStep}
            >
              Continuer
              <ArrowIcon />
            </button>
          ) : (
            <button
              type="submit"
              className="button button-gold"
              disabled={submissionStatus === "sending"}
            >
              {submissionStatus === "sending"
                ? "Envoi en cours…"
                : "Envoyer ma demande"}
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}


export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "DLH Plomberie",
    telephone: "+33611816559",
    email: "contact@dlhplomberie.fr",
    address: { "@type": "PostalAddress", streetAddress: "7 Rue de la Résistance", postalCode: "93230", addressLocality: "Romainville", addressCountry: "FR" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "216", bestRating: "5" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday"], opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "20:00" }
    ]
  };

  return (
    <main className="dlh-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="demo-banner">Concept de site non officiel créé à titre de démonstration pour DLH Plomberie</div>
      <SiteHeader />

      <section className="hero" id="accueil">
        <div className="hero-roofline" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker"><span />Plombier à Romainville</p>
            <h1>Un problème d’eau.<br /><em>Une réponse claire.</em></h1>
            <p className="hero-lead">Recherche de fuite, chauffe-eau, sanitaires, robinetterie et canalisations. DLH Plomberie intervient depuis Romainville pour diagnostiquer, réparer et remettre en service.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#devis">Décrire mon besoin <ArrowIcon /></a>
              <a className="button button-outline" href={`tel:${PHONE_LINK}`}><PhoneIcon />{PHONE_DISPLAY}</a>
            </div>
            <div className="hero-proof">
              <div><strong>4,9/5</strong><span>216 avis Google</span></div>
              <div><strong>4,9/5</strong><span>207 avis Infobel</span></div>
              <div><strong>6j/7</strong><span>Ouvert · samedi fermé</span></div>
            </div>
          </div>
          <div className="hero-visual hero-logo-visual">
            <span className="hero-logo-glow" aria-hidden="true" />
            <span className="hero-logo-grid" aria-hidden="true" />
            <span className="hero-logo-ring hero-logo-ring-outer" aria-hidden="true" />
            <span className="hero-logo-ring hero-logo-ring-inner" aria-hidden="true" />
            <span className="hero-logo-dot hero-logo-dot-one" aria-hidden="true" />
            <span className="hero-logo-dot hero-logo-dot-two" aria-hidden="true" />
            <span className="hero-logo-dot hero-logo-dot-three" aria-hidden="true" />

            <div className="hero-logo-stage">
              <img
                src="/dlh-plomberie/logo/dlh-mark.png"
                alt="Logo DLH Plomberie"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Repères de confiance">
        <div className="shell trust-grid">
          <div><strong>Réactivité</strong></div>
          <div><strong>Travail propre</strong></div>
          <div><strong>Conseils utiles</strong></div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="shell">
          <div className="section-heading section-heading-single">
            <div><p className="eyebrow">Prestations affichées</p><h2>La plomberie, organisée autour de votre problème.</h2></div>
          </div>
          <div className="services-board">
            {serviceFamilies.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-top"><span>{service.number}</span><small>{service.eyebrow}</small></div>
                <h3>{service.title}</h3><p>{service.description}</p>
                <ul>{service.items.map((item) => <li key={item}><CheckIcon />{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reviews-section" id="avis">
        <div className="shell reviews-layout">
          <aside className="reviews-summary"><img src="/dlh-plomberie/logo/dlh-mark.png" alt="" /><p>★★★★★</p><strong>4,9 / 5</strong><span>216 avis Google indiqués</span><div><b>4,9 / 5</b><small>207 avis Infobel indiqués</small></div></aside>
          <div className="reviews-main"><div className="section-heading reviews-heading"><div><p className="eyebrow">Avis clients fournis</p><h2>Rapide, professionnel et propre après passage.</h2></div></div>
            <div className="review-grid">{reviews.map((review) => <article key={review.name}><div className="review-stars">★★★★★</div><blockquote>“{review.text}”</blockquote><footer><strong>{review.name}</strong><span>{review.date}</span></footer></article>)}</div>
          </div>
        </div>
      </section>

      <section className="section location-section" id="zone">
        <div className="shell location-grid">
          <div className="location-card"><p className="eyebrow eyebrow-light">Coordonnées</p><h2>Basé à Romainville.</h2><address><strong>7 Rue de la Résistance</strong><span>93230 Romainville</span><a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a><a href="mailto:contact@dlhplomberie.fr">contact@dlhplomberie.fr</a></address><p className="location-note">Le rayon d’intervention exact n’est pas indiqué dans les documents fournis et doit être confirmé.</p></div>
          <div className="hours-card"><div><span>Horaires fournis</span><strong>Ouverture hebdomadaire</strong></div><dl><div><dt>Lundi – Jeudi</dt><dd>09h00 – 20h00</dd></div><div><dt>Vendredi</dt><dd>09h00 – 17h00</dd></div><div><dt>Samedi</dt><dd>Fermé</dd></div><div><dt>Dimanche</dt><dd>09h00 – 20h00</dd></div></dl></div>
        </div>
      </section>

      <section className="quote-section" id="devis"><div className="shell"><QuoteWorkflow /></div></section>

      <section className="section final-cta" id="contact"><div className="shell final-cta-inner"><div><p className="eyebrow eyebrow-light">Contact direct</p><h2>Besoin d’expliquer la situation maintenant ?</h2><p>Appelez directement ou envoyez une demande détaillée avec vos photographies.</p></div><div className="final-actions"><a className="button button-light" href={`tel:${PHONE_LINK}`}><PhoneIcon />{PHONE_DISPLAY}</a><a className="button button-red" href="#devis">Demander un devis <ArrowIcon /></a></div></div></section>

      <SiteFooter />
    </main>
  );
}
