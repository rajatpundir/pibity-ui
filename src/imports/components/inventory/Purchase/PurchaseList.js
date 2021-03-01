import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../main/TablePagination';
import SelectorganizationModal from '../../main/Modal/SelectorganizationModal';
import {
	Container,
	ListTableFieldContainer,
	PageWrapper,
	PageBody,
	Input,
	PageToolbar,
	ToolbarItems,
	LeftItemH1,
	PageBarAlign,
	LeftItemFormControl,
	ButtonWithOutline,
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
	TableData,
	TableHeaderInner
} from '../../../styles/inventory/Style';
import { TablePaginationStyle } from '../../../styles/main/TablePagination';

class PurchaseOrderList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			purchase: [],
			expandedRows: [],
			activeCustomerOnly: false,
			isOpen: false,
			page: 0,
			rowsPerPage: 5
		};
		this.onChange = this.onChange.bind(this);
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
			this.props.getVariables('Purchase');
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		this.props.clearErrors();
		this.props.getVariables('Purchase');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			purchase:
				nextProps.variables !== undefined
					? nextProps.variables.Purchase !== undefined
						? nextProps.variables.Purchase.map((x, i) => ({ ...x, Id: i }))
						: []
					: []
		};
	}

	renderInputFields() {
		const rows = [];
		this.state.purchase.forEach((purchase) => {
			rows.push(
				<TableRow onClick={this.handleRowClick} key={purchase.variableName}>
					<TableData width="5%" />
					<TableData width="10%">
						<TableHeaderInner>
							{purchase.values.orderType === 'Simple' ? (
								<Link to={'/purchase/' + purchase.variableName}>{purchase.variableName}</Link>
							) : (
								<Link to={'/servicePurchase/' + purchase.variableName}>
									{purchase.variableName}
								</Link>
							)}
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Link to={'/supplierList/' + purchase.values.general.values.supplierName}>
								{purchase.values.general.values.supplierName}
							</Link>
						</TableHeaderInner>{' '}
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{purchase.values.general.values.date}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							{/* {purchase.values.orderDetails[0].values.additionalCostBeforeTax +
								purchase.values.orderDetails[0].values.productCostBeforeTax} */}
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							{/* {purchase.values.orderDetails[0].values.totalTaxOnAdditionalCost +
								purchase.values.orderDetails[0].values.totalTaxOnProduct} */}
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						{/* <TableHeaderInner>{purchase.values.orderDetails[0].values.total}</TableHeaderInner> */}
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
		const { rowsPerPage, page } = this.state;
		return (
			<Container mediaPadding="0" backgroundColor="white">
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onClose} />
				<PageWrapper mediaMargin="0" mediaWidth="100%">
					<PageBody mediaWidth="100%">
						<PageToolbar borderBottom="1px solid #e0e1e7">
							<ToolbarItems>
								<LeftItemH1>Purchase Orders</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="left">
								<LeftItemFormControl paddingBottom="0">
									<Input
										width="250px"
										height="32px"
										padding="0 10px"
										placeholder="Type text to search"
									/>
								</LeftItemFormControl>
								<LeftItemFormControl paddingBottom="0">
									<ButtonWithOutline>Search</ButtonWithOutline>
								</LeftItemFormControl>
							</PageBarAlign>
						</PageToolbar>
						<InputBody borderTop="0" padding="0">
							<RoundedBlock border="none">
								<ListTableFieldContainer>
									<HeaderBodyContainer>
										<HeaderBody>
											<BodyTable>
												<TableBody>
													<TableRow style={{ backgroundColor: '#f3f3f387' }}>
														<TableHeaders width="5%" />
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Purchase Order</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Supplier</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Date</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Total Before Tax</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Tax</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Total</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
													</TableRow>

													{this.renderInputFields()}
												</TableBody>
											</BodyTable>
										</HeaderBody>
									</HeaderBodyContainer>
								</ListTableFieldContainer>
							</RoundedBlock>
						</InputBody>
					</PageBody>
					<TablePagination
						component="div"
						style={TablePaginationStyle}
						rowsPerPageOptions={[ 5, 10, 20 ]}
						colSpan={3}
						count={this.state.purchase.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
						SelectProps={{
							native: true
						}}
					/>
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

export default connect(mapStateToProps, { clearErrors, getVariables })(PurchaseOrderList);
