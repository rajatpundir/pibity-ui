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
import CheckIcon from '@material-ui/icons/Check';
import SelectorganizationModal from '../../../main/Modal/SelectorganizationModal';
import {
	Container,
	PageWrapper,
	PageBody,
	SaveButtonContaier,
	SaveButton,
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
	FormControl
} from '../../../../styles/inventory/Style';

const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%'
};

class CreditNote extends React.Component {
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
						[ 'account', '' ],
						[ 'status', '' ],
						[ 'duedate', '' ],
						[ 'date', '' ],
						[ 'total', '' ],
						[ 'dueAmount', '' ]
					])
				]
			])
		};
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.Customer) {
			const variable = nextProps.variables.CreditNote.filter(
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
									<LeftItemH1>Credit Note</LeftItemH1>
								</ToolbarItems>
							</PageToolbar>
							<InputBody overflow="visible">
								<InputFieldContainer>
									<InputColumnWrapper flexBasis={style.flexBasis} width={style.width}>
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
												name="status"
												type="text"
												value={this.state.variable.get('values').get('status')}
												disabled
											/>
											<InputLabel>Status</InputLabel>
										</FormControl>
									</InputColumnWrapper>
									<InputColumnWrapper flexBasis={style.flexBasis} width={style.width}>
										<FormControl>
											<Input
												name="date"
												type="Date"
												value={this.state.variable.get('values').get('duedate')}
												disabled
											/>
											<InputLabel> Date</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="duedate"
												type="Date"
												value={this.state.variable.get('values').get('duedate')}
												disabled
											/>
											<InputLabel>Due Date</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="total"
												type="decimal"
												value={this.state.variable.get('values').get('total')}
												diabled
											/>
											<InputLabel>Total Amount</InputLabel>
										</FormControl>
										<FormControl>
											<Input
												name="dueAmount"
												type="decimal"
												value={this.state.variable.get('values').get('dueAmount')}
												diabled
											/>
											<InputLabel>Due Amount</InputLabel>
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
})(CreditNote);
