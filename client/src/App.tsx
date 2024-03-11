import "./App.css";
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";
import 'primeicons/primeicons.css';

import Presentation from "./components/presentation";
import { useEffect, useState } from "react";
import { getStoarage } from "./utils/storage";
import Page from "./components/page";

function App() {
  const [isPage, setIsPage] = useState(true);
  useEffect(() => {
    const data = getStoarage("data");
    if (data === "false") {
      setIsPage(false);
    } else {
      setIsPage(true);
    }
  }, []);
  return (
    <div className="app_container">
      {isPage ? (
        <Presentation setIsPage={setIsPage} />
      ) : (
        <Page setIsPage={setIsPage} />
      )}
    </div>
  );
}

export default App;
