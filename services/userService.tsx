import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./getProfileImage";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    if (updatedData && updatedData?.image?.uri) {
      const imageUploadRes = await uploadFileToCloudinary(
        updatedData.image,
        "user"
      );
      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes?.msg || "failed to upload image",
        };
      }
      updatedData.image = imageUploadRes?.data;
    }

    const userRef = doc(firestore, "user", uid);
    console.log(userRef);
    await updateDoc(userRef, updatedData);

    return { success: true };
  } catch (err: any) {
    return { success: false, msg: err?.message };
  }
};
