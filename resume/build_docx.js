// Builds Muhammad_Uzair_Resume.docx (run: node build_docx.js)
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, LevelFormat,
  TabStopType, ExternalHyperlink,
} = require('docx');

const FONT = 'Calibri';
const SIZE = 20; // 10pt
const RIGHT_TAB = 10466; // A4 width 11906 - margins 720*2

const runs = (text, base = {}) =>
  // supports **bold** segments
  text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(s =>
    s.startsWith('**') ? new TextRun({ text: s.slice(2, -2), bold: true, ...base })
                       : new TextRun({ text: s, ...base }));

const heading = t => new Paragraph({
  spacing: { before: 160, after: 60 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 1 } },
  children: [new TextRun({ text: t.toUpperCase(), bold: true, size: 22 })],
});
const para = t => new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { after: 40 }, children: runs(t) });
const bullet = t => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, alignment: AlignmentType.JUSTIFIED, spacing: { after: 20 }, children: runs(t) });
const row = (left, right, italic) => new Paragraph({
  spacing: { before: 80, after: 20 },
  tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
  children: [...runs(left), ...(italic ? [new TextRun({ text: italic, italics: true })] : []), new TextRun({ text: '\t' + right })],
});
const skill = (k, v) => new Paragraph({ spacing: { after: 30 }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: k + ': ', bold: true }), new TextRun(v)] });
const tech = v => skill('Technologies', v);

const link = (text, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text, color: '000000' })] });

