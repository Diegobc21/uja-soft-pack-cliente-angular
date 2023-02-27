import {Category} from "./category.interface";
import {Extras} from "./extras.interface";

export interface Software {
  nombre: string;
  descripcion: string;
  categorias: Category;
  descarga: string;
  winget_id: string;
  extras?: Extras[];
  iconURL: string;
}
