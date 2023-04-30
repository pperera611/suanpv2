export const modal_title_new = {
  unidades: "Nueva unidad administrativa",
  grados: "Nuevo grado",
  localidades: "Nueva localidad",
  gastos: "Nuevo concepto de gasto",
};

export const modal_title_edit = {
  unidades: "Modificar unidad administrativa",
  grados: "Modificar grado",
  localidades: "Modificar localidad",
  gastos: "Modificar concepto de gasto",
};

export const modal_title_delete = {
  unidades: "Eliminar unidad administrativa",
  grados: "Eliminar grado",
  localidades: "Eliminar localidad",
  gastos: "Eliminar concepto de gasto",
};

export const columnMapping = {
  unidades: [
    { id: "name", label: "Nombre", minWidth: 100 },
    { id: "code", label: "Codigo", minWidth: 60 },
  ],
  grados: [
    { id: "name", label: "Nombre", minWidth: 100 },
    { id: "level", label: "Nivel", minWidth: 60 },
    { id: "salary", label: "Salario", minWidth: 60 },
  ],
  default: [{ id: "name", label: "Nombre", minWidth: 100 }],
};

export const columnMappingExport = {
  unidades: [
    { header: "Nombre", dataKey: "name" },
    { header: "Codigo", dataKey: "code" },
  ],
  grados: [
    { header: "Nombre", dataKey: "name" },
    { header: "Nivel", dataKey: "level" },
    { header: "Salario", dataKey: "salary" },
  ],
  default: [{ header: "Nombre", dataKey: "name" }],
};

export const tooltip_button_new = {
  unidades: "Agregar nueva unidad administrativa",
  grados: "Agregar nuevo grado",
  localidades: "Agregar nueva localidad",
  gastos: "Agregar nuevo concepto de gasto",
};

export const label_form_generico = {
  unidades: "Nombre Unidad administrativa",
  grados: "Nombre grado",
  localidades: "Nombre localidad",
  gastos: "Nombre concepto de gasto",
};
export const messages_form_generico = {
  required: "Este campo es obligatorio",
  name: "Debes introducir una cadena de texto correcta",
  ua_format: "El codigo debe ser numerico",
  level_format: "El nivel debe ser numerico",
  salary_format: "El salario debe ser un número",
  ua_min: "El codigo de la unidad administrativa debe tener mas de 6 digitos",
  ua_max:
    "El codigo de la unidad administrativa debe tener menos de 10 digitos",
  level_max:
    "El codigo de la unidad administrativa debe tener menos de 3 digitos",
};

export const toastMessagesSuccessNew = {
  unidades: "Unidad administrativa agregada con exito",
  grados: "Grado agregado con exito",
  localidades: "Localidad agregada con exito",
  gastos: "Concepto de gasto agregado con exito",
};
export const toastMessagesErrorNew = {
  unidades: "Hubo un error agregando la unidad administrativa",
  grados: "Hubo un error agregando el grado",
  localidades: "Hubo un error agregando la localidad",
  gastos: "Hubo un error agregando el concepto de gasto",
};
export const toastMessagesSuccessEdit = {
  unidades: "Unidad administrativa modificada con exito",
  grados: "Grado modificado con exito",
  localidades: "Localidad modificada con exito",
  gastos: "Concepto de gasto modificado con exito",
};

export const toastMessagesErrorEdit = {
  unidades: "Hubo un error modificando la unidad administrativa",
  grados: "Hubo un error modificando el grado",
  localidades: "Hubo un error modificando la localidad",
  gastos: "Hubo un error modificando el concepto de gasto",
};

export const textQuestionDelete = {
  unidades: "¿Estas seguro que deseas eliminar esta unidad administrativa?",
  grados: "¿Estas seguro que deseas eliminar este grado?",
  localidades: "¿Estas seguro que deseas eliminar esta localidad?",
  gastos: "¿Estas seguro que deseas eliminar este concepto de gasto?",
}

export const messageErrorDelete = {
  unidades: "No se puede eliminar la unidad ya que se encuentra asociado a uno o mas afiliados",
  grados: "No se puede eliminar el grado ya que se encuentra asociado a uno o mas afiliados",
  localidades: "No se puede eliminar la localidad ya que se encuentra asociado a uno o mas afiliados",
  gastos: "No se puede eliminar el concepto de gasto ya que se encuentra asociado a uno o mas afiliados",
}

export const toastMessagesSuccessDelete = {
  unidades: "Unidad administrativa eliminada con exito",
  grados: "Grado eliminado con exito",
  localidades: "Localidad eliminada con exito",
  gastos: "Concepto de gasto eliminado con exito",
};

export const toastMessagesErrorDelete = {
  unidades: "Hubo un error eliminando la unidad administrativa",
  grados: "Hubo un error eliminando el grado",
  localidades: "Hubo un error eliminando la localidad",
  gastos: "Hubo un error eliminando el concepto de gasto",
};