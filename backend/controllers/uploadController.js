export const uploadSingleFile = async (req, res) => {
  try {
    return await res.send(req.file.location);
  } catch (error) {
    return res.status(500).send({ message: 'Error Uploading Image' });
  }
};

export const uploadMultipleFile = async (req, res) => {
  try {
    if (req.files.length > 0) {
      const fileRes = await req.files.map((file) => file.location);
      return res.send(fileRes);
    } else {
      return res.status(500).send({ message: 'Error Uploading Image' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Error Uploading Image' });
  }
};
