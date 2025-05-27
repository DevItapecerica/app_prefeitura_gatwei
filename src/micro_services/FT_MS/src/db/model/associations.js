import Bolsistas from "./Bolsistas.js";
import Editais from "./Editais.js";
import BolsistasEditais from "./BolsistasEditais.js";

// Definindo os relacionamentos N:N com alias
Bolsistas.belongsToMany(Editais, {
  through: BolsistasEditais,
  foreignKey: "bolsista_id",
  otherKey: "edital_id",
  as: "editais",
});

Editais.belongsToMany(Bolsistas, {
  through: BolsistasEditais,
  foreignKey: "edital_id",
  otherKey: "bolsista_id",
  as: "bolsistas",
});
