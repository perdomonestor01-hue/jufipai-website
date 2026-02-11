/**
 * EN/ES Language System
 */
import { initAudio, getAudioContext, isAudioEnabled } from './audio';

// Service data for popup content

// English service data with detailed descriptions
const serviceDetails: Record<string, { icon: string; title: string; content: string }> = {
    'AI + Automation Integration': {
        icon: 'fas fa-robot',
        title: 'AI + Automation Integration',
        content: `
            <p>Beyond basic AI deployment - we create <span class="highlight">intelligent automation that connects ChatGPT, Claude, Groq, and DeepSeek</span> with your existing systems, eliminating human intervention entirely.</p>

            <p><span class="highlight">How AI + Automation is the perfect solution for every business across industries:</span> Our multi-AI orchestration approach ensures you're never locked into a single provider. When ChatGPT is down, Claude takes over. When you need speed, Groq processes your requests. This redundancy and specialization means <span class="highlight">99.9% uptime and optimal performance</span> for every task.</p>

            <p>Whether you're in <span class="highlight">real estate</span> - instead of responding to boring and repetitive emails, the automations could do it for you and you just focus on showings and applications. Or if you're a <span class="highlight">healthcare professional</span> automating patient records, retail optimizing inventory, or finance processing transactions - our AI agents work 24/7 across <span class="highlight">every industry</span> because they adapt to your specific business logic, not the other way around.</p>
        `
    },
    'Google Workspace Automation': {
        icon: 'fab fa-google',
        title: 'Google Workspace Automation',
        content: `
            <p>Transform Google Workspace from a tool into an <span class="highlight">intelligent ecosystem</span>. Automated workflows, smart document processing, and zero-touch data management.</p>

            <p><span class="highlight">Workspace is free and don't require high cost licensing</span> - that's exactly why it's the perfect foundation for automation. While competitors charge thousands for enterprise software, we turn your existing free Google tools into a powerful AI-driven business platform.</p>

            <p>Imagine Gmail automatically sorting and responding to customer inquiries, Google Sheets updating themselves with real-time data from multiple sources, and Google Docs generating reports that write themselves. All using tools you <span class="highlight">already have and pay nothing extra for</span>.</p>
        `
    },
    'QR Code Training & Automation': {
        icon: 'fas fa-qrcode',
        title: 'QR Code Training & Automation',
        content: `
            <p>Smart QR systems that don't just provide information - they <span class="highlight">trigger automated training workflows, track progress, and adapt content</span> based on user behavior.</p>

            <p><span class="highlight">This is the best way when training 100+ associate or conference and you want to quiz them or collect emails in your conference.</span> Instead of manual sign-ins and paper forms, one QR code scan instantly:</p>

            <p>\u2022 Registers the participant<br>
            \u2022 Delivers personalized training content<br>
            \u2022 Tracks completion rates<br>
            \u2022 Collects feedback automatically<br>
            \u2022 Generates completion certificates<br>
            \u2022 Builds your email database</p>

            <p>Perfect for <span class="highlight">conferences, employee onboarding, compliance training, and customer education</span> - all automated from a simple QR scan.</p>
        `
    },
    'Self-Generating Reports': {
        icon: 'fas fa-chart-bar',
        title: 'Self-Generating Reports',
        content: `
            <p>Reports that create themselves. Our AI agents <span class="highlight">continuously monitor your data, generate insights, and deliver comprehensive reports</span> without any manual input.</p>

            <p><span class="highlight">Instead of waiting for somebody to send you the report at certain date and time, we can automate sending those without waiting for somebody to perform the task.</span> Your reports arrive in your inbox before you even think to ask for them.</p>

            <p>Sales reports that analyze trends and predict next month's performance. Financial reports that highlight anomalies and suggest cost-saving opportunities. Marketing reports that identify your best-performing channels and recommend budget allocation.</p>

            <p>All generated automatically, delivered on schedule, and <span class="highlight">more insightful than manual reports</span> because AI never gets tired or misses patterns humans overlook.</p>
        `
    },
    'Complete Task Elimination': {
        icon: 'fas fa-magic-wand-sparkles',
        title: 'Complete Task Elimination',
        content: `
            <p>We don't just automate tasks - we <span class="highlight">eliminate them entirely</span>. Our intelligent agents handle entire workflows from start to finish, learning and improving continuously.</p>

            <p><span class="highlight">Why to put your most valuable assets to do tire and boring repetitive tasks</span> we can show you how to collect or extract information automatically.</p>

            <p>Customer service inquiries answered instantly. Data entry completed before you finish your coffee. Invoices processed and payments reconciled while you sleep. Inventory reordered automatically when stock runs low.</p>

            <p>This isn't about making tasks faster - it's about <span class="highlight">making them disappear completely</span> so your team can focus on what humans do best: thinking, creating, and building relationships.</p>
        `
    },
    'AI Transformation Strategy': {
        icon: 'fas fa-brain',
        title: 'AI Transformation Strategy',
        content: `
            <p>We identify <span class="highlight">every manual process in your business</span> and create autonomous AI agents to handle them, delivering unprecedented cost savings and efficiency.</p>

            <p><span class="highlight">Transform your business if you are willing to flip your mindset</span> making your company more profitable, let's work together.</p>

            <p>We audit your entire operation, map every manual touchpoint, and design AI agents that don't just replace human tasks - they <span class="highlight">improve them beyond human capability</span>. Faster processing, 24/7 availability, zero errors, and continuous learning.</p>

            <p>The companies thriving in 2025 aren't the ones with the most employees - they're the ones with the <span class="highlight">smartest automation</span>. Please implement with a crew of agents.</p>
        `
    },
    'Free Diagnosis': {
        icon: 'fas fa-stethoscope',
        title: 'Free Diagnosis',
        content: `
            <p>We provide a <span class="highlight">comprehensive analysis of your current workflows</span> at absolutely no cost. Our team examines every aspect of your business operations to identify automation opportunities.</p>

            <p><span class="highlight">Why do we do this for free?</span> Because we're confident that once you see the potential savings and efficiency gains, you'll want to move forward. We analyze your processes, identify bottlenecks, and calculate the exact cost and time savings automation will deliver.</p>

            <p>During our free diagnosis, we map out your current manual tasks, estimate the hours spent on repetitive work, and identify which processes can be completely automated with AI. You'll receive a detailed report showing:</p>

            <p>\u2022 Current time spent on manual tasks<br>
            \u2022 Potential cost savings<br>
            \u2022 Automation opportunities ranked by impact<br>
            \u2022 ROI projections<br>
            \u2022 Implementation timeline</p>

            <p><span class="highlight">No obligation, no pressure</span> - just valuable insights into how AI can transform your business operations.</p>
        `
    },
    'Free Solution Draft': {
        icon: 'fas fa-blueprint',
        title: 'Free Solution Draft',
        content: `
            <p>After our diagnosis, we create a <span class="highlight">complete automation blueprint</span> specifically tailored to your business - still completely free.</p>

            <p><span class="highlight">This isn't a generic template</span> - it's a detailed, custom plan that shows exactly how AI will integrate with your existing systems, which tools we'll use, and how the automated workflows will operate.</p>

            <p>Your free solution draft includes:</p>

            <p>\u2022 Detailed technical architecture<br>
            \u2022 Integration plan with your current systems<br>
            \u2022 Step-by-step implementation roadmap<br>
            \u2022 Accurate cost projections<br>
            \u2022 Timeline with milestones<br>
            \u2022 Expected ROI calculations<br>
            \u2022 Risk assessment and mitigation strategies</p>

            <p>We invest time in creating this comprehensive plan because we believe in our solution. When you see the detailed roadmap and projected results, you'll understand exactly what you're getting before making any commitment.</p>

            <p><span class="highlight">Your blueprint is yours to keep</span> - whether you choose to work with us or not.</p>
        `
    },
    'Entry-Level Implementation': {
        icon: 'fas fa-rocket-launch',
        title: 'Entry-Level Implementation',
        content: `
            <p>If you love our plan, we implement it at <span class="highlight">affordable entry-level pricing</span> designed to make AI automation accessible to businesses of all sizes.</p>

            <p><span class="highlight">Only pay if you approve our solution draft</span> and want to move forward. No upfront costs, no hidden fees - just transparent, fair pricing for implementing the exact plan we designed for you.</p>

            <p>Our entry-level implementation includes:</p>

            <p>\u2022 Complete system setup and configuration<br>
            \u2022 AI agent deployment and training<br>
            \u2022 Integration with your existing tools<br>
            \u2022 Team training and documentation<br>
            \u2022 30-day support and optimization<br>
            \u2022 Performance monitoring and adjustments</p>

            <p><span class="highlight">Why entry-level pricing?</span> Because we'd rather work with 100 satisfied clients at reasonable rates than 10 clients at premium prices. Our model is built on volume and long-term relationships, not maximum extraction.</p>

            <p>Once you see the results, you'll understand why automation isn't an expense - it's an investment that <span class="highlight">pays for itself within the first month</span>.</p>
        `
    }
};

