import React from 'react';
import { connect } from 'react-redux';
import PurchaseInvoiceData from './PurchaseInvoiceData';
import { clearErrors } from '../../../../../redux/actions/errors';
import { getVariables } from '../../../../../redux/actions/variables';
import { CustomNotification } from '../../../../main/Notification';
import SelectorganizationModal from '../../../../main/Modal/SelectorganizationModal';
// import TablePagination from '@material-ui/core/TablePagination';
// import TablePaginationActions from '../../../main/TablePagination';
// import { TablePaginationStyle } from '../../../../styles/main/TablePagination';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../../styles/main/Dashboard';
import {
	Container,
	PageWrapper,
	PageBody,
	FontAwsomeIcon,
	PageToolbar,
	ToolbarItems,
	LeftItemH1,
	PageBarAlign,
	InputBody,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	HeaderBodyContainer,
	HeaderBody,
	BodyTable,
	TableBody,
	TableRow,
	TableHeaders,
	CheckBoxInput,
	CheckBoxLabel,
	CheckBoxContainer,
	TableFieldContainer,
	Custombutton
} from '../../../../../styles/inventory/Style';

class PurchaseInvoice extends React.Component {
	constructor(props) {
		super();
		this.state = {
			invoice: [],
			accounts: [],
			suppliers:[],
			expandedRows: [],
			paidInvoice: false,
			isOpen: false,
			isCreateAccountModalOpen: false,
			page: 0,
			rowsPerPage: 5
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onResetDefaults = this.onResetDefaults.bind(this);
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

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			this.props.clearErrors();
			this.props.getVariables('Supplier');
			this.props.getVariables('Account');
			this.props.getVariables('PurchaseInvoice');
			this.props.getVariables('AccountTransaction');
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		this.props.clearErrors();
		this.props.getVariables('Supplier');
		this.props.getVariables('Account');
		this.props.getVariables('PurchaseInvoice');
		this.props.getVariables('AccountTransaction');
	}

	onRefresh(e) {
		this.props.getVariables('PurchaseInvoice');
	}

	onResetDefaults() {
		this.setState({
			paidInvoice: false
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			suppliers:
				nextProps.variables !== undefined
					? nextProps.variables.Supplier !== undefined ? nextProps.variables.Supplier : []
					: [],
			accounts:
				nextProps.variables !== undefined
					? nextProps.variables.Account !== undefined ? nextProps.variables.Account : []
					: [],
			invoice:
				nextProps.variables !== undefined
					? nextProps.variables.PurchaseInvoice !== undefined ? nextProps.variables.PurchaseInvoice : []
					: []
		};
	}

	renderInvoice() {
		const rows = [];
		const list = this.state.paidInvoice
			? this.state.invoice.filter((invoice) => invoice.values.paymentStatus === 'Paid')
			: this.state.invoice;
		list.forEach((invoice) => {
			const supplier = this.state.suppliers.filter(
				(supplier) => supplier.variableName === invoice.values.supplier
			)[0];
			const account = this.state.accounts.filter(
				(account) => account.variableName === supplier.values.account
			)[0];
			rows.push(<PurchaseInvoiceData data={invoice} key={invoice.variableName} account={account} />);
		});
		return this.state.rowsPerPage > 0
			? rows.slice(
					this.state.page * this.state.rowsPerPage,
					this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
				)
			: rows;
		// return this.state.rowsPerPage > 0
		// 	? rows.slice(
		// 			this.state.page * this.state.rowsPerPage,
		// 			this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
		// 		)
		// 	: rows;
	}

	render() { 
		// const { rowsPerPage, page } = this.state;
		return (
			<Container mediaPadding="0" backgroundColor="white">
				<CustomNotification limit={3} />
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />

				<PageWrapper mediaMargin="0" mediaWidth="100%">
					<PageBody mediaWidth="100%">
						<PageToolbar borderBottom="1px solid #e0e1e7">
							<ToolbarItems>
								<LeftItemH1>Purchase Invoices</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="right">
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									color="#3b3b3b"
									backgroundColor="#F7FAFD"
									borderColor="#b9bdce"
									borderOnHover="#3b3b3b"
									backgroundOnHover="#F7FAFD"
									margin="0 5px"
									onClick={this.onClose}
								>
									<FontAwsomeIcon className="fa fa-refresh" />
									Refresh
								</Custombutton>
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									color="#3b3b3b"
									backgroundColor="#F7FAFD"
									borderColor="#b9bdce"
									borderOnHover="#3b3b3b"
									backgroundOnHover="#F7FAFD"
									margin="0 5px"
									onClick={this.onResetDefaults}
								>
									<FontAwsomeIcon className="fa fa-sliders" />
									Use Default
								</Custombutton>
							</PageBarAlign>
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
						<InputBody borderTop="0" padding="0">
							<RoundedBlock border="none">
								<TableFieldContainer>
									<HeaderBodyContainer>
										<HeaderBody>
											<BodyTable>
												<TableBody>
													<TableRow style={{ backgroundColor: '#f3f3f387' }}>
														<TableHeaders width="5%">
															<SelectIconContainer />
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
						</InputBody>
					</PageBody>
					{/* <TablePagination
						component="div"
						style={TablePaginationStyle}
						rowsPerPageOptions={[ 5, 10, 20 ]}
						colSpan={3}
						count={this.state.accounts.length}
						rowsPerPage={rowsPerPage}
						page={page}
						SelectProps={{
							native: true
						}}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
					/> */}
				</PageWrapper>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors,
	variables: state.variables,
	auth: state.auth
});

export default connect(mapStateToProps, { clearErrors, getVariables })(PurchaseInvoice);
