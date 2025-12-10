import { createContext } from "react";

export type Theme = 'light' | 'dark'
interface IContext {
    theme : Theme,
    toggleTheme :()=> void;
}
export const ThemeContext = createContext<IContext>({
    theme:'light',
    toggleTheme : ()=>{}
}) 


