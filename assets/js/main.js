/*
 * ARUNA — Property & Stays
 * Vanilla JavaScript only. No runtime dependencies.
 * Editable integration values below; never commit private API keys here.
 */
'use strict';

const SITE_CONFIG = Object.freeze({
  brandName: 'ARUNA — Property & Stays',
  contactEmail: 'hello@yourbrand.com', // Replace before publishing.
  whatsappNumber: '', // International digits only, e.g. '6281234567890'. Leave blank for share chooser.
});

const PROPERTY_DATA = Object.freeze({
  terra: {
    name: 'Villa Terra', location: 'CANGGU, BALI', beds: '3 bedrooms', feature: 'Private pool',
    description: 'A demonstration concept with open, architectural spaces, warm materials and an easy connection to the outdoors. A place designed around slow mornings and time together.',
  },
  soma: {
    name: 'Casa Soma', location: 'ULUWATU, BALI', beds: '4 bedrooms', feature: 'Tropical garden',
    description: 'A demonstration concept inspired by Bali’s coastline. Understated interiors, generous gathering spaces and quieter corners offer a refined setting for memorable stays.',
  },
  senja: {
    name: 'The Senja House', location: 'UMALAS, BALI', beds: '2 bedrooms', feature: 'Private courtyard',
    description: 'A demonstration concept with a natural palette and considered details. Intimate in scale, generous in feeling, and imagined for relaxed island living.',
  },
});

const PROCESS_DATA = Object.freeze({
  owner: [
    { title: 'A conversation', description: 'We learn about your property, your priorities and what a successful partnership would look like.' },
    { title: 'A considered plan', description: 'We propose a tailored scope, covering presentation, daily operations and ongoing communication.' },
    { title: 'Care in motion', description: 'Once agreed and launched, we coordinate the details and keep you informed along the way.' },
  ],
  seller: [
    { title: 'Understand the property', description: 'We discuss your goals, review what makes the asset distinctive, and identify the right next steps.' },
    { title: 'Prepare the story', description: 'We explore positioning, presentation, photography and the information potential buyers will need.' },
    { title: 'Guide the next move', description: 'We help coordinate inquiries and the next stages with the appropriate qualified professionals.' },
  ],
});

const PACKAGE_DATA = Object.freeze({
  digital: {
    title: 'Digital Presence', kicker: '01 / ESSENTIAL SERVICE',
    description: 'A focused digital management partnership for owners who oversee the physical property themselves but want experienced support with its online presence.',
    features: ['Listing setup and improvements', 'Photographic direction', 'Channel distribution coordination', 'Market-aware rate reviews', 'Booking inquiry handling', 'Digital guest communication', 'Regular performance summaries', 'Owner coordination'],
    interest: 'Digital marketing & bookings',
  },
  complete: {
    title: 'Complete Care', kicker: '02 / COMPREHENSIVE SERVICE',
    description: 'A more involved service designed to connect marketing, guest care and on-property operations. Final scope is established after reviewing the villa and its needs.',
    features: ['Marketing and listing management', 'Revenue and booking oversight', 'Guest arrival and departure coordination', 'Housekeeping schedule oversight', 'Staff coordination', 'Maintenance planning', 'Quality checks', 'Owner reporting and updates'],
    interest: 'Complete property management',
  },
});

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

// Image safety net: local illustrations appear if remote photography is unavailable.
$$('img[data-fallback]').forEach((image) => {
  image.addEventListener('error', () => {
    const fallback = image.dataset.fallback;
    if (fallback && !image.dataset.fallbackApplied) {
      image.dataset.fallbackApplied = 'true';
      image.src = fallback;
    }
  });
  if (image.complete && image.naturalWidth === 0) image.dispatchEvent(new Event('error'));
});

// Sticky header, scroll progress.
const header = $('.site-header');
const progressBar = $('.scroll-progress');
let scrollTicking = false;
const paintScroll = () => {
  const scrollY = window.scrollY;
  header.classList.toggle('is-scrolled', scrollY > 45);
  const scrollableHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  progressBar.style.transform = `scaleX(${Math.min(1, scrollY / scrollableHeight)})`;
  scrollTicking = false;
};
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(paintScroll);
    scrollTicking = true;
  }
}, { passive: true });
paintScroll();

