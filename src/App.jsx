import React, { useEffect, useMemo, useState } from "react";

function makeIcon(label) {
  return function InlineIcon({ className = "" }) {
    return (
      <span className={`inline-flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-[10px] font-black leading-none text-slate-700 ${className}`}>
        {label}
      </span>
    );
  };
}

const Download = makeIcon("↓");
const FileText = makeIcon("CV");
const Plus = makeIcon("+");
const Trash2 = makeIcon("×");
const Sparkles = makeIcon("✦");
const Palette = makeIcon("◐");
const Save = makeIcon("✓");
const Upload = makeIcon("↑");
const RotateCcw = makeIcon("↺");
const CheckCircle2 = makeIcon("✓");
const AlertCircle = makeIcon("!");
const Briefcase = makeIcon("▣");
const GraduationCap = makeIcon("◈");
const Code2 = makeIcon("</>");
const Award = makeIcon("★");
const Languages = makeIcon("文");
const User = makeIcon("人");
const Mail = makeIcon("@");
const Phone = makeIcon("☎");
const MapPin = makeIcon("⌖");
const LinkIcon = makeIcon("↗");

const motion = {
  div: ({ children, initial, animate, transition, ...props }) => <div {...props}>{children}</div>,
};

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, onClick, variant = "default", size = "default", className = "", disabled = false, type = "button" }) {
  const variantClass = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900",
  }[variant] || "bg-slate-900 text-white hover:bg-slate-800";
  const sizeClass = size === "icon" ? "h-9 w-9 p-0" : size === "sm" ? "px-3 py-1.5 text-xs" : "px-3 py-2 text-sm";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${variantClass} ${sizeClass} ${className}`}>
      {children}
    </button>
  );
}

const emptyExperience = {
  role: "",
  company: "",
  location: "",
  start: "",
  end: "",
  bullets: [""],
};

const emptyEducation = {
  school: "",
  degree: "",
  location: "",
  start: "",
  end: "",
  details: "",
};

const emptyProject = {
  name: "",
  tech: "",
  link: "",
  bullets: [""],
};

const starterResume = {
  personal: {
    name: "Clyde Chen",
    title: "Software Development Student",
    email: "clyde@example.com",
    phone: "+61 400 000 000",
    location: "Sydney, Australia",
    website: "linkedin.com/in/clyde",
    summary:
      "Software development student with experience in Python, JavaScript, machine learning prototypes, and project quality/risk management. Interested in building practical, user-focused digital products.",
  },
  skills: ["Python", "JavaScript", "HTML/CSS", "React", "Machine Learning", "Project Management", "Risk Management", "Quality Management"],
  experience: [
    {
      role: "AI Shopping Cart Platform — Quality & Risk Lead",
      company: "University Project",
      location: "Sydney",
      start: "2025",
      end: "Present",
      bullets: [
        "Defined quality standards for user analysis, product recognition, context recognition, and recommendation modules.",
        "Created a risk register covering model accuracy, data quality, integration delay, and front-end usability risks.",
        "Coordinated testing priorities between Python machine learning components and HTML/JavaScript front-end features.",
      ],
    },
  ],
  education: [
    {
      school: "The University of Sydney",
      degree: "Software Development / IT Coursework",
      location: "Sydney, Australia",
      start: "2024",
      end: "Present",
      details: "Relevant coursework: Project Management in IT, service operations, database concepts, and software development.",
    },
  ],
  projects: [
    {
      name: "AI Shopping Cart Recommendation System",
      tech: "Python, JavaScript, HTML, Machine Learning",
      link: "",
      bullets: [
        "Designed a modular recommendation workflow using image recognition and contextual user analysis.",
        "Prepared quality and risk management plans to improve reliability and reduce implementation uncertainty.",
      ],
    },
  ],
  languages: ["Mandarin Chinese — Native", "English — Professional working proficiency"],
  certifications: ["Project Management coursework", "Service operations and ITIL study"],
};

const templates = [
  { id: "modern", label: "Modern", description: "适合科技、产品、设计岗位" },
  { id: "executive", label: "Executive", description: "类似截图：左侧信息栏 + 深色标题栏" },
  { id: "classic", label: "Classic", description: "适合正式企业、学校申请" },
  { id: "compact", label: "Compact", description: "内容多时更省空间" },
];

const uiText = {
  zh: {
    profile: "个人简介",
    skills: "技能",
    experience: "经历",
    projects: "项目",
    education: "教育背景",
    certifications: "证书 / 奖项",
    languages: "语言能力",
    contact: "联系方式",
    chooseTemplate: "选择简历模板",
    templates: "模板",
    basic: "基本信息",
    expTab: "经历",
    projectsTab: "项目",
    educationTab: "教育",
    extraTab: "技能/其他",
    aiTips: "AI 写作提示",
    aiTipSub: "把描述改成更像求职简历的表达",
    languageSwitch: "语言",
    chinese: "中文",
    english: "English",
  },
  en: {
    profile: "Summary",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
    contact: "Contact",
    chooseTemplate: "Choose Resume Template",
    templates: "Templates",
    basic: "Basic Info",
    expTab: "Experience",
    projectsTab: "Projects",
    educationTab: "Education",
    extraTab: "Skills / Extra",
    aiTips: "AI Writing Tips",
    aiTipSub: "Turn descriptions into stronger resume statements",
    languageSwitch: "Language",
    chinese: "中文",
    english: "English",
  },
};

function TextInput({ label, value, onChange, placeholder, icon: Icon, textarea = false }) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        />
      )}
    </label>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          {Icon ? <Icon className="h-4 w-4" /> : null}
          {title}
        </h3>
        {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

function BulletEditor({ bullets, onChange }) {
  const updateBullet = (index, value) => {
    const next = [...bullets];
    next[index] = value;
    onChange(next);
  };

  const addBullet = () => onChange([...bullets, ""]);
  const removeBullet = (index) => onChange(bullets.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      {bullets.map((bullet, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={bullet}
            onChange={(e) => updateBullet(index, e.target.value)}
            placeholder="用动词开头，例如：Improved..., Built..., Managed..."
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => removeBullet(index)}
            disabled={bullets.length === 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" className="rounded-xl" onClick={addBullet}>
        <Plus className="mr-1 h-4 w-4" /> 添加要点
      </Button>
    </div>
  );
}

function ArrayEditor({ items, onChange, placeholder }) {
  const updateItem = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            disabled={items.length === 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" className="rounded-xl" onClick={() => onChange([...items, ""])}>
        <Plus className="mr-1 h-4 w-4" /> 添加
      </Button>
    </div>
  );
}

function ExecutiveResumePreview({ resume, language }) {
  const t = uiText[language];
  const clean = (arr) => (arr || []).filter((item) => String(item || "").trim());
  const initials = (resume.personal.name || "Your Name")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "CV";

  return (
    <div id="resume-preview" className="mx-auto grid min-h-[1056px] w-full max-w-[816px] grid-cols-[245px_1fr] bg-white shadow-2xl print:shadow-none">
      <aside className="border-r border-slate-200 bg-slate-50 p-8 text-slate-900">
        <div className="mb-7 flex h-36 w-full items-center justify-center border border-rose-200 bg-white">
          <div className="text-center">
            <div className="mx-auto mb-4 h-px w-12 bg-slate-300" />
            <div className="text-4xl font-black tracking-tight">{initials}</div>
            <div className="mx-auto mt-4 h-px w-12 bg-slate-300" />
          </div>
        </div>

        <section className="mb-7">
          <h2 className="mb-3 border-b border-slate-300 pb-1 text-xs font-black uppercase tracking-[0.18em] text-slate-700">{t.contact}</h2>
          <div className="space-y-2 text-xs leading-5 text-slate-700">
            {resume.personal.location ? <p>{resume.personal.location}</p> : null}
            {resume.personal.phone ? <p>{resume.personal.phone}</p> : null}
            {resume.personal.email ? <p>{resume.personal.email}</p> : null}
            {resume.personal.website ? <p>{resume.personal.website}</p> : null}
          </div>
        </section>

        {resume.education.filter((x) => x.school || x.degree).length ? (
          <section className="mb-7">
            <h2 className="mb-3 border-b border-slate-300 pb-1 text-xs font-black uppercase tracking-[0.18em] text-slate-700">{t.education}</h2>
            <div className="space-y-4">
              {resume.education.map((item, index) =>
                item.school || item.degree ? (
                  <div key={index} className="text-xs leading-5 text-slate-700">
                    <h3 className="font-black text-slate-900">{item.degree || "Degree"}</h3>
                    <p className="font-semibold">{item.school || "School"}</p>
                    {item.location ? <p>{item.location}</p> : null}
                    <p>{[item.start, item.end].filter(Boolean).join(" — ")}</p>
                    {item.details ? <p className="mt-1 text-slate-600">{item.details}</p> : null}
                  </div>
                ) : null
              )}
            </div>
          </section>
        ) : null}

        {clean(resume.skills).length ? (
          <section>
            <h2 className="mb-3 border-b border-slate-300 pb-1 text-xs font-black uppercase tracking-[0.18em] text-slate-700">{t.skills}</h2>
            <ul className="list-disc space-y-1 pl-4 text-xs leading-5 text-slate-700">
              {clean(resume.skills).map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          </section>
        ) : null}
      </aside>

      <main className="p-0">
        <header className="bg-red-950 px-8 py-6 text-white">
          <h1 className="text-2xl font-black uppercase tracking-wide">{resume.personal.name || "Your Name"}</h1>
          <p className="mt-1 text-sm font-semibold text-red-100">{resume.personal.title || "Target Role / Professional Title"}</p>
        </header>

        <div className="space-y-5 p-8">
          {resume.personal.summary ? (
            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">{t.profile}</h2>
              <p className="text-sm leading-6 text-slate-700">{resume.personal.summary}</p>
            </section>
          ) : null}

          {resume.experience.filter((x) => x.role || x.company).length ? (
            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">{t.experience}</h2>
              <div className="space-y-4">
                {resume.experience.map((item, index) =>
                  item.role || item.company ? (
                    <div key={index}>
                      <div className="flex flex-wrap justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-black uppercase text-slate-900">{item.role || "Role"}</h3>
                          <p className="text-xs font-semibold text-slate-600">{item.company || "Company"}{item.location ? ` · ${item.location}` : ""}</p>
                        </div>
                        <p className="text-xs font-semibold text-slate-500">{[item.start, item.end].filter(Boolean).join(" — ")}</p>
                      </div>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5 text-slate-700">
                        {clean(item.bullets).map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            </section>
          ) : null}

          {resume.projects.filter((x) => x.name).length ? (
            <section>
              <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">{t.projects}</h2>
              <div className="space-y-4">
                {resume.projects.map((item, index) =>
                  item.name ? (
                    <div key={index}>
                      <div className="flex flex-wrap justify-between gap-2">
                        <h3 className="text-sm font-black uppercase text-slate-900">{item.name}</h3>
                        {item.link ? <p className="text-xs font-semibold text-slate-500">{item.link}</p> : null}
                      </div>
                      {item.tech ? <p className="text-xs font-semibold text-slate-600">{item.tech}</p> : null}
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5 text-slate-700">
                        {clean(item.bullets).map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            </section>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2">
            {clean(resume.certifications).length ? (
              <section>
                <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">{t.certifications}</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {clean(resume.certifications).map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </section>
            ) : null}
            {clean(resume.languages).length ? (
              <section>
                <h2 className="mb-2 border-b border-slate-300 pb-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">{t.languages}</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {clean(resume.languages).map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

function ResumePreview({ resume, template, language }) {
  if (template === "executive") {
    return <ExecutiveResumePreview resume={resume} language={language} />;
  }

  const t = uiText[language];
  const sectionTitleClass =
    template === "classic"
      ? "mb-2 border-b border-slate-300 pb-1 font-serif text-sm font-bold uppercase tracking-[0.18em] text-slate-900"
      : template === "compact"
        ? "mb-1.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-500"
        : "mb-2 text-sm font-black uppercase tracking-[0.2em] text-slate-900";

  const wrapperClass =
    template === "classic"
      ? "font-serif text-slate-900"
      : "font-sans text-slate-900";

  const spacing = template === "compact" ? "space-y-3" : "space-y-5";

  const clean = (arr) => arr.filter((item) => String(item || "").trim());

  return (
    <div id="resume-preview" className={`mx-auto min-h-[1056px] w-full max-w-[816px] bg-white p-10 shadow-2xl print:shadow-none ${wrapperClass}`}>
      <header className={template === "modern" ? "border-b-4 border-slate-900 pb-5" : "border-b border-slate-300 pb-4 text-center"}>
        <h1 className={template === "compact" ? "text-3xl font-black tracking-tight" : "text-4xl font-black tracking-tight"}>
          {resume.personal.name || "Your Name"}
        </h1>
        <p className="mt-1 text-base font-semibold text-slate-600">{resume.personal.title || "Target Role / Professional Title"}</p>
        <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 ${template === "classic" ? "justify-center" : ""}`}>
          {resume.personal.email ? <span>{resume.personal.email}</span> : null}
          {resume.personal.phone ? <span>{resume.personal.phone}</span> : null}
          {resume.personal.location ? <span>{resume.personal.location}</span> : null}
          {resume.personal.website ? <span>{resume.personal.website}</span> : null}
        </div>
      </header>

      <main className={`mt-5 ${spacing}`}>
        {resume.personal.summary ? (
          <section>
            <h2 className={sectionTitleClass}>{t.profile}</h2>
            <p className="text-sm leading-6 text-slate-700">{resume.personal.summary}</p>
          </section>
        ) : null}

        {clean(resume.skills).length ? (
          <section>
            <h2 className={sectionTitleClass}>{t.skills}</h2>
            <div className="flex flex-wrap gap-2">
              {clean(resume.skills).map((skill, index) => (
                <span key={index} className={template === "classic" ? "text-sm text-slate-700" : "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"}>
                  {skill}{template === "classic" && index < clean(resume.skills).length - 1 ? " ·" : ""}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {resume.experience.filter((x) => x.role || x.company).length ? (
          <section>
            <h2 className={sectionTitleClass}>{t.experience}</h2>
            <div className="space-y-4">
              {resume.experience.map((item, index) =>
                item.role || item.company ? (
                  <div key={index}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">{item.role || "Role"}</h3>
                        <p className="text-sm font-semibold text-slate-700">{item.company || "Company"}{item.location ? ` · ${item.location}` : ""}</p>
                      </div>
                      <p className="text-xs font-semibold text-slate-500">{[item.start, item.end].filter(Boolean).join(" — ")}</p>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5 text-slate-700">
                      {clean(item.bullets).map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}
                    </ul>
                  </div>
                ) : null
              )}
            </div>
          </section>
        ) : null}

        {resume.projects.filter((x) => x.name).length ? (
          <section>
            <h2 className={sectionTitleClass}>{t.projects}</h2>
            <div className="space-y-4">
              {resume.projects.map((item, index) =>
                item.name ? (
                  <div key={index}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-sm font-extrabold text-slate-900">{item.name}</h3>
                      {item.link ? <p className="text-xs font-semibold text-slate-500">{item.link}</p> : null}
                    </div>
                    {item.tech ? <p className="text-xs font-semibold text-slate-600">{item.tech}</p> : null}
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5 text-slate-700">
                      {clean(item.bullets).map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}
                    </ul>
                  </div>
                ) : null
              )}
            </div>
          </section>
        ) : null}

        {resume.education.filter((x) => x.school || x.degree).length ? (
          <section>
            <h2 className={sectionTitleClass}>{t.education}</h2>
            <div className="space-y-3">
              {resume.education.map((item, index) =>
                item.school || item.degree ? (
                  <div key={index}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">{item.school || "School"}</h3>
                        <p className="text-sm font-semibold text-slate-700">{item.degree || "Degree"}{item.location ? ` · ${item.location}` : ""}</p>
                      </div>
                      <p className="text-xs font-semibold text-slate-500">{[item.start, item.end].filter(Boolean).join(" — ")}</p>
                    </div>
                    {item.details ? <p className="mt-1 text-sm leading-5 text-slate-700">{item.details}</p> : null}
                  </div>
                ) : null
              )}
            </div>
          </section>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          {clean(resume.certifications).length ? (
            <section>
              <h2 className={sectionTitleClass}>{t.certifications}</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                {clean(resume.certifications).map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </section>
          ) : null}

          {clean(resume.languages).length ? (
            <section>
              <h2 className={sectionTitleClass}>{t.languages}</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                {clean(resume.languages).map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}

function ScoreCard({ resume }) {
  const checks = useMemo(() => {
    const allBullets = [
      ...resume.experience.flatMap((item) => item.bullets || []),
      ...resume.projects.flatMap((item) => item.bullets || []),
    ].filter(Boolean);

    return [
      { label: "有清晰职业标题", ok: Boolean(resume.personal.title.trim()) },
      { label: "有专业简介", ok: resume.personal.summary.trim().length >= 60 },
      { label: "至少 6 个技能关键词", ok: resume.skills.filter(Boolean).length >= 6 },
      { label: "有工作/项目经历", ok: resume.experience.some((x) => x.role || x.company) || resume.projects.some((x) => x.name) },
      { label: "经历包含量化或结果导向要点", ok: allBullets.some((b) => /\d|%|improved|reduced|increased|built|created|managed|designed/i.test(b)) },
      { label: "联系方式完整", ok: Boolean(resume.personal.email && resume.personal.phone && resume.personal.location) },
    ];
  }, [resume]);

  const score = Math.round((checks.filter((x) => x.ok).length / checks.length) * 100);

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resume Score</p>
            <h3 className="text-2xl font-black text-slate-900">{score}/100</h3>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-lg font-black text-slate-900">
            {score}%
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
              {check.ok ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertCircle className="h-4 w-4 text-amber-600" />}
              <span>{check.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResumeBuilderWebsite() {
  const [resume, setResume] = useState(starterResume);
  const [template, setTemplate] = useState("modern");
  const [activeTab, setActiveTab] = useState("basic");
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("resume-builder-data");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.resume) setResume(parsed.resume);
        if (parsed.template) setTemplate(parsed.template);
        if (parsed.language) setLanguage(parsed.language);
      }
    } catch (error) {
      console.warn("Could not load saved resume", error);
    }
  }, []);

  const updatePersonal = (key, value) => {
    setResume((prev) => ({ ...prev, personal: { ...prev.personal, [key]: value } }));
    setSaved(false);
  };

  const updateList = (key, value) => {
    setResume((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const updateCollectionItem = (collection, index, key, value) => {
    setResume((prev) => {
      const next = [...prev[collection]];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, [collection]: next };
    });
    setSaved(false);
  };

  const addCollectionItem = (collection, item) => {
    setResume((prev) => ({ ...prev, [collection]: [...prev[collection], item] }));
    setSaved(false);
  };

  const removeCollectionItem = (collection, index) => {
    setResume((prev) => ({ ...prev, [collection]: prev[collection].filter((_, i) => i !== index) }));
    setSaved(false);
  };

  const saveData = () => {
    localStorage.setItem("resume-builder-data", JSON.stringify({ resume, template, language }));
    setSaved(true);
  };

  const resetData = () => {
    setResume(starterResume);
    setTemplate("modern");
    setLanguage("en");
    setSaved(false);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ resume, template, language }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.personal.name || "resume"}-data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed.resume) setResume(parsed.resume);
        if (parsed.template) setTemplate(parsed.template);
        if (parsed.language) setLanguage(parsed.language);
        setSaved(false);
      } catch (error) {
        alert("文件格式不正确，请上传之前导出的 JSON 文件。");
      }
    };
    reader.readAsText(file);
  };

  const t = uiText[language];

  const tabs = [
    { id: "basic", label: t.basic, icon: User },
    { id: "experience", label: t.expTab, icon: Briefcase },
    { id: "projects", label: t.projectsTab, icon: Code2 },
    { id: "education", label: t.educationTab, icon: GraduationCap },
    { id: "extra", label: t.extraTab, icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 print:bg-white">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { position: absolute; left: 0; top: 0; width: 100%; max-width: none; min-height: auto; padding: 28px; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 12mm; }
        }
      `}</style>

      <header className="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">ResumeForge</h1>
              <p className="text-xs text-slate-500">像主流简历生成器一样，填写、预览、优化、导出。</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setLanguage("zh")}
                className={`rounded-lg px-3 py-1.5 text-xs font-black transition ${language === "zh" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              >
                中文
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-lg px-3 py-1.5 text-xs font-black transition ${language === "en" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              >
                EN
              </button>
            </div>
            <Button variant="outline" className="rounded-xl" onClick={saveData}>
              <Save className="mr-2 h-4 w-4" /> {saved ? "已保存" : "保存"}
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={exportJSON}>
              <Download className="mr-2 h-4 w-4" /> 导出数据
            </Button>
            <label className="inline-flex cursor-pointer items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50">
              <Upload className="mr-2 h-4 w-4" /> 导入
              <input type="file" accept="application/json" onChange={importJSON} className="hidden" />
            </label>
            <Button className="rounded-xl bg-slate-900 text-white hover:bg-slate-800" onClick={() => window.print()}>
              <Download className="mr-2 h-4 w-4" /> 导出 PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[430px_1fr] print:block print:p-0">
        <aside className="no-print space-y-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <Card className="rounded-2xl border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.templates}</p>
                    <h2 className="text-base font-black">{t.chooseTemplate}</h2>
                  </div>
                  <Palette className="h-5 w-5 text-slate-500" />
                </div>
                <div className="grid gap-2">
                  {templates.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTemplate(item.id)}
                      className={`rounded-2xl border p-3 text-left transition ${template === item.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{item.label}</span>
                        {template === item.id ? <CheckCircle2 className="h-4 w-4" /> : null}
                      </div>
                      <p className={`mt-1 text-xs ${template === item.id ? "text-slate-200" : "text-slate-500"}`}>{item.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <ScoreCard resume={resume} />

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-4">
              <SectionHeader icon={Sparkles} title={t.aiTips} subtitle={t.aiTipSub} />
              <div className="space-y-2 text-xs leading-5 text-slate-600">
                <p>1. 用动作动词开头：Built / Designed / Improved / Managed。</p>
                <p>2. 加入结果：减少了多少时间、提升了多少准确率、服务了多少用户。</p>
                <p>3. 针对岗位关键词调整技能，例如 Software Developer 可突出 React、Python、API、Testing。</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-2">
              <div className="grid grid-cols-2 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${activeTab === tab.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm">
            <CardContent className="p-4">
              {activeTab === "basic" ? (
                <div className="space-y-4">
                  <SectionHeader icon={User} title="基本信息" subtitle="这部分会显示在简历顶部" />
                  <div className="grid gap-3">
                    <TextInput label="姓名" value={resume.personal.name} onChange={(v) => updatePersonal("name", v)} icon={User} />
                    <TextInput label="职业标题" value={resume.personal.title} onChange={(v) => updatePersonal("title", v)} placeholder="例如 Software Developer / Business Analyst" icon={Briefcase} />
                    <TextInput label="邮箱" value={resume.personal.email} onChange={(v) => updatePersonal("email", v)} icon={Mail} />
                    <TextInput label="电话" value={resume.personal.phone} onChange={(v) => updatePersonal("phone", v)} icon={Phone} />
                    <TextInput label="所在地" value={resume.personal.location} onChange={(v) => updatePersonal("location", v)} icon={MapPin} />
                    <TextInput label="LinkedIn / Portfolio" value={resume.personal.website} onChange={(v) => updatePersonal("website", v)} icon={LinkIcon} />
                    <TextInput label="个人简介" value={resume.personal.summary} onChange={(v) => updatePersonal("summary", v)} textarea />
                  </div>
                </div>
              ) : null}

              {activeTab === "experience" ? (
                <div className="space-y-5">
                  <SectionHeader
                    icon={Briefcase}
                    title="工作 / 实习 / 校内经历"
                    subtitle="每段经历建议 2-4 条 bullet points"
                    action={
                      <Button size="sm" className="rounded-xl" onClick={() => addCollectionItem("experience", emptyExperience)}>
                        <Plus className="mr-1 h-4 w-4" /> 新增
                      </Button>
                    }
                  />
                  {resume.experience.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Experience {index + 1}</p>
                        <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => removeCollectionItem("experience", index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-3">
                        <TextInput label="职位 / 角色" value={item.role} onChange={(v) => updateCollectionItem("experience", index, "role", v)} />
                        <TextInput label="公司 / 组织" value={item.company} onChange={(v) => updateCollectionItem("experience", index, "company", v)} />
                        <TextInput label="地点" value={item.location} onChange={(v) => updateCollectionItem("experience", index, "location", v)} />
                        <div className="grid grid-cols-2 gap-3">
                          <TextInput label="开始时间" value={item.start} onChange={(v) => updateCollectionItem("experience", index, "start", v)} />
                          <TextInput label="结束时间" value={item.end} onChange={(v) => updateCollectionItem("experience", index, "end", v)} />
                        </div>
                        <BulletEditor bullets={item.bullets} onChange={(v) => updateCollectionItem("experience", index, "bullets", v)} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeTab === "projects" ? (
                <div className="space-y-5">
                  <SectionHeader
                    icon={Code2}
                    title="项目经历"
                    subtitle="适合学生、转码、技术岗位"
                    action={
                      <Button size="sm" className="rounded-xl" onClick={() => addCollectionItem("projects", emptyProject)}>
                        <Plus className="mr-1 h-4 w-4" /> 新增
                      </Button>
                    }
                  />
                  {resume.projects.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Project {index + 1}</p>
                        <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => removeCollectionItem("projects", index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-3">
                        <TextInput label="项目名称" value={item.name} onChange={(v) => updateCollectionItem("projects", index, "name", v)} />
                        <TextInput label="技术栈" value={item.tech} onChange={(v) => updateCollectionItem("projects", index, "tech", v)} />
                        <TextInput label="链接" value={item.link} onChange={(v) => updateCollectionItem("projects", index, "link", v)} />
                        <BulletEditor bullets={item.bullets} onChange={(v) => updateCollectionItem("projects", index, "bullets", v)} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeTab === "education" ? (
                <div className="space-y-5">
                  <SectionHeader
                    icon={GraduationCap}
                    title="教育背景"
                    subtitle="学校、专业、课程、成绩或奖项"
                    action={
                      <Button size="sm" className="rounded-xl" onClick={() => addCollectionItem("education", emptyEducation)}>
                        <Plus className="mr-1 h-4 w-4" /> 新增
                      </Button>
                    }
                  />
                  {resume.education.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Education {index + 1}</p>
                        <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => removeCollectionItem("education", index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-3">
                        <TextInput label="学校" value={item.school} onChange={(v) => updateCollectionItem("education", index, "school", v)} />
                        <TextInput label="学位 / 专业" value={item.degree} onChange={(v) => updateCollectionItem("education", index, "degree", v)} />
                        <TextInput label="地点" value={item.location} onChange={(v) => updateCollectionItem("education", index, "location", v)} />
                        <div className="grid grid-cols-2 gap-3">
                          <TextInput label="开始时间" value={item.start} onChange={(v) => updateCollectionItem("education", index, "start", v)} />
                          <TextInput label="结束时间" value={item.end} onChange={(v) => updateCollectionItem("education", index, "end", v)} />
                        </div>
                        <TextInput label="补充信息" value={item.details} onChange={(v) => updateCollectionItem("education", index, "details", v)} textarea />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeTab === "extra" ? (
                <div className="space-y-5">
                  <div>
                    <SectionHeader icon={Sparkles} title="技能关键词" subtitle="ATS 会重点匹配技能词" />
                    <ArrayEditor items={resume.skills} onChange={(v) => updateList("skills", v)} placeholder="例如 React" />
                  </div>
                  <div>
                    <SectionHeader icon={Languages} title="语言能力" />
                    <ArrayEditor items={resume.languages} onChange={(v) => updateList("languages", v)} placeholder="例如 English — Professional" />
                  </div>
                  <div>
                    <SectionHeader icon={Award} title="证书 / 奖项" />
                    <ArrayEditor items={resume.certifications} onChange={(v) => updateList("certifications", v)} placeholder="例如 AWS Cloud Practitioner" />
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 rounded-xl" onClick={resetData}>
              <RotateCcw className="mr-2 h-4 w-4" /> 重置示例
            </Button>
            <Button className="flex-1 rounded-xl bg-slate-900 text-white hover:bg-slate-800" onClick={() => window.print()}>
              <Download className="mr-2 h-4 w-4" /> PDF
            </Button>
          </div>
        </aside>

        <section className="overflow-auto rounded-3xl bg-slate-200 p-4 print:overflow-visible print:rounded-none print:bg-white print:p-0">
          <ResumePreview resume={resume} template={template} language={language} />
        </section>
      </main>
    </div>
  );
}
