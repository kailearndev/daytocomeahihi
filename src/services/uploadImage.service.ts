import axios from "axios";

const uploadImage = async (body: {
  key: string;
  image: File;
  nameImage?: string;
}) => {
  const urlUpoad = process.env.VITE_URL_IMGBB || "";
  const uploadForm = new FormData();
  uploadForm.append("key", body.key);
  uploadForm.append("image", body.image);
  body.nameImage && uploadForm.append("name", body.nameImage);
  const response = await axios.post(urlUpoad, uploadForm);
  return response.data;
};

const UploadImageService = { uploadImage };

export default UploadImageService;
