import Folder from '../../db/model/Folder';
import Work from '../../db/model/Work';
import { dumper } from 'dumper';
import { User } from '../../db/model';

export const getWorkListRelatedFolder = async (req, res) => {
  const { id } = req.query;
  try {
    // const workList = await Work.getFolder();
    const workList = await Work.findAll({
      where: { fk_folder_id: id },
      order: [ [ 'createdAt', 'ASC' ] ]
    });
    res.status(200).json(workList);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const createWork = async (req, res) => {
  const { content, title, chapter, id: folderId } = req.body;
  const { userId } = req.decodedUser;

  try {
    const author = await User.findOne({ where: { id: userId } });
    const folder = await Folder.findOne({ where: { id: folderId } });
    const work = await Work.create({ content, title, chapter });

    work.setUser(author);
    work.setFolder(folder);
    work.save();

    res.status(200).json(work);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
