const listeEl = document.getElementById('liste');
const rechercheEl = document.getElementById('recherche');
const resultatEl = document.getElementById('resultat');
const formEl = document.querySelector('form');

const SECOURS = [
  { prenom: "Flora", nom: "Nazie", filiere: "Informatique", note: 14 },
  { prenom: "Bernard", nom: "Mbah", filiere: "Informatique", note: 12 },
  { prenom: "Amina", nom: "Diallo", filiere: "Gestion", note: 16 },
  { prenom: "Kevin", nom: "Nkolo", filiere: "Informatique", note: 11 },
  { prenom: "Sarah", nom: "Mballa", filiere: "Gestion", note: 15 }
];
let etudiants = [...SECOURS];

function sansAccent(t){ return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
function afficher(liste){
  listeEl.innerHTML='';
  if(liste.length===0){ resultatEl.textContent='Aucun étudiant trouvé.'; return; }
  resultatEl.textContent=liste.length+' étudiant(s) trouvé(s).';
  liste.forEach(e=>{
    const a=document.createElement('article');
    a.className='carte';
    a.innerHTML=`<h3>${e.prenom} ${e.nom}</h3><p>Filière : ${e.filiere}</p><p>Note : ${e.note} / 20</p>`;
    listeEl.appendChild(a);
  });
}
function filtrer(){
  const q=sansAccent(rechercheEl.value.trim());
  if(!q){ afficher(etudiants); return; }
  afficher(etudiants.filter(e=>sansAccent(e.prenom+' '+e.nom).includes(q)));
}
formEl.addEventListener('submit',ev=>{ev.preventDefault();filtrer();});
rechercheEl.addEventListener('input',filtrer);
afficher(etudiants);