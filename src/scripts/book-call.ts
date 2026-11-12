// Home-page booking section (#book). Bundled as an external module so it runs under
// CSP script-src 'self' — no inline handlers, no inline <script>. Same pattern as newsletter.ts.
//
// Flow: validate the email -> record it (Apps Script appends the Sheet row, sends the
// operator's instant alert, then the visitor's "We received your call request" welcome —
// approved 2026-11-12, template in google-apps-script.txt) -> hide the form, show a confirmation line, embed the Calendly calendar with
// the email pre-filled. A failed or slow save never stands between a visitor and the calendar.
import { SHEET_URL } from './sheet-endpoint';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SAVE_TIMEOUT_MS = 4000;

// no-cors: the Apps Script response is opaque, so success cannot be read — only network failure.
// keepalive lets the request finish even if the visitor navigates away.
async function saveRequest(payload: Record<string, string>): Promise<void> {
  const request = fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    keepalive: true,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  }).then(() => undefined);
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, SAVE_TIMEOUT_MS));
  await Promise.race([request, timeout]);
}

/** Calendly inline-embed URL. hide_gdpr_banner=1 only works with embed_type=Inline. */
function calendarUrl(base: string, email: string): string {
  const u = new URL(base);
  u.searchParams.set('embed_domain', 'jufipai.com');
  u.searchParams.set('embed_type', 'Inline');
  u.searchParams.set('hide_gdpr_banner', '1');
  u.searchParams.set('email', email);
  return u.toString();
}

const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/** Wait for a CSS transition (<=250 ms), or not at all under reduced motion. */
const settle = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, reducedMotion() ? 0 : ms));
const nextFrame = (): Promise<void> => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

function wireBookCall(): void {
  const form = document.getElementById('book-form') as HTMLFormElement | null;
  const status = document.getElementById('book-status');
  const actions = document.getElementById('book-actions');
  const after = document.getElementById('book-after');
  const confirm = document.getElementById('book-confirm');
  const frameHost = document.getElementById('book-frame');
  if (!form || !status || !actions || !after || !confirm || !frameHost) return;
  const input = form.querySelector<HTMLInputElement>('input[name="email"]');
  const field = form.querySelector<HTMLElement>('.book-field');
  const honeypot = form.querySelector<HTMLInputElement>('input[name="company_url_2"]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const calendly = form.dataset.calendly;
  if (!input || !field || !button || !calendly) return;
  const steps = Array.from(document.querySelectorAll<HTMLElement>('#book .book-step'));
  const done = document.getElementById('book-done');
  const doneHeading = document.getElementById('book-done-h');
  const doneEmail = document.getElementById('book-done-email');
  let bookedEmail = '';
  let calendarShown = false;
  let scheduledHandled = false;

  const clearStatus = () => {
    status.textContent = '';
    status.classList.remove('is-error', 'is-pending');
  };
  const say = (key: 'invalid' | 'pending') => {
    status.textContent = form.dataset[`msg${key[0].toUpperCase()}${key.slice(1)}`] || '';
    status.classList.toggle('is-error', key === 'invalid');
    status.classList.toggle('is-pending', key === 'pending');
  };
  const markInvalid = () => {
    input.setAttribute('aria-invalid', 'true');
    say('invalid');
  };
  const isValid = () => EMAIL_REGEX.test(input.value.trim());

  /** Step n done (check + SR text), connector n -> n+1 filled, step n+1 current. */
  const advanceTo = (n: number) => {
    steps.forEach((li, i) => {
      const step = i + 1;
      const done = step < n;
      li.classList.toggle('is-done', done);
      li.classList.toggle('is-current', step === n);
      if (step === n) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
      const sr = li.querySelector<HTMLElement>('.book-step-done');
      if (sr) sr.hidden = !done;
    });
  };

  const showCalendar = async (email: string) => {
    // 1. form card fades out, then is hidden
    actions.classList.add('is-leaving');
    await settle(200);
    actions.hidden = true;

    // 2. iframe behind the static placeholder; placeholder removed on load
    const frame = document.createElement('iframe');
    frame.title = form.dataset.frameTitle || 'Calendly';
    frame.loading = 'eager';
    frame.addEventListener('load', () => frameHost.querySelector('.book-ph')?.remove(), { once: true });
    frame.src = calendarUrl(calendly, email);
    frameHost.append(frame);

    // 3. confirmation + calendar card fade in (card rises 8px)
    after.classList.add('is-entering');
    after.hidden = false;
    confirm.focus();
    await nextFrame();
    after.classList.remove('is-entering');
    calendarShown = true;
  };

  /** Calendly confirmed a booking: step 2 done, step 3 current, calendar out, success panel in. */
  const showBooked = async () => {
    if (!done || !doneHeading || !doneEmail) return;
    advanceTo(3);
    after.classList.add('is-leaving');
    await settle(250);
    after.remove(); // removes the iframe with it
    doneEmail.textContent = bookedEmail; // textContent only — never HTML from user input
    done.classList.add('is-entering');
    done.hidden = false;
    doneHeading.focus();
    await nextFrame();
    done.classList.remove('is-entering');
  };

  // Calendly's embed posts messages to the parent. Accept ONLY calendly.com and ONLY the
  // scheduled event (page_height, date_and_time_selected, … are ignored). Handled once.
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== 'https://calendly.com') return;
    const data = event.data as { event?: unknown } | null;
    if (!data || typeof data !== 'object' || data.event !== 'calendly.event_scheduled') return;
    if (!calendarShown || scheduledHandled) return;
    scheduledHandled = true;
    void showBooked();
  });

  // Live validity while typing: show the check when complete; never show the error mid-typing.
  input.addEventListener('input', () => {
    const ok = isValid();
    field.classList.toggle('is-valid', ok);
    if (ok && input.getAttribute('aria-invalid') === 'true') {
      input.removeAttribute('aria-invalid');
      clearStatus();
    }
  });

  // Error only on blur (non-empty and incomplete) or on submit.
  input.addEventListener('blur', () => {
    if (input.value.trim() && !isValid()) markInvalid();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();

    // Bots that fill the hidden field: show the calendar, record nothing.
    if (honeypot && honeypot.value) {
      await showCalendar('');
      return;
    }

    if (!isValid()) {
      markInvalid();
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    bookedEmail = email;

    // Busy: label swap inside a fixed-width button, aria-busy, step 1 -> done, step 2 current.
    form.setAttribute('aria-busy', 'true');
    button.disabled = true;
    say('pending');
    advanceTo(2);
    try {
      await saveRequest({
        type: 'book_call',
        email,
        locale: form.dataset.lang === 'es' ? 'es' : 'en',
        source: 'home_book',
      });
    } catch (err) {
      console.warn('[book-call] save failed; showing the calendar anyway', err);
    }
    form.setAttribute('aria-busy', 'false');
    clearStatus();
    await showCalendar(email);
  });
}

wireBookCall();
