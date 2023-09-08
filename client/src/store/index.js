import { proxy } from "valtio";

const state = proxy({
  inHomePage: true,
  accentColor: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});

export default state;
