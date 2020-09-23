import React, { useEffect, useState } from "react";
import "./Carusel.css";
import { MobileStepper } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Skeleton from "../Helpers/Skeleton";

function Carusel({ loading, imagenes = [] }) {
  const [step, setStep] = useState(imagenes.length ? 0 : -1);
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    if (imagenes.length) {
      setStep(0);
    }
  }, [imagenes]);

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handleSwip = (step) => {
    setStep(step);
  };
  return (
    <div className="Carusel">
      {loading ? (
        <div>
          <Skeleton marginTop="3rem" />
          <Skeleton marginTop="1rem" height="200px" />
        </div>
      ) : null}
      <SwipeableViews
        index={step}
        enableMouseEvents
        axis="x"
        onChangeIndex={handleSwip}
      >
        {imagenes.map((imagen) => (
          <div key={imagen.id}>
            <h2>{imagen.descripcion}</h2>
            <div>
              <img
                src={imagen.url}
                className="img-responsive"
                alt="grafico"
              ></img>
            </div>
          </div>
        ))}
      </SwipeableViews>
      {imagenes.length >= 2 ? (
        <MobileStepper
          variant="dots"
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
