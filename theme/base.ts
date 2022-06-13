import { PureLightTheme } from "./shemes/PureLightTheme";
import { GreyGooseTheme } from "./shemes/GreyGooseTheme";
import { PurpleFlowTheme } from "./shemes/PurpleFlowTheme";

const themeMap: any = {
  PureLightTheme,
  GreyGooseTheme,
  PurpleFlowTheme,
};

export function themeCreator(theme: string) {
  return themeMap[theme];
}