// Mobile navigation: keyboard and focus handling.
const menuButton = $('.menu-toggle');
const mobileMenu = $('#mobile-menu');
mobileMenu.inert = true;
let previousMenuFocus = null;
function setMenu(open) {
  if (open) previousMenuFocus = document.activeElement;
  document.body.classList.toggle('menu-open', open);
  header.classList.toggle('menu-active', open);
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.inert = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (open) $$('.mobile-menu a')[0]?.focus();
  else if (mobileMenu.contains(document.activeElement)) (previousMenuFocus || menuButton).focus();
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
$$('.mobile-menu a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => {
  if (window.innerWidth > 980 && document.body.classList.contains('menu-open')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
  if (event.key === 'Tab' && document.body.classList.contains('menu-open')) {
    const focusables = [menuButton, ...$$('.mobile-menu a')];
    const current = focusables.indexOf(document.activeElement);
    if (event.shiftKey && current === 0) { event.preventDefault(); focusables.at(-1).focus(); }
    else if (!event.shiftKey && current === focusables.length - 1) { event.preventDefault(); focusables[0].focus(); }
  }
});

// Scroll-reveal is progressive: older browsers still display content.
const revealItems = $$('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .08, rootMargin: '0px 0px -25px 0px' });
  revealItems.forEach((element) => observer.observe(element));
} else revealItems.forEach((element) => element.classList.add('is-visible'));

// Portfolio filtering.
const filterButtons = $$('.filter-button');
const properties = $$('.property-card');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((candidate) => {
    const active = candidate === button;
    candidate.classList.toggle('is-active', active);
    candidate.setAttribute('aria-pressed', String(active));
  });
  properties.forEach((card) => { card.hidden = filter !== 'all' && card.dataset.area !== filter; });
}));

// Owner / seller process tabs.
const processPanel = $('#process-panel');
const processTabs = $$('.process-tab');
function setProcess(value, moveFocus = false) {
  processTabs.forEach((button) => {
    const active = button.dataset.process === value;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && moveFocus) button.focus();
    if (active) processPanel.setAttribute('aria-labelledby', button.id);
  });
  processPanel.innerHTML = `<div class="process-steps">${PROCESS_DATA[value].map((step, index) => `
    <article class="process-step"><span class="process-step-number">0${index + 1}</span><h3>${step.title}</h3><p>${step.description}</p></article>
  `).join('')}</div>`;
}
processTabs.forEach((button, index) => {
  button.addEventListener('click', () => setProcess(button.dataset.process));
  button.addEventListener('keydown', (event) => {
    if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? processTabs.length - 1 :
      (index + (event.key === 'ArrowRight' ? 1 : -1) + processTabs.length) % processTabs.length;
    setProcess(processTabs[nextIndex].dataset.process, true);
  });
});
setProcess('owner');

// Native accessible dialogs: Escape, focus trap and backdrop are browser-managed.
function setupDialog(dialog) {
  const closeButton = $('.dialog-close', dialog);
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!$('#property-dialog').open && !$('#package-dialog').open) document.body.classList.remove('dialog-open');
  });
}
const propertyDialog = $('#property-dialog');
const packageDialog = $('#package-dialog');
setupDialog(propertyDialog);
setupDialog(packageDialog);

$$('.property-open').forEach((button) => button.addEventListener('click', () => {
  const card = button.closest('.property-card');
  const property = PROPERTY_DATA[card.dataset.property];
  const image = $('img', card);
  $('#property-dialog-content').innerHTML = `
    <img class="dialog-image" src="${image.currentSrc || image.src}" alt="${image.alt}">
    <div class="dialog-body"><div class="dialog-kicker">EDITORIAL CONCEPT · ${property.location}</div>
    <h2 id="property-dialog-title">${property.name}</h2><p>${property.description}</p>
    <div class="dialog-facts"><span>${property.location}</span><span>${property.beds.toUpperCase()}</span><span>${property.feature.toUpperCase()}</span></div>
    <p><strong>Concept only:</strong> This is an example of the presentation style, not an available rental, existing client, or property offered for sale.</p>
    <a class="dialog-action" href="#contact" data-close-and-contact>Discuss a similar property <span aria-hidden="true">↗</span></a></div>`;
  document.body.classList.add('dialog-open');
  propertyDialog.showModal();
}));

