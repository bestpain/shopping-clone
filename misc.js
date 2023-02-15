import {
  FormControl,
  Box,
  Container,
  TextField,
  Grid,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardHeader from "../CardHeader";
import CardSubHeader from "../CardSubHeader";
import "./style.scss";
import { iconFolder } from "../../constants/ImageConstants";
import { countriesId } from "../../constants/idCard";

const BasicIdentification = ({
  formData,
  nextClick: parentNext,
  selectedCountry,
}) => {
  const { t: getLabel } = useTranslation();
  const [COC, setCOC] = useState();
  const [selectedField, setSelectedField] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  //   const [value, setValue] = useState("");
  //   const [passportNumber, setPassportNumber] = useState();
  //   const [identityNumber, setIdentityNumber] = useState();

  useEffect(() => {
    const country = countriesId.filter(
      (countryId) => countryId.country === selectedCountry?.name
    );
    setCOC(...country);
  }, [selectedCountry]);

  const handleIDFieldChange = (event) => {
    setSelectedField(event.target.value);
  };

  const onNextClick = (e) => {
    e.preventDefault();
    console.log({ [selectedField]: IDNumber });
    if (parentNext) parentNext();
  };

  const showMuntipleIDsOptions = () => {
    return (
      <FormControl>
        <RadioGroup value={selectedField} onChange={handleIDFieldChange}>
          {formData.fields1.map((item, key) => (
            <>
              <FormControlLabel
                value={COC.fields[key].value}
                control={<Radio />}
                label={item.label}
                labelPlacement="start"
              />
              {selectedField === item.value && (
                <TextField
                  fullWidth
                  placeholder={COC.fields[key].helpText}
                  value={IDNumber}
                  onChange={(e) => setIDNumber(e.target.value)}
                />
              )}
            </>
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  const showOneIDOption = () => {
    return (
      <FormControl fullWidth className="custom-form-controler">
        {formData.fields2.map((item, key) => (
          <TextField
            required={item.required}
            label={item.label}
            fullWidth
            placeholder={COC?.fields[0].helpText}
            value={IDNumber}
            onChange={(e) => setIDNumber(e.target.value)}
          />
        ))}
      </FormControl>
    );
  };

  return (
    <Box align="center" mb={6} mt={2}>
      <Container mt={10} mb={10} maxWidth="md">
        <img src={iconFolder + formData.headerIcon + ".svg"} alt="Icon" />
        <CardHeader title={getLabel(formData.header)} />
        {formData.subHeader && (
          <CardSubHeader value={getLabel(formData.subHeader)} />
        )}

        <Box display="flex" justifyContent="center" mt={5}>
          <form onSubmit={onNextClick}>
            <Grid container spacing={1}>
              {COC?.hasMuntipleIDs
                ? showMuntipleIDsOptions()
                : showOneIDOption()}
              <Grid item md={12} xs={12}>
                <Button
                  //   disabled={!passportNumber && !identityNumber}
                  sx={{ m: 3 }}
                  type="submit"
                  variant="contained"
                >
                  {getLabel("NEXT")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default BasicIdentification;




 {
          "type": "basicIdentification",
          "cardKey": 2,
          "headerIcon": "QUESTIONNAIRE_ICON",
          "header": "PROVIDE_ID",
          "subHeader": "GOVERNMENT_ID",
          "skipText": "",
          "fields1": [
            {
              "label": "National ID Number",
              "value": "NATIONAL_IDENTITY_NUMBER",
              "required": false,
              "column": 12,
              "type": "radio"
            },
            {
              "label": "Passport Number",
              "value": "PASSPORT_NUMBER",
              "required": false,
              "column": 12,
              "type": "radio"
            }
          ],
          "fields2": [
            {
              "label": "NATIONAL PASSPORT",
              "value": "NATIONAL_PASSPORT_NUMBER",
              "required": true,
              "column": 12,
              "type": "text"
            }
          ]
        }








export const countriesId = [
  {
    country: "Austria",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 3,
        max: 35,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Bulgaria",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 10,
        max: 10,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Belgium",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 11,
        max: 11,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Croatia",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 11,
        max: 11,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Cyprus",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 7,
        max: 7,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Czech Republic",
    hasMuntipleIDs: true,
    fields: [
      {
        min: 9,
        max: 10,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
      {
        min: 8,
        max: 35,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Denmark",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 10,
        max: 10,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Finland",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 11,
        max: 11,
        isAlphaNumeric: true,
        symbolsAllowed: true,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "France",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 3,
        max: 35,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Germany",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 3,
        max: 35,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Hungary",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 3,
        max: 35,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Greece",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 10,
        max: 10,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Ireland",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 3,
        max: 35,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Latvia",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 11,
        max: 12,
        isAlphaNumeric: false,
        symbolsAllowed: true,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Liechtenstein",
    hasMuntipleIDs: true,
    fields: [
      {
        min: 6,
        max: 6,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
      {
        min: 6,
        max: 6,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Lithuania",
    hasMuntipleIDs: true,
    fields: [
      {
        min: 11,
        max: 11,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
      {
        min: 8,
        max: 8,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Luxembourg",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 3,
        max: 35,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Netherlands",
    hasMuntipleIDs: true,
    fields: [
      {
        min: 9,
        max: 9,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
      {
        min: 9,
        max: 9,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Norway",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 11,
        max: 11,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Portugal",
    hasMuntipleIDs: true,
    fields: [
      {
        min: 9,
        max: 9,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "NATIONAL_IDENTITY_NUMBER",
      },
      {
        min: 7,
        max: 7,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Romania",
    hasMuntipleIDs: true,
    fields: [
      {
        min: 13,
        max: 13,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
      {
        min: 8,
        max: 8,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Slovakia",
    hasMuntipleIDs: true,
    fields: [
      {
        min: 10,
        max: 10,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
      {
        min: 9,
        max: 9,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Slovenia",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 13,
        max: 13,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Sweden",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 12,
        max: 12,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "United Kingdom",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 9,
        max: 9,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Estonia",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 11,
        max: 11,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Iceland",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 10,
        max: 10,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Italy",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 16,
        max: 16,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Poland",
    hasMuntipleIDs: true,
    fields: [
      {
        min: 11,
        max: 11,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
      {
        min: 10,
        max: 10,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Malta",
    hasMuntipleIDs: true,
    fields: [
      {
        min: 8,
        max: 8,
        isAlphaNumeric: true,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
      {
        min: 7,
        max: 7,
        isAlphaNumeric: false,
        symbolsAllowed: false,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
  {
    country: "Spain",
    hasMuntipleIDs: false,
    fields: [
      {
        min: 9,
        max: 9,
        isAlphaNumeric: true,
        symbolsAllowed: true,
        helpText: "some help text",
        value: "PASSPORT_NUMBER",
      },
    ],
  },
];








import React, { useRef, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { FormProvider } from "react-hook-form";
import {
  AboutYourSelf,
  CountryDropdown,
  BasicIdentification,
  SearchAddress,
  ManualAddress,
} from "../../../../components/FormCard";
import FXCMQuestionCard from "../../../../components/FXCMQuestionCard";
import ContactNumber from "../../../../components/FormCard/ContactNumber";
import { updateUserInfo } from "../../../../reducers/userInfoSlice";

const SectionComponent = ({
  sectionData,
  gotToNextSection,
  activeSection,
  sectionName,
}) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = sectionData.cards;
  const countryName = useRef(); // new
  const getStepContent = (step) => {
    const singleCardData = steps[step];
    // setSingleCardData(steps[step], "data");
    switch (singleCardData.type) {
      case "question":
        return (
          <FXCMQuestionCard
            key={step}
            questionData={singleCardData}
            nextClick={handleNext}
            backClick={handleBack}
            // sectionKey={sectionKey}
            // setSectionKey={setSectionKey}
            //setCardKey={setCardKey}
          />
        );
      case "intro":
        return (
          <FXCMQuestionCard
            key={step}
            questionData={singleCardData}
            nextClick={handleNext}
            backClick={handleBack}
            // sectionKey={sectionKey}
            // setSectionKey={setSectionKey}
          />
        );
      case "aboutYourself":
        return (
          <AboutYourSelf
            key={step}
            formData={singleCardData}
            nextClick={handleNext}
          />
        );
      case "citizenship":
        return (
          <CountryDropdown
            key={step}
            formData={singleCardData}
            nextClick={handleNext}
          />
        );
      case "basicIdentification":
        return (
          <BasicIdentification
            key={step}
            formData={singleCardData}
            nextClick={handleNext}
            selectedCountry={countryName.current} //new
          />
        );
      case "searchAddress":
        return (
          <SearchAddress
            key={step}
            formData={singleCardData}
            nextClick={handleNext}
          />
        );
      case "manualAddress":
        return (
          <ManualAddress
            key={step}
            formData={singleCardData}
            nextClick={handleNext}
          />
        );
      case "contactnumber":
        return (
          <ContactNumber
            key={step}
            formData={singleCardData}
            nextClick={handleNext}
          />
        );
      default:
        return <div>No data Found</div>;
    }
  };

  // const isStepOptional = (step) => {
  // 	return step === 1 || step === 2;
  // };

  const handleNext = (singleCardResponse, section, card) => {
    // console.log(singleCardResponse, section, card);
    countryName.current = singleCardResponse; //new
    dispatch(updateUserInfo({ sectionName, card: singleCardResponse }));

    if (singleCardResponse) {
      console.log(
        "---------------------Current Card Data---------------------\n\n" +
          JSON.stringify(singleCardResponse)
      );
    }

    if (activeStep === steps.length - 1) {
      if (singleCardResponse) {
        //call API if required and go to next step
        setActiveStep(0);
        if (gotToNextSection) {
          gotToNextSection();
        }
      } else {
        setActiveStep(0);
        if (gotToNextSection) {
          gotToNextSection();
        }
      }
    } else {
      //Save data in store and go to next by setting active step
      if (card >= 0) {
        if (activeSection === section) {
          setActiveStep(card);
        } else {
          setActiveStep(card);
          gotToNextSection(section);
        }
      } else {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <FormProvider>{getStepContent(activeStep)}</FormProvider>
      )}
    </>
  );
};
export default SectionComponent;
