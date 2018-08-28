import Folder from '../../db/model/Folder';
import Work from '../../db/model/Work';
import { dumper } from 'dumper';
import { User } from '../../db/model';

export const getWorkListRelatedFolder = async (req, res) => {
  const { id } = req.query;
  try {
    const workList = await Work.findAll({
      where: { fk_folder_id: id },
      order: [ [ 'createdAt', 'ASC' ] ]
    });
    res.status(200).json(workList);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createWork = async (req, res) => {
  const { content, title, folderId, workId } = req.body;
  const { userId } = req.decodedUser;

  try {
    const author = await User.findOne({ where: { id: userId } });
    const folder = await Folder.findOne({ where: { id: folderId } });
    let work = null;
    if (isUpdateRequest(workId)) {
      work = await Work.update({ content, title }, { where: { id: workId } });
    } else {
      work = await Work.create({ content, title });
      work.setUser(author);
      work.setFolder(folder);
      work.save();
    }

    res.status(200).json(work);
  } catch (error) {
    res.status(500).json(error);
  }
};

const isUpdateRequest = (workId) => {
  return workId ? true : false;
};

export const deleteWork = async (req, res) => {
  const { workId } = req.body;
  try {
    await Work.destroy({
      where: {
        id: workId
      }
    });
    res.status(200).json({ message: 'delete work successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};
