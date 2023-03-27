{
  "sections": [
    {
      "sectionName": "aboutYourself",
      "sectionKey": 0
    },
    {
      "sectionName": "formofID",
      "sectionKey": 1
    },
    {
      "sectionName": "addressContact",
      "sectionKey": 2
    },
    {
      "sectionName": "employmentInfo",
      "sectionKey": 3
    },
    {
      "sectionName": "financialInfo",
      "sectionKey": 4
    },
    {
      "sectionName": "tradingInfo",
      "sectionKey": 5
    }
  ]
}






{
  "sectionName": "aboutYourself",
  "sectionKey": 0,
  "cards": [
    {
      "type": "aboutYourself",
      "cardKey": 0,
      "headerIcon": "ABOUTYOURSELF_ICON",
      "header": "ABOUT_YOURSELF_HEADER",
      "subHeader": "ABOUT_YOURSELF_SUBHEADER",
      "fields": [
        {
          "label": "firstName",
          "value": "firstName",
          "required": true,
          "column": 6,
          "type": "text",
          "minLength": 1,
          "maxLength": 50
        },
        {
          "label": "middleName",
          "value": "middleName",
          "required": false,
          "column": 6,
          "type": "text",
          "minLength": 1,
          "maxLength": 50
        },
        {
          "label": "lastName",
          "value": "lastName",
          "required": true,
          "column": 12,
          "type": "text",
          "minLength": 1,
          "maxLength": 50
        },
        {
          "label": "dob",
          "value": "dob",
          "required": true,
          "column": 12,
          "type": "AgeDatePicker",
          "minAge": 18,
          "maxAge": 100
        },
        {
          "label": "gender",
          "value": "gender",
          "column": 12,
          "type": "radio",
          "options": [
            {
              "label": "MALE",
              "value": "M"
            },
            {
              "label": "FEMALE",
              "value": "F"
            }
          ]
        }
      ]
    },
    {
      "type": "question",
      "cardKey": 0,
      "headerIcon": "QUESTIONNAIRE_ICON",
      "header": "CITIZENSHIP_COUNTRY",
      "subHeader": "",
      "isMultiSelect": false,
      "skipText": "",
      "optionWidth": "short",
      "dependency": [
        {
          "sectionKey": 5,
          "cardKey": 3,
          "value": true
        }
      ],
      "options": [
        {
          "label": "YES",
          "value": true
        },
        {
          "label": "NO",
          "value": false
        }
      ]
    },
    {
      "type": "citizenship",
      "cardKey": 1,
      "headerIcon": "CITIZENSHIPPLACEBIRTH_ICON",
      "header": "CITIZENSHIP_BIRTH_PLACE",
      "subHeader": "CITIZENSHIP_BIRTH_PLACE_SUBHEADER",
      "isMultiSelect": false,
      "skipText": "",
      "isChecked": true,
      "checkLabel": "MY_PLACE_OF_BIRTH",
      "dependency": [
        {
          "sectionKey": 5,
          "cardKey": 3,
          "isChecked": true
        }
      ]
    },
    {
      "type": "placeOfBirth",
      "cardKey": 2,
      "headerIcon": "CITIZENSHIPPLACEBIRTH_ICON",
      "header": "PLACE_OF_BIRTH_TITLE",
      "subHeader": "PLACE_OF_BIRTH_TITLE_SUBHEADER",
      "isMultiSelect": false,
      "skipText": ""
    },
    {
      "type": "question",
      "cardKey": 1,
      "headerIcon": "POLITICALLYEXPOSEDPERSON_ICON",
      "header": "politicallyExposedPerson",
      "subHeader": "POLITICALLY_EXPOSED_PERSON_SUBHEADER",
      "isMultiSelect": false,
      "optionWidth": "short",
      "options": [
        {
          "label": "YES",
          "value": true
        },
        {
          "label": "NO",
          "value": false
        }
      ]
    }
  ]
}