const children = [
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'MUHAMMAD UZAIR', bold: true, size: 40 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [new TextRun({ text: 'Python Full Stack Developer - Django & FastAPI · REST APIs · AI / LLM Integrations', size: 21 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [
    new TextRun('Karachi, Pakistan | +92 3XX XXXXXXX | '),
    link('uzairawan156@gmail.com', 'mailto:uzairawan156@gmail.com'), new TextRun(' | '),
    link('linkedin.com/in/uzair-', 'https://www.linkedin.com/in/uzair-/'), new TextRun(' | '),
    link('github.com/Uzairrrrrr', 'https://github.com/Uzairrrrrr'),
  ] }),

  heading('Professional Summary'),
  para('Python Full Stack Developer with 3+ years of experience designing, building, and deploying production web applications, RESTful APIs, and AI-powered services using Python, Django, Django REST Framework, FastAPI, React, and PostgreSQL. At Al-Nafi, built backend services for the Al-Baseer internal analytics platform: payment reconciliation across Stripe, UBL IPG, and Easypaisa, Thinkific LMS webhooks, JWT authentication, Redis caching, and automated report exports to AWS S3. Delivered 10+ client projects end to end (pharma CRM, payroll, e-commerce, CMS, and coupon platforms), from database design to Docker and Gunicorn deployment. Hands-on with LLM integrations (Google Gemini, OpenAI GPT, RAG with Qdrant), OCR and computer vision (Tesseract, OpenCV), web scraping, and data pipelines with Pandas.'),

  heading('Technical Skills'),
  skill('Languages', 'Python, JavaScript, TypeScript, SQL, HTML5, CSS3'),
  skill('Backend & APIs', 'Django, Django REST Framework (DRF), FastAPI, GraphQL (Strawberry), WebSockets, RESTful API design, JWT authentication (SimpleJWT), OpenAPI/Swagger (drf-spectacular), webhooks, Pydantic'),
  skill('Frontend', 'React, Next.js, Vue.js, Tailwind CSS, Docusaurus, responsive UI, vanilla JavaScript'),
  skill('Databases & Caching', 'PostgreSQL, MySQL, SQLite, Redis, SQLAlchemy ORM, Django ORM, Qdrant (vector database), query optimization'),
  skill('AI / ML & Data', 'Google Gemini API, OpenAI GPT API, LLM agents, Retrieval-Augmented Generation (RAG), prompt engineering, Tesseract OCR, OpenCV, Hugging Face Transformers, Pandas, NumPy, Streamlit'),
  skill('Cloud & DevOps', 'AWS (S3, boto3, django-storages), Docker, Docker Compose, Gunicorn, WhiteNoise, Heroku, Linux, Git, GitHub, Sentry monitoring'),
  skill('Integrations & Automation', 'Stripe, Easypaisa, UBL IPG, Thinkific, Open edX (OLX/XML), Selenium, BeautifulSoup, Requests, WeasyPrint (PDF), CSV/XLSX import-export'),
  skill('Testing & Practices', 'pytest, pytest-django, unit testing, flake8, black, code reviews, Agile/Scrum, technical documentation'),

  heading('Professional Experience'),
  row('**Full Stack Developer (Python / Django)** | Al-Nafi', '2023 - Present · Karachi'),
  bullet('Built and maintained RESTful APIs with Django REST Framework for **Al-Baseer**, Al-Nafi\'s internal analytics platform, serving users, enrollments, payments, products, and trainers data for Al-Nafi and Islamic Academy.'),
  bullet('Developed payment search, validation, and reconciliation services across **Stripe, UBL IPG, and Easypaisa** gateways, including renewal tracking and date-range reporting used by finance and sales teams.'),
  bullet('Integrated **Thinkific webhooks** (user and enrollment events) to sync LMS data in real time, eliminating manual data entry between systems.'),
  bullet('Implemented JWT authentication with secure cookie-based tokens and group-based permission classes to enforce role-based access control (RBAC) across internal APIs.'),
  bullet('Improved API response times with **Redis caching** and query optimization on MySQL/PostgreSQL; tracked production errors with **Sentry**.'),
  bullet('Automated CSV/XLSX report generation with Pandas and uploaded exports to **AWS S3** via boto3; added admin import/export and date-range filters for operations staff.'),
  bullet('Built a Python automation tool that converts CSV course outlines into **Open edX OLX XML** (course, chapter, sequential, vertical) with UUID-based files, turning hours of manual course setup into a single command.'),
  bullet('Wrote **Selenium** automated test scripts for payment flows (debit card, direct deposit, Easypaisa, ePay) to catch checkout regressions before release.'),
  row('**Freelance Python Full Stack Developer** | Self-Employed', '2024 - Present · Remote'),
  bullet('Delivered 10+ production web applications for clients in pharma, outdoor advertising, retail, e-commerce, and digital media using Django, Tailwind CSS, PostgreSQL, Gunicorn, and WhiteNoise.'),
  bullet('Built **Human 4 Health Pharma CRM** with 8 Django apps (doctors and visits, medical representatives, distributors, medical stores, products and batches, sales, HR, analytics), including expiry alerts, performance snapshots, and a CSV import tool with preview and validation.'),
  bullet('Developed a multi-company **Payroll Management System** with Pakistan income-tax slabs, provident fund, gratuity, advance deductions, bulk payroll processing, and PDF payslips (WeasyPrint); containerized with Docker on PostgreSQL.'),
  bullet('Built an e-commerce REST backend (DRF, SimpleJWT) with products, collections, coupons, orders, and reviews, storing media on **AWS S3** via django-storages.'),
  bullet('Shipped SEO-focused coupon and blog platforms with real-time community voting, search and filters, CMS-managed content, newsletters, and admin import/export (CSV, XLSX, JSON).'),

  heading('Custom Projects'),
  row('**AI Flyer Offer Extraction Agent**', 'Private repository', ' - LLM / Computer Vision'),
  bullet('Built an AI agent that sends retail flyer images to **Google Gemini** (multimodal) and returns structured JSON of offers, prices, and validity dates through a FastAPI service with async job management and Pydantic validation.'),
  bullet('Built a companion **Flyer Offer Detection API** (Django REST Framework, OpenCV, Tesseract) that detects product boxes, runs multi-language OCR (Arabic, English, Urdu, Hindi, French, Spanish) with per-offer confidence scores, and stores cropped offer images; benchmarked **DeepSeek-OCR** (Hugging Face Transformers) as an alternative.'),
  tech('Python, FastAPI, Google Gemini API, Django REST Framework, OpenCV, Tesseract OCR, Transformers, Pillow, Pydantic'),
  row('**AI-Driven E-Book Platform with RAG Chatbot**', 'github.com/Uzairrrrrr/hackathon-1', ' - Hackathon'),
  bullet('Built an interactive e-book with a **RAG chatbot**: book content indexed in Qdrant and answered by Gemini, with JWT signup/login, user profiling, AI-personalized content, and cached Urdu translation.'),
  tech('FastAPI, Google Gemini, Qdrant, SQLAlchemy, JWT, React, TypeScript, Docusaurus, Docker'),
  row('**TaskFlow - Real-Time Task Management App**', 'github.com/Uzairrrrrr/taskflow'),
  bullet('Built a full-stack task manager exposing both REST and **GraphQL** APIs, with **WebSocket** live updates, JWT authentication, filtering by status, priority, and category, and a statistics dashboard.'),
  tech('FastAPI, Strawberry GraphQL, WebSockets, SQLAlchemy, Pydantic, React, Tailwind CSS'),
  row('**AI Job Description Parser**', 'github.com/Uzairrrrrr/ai-job-parser'),
  bullet('Built an LLM pipeline that reads job listings from CSV and uses the **OpenAI GPT API** to extract job summaries, key responsibilities, and required skills into a clean, analysis-ready dataset.'),
  tech('Python, OpenAI API, Pandas, Pydantic, tqdm'),
  row('**Academic Paper Data Scraper**', 'github.com/Uzairrrrrr/released-papers-data-scrapper'),
  bullet('Built a configurable data collection pipeline on the **OpenAlex API** that gathers 1,000+ papers (2023-2025) with citations, references, and related works, de-duplicates records, and exports CSV and JSON.'),
  tech('Python, Requests, Pandas, REST APIs, JSON'),

  heading('Other Projects'),
  bullet('**DRF E-commerce API:** nested categories (django-mptt), OpenAPI docs (drf-spectacular), and tests with pytest and pytest-django.'),
  bullet('**Recipe API and Django + Vue app:** containerized with Docker and Docker Compose, backed by MySQL, with unit tests.'),
  bullet('**Streamlit apps:** personal library manager (SQLite, Pandas, live stats dashboard) and a game hub; built during the GIAIC program.'),

  heading('Education'),
  row('**Federal Urdu University of Arts, Sciences & Technology**', 'Karachi, Pakistan'),
  new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }], children: [new TextRun({ text: 'Bachelor of Computer Science (Graduated)', italics: true }), new TextRun('\tMar 2020 - Mar 2024')] }),
  row('**DJ Sindh Government Science College**', 'Karachi, Pakistan'),
  new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }], children: [new TextRun({ text: 'Intermediate, Pre-Engineering', italics: true }), new TextRun('\tAug 2017 - Jul 2019')] }),
];

const doc = new Document({
  creator: 'Muhammad Uzair',
  title: 'Muhammad Uzair - Resume',
  styles: { default: { document: { run: { font: FONT, size: SIZE } } } },
  numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 300, hanging: 220 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 680, bottom: 680, left: 720, right: 720 } } }, children }],
});

Packer.toBuffer(doc).then(buf => fs.writeFileSync(path.join(__dirname, 'Muhammad_Uzair_Resume.docx'), buf));