// Spanish service data with detailed descriptions
const serviceDetailsES: Record<string, { icon: string; title: string; content: string }> = {
    'Integraci\u00f3n AI + Automatizaci\u00f3n': {
        icon: 'fas fa-robot',
        title: 'Integraci\u00f3n AI + Automatizaci\u00f3n',
        content: `
            <p>M\u00e1s all\u00e1 del despliegue b\u00e1sico de AI - creamos <span class="highlight">automatizaci\u00f3n inteligente que conecta ChatGPT, Claude, Groq, y DeepSeek</span> con tus sistemas existentes, eliminando completamente la intervenci\u00f3n humana.</p>

            <p><span class="highlight">C\u00f3mo AI + Automatizaci\u00f3n es la soluci\u00f3n perfecta para cada negocio en todas las industrias:</span> Nuestro enfoque de orquestaci\u00f3n multi-AI asegura que nunca quedes atrapado con un solo proveedor. Cuando ChatGPT falla, Claude toma el control. Cuando necesitas velocidad, Groq procesa tus solicitudes. Esta redundancia y especializaci\u00f3n significa <span class="highlight">99.9% de tiempo activo y rendimiento \u00f3ptimo</span> para cada tarea.</p>

            <p>Ya sea que est\u00e9s en <span class="highlight">bienes ra\u00edces</span> - en lugar de responder correos aburridos y repetitivos, las automatizaciones pueden hacerlo por ti y t\u00fa solo te enfocas en presentaciones y aplicaciones. O si eres un <span class="highlight">profesional de la salud</span> automatizando registros de pacientes, comercio optimizando inventario, o finanzas procesando transacciones - nuestros agentes AI trabajan 24/7 en <span class="highlight">todas las industrias</span> porque se adaptan a tu l\u00f3gica de negocio espec\u00edfica, no al rev\u00e9s.</p>
        `
    },
    'Automatizaci\u00f3n Google Workspace': {
        icon: 'fab fa-google',
        title: 'Automatizaci\u00f3n Google Workspace',
        content: `
            <p>Transformamos Google Workspace de una herramienta a un <span class="highlight">ecosistema inteligente</span>. Flujos de trabajo automatizados, procesamiento inteligente de documentos, y gesti\u00f3n de datos sin intervenci\u00f3n.</p>

            <p><span class="highlight">Workspace es gratuito y no requiere licencias de alto costo</span> - exactamente por eso es la base perfecta para automatizaci\u00f3n. Mientras competidores cobran miles por software empresarial, convertimos tus herramientas gratuitas de Google existentes en una plataforma empresarial potenciada por AI.</p>

            <p>Imagina Gmail ordenando y respondiendo autom\u00e1ticamente consultas de clientes, Google Sheets actualiz\u00e1ndose con datos en tiempo real de m\u00faltiples fuentes, y Google Docs generando reportes que se escriben solos. Todo usando herramientas que <span class="highlight">ya tienes y no pagas nada extra</span>.</p>
        `
    },
    'C\u00f3digos QR y Automatizaci\u00f3n de Entrenamiento': {
        icon: 'fas fa-qrcode',
        title: 'C\u00f3digos QR y Automatizaci\u00f3n de Entrenamiento',
        content: `
            <p>Sistemas QR inteligentes que no solo proporcionan informaci\u00f3n - <span class="highlight">activan flujos de trabajo de entrenamiento automatizados, rastrean progreso, y adaptan contenido</span> basado en comportamiento del usuario.</p>

            <p><span class="highlight">Esta es la mejor manera cuando entrenas 100+ asociados o en conferencias y quieres evaluarlos o recolectar correos en tu conferencia.</span> En lugar de registros manuales y formularios de papel, un escaneo de c\u00f3digo QR instant\u00e1neamente:</p>

            <p>\u2022 Registra al participante<br>
            \u2022 Entrega contenido de entrenamiento personalizado<br>
            \u2022 Rastrea tasas de finalizaci\u00f3n<br>
            \u2022 Recolecta retroalimentaci\u00f3n autom\u00e1ticamente<br>
            \u2022 Genera certificados de finalizaci\u00f3n<br>
            \u2022 Construye tu base de datos de correos</p>
        `
    },
    'Reportes Auto-Generados': {
        icon: 'fas fa-chart-bar',
        title: 'Reportes Auto-Generados',
        content: `
            <p>Reportes que se crean a s\u00ed mismos. Nuestros agentes AI <span class="highlight">monitorean continuamente tus datos, generan insights, y entregan reportes comprensivos</span> sin ninguna entrada manual.</p>

            <p><span class="highlight">Por qu\u00e9 poner tus activos m\u00e1s valiosos a hacer tareas aburridas y repetitivas</span> - podemos mostrarte c\u00f3mo recolectar o extraer informaci\u00f3n autom\u00e1ticamente.</p>

            <p>Consultas de servicio al cliente respondidas instant\u00e1neamente. Entrada de datos completada antes de que termines tu caf\u00e9. Facturas procesadas y pagos reconciliados mientras duermes. Inventario reordenado autom\u00e1ticamente cuando el stock baja.</p>

            <p>Esto no se trata de hacer tareas m\u00e1s r\u00e1pidas - se trata de <span class="highlight">hacerlas desaparecer completamente</span> para que tu equipo pueda enfocarse en lo que los humanos hacen mejor: pensar, crear, y construir relaciones.</p>
        `
    },
    'Eliminaci\u00f3n Completa de Tareas': {
        icon: 'fas fa-magic-wand-sparkles',
        title: 'Eliminaci\u00f3n Completa de Tareas',
        content: `
            <p>No solo automatizamos tareas - las eliminamos. Nuestros <span class="highlight">agentes inteligentes manejan flujos de trabajo completos</span> de principio a fin, aprendiendo y mejorando continuamente.</p>

            <p><span class="highlight">Por qu\u00e9 poner tus activos m\u00e1s valiosos a hacer tareas aburridas y repetitivas</span> - podemos mostrarte c\u00f3mo recolectar o extraer informaci\u00f3n autom\u00e1ticamente.</p>

            <p>Consultas de servicio al cliente respondidas instant\u00e1neamente. Entrada de datos completada antes de que termines tu caf\u00e9. Facturas procesadas y pagos reconciliados mientras duermes. Inventario reordenado autom\u00e1ticamente cuando el stock baja.</p>

            <p>Esto no se trata de hacer tareas m\u00e1s r\u00e1pidas - se trata de <span class="highlight">hacerlas desaparecer completamente</span> para que tu equipo pueda enfocarse en lo que los humanos hacen mejor: pensar, crear, y construir relaciones.</p>
        `
    },
    'Estrategia de Transformaci\u00f3n AI': {
        icon: 'fas fa-brain',
        title: 'Estrategia de Transformaci\u00f3n AI',
        content: `
            <p>Identificamos <span class="highlight">cada proceso manual en tu negocio</span> y creamos agentes AI aut\u00f3nomos para manejarlos, entregando ahorros de costos y eficiencia sin precedentes.</p>

            <p><span class="highlight">Transforma tu negocio si est\u00e1s dispuesto a cambiar tu mentalidad</span> haciendo tu empresa m\u00e1s rentable, trabajemos juntos.</p>

            <p>Auditamos toda tu operaci\u00f3n, mapeamos cada punto de contacto manual, y dise\u00f1amos agentes AI que no solo reemplazan tareas humanas - las <span class="highlight">mejoran m\u00e1s all\u00e1 de la capacidad humana</span>. Procesamiento m\u00e1s r\u00e1pido, disponibilidad 24/7, cero errores, y aprendizaje continuo.</p>

            <p>Las empresas que prosperan en 2025 no son las que tienen m\u00e1s empleados - son las que tienen la <span class="highlight">automatizaci\u00f3n m\u00e1s inteligente</span>. Por favor implementa con un equipo de agentes.</p>
        `
    }
};

