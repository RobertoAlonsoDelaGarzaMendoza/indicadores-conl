import React, { useState } from "react";
import "./Carusel.css";
import { MobileStepper } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";

//TODO: remover import en produccion
import img_1 from "../../Assets/linea_tiempo.png";
import img_2 from "../../Assets/barras.png";

function Carusel() {
  let imagenes = [
    {
      id: 1,
      titulo: "Evolución en el tiempo",
      src: img_1,
    },
    {
      id: 2,
      titulo: "Barras",
      src: img_2,
    },
  ];
  const [step, setStep] = useState(imagenes.length ? 0 : -1);
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handleSwip = (step) => {
    setStep(step);
  };
  return (
    <div className="Carusel">
      <SwipeableViews
        index={step}
        enableMouseEvents
        axis="x"
        onChangeIndex={handleSwip}
      >
        {imagenes.map((imagen) => (
          <div key={imagen.id}>
            <h2>{imagen.titulo}</h2>
            <div>
              <img
                src={imagen.src}
                className="img-responsive"
                alt="grafico"
              ></img>
            </div>
          </div>
        ))}
      </SwipeableViews>
      {imagenes.length >= 2 ? (
        <MobileStepper
          variant="text"
          steps={imagenes.length}
          position="static"
          activeStep={step}
          nextButton={
            <button
              onClick={handleNext}
              className="Button"
              disabled={step === imagenes.length - 1}
            >
              <KeyboardArrowRight />
            </button>
          }
          backButton={
            <button
              onClick={handleBack}
              className="Button"
              disabled={imagenes.length ? step === 0 : true}
            >
              <KeyboardArrowLeft />
            </button>
          }
        ></MobileStepper>
      ) : null}
    </div>
  );
}

export default Carusel;
