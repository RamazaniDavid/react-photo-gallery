import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = ({ collection }) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot);

        setLoading(false);
        setDocs(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    return () => unsubscribe();
  }, [collection]);

  return [docs, loading];
};

export default useFirestore;