{
  "sectionName": "addressContact",
  "sectionKey": 6,
  "cards": [
    {
      "type": "searchAddress",
      "cardKey": 0,
      "headerIcon": "home.png",
      "header": "WHERE_DO_YOU_LIVE",
      "subHeader": "WHERE_DO_YOU_LIVE_SUBHEADER",
      "inputLabel": "SEARCH_ADDRESS",
      "TextManual": "ENTER_MANUALLY",
      "skipText": "",
      "fields": [
        {
          "label": "Unit/flat# (optional)",
          "value": "flat_no",
          "required": false,
          "column": 6,
          "type": "text"
        },
        {
          "label": "Building/Street Number",
          "value": "street_no",
          "required": true,
          "column": 6,
          "type": "text"
        },
        {
          "label": "Street name",
          "value": "street",
          "required": true,
          "column": 12,
          "type": "text"
        },
        {
          "label": "City / Town",
          "value": "city",
          "required": true,
          "column": 6,
          "type": "text"
        },
        {
          "label": "Province",
          "value": "province",
          "required": true,
          "column": 7,
          "type": "text"
        },
        {
          "label": "Postcode",
          "value": "postal_code",
          "required": true,
          "column": 5,
          "type": "text"
        }
      ]
    },
    {
      "type": "contactnumber",
      "order": 1,
      "headerIcon": "phone.png",
      "header": "WHAT_IS_YOUR_CONTACT",
      "subHeader": "WHAT_IS_YOUR_CONTACT_SUBHEADER",
      "inputLabel": "SEARCH_ADDRESS",
      "TextManual": "ENTER_MANUALLY",
      "skipText": "",
      "fields": [
        {
          "label": "CONTACT_NUMBER",
          "value": "CONTACT_NUMBER",
          "required": true,
          "column": 8,
          "type": "number"
        }
      ]
    }
  ]
}






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

export const StepperComponent = ({
  skippedSections,
  steps,
  activeSection,
  completed,
  handleStep,
}) => {
  const { t: getLabel } = useTranslation();
  const isMobile = window.innerWidth < 600;
  const mobileSteps = activeSection
    ? [activeSection - 1, activeSection + 2]
    : [0, 3];

  return (
    <>
      {isMobile ? (
        <Stepper
          className="customSteperStyle"
          activeStep={activeSection < 2 ? activeSection : 1}
        >
          {steps.slice(...mobileSteps).map((stepData) => {
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
                    <p>{getLabel(stepData.sectionName)}</p>
                    {isSkipped && (
                      <img
                        src={optionIconFolder + "skip_next" + ".svg"}
                        alt="Icon"
                      />
                    )}
                  </StepLabel>
                )}
              ></Step>
            );
          })}
        </Stepper>
      ) : (
        <Stepper className="customSteperStyle" activeStep={activeSection}>
          {steps.map((stepData) => {
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
                    <p>&nbsp;{getLabel(stepData.sectionName)}</p>
                    {isSkipped && (
                      <img
                        src={optionIconFolder + "skip_next" + ".svg"}
                        alt="Icon"
                      />
                    )}
                  </StepLabel>
                )}
              ></Step>
            );
          })}
        </Stepper>
      )}
    </>
  );
};







// @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap");

@import "../src/assets/scss/ColorVariable.scss";
@import "../src/assets/scss/mixin.scss";

@import "../src/assets/scss/Typography.scss";
@import "../src/assets/scss/Button.scss";
@import "../src/assets/scss/Link.scss";
// @import "../src/assets/scss/Dropdown.scss";
@import "../src/assets/scss/Checkbox.scss";
@import "../src/assets/scss/TextField.scss";
@import "../src/components/CardSubHeader/style.scss";

body,
* {
  font-family: "Noto Sans", sans-serif !important;
}

// media
@mixin marginHeader {
  margin-top: 20px;
  @media (max-width: 600px) {
    margin-top: 76px;
  }
}

