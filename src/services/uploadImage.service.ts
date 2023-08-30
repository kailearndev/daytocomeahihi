import axios from "axios";

const uploadImage = async (body: {
  key?: string;
  image: File;
  nameImage?: string;
}) => {
  const urlUpload = "https://api.imgbb.com/1/upload";
  const uploadForm = new FormData();
  body.key && uploadForm.append("key", body.key);
  uploadForm.append("image", body.image);
  body.nameImage && uploadForm.append("name", body.nameImage);
  const response = await axios.post(urlUpload, uploadForm);
  return response.data;
};

const UploadImageService = { uploadImage };

export default UploadImageService;
