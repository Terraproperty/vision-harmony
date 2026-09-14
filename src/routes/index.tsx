import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  Activity, ArrowRight, Baby, CalendarCheck, Check, ChevronRight, CircleCheck,
  Clock3, Eye, Facebook, Glasses, HeartHandshake, Instagram, Languages, MapPin,
  Menu, MessageCircle, Microscope, Phone, ScanEye, ShieldCheck, Sparkles,
  Stethoscope, Users, X, ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { clinic, copy, faqs, services, type Language } from "@/lib/clinic-content";
import doctorImage from "@/assets/lead-ophthalmologist.jpg";
import irisImage from "@/assets/iris-technology.jpg";

const seoFaqs = faqs.map((faq) => ({
  "@type": "Question",
  name: faq[0],
  acceptedAnswer: { "@type": "Answer", text: faq[2] },
}));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Eye Clinic in Bihar | Aarogya Vision" },
      { name: "description", content: "Modern eye checkups, cataract, glaucoma, retina and children’s eye care in Bihar. Book your eye specialist appointment by phone or WhatsApp." },
      { property: "og:title", content: "Premium Eye Clinic in Bihar | Aarogya Vision" },
      { property: "og:description", content: "Compassionate specialist eye care with modern diagnostics for families across Bihar." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "MedicalClinic", name: clinic.name.en, medicalSpecialty: "Ophthalmology", address: { "@type": "PostalAddress", addressRegion: "Bihar", addressCountry: "IN" }, telephone: clinic.phone },
          { "@type": "Physician", name: clinic.doctor, medicalSpecialty: "Ophthalmology", worksFor: { "@type": "MedicalClinic", name: clinic.name.en } },
          { "@type": "FAQPage", mainEntity: seoFaqs },
          { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "/" }] },
        ],
      }),
    }],
  }),
  component: Index,
});

const serviceIcons = [Eye, Sparkles, Activity, ScanEye, Baby, Glasses, ShieldCheck, ZoomIn];

