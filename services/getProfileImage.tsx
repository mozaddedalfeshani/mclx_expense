import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";

export const CLOUDINARY_CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
  file: { uri?: string } | string,
  foldername: string
): Promise<ResponseType> => {
  try {
    if (typeof file === "string") return { success: true, data: file };
    if (file && file.uri) {
      const data = new FormData();
      data.append("file", {
        uri: file?.uri,
        type: "image/jpeg",
        name: file?.uri?.split("/").pop() || "file.jpg",
      } as any);

      data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      data.append("folder", foldername);

      const res = await axios.post(CLOUDINARY_CLOUD_URL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { success: true, data: res?.data?.secure_url };
    }

    return { success: true };
  } catch (e: any) {
    return { success: false };
  }
};

export const GetProfileImage = (file: any) => {
  if (file && typeof file == "string") return file;
  else if (file && typeof file == "object") return file.uri;
  return require("../assets/images/defaultAvatar.png");
};
