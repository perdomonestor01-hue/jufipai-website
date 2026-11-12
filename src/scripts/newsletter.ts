// Footer newsletter (inline form). Bundled as an external module so it runs under
// CSP script-src 'self' — no inline handlers (L83), no inline <script>.
// Posts to the same Apps Script endpoint the site has always used for subscribers.
import { SHEET_URL } from './sheet-endpoint';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function wireNewsletter(): void {
  const form = document.getElementById('nl-form') as HTMLFormElement | null;
  const status = document.getElementById('nl-status');
  if (!form || !status) return;
  const input = form.querySelector<HTMLInputElement>('input[name="email"]');
  const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!input || !button) return;

  const say = (key: 'invalid' | 'pending' | 'ok' | 'fail') => {
    status.textContent = form.dataset[`msg${key[0].toUpperCase()}${key.slice(1)}`] || '';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();

    // Silent success for bots that fill the hidden field.
    if (honeypot && honeypot.value) {
      say('ok');
      input.value = '';
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      input.setAttribute('aria-invalid', 'true');
      say('invalid');
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');

    say('pending');
    button.disabled = true;
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          type: 'subscribe',
          email,
          locale: form.dataset.lang === 'es' ? 'es' : 'en',
          source: 'footer_inline',
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });
      say('ok');
      input.value = '';
    } catch (err) {
      console.warn('[newsletter] subscribe request failed', err);
      say('fail');
    } finally {
      button.disabled = false;
    }
  });
}

wireNewsletter();
