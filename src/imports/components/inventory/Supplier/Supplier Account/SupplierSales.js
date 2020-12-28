import React from 'react';
import { connect } from 'react-redux';
import SupplierSalesData from './SupplierSalesData';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../../main/TablePagination';
import { getVariables } from '../../../../redux/actions/variables';

import {
	BodyTable,
	HeaderBody,
	HeaderBodyContainer,
	InputBody,
	LeftItemH1,
	PageBarAlign,
	PageBlock,
	PageToolbar,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	SelectSpanInner,
	TableBody,
	TableFieldContainer,
	TableHeaders,
	TableRow,
	ToolbarItems,
	CheckBoxInput,
	CheckBoxLabel,
	CheckBoxContainer
} from '../../../../styles/inventory/Style';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../styles/main/Dashboard';
import { TablePaginationStyle } from '../../../../styles/main/TablePagination';

class SupplierSales extends React.Component {
	constructor(props) {
		super();
		this.state = {
			invoice: [],
			paidInvoice: false,
			expandedRows: [],
			isOpen: false,
			page: 0,
			rowsPerPage: 5,
			account: {}
		};
		this.onChange = this.onChange.bind(this);
		this.renderInvoice = this.renderInvoice.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('Account');
		this.props.getVariables('PurchaseInvoice');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.variables.Account && nextProps.variables.PurchaseInvoice) {
			const account = nextProps.variables.Account.filter(
				(account) => account.variableName === nextProps.supplierAccount
			)[0];
			const invoice = nextProps.variables.PurchaseInvoice.filter(
				(invoice) => invoice.values.supplier === nextProps.supplier
			);
			return {
				...prevState,
				account: account,
				invoice: invoice
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

	renderInvoice() {
		const rows = [];
		const invoice = this.props.variables.PurchaseInvoice.filter(
			(invoice) => invoice.values.supplier === this.props.supplier
		);
		const list = this.state.paidInvoice
			? invoice.filter((invoice) => invoice.values.paymenyStatus === 'Paid')
			: invoice;
		list.forEach((invoice) => {
			rows.push(<SupplierSalesData data={invoice} key={invoice.variableName} account={this.state.account} />);
		});
		return this.state.rowsPerPage > 0
			? rows.slice(
					this.state.page * this.state.rowsPerPage,
					this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
				)
			: rows;
	}

	render() {
		const { rowsPerPage, page } = this.state;
		return (
			<PageBlock>
				<PageToolbar borderBottom="1px solid #e0e1e7">
					<ToolbarItems>
						<LeftItemH1>Order Invoice</LeftItemH1>
					</ToolbarItems>
					<PageBarAlign padding="10px 20px" float="left">
						<CheckBoxContainer>
							<CheckBoxInput
								type="checkbox"
								checked={this.state.paidInvoice}
								tabindex="55"
								onChange={(option) => {
									this.onChange({
										target: {
											name: 'paidInvoice',
											value: !this.state.paidInvoice
										}
									});
								}}
							/>
							<CheckBoxLabel>Paid Invoice</CheckBoxLabel>
						</CheckBoxContainer>
					</PageBarAlign>
				</PageToolbar>
				<InputBody borderTop="0" overflow="visible">
					<RoundedBlock overflow="visible">
						<TableFieldContainer overflow="visible">
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable width="auto">
										<TableBody>
											<TableRow>
												<TableHeaders width="6%">
													<SelectIconContainer>
														<SelectSpan>
															<SelectSpanInner>
																<i className="large material-icons">create</i>
															</SelectSpanInner>
														</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Date</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Invoice Number</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Purchase Order</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Total</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan> Due Amount</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Payment Status</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Actions</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
											</TableRow>
											{this.renderInvoice()}
										</TableBody>
									</BodyTable>
									{this.state.invoice.length === 0 ? (
										<EmptyRowImageContainer>
											<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
											<EmptyRowTag>No Invoice</EmptyRowTag>
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
						count={this.state.invoice.length}
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
})(SupplierSales);
