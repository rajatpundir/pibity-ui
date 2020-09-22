import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables, createVariable, objToMapRec,getVariable,updateVariable } from '../../../redux/actions/variables';
import CheckIcon from '@material-ui/icons/Check';
import { successMessage } from '../../main/Notification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateMachine extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'organization', 'zs' ],
				[ 'typeName', 'Machine' ],
				[ 'variableName', '' ],
				['active','true'],
				[
					'values',
					new Map([
						[ 'minPrice', 0 ],
						[ 'id', '' ],
						[ 'model', '' ],
						[ 'description', '' ],
						[ 'name', '' ],
						[ 'category', '' ],
						[ 'manufacturer' ],
						[ 'url', '' ],
						[ 'bidPrice', 0 ],
						[ 'termsAndConditions', '' ],
						[ 'unitForMeasure', '' ]
					])
				]
			]),
			manufacturer: new Map([
				[ 'organization', 'zs' ],
				[ 'typeName', 'Manufacturer' ],
				[ 'variableName', '' ],
				[ 'values', new Map([]) ]
			]),
			category: new Map([
				[ 'organization', 'zs' ],
				[ 'typeName', 'MachineCategory' ],
				[ 'variableName', '' ],
				[ 'values', new Map([]) ]
			]),
			unit: new Map([
				[ 'organization', 'zs' ],
				[ 'typeName', 'MachineUnitForMeasure' ],
				[ 'variableName', '' ],
				[ 'values', new Map([]) ]
			])
		};
		this.onChange = this.onChange.bind(this);
		this.onVariableNameChange = this.onVariableNameChange.bind(this);
		this.onManufacturerChange = this.onManufacturerChange.bind(this);
		this.onCategoryChange = this.onCategoryChange.bind(this);
		this.onUnitChange = this.onUnitChange.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
		this.props.getVariables('MachineCategory');
		this.props.getVariables('Manufacturer');
		this.props.getVariables('MachineUnitForMeasure');
		if (this.props.match.params.variableName) {
			this.props.getVariable(this.state.variable.get('typeName'), decodeURIComponent(this.props.match.params.variableName));
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.Machine) {
			const variable = nextProps.variables.Machine.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap
				};
			}
		}
		return prevState;
	}

	onCategoryChange(e) {
		const variable = cloneDeep(this.state.category);
		variable.set('variableName', e.target.value);
		this.setState({ category: variable });
	}

	onManufacturerChange(e) {
		const variable = cloneDeep(this.state.manufacturer);
		variable.set('variableName', e.target.value);
		this.setState({ manufacturer: variable });
	}

	onUnitChange(e) {
		const variable = cloneDeep(this.state.unit);
		variable.set('variableName', e.target.value);
		this.setState({ unit: variable });
	}

	onVariableNameChange(e) {
		const variable = cloneDeep(this.state.variable);
		variable.set('variableName', e.target.value);
		const values = variable.get('values');
		values.set('name', e.target.value);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set(e.target.name, e.target.value);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	render() {
		return (
			<Container>
				<PageWrapper>
					<PageBody>
						<PageBlock style={{ display: 'block' }} id="customer">
							<SaveButtonContaier>
								<SaveButton
									onClick={(e) => {
										if (this.props.match.params.variableName) {
											this.props.updateVariable(this.state.prevVariable, this.state.variable);
										} else {
											this.props.createVariable(this.state.variable).then((status) => {
												if (status === 200) {
													successMessage('Machine added succssesfuly');
												}
											});
										}
									}}
								>
									<CheckIcon />
								</SaveButton>
							</SaveButtonContaier>
							<PageToolbar>
								<ToolbarLeftItems>
									<LeftItemH1>Add Machine</LeftItemH1>
								</ToolbarLeftItems>
							</PageToolbar>
							<InputBody>
								<InputFieldContainer>
									<InputColumnWrapper>
										<FormControl>
											<Input
												name="id"
												type="text"
												placeholder="Machine id"
												value={this.state.variable.get('values').get('id')}
												onChange={this.onChange}
											/>{' '}
											<InputLabel>
												ID
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="name"
												type="text"
												placeholder="Machine Name"
												value={this.state.variable.get('values').get('name')}
												onChange={this.onVariableNameChange}
											/>{' '}
											<InputLabel>
												Name
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="url"
												type="text"
												placeholder=" Add Image Url"
												value={this.state.variable.get('values').get('url')}
												onChange={this.onChange}
											/>
											<InputLabel>Image Url</InputLabel>
										</FormControl>
									</InputColumnWrapper>
									<InputColumnWrapper>
										<FormControl>
											<Input
												name="model"
												type="text"
												placeholder="Machine Name"
												value={this.state.variable.get('values').get('model')}
												onChange={this.onChange}
											/>{' '}
											<InputLabel>
												Model
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="minPrice"
												type="Number"
												placeholder="Price"
												value={this.state.variable.get('values').get('minPrice')}
												onChange={this.onChange}
											/>{' '}
											<InputLabel>
												Min Price
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="bidPrice"
												type="Number"
												placeholder="Price"
												value={this.state.variable.get('values').get('bidPrice')}
												onChange={this.onChange}
											/>{' '}
											<InputLabel>
												Bidding Price
												<Required>*</Required>
											</InputLabel>
										</FormControl>
									</InputColumnWrapper>
									<InputColumnWrapper>
										<FormControl>
											<SelectWrapper>
												<Select
													value={{
														value: this.state.variable.get('values').get('manufacturer'),
														label: this.state.variable.get('values').get('manufacturer')
													}}
													onChange={(option) => {
														this.onChange({
															target: { name: 'manufacturer', value: option.value }
														});
													}}
													options={
														this.props.variables.Manufacturer !== undefined ? (
															this.props.variables.Manufacturer.map((variable) => {
																return {
																	value: variable.variableName,
																	label: variable.variableName
																};
															})
														) : (
															[]
														)
													}
												/>
											</SelectWrapper>
											<InputLabel>
												Manufacturer<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<SelectWrapper>
												<Select
													value={{
														value: this.state.variable.get('values').get('category'),
														label: this.state.variable.get('values').get('category')
													}}
													onChange={(option) => {
														this.onChange({
															target: { name: 'category', value: option.value }
														});
													}}
													options={
														this.props.variables.MachineCategory !== undefined ? (
															this.props.variables.MachineCategory.map((variable) => {
																return {
																	value: variable.variableName,
																	label: variable.variableName
																};
															})
														) : (
															[]
														)
													}
												/>
											</SelectWrapper>
											<InputLabel>Category</InputLabel>
										</FormControl>
										<FormControl>
											<SelectWrapper>
												<Select
													value={{
														value: this.state.variable.get('values').get('unitForMeasure'),
														label: this.state.variable.get('values').get('unitForMeasure')
													}}
													onChange={(option) => {
														this.onChange({
															target: { name: 'unitForMeasure', value: option.value }
														});
													}}
													options={
														this.props.variables.MachineUnitForMeasure !== undefined ? (
															this.props.variables.MachineUnitForMeasure.map(
																(variable) => {
																	return {
																		value: variable.variableName,
																		label: variable.variableName
																	};
																}
															)
														) : (
															[]
														)
													}
												/>
											</SelectWrapper>
											<InputLabel>Unit For Measure</InputLabel>
										</FormControl>
									</InputColumnWrapper>
									<InputRowWrapper>
										<FormControl>
											<Input
												name="description"
												type="text"
												placeholder=" Additional Description"
												value={this.state.variable.get('values').get('description')}
												onChange={this.onChange}
											/>
											<InputLabel>Description</InputLabel>
										</FormControl>

										<FormControl>
											<Input
												name="termsAndConditions"
												type="text"
												placeholder=" Add  Bidding Terms And Conditions"
												value={this.state.variable.get('values').get('termsAndConditions')}
												onChange={this.onChange}
											/>
											<InputLabel>Terms And Condition</InputLabel>
										</FormControl>
									</InputRowWrapper>
								</InputFieldContainer>
							</InputBody>
						</PageBlock>
						<PageBlock style={{ display: 'block' }} id="customer">
							<PageToolbar justifyContent="center">
								<ToolbarLeftItems>
									<LeftItemH1>Add Manufacturer</LeftItemH1>
								</ToolbarLeftItems>
							</PageToolbar>
							<InputBody>
								<InputFieldContainer>
									<InputRowWrapper display="flex" justifyContent="center">
										<FormControl>
											<Input
												name="variableName"
												type="text"
												placeholder="Manufacturer Name"
												value={this.state.manufacturer.get('variableName')}
												onChange={(e) => {
													this.onManufacturerChange(e);
												}}
												minWidth="300px"
											/>
											<InputLabel>
												Manufacturer Name
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Button
												backgroundColor="#5cc150"
												marginleft="20px"
												onClick={(e) => {
													this.props
														.createVariable(this.state.manufacturer)
														.then((status) => {
															if (status === 200) {
																successMessage('created manufacturer');
															}
														});
												}}
											>
												Add
											</Button>
										</FormControl>
									</InputRowWrapper>
								</InputFieldContainer>
							</InputBody>
						</PageBlock>
						<PageBlock style={{ display: 'block' }} id="customer">
							<PageToolbar justifyContent="center">
								<ToolbarLeftItems>
									<LeftItemH1>Add Category</LeftItemH1>
								</ToolbarLeftItems>
							</PageToolbar>
							<InputBody>
								<InputFieldContainer>
									<InputRowWrapper display="flex" justifyContent="center">
										<FormControl>
											<Input
												name="variableName"
												type="textArea"
												placeholder="Category Name"
												value={this.state.category.get('variableName')}
												onChange={(e) => {
													this.onCategoryChange(e);
												}}
												minWidth="300px"
											/>{' '}
											<InputLabel>
												Categorey Name
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Button
												backgroundColor="#5cc150"
												marginleft="20px"
												onClick={(e) => {
													this.props.createVariable(this.state.category).then((status) => {
														if (status === 200) {
															successMessage('created categorey');
														}
													});
												}}
											>
												Add
											</Button>
										</FormControl>
									</InputRowWrapper>
								</InputFieldContainer>
							</InputBody>
						</PageBlock>
						<PageBlock style={{ display: 'block' }} id="customer">
							<PageToolbar justifyContent="center">
								<ToolbarLeftItems>
									<LeftItemH1>Add Unit Of Measurement</LeftItemH1>
								</ToolbarLeftItems>
							</PageToolbar>
							<InputBody>
								<InputFieldContainer>
									<InputRowWrapper display="flex" justifyContent="center">
										<FormControl>
											<Input
												name="variableName"
												type="textArea"
												placeholder="Unit Name"
												value={this.state.unit.get('variableName')}
												onChange={(e) => {
													this.onUnitChange(e);
												}}
												minWidth="300px"
											/>{' '}
											<InputLabel>
												Unit Name
												<Required>*</Required>
											</InputLabel>
										</FormControl>
										<FormControl>
											<Button
												backgroundColor="#5cc150"
												marginleft="20px"
												onClick={(e) => {
													this.props.createVariable(this.state.unit).then((status) => {
														if (status === 200) {
															successMessage('created Unit');
														}
													});
												}}
											>
												Add
											</Button>
										</FormControl>
									</InputRowWrapper>
								</InputFieldContainer>
							</InputBody>
						</PageBlock>
					</PageBody>
				</PageWrapper>
			</Container>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	types: state.types,
	variables: state.variables
});

export default connect(mapStateToProps, {
	clearErrors,
	getVariables,
	getVariable,
	updateVariable,
	createVariable
})(CreateMachine);

const Button = styled.button.attrs((props) => ({
	marginleft: props.marginleft,
	backgroundColor: props.backgroundColor
}))`
	height: 40px;
	margin-left:${(props) => props.marginleft};
	background-color:${(props) => props.backgroundColor};
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #151617;
	padding: 10px;
`;

const InputFieldContainer = styled.div`
	display: flex;
	display: -ms-flexbox;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
`;
const LeftItemH1 = styled.h1`
	font-size: 16px;
	text-transform: uppercase;
	font-weight: bold;
	padding-right: 20px;
	display: flex;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
`;
const InputRowWrapper = styled.div.attrs((props) => ({
	flexBasis: props.flexBasis || '100%',
	display: props.display,
	justifyContent: props.justifyContent
}))`
flex-basis: ${(props) => props.flexBasis};
display: ${(props) => props.display};
justify-content: ${(props) => props.justifyContent};
`;

const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7'
}))`
align-items: ${(props) => props.alignItem};
	max-height: 4000px;
	animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	-webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	border-top:  ${(props) => props.borderTop};
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	padding-bottom: 20px !important;
`;
const Required = styled.span`
	display: inline-block;
	padding: 0 !important;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	white-space: nowrap;
	color: #3b3b3b;
	user-select: none;
	pointer-events: none;
`;
const InputColumnWrapper = styled.div`
	flex-basis: calc(100% / 3 - 12px) !important;
	width: 30%;
	@media (max-width: 991px) {
		flex-basis: 100% !important;
		justify-content: space-between;
		display: flex;
		flex-flow: wrap;
	}
`;

