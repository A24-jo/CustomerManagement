import "../style/presentation.css";
import { setStoarage } from "../utils/storage";

interface PresentationProps {
  setIsPage: React.Dispatch<React.SetStateAction<boolean>>;
}
function Presentation({ setIsPage }: PresentationProps) {
    
  const handlerclick = (): void => {
    setIsPage(false);
    setStoarage("data", false.toString());
  };
  return (
    <div className="presentacion">
      <div className="animate_continer">
        <div className="presentacion_one_div"></div>
      </div>
      <div className="container_page">
        <button onClick={handlerclick}>enter</button>
      </div>
    </div>
  );
}

export default Presentation;
