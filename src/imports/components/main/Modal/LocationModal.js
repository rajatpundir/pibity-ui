import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { createVariable, updateVariable, objToMapRec } from '../../../redux/actions/variables';
import { successMessage } from '../../main/Notification';
import {
	InputRowWrapper,
	InputFieldContainer,
	InputLabel,
	Input,
	Required,
	FormControl,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalHeaderCloseButton,
	ModalTitle,
	ModalCustomStyles,
	ModalSubmitButton,
	SelectWrapper,
	ModalCloseButton
} from '../../../styles/main/Modal';

class LocationModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			prevProptypeVariable: {},
			prevtypeVariable: new Map(),
			typeVariable: new Map([
				[ 'typeName', 'Location' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'status', '' ],
						[
							'address',
							new Map([
								[ 'variableName', '' ],
								[
									'values',
									new Map([
										[ 'line1', '' ],
										[ 'line2', '' ],
										[ 'city', '' ],
										[ 'state', '' ],
										[ 'postCode', '' ],
										[ 'country', '' ]
									])
								]
							])
						]
					])
				]
			])
		};
		this.onChange = this.onChange.bind(this);
		this.onAddressChange = this.onAddressChange.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.variableName !== '' && nextProps.variables.Location) {
			const variable = nextProps.variables.Location.filter(
				(variable) => variable.variableName === nextProps.variableName
			)[0];
			if (variable && prevState.prevProptypeVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(variable);
				return {
					...prevState,
					typeVariable: variableMap,
					prevProptypeVariable: variable,
					prevtypeVariable: prevVariableMap
				};
			}
		}
		return prevState;
	}

	onAddressChange(e) {
		const typeVariable = cloneDeep(this.state.typeVariable);
		const values = typeVariable.get('values');
		const address = values.get('address');
		const addressValues = address.get('values');
		addressValues.set(e.target.name, e.target.value);
		address.set('values', addressValues);
		values.set('address', address);
		typeVariable.set('values', values);
		this.setState({ typeVariable: typeVariable });
	}

	onChange(e) {
		const typeVariable = cloneDeep(this.state.typeVariable);
		if (e.target.name === 'variableName') {
			typeVariable.set('variableName', e.target.value);
		} else {
			const values = typeVariable.get('values');
			values.set(e.target.name, e.target.value);
			typeVariable.set('values', values);
		}
		this.setState({ typeVariable: typeVariable });
	}

	onClose() {
		const prevProptypeVariable = {};
		const prevtypeVariable = new Map();
		const typeVariable = new Map([
			[ 'typeName', 'Location' ],
			[ 'variableName', '' ],
			[
				'values',
				new Map([
					[ 'status', '' ],
					[
						'address',
						new Map([
							[ 'variableName', '' ],
							[
								'values',
								new Map([
									[ 'line1', '' ],
									[ 'line2', '' ],
									[ 'city', '' ],
									[ 'state', '' ],
									[ 'postCode', '' ],
									[ 'country', '' ]
								])
							]
						])
					]
				])
			]
		]);
		this.setState({
			typeVariable: typeVariable,
			prevProptypeVariable: prevProptypeVariable,
			prevtypeVariable: prevtypeVariable
		});
		this.props.onClose();
	}

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				contentLabel="create Location"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Location</ModalTitle>
					<ModalHeaderCloseButton
						onClick={(e) => {
							this.onClose(e);
						}}
					>
						<span>X</span>
					</ModalHeaderCloseButton>
				</ModalHeader>{' '}
				<ModalBody>
					<InputFieldContainer>
						<InputRowWrapper display="flex" justifyContent="center">
							<FormControl>
								<Input
									name="variableName"
									type="text"
									placeholder=""
									value={this.state.typeVariable.get('variableName')}
									onChange={(e) => {
										this.onChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>
									Name
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="line1"
									type="Text"
									placeholder=""
									value={this.state.typeVariable
										.get('values')
										.get('address')
										.get('values')
										.get('line1')}
									onChange={(e) => {
										this.onAddressChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>
									Line 1
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="line2"
									type="Text"
									placeholder=""
									value={this.state.typeVariable
										.get('values')
										.get('address')
										.get('values')
										.get('line2')}
									onChange={(e) => {
										this.onAddressChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>Line 2</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="city"
									type="Text"
									placeholder=""
									value={this.state.typeVariable
										.get('values')
										.get('address')
										.get('values')
										.get('city')}
									onChange={(e) => {
										this.onAddressChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>City</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="postCode"
									type="Text"
									placeholder=""
									value={this.state.typeVariable
										.get('values')
										.get('address')
										.get('values')
										.get('postCode')}
									onChange={(e) => {
										this.onAddressChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>
									PostCode <Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="state"
									type="Text"
									placeholder=""
									value={this.state.typeVariable
										.get('values')
										.get('address')
										.get('values')
										.get('state')}
									onChange={(e) => {
										this.onAddressChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>
									State <Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper minWidth="200px">
									<Select
										value={{
											value: this.state.typeVariable
												.get('values')
												.get('address')
												.get('values')
												.get('country'),
											label: this.state.typeVariable
												.get('values')
												.get('address')
												.get('values')
												.get('country')
										}}
										onChange={(option) => {
											this.onAddressChange({
												target: { name: 'country', value: option.value }
											});
										}}
										options={
											this.props.variables.Country !== undefined ? (
												this.props.variables.Country.map((variable) => {
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
									Country
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper minWidth="200px">
									<Select
										value={{
											value: this.state.typeVariable.get('values').get('status'),
											label: this.state.typeVariable.get('values').get('status')
										}}
										onChange={(option) => {
											this.onChange({
												target: { name: 'status', value: option.value }
											});
										}}
										options={
											this.props.variables.Status !== undefined ? (
												this.props.variables.Status.map((variable) => {
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
									Status
									<Required>*</Required>
								</InputLabel>
							</FormControl>
						</InputRowWrapper>
					</InputFieldContainer>
				</ModalBody>
				<ModalFooter>
					<ModalSubmitButton
						onClick={(e) => {
							if (this.props.variableName !== '') {
								this.props
									.updateVariable(this.state.prevtypeVariable, this.state.typeVariable)
									.then((status) => {
										if (status === 200) {
											this.onClose(e);
											successMessage(`Location Updated Succesfully`);
										}
									});
							} else {
								this.props.createVariable(this.state.typeVariable).then((response) => {
									if (response.status === 200) {
										this.onClose(e);
										successMessage(`Location Added Succesfully`);
									}
								});
							}
						}}
					>
						Save
					</ModalSubmitButton>
					<ModalCloseButton
						onClick={(e) => {
							this.onClose(e);
						}}
					>
						Cancel
					</ModalCloseButton>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, {
	createVariable,
	updateVariable
})(LocationModal);
