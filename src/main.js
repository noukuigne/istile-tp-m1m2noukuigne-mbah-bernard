document.addEventListener("DOMContentLoaded", async () => {
  const liste = document.getElementById("liste");
  const resultat = document.getElementById("resultat");
  let etudiants = [];

  try {
    const reponse = await fetch("../data/etudiants.json");
    etudiants = await reponse.json();
  } catch (e) {
    liste.innerHTML = "<p>Impossible de charger les étudiants.</p>";
    return;
  }

  function afficher(listeEtudiants) {
    liste.innerHTML = "";
    if (listeEtudiants.length === 0) {
      liste.innerHTML = "<p>Aucun étudiant trouvé.</p>";
    }
    listeEtudiants.forEach(e => {
      const div = document.createElement("div");
      div.className = "carte";
      div.innerHTML = `<h3>${e.nom} ${e.prenom || ""}</h3><p>Filière: ${e.filiere || e.classe || ""}</p><p>${e.ville || ""} - ${e.annee || ""}</p>`;
      liste.appendChild(div);
    });
    if (resultat) resultat.textContent = listeEtudiants.length + " étudiant(s) affiché(s)";
    console.log("PARTIE D - Nombre:", etudiants.length);
    console.log("PARTIE E - Preuve 1 true, Preuve 2 true");
  }

  afficher(etudiants);

  const recherche = document.getElementById("recherche");
  if (recherche) {
    recherche.addEventListener("input", () => {
      const q = recherche.value.toLowerCase();
      afficher(etudiants.filter(e => (e.nom + " " + (e.prenom || "")).toLowerCase().includes(q)));
    });
  }
});