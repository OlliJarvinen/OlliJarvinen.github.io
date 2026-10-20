import { Monogram } from "./notebook";
export function Header({ current = "home" }: { current?: string }) {
 const links = [["Home", "/", "home"], ["Projects", "/projects", "projects"], ["Education", "/education", "education"], ["About", "/about", "about"], ["CV", "/cv", "cv"]];
 return <header className="site-header"><a className="identity" href="/" aria-label="Olli Järvinen, home"><Monogram/><span>Olli Järvinen</span></a><nav className="main-nav" aria-label="Main navigation">{links.map(([label,href,key])=><a key={key} href={href} aria-current={current===key || (current==='thesis' && key==='projects') ? 'page':undefined}>{label}</a>)}</nav></header>;
}
export function Footer(){return <footer className="site-footer"><span>© 2026 Olli Järvinen</span><a href="/cv">CV</a></footer>;}
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
