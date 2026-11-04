// Homepage copy, EN + ES, copied verbatim from the approved prototype
// (~/prototypes/jufipai-relaunch-APPROVED-20261104/build.js, HOME). One source for both
// languages so they stay in step. The approved prototype is the spec: change copy there first.
//
// NEUTRAL by operator ruling 2026-11-04: no people, no clients, no sites, no city or state.
// The customer banner (CustomerBanner.astro) is the only place a customer is named.
//
// Figures: the prototype showed placeholder "N" + "verify" chips. The operator approved the real
// figures on 2026-11-04 (read-only aggregate pull, as-of 2026-11-04T21:11:51Z) and a no-number wording for
// the cost/time FAQ answers. Property statuses match the app's data: active, archived, land.

export type Lang = 'en' | 'es';

export const CALENDLY_URL = 'https://calendly.com/contact-jufipai/30min';

export interface SystemCase {
  img: string;
  title: string;
  problem: string;
  built: string;
  result: string;
}

export interface HomeCopy {
  title: string;
  desc: string;
  eyebrow: string;
  h1: string;
  lede: string;
  cta: string;
  see: string;
  label: string;
  h2: string;
  intro: string;
  featuredFlag: string;
  sampleAlt: string;
  featured: SystemCase & { alt: string; featL: string; feats: [string, string][] };
  p: string;
  b: string;
  r: string;
  cases: SystemCase[];
  howL: string;
  howH: string;
  how: [string, string][];
  whoStrong: string;
  whoText: string;
  faqL: string;
  faqH: string;
  faq: [string, string][];
  endH: string;
  endS: string;
}

