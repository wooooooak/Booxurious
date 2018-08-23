import Folder from '../../db/model/Folder';
import Work from '../../db/model/Work';
import { dumper } from 'dumper';

export const getWorkListRelatedFolder = async (req, res) => {
  const { id } = req.query;
  try {
    const workList = await Work.findAll({ where: { fk_folder_id: id } });
    dumper(workList);
    res.status(200).json(workList);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
