export function calculerMoyenne(notes) { if (!notes || notes.length === 0) return 0; return notes.reduce((a,b)=>a+b,0)/notes.length; }
export function estAdmis(e) { return calculerMoyenne(e.notes) >= 10; }
export function formaterNom(e) { return `${e.prenom} ${e.nom.toUpperCase()}`; }
export function compterParFiliere(liste) { const r={}; liste.forEach(e=>{ r[e.filiere]=(r[e.filiere]||0)+1; }); return r; }
export function moyenneParFiliere(liste) { const g={}; liste.forEach(e=>{ (g[e.filiere] ||= []).push(...e.notes); }); const r={}; for(const f in g) r[f]=calculerMoyenne(g[f]); return r; }
export function classement(liste) { return [...liste].sort((a,b)=>calculerMoyenne(b.notes)-calculerMoyenne(a.notes)); }