import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { createVariable, updateVariable, objToMapRec, queryData } from '../../../../redux/actions/variables';
import { customErrorMessage, successMessage } from '../../../main/Notification';
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
} from '../../../../styles/main/Modal';

class ProductStoreModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			prevProptypeVariable: {},
			prevtypeVariable: new Map(),
			typeVariable: new Map([
				[ 'typeName', 'ProductStore' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'status', '' ],
						[ 'location', '' ],
						[ 'product', '' ],
						[ 'onHand', '' ],
						[ 'onOrder', 0 ],
						[ 'available', '' ],
						[ 'allocated', 0 ]
					])
				]
			])
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.variableName !== '' && nextProps.variables.ProductStore) {
			const variable = nextProps.variables.ProductStore.filter(
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
		const values = typeVariable.get('values');
		values.set(e.target.name, e.target.value);
		if (e.target.name === 'onHand') {
			values.set('available', e.target.value);
		}
		typeVariable.set('values', values);
		this.setState({ typeVariable: typeVariable });
	}

	onClose() {
		const prevProptypeVariable = {};
		const prevtypeVariable = new Map();
		const typeVariable = new Map([
			[ 'typeName', 'ProductStore' ],
			[ 'variableName', '' ],
			[
				'values',
				new Map([
					[ 'status', '' ],
					[ 'location', '' ],
					[ 'product', '' ],
					[ 'onHand', '' ],
					[ 'onOrder', 0 ],
					[ 'available', '' ],
					[ 'allocated', 0 ]
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
				contentLabel="create ProductStore"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Product Store</ModalTitle>
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
								<SelectWrapper minWidth="200px">
									<Select
										value={{
											value: this.state.typeVariable.get('values').get('product'),
											label: this.state.typeVariable.get('values').get('product')
										}}
										onChange={(option) => {
											this.onChange({
												target: { name: 'product', value: option.value }
											});
										}}
										options={
											this.props.variables.Product !== undefined ? (
												this.props.variables.Product.map((variable) => {
													return {
														value: variable.variableName,
														label: variable.values.general.values.productName
													};
												})
											) : (
												[]
											)
										}
									/>
								</SelectWrapper>
								<InputLabel>
									Product <Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper minWidth="200px">
									<Select
										value={{
											value: this.state.typeVariable.get('values').get('location'),
											label: this.state.typeVariable.get('values').get('location')
										}}
										onChange={(option) => {
											this.onChange({
												target: { name: 'location', value: option.value }
											});
										}}
										options={
											this.props.variables.Location !== undefined ? (
												this.props.variables.Location.map((variable) => {
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
									Location <Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="onHand"
									type="Number"
									placeholder=""
									value={this.state.typeVariable.get('values').get('onHand')}
									onChange={(e) => {
										this.onChange(e);
									}}
									minWidth="300px"
								/>{' '}
								<InputLabel>onHand</InputLabel>
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
							} else {
								const values = {
									product: this.state.typeVariable.get('values').get('product'),
									location: this.state.typeVariable.get('values').get('location')
								};
								this.props.queryData('ProductStore', 1, 0, values).then((response) => {
									if (response.status === 200) {
										if (response.data.length === 0) {
											this.props.createVariable(this.state.typeVariable).then((response) => {
												if (response.status === 200) {
													this.onClose(e);
													successMessage(`Produuct Store Added Succesfully`);
												}
											});
										} else {
											customErrorMessage(`Produuct Store Already Exists `);
										}
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
	updateVariable,
	queryData
})(ProductStoreModal);
