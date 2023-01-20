import React, { useState } from "react";
import {
	RadioGroup,
	FormControl,
	FormControlLabel,
	Radio,
	Box,
	Container,
	TextField,
	Grid,
	Button,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useTranslation } from "react-i18next";
import CardHeader from "../CardHeader";
import CardSubHeader from "../CardSubHeader";
import moment from "moment";
import "./style.scss";

const AboutYourSelf = ({ formData, nextClick: parentNext }) => {
	const { t: getLabel } = useTranslation();
	console.log(formData, "singleCardData");
	const about = {};
	useEffect(() => {
		formData.fields.forEach((item, key) => {
			about[item.label] = null
		})
	}, [])

	const [dateValue, setDateValue] = useState(null);
	const [age, setAge] = useState();
	const [aboutUser, setAboutUser] = useState(about)

	const updateAboutUser = (newValue, type) => {
		let updatedUser = {};
		if (type === 'DATE_OF_BIRTH') {
			const DOB = (moment(newValue).format("DD/MM/YYYY"))
			updatedUser = { ...aboutUser, [type]: DOB };
			setAge(moment().diff(newValue, "years", false), "age");
			setDateValue(newValue);
		} else {
			updatedUser = { ...aboutUser, [type]: newValue };
		}
		setAboutUser(updatedUser)
	}

	const ageData = formData.fields && formData.fields.find((item) => item.type === 'AgeDatePicker');

	const validation = () => {
		let isValid = true;
		if (age < ageData.minAge + 1 || age > ageData.maxAge || !aboutUser) {
			isValid = false
		}
		return isValid;
	}

	const onNextClick = (e) => {
		e.preventDefault();
		if (validation()) {
			if (parentNext) parentNext();
		}
	};
	console.log(validation(), "validation()")
	if (formData) {
		return (
			<Box align="center" mb={6} mt={2}>
				<Container mt={10} mb={10} maxWidth="sm">
					<img
						src={"/images/icons/" + formData.headerIcon + ".svg"}
						alt="Icon"
					/>
					<CardHeader title={getLabel(formData.header)} />
					{formData.subHeader && (
						<CardSubHeader value={getLabel(formData.subHeader)} />
					)}

					<Box display="flex" justifyContent="center" mt={5}>
						<form onSubmit={onNextClick}>
							<Grid container spacing={2}>
								{formData.fields.map((item, key) => {
									return (
										<Grid key={key} item md={item.column} xs={12}>
											{item.type === "text" && (
												<FormControl
													fullWidth
													className="custom-form-controler"
												>
													<TextField
														required={item.required}
														label={item.required ? getLabel(item.label) : `${getLabel(item.label)} (${getLabel("OPTIONAL")})`}
														variant="outlined"
														fullWidth
														onChange={(event) => updateAboutUser(event.target.value, item.label)}
													/>
												</FormControl>
											)}
											{item.type === "AgeDatePicker" && (
												<FormControl
													fullWidth
													className="custom-form-controler cutome-date-picker"
												>
													<LocalizationProvider dateAdapter={AdapterMoment}>
														<DesktopDatePicker
															label={getLabel(item.label)}
															inputFormat="MM/DD/YYYY"
															value={dateValue}
															onChange={(value) => updateAboutUser(value, item.label)}
															//maxDate={new Date()}
															disableFuture
															renderInput={(params) => (
																<TextField
																	error={age < ageData.minAge + 1 || age > ageData.maxAge ? true : false}
																	helperText={
																		age < ageData.minAge + 1 || age > ageData.maxAge
																			? getLabel(
																				"AGE_DURATION"
																			)
																			: ""
																	}
																	{...params}
																/>
															)}
														/>
													</LocalizationProvider>
												</FormControl>
											)}

											{item.type === "radio" && (
												<FormControl className="form-radio-control">
													<RadioGroup
														//defaultValue={item.options[0].value}
														name={item.value}
														value={aboutUser[item.label]}
														onChange={(event) => updateAboutUser(event.target.value, item.label)}
													>
														{item.options &&
															item.options.map((listItem, key) => {
																return (
																	<FormControlLabel
																		value={listItem.value}
																		control={<Radio />}
																		label={listItem.label}
																	/>
																);
															})}
													</RadioGroup>
												</FormControl>
											)}
										</Grid>
									);
								})}
								<Grid item md={12} xs={12}>
									<Button disabled={!validation()} sx={{ m: 3 }} type="submit" variant="contained">
										{getLabel("NEXT")}
									</Button>
								</Grid>
							</Grid>
						</form>
					</Box>
				</Container>
			</Box>
		);
	}
};

export default AboutYourSelf;
