import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import ProductMovementOrderData from './ProductMovementOrderData';
// import CreateAccountModal from './CreateAccountsModal';
import { clearErrors } from '../../../../../../redux/actions/errors';
import { getVariables } from '../../../../../../redux/actions/variables';
import { CustomNotification } from '../../../../../main/Notification';
import SelectorganizationModal from '../../../../../main/Modal/SelectorganizationModal';
// import TablePagination from '@material-ui/core/TablePagination';
// import TablePaginationActions from '../../../main/TablePagination';
// import { TablePaginationStyle } from '../../../../styles/main/TablePagination';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../../../styles/main/Dashboard';
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
	TableFieldContainer,
	SelectWrapper,
	Custombutton
} from '../../../../../../styles/inventory/Style';

class ProductMovementOrderPlacedList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			productMovementOrders: [],
			expandedRows: [],
			location: 'ALL',
			locations: [],
			isOpen: false,
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
			this.props.getVariables('ProductMovementOrder');
			this.props.getVariables('Location');
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		this.props.clearErrors();
		this.props.getVariables('ProductMovementOrder');
	}

	onRefresh(e) {
		this.props.getVariables('ProductMovementOrder');
	}

	onResetDefaults() {
		this.setState({
			location: 'ALL',
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const locations =
			nextProps.variables.Location !== undefined
				? nextProps.variables.Location.map((variable) => {
						return {
							value: variable.variableName,
							label: variable.variableName
						};
					})
				: [];
		locations.unshift({ label: 'ALL', value: 'ALL' });
		return {
			...prevState,
			locations: locations,
			productMovementOrders:
				nextProps.variables !== undefined
					? nextProps.variables.ProductMovementOrder !== undefined
						? nextProps.variables.ProductMovementOrder
						: []
					: []
		};
	}

	renderProductMovementOrders() {
		const rows = [];
		const filteredList =
			this.state.location !== 'ALL'
				? this.state.productMovementOrders.filter((productMovementOrder) => productMovementOrder.values.tolocation === this.state.location)
				: this.state.productMovementOrders;

		filteredList.forEach((productMovementOrder) => {
			rows.push(<ProductMovementOrderData data={productMovementOrder} key={productMovementOrder.variableName} />);
		});
		return rows;
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
								<LeftItemH1>Product Movement Orders</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="right">
								<Custombutton padding="0 10px" minWidth="70px" height="32px">
									<FontAwsomeIcon className="fa fa-plus" />
									Add Account
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
								<SelectWrapper minWidth="150px">
									<Select
										value={{
											value: this.state.location,
											label: this.state.location
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'location', value: option.value } });
										}}
										options={this.state.locations}
									/>
								</SelectWrapper>
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
															<SelectIconContainer>
																<SelectSpan>
																	
																</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Product</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Location</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>

														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>From Location</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>

														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Requested Quantity</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Status</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
													</TableRow>
													{this.renderProductMovementOrders()}
												</TableBody>
											</BodyTable>
											{this.state.productMovementOrders.length === 0 ? (
												<EmptyRowImageContainer>
													<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
													<EmptyRowTag>No Accounts</EmptyRowTag>
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
						count={this.state.productMovementOrders.length}
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

export default connect(mapStateToProps, { clearErrors, getVariables })(ProductMovementOrderPlacedList);
