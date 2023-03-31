import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  styled,
  StepButton,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import PropTypes from "prop-types";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { optionIconFolder } from "../../../constants/ImageConstants";

const getMobileLabelName = (label) => {
  if (label === "addressContact") return "Contact";
  if (label === "financialInfo") return "Finances";
  return label;
};

export const StepperComponent = ({ skippedSections, steps, activeSection }) => {
  const { t: getLabel } = useTranslation();
  const isMobile = window.innerWidth < 600;
  const isLastStep = activeSection === steps.length - 1;
  const mobileSteps = activeSection
    ? !isLastStep
      ? [activeSection - 1, activeSection + 2]
      : [activeSection - 2, activeSection + 1]
    : [0, 3];

  const getProgressBar = (stepData) => {
    const isSkipped = skippedSections?.includes(stepData.sectionName);
    return (
      <Step
        key={stepData.sectionName}
        component={() => (
          <StepLabel className={isSkipped ? "skipped-section" : ""}>
            <p>
              {activeSection === stepData.sectionKey
                ? `${stepData.sectionKey + 1} / ${steps.length}`
                : ""}
            </p>
            <p>
              {isMobile ? (
                <>&nbsp;{getLabel(getMobileLabelName(stepData.sectionName))}</>
              ) : (
                getLabel(stepData.sectionName)
              )}
            </p>
            {isSkipped && (
              <img src={optionIconFolder + "skip_next" + ".svg"} alt="Icon" />
            )}
          </StepLabel>
        )}
      ></Step>
    );
  };

  return (
    <>
      {isMobile ? (
        <Stepper
          className="customSteperMobileStyle"
          activeStep={activeSection < 2 ? activeSection : isLastStep ? 2 : 1}
        >
          {steps
            .slice(...mobileSteps)
            .map((stepData) => getProgressBar(stepData))}
        </Stepper>
      ) : (
        <Stepper className="customSteperStyle" activeStep={activeSection}>
          {steps.map((stepData) => getProgressBar(stepData))}
        </Stepper>
      )}
    </>
  );
};
