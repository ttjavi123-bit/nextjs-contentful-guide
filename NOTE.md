# Architecture & Rendering

I implemented a dynamic CMS-driven landing page architecture using Next.js App Router and Contentful. The application uses a dynamic route at `app/[slug]/page.js` that fetches Landing Page entries from Contentful and renders reusable marketing blocks dynamically based on their content type.

The rendering system is component-driven and supports reusable Hero, Reviews Carousel, and Lead Form sections. This allows the Marketing team to launch and modify landing pages without requiring engineering involvement.

To balance performance and content freshness, the architecture is designed to support Incremental Static Regeneration (ISR) and Contentful CDN delivery. Content rendering is also defensive against unpublished or malformed CMS entries to avoid runtime crashes.

---

# Execution of Business Goals

The Reviews Carousel was designed with accessibility and SEO in mind. Reviews are rendered using semantic HTML with accessible typography and clear content hierarchy.

Instead of implementing a problematic auto-rotating carousel, I focused on responsive grid-based rendering to ensure readability and usability across devices and assistive technologies.

Review content remains server-rendered to maximize discoverability for external search engines and improve top-of-funnel acquisition.

---

# Form Architecture & Data Flow

The lead capture form is fully implemented in React and intentionally separated from Contentful because the assessment specified that business logic should not be CMS-managed.

The form uses centralized component state with conditional rendering logic for dynamic requirements:

- Finance users must acknowledge audit liability limitations.
- C.A.R.B. Fleet leads must confirm accessibility requirements.

Upon submission, the application constructs a normalized JSON payload and computes a `sales_routing_pods` array based on routing rules.

The routing logic is encapsulated in a dedicated function so additional overlapping business rules can scale independently from UI rendering.

Example payload:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "workEmail": "john@company.com",
  "companySize": "1000",
  "department": "Finance",
  "products": ["C.A.R.B. Fleet"],
  "sales_routing_pods": [
    "enterprise_pod",
    "hardware_specialist_pod"
  ]
}
````

---

# Visibility & Measurement

For engineering visibility, I would implement:

* Structured application logging
* Runtime error monitoring
* Vercel analytics
* Synthetic uptime monitoring
* Performance monitoring for Core Web Vitals

For marketing visibility, I would integrate:

* Google Analytics
* Conversion event tracking
* Funnel attribution
* CTA click tracking
* Form completion analytics
* Campaign parameter tracking (UTM)

These systems would provide insight into both application reliability and acquisition effectiveness.

---

# Production Readiness

For production deployment, I would additionally implement:

* Server-side schema validation
* Rate limiting
* Spam prevention / CAPTCHA
* API request validation
* Security headers
* CSRF protection
* Environment secret management
* CMS response caching
* Accessibility auditing
* Automated testing coverage
* Error boundaries
* Analytics event validation

I would also introduce stricter TypeScript interfaces and runtime validation for Contentful payloads.

---

# AI Workflow

I used AI tooling primarily for:

* Initial component scaffolding
* CMS modeling guidance
* Tailwind layout acceleration
* Boilerplate generation
* Form structure generation

I manually implemented and validated:

* Dynamic rendering architecture
* Sales routing business logic
* Conditional form requirements
* Contentful content modeling strategy
* Accessibility considerations
* Overall system organization and integration

I also refined AI-generated outputs to better align with enterprise scalability, CMS flexibility, and assessment requirements.