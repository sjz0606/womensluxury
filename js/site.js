import { LOOKS } from './data.js';

const T = {
  uz: {
    langAria: "Tilni almashtirish", nNew: 'Kolleksiya', nBoutique: 'Butik', nService: 'Xizmat', nVisit: 'Manzil', call: "Qo'ng'iroq qilish",
    season: 'Fall – Winter 2026/27',
    heroSub: 'Ayollar uchun lyuks kiyimlar. Nafis siluetlar, premium matolar va zamonaviy klassika — Toshkentdagi ikki butikda.',
    heroCta: "Kolleksiyani ko'rish", heroVisit: 'Butikka kelish',
    metaCity: "Toshkent · ikki butik", metaTime: 'Har kuni 10:00 – 22:00',
    scroll: 'Pastga suring', colTitle: 'Yangi kolleksiya', lookOpen: "Obrazni ko'rish",
    manKick: 'Bizning qarash', manQuote: 'Har bir detal — *nafislik* va *mukammallik* haqida.',
    bqKick: 'Butik', bqTitle: 'Arkalar ostidagi *sokin hashamat*',
    bqLead: "Yorug' zallar, keng tokchalar va har bir obraz uchun alohida joy. Kiyimni shoshilmasdan tanlash uchun yaratilgan makon.",
    bq1: "Mavsum kolleksiyasi", bq1t: "Fall–Winter 2026/27: palto, mo'yna, kostyum, trikotaj va aksessuarlar bitta zalda.",
    bq2: 'Obraz yig\'ish', bq2t: "Konsultant ustki kiyimdan sumkagacha to'liq obrazni siz bilan birga tanlaydi.",
    bq3: "Kiyib ko'rish", bq3t: "Shinam kiyinish xonalari — o'lcham va siluetni joyida aniqlang.",
    svKick: 'Xizmat', svTitle: 'Siz uchun *qulay*',
    sv1: 'Shaxsiy tanlov', sv1t: "Obrazingizni oldindan yozib qoldiring — kelishingizgacha o'lchamingizdagi variantlar tayyor turadi.",
    sv2: 'Yetkazib berish', sv2t: "Tanlangan kiyimni Toshkent bo'ylab yetkazib berish — shartlarini menejerdan so'rang.",
    sv3: 'Telegramda maslahat', sv3t: "Rasm yuboring yoki savol bering — menejer o'lcham, rang va mavjudlik haqida javob beradi.",
    sv4: 'Bolalar uchun', sv4t: 'Kichik xonimlar va janoblar uchun alohida yo\'nalish.',
    rqKick: "Shaxsiy so'rov", rqTitle: 'Obrazingizni *oldindan* tanlaymiz',
    rqLead: "Nima qidirayotganingizni belgilang — so'rov Telegram orqali to'g'ridan-to'g'ri menejerga boradi.",
    rqPic: "Har so'rovni menejer shaxsan ko'rib chiqadi", rqWhat: 'Nima qidiryapsiz', rqSize: "O'lcham", rqShop: 'Qaysi butik', rqName: 'Ism', rqPhone: 'Telefon',
    rqSend: "Telegram orqali yuborish", rqNote: "Menejer odatda ish vaqtida tez javob beradi.",
    rqBad: "Ism va telefon raqamini to'ldiring.", rqOk: "Telegram ochildi — xabarni yuboring, menejer siz bilan bog'lanadi.",
    what: ['Palto', "Mo'yna", 'Kostyum', 'Trikotaj', "Ko'ylak", 'Sumka va poyabzal'],
    shops: ['Osiyo ko\'chasi', 'Chilonzor', 'Farqi yo\'q'],
    viKick: 'Tashrif', viTitle: 'Ikki butik, *bitta did*',
    s1: '1-filial', s1a: "Osiyo ko'chasi, 1", s1h: "Mo'ljal: Novomoskovskaya, Golden House",
    s2: '2-filial', s2a: 'Chilonzor, 1-kvartal, 15-uy', s2h: "Mo'ljal: Muqimiy ko'chasi",
    daily: 'Har kuni 10:00 – 22:00', ctKick: 'Aloqa', tgChannel: 'Telegram kanal',
    footSub: 'Nafislik — har bir detalda', city: 'Toshkent',
    dCall: "Qo'ng'iroq", dMap: 'Manzil', close: 'Yopish', sound: 'Ovoz',
    dlgHow: "Mavjudlik va o'lchamlarni menejerdan so'rang yoki butikka kelib kiyib ko'ring.",
    dlgAsk: "Shu obrazni so'rash", prev: 'Oldingi', next: 'Keyingi',
    askText: (n) => `Assalomu alaykum! Saytdan yozyapman. «${n}» obrazi qiziqtirdi — mavjudmi?`,
    reqText: (o) => `Assalomu alaykum! Saytdan shaxsiy so'rov.\nQidiryapman: ${o.what || '—'}\nO'lcham: ${o.size || '—'}\nButik: ${o.shop || '—'}\nIsm: ${o.name}\nTelefon: ${o.phone}`,
  },
  ru: {
    langAria: 'Сменить язык', nNew: 'Коллекция', nBoutique: 'Бутик', nService: 'Сервис', nVisit: 'Адреса', call: 'Позвонить',
    season: 'Fall – Winter 2026/27',
    heroSub: 'Женская одежда класса люкс. Изящные силуэты, премиальные ткани и современная классика — в двух бутиках Ташкента.',
    heroCta: 'Смотреть коллекцию', heroVisit: 'Посетить бутик',
    metaCity: 'Ташкент · два бутика', metaTime: 'Ежедневно 10:00 – 22:00',
    scroll: 'Листайте вниз', colTitle: 'Новая коллекция', lookOpen: 'Смотреть образ',
    manKick: 'Наш взгляд', manQuote: 'Каждая деталь — об *изяществе* и *совершенстве*.',
    bqKick: 'Бутик', bqTitle: '*Тихая роскошь* под арками',
    bqLead: 'Светлые залы, просторные ниши и отдельное место для каждого образа. Пространство, где одежду выбирают без спешки.',
    bq1: 'Коллекция сезона', bq1t: 'Fall–Winter 2026/27: пальто, мех, костюмы, трикотаж и аксессуары в одном зале.',
    bq2: 'Сборка образа', bq2t: 'Консультант вместе с вами соберёт полный образ — от верхней одежды до сумки.',
    bq3: 'Примерка', bq3t: 'Уютные примерочные — размер и силуэт определите на месте.',
    svKick: 'Сервис', svTitle: '*Удобно* для вас',
    sv1: 'Персональный подбор', sv1t: 'Оставьте запрос заранее — к вашему приходу подготовят варианты в вашем размере.',
    sv2: 'Доставка', sv2t: 'Доставка выбранных вещей по Ташкенту — условия уточняйте у менеджера.',
    sv3: 'Консультация в Telegram', sv3t: 'Пришлите фото или задайте вопрос — менеджер подскажет размер, цвет и наличие.',
    sv4: 'Для детей', sv4t: 'Отдельное направление для маленьких леди и джентльменов.',
    rqKick: 'Личный запрос', rqTitle: 'Подберём образ *заранее*',
    rqLead: 'Отметьте, что вы ищете — запрос уйдёт напрямую менеджеру в Telegram.',
    rqPic: 'Каждый запрос менеджер рассматривает лично', rqWhat: 'Что ищете', rqSize: 'Размер', rqShop: 'Какой бутик', rqName: 'Имя', rqPhone: 'Телефон',
    rqSend: 'Отправить в Telegram', rqNote: 'В рабочее время менеджер обычно отвечает быстро.',
    rqBad: 'Заполните имя и номер телефона.', rqOk: 'Telegram открыт — отправьте сообщение, менеджер свяжется с вами.',
    what: ['Пальто', 'Мех', 'Костюм', 'Трикотаж', 'Платье', 'Сумки и обувь'],
    shops: ['ул. Осиё', 'Чиланзар', 'Без разницы'],
    viKick: 'Визит', viTitle: 'Два бутика, *один вкус*',
    s1: 'Филиал 1', s1a: 'ул. Осиё, 1', s1h: 'Ориентир: Новомосковская, Golden House',
    s2: 'Филиал 2', s2a: 'Чиланзар, 1-й квартал, дом 15', s2h: 'Ориентир: ул. Мукими',
    daily: 'Ежедневно 10:00 – 22:00', ctKick: 'Контакты', tgChannel: 'Telegram-канал',
    footSub: 'Изящество — в каждой детали', city: 'Ташкент',
    dCall: 'Позвонить', dMap: 'Адрес', close: 'Закрыть', sound: 'Звук',
    dlgHow: 'Наличие и размеры уточняйте у менеджера или примерьте в бутике.',
    dlgAsk: 'Спросить про образ', prev: 'Назад', next: 'Далее',
    askText: (n) => `Здравствуйте! Пишу с сайта. Интересует образ «${n}» — есть в наличии?`,
    reqText: (o) => `Здравствуйте! Личный запрос с сайта.\nИщу: ${o.what || '—'}\nРазмер: ${o.size || '—'}\nБутик: ${o.shop || '—'}\nИмя: ${o.name}\nТелефон: ${o.phone}`,
  },
};
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const TG = 'https://t.me/womensluxuryshop';
let lang = localStorage.getItem('wl-lang') || ((navigator.language || '').startsWith('ru') ? 'ru' : 'uz');
const $ = s => document.querySelector(s);
const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const rich = s => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');

