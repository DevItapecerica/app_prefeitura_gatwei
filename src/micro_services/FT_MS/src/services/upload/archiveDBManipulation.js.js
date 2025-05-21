const ftImageDB = require("../../db/model/ftImageModel.js");

// save archive ande remove old file
const saveArchive = async (file, bolsista, type) => {
  await ftImageDB.create({
    bolsista_id: bolsista,
    type_id: type,
    path: file.filename,
  });
};

const updateArchive = async (file, bolsista, type) => {
  await ftImageDB.update(
    { path: file.filename }, // valores a atualizar
    {
      where: {
        bolsista_id: bolsista,
        type_id: type,
      },
    }
  );
};

const searchArchive = async (bolsista) => {
  const archive = await ftImageDB.findAll({
    where: {
      bolsista_id: bolsista,
    },
  });

  return archive;
};

module.exports = {
  saveArchive,
  searchArchive,
  updateArchive,
};
