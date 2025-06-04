import Bolsistas from "./Bolsistas.js";
import Edital from "./Edital.js";
import Image from "./Image.js";
import BolsistasEdital from "./BolsistasEdital.js";

// Definindo os relacionamentos N:N com alias
Bolsistas.belongsToMany(Edital, {
  through: BolsistasEdital,
  foreignKey: "bolsista_id",
  otherKey: "edital_id",
  as: "edital",
});

Edital.belongsToMany(Bolsistas, {
  through: BolsistasEdital,
  foreignKey: "edital_id",  
  otherKey: "bolsista_id",
  as: "bolsistas",
});

Image.belongsTo(Bolsistas, {
  foreignKey: "bolsista_id",
  as: "bolsista",
  onDelete: "CASCADE",
});

Bolsistas.hasMany(Image, {
  foreignKey: "bolsista_id",
  as: "images",
  onDelete: "CASCADE",
});