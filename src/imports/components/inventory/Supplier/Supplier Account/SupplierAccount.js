import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import TablePagination from '@material-ui/core/TablePagination';
// import TablePaginationActions from '../../../main/TablePagination';
import { getVariables } from '../../../../redux/actions/variables';
import {
	BodyTable,
	HeaderBody,
	HeaderBodyContainer,
	InputBody,
	PageBlock,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	TableBody,
	TableFieldContainer,
	TableHeaders,
	TableRow,
	TableData,
    TableHeaderInner,
    InputFieldContainer,
	InputColumnWrapper,
	LeftItemH1,
	PageToolbar,
    ToolbarItems,
    StatusSpan,
	StatusBackgroundColor
} from '../../../../styles/inventory/Style';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../styles/main/Dashboard';
// import { TablePaginationStyle } from '../../../../styles/main/TablePagination';

class SupplierAccount extends React.Component {
	constructor(props) {
		super();
		this.state = {
			transactions: [],
			paidInvoice: false,
			expandedRows: [],
			isOpen: false,
			page: 0,
			rowsPerPage: 5,
			account: {}
		};
		this.onChange = this.onChange.bind(this);
		this.renderTransactionRecords = this.renderTransactionRecords.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('Account');
		this.props.getVariables('AccountTransaction');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.variables.Account && nextProps.variables.AccountTransaction) {
			const account = nextProps.variables.Account.filter(
				(account) => account.variableName === nextProps.supplierAccount
			)[0];
			const transactions = nextProps.variables.AccountTransaction.filter(
				(transaction) => transaction.values.account === nextProps.supplierAccount
			);
			return {
				...prevState,
				account: account,
				transactions: transactions
			};
		}
		return {
			...prevState
		};
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ page: 0, rowsPerPage: parseInt(event.target.value) });
	};

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
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
						<TableHeaderInner>{transaction.values.voucherType}</TableHeaderInner>
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
		// const { rowsPerPage, page } = this.state;
		return (
			<PageBlock>
				<PageToolbar>
					<ToolbarItems>
                    <StatusSpan
								backgroundColor={
									this.props.supplierAccoutnDetail.values.status === 'Active' ? (
										StatusBackgroundColor.active
									) : (
										StatusBackgroundColor.depricated
									)
								}
							>
								{this.props.supplierAccoutnDetail.values.status }
							</StatusSpan>
						<LeftItemH1>Account Details</LeftItemH1>
					</ToolbarItems>


				</PageToolbar>
				<InputBody borderTop="0" overflow="visible" padding="20px">
					<InputFieldContainer>
						<InputColumnWrapper flexBasis= 'calc(100% / 2 - 12px) !important' width="50%">
							<Card>
								<CardSpan color="#707887" marginBottom="4px" fontSize="12px" lineHeight="16px">
									Account Name
								</CardSpan>
								<CardSpan fontWeight="bold">{this.props.supplierAccoutnDetail.values.name}</CardSpan>
							</Card>
							<Card>
								<CardSpan color="#707887" marginBottom="4px" fontSize="12px" lineHeight="16px">
									Code
								</CardSpan>
								<CardSpan fontWeight="bold">{this.props.supplierAccoutnDetail.values.code}</CardSpan>
							</Card>
						</InputColumnWrapper>
						<InputColumnWrapper flexBasis= 'calc(100% / 2 - 12px) !important' width="50%">
							<Card>
								<CardSpan color="#707887" marginBottom="4px" fontSize="12px" lineHeight="16px">
									Category
								</CardSpan>
								<CardSpan fontWeight="bold">
									{this.props.supplierAccoutnDetail.values.accountCategory}
								</CardSpan>
							</Card>
							<Card>
								<CardSpan color="#707887" marginBottom="4px" fontSize="12px" lineHeight="16px">
									Type
								</CardSpan>
								<CardSpan fontWeight="bold">
									{this.props.supplierAccoutnDetail.values.accountType}
								</CardSpan>
							</Card>
						</InputColumnWrapper>
					</InputFieldContainer>
				</InputBody>
				<InputBody overflow="visible">
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
														<SelectSpan>Voucher Type</SelectSpan>
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
					{/* <TablePagination
						component="div"
						style={TablePaginationStyle}
						rowsPerPageOptions={[ 5, 10, 20 ]}
						colSpan={3}
						count={this.state.transactions.length}
						rowsPerPage={rowsPerPage}
						page={page}
						SelectProps={{
							native: true
						}}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
					/> */}
				</InputBody>
			</PageBlock>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	types: state.types,
	variables: state.variables
});

export default connect(mapStateToProps, {
	getVariables
})(SupplierAccount);

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