// Function to get current service details based on language
export function getCurrentServiceDetails(): Record<string, { icon: string; title: string; content: string }> {
    return currentLang === 'es' ? serviceDetailsES : serviceDetails;
}

// Default popup message translations
export const defaultPopupMessages: Record<string, string> = {
    en: 'Service details are being updated. Please contact us for more information.',
    es: 'Los detalles del servicio se est\u00e1n actualizando. Por favor cont\u00e1ctanos para m\u00e1s informaci\u00f3n.'
};

// Language Translation System
const translations: Record<string, Record<string, string>> = {
    en: {
        'services': 'Services',
        'features': 'Features',
        'contact': 'Contact',
        'hero-title': 'Free AI Automation Diagnosis',
        'hero-subtitle': 'We analyze your workflow and deliver a complete automation blueprint\u2014at zero cost. No consultations, no meetings. Pure value.',
        'hero-cta': 'Get FREE Diagnosis & Draft',
        'welcome-title': 'Welcome to JufipAI',
        'welcome-subtitle': 'Where AI + automation makes working a good place to be!',
        'customer-welcome-title': 'Thanks for contacting JufipAI',
        'customer-welcome-subtitle': 'Your automation journey begins now',
        'customer-welcome-details': 'One of our specialized team members is already contacting you shortly.<br><strong>Get ready to flip how you work forever!</strong>',
        'contact-title': 'Ready to Automate Everything?',
        'form-name': 'Full Name',
        'form-email': 'Email Address',
        'form-company': 'Company Name',
        'form-description': 'Project Description',
        'form-submit': 'Get FREE Diagnosis & Draft',
        'copyright': 'Copyright \u00a9 2014-2025, JufipAI.com or its affiliates. All rights reserved.',
        'services-title': 'Our AI-Powered Services',
        'process-title': 'Our Risk-Free Process',
        'features-title': 'Why JufipAI Delivers Real ROI',
        'features-cta': 'Start Now',
        'service1-title': 'AI + Automation Integration',
        'service1-desc': 'Beyond basic AI deployment - we create intelligent automation that connects ChatGPT, Claude, Groq, and DeepSeek with your existing systems, eliminating human intervention entirely.',
        'service2-title': 'Google Workspace Automation',
        'service2-desc': 'Transform Google Workspace from a tool into an intelligent ecosystem. Automated workflows, smart document processing, and zero-touch data management.',
        'service3-title': 'QR Code Training & Automation',
        'service3-desc': 'Smart QR systems that don\'t just provide information - they trigger automated training workflows, track progress, and adapt content based on user behavior.',
        'service4-title': 'Self-Generating Reports',
        'service4-desc': 'Reports that create themselves. Our AI agents continuously monitor your data, generate insights, and deliver comprehensive reports without any manual input.',
        'service5-title': 'Complete Task Elimination',
        'service5-desc': 'We don\'t just automate tasks - we eliminate them. Our intelligent agents handle entire workflows from start to finish, learning and improving continuously.',
        'service6-title': 'AI Transformation Strategy',
        'service6-desc': 'We identify every manual process in your business and create autonomous AI agents to handle them, delivering unprecedented cost savings and efficiency.',
        'process1-title': 'Free Diagnosis',
        'process1-desc': 'We analyze your current workflows and identify automation opportunities',
        'process2-title': 'Free Solution Draft',
        'process2-desc': 'Complete automation blueprint with AI integration plan and cost projections',
        'process3-title': 'Entry-Level Implementation',
        'process3-desc': 'If you love our plan, we implement it at affordable entry-level pricing',
        'badge-free': '100% FREE',
        'badge-approve': 'ONLY IF YOU APPROVE',
        'feature1': 'Reduce operational costs by 90%',
        'feature2': 'Floating AI agents work 24/7',
        'feature3': 'Zero manual data entry required',
        'feature4': 'Exponentially scalable automation',
        'feature5': 'Implementation in days, not months',
        'feature6': 'Enterprise-grade security included',
        'feature7': 'Multi-AI model orchestration (GPT, Claude, Groq)',
        'feature8': 'QR code training systems for instant learning',
        'feature9': 'Automated report generation and distribution',
        'feature10': 'Deep Google Workspace integration',
        'feature11': 'Real-time data synchronization across platforms',
        'feature12': 'Smart workflow automation that learns and adapts',
        'testimonials-title': 'Trusted By Industry Leaders',
        'testimonial1-industry': 'Real Estate Agency',
        'testimonial1-desc': '"JufipAI automated our entire lead management system. Client inquiries are instantly categorized, property showings schedule automatically, and follow-ups happen without manual work. We closed 40% more deals in just 3 months."',
        'testimonial2-industry': 'Remodeling Company',
        'testimonial2-desc': '"Project management became effortless. Material orders, contractor scheduling, and client updates all happen automatically. We eliminated 20 hours of weekly admin work and can now handle 3x more projects simultaneously."',
        'testimonial3-industry': 'Staffing Agency',
        'testimonial3-desc': '"Resume screening, candidate matching, and interview scheduling run on autopilot. Our AI agents process hundreds of applications daily with 95% accuracy. Placement time dropped from 3 weeks to 5 days."',
        'testimonial4-industry': 'Food Production',
        'testimonial4-desc': '"Inventory tracking, quality control reports, and supplier ordering are completely automated. The system predicts demand and reorders automatically. We cut waste by 35% and reduced staffing costs significantly."'
    },
    es: {
        'services': 'Servicios',
        'features': 'Caracter\u00edsticas',
        'contact': 'Contacto',
        'hero-title': 'Diagn\u00f3stico Gratuito de Automatizaci\u00f3n AI',
        'hero-subtitle': 'Analizamos tu flujo de trabajo y entregamos un plan completo de automatizaci\u00f3n\u2014sin costo. Sin consultas, sin reuniones. Valor puro.',
        'hero-cta': 'Obtener Diagn\u00f3stico GRATIS',
        'welcome-title': 'Bienvenido a JufipAI',
        'welcome-subtitle': '\u00a1Donde AI + automatizaci\u00f3n hace que trabajar sea un buen lugar para estar!',
        'customer-welcome-title': 'Gracias por contactar JufipAI',
        'customer-welcome-subtitle': 'Tu viaje de automatizaci\u00f3n comienza ahora',
        'customer-welcome-details': 'Uno de nuestros miembros especializados ya te est\u00e1 contactando pronto.<br><strong>\u00a1Prep\u00e1rate para cambiar tu forma de trabajar para siempre!</strong>',
        'contact-title': '\u00bfListo para Automatizar Todo?',
        'form-name': 'Nombre Completo',
        'form-email': 'Direcci\u00f3n de Email',
        'form-company': 'Nombre de la Empresa',
        'form-description': 'Descripci\u00f3n del Proyecto',
        'form-submit': 'Obtener Diagn\u00f3stico GRATIS',
        'copyright': 'Copyright \u00a9 2014-2025, JufipAI.com o sus afiliados. Todos los derechos reservados.',
        'services-title': 'Nuestros Servicios Potenciados por AI',
        'process-title': 'Nuestro Proceso Sin Riesgo',
        'features-title': 'Por qu\u00e9 JufipAI Entrega ROI Real',
        'features-cta': 'Comenzar Ahora',
        'service1-title': 'Integraci\u00f3n AI + Automatizaci\u00f3n',
        'service1-desc': 'M\u00e1s all\u00e1 del despliegue b\u00e1sico de AI - creamos automatizaci\u00f3n inteligente que conecta ChatGPT, Claude, Groq, y DeepSeek con tus sistemas existentes, eliminando completamente la intervenci\u00f3n humana.',
        'service2-title': 'Automatizaci\u00f3n Google Workspace',
        'service2-desc': 'Transformamos Google Workspace de una herramienta a un ecosistema inteligente. Flujos de trabajo automatizados, procesamiento inteligente de documentos, y gesti\u00f3n de datos sin intervenci\u00f3n.',
        'service3-title': 'C\u00f3digos QR y Automatizaci\u00f3n de Entrenamiento',
        'service3-desc': 'Sistemas QR inteligentes que no solo proporcionan informaci\u00f3n - activan flujos de trabajo de entrenamiento automatizados, rastrean progreso, y adaptan contenido basado en comportamiento del usuario.',
        'service4-title': 'Reportes Auto-Generados',
        'service4-desc': 'Reportes que se crean a s\u00ed mismos. Nuestros agentes AI monitorean continuamente tus datos, generan insights, y entregan reportes comprensivos sin ninguna entrada manual.',
        'service5-title': 'Eliminaci\u00f3n Completa de Tareas',
        'service5-desc': 'No solo automatizamos tareas - las eliminamos. Nuestros agentes inteligentes manejan flujos de trabajo completos de principio a fin, aprendiendo y mejorando continuamente.',
        'service6-title': 'Estrategia de Transformaci\u00f3n AI',
        'service6-desc': 'Identificamos cada proceso manual en tu negocio y creamos agentes AI aut\u00f3nomos para manejarlos, entregando ahorros de costos y eficiencia sin precedentes.',
        'process1-title': 'Diagn\u00f3stico Gratuito',
        'process1-desc': 'Analizamos tus flujos de trabajo actuales e identificamos oportunidades de automatizaci\u00f3n',
        'process2-title': 'Borrador de Soluci\u00f3n Gratuito',
        'process2-desc': 'Plan completo de automatizaci\u00f3n con plan de integraci\u00f3n AI y proyecciones de costos',
        'process3-title': 'Implementaci\u00f3n Nivel de Entrada',
        'process3-desc': 'Si te encanta nuestro plan, lo implementamos con precios accesibles de nivel de entrada',
        'badge-free': '100% GRATIS',
        'badge-approve': 'SOLO SI APRUEBAS',
        'feature1': 'Reduce costos operacionales en un 90%',
        'feature2': 'Agentes AI flotantes trabajan 24/7',
        'feature3': 'Cero entrada de datos manual requerida',
        'feature4': 'Automatizaci\u00f3n exponencialmente escalable',
        'feature5': 'Implementaci\u00f3n en d\u00edas, no meses',
        'feature6': 'Seguridad de nivel empresarial incluida',
        'feature7': 'Orquestaci\u00f3n multi-modelo AI (GPT, Claude, Groq)',
        'feature8': 'Sistemas de entrenamiento con c\u00f3digos QR para aprendizaje instant\u00e1neo',
        'feature9': 'Generaci\u00f3n y distribuci\u00f3n automatizada de reportes',
        'feature10': 'Integraci\u00f3n profunda con Google Workspace',
        'feature11': 'Sincronizaci\u00f3n de datos en tiempo real entre plataformas',
        'feature12': 'Automatizaci\u00f3n de flujos de trabajo inteligente que aprende y se adapta',
        'testimonials-title': 'Confiado por L\u00edderes de la Industria',
        'testimonial1-industry': 'Agencia de Bienes Ra\u00edces',
        'testimonial1-desc': '"JufipAI automatiz\u00f3 todo nuestro sistema de gesti\u00f3n de prospectos. Las consultas de clientes se categorizan instant\u00e1neamente, las visitas a propiedades se programan autom\u00e1ticamente, y los seguimientos ocurren sin trabajo manual. Cerramos 40% m\u00e1s negocios en solo 3 meses."',
        'testimonial2-industry': 'Empresa de Remodelaci\u00f3n',
        'testimonial2-desc': '"La gesti\u00f3n de proyectos se volvi\u00f3 sencilla. Los pedidos de materiales, programaci\u00f3n de contratistas, y actualizaciones de clientes suceden autom\u00e1ticamente. Eliminamos 20 horas de trabajo administrativo semanal y ahora manejamos 3 veces m\u00e1s proyectos simult\u00e1neamente."',
        'testimonial3-industry': 'Agencia de Personal',
        'testimonial3-desc': '"La evaluaci\u00f3n de curr\u00edculums, coincidencia de candidatos, y programaci\u00f3n de entrevistas funcionan en piloto autom\u00e1tico. Nuestros agentes AI procesan cientos de aplicaciones diariamente con 95% de precisi\u00f3n. El tiempo de colocaci\u00f3n baj\u00f3 de 3 semanas a 5 d\u00edas."',
        'testimonial4-industry': 'Producci\u00f3n de Alimentos',
        'testimonial4-desc': '"El seguimiento de inventario, reportes de control de calidad, y pedidos a proveedores est\u00e1n completamente automatizados. El sistema predice la demanda y reordena autom\u00e1ticamente. Redujimos el desperdicio en 35% y disminuimos significativamente los costos de personal."'
    }
};