function Index() {
  const [language, setLanguage] = useState<Language>("en");
  const [largeText, setLargeText] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const appointmentMessage = language === "en"
    ? `Hello, I would like to book an appointment at ${clinic.name.en}.\n\nPatient Name:\nPreferred Date:\nPreferred Time:\nEye Problem:`
    : `नमस्ते, मैं ${clinic.name.hi} में अपॉइंटमेंट बुक करना चाहता/चाहती हूँ।\n\nनाम:\nपसंदीदा तारीख:\nसमय:\nआंखों की समस्या:`;
  const whatsappUrl = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(appointmentMessage)}`;

  return (
    <div lang={language === "hi" ? "hi" : "en"} className={largeText ? "text-[18px]" : "text-base"}>
      <a href="#home" className="fixed left-3 top-3 z-[80] -translate-y-20 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:translate-y-0">Skip to content</a>
      <Header language={language} setLanguage={setLanguage} largeText={largeText} setLargeText={setLargeText} menuOpen={menuOpen} setMenuOpen={setMenuOpen} whatsappUrl={whatsappUrl} />

      <section id="home" className="relative min-h-[90svh] overflow-hidden bg-mist pt-24">
        <div className="clinic-container grid min-h-[calc(90svh-6rem)] items-center gap-10 py-10 lg:grid-cols-[1.04fr_.96fr] lg:py-16">
          <div className="relative z-10 reveal-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ocean/20 bg-background px-4 py-2 text-sm font-semibold text-primary shadow-clinic">
              <span className="size-2 rounded-full bg-accent" /> {t.badge}
            </div>
            <p className="mb-3 font-semibold uppercase text-ocean">{clinic.name[language]} · [City], Bihar</p>
            <h1 className="max-w-3xl whitespace-pre-line text-balance text-5xl font-semibold leading-[.96] text-primary sm:text-6xl lg:text-8xl">{t.heroTitle}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">{t.heroText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg"><a href={whatsappUrl} target="_blank" rel="noreferrer"><CalendarCheck />{t.book}</a></Button>
              <Button asChild size="lg" variant="outline"><a href={clinic.phoneHref}><Phone />{t.call}</a></Button>
              <Button asChild size="lg" variant="link"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle />{t.whatsapp}</a></Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border pt-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {t.trust.map((item) => <div key={item} className="flex items-start gap-2 text-sm font-semibold text-foreground"><CircleCheck className="mt-0.5 size-4 shrink-0 text-ocean" />{item}</div>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl self-end lg:mx-0">
            <div className="absolute -left-6 top-20 z-20 hidden rounded-md border border-border bg-background p-4 shadow-clinic-lg sm:block">
              <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-accent/50"><ShieldCheck className="text-primary" /></span><div><p className="text-xs text-muted-foreground">{language === "en" ? "Specialist-led care" : "विशेषज्ञ देखभाल"}</p><p className="font-bold text-primary">{language === "en" ? "Clear. Careful. Kind." : "स्पष्ट। सावधान। संवेदनशील।"}</p></div></div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[10rem] rounded-b-md bg-secondary shadow-clinic-lg">
              <img src={doctorImage} alt="Ophthalmologist in a modern eye examination room" width={1200} height={1504} fetchPriority="high" className="size-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-primary/92 p-5 text-primary-foreground sm:p-6">
                <p className="text-lg font-semibold">{clinic.doctor}</p><p className="text-sm text-primary-foreground/80">{t.founderRole}</p>
              </div>
            </div>
            <div className="absolute -right-3 top-12 size-28 overflow-hidden rounded-full border-4 border-background shadow-clinic-lg sm:size-36">
              <img src={irisImage} alt="Detailed iris diagnostic visualization" width={1600} height={1008} className="size-full object-cover" />
              <div className="absolute inset-2 rounded-full border border-accent [animation:orbit_12s_linear_infinite]" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-primary py-6 text-primary-foreground" aria-label="Clinic trust highlights">
        <div className="clinic-container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[t.years, t.patients, "[4.9/5]", "[City], Bihar"].map((value, i) => <div key={value} className="border-primary-foreground/20 lg:border-r lg:last:border-0"><p className="text-2xl font-bold">{value}</p><p className="text-sm text-primary-foreground/70">{[t.yearsLabel, t.patientsLabel, language === "en" ? "Patient rating" : "मरीज़ रेटिंग", language === "en" ? "Accessible location" : "आसान लोकेशन"][i]}</p></div>)}
        </div>
      </section>

      <section id="about" className="section-space bg-background">
        <div className="clinic-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-md bg-secondary"><img src={doctorImage} alt="Lead eye specialist at the clinic" width={1200} height={1504} loading="lazy" className="size-full object-cover" /></div>
            <div className="absolute -bottom-6 right-3 max-w-[15rem] rounded-md border border-border bg-background p-5 shadow-clinic-lg sm:right-[-1.5rem]">
              <Eye className="mb-3 text-ocean" /><p className="font-display text-xl font-semibold leading-snug text-primary">{language === "en" ? "Your sight deserves unhurried attention." : "आपकी नज़र को पूरा समय और ध्यान मिलना चाहिए।"}</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={t.founderEyebrow} title={t.founderTitle} />
            <div className="mt-8 border-l-2 border-accent pl-5"><h3 className="text-3xl font-semibold text-primary">{clinic.doctor}</h3><p className="mt-1 font-semibold text-ocean">{t.founderRole}</p><p className="mt-1 text-muted-foreground">{clinic.qualification} · {t.founderSpeciality}</p></div>
            <blockquote className="mt-8 font-display text-2xl leading-relaxed text-foreground">{t.founderQuote}</blockquote>
            <div className="mt-7 grid grid-cols-2 gap-4 border-y border-border py-5"><Stat value={t.years} label={t.yearsLabel} /><Stat value={t.patients} label={t.patientsLabel} /></div>
            <div className="mt-7 flex flex-wrap gap-3"><Button variant="outline">{t.profile}<ArrowRight /></Button><Button asChild><a href={whatsappUrl} target="_blank" rel="noreferrer">{t.clinicWhatsapp}</a></Button></div>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">* {t.placeholder}</p>
          </div>
        </div>
      </section>

      <section id="services" className="section-space bg-muted">
        <div className="clinic-container">
          <div className="grid items-end gap-6 lg:grid-cols-2"><SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} /><p className="max-w-xl text-lg text-muted-foreground lg:justify-self-end">{t.servicesIntro}</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => {
              const Icon = serviceIcons[i];
              return <article key={service[0]} className="group min-h-72 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-mist">
                <span className="grid size-12 place-items-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-accent"><Icon /></span>
                <h3 className="mt-6 text-xl font-semibold leading-snug text-primary">{service[language === "en" ? 0 : 1]}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{service[language === "en" ? 2 : 3]}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-ocean"><a href="#contact" className="inline-flex items-center gap-1">{t.learn}<ChevronRight className="size-4" /></a><a href={whatsappUrl} target="_blank" rel="noreferrer">{t.consult}</a></div>
              </article>;
            })}
          </div>
          <p className="mt-4 text-sm font-semibold text-muted-foreground">* {language === "en" ? "Services are illustrative and should be confirmed before publishing." : "सेवाएं उदाहरण हैं; प्रकाशित करने से पहले पुष्टि करें।"}</p>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="clinic-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><SectionHeading eyebrow={t.whyEyebrow} title={t.whyTitle} /><p className="mt-5 text-lg text-muted-foreground">{t.whyIntro}</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [Stethoscope, "Experienced doctors", "अनुभवी डॉक्टर"], [Microscope, "Modern diagnostics", "आधुनिक जांच"], [HeartHandshake, "Personalized treatment", "व्यक्तिगत इलाज"], [ShieldCheck, "Transparent guidance", "साफ़ और सही सलाह"], [Users, "Patient-friendly environment", "मरीज़ों के लिए सहज माहौल"], [CalendarCheck, "Easy appointment booking", "आसान अपॉइंटमेंट"],
            ].map(([Icon, en, hi]) => <div key={String(en)} className="flex min-h-24 items-center gap-4 border-b border-border p-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/50"><Icon className="size-5 text-primary" /></span><p className="font-bold text-primary">{language === "en" ? en as string : hi as string}</p></div>)}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-primary text-primary-foreground">
        <div className="clinic-container grid lg:grid-cols-2">
          <div className="section-space lg:pr-16"><SectionHeading eyebrow={t.cataractEyebrow} title={t.cataractTitle} inverse /><p className="mt-6 max-w-xl text-lg text-primary-foreground/75">{t.cataractText}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">{(language === "en" ? ["Modern diagnostics", "Advanced lens guidance", "Experienced surgeon", "Pre-operative consultation", "Post-operative support"] : ["आधुनिक जांच", "लेंस की सही जानकारी", "अनुभवी सर्जन", "सर्जरी से पहले परामर्श", "सर्जरी के बाद सहायता"]).map((x) => <p key={x} className="flex items-center gap-2 font-semibold"><Check className="size-5 text-accent" />{x}</p>)}</div>
            <Button asChild variant="aqua" size="lg" className="mt-9"><a href={whatsappUrl} target="_blank" rel="noreferrer">{t.cataractCta}<ArrowRight /></a></Button>
          </div>
          <div className="relative min-h-[28rem] overflow-hidden lg:min-h-full"><img src={irisImage} alt="Advanced cataract and iris examination visual" width={1600} height={1008} loading="lazy" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-primary/15" /><div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 [animation:orbit_18s_linear_infinite]"><span className="absolute -top-1 left-1/2 size-3 rounded-full bg-accent" /></div></div>
        </div>
      </section>

      <section id="technology" className="section-space bg-mist">
        <div className="clinic-container"><div className="mx-auto max-w-3xl text-center"><SectionHeading eyebrow={t.technologyEyebrow} title={t.technologyTitle} centered /><p className="mt-5 text-muted-foreground">{t.technologyText}</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">{[
            [ScanEye, "Digital eye testing", "डिजिटल आंखों की जांच"], [Eye, "Retina imaging", "रेटिना इमेजिंग"], [Microscope, "Slit lamp examination", "स्लिट लैंप जांच"], [Activity, "Eye pressure screening", "आंखों के दबाव की जांच"], [Glasses, "Computerized vision testing", "कंप्यूटर से नज़र की जांच"], [Sparkles, "Modern surgical technology", "आधुनिक सर्जिकल तकनीक"],
          ].map(([Icon, en, hi], i) => <article key={String(en)} className={`border border-border bg-background p-7 shadow-clinic ${i === 0 ? "md:col-span-2" : ""}`}><Icon className="size-7 text-ocean" /><h3 className="mt-7 text-2xl font-semibold text-primary">{language === "en" ? en as string : hi as string}</h3><p className="mt-2 text-sm text-muted-foreground">{t.placeholder}</p></article>)}</div>
        </div>
      </section>

      <section id="doctors" className="section-space bg-background">
        <div className="clinic-container"><SectionHeading eyebrow={t.teamEyebrow} title={t.teamTitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[
            ["Dr. [Name]", "Eye Specialist", "नेत्र विशेषज्ञ", Stethoscope], ["[Name]", "Optometrist", "ऑप्टोमेट्रिस्ट", Glasses], ["[Name]", "Ophthalmic Technician", "नेत्र जांच तकनीशियन", Microscope], ["[Name]", "Patient Care Coordinator", "मरीज़ सहायता टीम", HeartHandshake],
          ].map(([name, en, hi, Icon]) => <article key={String(en)} className="group overflow-hidden rounded-md border border-border bg-muted transition-all hover:-translate-y-1 hover:shadow-clinic-lg"><div className="grid aspect-[4/3] place-items-center bg-secondary"><span className="grid size-20 place-items-center rounded-full bg-background text-primary shadow-clinic"><Icon className="size-8" /></span></div><div className="p-5"><h3 className="text-xl font-semibold text-primary">{name as string}</h3><p className="font-semibold text-ocean">{language === "en" ? en as string : hi as string}</p><p className="mt-2 text-sm text-muted-foreground">{t.placeholder}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section-space bg-muted">
        <div className="clinic-container"><div className="mx-auto max-w-3xl text-center"><SectionHeading eyebrow={t.journeyEyebrow} title={t.journeyTitle} centered /></div>
          <div className="relative mt-14 grid gap-5 md:grid-cols-4">{[
            [CalendarCheck, "Book Appointment", "अपॉइंटमेंट बुक करें"], [MapPin, "Visit Clinic", "क्लिनिक आएं"], [ScanEye, "Eye Examination", "आंखों की जांच"], [HeartHandshake, "Treatment & Follow-up", "इलाज और फॉलो-अप"],
          ].map(([Icon, en, hi], i) => <div key={String(en)} className="relative border-t-2 border-accent bg-background p-6 shadow-clinic"><span className="absolute -top-5 right-5 font-display text-5xl font-semibold text-secondary">0{i + 1}</span><Icon className="size-8 text-ocean" /><h3 className="mt-7 text-xl font-semibold text-primary">{language === "en" ? en as string : hi as string}</h3></div>)}</div>
        </div>
      </section>

      <section id="testimonials" className="section-space bg-background">
        <div className="clinic-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHeading eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} /><p className="mt-5 rounded-md border border-champagne/40 bg-champagne/10 p-4 text-sm font-semibold text-foreground">{t.reviewNote}</p></div>
          <div className="grid gap-5 sm:grid-cols-2">{[1, 2].map((review) => <figure key={review} className="border border-border bg-muted p-7"><div className="text-champagne" aria-label="Five stars">★★★★★</div><blockquote className="mt-5 font-display text-2xl leading-relaxed text-primary">“{language === "en" ? "Verified patient feedback will appear here after consent is received." : "सहमति मिलने के बाद यहां मरीज़ की सही राय दिखाई जाएगी।"}”</blockquote><figcaption className="mt-7 border-t border-border pt-4"><p className="font-bold">[Patient Name]</p><p className="text-sm text-muted-foreground">[Location] · [Treatment]</p></figcaption></figure>)}</div>
        </div>
      </section>

      <section className="section-space bg-primary text-primary-foreground">
        <div className="clinic-container"><SectionHeading eyebrow={t.prepareEyebrow} title={t.prepareTitle} inverse />
          <div className="mt-10 grid gap-px overflow-hidden rounded-md bg-primary-foreground/20 sm:grid-cols-2 lg:grid-cols-3">{(language === "en" ? ["Bring previous prescriptions", "Bring your existing spectacles", "Bring previous eye reports", "Carry your medicine information", "Arrive 10–15 minutes early", "For dilation tests, bring a companion"] : ["पुराने पर्चे साथ लाएं", "अपना मौजूदा चश्मा साथ लाएं", "आंखों की पुरानी रिपोर्ट लाएं", "दवाओं की जानकारी साथ रखें", "10–15 मिनट पहले पहुंचें", "पुतली फैलाने वाली जांच के लिए किसी को साथ लाएं"]).map((item) => <div key={item} className="flex items-center gap-3 bg-primary p-5"><CircleCheck className="size-5 shrink-0 text-accent" /><p className="font-semibold">{item}</p></div>)}</div>
        </div>
      </section>

      <section id="faq" className="section-space bg-background">
        <div className="clinic-container grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} />
          <Accordion type="single" collapsible className="border-t border-border">{faqs.map((faq, i) => <AccordionItem value={`faq-${i}`} key={faq[0]}><AccordionTrigger className="py-6 text-left text-base font-bold text-primary hover:no-underline">{faq[language === "en" ? 0 : 1]}</AccordionTrigger><AccordionContent className="pb-6 pr-10 text-base leading-7 text-muted-foreground">{faq[language === "en" ? 2 : 3]}</AccordionContent></AccordionItem>)}</Accordion>
        </div>
      </section>

      <section className="bg-accent py-14">
        <div className="clinic-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div><h2 className="max-w-3xl text-balance text-4xl font-semibold text-primary sm:text-5xl">{t.ctaTitle}</h2><p className="mt-3 max-w-2xl text-accent-foreground/80">{t.ctaText}</p></div><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button asChild size="lg"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button><Button asChild size="lg" variant="outline"><a href={clinic.phoneHref}><Phone />{t.callNow}</a></Button><Button asChild size="lg" variant="outline"><a href={clinic.mapsUrl} target="_blank" rel="noreferrer"><MapPin />{t.directions}</a></Button></div></div>
      </section>

      <section id="contact" className="section-space bg-mist">
        <div className="clinic-container"><div className="grid gap-8 lg:grid-cols-2"><div><SectionHeading eyebrow={t.contactEyebrow} title={t.contactTitle} /><p className="mt-5 max-w-xl text-muted-foreground">{t.contactText}</p>
            <div className="mt-8 space-y-5"><ContactRow icon={<MapPin />} title={t.details} text={`${clinic.name[language]} · ${clinic.address}`} /><ContactRow icon={<Phone />} title={language === "en" ? "Phone & WhatsApp" : "फ़ोन और WhatsApp"} text={clinic.phone} /><ContactRow icon={<Clock3 />} title={t.hoursLabel} text={clinic.hours} /><ContactRow icon={<ShieldCheck />} title={t.emergency} text={t.emergencyText} /></div>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href={clinic.phoneHref}><Phone />{t.callNow}</a></Button><Button asChild variant="outline"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button></div>
          </div>
          <div className="grid min-h-[28rem] place-items-center overflow-hidden rounded-md border border-border bg-background p-8 text-center shadow-clinic"><div><span className="mx-auto grid size-20 place-items-center rounded-full bg-secondary"><MapPin className="size-8 text-primary" /></span><h3 className="mt-6 text-2xl font-semibold text-primary">Google Maps</h3><p className="mx-auto mt-3 max-w-sm text-muted-foreground">{t.mapPlaceholder}</p><Button asChild variant="outline" className="mt-6"><a href={clinic.mapsUrl} target="_blank" rel="noreferrer">{t.openMaps}<ArrowRight /></a></Button></div></div></div>
        </div>
      </section>

      <Footer language={language} whatsappUrl={whatsappUrl} />
      <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={t.book} className="fixed bottom-24 right-4 z-50 grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-clinic-lg transition-transform hover:scale-105 md:bottom-6 md:right-6"><MessageCircle className="size-6" /></a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background p-2 shadow-clinic-lg md:hidden"><a href={clinic.phoneHref} className="flex min-h-12 flex-col items-center justify-center text-xs font-bold text-primary"><Phone className="size-5" />{t.callNow}</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex min-h-12 flex-col items-center justify-center text-xs font-bold text-primary"><MessageCircle className="size-5" />WhatsApp</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center rounded-md bg-primary px-2 text-center text-xs font-bold text-primary-foreground">{t.book}</a></div>
    </div>
  );
}

function Header({ language, setLanguage, largeText, setLargeText, menuOpen, setMenuOpen, whatsappUrl }: { language: Language; setLanguage: (l: Language) => void; largeText: boolean; setLargeText: (v: boolean) => void; menuOpen: boolean; setMenuOpen: (v: boolean) => void; whatsappUrl: string }) {
  const t = copy[language];
  return <header className="fixed inset-x-0 top-0 z-60 border-b border-border/80 bg-background/95 backdrop-blur-md"><div className="clinic-container flex h-20 items-center justify-between gap-4">
    <a href="#home" className="flex items-center gap-3" aria-label={`${clinic.name[language]} home`}><span className="relative grid size-11 place-items-center rounded-full bg-primary text-primary-foreground"><Eye className="size-6" /><span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-background bg-accent" /></span><span><strong className="block font-display text-xl leading-none text-primary">{language === "en" ? "Aarogya Vision" : "आरोग्य विज़न"}</strong><small className="text-[11px] font-semibold uppercase text-muted-foreground">{language === "en" ? "Eye Clinic · Bihar" : "आई क्लिनिक · बिहार"}</small></span></a>
    <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">{t.nav.map((item, i) => <a key={item} href={`#${t.navIds[i]}`} className="text-sm font-semibold text-foreground transition-colors hover:text-ocean">{item}</a>)}</nav>
    <div className="hidden items-center gap-2 md:flex"><button type="button" onClick={() => setLargeText(!largeText)} aria-label={largeText ? t.normal : t.larger} title={largeText ? t.normal : t.larger} className="grid size-11 place-items-center rounded-md border border-border bg-background text-primary hover:bg-muted"><span className="font-bold">A{largeText ? "−" : "+"}</span></button><div className="flex min-h-11 items-center rounded-md border border-border p-1" aria-label="Language"><button type="button" onClick={() => setLanguage("en")} className={`min-h-9 rounded px-3 text-sm font-bold ${language === "en" ? "bg-primary text-primary-foreground" : "text-foreground"}`}>EN</button><button type="button" onClick={() => setLanguage("hi")} className={`min-h-9 rounded px-3 text-sm font-bold ${language === "hi" ? "bg-primary text-primary-foreground" : "text-foreground"}`}>हिंदी</button></div><Button asChild size="icon" variant="outline"><a href={clinic.phoneHref} aria-label={t.call}><Phone /></a></Button><Button asChild><a href={whatsappUrl} target="_blank" rel="noreferrer">{t.book}</a></Button></div>
    <Button type="button" variant="outline" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={t.menu}>{menuOpen ? <X /> : <Menu />}</Button>
  </div>{menuOpen && <nav className="border-t border-border bg-background px-4 pb-5 md:hidden" aria-label="Mobile navigation"><div className="grid grid-cols-2 gap-1 py-3">{t.nav.map((item, i) => <a key={item} href={`#${t.navIds[i]}`} onClick={() => setMenuOpen(false)} className="min-h-11 rounded-md px-3 py-2 font-semibold text-foreground hover:bg-muted">{item}</a>)}</div><div className="flex items-center gap-2"><Button type="button" variant={language === "en" ? "default" : "outline"} onClick={() => setLanguage("en")}>EN</Button><Button type="button" variant={language === "hi" ? "default" : "outline"} onClick={() => setLanguage("hi")}>हिंदी</Button><Button type="button" variant="outline" size="icon" onClick={() => setLargeText(!largeText)} aria-label={largeText ? t.normal : t.larger}><Languages /></Button></div></nav>}</header>;
}

