import { validateFile } from "./utilities/file";

export const parseFile = (file) => {
  if (validateFile(file)) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const avatars = document.getElementsByClassName("maui-avatar");
      for (let i = 0; i < avatars.length; i++) {
        avatars[i].setAttribute("src", e.target.result);
      }
    };
    reader.readAsDataURL(file);
    return true;
  }
  return false;
};
