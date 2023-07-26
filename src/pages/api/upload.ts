import { type NextApiRequest, type NextApiResponse } from 'next';
import formidable from 'formidable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return new Promise<void>((resolve) => {
    if (req.method !== 'POST') {
      res.status(405).send({ error: 'method not allowed.' });
      resolve();
    }

    const form = formidable({
      uploadDir: './public/uploads',
      keepExtensions: true,
    });
    form.parse(req, (err, _fields, { file }) => {
      if (err) {
        res.status(500).send(err);
        resolve();
      } else if (!file) {
        res.status(204).end();
        resolve();
      } else {
        const sendFile = Array.isArray(file)
          ? (file[0] as formidable.File)
          : file;
        res.status(200).json({ filename: sendFile.newFilename });
        resolve();
      }
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