// ULTIMATE ENGLISH FAILSAFE - Set before anything else
let currentLang = 'en';

// Clear any problematic localStorage immediately
if (typeof Storage !== 'undefined') {
    localStorage.removeItem('preferred-language');
    localStorage.setItem('preferred-language', 'en');
}

// EMERGENCY RESET FUNCTION - For testing and debugging
function resetToEnglish(): void {
    localStorage.removeItem('preferred-language');
    localStorage.setItem('preferred-language', 'en');
    location.reload();
}

// Make reset function globally accessible for console debugging
(window as any).resetToEnglish = resetToEnglish;

export function getCurrentLang(): string {
    return currentLang;
}

function translatePage(lang: string): void {
    currentLang = lang;

    let translatedCount = 0;
    let failedCount = 0;

    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (!key) return;

        if (translations[lang] && translations[lang][key]) {
            const translationText = translations[lang][key];

            // Enhanced translation application
            if (element.innerHTML.includes('<strong>') || element.innerHTML.includes('<br>')) {
                element.innerHTML = translationText;
            } else {
                element.textContent = translationText;
            }

            translatedCount++;
        } else {
            failedCount++;
        }
    });

    // Deploy certified translation agents (failsafe)
    if (lang === 'es') {
        forceServiceCardTranslation();
    } else if (lang === 'en') {
        forceEnglishTranslation();
    }

    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (key && translations[lang][key]) {
            (element as HTMLInputElement).placeholder = translations[lang][key];
        }
    });

    // Update navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        const enText = link.getAttribute('data-en');
        const esText = link.getAttribute('data-es');
        if (lang === 'es' && esText) {
            link.textContent = esText;
        } else if (lang === 'en' && enText) {
            link.textContent = enText;
        }
    });

    // Save preference
    localStorage.setItem('preferred-language', lang);
}

