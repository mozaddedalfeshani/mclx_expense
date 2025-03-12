import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    const userRef = doc(firestore, "user", uid);
    console.log(userRef);
    await updateDoc(userRef, updatedData);

    return { success: true };
  } catch (err: any) {
    return { success: false, msg: err?.message };
  }
};
