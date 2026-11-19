export function moyenneGenerale(liste) {
    if (liste.length === 0) return 0;
    const total = liste.reduce((somme, etudiant) => somme + etudiant.note, 0);
    return Math.round((total / liste.length) * 100) / 100;
  }
  export function admis(liste) {
    return liste.filter((etudiant) => etudiant.note >= 10);
  }
  
  export function recales(liste) {
    return liste.filter((etudiant) => etudiant.note < 10);
  }
  
  export function meilleurEtudiant(liste) {
    if (liste.length === 0) return null;
    return liste.reduce((meilleur, etudiant) => etudiant.note > meilleur.note ? etudiant : meilleur);
  }
  
  export function parFiliere(liste, filiere) {
    return liste.filter((etudiant) => etudiant.filiere === filiere);
  }
  
  export function parNiveau(liste, niveau) {
    return liste.filter((etudiant) => etudiant.niveau === niveau);
  }
  
  export function trierParNote(liste) {
    return [...liste].sort((a, b) => b.note - a.note);
  }