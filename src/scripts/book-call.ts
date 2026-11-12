// Home-page booking section (#book). Bundled as an external module so it runs under
// CSP script-src 'self' — no inline handlers, no inline <script>. Same pattern as newsletter.ts.
//
// Flow: one button -> hide it, show a short line and embed the Calendly calendar -> on
// calendly.event_scheduled show the "You're booked" panel. Booking only: no email is collected
// and this script makes no network request. The only request is Calendly's own iframe.

/** Calendly inline-embed URL. hide_gdpr_banner=1 only works with embed_type=Inline. */
function calendarUrl(base: string): string {
  const u = new URL(base);
  u.searchParams.set('embed_domain', 'jufipai.com');
  u.searchParams.set('embed_type', 'Inline');
  u.searchParams.set('hide_gdpr_banner', '1');
  return u.toString();
}

const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/** Wait for a CSS transition (<=250 ms), or not at all under reduced motion. */
const settle = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, reducedMotion() ? 0 : ms));
const nextFrame = (): Promise<void> => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

function wireBookCall(): void {
  const start = document.getElementById('book-start');
  const button = document.getElementById('book-open') as HTMLButtonElement | null;
  const actions = document.getElementById('book-actions');
  const after = document.getElementById('book-after');
  const confirm = document.getElementById('book-confirm');
  const frameHost = document.getElementById('book-frame');
  if (!start || !button || !actions || !after || !confirm || !frameHost) return;
  const calendly = start.dataset.calendly;
  if (!calendly) return;
  const steps = Array.from(document.querySelectorAll<HTMLElement>('#book .book-step'));
  const done = document.getElementById('book-done');
  const doneHeading = document.getElementById('book-done-h');
  let calendarShown = false;
  let scheduledHandled = false;

  /** Steps before n done (check + SR text, connector filled), step n current; n > count = all done. */
  const advanceTo = (n: number) => {
    steps.forEach((li, i) => {
      const step = i + 1;
      const isDone = step < n;
      li.classList.toggle('is-done', isDone);
      li.classList.toggle('is-current', step === n);
      if (step === n) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
      const sr = li.querySelector<HTMLElement>('.book-step-done');
      if (sr) sr.hidden = !isDone;
    });
  };

  const showCalendar = async () => {
    if (calendarShown) return;
    button.disabled = true;
    // 1. button fades out, then is hidden
    actions.classList.add('is-leaving');
    await settle(200);
    actions.hidden = true;

    // 2. iframe behind the static placeholder; placeholder removed on load
    const frame = document.createElement('iframe');
    frame.title = start.dataset.frameTitle || 'Calendly';
    frame.loading = 'eager';
    frame.addEventListener('load', () => frameHost.querySelector('.book-ph')?.remove(), { once: true });
    frame.src = calendarUrl(calendly);
    frameHost.append(frame);

    // 3. line + calendar card fade in (card rises 8px); focus lands on the line above the calendar
    after.classList.add('is-entering');
    after.hidden = false;
    confirm.focus();
    await nextFrame();
    after.classList.remove('is-entering');
    calendarShown = true;
  };

  /** Calendly confirmed a booking: both steps done, calendar out, success panel in. */
  const showBooked = async () => {
    if (!done || !doneHeading) return;
    advanceTo(steps.length + 1);
    after.classList.add('is-leaving');
    await settle(250);
    after.remove(); // removes the iframe with it
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

  button.addEventListener('click', () => {
    void showCalendar();
  });
}

wireBookCall();
