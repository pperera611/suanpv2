import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Item from "../../UI/Item";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import useAxios from "../../hooks/useAxios";
import { verificarNroCobro } from "../../helpers/funcAux.js";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import { toast } from "sonner";

const patterns = {
  nombre: /^[A-Za-z]+$/i,
  apellido: /^[A-Za-z]+$/i,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  telefono: /^[0-9]+$/i,
  nroSocio: /^[0-9]+$/i,
};

const messages = {
  required: "Este campo es obligatorio",
  nroSocio: "El número de socio introducido no es el correcto",
  nombre: "Debes introducir una cadena de texto correcta",
  apellido: "Debes introducir una cadena de texto correcta",
  email: "Debes introducir un correo valido",
  telefono: "Debes introducir un número de telefono",
  direccion: "Debe introducir una direccion de domicilio",
};

export default function FormAfiliado(props) {
  //props.mode : si es EDIT significa que vine navegando desde el boton de modificar, si es NEW del boton agregar
  //props.id : tiene el id del funcionario a modificar

  const [afiliadosAux, setAfiliadosAux] = useState();
  const [afiliadoEdit, setAfiliadoEdit] = useState();
  const [disableButton, setDisableButton] = useState(false);
  //para guardar los afiliados menos el que se esta editando, de esta manera
  //puedo controlar que NO controle que el nro de cobro esta repetido

  const { grados, localidades, unidades, afiliados } = props;

  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onBlur" });

  const { postData, putData } = useAxios("", "afiliados", {});

  useEffect(() => {
    if (props.mode === "EDIT" && afiliados) {
      // si quiero modificar....
      //obtengo datos del afiliado
      let afiliado = Object.values(afiliados).find(
        (e) => e.id === Number(props.id)
      );
      setAfiliadoEdit(afiliado);
      //console.log("La key del afiliado a modificar es: ", afiliado.key);
      //tengo que sacar el afiliado de la lista para que no me haga la validacion de que ya existe el nro de cobro
      let lista_aux = Object.values(afiliados).filter(
        (af) => af.id !== Number(props.id)
      );
      //console.log("Lista sin la persona a modificar: ", lista_aux)
      setAfiliadosAux(lista_aux);
      //como el form se renderizo para modificar, tengo que cargar en los campos los valores del afiliado
      setValue("nroSocio", afiliado.nroSocio);
      setValue("nombre", afiliado.nombre);
      setValue("apellido", afiliado.apellido);
      setValue("telefono", afiliado.telefono);
      setValue("direccion", afiliado.direccion);
      setValue("email", afiliado.email);
      setValue("grado", afiliado.grado);
      setValue("localidad", afiliado.localidad);
      setValue("ua", afiliado.ua);
      setValue("fechaNacimiento", parseISO(afiliado.fechaNacimiento));
    }
  }, [afiliados, props.mode, props.id, setValue]);

  const getOpObj = (option, options) => {
    if (!option.id) option = options.find((op) => op.id === option);
    return option;
  };

  //verifica si el nro de cobro es unico en el sistema
  const nroCobroIsUnique = (nroCobro) => {
    const afiliadosList =
      props.mode === "EDIT"
        ? Object.values(afiliadosAux)
        : Object.values(afiliados);

    const found = afiliadosList.find((e) => e.nroSocio === Number(nroCobro));

    return found !== undefined;
  };

  const onSubmit = async (userInfo) => {
    setDisableButton(true);
    //reacomodo el formato fecha para que sea compatible con el formato de la base de datos
    const fecha = new Date(userInfo.fechaNacimiento);
    const fechaISO = fecha.toISOString(); // "2023-04-01T03:00:00.000Z"

    let lista_aux = [];
    //console.log(userInfo);
    if (props.mode === "NEW") {
      //obtengo el id maximo hasta ahora ya que se que es correlativo --esto no es necesario cuando se integre con backend
      let found = afiliados.reduce((anterior, actual) => {
        return anterior.id > actual.id ? anterior : actual;
      });

      let id_nuevo = Number(found.id) + 1;
      const data = {
        ...userInfo,
        id: id_nuevo,
        activo: true,
        fechaNacimiento: fechaISO,
      };
      
      try {
        const postDataResponse = await postData({ data }); // obtengo la key del afiliado agregado porque lo preciso por si lo quiero editar
        //console.log("Respuesta de postData:", postDataResponse.name);
        const data_with_key = { key: postDataResponse.name, ...data };
        /*MEJORA*/
        lista_aux = afiliados; // 1- tomo la lista que tiene a todos los afiliados
        lista_aux.push(data_with_key); // 2- agrego el nuevo afiliado a la lista
        lista_aux.sort(
          (afiliado1, afiliado2) => afiliado1.nroSocio - afiliado2.nroSocio
        ); // la ordeno por nro de cobro
        
        props.onReloadData(lista_aux,true,props.mode); //3 - paso la lista al componente padre para que la renderice y no tenga que consumir de la api

        toast.success("Afiliado ha sido agregado con exito");
      } catch (error) {
        // Manejar el error si la promesa fue rechazada
        console.error(error);
        toast.error("Error - no se pudo agregar el afiliado");
        return;
      }
    }

    if (props.mode === "EDIT") {
      let data = {
        ...userInfo,
        id: Number(props.id),
        fechaNacimiento: fechaISO,
        key: afiliadoEdit.key,
        activo: afiliadoEdit.activo,
        
      };
      try {
        await new Promise((resolve, reject) => {
          putData(afiliadoEdit.key, { data })
            .then(() => resolve())
            .catch(reject);
        });
        /*MEJORA*/
        lista_aux = afiliadosAux; // 1- tomo la lista que tiene a todos los afiliados menos al que se editó
        lista_aux.push(data); // 2- agrego el afiliado corregido a la lista
        lista_aux.sort(
          (afiliado1, afiliado2) => afiliado1.nroSocio - afiliado2.nroSocio
        ); // la ordeno por nro de cobro
        //setAfiliadosAux(lista_aux);
        props.onReloadData(lista_aux,afiliadoEdit.activo,props.mode); //3 - paso la lista al componente padre para que la renderice y no tenga que consumir de la api

        toast.success("Afiliado ha sido modificado con exito");
      } catch (error) {
        // Manejar el error si la promesa fue rechazada
        console.error(error);
        toast.error("Error - no se pudo modificar el afiliado");
        return;
      }
    }

    navigate("/afiliados"); //me redirijo al componente Afiliado
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "auto",
        width: "fit-content",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Item>
                <Controller
                  name="nroSocio"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      id="nroSocio"
                      {...field}
                      label={"Número de Socio"}
                      variant="outlined"
                      size="small"
                      //InputLabelProps={{ shrink: true }}
                      fullWidth
                      {...register("nroSocio", {
                        validate: {
                          val1: (v) =>
                            verificarNroCobro(v) ||
                            "El formato del nro no es correcto",
                          val2: (v) =>
                            !nroCobroIsUnique(v) ||
                            "Ya existe un afiliado con ese nro de cobro",
                        },

                        required: messages.required,
                        minLength: {
                          value: 6,
                          message: messages.nroSocio,
                        },
                        maxLength: {
                          value: 6,
                          message: messages.nroSocio,
                        },
                        pattern: {
                          value: patterns.nroSocio,
                          message: messages.nroSocio,
                        },
                      })}
                    />
                  )}
                />
                {errors.nroSocio && <p>{errors.nroSocio.message}</p>}
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <Controller
                  name="nombre"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="nombre"
                      label="Nombre"
                      variant="outlined"
                      size="small"
                      //InputLabelProps={{ shrink: true }}
                      fullWidth
                      {...register("nombre", {
                        required: messages.required,
                        pattern: {
                          value: patterns.nombre,
                          message: messages.nombre,
                        },
                      })}
                    />
                  )}
                />
                {errors.nombre && <p>{errors.nombre.message}</p>}
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <Controller
                  name="apellido"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="apellido"
                      label="Apellido"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("apellido", {
                        required: messages.required,
                        pattern: {
                          value: patterns.apellido,
                          message: messages.apellido,
                        },
                      })}
                    />
                  )}
                />
                {errors.apellido && <p>{errors.apellido.message}</p>}
              </Item>
            </Grid>

            <Grid item xs={3}>
              <Item>
                <Controller
                  name="telefono"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="telefono"
                      label="Telefono"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("telefono", {
                        required: messages.required,
                        minLength: {
                          value: 8,
                          message: messages.telefono,
                        },
                        maxLength: {
                          value: 9,
                          message: messages.telefono,
                        },
                        pattern: {
                          value: patterns.telefono,
                          message: messages.telefono,
                        },
                      })}
                    />
                  )}
                />
                {errors.telefono && <p>{errors.telefono.message}</p>}
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="email"
                      label="Mail"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("email", {
                        required: messages.required,
                        pattern: {
                          value: patterns.email,
                          message: messages.email,
                        },
                      })}
                    />
                  )}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </Item>
            </Grid>

            <Grid item xs={3}>
              <Item>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  defaultValue={null}
                  rules={{
                    validate: (value) => value !== null || messages.required,
                  }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Fecha de nacimiento"
                      format="dd/MM/yyyy"
                      mask="__/__/____"
                      onChange={(date) => field.onChange(date)}
                      textField={(props) => (
                        <TextField
                          {...props}
                          fullWidth
                          variant="outlined"
                          size="small"
                        />
                      )}
                    />
                  )}
                />
                {errors.fechaNacimiento && (
                  <p>{errors.fechaNacimiento.message}</p>
                )}
              </Item>
            </Grid>

            <Grid item xs={12}>
              <Item>
                <Controller
                  name="direccion"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="direccion"
                      label="Dirección"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("direccion", {
                        required: messages.required,
                      })}
                    />
                  )}
                />
                {errors.direccion && <p>{errors.direccion.message}</p>}
              </Item>
            </Grid>

            <Grid item xs={7}>
              <Item>
                <Controller
                  control={control}
                  name="grado"
                  defaultValue={null}
                  rules={{
                    validate: (value) => value !== null || messages.required,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={Object.values(grados)}
                      getOptionLabel={(option) => getOpObj(option, grados).name}
                      isOptionEqualToValue={(option, value) =>
                        value === undefined || option.id === value.id
                      }
                      onChange={(event, values) => onChange(values)}
                      value={value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Grado"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
                {errors.grado && <p>{errors.grado.message}</p>}
              </Item>
            </Grid>

            <Grid item xs={5}>
              <Item>
                <Controller
                  control={control}
                  name="localidad"
                  defaultValue={null}
                  rules={{
                    validate: (value) => value !== null || messages.required,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={Object.values(localidades)}
                      getOptionLabel={(option) =>
                        getOpObj(option, localidades).name
                      }
                      isOptionEqualToValue={(option, value) =>
                        value === undefined || option.id === value.id
                      }
                      onChange={(event, values) => onChange(values)}
                      value={value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Localidad"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
                {errors.localidad && <p>{errors.localidad.message}</p>}
              </Item>
            </Grid>

            <Grid item xs={7}>
              <Item>
                <Controller
                  control={control}
                  name="ua"
                  defaultValue={null}
                  rules={{
                    validate: (value) => value !== null || messages.required,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={Object.values(unidades)}
                      getOptionLabel={(option) =>
                        getOpObj(option, unidades).name
                      }
                      isOptionEqualToValue={(option, value) =>
                        value === undefined || option.id === value.id
                      }
                      onChange={(event, values) => onChange(values)}
                      value={value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Unidad Administrativa"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
                {errors.ua && <p>{errors.ua.message}</p>}
              </Item>
            </Grid>

            <Grid item xs={12}>
              <Item>
                <Divider />
                <DialogActions>
                  <Link to="/afiliados" style={{ textDecoration: "none" }}>
                    <Button>Cancelar</Button>
                  </Link>
                  <Button type="submit" disabled={disableButton}>
                    {props.mode === "EDIT" ? "Modificar" : "Agregar"}
                  </Button>
                </DialogActions>
              </Item>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>
    </Box>
  );
}
