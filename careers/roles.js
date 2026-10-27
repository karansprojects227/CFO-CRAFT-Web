/* CFO CRAFT — single source of truth for Careers listing and Apply page.
 * To add/change a position, edit this array ONLY. status can be "open" or "closed".
 * A future backend GET /api/careers/roles can replace this file with the same data shape.
 */
window.CFO_CAREER_ROLES = Object.freeze([
  {
    slug: "finance-delivery-associate",
    title: "Finance Delivery Associate",
    type: "Part-time, moving to full-time",
    location: "Malad West, Mumbai [confirm on-site or hybrid]",
    experience: "Qualified CA, 0–3 years post-qualification",
    description: "Prepare monthly MIS packs, reconciliations and cash forecasts from client data, and support the engagement CFO in client reviews.",
    status: "open"
  },
  {
    slug: "business-development-operations-support",
    title: "Business Development & Operations Support",
    type: "Full-time",
    location: "Malad West, Mumbai",
    experience: "1–2 years in business development, client servicing or operations",
    description: "Coordinate intro calls, maintain the CRM, prepare proposals and keep engagement administration running on schedule.",
    status: "open"
  }
]);