// CERTIFIED ESP TRANSLATION AGENT - Failsafe Service Cards
function forceServiceCardTranslation(): void {
    const serviceTranslations: Record<string, string> = {
        'service1-title': 'Integraci\u00f3n AI + Automatizaci\u00f3n',
        'service1-desc': 'M\u00e1s all\u00e1 del despliegue b\u00e1sico de AI - creamos automatizaci\u00f3n inteligente que conecta ChatGPT, Claude, Groq, y DeepSeek con tus sistemas existentes, eliminando completamente la intervenci\u00f3n humana.',
        'service2-title': 'Automatizaci\u00f3n Google Workspace',
        'service2-desc': 'Transformamos Google Workspace de una herramienta a un ecosistema inteligente. Flujos de trabajo automatizados, procesamiento inteligente de documentos, y gesti\u00f3n de datos sin intervenci\u00f3n.',
        'service3-title': 'C\u00f3digos QR y Automatizaci\u00f3n de Entrenamiento',
        'service3-desc': 'Sistemas QR inteligentes que no solo proporcionan informaci\u00f3n - activan flujos de trabajo de entrenamiento automatizados, rastrean progreso, y adaptan contenido basado en comportamiento del usuario.',
        'service4-title': 'Reportes Auto-Generados',
        'service4-desc': 'Reportes que se crean a s\u00ed mismos. Nuestros agentes AI monitorean continuamente tus datos, generan insights, y entregan reportes comprensivos sin ninguna entrada manual.',
        'service5-title': 'Eliminaci\u00f3n Completa de Tareas',
        'service5-desc': 'No solo automatizamos tareas - las eliminamos. Nuestros agentes inteligentes manejan flujos de trabajo completos de principio a fin, aprendiendo y mejorando continuamente.',
        'service6-title': 'Estrategia de Transformaci\u00f3n AI',
        'service6-desc': 'Identificamos cada proceso manual en tu negocio y creamos agentes AI aut\u00f3nomos para manejarlos, entregando ahorros de costos y eficiencia sin precedentes.'
    };

    document.querySelectorAll('.service-card').forEach((card, index) => {
        const titleKey = `service${index + 1}-title`;
        const descKey = `service${index + 1}-desc`;

        const titleElement = card.querySelector('h3');
        const descElement = card.querySelector('p');

        if (titleElement && serviceTranslations[titleKey]) {
            titleElement.textContent = serviceTranslations[titleKey];
        }

        if (descElement && serviceTranslations[descKey]) {
            descElement.textContent = serviceTranslations[descKey];
        }
    });
}

