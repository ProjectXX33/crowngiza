/** Smoothly scrolls to the #brochure-form and briefly focuses the first input. */
export function scrollToForm() {
  const el = document.getElementById('brochure-form');
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  // Give scroll a moment, then focus the first input so the user can type immediately
  setTimeout(() => {
    const input = el.querySelector('input');
    if (input) input.focus({ preventScroll: true });
  }, 600);
}