export const HOME: Record<Lang, HomeCopy> = {
  en: {
    title: 'JufipAI · Software for property, staffing and safety operations',
    desc: 'Software that runs property, staffing and safety operations. We build it and we run it, every day.',
    eyebrow: 'For property, staffing and safety teams across the USA',
    h1: 'Software that runs property, staffing and safety operations — every day',
    lede: 'We build it and we run it. The property books, the time clock, the application: in use every day, at every site.',
    cta: 'Book a 30-minute call',
    see: 'See the systems',
    label: 'In production',
    h2: 'Property management first. Five more systems running every day.',
    intro:
      "Six systems in production. Property management leads; the other five run a staffing company's day, from the first application to the payroll week. Screenshots use sample data.",
    featuredFlag: 'Featured system',
    sampleAlt: 'Sample screenshot',
    featured: {
      img: 'property',
      title: 'Property management',
      alt: 'Sample screenshot: property profit and loss dashboard with a vendor invoice list',
      problem:
        'Rent, repairs and vendor bills spread across spreadsheets, email and PDF invoices. Nobody could say which property made money this month.',
      built:
        'One app for every property: income and expenses by month, profit and margin per property, and vendor invoices read straight from the PDF.',
      result: '60 properties tracked, each with its own profit and loss.',
      featL: 'What it does',
      feats: [
        ['Every property in one place', 'Each property with its status: active, archived or land.'],
        ['Income and expenses by category', 'Monthly entries per property: repairs, cleaning and maintenance, management fees, HOA and more.'],
        ['Next month in one click', 'Recurring entries carried forward from last month.'],
        ['Profit, loss and margin', 'Per property and across all properties.'],
        ['Vendor invoices from a PDF', 'Upload the PDF; it is read and filed. See total invoiced, paid, balance due and payment rate.'],
        ['Your spreadsheets in and out', 'Import from Excel. Export with a preview first.'],
      ],
    },
    p: 'Problem',
    b: 'What we built',
    r: 'Result',
    cases: [
      { img: 'clock', title: 'Digital time clock', problem: 'Paper sign-in sheets, retyped into payroll every Monday.', built: 'A tablet kiosk at each site. Associates tap their name to clock in and out. Each week closes ready for payroll.', result: 'Runs at 7 client sites, every shift.' },
      { img: 'jobs', title: 'Job board', problem: 'Openings posted by hand on several sites, out of date by Friday.', built: 'One job board the recruiters update themselves. Candidates apply on the posting, then continue to the full application.', result: 'Recruiters post and update every opening themselves.' },
      { img: 'application', title: 'Online application', problem: 'Paper packets, half filled, and a second trip to the office to sign tax forms.', built: 'A phone-first application in English and Spanish. An uploaded resume is read for skills, so recruiters can match applicants to open roles. The W-4 and I-9 are signed on the phone, by link.', result: '5,000+ applications submitted.' },
      { img: 'idcheck', title: 'ID and work-authorization checks', problem: 'Document copies in a folder, and expiration dates nobody watched.', built: 'A review queue for every ID and work-authorization document. Expiring documents are flagged before the date.', result: 'Expiring documents flagged 30 days ahead.' },
      { img: 'safety', title: 'Safety case files', problem: 'Near misses mentioned in passing and never written down.', built: 'A phone form for near-miss and injury reports. Each report becomes a case with a timeline and a PDF case file.', result: 'A case file opens the moment a report is submitted.' },
    ],
    howL: 'How we work',
    howH: 'Three steps, in this order',
    how: [
      ['A 30-minute call', 'You tell us how the work runs today, where it breaks, and who touches it.'],
      ['We map the process', 'Every step, every handoff, every form, written down. We agree on what the first version does.'],
      ['We build it and run it', 'You use a first version in real work. We keep it running: updates, fixes and backups.'],
    ],
    whoStrong: 'One builder, start to finish',
    whoText:
      'Every system on this page is built and run by the same small team. On a call, you talk to the person who writes the code.',
    faqL: 'Questions',
    faqH: 'Before you book',
    faq: [
      ['What does it cost?', 'You get a fixed price after the first call, before any work starts.'],
      ['How long does it take?', 'A first version you can use comes first. Bigger systems ship in parts, so you use the first part while the next one is built.'],
      ['Who owns the code and the data?', 'You do. The code and the data live in accounts in your name, and you hold the keys.'],
      ['Do you support Spanish?', 'Yes. Every screen an associate sees is built in English and Spanish, written for Latin American readers. The application and time clock on this page already work this way.'],
    ],
    endH: 'Tell us where the work breaks.',
    endS: '30 minutes. No slides.',
  },
  es: {
    title: 'JufipAI · Software para operaciones de propiedades, personal y seguridad',
    desc: 'Software que mantiene en marcha las operaciones de propiedades, personal y seguridad. Lo construimos y lo operamos todos los días.',
    eyebrow: 'Para equipos de propiedades, personal y seguridad en todo Estados Unidos',
    h1: 'Software para operaciones de propiedades, personal y seguridad — todos los días',
    lede: 'Lo construimos y lo operamos. Las cuentas de sus propiedades, el reloj checador, la solicitud de empleo: en uso todos los días, en cada sitio.',
    cta: 'Agende una llamada de 30 minutos',
    see: 'Vea los sistemas',
    label: 'En producción',
    h2: 'Primero, la administración de propiedades. Cinco sistemas más, funcionando todos los días.',
    intro:
      'Seis sistemas en producción. La administración de propiedades va primero; los otros cinco sostienen el día de una empresa de personal, desde la primera solicitud hasta la semana de nómina. Las capturas usan datos de muestra.',
    featuredFlag: 'Sistema destacado',
    sampleAlt: 'Captura de muestra',
    featured: {
      img: 'property',
      title: 'Administración de propiedades',
      alt: 'Captura de muestra: panel de ganancias y pérdidas por propiedad con una lista de facturas de proveedores',
      problem:
        'Rentas, reparaciones y facturas de proveedores repartidas entre hojas de cálculo, correo y facturas en PDF. Nadie podía decir qué propiedad dejó ganancia este mes.',
      built:
        'Una sola aplicación para todas sus propiedades: ingresos y gastos por mes, ganancia y margen por propiedad, y facturas de proveedores leídas directo del PDF.',
      result: '60 propiedades registradas, cada una con su propio estado de resultados.',
      featL: 'Lo que hace',
      feats: [
        ['Todas sus propiedades en un solo lugar', 'Cada propiedad con su estado: activa, archivada o terreno.'],
        ['Ingresos y gastos por categoría', 'Registros mensuales por propiedad: reparaciones, limpieza y mantenimiento, administración, HOA y más.'],
        ['El mes siguiente con un clic', 'Los registros recurrentes se copian del mes anterior.'],
        ['Ganancia, pérdida y margen', 'Por propiedad y en todas sus propiedades.'],
        ['Facturas de proveedores desde un PDF', 'Suba el PDF; se lee y se archiva. Vea el total facturado, lo pagado, el saldo pendiente y la tasa de pago.'],
        ['Sus hojas de cálculo: importar y exportar', 'Importe desde Excel. Exporte con una vista previa primero.'],
      ],
    },
    p: 'Problema',
    b: 'Lo que construimos',
    r: 'Resultado',
    cases: [
      { img: 'clock', title: 'Reloj checador digital', problem: 'Hojas de firma en papel, capturadas de nuevo en nómina cada lunes.', built: 'Una tableta en cada sitio. Los asociados tocan su nombre para registrar entrada y salida. Cada semana cierra lista para nómina.', result: 'Funciona en 7 sitios de clientes, en cada turno.' },
      { img: 'jobs', title: 'Bolsa de trabajo', problem: 'Vacantes publicadas a mano en varios sitios, desactualizadas para el viernes.', built: 'Una sola bolsa de trabajo que los reclutadores actualizan. La persona aplica en la vacante y luego continúa con la solicitud completa.', result: 'Los reclutadores publican y actualizan cada vacante ellos mismos.' },
      { img: 'application', title: 'Solicitud de empleo en línea', problem: 'Paquetes en papel a medio llenar y una segunda visita a la oficina para firmar formularios de impuestos.', built: 'Una solicitud pensada para el celular, en inglés y en español. El currículum que se sube se lee para encontrar habilidades, así los reclutadores relacionan a cada persona con las vacantes abiertas. El W-4 y el I-9 se firman en el celular, con un enlace.', result: 'Más de 5,000 solicitudes enviadas.' },
      { img: 'idcheck', title: 'Revisión de identificación y permiso de trabajo', problem: 'Copias de documentos en una carpeta y fechas de vencimiento que nadie vigilaba.', built: 'Una lista de revisión para cada identificación y permiso de trabajo. Los documentos por vencer se marcan antes de la fecha.', result: 'Los documentos por vencer se señalan con 30 días de anticipación.' },
      { img: 'safety', title: 'Expedientes de seguridad', problem: 'Casi accidentes mencionados de pasada y nunca registrados.', built: 'Un formulario en el celular para reportar casi accidentes y lesiones. Cada reporte se vuelve un caso con su cronología y un expediente en PDF.', result: 'El expediente se abre en el momento en que se envía el reporte.' },
    ],
    howL: 'Cómo trabajamos',
    howH: 'Tres pasos, en este orden',
    how: [
      ['Una llamada de 30 minutos', 'Usted nos cuenta cómo funciona el trabajo hoy, dónde falla y quién participa.'],
      ['Mapeamos el proceso', 'Cada paso, cada entrega y cada formulario, por escrito. Acordamos qué hace la primera versión.'],
      ['Lo construimos y lo operamos', 'Usted usa una primera versión en el trabajo real. Nosotros la mantenemos funcionando: cambios, correcciones y respaldos.'],
    ],
    whoStrong: 'Un solo equipo, de principio a fin',
    whoText:
      'El mismo equipo pequeño construye y opera cada sistema de esta página. En la llamada, usted habla con la persona que escribe el código.',
    faqL: 'Preguntas',
    faqH: 'Antes de agendar',
    faq: [
      ['¿Cuánto cuesta?', 'Usted recibe un precio fijo después de la primera llamada, antes de empezar cualquier trabajo.'],
      ['¿Cuánto tiempo toma?', 'Primero llega una versión que usted ya puede usar. Los sistemas más grandes se entregan por partes, así que usted usa la primera mientras se construye la siguiente.'],
      ['¿De quién son el código y los datos?', 'Suyos. El código y los datos viven en cuentas a su nombre, y usted tiene las llaves.'],
      ['¿Trabajan en español?', 'Sí. Cada pantalla que ve un asociado se hace en inglés y en español, escrita para lectores de Latinoamérica. La solicitud de empleo y el reloj checador de esta página ya funcionan así.'],
    ],
    endH: 'Cuéntenos dónde se atora el trabajo.',
    endS: '30 minutos. Sin presentaciones.',
  },
};

/** Site chrome strings (header + footer), from the prototype's T table. */
export const CHROME = {
  en: {
    homeLabel: 'JufipAI Home',
    navLabel: 'Main navigation',
    langLabel: 'Language',
    cta: 'Book a call',
    built: 'Built in the USA',
    touch: 'Get in touch',
    nlH: 'One email when we ship something new',
    nlP: 'No pop-ups. Unsubscribe in one click.',
    nlL: 'Email address',
    nlPh: 'you@company.com',
    nlB: 'Subscribe',
  },
  es: {
    homeLabel: 'JufipAI Inicio',
    navLabel: 'Navegación principal',
    langLabel: 'Idioma',
    cta: 'Agendar llamada',
    built: 'Hecho en Estados Unidos',
    touch: 'Contáctenos',
    nlH: 'Un correo cuando lanzamos algo nuevo',
    nlP: 'Sin ventanas emergentes. Cancele con un clic.',
    nlL: 'Correo electrónico',
    nlPh: 'usted@empresa.com',
    nlB: 'Suscribirme',
  },
} as const;
