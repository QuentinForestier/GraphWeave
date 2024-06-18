import {useContext} from "react";
import {AppContext} from "@/contexts/AppContext";

export const useApp = () => useContext(AppContext);