/* ---------- Tillar ---------- */
function applyLang() {
  const L = T[lang];
  document.documentElement.lang = lang;
  $('#lang').textContent = lang === 'uz' ? 'RU' : 'UZ';
  document.querySelectorAll('[data-t]').forEach(el => {
    if (el.id === 'manQ') return;
    const v = L[el.dataset.t]; if (typeof v === 'string') el.innerHTML = rich(v);
  });
  document.querySelectorAll('[data-t-aria]').forEach(el => el.setAttribute('aria-label', L[el.dataset.tAria]));
  document.querySelectorAll('[data-ph-uz]').forEach(el => el.placeholder = el.dataset['ph' + (lang === 'uz' ? 'Uz' : 'Ru')]);
  buildManifest(); buildChips(); renderLook(curLook, true); buildFlat();
  if (!$('#dlg').hidden) fillDlg();
}
$('#lang').addEventListener('click', () => { lang = lang === 'uz' ? 'ru' : 'uz'; localStorage.setItem('wl-lang', lang); applyLang(); });

/* Manifest: so'zlar scroll bilan yonadi */
function buildManifest() {
  const q = $('#manQ');
  q.innerHTML = T[lang].manQuote.split(' ').map(w => {
    const g = /\*/.test(w);
    return `<span class="w${g ? ' g' : ''}">${esc(w.replace(/\*/g, ''))}</span>`;
  }).join(' ');
}

