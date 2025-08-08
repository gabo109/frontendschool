import { Area } from "./area";
import { Asignatura } from "./asignatura";
import { NivelEducativo } from "./nivelEducativo";

export interface NivelAreaAsignatura {
  nivelEducativo: NivelEducativo | null;
  area: Area | null;
  asignatura: Asignatura | null;
}