// ENGLISH RESTORATION AGENT - Failsafe English Reset
function forceEnglishTranslation(): void {
    const englishTranslations: Record<string, string> = {
        'service1-title': 'AI + Automation Integration',
        'service1-desc': 'Beyond basic AI deployment - we create intelligent automation that connects ChatGPT, Claude, Groq, and DeepSeek with your existing systems, eliminating human intervention entirely.',
        'service2-title': 'Google Workspace Automation',
        'service2-desc': 'Transform Google Workspace from a tool into an intelligent ecosystem. Automated workflows, smart document processing, and zero-touch data management.',
        'service3-title': 'QR Code Training & Automation',
        'service3-desc': 'Smart QR systems that don\'t just provide information - they trigger automated training workflows, track progress, and adapt content based on user behavior.',
        'service4-title': 'Self-Generating Reports',
        'service4-desc': 'Reports that create themselves. Our AI agents continuously monitor your data, generate insights, and deliver comprehensive reports without any manual input.',
        'service5-title': 'Complete Task Elimination',
        'service5-desc': 'We don\'t just automate tasks - we eliminate them. Our intelligent agents handle entire workflows from start to finish, learning and improving continuously.',
        'service6-title': 'AI Transformation Strategy',
        'service6-desc': 'We identify every manual process in your business and create autonomous AI agents to handle them, delivering unprecedented cost savings and efficiency.'
    };

    document.querySelectorAll('.service-card').forEach((card, index) => {
        const titleKey = `service${index + 1}-title`;
        const descKey = `service${index + 1}-desc`;

        const titleElement = card.querySelector('h3');
        const descElement = card.querySelector('p');

        if (titleElement && englishTranslations[titleKey]) {
            titleElement.textContent = englishTranslations[titleKey];
        }

        if (descElement && englishTranslations[descKey]) {
            descElement.textContent = englishTranslations[descKey];
        }
    });
}

