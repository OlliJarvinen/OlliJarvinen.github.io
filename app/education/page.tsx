import { Footer, PageIntro } from '../components/site';

export default function EducationPage() { return <div className="site-shell"><PageIntro label="Background / education" 
title="Education" current="education">My formal education record.
</PageIntro><main className="section"><div className="container">
    <article className="education-item">
        <div className="education-year">2021-2026</div>
        <div>
            <h2>Aalto University School of Business</h2>
            <p><strong>Master of Science in Economics and Business Administration 2024-2026</strong>
            <br />Major: Information and Service Management
            <br />Focus: Business Analytics and Information Systems</p>
            <div className="field-list"><div className="field">
                <label>GPA</label><span>5.0</span></div><div className="field">
                    <label>Distinctions</label><span>Graduated with honors</span></div>
                    <div className="field"><label>Coursework</label><span>Business Intelligence, Data Science, Forecasting, Machine Learning, Optimisation</span>
                    </div><div className="field"><label>Location</label>
                    <span>Helsinki, Finland</span></div>
                    </div></div>
                    </article><article className="education-item">
  <div className="education-year">2021–2024</div>
  <div>
    <h2>Aalto University School of Business</h2>
    <p>
      <strong>Bachelor of Science in Economics and Business Administration 2021-2024</strong>
      <br />
      Major: Information and Service Management
      <br />
      Focus: Business Analytics
    </p>
    <div className="field-list">
      <div className="field">
        <label>GPA</label>
        <span>4.18</span>
      </div>
      <div className="field">
        <label>Minor</label>
        <span>Computer Science</span>
      </div>
      <div className="field">
        <label>Coursework</label>
        <span>Python, SQL, Power BI</span>
      </div>
      <div className="field">
        <label>Location</label>
        <span>Helsinki, Finland</span>
      </div>
    </div>
  </div>
</article></div></main><Footer /></div>; }
