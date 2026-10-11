'use client';
import { useState } from 'react';
import story from '../data/fiscal-story.json';
const bn = (n: number) => (n / 1000).toFixed(1);
type Point = {year:number;debt_ratio:number};
const colors = {ink:'#203b87',gold:'#987125',grid:'#d5cbbd'};
function DebtLines({historical = false, rows, name}: {historical?:boolean; rows?:Point[]; name?:string}) {
 const w=800,h=310,left=52,right=72,top=36,bottom=44;
 const first=historical?2010:2025,min=historical?40:80,max=100;
 const x=(year:number)=>left+(year-first)/(2030-first)*(w-left-right);
 const y=(n:number)=>top+(max-n)/(max-min)*(h-top-bottom);
 const path=(points:Point[])=>points.map((p,i)=>`${i?'L':'M'}${x(p.year).toFixed(2)},${y(p.debt_ratio).toFixed(2)}`).join(' ');
 const baseline=story.forecast;
 const ticks=historical?[2010,2015,2020,2025,2030]:[2025,2026,2027,2028,2029,2030];
 const yTicks=historical?[40,60,80,100]:[80,85,90,95,100];
 const end=baseline.at(-1)!;
 return <svg className="fiscal-line-chart" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={historical?'Finland public debt rises from 50.1 percent of GDP in 2010 to 88.4 percent in 2025. The reconstructed official outlook reaches 97.6 percent in 2030.':`Debt as a share of GDP from 2025 to 2030. Baseline ends at ${end.debt_ratio.toFixed(1)} percent; ${name} ends at ${rows?.at(-1)?.debt_ratio.toFixed(1)} percent.`}>
  {historical&&<rect x={x(2025)} y={top} width={x(2030)-x(2025)} height={h-top-bottom} fill="#eee4d5"/>}
  {yTicks.map(t=><g key={t}><line x1={left} x2={w-right} y1={y(t)} y2={y(t)} stroke={colors.grid}/><text x={left-12} y={y(t)+5} textAnchor="end">{t}%</text></g>)}
  {ticks.map(t=><text key={t} x={x(t)} y={h-14} textAnchor="middle">{t}</text>)}
  {historical&&<><text x={left+8} y={19}>Observed</text><text x={x(2025)+10} y={19}>Outlook</text><path d={path(story.history)} stroke={colors.ink} strokeWidth={3} fill="none"/><circle cx={x(2025)} cy={y(story.history.at(-1)!.debt_ratio)} r={4} fill={colors.ink}/><text x={x(2025)-12} y={y(story.history.at(-1)!.debt_ratio)+26} textAnchor="end" className="chart-emphasis">88.4%</text></>}
  <path d={path(baseline)} stroke={colors.ink} strokeWidth={historical?3:2} strokeDasharray="7 5" fill="none"/>
  <text x={x(2030)+10} y={y(end.debt_ratio)+5} className="chart-emphasis">{end.debt_ratio.toFixed(1)}%</text>
  {rows&&<><path d={path([baseline[0],...rows])} stroke={colors.gold} strokeWidth={3.5} fill="none"/>{rows.map(p=><circle key={p.year} cx={x(p.year)} cy={y(p.debt_ratio)} r={3} fill={colors.gold}/>)}<text x={x(2030)+10} y={y(rows.at(-1)!.debt_ratio)+5} style={{fill:colors.gold}} className="chart-emphasis">{rows.at(-1)!.debt_ratio.toFixed(1)}%</text></>}
 </svg>;
}
export function DebtChart(){return <DebtLines historical/>;}
export function PackageExplorer(){
 const [id,setId]=useState('mixed');
 const p=story.packages.find(p=>p.id===id)!;
 const end=p.rows.at(-1)!,base=story.forecast.at(-1)!;
 const falling=end.debt_ratio<=p.rows.at(-2)!.debt_ratio;
 return <div className="fiscal-package-explorer">
  <div className="fiscal-package-choices" role="group" aria-label="Choose an illustrative policy package">{story.packages.map(p=><button key={p.id} type="button" aria-pressed={id===p.id} onClick={()=>setId(p.id)}>{p.name}</button>)}</div>
  <div aria-live="polite" aria-atomic="true" className="fiscal-package-summary"><h3>{p.name}</h3><p>{p.tradeoff}</p><div className="fiscal-package-metrics"><div><span>Direct adjustment · 2030</span><strong>€{bn(end.direct_effect)}bn</strong></div><div><span>Deficit remaining · 2030</span><strong>€{bn(-end.balance)}bn</strong></div><div><span>Debt / GDP · 2030</span><strong>{end.debt_ratio.toFixed(1)}%</strong><small>{falling?'Falling':'Still rising'} from 2029</small></div></div></div>
  <figure><div className="fiscal-chart-heading"><span>Gross public debt / % of GDP</span></div><DebtLines rows={p.rows} name={p.name}/><div className="fiscal-chart-legend"><span><i className="baseline"/>VM reconstruction</span><span><i className="package"/>{p.name} scenario</span></div><figcaption>Illustrative accounting scenario, 2026–2030. Baseline ends at {base.debt_ratio.toFixed(1)}% of GDP. All packages use the same macro assumptions; no calibrated policy feedback on growth or employment.</figcaption></figure>
  <div className="fiscal-tradeoff"><strong>The trade-off</strong><p>{p.condition}</p></div>
  <details className="fiscal-details" key={id}><summary>Which measures make up this adjustment?</summary><p>Annual direct effects at the 2030 level. These combine different kinds of evidence and are not validated net costings.</p><div className="fiscal-table-wrap"><table className="fiscal-measures"><caption>{p.name} · direct annual effects in 2030</caption><thead><tr><th scope="col">Measure</th><th scope="col">€bn</th></tr></thead><tbody>{p.components.map(a=><tr key={a.id}><th scope="row">{a.name}<small>{a.evidence.replaceAll('_',' ')}</small></th><td>{bn(a.amount)}</td></tr>)}</tbody></table></div></details>
  <details className="fiscal-details"><summary>Read the chart values as a table</summary><div className="fiscal-table-wrap"><table className="fiscal-measures"><caption>Gross public debt / % of GDP</caption><thead><tr><th scope="col">Year</th><th scope="col">Baseline</th><th scope="col">{p.name}</th></tr></thead><tbody>{p.rows.map(r=><tr key={r.year}><th scope="row">{r.year}</th><td>{story.forecast.find(f=>f.year===r.year)!.debt_ratio.toFixed(1)}%</td><td>{r.debt_ratio.toFixed(1)}%</td></tr>)}</tbody></table></div></details>
 </div>;
}
