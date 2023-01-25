import React, { useState } from "react";
import {
	Container,
	Button,
	TextField,
	Box,
	Grid,
	FormControl,
	FormControlLabel,
	Checkbox,
	FormGroup,
	Autocomplete,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CardHeader from "../CardHeader";
import CardSubHeader from "../CardSubHeader";
import "./style.scss";
import countryList from "./countryList.json";
import { imageFolder } from "../../constants/ImageConstants";

function countryToFlag(value) {
	const code = value?.substring(0, 2)
	return countryList.find(country => country.code === code)?.image
}

const ContactNumber = ({ formData, nextClick: parentNext }) => {
	const { t: getLabel } = useTranslation();
	const [countryValue, setCountryValue] = useState();
	const onNextClick = () => {
		if (parentNext) parentNext();
	};
	if (formData) {
		return (
			<Box className="conatct-class-wrapper">
				<form onSubmit={onNextClick}>
					<Container maxWidth="sm" sx={{ textAlign: "center" }}>
						<img src={`${imageFolder}${formData.headerIcon}`} alt="mailImg" />
						<CardHeader title={getLabel(formData.header)} />
						<CardSubHeader value={getLabel(formData.subHeader)} />
						<Box mt={1}>
							<Grid container spacing={1}>
								<Autocomplete
									// value={countryValue}
									// onChange={(event, newValue) => setCountryValue(newValue)}
									options={countryList}
									getOptionLabel={(option) =>
										`${option.code} (${option.countrycode})`
									}
									clearIcon
									renderOption={(props, option) => (
										<Box
											component="li"
											sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
											{...props}
										>
											<img
												loading="lazy"
												width="20"
												src={option.image}
												alt=""
											/>
											{option.code}({option.countrycode})
										</Box>
									)}
									renderInput={(params, data) => (
										<>
											{params.inputProps.value && (
												<span
													style={{
														position: "absolute",
														transform: "translateY(50%)",
														marginLeft: "15px",
													}}
												>
													<img
														loading="lazy"
														width="20"
														src={countryToFlag(params.inputProps.value)}
														alt="" />
												</span>
											)}
											<TextField
												{...params}
												label={getLabel("Country Code")}
												inputProps={{
													...params.inputProps,
													style: { marginLeft: "20px" } // disable autocomplete and autofill
												}}
												size="small"
											/>
										</>
									)
									}
								/>
								{
									formData.fields.map((item, index) => {
										return (
											<Grid item md={item.column} key={index}>
												<FormControl
													fullWidth
													className="custom-form-controler1 control-phone"
													style={{ width: "305px" }}
												>
													<TextField
														required={item.required}
														type={item.type}
														label={getLabel(item.label)}
														variant="outlined"
														size="small"
													/>
												</FormControl>
											</Grid>
										);
									})
								}
							</Grid>
						</Box>
						<hr />
						<FormGroup className="checkbox">
							<FormControlLabel
								control={<Checkbox defaultChecked size="small" />}
								label="I consent to receive emails at ed@test.com from FXCM about free educational and promotional trading material"
							/>
							<FormControlLabel
								control={<Checkbox defaultChecked size="small" />}
								label="I consent to receive text messages from FXCM about free educational and promotional trading material."
							/>
						</FormGroup>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="next-button-class"
						>
							{getLabel("NEXT")}
						</Button>
					</Container>
				</form>
			</Box >
		);
	}
};

export default ContactNumber;














@import "../../App.scss";

@mixin mlContactNumber {
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0px;
  }
}

@mixin mtPhoneIcon {

  // margin-top: 120px;
  @media (max-width: 600px) {
    margin-top: 60px;
  }
}

@mixin lineWidth {
  width: 500px;

  @media (max-width: 600px) {
    width: 300px;
  }
}

@mixin mlcheckbox {
  margin-left: 30px;

  @media (max-width: 600px) {
    margin-left: 0px;
  }
}

.MuiGrid-root {
  .radio-group {
    text-align: initial;
  }

  .form-radio-control {
    &.MuiFormControl-root {
      // display: block;
      text-align: initial;

      .MuiFormGroup-root {
        flex-direction: row;

        .MuiFormControlLabel-root {
          border: 1px solid #e6e6e6;
          border-radius: 4px;
          padding-right: 16px;
          margin-left: 0;

          .MuiFormControlLabel-label {
            font-size: 14px;
            color: rgba($black, 0.44);
          }
        }
      }

      .helperText {
        background: #fdf0f2;
        border-radius: 4px;
        font-weight: 500;
        font-size: 14px;
        line-height: 19px;
        color: #b61e3a;
        width: 218px;
        height: 34px;
        padding-top: 7px;
        padding-left: 5px;
        margin-top: 3px;
      }
    }
  }
}

.cutome-date-picker {
  .MuiFormHelperText-root {
    margin: 0;
    background: #fdf0f2;
    border-radius: 4px;
    color: $red;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
  }
}

.custom-autoComplete {
  .MuiFormControl-root {
    .MuiFormLabel-root {
      font-size: 14px;
      left: 30px;

      &.MuiInputLabel-shrink {
        left: 0;
      }
    }

    .MuiInputBase-root {
      padding-left: 40px;

      &::before {
        content: "";
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
      }
    }

    .MuiButtonBase-root {
      background: none !important;
    }

    .MuiInputBase-input {
      height: auto;
      font-size: 14px;
      color: rgba($black, 0.66);
    }

    .MuiAutocomplete-popupIndicator {
      .MuiSvgIcon-root {
        fill: none;
      }
    }
  }
}

//contact number
.conatct-class-wrapper {
  @include mtPhoneIcon;

  .MuiContainer-root {
    hr {
      margin-top: 15px;
      border: 1px solid #e5e5e5;
      @include lineWidth;
    }

    .MuiBox-root {
      @include mlContactNumber;

      .MuiGrid-root {
        margin-left: 6px;

        .MuiAutocomplete-root {
          margin-top: 8px;
          width: 140px;
          height: 40px;
          margin-left: 20px;
        }
        .MuiInputBase-formControl{
          padding-right: 0;
          .MuiAutocomplete-endAdornment{
            right: 4px;
          }
        }
        .MuiGrid-root {
          padding: 0;
          height: 40px;
          margin-top: 8px;
          .custom-form-controler1 {
            &.control-phone {
              .MuiFormControl-root {
                @media (max-width: 600px) {
                  width: 163.5px;
                }
                
              }

              .MuiFormLabel-root {
                line-height: 1.7;

                &.MuiInputLabel-shrink {
                  line-height: 1;
                }
              }
            }
          }
        }
      }
    }

    .checkbox {
      @include mlcheckbox;

      .MuiFormControlLabel-root {
        .MuiTypography-root {
          font-weight: 400;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.68);
          line-height: 19px;
          text-align: initial;
          padding-top: 16px;
        }
      }
    }

    .next-button-class {
      margin-top: 20px;
    }
  }
}