// Initialize language toggle
export function initTranslations(): void {
    const languageSwitch = document.getElementById('languageSwitch');
    if (!languageSwitch) return;
    const languageOptions = languageSwitch.querySelectorAll('.language-option');

    // ALWAYS START IN ENGLISH - NO EXCEPTIONS
    localStorage.removeItem('preferred-language');
    localStorage.setItem('preferred-language', 'en');

    // Force English visual state
    languageSwitch.classList.remove('spanish');
    languageOptions[1]?.classList.remove('active');
    languageOptions[0]?.classList.add('active');

    // Force translate to English immediately
    translatePage('en');
    currentLang = 'en';

    languageOptions.forEach(option => {
        option.addEventListener('click', function(this: HTMLElement) {
            const lang = this.getAttribute('data-lang');
            if (!lang) return;

            // Update visual state
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            if (lang === 'es') {
                languageSwitch.classList.add('spanish');
            } else {
                languageSwitch.classList.remove('spanish');
            }

            // Translate page
            translatePage(lang);

            // Play sound
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playClickSound();
        });
    });
}

// Dark Mode Toggle System with localStorage persistence
export function initDarkMode(): void {
    const themeSwitch = document.getElementById('themeSwitch');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    // Theme toggle function
    function toggleTheme(): void {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Update theme
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Play sound effect
        initAudio();
        const audioContext = getAudioContext();
        if (isAudioEnabled()) audioContext.playClickSound();
    }

    // Click event
    if (themeSwitch) {
        themeSwitch.addEventListener('click', toggleTheme);

        // Keyboard accessibility
        themeSwitch.addEventListener('keydown', function(e: KeyboardEvent) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });

        // Hover sound
        themeSwitch.addEventListener('mouseenter', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playHoverSound();
        });
    }
}
