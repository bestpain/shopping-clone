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
import FXCMTrans from "../common/FXCMTrans";

const BasicIdentification = ({
  formData,
  nextClick: parentNext,
  selectedCountry,
}) => {
  const { t: getLabel } = useTranslation();
  const [COC, setCOC] = useState();
  const [selectedField, setSelectedField] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let country = countriesId.find(
      (countryId) => countryId.country === selectedCountry?.name
    );
    if (!country) {
      country = {
        country: "Other",
        hasMuntipleIDs: false,
        isRequired: false,
        fields: [
          {
            min: 3,
            max: 35,
            isAlphaNumeric: true,
            symbolsAllowed: false,
            helpText: "some help text",
            value: "NATIONAL_PASSPORT_NUMBER",
          },
        ],
      };
    }
    setCOC(country);
    if (!country.hasMuntipleIDs) setSelectedField(country.fields[0].value);
  }, [selectedCountry]);

  const handleIDFieldChange = (event) => {
    setSelectedField(event.target.value);
    setIDNumber("");
  };

  const onNextClick = (e) => {
    e.preventDefault();
    if (errorMessage) {
      setError(true);
      return;
    }
    if (error === false && !errorMessage && parentNext) parentNext();
  };

  const isValid = (value, field) => {
    let { min, max, isAlphaNumeric, symbolsAllowed } = field;
    const isLengthSatisfied = new RegExp(`^.{${min},${max}}$`).test(value);
    const isOnlyNumeric = /^\d+$/.test(value);
    const hasSymbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);

    if (
      !isLengthSatisfied ||
      (isAlphaNumeric === false && isOnlyNumeric === false) ||
      (symbolsAllowed === false && hasSymbols === true)
    ) {
      return false;
    }
    return true;
  };

  const handleIDChange = (value, field) => {
    setIDNumber(value);
    if (error) setError(false);
    setErrorMessage(!isValid(value, field) ? "Does not satisfy input" : "");
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
                  onChange={(e) =>
                    handleIDChange(e.target.value, COC.fields[key])
                  }
                  required={COC.isRequired}
                  error={error ? true : false}
                  helperText={
                    error ? <FXCMTrans defaults={errorMessage} /> : ""
                  }
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
            label={item.label}
            fullWidth
            placeholder={COC?.fields[0].helpText}
            value={IDNumber}
            onChange={(e) => handleIDChange(e.target.value, COC.fields[key])}
            required={COC.isRequired}
            error={error ? true : false}
            helperText={error ? <FXCMTrans defaults={errorMessage} /> : ""}
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
        value: "NATIONAL_PASSPORT_NUMBER",
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
        min: 3,
        max: 5,
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
    isRequired:true,
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
    isRequired:true,
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
    isRequired:true,
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
    isRequired:true,
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
    isRequired:true,
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
    isRequired:true,
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