const FormControl = styled.div`
	padding-bottom: 20px;
	min-height: 60px;
	position: relative;
	display: flex;
	align-items: start;
	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
}
`;
const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

const SelectWrapper = styled.div`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: 100px;
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;
const Input = styled.input.attrs((props) => ({
	minWidth: props.minWidth || '100px',
	minHeight: props.minHeight || '40px'
}))`
    min-width:${(props) => props.minWidth};
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	flex: 1;
	min-height: ${(props) => props.minHeight};
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
	@media (max-width: 991px) {
		min-width:35%
	}
`;
const InputLabel = styled.label`
	font-size: 13px;
	line-height: 13px;
	color: #3b3b3b;
	background: transparent;
	position: absolute;
	top: -6px;
	left: 7px;
	padding: 0 3px;
	background-color: #fff;
	white-space: nowrap;
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	&:before {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;

const PageBlock = styled.div`
	display: block;
	background: #fff;
	width: 100%;
	float: left;
	border-radius: 6px;
	margin-bottom: 20px;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	align-items: center;
`;

const PageToolbar = styled.div.attrs((props) => ({
	justifyContent: props.justifyContent || 'space-between'
}))`
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: ${(props) => props.justifyContent};
	width: 100%;
	padding: 16px 20px;
`;
const CheckBoxWapper = styled.div`
	float: left;
	width: 16px;
`;
const CheckBoxTable = styled.table`
	width: 35% !important;
	table-layout: auto !important;
	border-collapse: inherit !important;
	border-spacing: 0;
`;

const TBody = styled.tbody``;
const TR = styled.tr``;
const TD = styled.td`
	width: 100% !important;
	height: 16px;
	line-height: 1px;
	position: relative;
	font-weight: normal;
	overflow: hidden;
	cursor: pointer;
	vertical-align: top;
	// &:before {
	// 	border-width: 1px;
	// 	border-style: solid;
	// 	border-radius: 4px;
	// 	border-color: #b9bdce;
	// 	content: '';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	-webkit-transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
	// &:after {
	// 	content: '\e81a';
	// 	line-height: 18px;
	// 	font-style: normal;
	// 	color: transparent;
	// 	font-family: 'icons_2019';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
`;
const CheckBoxInput = styled.input`
	width: 16px;
	height: 16px;
	padding: 0;
	-webkit-appearance: button;
	cursor: pointer;
	font-size: 100%;
	outline: none;
	vertical-align: baseline;
	line-height: normal;
	color: -internal-light-dark-color(buttontext, rgb(170, 170, 170));
	background-color: -internal-light-dark-color(rgb(239, 239, 239), rgb(74, 74, 74));
	border-width: 2px;
	border-style: outset;
	border-color: -internal-light-dark-color(rgb(118, 118, 118), rgb(195, 195, 195));
	border-image: initial;
	user-select: none;
	white-space: pre;
	align-items: flex-start;
	text-align: center;
`;

const CheckBoxLabel = styled.label`
	position: static;
	padding: 0 0 0 10px;
	pointer-events: all !important;
	cursor: pointer;
	top: -6px;
	left: 7px;
	background-color: #fff;
	white-space: nowrap;
	font-size: 13px;
	line-height: 13px;
	color: #3b3b3b;
	background: transparent;
	z-index: 20;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
`;
const SaveButtonContaier = styled.div`
	position: fixed;
	bottom: 50px;
	right: 50px;
	bottom: 37px;
	right: 37px;
	z-index: 300;
`;
const SaveButton = styled.button`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	background-color: #05cbbf;
	border: 0;
	color: #fff;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.15s ease-in-out;
	outline: none;
`;
const Container = styled.div`
	padding: 0;
	width: 100%;
	min-width: 860px;
	border-radius: 6px;
	margin-top: 65px;
	min-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	background-color: #e3e4e8;
	@media (max-width: 1200px) {
		flex-direction: column !important;
		padding: 20px 20px 0 20px !important;
	}
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;
const PageWrapper = styled.div`
	 flex: 1;
    overflow: hidde
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	@media (min-width: 1201px) {
		margin: 20px 20px 0 20px;
		width: 75%;

	}
`;

const PageBody = styled.div`
	margin: 0 auto !important;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;
// styling Toast container
const StyledContainer = styled(ToastContainer).attrs(
	{
		// custom props
	}
)`
	.Toastify__toast-container {}
	.Toastify__toast {}
	.Toastify__toast--error {
		margin: 0 0 6px;
		padding: 10px 15px;
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px;
		background-repeat: no-repeat;
		background-color: #fd4a4a;
	}
	.Toastify__toast--success {
		margin: 0 0 6px;
		padding: 16px 42px 16px 55px;
		-moz-border-radius: 6px;
		-webkit-border-radius: 6px;
		border-radius: 6px;
		background-repeat: no-repeat;
		background-color: rgb(7, 188, 12);
	}
	.Toastify__toast-body {
		white-space: pre-line;
	}
	.Toastify__progress-bar {}
  `;