@mixin bodyWrapperPadding {
  padding-top: 130px;
}

@mixin responsiveWidth {
  width: 460px;
  @media (max-width: 600px) {
    width: 343px;
  }
}

.body-wrapper {
  @include bodyWrapperPadding;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.container-home {
  @include responsiveWidth;
  margin: 0 auto;
  padding: 0 15px;
  .MuiGrid-container {
    .MuiGrid-item {
      padding-top: 0;
    }
  }
}

.button-text {
  &.MuiButton-root {
    &.MuiButton-text {
      color: $primary;
      text-transform: capitalize;
      background: transparent !important;
      border-radius: 30px;
    }
  }
}
.white-outline-button {
  &.MuiButton-root {
    &.MuiButton-text {
      color: $primary;
      text-transform: capitalize;
      background: transparent !important;
      border: 2px solid #f0f0f0;
    }
  }
}

.flag-img {
  width: 20px;
  margin-right: 10px;
}

.custom-select-dropdown {
  .MuiMenu-list {
    max-height: 300px;
    max-width: 500px;
  }
}

.sub-text {
  &.MuiTypography-root {
    color: rgba($black, 0.68);
    font-size: 11px;
  }
}

.link-text {
  &.MuiTypography-root {
    color: $primary;
    font-size: 12px;
    cursor: pointer;
  }
}

.chat-button {
  &.MuiButton-root {
    display: flex;
    flex-direction: column;
    text-transform: none;
    box-shadow: 0px 3px 16px 2px rgb(0 0 0 / 12%);
    border-radius: 100px;
    width: 80px;
    height: 80px;

    p {
      font-size: 10px;
    }
  }
}
.heading-title {
  &.MuiTypography-h5 {
    font-size: 36px;
    font-weight: 300;
    @include forPhoneOnly {
      font-size: 28px;
    }
  }
}
.stepper-box-wrapper {
  // position: fixed;
  // width: 100%;
  // position: sticky;
  // top: 0;
  padding: 0 !important;
  // background: #0071eb;
  .hide-step {
    display: none;
  }
  .skipped-section {
    background: #dda034 !important;
    border-radius: 32px !important;
    .MuiStepLabel-label {
      color: #ffffff !important;
    }
  }
  .MuiStepLabel-iconContainer {
    display: none;
  }
  .MuiStepLabel-root {
    padding: 2px 20px 2px 20px;
    width: 240px;
    height: 28px;
    background: #0071eb;
    border-radius: 0px 32px 32px 0px;
  }
  .Mui-completed {
    color: #97c6f7 !important;
  }
  .MuiStepLabel-root:has(> .Mui-completed) {
    background: #0071eb;
    border-radius: 0px;
  }
  .Mui-disabled {
    background: #f3f3f3;
    border-radius: 0px;
    color: rgba(0, 0, 0, 0.6);
  }
  .MuiStepLabel-label {
    font-weight: 700 !important;
    // margin: 0 !important;
    display: flex;
    justify-content: space-around;
    height: 28px;
    align-items: center;
  }
  .Mui-active {
    color: #ffffff !important;
  }
}

.font-14 {
  font-size: 14px;
}
.error_text {
  color: #f44336;
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
}
.align_center {
  text-align: center;
}
.password-validation-wrapper {
  background: $lightRed;
  border-radius: 4px;
  text-align: initial;
  .MuiTypography-root {
    color: $red;
    font-size: 12px;
    font-weight: 500;
  }
  ul {
    padding-left: 18px;
    margin: 0;
    li {
      font-size: 12px;
      font-weight: 500;
      color: #524f4b;
      line-height: 1.7;
      list-style-image: initial;
      &.default {
        color: #524f4b;
        list-style-image: initial;
      }
      &.greenTick {
        color: #20c374;
        list-style-image: url(../public/images/Vector.svg);
      }
      &.redCross {
        color: #f44336;
        list-style-image: url(../public/images/crossIcon.svg);
      }
    }
  }
}




