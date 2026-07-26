import {
  Allura,
  Cormorant_Garamond,
  Montserrat,
} from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const cursive = Allura({
  subsets: ["latin"],
  weight: "400",
});