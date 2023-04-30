import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Item from "../../UI/Item";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  toastMessagesSuccessNew,
  toastMessagesSuccessEdit,
  messages_form_generico,
  label_form_generico,
  toastMessagesErrorEdit,
  toastMessagesErrorNew,
} from "../../helpers/MessagesMantenimiento";

const patterns = {
  texto: /^[A-Za-z]+$/i,
  code: /^[0-9]+$/i,
};

const FormGenerico = (props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onBlur" });

  const { postData, putData } = useAxios("", props.instance, {});
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);
  const [listWithoutElementEdit, setListWithoutElementEdit] = useState([]);
  const [elementEdit, setElementEdit] = useState();

  useEffect(() => {
    if (props.mode === "EDIT" && props.lista) {
      // si quiero modificar....
      //obtengo datos del afiliado
      let element = Object.values(props.lista).find(
        (e) => e.id === Number(props.id)
      );
      setElementEdit(element);
      //console.log("La key del elemento a modificar es: ", element.key);
      //tengo que sacar el elemento de la lista para que no me haga la validacion de que ya existe cosas
      let lista_aux = Object.values(props.lista).filter(
        (e) => e.id !== Number(props.id)
      );
      //console.log("Lista sin el elemento a modificar: ", lista_aux)
      setListWithoutElementEdit(lista_aux);
      //como el form se renderizo para modificar, tengo que cargar en los campos los valores del elemento
      setValue("name", element.name);
      if (props.instance==="unidades")
        setValue("code", element.code);
      if (props.instance==="grados"){
        setValue("level", element.level);
        setValue("salary", element.salary);
      }
    }
  }, [props.lista, props.instance, props.mode, props.id, setValue]);


  const handleCancelarClick = () => {
    // Navega a la ruta sin el último elemento
    navigate(-1);
  };

  const nombreUnico = (name) => {
    
    const list =
      props.mode === "EDIT"
        ? Object.values(listWithoutElementEdit)
        : Object.values(props.lista);

    const found = list.find((e) => e.name === name);
    return found !== undefined;
  };
  const codeUAUnico = (code) => {
    
    const list =
      props.mode === "EDIT"
        ? Object.values(listWithoutElementEdit)
        : Object.values(props.lista);

    const found = list.find((e) => Number(e.code) === Number(code));
    return found !== undefined;
  };
  const onSubmit = async (dataInfo) => {
    setDisableButton(true);
    //console.log(dataInfo);
    let lista_aux = [];
    //console.log(userInfo);
    if (props.mode === "NEW") {
      //obtengo el id maximo hasta ahora ya que se que es correlativo --esto no es necesario cuando se integre con backend
      let found = props.lista.reduce((anterior, actual) => {
        return anterior.id > actual.id ? anterior : actual;
      });
      let id_nuevo = Number(found.id) + 1;
      const data = {
        ...dataInfo,
        id: id_nuevo,
      };
      try {
        const postDataResponse = await postData({ data }); // obtengo la key del elemento agregado porque lo preciso por si lo quiero editar
        //console.log("Respuesta de postData:", postDataResponse.name);
        const data_with_key = { key: postDataResponse.name, ...data };
        /*MEJORA*/
        lista_aux = props.lista; // 1- tomo la lista que tiene a todos los elementos
        lista_aux.push(data_with_key); // 2- agrego el nuevo elemento a la lista
        lista_aux.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }); // la ordeno por nombre
        props.onReloadData(lista_aux, props.instance); //3 - paso la lista al componente padre para que la renderice y no tenga que consumir de la api
        toast.success(toastMessagesSuccessNew[props.instance]);
      } catch (error) {
        // Manejar el error si la promesa fue rechazada
        console.error(error);
        toast.error(toastMessagesErrorNew[props.instance]);
        return;
      }
    }
    if (props.mode === "EDIT") {
      const data = {
        ...dataInfo,
        id: Number(props.id),
        key: elementEdit.key,
      };
      try {
        await new Promise((resolve, reject) => {
          putData(elementEdit.key, { data })
            .then(() => resolve())
            .catch(reject);
        });
        /*MEJORA*/
        lista_aux = listWithoutElementEdit; // 1- tomo la lista que tiene a todos los elementos menos al que se editó
        lista_aux.push(data); // 2- agrego el elemento corregido a la lista
        lista_aux.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }); //la ordeno por nombre
        
        props.onReloadData(lista_aux,props.instance); //3 - paso la lista al componente padre para que la renderice y no tenga que consumir de la api

        toast.success(toastMessagesSuccessEdit[props.instance]);
      } catch (error) {
        // Manejar el error si la promesa fue rechazada
        console.error(error);
        toast.error(toastMessagesErrorEdit[props.instance]);
        return;
      }
    }
    navigate(-1);
  };

  //el formulario al ser generico tendra campos condicionados segun que instancia sea
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  id="name"
                  {...field}
                  label={label_form_generico[props.instance]}
                  variant="outlined"
                  size="small"
                  fullWidth
                  {...register("name", {
                    validate: {
                      val1: (v) =>
                        !nombreUnico(v) ||
                        "Ya existe un registro con ese nombre",
                    },

                    required: messages_form_generico.required,
                  })}
                />
              )}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </Item>
        </Grid>
        {props.instance === "unidades" && (
          <Grid item xs={4}>
            <Item>
              <Controller
                name="code"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    id="code"
                    {...field}
                    label={"Codigo Unidad Administrativa"}
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("code", {
                      validate: {
                        val1: (v) =>
                          !codeUAUnico(v) ||
                          "Ya existe una unidad con ese código",
                      },
                      required: messages_form_generico.required,
                      minLength: {
                        value: 6,
                        message: messages_form_generico.ua_min,
                      },
                      maxLength: {
                        value: 10,
                        message: messages_form_generico.ua_max,
                      },
                      pattern: {
                        value: patterns.code,
                        message: messages_form_generico.ua_format,
                      },
                    })}
                  />
                )}
              />
              {errors.code && <p>{errors.code.message}</p>}
            </Item>
          </Grid>
        )}
        {props.instance === "grados" && (
          <Grid item xs={2}>
            <Item>
              <Controller
                name="level"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    id="level"
                    {...field}
                    label={"Nivel"}
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("level", {
                      required: messages_form_generico.required,
                      maxLength: {
                        value: 2,
                        message: messages_form_generico.level_max,
                      },
                      pattern: {
                        value: patterns.code,
                        message: messages_form_generico.level_format,
                      },
                    })}
                  />
                )}
              />
              {errors.level && <p>{errors.level.message}</p>}
            </Item>
          </Grid>
        )}
        {props.instance === "grados" && (
          <Grid item xs={4}>
            <Item>
              <Controller
                name="salary"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    id="salary"
                    {...field}
                    label={"Salario"}
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("salary", {
                      required: messages_form_generico.required,
                      pattern: {
                        value: patterns.code,
                        message: messages_form_generico.salary_format,
                      },
                    })}
                  />
                )}
              />
              {errors.salary && <p>{errors.salary.message}</p>}
            </Item>
          </Grid>
        )}
        <Grid item xs={12}>
          <Item>
            <Divider />
            <DialogActions>
              <Button onClick={handleCancelarClick}>Cancelar</Button>
              <Button type="submit" disabled={disableButton}>
                {props.mode === "EDIT" ? "Modificar" : "Agregar"}
              </Button>
            </DialogActions>
          </Item>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormGenerico;
