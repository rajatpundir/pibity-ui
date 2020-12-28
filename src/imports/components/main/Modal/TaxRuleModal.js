import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { createVariable, updateVariable, objToMapRec } from '../../../redux/actions/variables';
import { successMessage, customErrorMessage } from '../../main/Notification';

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
	CheckBoxInput,
	CheckBoxLabel,
	CheckBoxContainer,
	ModalCloseButton
} from '../../../styles/main/Modal';

class TaxRuleModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			prevProptypeVariable: {},
			prevtypeVariable: new Map(),
			typeVariable: new Map([
				[ 'typeName', 'TaxRule' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'status', '' ],
						[ 'taxPercentage', '' ],
						[ 'isTaxForSale', false ],
						[ 'isTaxForPurchase', false ],
						[ 'taxType', '' ]
					])
				]
			])
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.variableName !== '' && nextProps.variables.TaxRule) {
			const variable = nextProps.variables.TaxRule.filter(
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
			[ 'typeName', 'TaxRule' ],
			[ 'variableName', '' ],
			[
				'values',
				new Map([
					[ 'status', '' ],
					[ 'taxPercentage', '' ],
					[ 'isTaxForSale', false ],
					[ 'isTaxForPurchase', false ],
					[ 'taxType', '' ]
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
		console.log(this.props);
		return (
			<Modal
				isOpen={this.props.isOpen}
				contentLabel="create TaxRule"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Tax Rule</ModalTitle>
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
									name="taxPercentage"
									type="Number"
									placeholder=""
									value={this.state.typeVariable.get('values').get('taxPercentage')}
									onChange={(e) => {
										this.onChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>
									Tax Percentage
									<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper minWidth="200px">
									<Select
										value={{
											value: this.state.typeVariable.get('values').get('taxType'),
											label: this.state.typeVariable.get('values').get('taxType')
										}}
										onChange={(option) => {
											this.onChange({
												target: { name: 'taxType', value: option.value }
											});
										}}
										options={
											this.props.variables.TaxRuleType !== undefined ? (
												this.props.variables.TaxRuleType.map((variable) => {
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
									Inclusive/Exclusive
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
							<FormControl>
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.typeVariable.get('values').get('isTaxForSale')}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'isTaxForSale',
													value: !this.state.typeVariable.get('values').get('isTaxForSale')
												}
											});
										}}
									/>
									<CheckBoxLabel>is TaxForSale</CheckBoxLabel>
								</CheckBoxContainer>
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.typeVariable.get('values').get('isTaxForPurchase')}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'isTaxForPurchase',
													value: !this.state.typeVariable
														.get('values')
														.get('isTaxForPurchase')
												}
											});
										}}
									/>
									<CheckBoxLabel>is TaxForPurchase</CheckBoxLabel>
								</CheckBoxContainer>
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
											successMessage(`Tax Rule Updated Succesfully`);
										}
									});
							} else {
								this.props.createVariable(this.state.typeVariable).then((response) => {
									if (response.status === 200) {
										this.onClose(e);
										successMessage(`Tax Rule Added Succesfully`);
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
})(TaxRuleModal);
