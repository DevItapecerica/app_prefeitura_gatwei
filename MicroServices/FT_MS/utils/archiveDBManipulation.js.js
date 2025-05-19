// save archive ande remove old file
const saveArchive = async () => {
  await ftImageDB.create({
    bolsista_id: id,
    type_id: type,
    path: file.filename,
  });
};
