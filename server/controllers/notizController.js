import { Notiz } from "../models/Notiz.js";
import { User } from "../models/Users.js";
import { v2 as cloudinary } from "cloudinary";
//get Notiz Liste
export const notizListe = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("notizenId");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User nicht gefunden" });
    }

    return res.status(200).json({ success: true, notizen: user.notizenId });
  } catch (e) {
    next(e);
  }
};
// get ein Notiz
export const notizGet = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const notizId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User nicht gefunden" });
    }
    const notiz = await Notiz.findById(notizId);

    if (!notiz || !notiz.userId.equals(user._id)) {
      return res
        .status(404)
        .json({ success: false, message: "Notiz nicht gefunden" });
    }
    return res.status(200).json({ success: true, notiz: notiz });
  } catch (e) {
    next(e);
  }
};

//delete Notize
export const notizDel = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const notizId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User nicht gefunden" });
    }
    const notiz = await Notiz.findById(notizId);

    if (!notiz || !notiz.userId.equals(user._id)) {
      return res
        .status(404)
        .json({ success: false, message: "Notiz nicht gefunden" });
    }
    await Notiz.findByIdAndDelete(notizId);
    return res
      .status(200)
      .json({ success: true, message: "Der Eintrag wurde gelöscht" });
  } catch (e) {
    next(e);
  }
};

// Edieren Notiz
export const notizEdit = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const notizId = req.params.id;
    const images = req.files;
    console.log(images);

    const { title, text, onlyText, datum } = req.body;
    let { imagesUrl } = req.body;
    console.log("url", imagesUrl);
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User nicht gefunden" });
    }
    const notiz = await Notiz.findById(notizId);

    if (!notiz || !notiz.userId.equals(user._id)) {
      return res
        .status(404)
        .json({ success: false, message: "Notiz nicht gefunden" });
    }
    let uploadedImages = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const uploadResult = await cloudinary.uploader.upload(images[i].path); // Der 'path' wird verwendet, um das Bild hochzuladen
        uploadedImages.push(uploadResult.secure_url); // Die URL des hochgeladenen Bildes speichern
      }
    }
    console.log("uploadedImages", uploadedImages);
    let newImagesArray = [];

    if (imagesUrl && imagesUrl.length > 0) {
      if (!Array.isArray(imagesUrl)) {
        imagesUrl = imagesUrl ? [imagesUrl] : []; // Falls String → Array, falls null → leeres Array
      }

      newImagesArray = imagesUrl.concat(uploadedImages);
    } else {
      newImagesArray = uploadedImages;
    }
    notiz.title = title;

    notiz.datum = datum;

    notiz.text = text;
    notiz.onlyText = onlyText;
    notiz.images = newImagesArray;
    console.log("newImagesArray", newImagesArray);
    await notiz.save();
    return res
      .status(200)
      .json({ success: true, message: "Der Eintrag wurde bearbeitet" });
  } catch (e) {
    next(e);
  }
};
