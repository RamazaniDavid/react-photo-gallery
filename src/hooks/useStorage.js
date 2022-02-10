import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
import uuid from "react-uuid";
import Resizer from "react-image-file-resizer";

const useStorage = (record) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!record || !record.file) return;

    const filename = uuid();
    // console.log(file);
    // console.log(filename);
    const storageRef = projectStorage.ref(`images/${filename}`);
    const storageRefThumb = projectStorage.ref(`images/thum-${filename}`);
    const collectionRef = projectFirestore.collection("images");

    Resizer.imageFileResizer(
      record.file,
      300,
      300,
      "JPEG",
      100,
      0,
      (file) => {
        try {
          const thumb = file;
          const uploadThumbnail = storageRefThumb.put(thumb);
          uploadThumbnail.on(
            "state_changed",
            (snapshot) => {},
            (err) => {},
            async () => {
              const thumbUrl = await storageRefThumb.getDownloadURL();
              const upload = storageRef.put(record.file);
              upload.on(
                "state_changed",
                (snapshot) => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  setProgress(progress);
                },
                (err) => {
                  setError(err);
                },
                async () => {
                  const url = await storageRef.getDownloadURL();
                  const createdAt = timestamp();
                  await collectionRef.add({
                    url: url,
                    thumbUrl: thumbUrl,
                    createdAt: createdAt,
                    filename: record.file.name,
                    title: record.title,
                    description: record.description,
                    uniqueFileName: filename,
                  });
                  setUrl(url);
                }
              );
            }
          );
        } catch (err) {
          console.log(err);
        }
      },
      "file"
    );
  }, [record]);
  return { progress, url, error };
};

export default useStorage;