$$('[data-package]').forEach((button) => button.addEventListener('click', () => {
  const data = PACKAGE_DATA[button.dataset.package];
  $('#package-dialog-content').innerHTML = `
    <div class="dialog-body"><div class="dialog-kicker">${data.kicker}</div>
    <h2 id="package-dialog-title">${data.title}</h2><p>${data.description}</p>
    <div class="dialog-facts"><span>INDIVIDUAL SCOPE</span><span>PRICING BY PROPOSAL</span></div>
    <div class="dialog-kicker">POTENTIAL SERVICE INCLUSIONS</div>
    <ul>${data.features.map((feature) => `<li>${feature}</li>`).join('')}</ul>
    <a class="dialog-action" href="#contact" data-close-and-contact data-interest="${data.interest}">Discuss this option <span aria-hidden="true">↗</span></a></div>`;
  document.body.classList.add('dialog-open');
  packageDialog.showModal();
}));
document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-close-and-contact]');
  if (!link) return;
  const interest = link.dataset.interest;
  if (interest) $('#interest').value = interest;
  if (propertyDialog.open) propertyDialog.close();
  if (packageDialog.open) packageDialog.close();
});

// Inquiry form — front-end only. Configure owner number in SITE_CONFIG above.
const inquiryForm = $('#inquiry-form');
const formStatus = $('#form-status');
const emailLink = $('[data-contact-email]');
emailLink.textContent = SITE_CONFIG.contactEmail;
emailLink.href = `mailto:${SITE_CONFIG.contactEmail}`;
const constraints = {
  name: (value) => value.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
  interest: (value) => value ? '' : 'Please choose a service.',
  message: (value) => value.trim().length >= 10 ? '' : 'Please add at least 10 characters.',
};
function validateField(field) {
  const error = constraints[field.name]?.(field.value) || '';
  field.setAttribute('aria-invalid', String(Boolean(error)));
  const target = $('.field-error', field.parentElement);
  if (target) target.textContent = error;
  return !error;
}
Object.keys(constraints).forEach((key) => {
  const field = inquiryForm.elements.namedItem(key);
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validateField(field); });
  field.addEventListener('change', () => { if (field.getAttribute('aria-invalid') === 'true') validateField(field); });
});
inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const valid = Object.keys(constraints).map((key) => validateField(inquiryForm.elements.namedItem(key))).every(Boolean);
  if (!valid) {
    formStatus.textContent = 'Please complete the highlighted fields.';
    $('[aria-invalid="true"]', inquiryForm)?.focus();
    return;
  }
  const form = new FormData(inquiryForm);
  const message = [
    `Hello ${SITE_CONFIG.brandName},`, '',
    `I'd like to discuss a property inquiry.`, '',
    `Name: ${form.get('name')}`, `Email: ${form.get('email')}`,
    `Phone: ${form.get('phone') || 'Not provided'}`,
    `Property location: ${form.get('location') || 'Not provided'}`,
    `Service: ${form.get('interest')}`, '',
    `Message: ${form.get('message')}`,
  ].join('\n');
  const phone = SITE_CONFIG.whatsappNumber.replace(/\D/g, '');
  const url = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  // The user initiates the external WhatsApp compose action. No server-side delivery occurs.
  const windowRef = window.open(url, '_blank');
  if (windowRef) windowRef.opener = null;
  else window.location.assign(url);
  formStatus.textContent = phone
    ? 'Your message has been prepared in WhatsApp. Review and press Send to complete your inquiry.'
    : 'WhatsApp has opened with a prepared message. Add your intended recipient and press Send.';
});

$('#current-year').textContent = String(new Date().getFullYear());
