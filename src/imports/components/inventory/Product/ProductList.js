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
	SelectSpanInner,
	HeaderBodyContainer,
	HeaderBody,
	BodyTable,
	TableBody,
	TableRow,
	TableHeaders,
	TableData,
	CheckBoxInput,
	CheckBoxLabel,
	CheckBoxContainer,
	TableHeaderInner,
	TableFieldContainer,
	Span,
	Custombutton,
	FontAwsomeIcon
} from '../../../styles/inventory/Style';
import { TablePaginationStyle } from '../../../styles/main/TablePagination';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../styles/main/Dashboard';

class ProductList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			product: [],
			expandedRows: [],
			activeProductOnly: false,
			isOpen: false,
			page: 0,
			rowsPerPage: 5
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
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
			this.props.getVariables('Product');
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		this.props.clearErrors();
		this.props.getVariables('Product');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			product:
				nextProps.variables !== undefined
					? nextProps.variables.Product !== undefined
						? nextProps.variables.Product.map((x, i) => ({ ...x, Id: i }))
						: []
					: []
		};
	}

	renderInputFields() {
		const rows = [];
		const list = this.state.activeProductOnly
			? this.state.product.filter((product) => product.values.productStatus === 'Active')
			: this.state.product;
		list.forEach((product) => {
			rows.push(
				<TableRow onClick={this.handleRowClick} key={product.variableName}>
					<TableData width="5%" />
					<TableData width="10%">
						<TableHeaderInner>
							<Link to={'/product/' + product.variableName}>{product.variableName}</Link>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner> {product.values.productName}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{product.values.unitOfMeasure}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{product.values.productType}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{product.values.category}</TableHeaderInner>
					</TableData>
					<TableData width="15%">
						<TableHeaderInner>
							{/* {product.values.supplierProduct[0] !== undefined ? (
								product.values.supplierProduct[0].supplier || 'no address found'
							) : (
								'no supplier found'
							)} */}
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Span>{product.values.productStatus}</Span>
						</TableHeaderInner>
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
								<LeftItemH1>Product</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="left">
								<Link to="/product" style={{ textDecoration: 'none' }}>
									<Custombutton padding="10px" margin="0 5px" minWidth="32px" height="32px">
										<FontAwsomeIcon marginRight="0" className="fa fa-plus" />
									</Custombutton>
								</Link>
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
							<PageBarAlign padding="10px 20px" float="left">
								<CheckBoxContainer>
									<CheckBoxInput
										type="checkbox"
										checked={this.state.activeProductOnly}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activeProductOnly',
													value: !this.state.activeProductOnly
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active</CheckBoxLabel>
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
																<SelectSpan>SKU</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Product Name</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan textAlign="right">Unit</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Type</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Categorey</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="12%">
															<SelectIconContainer>
																<SelectSpan>Last Supplier</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>

														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Status</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
													</TableRow>
													{this.renderInputFields()}
												</TableBody>
											</BodyTable>

											{this.state.product.length === 0 ? (
												<EmptyRowImageContainer>
													<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
													<EmptyRowTag>No Products</EmptyRowTag>
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
					<TablePagination
						component="div"
						style={TablePaginationStyle}
						rowsPerPageOptions={[ 5, 10, 20 ]}
						colSpan={3}
						count={this.state.product.length}
						rowsPerPage={rowsPerPage}
						page={page}
						SelectProps={{
							native: true
						}}
						onChangePage={this.handleChangePage}
						onChangeRowsPerPage={this.handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
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

export default connect(mapStateToProps, { clearErrors, getVariables })(ProductList);
