import { calculerMoyenne, estAdmis, formaterNom, compterParFiliere, moyenneParFiliere, classement } from './etudiants.js';

const etudiants = [
  { nom: "Dupont", prenom: "Jean", filiere: "Informatique", notes: [14, 16, 12] },
  { nom: "Curie", prenom: "Marie", filiere: "Mathématiques", notes: [18, 17, 19] },
  { nom: "Martin", prenom: "Paul", filiere: "Informatique", notes: [10, 9, 11] },
  { nom: "Bernard", prenom: "Sophie", filiere: "Physique", notes: [15, 14, 16] },
  { nom: "Petit", prenom: "Lucas", filiere: "Mathématiques", notes: [8, 7, 9] },
  { nom: "Dubois", prenom: "Emma", filiere: "Physique", notes: [13, 15, 14] }
];

function sansAccent(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ===== NAVIGATEUR SEULEMENT =====
if (typeof document !== 'undefined') {
  const listeEl = document.getElementById('liste');
  const rechercheEl = document.getElementById('recherche');
  const resultatEl = document.getElementById('resultat');
  const formEl = document.querySelector('form');

  function afficher(liste) {
    if (!listeEl) return;
    listeEl.innerHTML = '';
    if (liste.length === 0) { if (resultatEl) resultatEl.textContent = 'Aucun étudiant trouvé'; return; }
    if (resultatEl) resultatEl.textContent = liste.length + ' étudiant(s) trouvé(s)';
    liste.forEach(e => {
      const a = document.createElement('article');
      a.className = 'carte';
      a.innerHTML = `<h3>${e.prenom} ${e.nom}</h3><p>Filière : ${e.filiere}</p><p>Moyenne : ${calculerMoyenne(e.notes).toFixed(2)} - ${estAdmis(e) ? 'Admis' : 'Refusé'}</p>`;
      listeEl.appendChild(a);
    });
  }

  function filtrer() {
    const q = sansAccent(rechercheEl.value.trim());
    if (!q) { afficher(etudiants); return; }
    afficher(etudiants.filter(e => sansAccent(e.prenom + ' ' + e.nom).includes(q)));
  }

  if (formEl) formEl.addEventListener('submit', ev => { ev.preventDefault(); filtrer(); });
  if (rechercheEl) rechercheEl.addEventListener('input', filtrer);
  afficher(etudiants);
}

// ===== TERMINAL - PARTIE D / E =====
console.log("=== PARTIE D ===");
console.log("Moyenne générale:", calculerMoyenne(etudiants.flatMap(e => e.notes)));
console.log("Admis:", etudiants.filter(estAdmis).map(formaterNom));
console.log("Noms formatés:", etudiants.map(formaterNom));
console.log("Effectif par filière:", compterParFiliere(etudiants));
console.log("Moyenne par filière:", moyenneParFiliere(etudiants));
console.log("Classement:", classement(etudiants).map(e => formaterNom(e) + " : " + calculerMoyenne(e.notes).toFixed(2)));
console.log("=== PARTIE E ===");
console.log("Preuve 1 - moyenne [10,20] = 15 ?", calculerMoyenne([10, 20]) === 15);
console.log("Preuve 2 - admis si moyenne >= 10 ?", estAdmis({ notes: [12, 12] }) === true);
console.log("Scénario 1 - notes vides:", calculerMoyenne([]));
console.log("Scénario 2 - 1 seule note [18]:", calculerMoyenne([18]));
console.log("Scénario 3 - notes [0,0]:", calculerMoyenne([0, 0]), "Admis ?", estAdmis({ notes: [0, 0] }));