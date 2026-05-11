import { useContext } from "react";
import { ReducedMotionContext } from "../context/reducedMotionContext.js";

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}
