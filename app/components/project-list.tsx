import { ProjectSketch, type SketchType } from "./notebook";
const entries: {type:SketchType;href:string;label:string;title:string;description:string}[] = [
 {type:"thesis",href:"/thesis",label:"Master’s thesis",title:"Aalto teaching efficiency",description:"Separating how resources support students from how students progress to graduation."},
 {type:"fiscal",href:"/projects/finland-fiscal-lab",label:"Interactive prototype",title:"Finland’s debt and policy simulator",description:"Explore how interest costs and policy trade-offs shape the path of public debt."},
 {type:"nba",href:"/projects/nba-free-throws",label:"Interactive research",title:"NBA free-throw accuracy",description:"What 1.33 million attempts reveal about shot order, late-game accuracy and the value of a single point."},
];
export function ProjectList({headingLevel=3}:{headingLevel?:2|3}){const Heading=headingLevel===2?'h2':'h3';return <div className="work-grid">{entries.map(p=><article className={`work-item ${p.type}`} key={p.href}><a className="work-link" href={p.href}><div className="art-wrap"><ProjectSketch type={p.type}/></div><div className="work-info"><span className="work-label">{p.label}</span><Heading>{p.title}</Heading><p>{p.description}</p><span className="work-open">Open project</span></div></a></article>)}</div>;}
