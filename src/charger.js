export async function chargerEtudiants() {
    const reponse = await fetch('../data/etudiants.json');
    const data = await reponse.json();
    return data;
  }