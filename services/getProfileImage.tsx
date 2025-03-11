export const GetProfileImage = (file: any) => {
  if (file && typeof file == "string") return file;
  else if (file && typeof file == "object") return file.uri;
  return require("../assets/images/defaultAvatar.png");
};
