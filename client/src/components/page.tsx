import "../style/page.css";
import { deleteStorage } from "../utils/storage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import { Clients } from "../interface/intefaces";
import { deleteClient, listclientes } from "../service";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ModalRegister from "./modal_register";

interface PresentationProps {
  setIsPage: React.Dispatch<React.SetStateAction<boolean>>;
}

function Page({ setIsPage }: PresentationProps) {
  const emptyClient: Clients = {
    apellido: "",
    dni: "",
    edad: "",
    fecha_nacimiento: "",
    nombre: "",
  };
  const [clients, setClients] = useState<Clients[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>("");
  const [selectClient, setSelectClient] = useState<Clients>(emptyClient);

  const toast = useRef<Toast>(null);

  const handlerclick = (): void => {
    setIsPage(true);
    deleteStorage("data");
  };

  const tableHeader = () => {
    return (
      <div className="page_header_table">
        <h1>List Clients</h1>
        <div className="page_header_butoons">
          <Button
            label="create"
            severity="success"
            onClick={() => ModalTableDynamic("Create Cliente")}
          />
          <Button label="exit" severity="danger" onClick={handlerclick}/>
        </div>
      </div>
    );
  };

  const ModalTableDynamic = (title: string, data?: Clients) => {
    setTitleModal(title);
    if (title === "Update Client" && data !== undefined) {
      setSelectClient(data); //
    } else {
      setSelectClient(emptyClient);
    }
    setModal(true);
  };

  const actionBodyTamplate = (row: Clients) => {
    return (
      <div>
        <Button
          onClick={() => ModalTableDynamic("Update Client", row)}
          icon={"pi pi-pencil"}
          severity="info"
          tooltip="edit"
        />
        <Button
          onClick={() => handlerclickDelete(row)}
          icon={"pi pi-trash"}
          severity="danger"
          tooltip="delete"
        />
      </div>
    );
  };

  const accepDeleted = async (params: Clients) => {
    const result = await deleteClient(params.dni);
    if (result) {
      toast.current?.show({
        severity: "success",
        summary: "Delete",
        detail: "Client delete",
        life: 3000,
      });
    }
    listclientes().then((data) => setClients(data || []));
  };
  const handlerclickDelete = (date: Clients) => {
    confirmDialog({
      message: `Do you want to delete this client ${date.nombre} ?`,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => accepDeleted(date),
    });
  };
  useEffect(() => {
    listclientes().then((data) => setClients(data || []));
  }, []);

  return (
    <div className="interface_conatiner">
      <ConfirmDialog />
      <Toast ref={toast} />
      <div className="interface_table">
        <DataTable
          value={clients}
          header={tableHeader}
          footer={"Total clinets  " + clients.length}
          paginator
          rows={4}
          rowsPerPageOptions={[4, 10, 20, 30]}
          scrollHeight="350px"
        >
          <Column field="nombre" header="Name"></Column>
          <Column field="apellido" header="Last Name"></Column>
          <Column field="fecha_nacimiento" header="Date"></Column>
          <Column field="dni" header="Dni"></Column>
          <Column header="Action" body={actionBodyTamplate}></Column>
        </DataTable>
      </div>
      <ModalRegister
        modal={modal}
        setModal={setModal}
        titleModal={titleModal}
        selectClient={selectClient}
        setClients={setClients}
        clients={clients}
      />
    </div>
  );
}

export default Page;
