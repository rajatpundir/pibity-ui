import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { cloneDeep } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { customErrorMessage, successMessage, CustomNotification } from '../../../main/Notification';
import { clearErrors } from '../../../../redux/actions/errors';
import {
	createVariable,
	getVariable,
	updateVariable,
	objToMapRec,
	getVariables
} from '../../../../redux/actions/variables';
import SelectorganizationModal from '../../../main/Modal/SelectorganizationModal';
import {
	Container,
	PageWrapper,
	PageBody,
	InputColumnWrapper,
	InputFieldContainer,
	Input,
	Required,
	InputBody,
	InputLabel,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	SelectWrapper,
	ToolbarItems,
	Custombutton,
	FormControl
} from '../../../../styles/inventory/Style';

const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%'
};

class DebitNote extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'DebitNote' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'supplier', '' ],
						[ 'purchaseOrder', '' ],
						[ 'creditNote', '' ],
						[ 'account', '' ],
						[ 'paidAmount', '' ],
						[ 'date', '' ]
					])
				]
			])
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.Customer) {
			const variable = nextProps.variables.DebitNote.filter(
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

	getData() {
		this.props.clearErrors();
		this.props.getVariables('CreditNote');
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			if (this.props.match.params.variableName) {
				const variable = decodeURIComponent(this.props.match.params.variableName);
				this.props.getVariable(this.state.variable.get('typeName'), variable);
			}
			this.getData();
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		if (this.props.match.params.variableName) {
			const variable = decodeURIComponent(this.props.match.params.variableName);
			this.props.getVariable(this.state.variable.get('typeName'), variable);
		}
		this.getData();
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set(e.target.name.e.target.value);
		if (e.target.name === 'creditNote') {
			values.set('purchaseOrder', e.target.data.purchaseorder);
			values.set('supplier', e.target.data.supplier);
			values.set('account', e.target.data.account);
			values.set('paidAmount', e.target.data.dueAmount);
		}
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	render() {
		return (
			<Container mediaPadding="20px 20px 0 20px">
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<CustomNotification limit={2} />
				<PageWrapper>
					<PageBody>
						<PageBlock paddingBottom="0">
							<PageToolbar>
								<ToolbarItems>
									<LeftItemH1>New Debit Note</LeftItemH1>
								</ToolbarItems>
								<ToolbarItems>
									{this.props.match.params.variableName ? (
										undefined
									) : (
										<Custombutton
											height="30px"
											onClick={(e) => {
												this.props.createVariable(this.state.variable).then((response) => {
													if (response.status === 200) {
														successMessage('Debit Note Created');
													}
												});
											}}
										>
											Create
										</Custombutton>
									)}
								</ToolbarItems>
							</PageToolbar>
							<InputBody overflow="visible">
								<InputFieldContainer>
									<InputColumnWrapper flexBasis={style.flexBasis} width={style.width}>
										<FormControl>
											<SelectWrapper>
												<Select
													value={{
														value: this.state.variable.get('values').get('creditNote'),
														label: this.state.variable.get('values').get('creditNote')
													}}
													onChange={(option) => {
														this.onChange({
															target: {
																name: 'creditNote',
																value: option.value,
																data: option.data
															}
														});
													}}
													options={
														this.props.variables.CreditNote !== undefined ? (
															this.props.variables.CreditNote.map((variable) => {
																return {
																	value: variable.variableName,
																	label: variable.variableName,
																	data: variable.values
																};
															})
														) : (
															[]
														)
													}
												/>
											</SelectWrapper>
											<InputLabel>
												Credit Note
												<Required>*</Required>
											</InputLabel>
										</FormControl>

										<FormControl>
											<Input
												name="purchaseOrder"
												type="text"
												value={this.state.variable.get('values').get('purchaseOrder')}
												disabled
											/>
											<InputLabel>Purchase Order</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="supplier"
												type="text"
												value={this.state.variable.get('values').get('supplier')}
												disabled
											/>
											<InputLabel>Supplier</InputLabel>
										</FormControl>
									</InputColumnWrapper>

									<InputColumnWrapper flexBasis={style.flexBasis} width={style.width}>
										<FormControl>
											<Input
												name="account"
												type="text"
												value={this.state.variable.get('values').get('account')}
												disabled
											/>
											<InputLabel>Account</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="date"
												type="Date"
												value={this.state.variable.get('values').get('date')}
												disabled
											/>
											<InputLabel> Date</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="paidAmount"
												type="decimal"
												value={this.state.variable.get('values').get('paidAmount')}
												onChange={(e) => this.onChange(e)}
											/>
											<InputLabel>Amount Paid</InputLabel>
										</FormControl>
									</InputColumnWrapper>
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
	variables: state.variables,
	auth: state.auth
});

export default connect(mapStateToProps, {
	clearErrors,
	createVariable,
	getVariable,
	updateVariable,
	getVariables
})(DebitNote);
