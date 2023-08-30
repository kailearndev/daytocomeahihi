import { Button } from "antd";
import React, { useEffect } from "react";
import useSound from "use-sound";
import song from "../assets/girl.mp3";

const Playback = () => {
  const [play, { sound }] = useSound(song);

  return <Button onClick={() => play()}> </Button>;
};

export default Playback;
