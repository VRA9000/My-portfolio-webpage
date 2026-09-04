// ---------- Mobile nav toggle ----------
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Hero terminal typing effect ----------
const target = document.getElementById('typed-code');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lines = [
  { text: 'const developer = {', cls: '' },
  { text: "  name: 'Evangelos Roudosis',", indent: true },
  { text: "  role: 'Junior Front-end Developer',", indent: true },
  { text: "  stack: ['HTML', 'CSS','Bootstrap ', 'JavaScript'],", indent: true },
  { text: '  loves: \'clean, accessible UI\',', indent: true },
  { text: '};', cls: '' },
];

function highlight(line){
  return line
    .replace(/(const|let)/g, '<span class="tok-key">$1</span>')
    .replace(/('[^']*')/g, '<span class="tok-str">$1</span>');
}

async function runTypewriter(){
  let full = '';
  for (const line of lines){
    let current = '';
    for (const char of line.text){
      current += char;
      target.textContent = full + current;
      await sleep(16);
    }
    full += line.text + '\n';
    target.textContent = full;
    await sleep(150);
  }
  // one final highlight pass after typing completes
  target.innerHTML = full
    .split('\n')
    .map(l => highlight(l))
    .join('\n');
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

if (reduceMotion){
  const full = lines.map(l => l.text).join('\n');
  target.innerHTML = full.split('\n').map(l => highlight(l)).join('\n');
} else {
  runTypewriter();
}