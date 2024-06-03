import {useContext} from "react";
import {ProjectsContext} from "@/contexts/ProjectsContext";

export const useProjects = () => useContext(ProjectsContext);