function SectionHeading({ eyebrow, title, centered = false, inverse = false }: { eyebrow: string; title: string; centered?: boolean; inverse?: boolean }) {
  return <div className={centered ? "text-center" : ""}><p className={`mb-4 text-sm font-bold uppercase ${inverse ? "text-accent" : "text-ocean"}`}>{eyebrow}</p><h2 className={`text-balance text-4xl font-semibold leading-tight sm:text-5xl ${inverse ? "text-primary-foreground" : "text-primary"}`}>{title}</h2></div>;
}

function Stat({ value, label }: { value: string; label: string }) { return <div><p className="text-2xl font-bold text-primary">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>; }

function ContactRow({ icon, title, text }: { icon: ReactNode; title: string; text: string }) { return <div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/50 text-primary">{icon}</span><div><p className="font-bold text-primary">{title}</p><p className="mt-1 text-muted-foreground">{text}</p></div></div>; }

function Footer({ language, whatsappUrl }: { language: Language; whatsappUrl: string }) {
  const groups = language === "en" ? [
    ["Clinic", "About Us", "Our Doctors", "Our Team"], ["Services", "Eye Examination", "Cataract", "Glaucoma", "Retina", "Pediatric Eye Care"], ["Patient Support", "Book Appointment", "FAQ", "Contact", "Directions"], ["Legal", "Privacy Policy", "Terms", "Medical Disclaimer"],
  ] : [["क्लिनिक", "हमारे बारे में", "हमारे डॉक्टर", "हमारी टीम"], ["सेवाएं", "आंखों की जांच", "मोतियाबिंद", "काला मोतिया", "रेटिना", "बच्चों की आई केयर"], ["मरीज़ सहायता", "अपॉइंटमेंट", "सवाल", "संपर्क", "रास्ता"], ["कानूनी", "गोपनीयता नीति", "नियम", "चिकित्सा अस्वीकरण"]];
  return <footer className="bg-primary pb-24 pt-16 text-primary-foreground md:pb-8"><div className="clinic-container"><div className="grid gap-10 border-b border-primary-foreground/20 pb-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]"><div><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground"><Eye /></span><strong className="font-display text-2xl">{clinic.name[language]}</strong></div><p className="mt-5 max-w-sm text-sm text-primary-foreground/70">{copy[language].footerText}</p><div className="mt-6 flex gap-2"><a href="#" aria-label="Facebook" className="grid size-11 place-items-center rounded-full border border-primary-foreground/25"><Facebook className="size-5" /></a><a href="#" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-primary-foreground/25"><Instagram className="size-5" /></a></div></div>{groups.map((group) => <div key={group[0]}><h3 className="font-sans text-sm font-bold uppercase text-accent">{group[0]}</h3><ul className="mt-4 space-y-3">{group.slice(1).map((item, i) => <li key={item}><a href={group[0] === "Patient Support" && i === 0 ? whatsappUrl : "#home"} className="text-sm text-primary-foreground/70 hover:text-primary-foreground">{item}</a></li>)}</ul></div>)}</div><div className="flex flex-col gap-3 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between"><p>© 2026 {clinic.name.en}. {language === "en" ? "All rights reserved." : "सर्वाधिकार सुरक्षित।"}</p><p>{language === "en" ? "Placeholder details must be verified before publishing." : "प्रकाशित करने से पहले सभी जानकारी की पुष्टि ज़रूरी है।"}</p></div></div></footer>;
}