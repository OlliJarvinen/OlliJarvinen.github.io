export function Header({ current }: { current?: string }) {
  const links = [
    ["Projects", "/projects", "projects"],
    ["Thesis", "/thesis", "thesis"],
    ["Education", "/education", "education"],
    ["About", "/about", "about"],
  ];
  return (
    <header className="site-header container">
      <a className="wordmark" href="/">
        <span className="wordmark-mark">OJ</span>
        <span>Olli Järvinen</span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, href, key]) => (
          <a
            key={href}
            href={href}
            aria-current={current === key ? "page" : undefined}
          >
            {label}
          </a>
        ))}
        <a className="header-contact" href="/cv">CV ↗</a>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© 2026 Olli Järvinen · Data &amp; Business Analytics</span>
        <div className="footer-links">
          <a href="/cv">CV ↗</a>
          <a href="/about">About ↗</a>
          <span>Contact details in CV</span>
        </div>
      </div>
    </footer>
  );
}
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}
export function Visual(
  { dark = false, label }: { dark?: boolean; label: string },
) {
  return (
    <div
      className={`visual${dark ? " dark" : ""}`}
      aria-label={`${label} visualization`}
    >
      <div className="visual-label">{label}</div>
      <div className="visual-bars" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
      </div>
    </div>
  );
}
export function PageIntro(
  { label, title, children, current }: {
    label: string;
    title: string;
    children: React.ReactNode;
    current?: string;
  },
) {
  return (
    <>
      <Header current={current} />
      <section className="page-hero">
        <div className="container">
          <SectionLabel>{label}</SectionLabel>
          <h1>{title}</h1>
          <p className="lede">{children}</p>
        </div>
      </section>
    </>
  );
}
export function Tags({ items }: { items: string[] }) {
  return (
    <div className="work-meta">
      {items.map((item) => <span className="tag" key={item}>{item}</span>)}
    </div>
  );
}
