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
          "required": false,
          "column": 6,
          "type": "text"
        },
        {
          "label": "Street name",
          "value": "street",
          "required": false,
          "column": 6,
          "type": "text"
        },
        {
          "label": "City / Town",
          "value": "city",
          "required": false,
          "column": 6,
          "type": "text"
        },
        {
          "label": "Province",
          "value": "province",
          "required": false,
          "column": 7,
          "type": "text"
        },
        {
          "label": "Postcode",
          "value": "postal_code",
          "required": false,
          "column": 5,
          "type": "text"
        }
      ]
    },
      
      
      
      
      
      
      
      import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  FormControl,
  TextField,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CardHeader from "../../../CardHeader";
import CardSubHeader from "../../../CardSubHeader";
import FXCMAddressDropdown from "../../../common/FXCMLoqateSearchBar";
import "./style.scss";
import { imageFolder } from "../../../../constants/ImageConstants";
import { restrictedCountriesURL } from "../../../../constants/configurationServices";
import FXCMTrans from "../../../common/FXCMTrans";

const SearchAddress = ({ formData, nextClick: parentNext }) => {
  const { t: getLabel } = useTranslation();
  const [loqateService, setLoqateService] = useState(true);
  const [isManual, setIsManual] = useState(false);
  const [restrictedLoqate, setRestrictedLoqate] = useState();
  const [provinceRestricted, setProvinceRestricted] = useState();
  const [errorFeild, setErrorFeild] = useState([]);
  const COR = useSelector((state) => state.user.user.countryOfResidence);

  const fetchLoqateRestrictedcountries = () => {
    fetch(restrictedCountriesURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRestrictedLoqate(data.loqateRestricted);
        setProvinceRestricted(data.provinceRestricted);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    fetchLoqateRestrictedcountries();
  }, []);

  useEffect(() => {
    if (restrictedLoqate?.includes(COR)) {
      setLoqateService(false);
      setIsManual(true);
    }
  }, [restrictedLoqate, COR]);

  const showManualAddressFeilds = () => {
    setIsManual(true);
  };

  const onNextClick = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const errorFeilds = [];
    for (let key in formJson) {
      if (formJson[key] === "" && key !== "flat_no") errorFeilds.push(key);
    }
    setErrorFeild(errorFeilds);
    if (parentNext && !errorFeilds.length) {
      parentNext();
      console.log(formJson);
    }
  };

  const getFeildSize = (item) => {
    if (!provinceRestricted?.includes(COR)) {
      if (item.value === "street") return 12;
      if (item.value === "city") return 7;
    }
    return item.column;
  };

  const showFeild = (item) => (
    <Grid item md={getFeildSize(item)} key={item.value}>
      <FormControl className="custom-form-controler address-feild" fullWidth>
        <TextField
          required={item.required}
          placeholder={getLabel(item.label)}
          type={item.type}
          variant="outlined"
          id={item.value}
          name={item.value}
          onChange={() => {
            if (errorFeild.length) setErrorFeild([]);
          }}
          error={errorFeild.includes(item.value)}
          helperText={
            errorFeild.includes(item.value) ? (
              <FXCMTrans defaults={getLabel("MANDATORY_CHECK")} />
            ) : (
              ""
            )
          }
        />
      </FormControl>
    </Grid>
  );

  const manualAddressFeilds = () => {
    return (
      <Box className={`manual-address ${isManual ? "" : "show-feilds"}`}>
        {loqateService && <Divider />}
        <Grid container spacing={1} rowGap={2}>
          {formData.fields.map((item) => {
            return item.value === "province" ? (
              provinceRestricted?.includes(COR) ? (
                showFeild(item)
              ) : (
                <></>
              )
            ) : (
              showFeild(item)
            );
          })}
        </Grid>
      </Box>
    );
  };

  if (formData) {
    return (
      <Box mt={4} className="search-address-card">
        <form onSubmit={onNextClick}>
          <Container sx={{ textAlign: "center" }} className="address-class">
            <img src={`${imageFolder}${formData.headerIcon}`} alt="mailImg" />
            <CardHeader title={getLabel(formData.header)} />
            <CardSubHeader value={getLabel(formData.subHeader)} />
            {loqateService ? (
              <>
                <FXCMAddressDropdown
                  searchLabel={formData.inputLabel}
                  selectedCountry={COR}
                  displayManualFeilds={showManualAddressFeilds}
                />
                {manualAddressFeilds()}
                {!isManual && (
                  <Typography>
                    <Button
                      className="type-address"
                      variant="text"
                      onClick={showManualAddressFeilds}
                    >
                      {getLabel(formData.TextManual)}
                    </Button>
                  </Typography>
                )}
              </>
            ) : (
              manualAddressFeilds()
            )}
            <Button
              disabled={false}
              sx={{ m: 3 }}
              type="submit"
              variant="contained"
            >
              {getLabel("NEXT")}
            </Button>
          </Container>
        </form>
      </Box>
    );
  }
};

export default SearchAddress;





@mixin marginTop {
  margin-top: 233px;
  @media (max-width: 600px) {
    margin-top: 109.29px;
  }
}

@mixin textfieldWidth {
  width: 448px;
  @media (max-width: 600px) {
    width: 312px;
  }
}

