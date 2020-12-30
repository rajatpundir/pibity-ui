import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { CustomNotification } from '../../../main/Notification';
import { clearErrors } from '../../../../redux/actions/errors';
import {
	createVariable,
	getVariable,
	updateVariable,
	objToMapRec,
	getVariables
} from '../../../../redux/actions/variables';
import SelectorganizationModal from '../../../main/Modal/SelectorganizationModal';
// import TablePagination from '@material-ui/core/TablePagination';
// import TablePaginationActions from '../../../main/TablePagination';
// import { TablePaginationStyle } from '../../../../styles/main/TablePagination';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../styles/main/Dashboard';
import {
	Container,
	PageWrapper,
	PageBody,
	InputColumnWrapper,
	InputFieldContainer,
	InputBody,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	ToolbarItems,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	HeaderBodyContainer,
	HeaderBody,
	BodyTable,
	TableBody,
	TableRow,
	TableData,
	TableHeaderInner,
	TableHeaders,
	TableFieldContainer
} from '../../../../styles/inventory/Style';
const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%'
};

class Account extends React.Component {
	constructor(props) {
		super();
		this.state = {
			page: 0,
			rowsPerPage: 5,
			isOpen: false,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'Account' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[ 'balance', '' ],
						[ 'openingBalance', '' ],
						[ 'code', '' ],
						[ 'description', '' ],
						[ 'accountCategory', '' ],
						[ 'status', '' ],
						[ 'name', '' ],
						[ 'accountType', '' ]
					])
				]
			]),
			transactions: []
		};
		this.onClose = this.onClose.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			nextProps.match.params.variableName &&
			nextProps.variables.Account &&
			nextProps.variables.AccountTransaction
		) {
			const variable = nextProps.variables.Account.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			const transactions = nextProps.variables.AccountTransaction.filter(
				(transaction) => transaction.values.account === nextProps.match.params.variableName
			);
			if (variable && prevState.prevPropVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const prevVariableMap = objToMapRec(prevState.prevPropVariable);
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable,
					prevVariable: prevVariableMap,
					transactions: transactions
				};
			}
		}
		return prevState;
	}

	getData() {
		this.props.clearErrors();
		this.props.getVariables('Account');
		this.props.getVariables('AccountTransaction');
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

	renderTransactionRecords() {
		const rows = [];
		this.state.transactions.forEach((transaction, index) => {
			const refAccount = this.props.variables.Account.filter(
				(account) => account.variableName === transaction.values.refAccount
			)[0];
			rows.push(
				<TableRow key={index}>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.date}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{refAccount.values.name}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							{transaction.values.voucherType === 'Purchase' ? (
								<Link
									style={{
										color: ' #05cbbf'
									}}
									to={'/purchase/' + transaction.values.orderId}
								>
									{transaction.values.orderId}
								</Link>
							) : transaction.values.voucherType === 'Sales' ? (
								<Link
									style={{
										color: ' #05cbbf'
									}}
									to={'/servicePurchase/' + transaction.values.orderId}
								>
									{transaction.values.orderId}
								</Link>
							) : (
								transaction.values.orderId
							)}
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.voucherType}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.paymentMode}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.paymentReferenceId}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.creditAmount}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.debitAmount}</TableHeaderInner>
					</TableData>
				</TableRow>
			);
		});
		return this.state.rowsPerPage > 0
			? rows.slice(
					this.state.page * this.state.rowsPerPage,
					this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
				)
			: rows;
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
									<LeftItemH1 style={{ fontSize: 'initial' }}>Account</LeftItemH1>
								</ToolbarItems>
							</PageToolbar>
							<InputBody overflow="visible">
								<InputFieldContainer>
									<InputColumnWrapper flexBasis="calc(100% / 2 - 12px) !important" width="50%">
										<Card>
											<CardSpan
												color="#707887"
												marginBottom="4px"
												fontSize="12px"
												lineHeight="16px"
											>
												Account Name
											</CardSpan>
											<CardSpan fontWeight="bold">
												{this.state.variable.get('values').get('name')}
											</CardSpan>
										</Card>
										<Card>
											<CardSpan
												color="#707887"
												marginBottom="4px"
												fontSize="12px"
												lineHeight="16px"
											>
												Code
											</CardSpan>
											<CardSpan fontWeight="bold">
												{this.state.variable.get('values').get('code')}
											</CardSpan>
										</Card>
										<Card>
											<CardSpan
												color="#707887"
												marginBottom="4px"
												fontSize="12px"
												lineHeight="16px"
											>
												Account Categories
											</CardSpan>
											<CardSpan fontWeight="bold">
												{this.state.variable.get('values').get('accountCategory')}
											</CardSpan>
										</Card>
										<Card>
											<CardSpan
												color="#707887"
												marginBottom="4px"
												fontSize="12px"
												lineHeight="16px"
											>
												Account Type
											</CardSpan>
											<CardSpan fontWeight="bold">
												{this.state.variable.get('values').get('accountType')}
											</CardSpan>
										</Card>
									</InputColumnWrapper>
									<InputColumnWrapper flexBasis="calc(100% / 2 - 12px) !important" width="50%">
										<Card>
											<CardSpan
												color="#707887"
												marginBottom="4px"
												fontSize="12px"
												lineHeight="16px"
											>
												Status
											</CardSpan>
											<CardSpan fontWeight="bold">
												{this.state.variable.get('values').get('status')}
											</CardSpan>
										</Card>
										<Card>
											<CardSpan
												color="#707887"
												marginBottom="4px"
												fontSize="12px"
												lineHeight="16px"
											>
												Description
											</CardSpan>
											<CardSpan fontWeight="bold">
												{this.state.variable.get('values').get('description')}
											</CardSpan>
										</Card>
										<Card>
											<CardSpan
												color="#707887"
												marginBottom="4px"
												fontSize="12px"
												lineHeight="16px"
											>
												Balance
											</CardSpan>
											<CardSpan fontWeight="bold">
												{this.state.variable.get('values').get('balance')}
											</CardSpan>
										</Card>
										<Card>
											<CardSpan
												color="#707887"
												marginBottom="4px"
												fontSize="12px"
												lineHeight="16px"
											>
												Opening Balance
											</CardSpan>
											<CardSpan fontWeight="bold">
												{this.state.variable.get('values').get('openingBalance')}{' '}
											</CardSpan>
										</Card>
									</InputColumnWrapper>
								</InputFieldContainer>
							</InputBody>
							<InputBody overflow="visible" padding="20px">
								<RoundedBlock overflow="visible">
									<TableFieldContainer overflow="visible">
										<HeaderBodyContainer>
											<HeaderBody>
												<BodyTable width="auto">
													<TableBody>
														<TableRow>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Date</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Reference Account</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Order Id</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Voucher Type</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Payment Mode</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Payment Mode Reference Id</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Credit</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Debit</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														</TableRow>
														{this.renderTransactionRecords()}
													</TableBody>
												</BodyTable>
												{this.state.transactions.length === 0 ? (
													<EmptyRowImageContainer>
														<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
														<EmptyRowTag>No Transactions </EmptyRowTag>
													</EmptyRowImageContainer>
												) : (
													undefined
												)}
											</HeaderBody>
										</HeaderBodyContainer>
									</TableFieldContainer>
								</RoundedBlock>
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
})(Account);

export const Card = styled.div.attrs((props) => ({
	background: props.background || '#f1f6fb',
	borderRadius: props.borderRadius || '6px',
	padding: props.padding || '10px 20px',
	margin: props.margin || '12px'
}))`
    background:${(props) => props.background};
    border-radius: ${(props) => props.borderRadius};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin} ;
    min-height:55px;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
`;

export const CardSpan = styled.span.attrs((props) => ({
	color: props.color || '#3e525d',
	fontSize: props.fontSize || '100%',
	fontWeight: props.fontWeight,
	lineHeight: props.lineHeight,
	marginBottom: props.marginBottom
}))`
    color:${(props) => props.color};
    margin-bottom: ${(props) => props.marginBottom};
    font-size: ${(props) => props.fontSize};
    line-height: ${(props) => props.lineHeight};
    font-weight:${(props) => props.fontWeight}; 
`;
