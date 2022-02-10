import { cleanup } from "@testing-library/react";
import React, { useMemo } from "react";

const useImage = () => {
  const defaultState = useMemo(
    () => ({ image: undefined, status: "loading" }),
    []
  );

  const [state, setState] = React.useState(defaultState);

  const setImage = (url, crossOrigin) => {
    if (!url) {
      cleanup();
      return;
    }
    var img = document.createElement("img");

    function onload() {
      setState({ image: img, status: "loaded" });
    }

    function onerror() {
      setState({ image: undefined, status: "failed" });
    }

    img.addEventListener("load", onload);
    img.addEventListener("error", onerror);
    crossOrigin && (img.crossOrigin = crossOrigin);
    img.src = url;

    return function cleanup() {
      img.removeEventListener("load", onload);
      img.removeEventListener("error", onerror);
      setState(defaultState);
    };
  };

  // return array because it it better to use in case of several useImage hooks
  // const [background, backgroundStatus] = useImage(url1);
  // const [patter] = useImage(url2);
  return [
    {
      status: state.status,
      image: state.image,
      width: state.image ? state.image.width : undefined,
      height: state.image ? state.image.height : undefined,
      src: state.image ? state.image.src : undefined,
    },
    setImage,
  ];
};

export default useImage;