/* ---------- So'rov formasi ---------- */
const pick = { what: new Set(), size: '', shop: '' };
function chip(label, on, fn) {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = label;
  b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.addEventListener('click', fn); return b;
}
function buildChips() {
  const L = T[lang];
  const fill = (id, list, isOn, onClick) => {
    const fs = $(id); fs.querySelectorAll('.chip').forEach(c => c.remove());
    list.forEach((x, i) => fs.append(chip(x, isOn(i), () => { onClick(i); buildChips(); })));
  };
  fill('#rqWhat', L.what, i => pick.what.has(i), i => pick.what.has(i) ? pick.what.delete(i) : pick.what.add(i));
  fill('#rqSize', SIZES, i => pick.size === i, i => pick.size = pick.size === i ? '' : i);
  fill('#rqShop', L.shops, i => pick.shop === i, i => pick.shop = pick.shop === i ? '' : i);
}
$('#rqP').addEventListener('input', e => {
  let d = e.target.value.replace(/\D/g, ''); if (!d.startsWith('998')) d = '998' + d.replace(/^998/, '');
  d = d.slice(0, 12);
  const p = [d.slice(0, 3), d.slice(3, 5), d.slice(5, 8), d.slice(8, 10), d.slice(10, 12)].filter(Boolean);
  e.target.value = '+' + p.join(' ');
});
$('#rqForm').addEventListener('submit', e => {
  e.preventDefault();
  const L = T[lang], n = $('#rqN'), p = $('#rqP'), note = $('#rqNote');
  const okN = n.value.trim().length > 1, okP = p.value.replace(/\D/g, '').length === 12;
  n.classList.toggle('bad', !okN); p.classList.toggle('bad', !okP);
  if (!okN || !okP) { note.textContent = L.rqBad; note.classList.remove('ok'); return; }
  const text = L.reqText({
    what: [...pick.what].map(i => L.what[i]).join(', '), size: pick.size === '' ? '' : SIZES[pick.size],
    shop: pick.shop === '' ? '' : L.shops[pick.shop], name: n.value.trim(), phone: p.value,
  });
  window.open(`${TG}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  note.textContent = L.rqOk; note.classList.add('ok');
});

/* ---------- Obraz paneli ---------- */
let curLook = 0, stage = null;
const pad = n => String(n + 1).padStart(2, '0');
$('#lookAll').textContent = pad(LOOKS.length - 1);
function renderLook(i, instant) {
  if (i < 0) return;
  const set = () => {
    curLook = i; const d = LOOKS[i][lang];
    $('#lookNo').textContent = pad(i); $('#lookName').textContent = d[0]; $('#lookNote').textContent = d[1];
  };
  if (instant) return set();
  const box = $('#look'); box.classList.add('swap');
  setTimeout(() => { set(); box.classList.remove('swap'); }, 260);
}
$('#lookOpen').addEventListener('click', () => openDlg(curLook));

/* ---------- Dialog ---------- */
let dlgI = 0;
const dv = $('#dlgVideo');
function fillDlg() {
  const l = LOOKS[dlgI], d = l[lang];
  $('#dlgNo').textContent = `${pad(dlgI)} / ${pad(LOOKS.length - 1)}`;
  $('#dlgName').textContent = d[0]; $('#dlgNote').textContent = d[1];
  $('#dlgAsk').href = `${TG}?text=${encodeURIComponent(T[lang].askText(d[0]))}`;
}
function openDlg(i) {
  dlgI = (i + LOOKS.length) % LOOKS.length;
  const l = LOOKS[dlgI];
  fillDlg();
  dv.poster = `assets/v/${l.id}.webp`; dv.src = `assets/v/${l.id}.mp4`; dv.muted = true; setSnd();
  $('#dlg').hidden = false; document.body.style.overflow = 'hidden'; lenis?.stop(); stage?.pause();
  dv.play().catch(() => {});
  $('#dlgX').focus({ preventScroll: true });
}
function closeDlg() { $('#dlg').hidden = true; dv.pause(); dv.removeAttribute('src'); dv.load(); document.body.style.overflow = ''; lenis?.start(); stage?.resume(); }
function setSnd() { $('#sndUse').setAttribute('href', dv.muted ? '#i-mute' : '#i-sound'); }
$('#snd').addEventListener('click', () => { dv.muted = !dv.muted; setSnd(); });
$('#dlgX').addEventListener('click', closeDlg); $('#dlgBg').addEventListener('click', closeDlg);
$('#dlgPrev').addEventListener('click', () => openDlg(dlgI - 1)); $('#dlgNext').addEventListener('click', () => openDlg(dlgI + 1));
addEventListener('keydown', e => {
  if ($('#dlg').hidden) return;
  if (e.key === 'Escape') closeDlg(); if (e.key === 'ArrowRight') openDlg(dlgI + 1); if (e.key === 'ArrowLeft') openDlg(dlgI - 1);
});

/* ---------- Fallback ro'yxat ---------- */
let flatOn = false;
function buildFlat() {
  if (!flatOn) return;
  $('#flatGrid').innerHTML = LOOKS.map((l, i) => `<button type="button" data-i="${i}"><figure><img src="assets/v/${l.id}.webp" alt="" loading="lazy"></figure><b>${esc(l[lang][0])}</b></button>`).join('');
  $('#flatGrid').querySelectorAll('button').forEach(b => b.addEventListener('click', () => openDlg(+b.dataset.i)));
}

/* ---------- Scroll ---------- */
let lenis = null;
if (window.Lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
}
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href'); const el = id.length > 1 && document.querySelector(id); if (!el) return;
  e.preventDefault();
  let y = el.getBoundingClientRect().top + scrollY;
  if (id === '#kolleksiya' && stage) y = arcadeY(stage.progressFor(0));
  if (id === '#bosh') y = 0;
  lenis ? lenis.scrollTo(y, { duration: 1.6 }) : scrollTo({ top: y, behavior: 'smooth' });
}));
const arc = $('.arcade');
const arcadeY = p => arc.offsetTop + p * (arc.offsetHeight - innerHeight);

function onScroll() {
  const y = scrollY, vh = innerHeight;
  $('#top').classList.toggle('solid', y > 40);
  document.querySelector('.dock').classList.toggle('on', y > vh * 0.6);
  if (stage) {
    const p = (y - arc.offsetTop) / (arc.offsetHeight - vh);
    stage.setProgress(p);
  }
  // manifest
  const q = $('#manQ'), r = q.getBoundingClientRect();
  const k = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
  const ws = q.querySelectorAll('.w'); ws.forEach((w, i) => w.classList.toggle('on', i < Math.round(k * ws.length)));
}
addEventListener('scroll', onScroll, { passive: true });

/* reveal + lazy video */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.sec-head, .bq-text, .sv, .rq-card, .shop, .contact, .bq-media figure').forEach(el => { el.classList.add('rv'); io.observe(el); });
const vio = new IntersectionObserver(es => es.forEach(e => {
  const v = e.target;
  if (e.isIntersecting) { if (!v.src && v.dataset.src) v.src = v.dataset.src; v.play().catch(() => {}); } else v.pause();
}), { rootMargin: '200px' });
document.querySelectorAll('video[data-src]').forEach(v => vio.observe(v));

/* ---------- Ishga tushirish ---------- */
const bar = $('#veilBar'); bar.style.width = '35%';
function hasGL() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } }

async function boot() {
  applyLang();
  const t0 = performance.now();
  if (hasGL()) {
    try {
      const { createStage } = await import('./stage.js');
      bar.style.width = '70%';
      stage = await createStage($('#gl'), LOOKS, {
        onActive(i) { $('#look').classList.toggle('on', i >= 0); $('#rail').classList.toggle('on', i >= 0); if (i >= 0 && i !== curLook) renderLook(i); },
        onProgress(p, enter, walk) {
          const h = $('#hero'); const o = 1 - Math.min(1, p / (innerWidth < 760 ? 0.035 : 0.06));
          h.style.opacity = o; h.style.transform = `translateY(${-p * 600}px)`; h.style.visibility = o < 0.01 ? 'hidden' : ''; h.style.pointerEvents = o < 0.6 ? 'none' : '';
          $('#hint').style.opacity = o; $('#heroFrame').style.opacity = o;
          $('#railFill').style.height = (walk * 100) + '%';
        },
        onOpen: openDlg,
      });
    } catch (err) { console.error(err); stage = null; }
  }
  if (!stage) {
    flatOn = true; $('#flat').hidden = false; arc.style.height = '100vh'; $('#gl').remove(); buildFlat();
    document.body.style.background = 'radial-gradient(120% 80% at 70% 0%,#f0d8d1,#f8f1ec 60%)';
  }
  bar.style.width = '100%';
  const wait = Math.max(0, 1500 - (performance.now() - t0));
  setTimeout(() => { document.body.classList.remove('is-loading'); onScroll(); }, wait);
}
boot();