@mixin searchaddresscard {
  @media (max-width: 600px) {
    width: 375px;
    margin: 0 !important;
    .heading-1 {
      height: 31px !important;
      width: 311px !important;
    }
    .subtext-cards {
      height: 40px !important;
      width: 311px !important;
    }
    .MuiAutocomplete-root {
      width: 327px !important;
      height: 40px !important;
    }
    .MuiTypography-root {
      width: 327px !important;
    }
    .MuiButton-textPrimary {
      width: 327px;
      height: 19px;
    }
    .MuiButton-contained {
      margin-top: 24px !important;
      width: 327px !important;
      height: 46px;
      margin: auto;
      margin-top: 50px !important;
    }
    .manual-address {
      width: 327px !important;
      // height: 384px;
      .MuiDivider-root {
        width: 321px !important;
      }
      .MuiGrid-root.MuiGrid-container {
        width: 327px;
        height: 280px;
        .MuiGrid-item {
          width: 327px;
        }
      }
    }
    .loqate-search-bar {
      width: 327px !important;
      height: 56px;
    }
  }
}

.search-address-card {
  @include searchaddresscard();
  width: 920px;
  margin-left: auto;
  margin-right: auto;
  .heading-1 {
    display: flex;
    justify-content: center;
    width: 448px;
    height: 45px;
    font-family: "Noto Sans";
    line-height: 45px;
    letter-spacing: 0.03em;
    margin: auto;
  }
  .Mui-disabled.Mui-error.MuiOutlinedInput-root {
    background: #e6e6e6;
  }
  .MuiFormLabel-root.Mui-disabled.Mui-error {
    color: #c4c4c4;
  }
  .show-feilds {
    display: none;
  }
  .MuiFormHelperText-root {
    margin: 4px 0px;
    padding: 8px 12px;
    width: 448px;
    height: 56px;
    background: #fdf0f2;
    opacity: 0.8;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .subtext-cards {
    font-family: "Noto Sans";
    height: 22px;
    margin: 0 auto;
    margin-bottom: 20px;
    width: auto; //new
  }
  .loqate-search-bar {
    width: 448px;
    .MuiInputBase-root {
      height: 40px;
      .MuiInputBase-input {
        font-size: 10px; // new
      }
    }
  }
  .MuiTypography-root {
    display: flex;
    justify-content: center;
  }
  .type-address {
    display: flex;
    margin-top: 10px;
  }
  .MuiButton-contained {
    margin-top: 36px;
    width: 140px;
  }
  .manual-address {
    width: 448px;
    margin: auto;
    margin-top: 24px;
    .address-feild {
      height: 40px;
      .MuiTextField-root {
        height: 40px;
      }
      .MuiFormHelperText-root.Mui-error {
        width: inherit;
        padding: 0;
        margin: 0;
        margin-left: 2px;
      }
    }
    .MuiDivider-root {
      border: 1px solid #e5e5e5;
      margin-bottom: 24px;
      box-sizing: border-box;
    }
  }
}

.pcaautocomplete.pcatext {
  width: 446px;
  border-radius: 4px;
  font-size: 10px;
  margin-top: 5px;
  @media (max-width: 600px) {
    width: 327px;
  }
}





import React, { useState, useEffect, useRef } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import FXCMTrans from "../FXCMTrans";
import { DEFAULT_OPTIONS } from "./Loqate.config";

const FXCMLoqateSearchBar = ({
	searchLabel,
	selectedCountry,
	displayManualFeilds,
}) => {
	const { t: getLabel } = useTranslation();
	const [selectedAddress, setSelectedAddress] = useState("");
	const [loqateError, setLoqateError] = useState(false);
	const loqateControl = useRef();

	const setupLoqate = () => {
		const pca = window?.pca;
		const handleAddressSelect = (address) => {
			const addressString = address["Label"].split("\n").join(", ");
			displayManualFeilds();
			setSelectedAddress(addressString);
		};

		const handleLoqateError = () => {
			setLoqateError(true);
			displayManualFeilds();
			setSelectedAddress("");
		};

		const Loqatefields = [
			{ element: "fxcm-loqate-search", field: "" },
			{
				element: "flat_no",
				field: "SubBuilding",
				mode: pca.fieldMode.POPULATE,
			},
			{
				element: "street_no",
				field: "BuildingNumber",
				mode: pca.fieldMode.POPULATE,
			},
			{ element: "street", field: "Street", mode: pca.fieldMode.POPULATE },
			{ element: "city", field: "City", mode: pca.fieldMode.POPULATE },
			{
				element: "province",
				field: "ProvinceName",
				mode: pca.fieldMode.POPULATE,
				PRESERVE: true,
			},
			{
				element: "postal_code",
				field: "PostalCode",
				mode: pca.fieldMode.POPULATE,
			},
		];

		const options = DEFAULT_OPTIONS(selectedCountry);

		if (loqateControl.current) {
			loqateControl.current.clear();
			loqateControl.current.destroy();
		}

		loqateControl.current = new pca.Address(Loqatefields, options);
		loqateControl.current.listen("populate", handleAddressSelect);
		loqateControl.current.listen("error", handleLoqateError);
		loqateControl.current.reload();
	};

	useEffect(() => {
		setupLoqate();
	}, [selectedCountry]);

	return (
		<TextField
			className="loqate-search-bar"
			id="fxcm-loqate-search"
			label={getLabel(searchLabel)}
			variant="outlined"
			error={loqateError}
			onChange={(e) => setSelectedAddress(e.target.value)}
			value={selectedAddress}
			size="small"
			disabled={loqateError}
			helperText={
				loqateError ? (
					<FXCMTrans defaults={getLabel("ADDRESS_SEARCH_ERROR")} />
				) : (
					""
				)
			}
			InputProps={{
				endAdornment: (
					<InputAdornment>
						<img
							src={process.env.REACT_APP_CDN_URL + "/images/search-icon.svg"}
							alt="Icon"
						/>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default FXCMLoqateSearchBar;




