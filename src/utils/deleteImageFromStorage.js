import { deleteObject } from "firebase/storage";

const deleteImageFromStorage = (imageRef) => {
  // Delete the old image
  deleteObject(imageRef)
    .then(() => {
      console.log("cart image deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting image:", error);
    });
};

export default deleteImageFromStorage;
