import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { createVariable } from '../../redux/actions/variables';
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
	ModalCloseButton
} from '../../styles/main/Modal';

class GlobalVariableModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			typeVariable: new Map([ [ 'typeName', '' ], [ 'variableName', '' ], [ 'values', new Map([]) ] ])
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.typeName !== prevState.typeVariable.get('typeName')) {
			const typeVariable = cloneDeep(prevState.typeVariable);
			typeVariable.set('typeName', nextProps.typeName);
			typeVariable.set('variableName', "");
			return {
				...prevState,
				typeVariable: typeVariable
			};
		}
		return prevState;
	}

	onChange(e) {
		const typeVariable = cloneDeep(this.state.typeVariable);
		typeVariable.set('variableName', e.target.value);
		this.setState({ typeVariable: typeVariable });
	}

	onClose() {
		this.props.onClose();
	}

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				contentLabel="create Type"
				onRequestClose={this.onClose}
				className="boxed-view__box"
				style={ModalCustomStyles}
				ariaHideApp={false}
				overlayClassName="boxed-view boxed-view--modal"
			>
				<ModalHeader>
					<ModalTitle>Add {this.props.typeName}</ModalTitle>
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
									{this.props.typeName}
									<Required>*</Required>
								</InputLabel>
							</FormControl>
						</InputRowWrapper>
					</InputFieldContainer>
				</ModalBody>
				<ModalFooter>
					<ModalSubmitButton
						onClick={(e) => {
							this.props.createVariable(this.state.typeVariable).then((status) => {
								if (status === 200) {
									this.onClose();
									console.log('Created');
								}
							});
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
	createVariable
})(GlobalVariableModal);
