import ftImageDB from "../../db/model/ftImageModel.js";

// save archive ande remove old file
export const saveArchive = async (file, bolsista, type, mime) => {
  await ftImageDB.create({
    bolsista_id: bolsista,
    type_id: type,
    path: file.filename,
    mime: mime,
  });
};

export const updateArchive = async (file, bolsista, type, mime) => {
  await ftImageDB.update(
    { path: file.filename, mime: mime }, // valores a atualizar
    {
      where: {
        bolsista_id: bolsista,
        type_id: type,
      },
    }
  );
};

export const searchArchive = async (bolsista) => {
  const archive = await ftImageDB.findAll({
    where: {
      bolsista_id: bolsista,
    },
  });

  return archive;
};