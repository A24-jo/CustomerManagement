import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { Clients } from "../interface/intefaces";

import "../style/modal_register.css";
import { useEffect } from "react";
import { createClientes, updateClientes } from "../service";

interface PresentationProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  titleModal: string;
  selectClient: Clients;
  setClients: React.Dispatch<React.SetStateAction<Clients[]>>;
  clients: Clients[];
}

function ModalRegister({
  modal,
  setModal,
  titleModal,
  selectClient,
  setClients,
  clients,
}: PresentationProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Clients>();

  const Onsubmit = handleSubmit(async (value) => {
    if (titleModal === "Update Client") {
      await updateClientes(selectClient.dni, value);
      setModal(false);
      setClients((prevClients) =>
        prevClients.map((client) =>
          client.dni === value.dni ? { ...client, ...value } : client
        )
      );
    } else if (titleModal === "Create Cliente") {
      await createClientes(value);
      setModal(false);
      setClients([...clients, value]);
    }
  });

  const footer = () => (
    <div>
      <Button severity="info" label="Save" type="submit" />
      <Button
        severity="danger"
        label="Cancel"
        onClick={() => setModal(false)}
        type="button"
      />
    </div>
  );

  useEffect(() => {
    reset(selectClient);
  }, [selectClient]);

  return (
    <Dialog
      visible={modal}
      modal
      onHide={() => setModal(false)}
      header={titleModal}
    >
      <form className="modal_dialog" onSubmit={Onsubmit}>
        <div className="modal_input">
          <label htmlFor="name">Name</label>
          <div>
            <InputText
              {...register("nombre", {
                minLength: 3,
                required: true,
              })}
            />
            {errors.nombre?.type === "required" && (
              <p>this field is required </p>
            )}
            {errors.nombre?.type === "minLength" && <p>enter a valid name</p>}
          </div>
        </div>
        <div className="modal_input">
          <label htmlFor="last-name">Last Name</label>
          <div>
            <InputText
              {...register("apellido", {
                minLength: 3,
                required: true,
              })}
            />
            {errors.nombre?.type === "required" && (
              <p>this field is required </p>
            )}
            {errors.nombre?.type === "minLength" && (
              <p>enter a valid lastname </p>
            )}
          </div>
        </div>
        <div className="modal_input">
          <label htmlFor="Age">Age</label>
          <div>
            <InputText
              {...register("edad", {
                required: true,
              })}
            />
            {errors.nombre?.type === "required" && (
              <p>this field is required </p>
            )}
          </div>
        </div>
        <div className="modal_input">
          <label htmlFor="date">Date</label>
          <div>
            <InputText
              type="date"
              {...register("fecha_nacimiento", {
                required: true,
              })}
            />
            {errors.nombre?.type === "required" && (
              <p>this field is required </p>
            )}
          </div>
        </div>
        <div className="modal_input">
          <label htmlFor="Dni"> Dni</label>
          <div>
            <InputText
              {...register("dni", {
                minLength: 6,
                required: true,
              })}
            />
            {errors.nombre?.type === "required" && (
              <p>this field is required </p>
            )}
          </div>
        </div>
        {footer()}
      </form>
    </Dialog>
  );
}

export default ModalRegister;
