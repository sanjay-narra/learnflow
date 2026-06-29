/* =========================================================
   LearnFlow – script.js
   ========================================================= */

// ---- Course data ----
const COURSES = [
  {
    id: 1, cat: 'frontend', emoji: '🌐',
    tag: 'Frontend', title: 'HTML & CSS Mastery',
    desc: 'Build pixel-perfect layouts. Learn Flexbox, Grid, animations, and responsive design.',
    rating: 4.9, students: '1.2k', hours: '18h',
    color: '#eef2ff'
  },
  {
    id: 2, cat: 'frontend', emoji: '⚛️',
    tag: 'Frontend', title: 'React – The Complete Guide',
    desc: 'Components, hooks, Context API, and building production-ready SPAs.',
    rating: 4.8, students: '980', hours: '32h',
    color: '#eef2ff'
  },
  {
    id: 3, cat: 'frontend', emoji: '⚡',
    tag: 'Frontend', title: 'JavaScript Deep Dive',
    desc: 'Closures, async/await, ES2024 features, and interview-level problem solving.',
    rating: 4.9, students: '2.1k', hours: '24h',
    color: '#eef2ff'
  },
  {
    id: 4, cat: 'backend', emoji: '🟢',
    tag: 'Backend', title: 'Node.js & Express APIs',
    desc: 'Build REST and GraphQL APIs. Authentication, middleware, and deployment.',
    rating: 4.7, students: '640', hours: '28h',
    color: '#f0fdf4'
  },
  {
    id: 5, cat: 'backend', emoji: '🐍',
    tag: 'Backend', title: 'Python & Django',
    desc: 'Full-stack Python. ORM, views, templates, deployment on cloud platforms.',
    rating: 4.8, students: '870', hours: '36h',
    color: '#f0fdf4'
  },
  {
    id: 6, cat: 'backend', emoji: '🗄️',
    tag: 'Backend', title: 'Databases & SQL',
    desc: 'PostgreSQL, MongoDB, query optimization, and data modeling best practices.',
    rating: 4.7, students: '510', hours: '20h',
    color: '#f0fdf4'
  },
  {
    id: 7, cat: 'design', emoji: '🎨',
    tag: 'Design', title: 'UI/UX Fundamentals',
    desc: 'Design systems, wireframing, Figma, and user research methods.',
    rating: 4.9, students: '730', hours: '22h',
    color: '#fdf4ff'
  },
  {
    id: 8, cat: 'design', emoji: '✏️',
    tag: 'Design', title: 'Figma for Developers',
    desc: 'Components, auto-layout, prototyping, and handoff for engineering teams.',
    rating: 4.8, students: '490', hours: '14h',
    color: '#fdf4ff'
  },
  {
    id: 9, cat: 'data', emoji: '📊',
    tag: 'Data Science', title: 'Data Analysis with Python',
    desc: 'Pandas, NumPy, Matplotlib, and real-world data cleaning projects.',
    rating: 4.8, students: '920', hours: '30h',
    color: '#fff7ed'
  },
  {
    id: 10, cat: 'data', emoji: '🤖',
    tag: 'Data Science', title: 'ML Foundations',
    desc: 'Supervised learning, neural nets, and scikit-learn from scratch.',
    rating: 4.7, students: '670', hours: '40h',
    color: '#fff7ed'
  },
];

// ---- Live activity ticker messages ----
const ACTIVITIES = [
  '🎉 <strong>Arun M.</strong> just completed React Hooks module',
  '📚 <strong>Divya K.</strong> enrolled in Python & Django',
  '⭐ <strong>Rahul S.</strong> earned their Frontend certificate',
  '🔴 Live session starting in <strong>12 minutes</strong> – Node.js Q&A',
  '🎉 <strong>Meena T.</strong> landed a job at a Hyderabad startup!',
  '📚 <strong>Vikram P.</strong> enrolled in UI/UX Fundamentals',
  '⭐ <strong>Sneha R.</strong> rated React Deep Dive <strong>5 stars</strong>',
  '🔴 <strong>87 learners</strong> are studying right now',
];

// ---- Render courses ----
function renderCourses(filter) {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;

  const filtered = filter === 'all' ? COURSES : COURSES.filter(c => c.cat === filter);
  const tagClass = { frontend: 'tag-frontend', backend: 'tag-backend', design: 'tag-design', data: 'tag-data' };

  grid.innerHTML = filtered.map(c => `
    <div class="course-card" onclick="openCourse(${c.id})">
      <div class="course-thumb" style="background:${c.color}">${c.emoji}</div>
      <div class="course-body">
        <span class="course-tag ${tagClass[c.cat]}">${c.tag}</span>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="course-meta">
          <span class="course-rating">⭐ ${c.rating}</span>
          <span>${c.students} students</span>
          <span>🕐 ${c.hours}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openCourse(id) {
  const course = COURSES.find(c => c.id === id);
  if (!course) return;
  // Future: navigate to course detail page. For now, enroll via signup.
  const go = confirm(`Enroll in "${course.title}"?\n\nYou'll be taken to create a free account.`);
  if (go) window.location.href = 'signup.html';
}

// ---- Course filter buttons ----
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      renderCourses(cat);
    });
  });
}

// ---- Live activity ticker ----
function initTicker() {
  const ticker = document.getElementById('activityTicker');
  if (!ticker) return;

  // Duplicate messages so the loop is seamless
  const all = [...ACTIVITIES, ...ACTIVITIES];
  ticker.innerHTML = all.map(msg => `<span>${msg}</span>`).join('');
}

// ---- Mobile hamburger menu ----
function initMenu() {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ---- Smooth scroll for in-page anchors ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Signup form ----
function initSignupForm() {
  const form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#name')?.value;
    const email = form.querySelector('#email')?.value;
    if (!email) return;

    // Simulate account creation
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Creating account…';
    btn.disabled = true;

    setTimeout(() => {
      alert(`Welcome to LearnFlow${name ? ', ' + name : ''}! 🎉\n\nYour account is ready. Start with the free HTML & CSS course.`);
      window.location.href = 'courses.html';
    }, 1200);
  });
}

// ---- Progress bar animation on scroll ----
function initProgressAnim() {
  const fill = document.querySelector('.dash-progress-fill');
  if (!fill) return;

  // The fill width is already set via inline style; animate after load
  const target = fill.style.width;
  fill.style.width = '0';
  setTimeout(() => { fill.style.width = target; }, 600);
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderCourses('all');
  initFilters();
  initTicker();
  initMenu();
  initSmoothScroll();
  initSignupForm();
  initProgressAnim();
});
