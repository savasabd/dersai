/* DersAI: optional Google Analytics, basic consent mode. */
(() => {
  'use strict';
  if (!/^https?:$/.test(location.protocol) || location.hostname !== 'savasabd.github.io' || window.self !== window.top) return;
  const ID = 'G-9DPKCRPJKB', KEY = 'dersai-analytics-consent-v1';
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  let choice = null, loaded = false;
  try { const saved = JSON.parse(localStorage.getItem(KEY)); if (saved && Date.now() - saved.time < MAX_AGE) choice = saved.value; } catch (_) {}
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  function start() {
    if (loaded) return;
    loaded = true;
    window['ga-disable-' + ID] = false;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('js', new Date());
    gtag('config', ID, { allow_google_signals: false, allow_ad_personalization_signals: false, page_location: location.origin + location.pathname });
    const tag = document.createElement('script');
    tag.async = true; tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(tag);
  }
  function stop() {
    window['ga-disable-' + ID] = true;
    gtag('consent', 'update', { analytics_storage: 'denied' });
    document.cookie.split(';').forEach(part => {
      const name = part.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) return;
      for (const path of ['/', '/dersai/']) for (const domain of ['', '; Domain=savasabd.github.io', '; Domain=.savasabd.github.io'])
        document.cookie = name + '=; Max-Age=0; Path=' + path + domain + '; SameSite=Lax';
    });
  }
  const style = document.createElement('style');
  style.textContent = '#dersai-consent{position:fixed;bottom:16px;left:16px;right:16px;max-width:700px;margin:auto;padding:20px;background:#fff;color:#243b4a;border:2px solid #526c76;border-radius:16px;box-shadow:0 6px 30px #0003;z-index:10000;font:16px/1.5 system-ui;box-sizing:border-box}#dersai-consent p{margin:0 0 12px}#dersai-consent div{display:flex;gap:10px;flex-wrap:wrap}#dersai-consent button{font:inherit;padding:10px 16px;background:#243b4a;color:#fff;border:2px solid #243b4a;border-radius:8px;cursor:pointer}#dersai-consent button:last-child{background:#fff;color:#243b4a}#dersai-consent[hidden]{display:none}#dersai-consent-settings{display:block;margin:24px auto;padding:8px 12px;border:1px solid #60736a;border-radius:8px;background:#fff;color:#243b4a;font:14px system-ui;cursor:pointer}@media print{#dersai-consent,#dersai-consent-settings{display:none!important}}';
  document.head.appendChild(style);
  const panel = document.createElement('section'); panel.id = 'dersai-consent'; panel.setAttribute('aria-label', 'Ziyaretçi ölçümü / Mesure d’audience'); panel.hidden = choice !== null;
  panel.innerHTML = '<p>Site kullanımını anlamak için Google Analytics çerezlerine izin verir misiniz? Reddetseniz de dersler çalışır.</p><p lang="fr">Acceptez-vous les cookies Google Analytics pour mesurer la fréquentation ? Les cours restent accessibles en cas de refus.</p><div><button type="button" data-choice="yes">Kabul et / Accepter</button><button type="button" data-choice="no">Reddet / Refuser</button></div>';
  const settings = document.createElement('button'); settings.type = 'button'; settings.id = 'dersai-consent-settings'; settings.textContent = 'Çerez tercihleri / Préférences cookies';
  settings.onclick = () => { panel.hidden = false; panel.querySelector('button').focus(); };
  panel.querySelectorAll('button').forEach(button => button.onclick = () => {
    choice = button.dataset.choice; try { localStorage.setItem(KEY, JSON.stringify({ value: choice, time: Date.now() })); } catch (_) {}
    panel.hidden = true; if (choice === 'yes') start(); else stop(); settings.focus();
  });
  document.body.append(panel, settings);
  if (choice === 'yes') start();
})();
