import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../main/TablePagination';
import SelectorganizationModal from '../../main/SelectorganizationModal';
import {
	Container,
	ListTableFieldContainer,
	PageWrapper,
	PageBody,
	Input,
	PageToolbar,
	ToolbarLeftItems,
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
	Anchor,
	CheckBoxInput,
	CheckBoxLabel,
	CheckBoxContainer
} from './Style';

class PurchaseOrderList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			purchaseOrder: [],
			expandedRows: [],
			activeCustomerOnly: false,
			isOpen: false,
			page: 0,
			rowsPerPage: 5
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			this.props.clearErrors();
			this.props.getVariables('purchaseOrder');
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		this.props.clearErrors();
		this.props.getVariables('purchaseOrder');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			purchaseOrder:
				nextProps.variables !== undefined
					? nextProps.variables.purchaseOrder !== undefined
						? nextProps.variables.purchaseOrder.map((x, i) => ({ ...x, Id: i }))
						: []
					: []
		};
	}

	renderInputFields() {
		const rows = [];
		const list = this.state.activeCustomerOnly
			? this.state.purchaseOrder.filter(
					(purchaseOrder) => purchaseOrder.values.general.values.status === 'Active'
				)
			: this.state.purchaseOrder;
		list.forEach((purchaseOrder) => {
			rows.push(
				<TableRow onClick={this.handleRowClick} key={purchaseOrder.variableName}>
					<TableData width="5%" />
					<TableData width="10%">
						<TableHeaderInner>
							<Link to={'/purchaseOrder/' + purchaseOrder.variableName}>
								{purchaseOrder.variableName}
							</Link>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{purchaseOrder.values.contacts[0].values.name}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Anchor href={'tel:' + purchaseOrder.values.contacts[0].values.phone}>
								{purchaseOrder.values.contacts[0].values.phone}
							</Anchor>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Anchor href={'mailto:' + purchaseOrder.values.contacts[0].values.email} target="_blank">
								{purchaseOrder.values.contacts[0].values.email}
							</Anchor>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Anchor href={purchaseOrder.values.contacts[0].values.website} target="_blank">
								{purchaseOrder.values.contacts[0].values.website}
							</Anchor>
						</TableHeaderInner>
					</TableData>
					<TableData width="20%">
						<TableHeaderInner>
							{purchaseOrder.values.addresses[0] !== undefined ? (
								purchaseOrder.values.addresses[0].values.line1 || 'no address found'
							) : (
								'no address found'
							)}
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>0.00</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Span>{purchaseOrder.values.general.values.status}</Span>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							{purchaseOrder.values.general.values.onCreditHold === false ? 'NO' : 'Yes'}
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
				<PageWrapper mediaMargin="0">
					<PageBody>
						<PageToolbar>
							<ToolbarLeftItems>
								<LeftItemH1>PurchaseOrder</LeftItemH1>
							</ToolbarLeftItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important">
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
							<PageBarAlign padding="10px 20px" float="left">
								<CheckBoxContainer>
									<CheckBoxInput
										type="checkbox"
										checked={this.state.activeCustomerOnly}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activeCustomerOnly',
													value: !this.state.activeCustomerOnly
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active customers</CheckBoxLabel>
								</CheckBoxContainer>
							</PageBarAlign>
						</PageToolbar>
						<InputBody borderTop="0" padding="0">
							<RoundedBlock border="none">
								<ListTableFieldContainer>
									<HeaderBodyContainer>
										<HeaderBody>
											<BodyTable>
												<TableBody>
													<TableRow>
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
																<SelectSpan>Status</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Order</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan textAlign="right">OrderDate</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Supplier</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Doccument</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Required By</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Total</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
													</TableRow>

													{this.renderInputFields()}
												</TableBody>
											</BodyTable>
											<TablePagination
												component="div"
												style={{ display: 'flex', justifyContent: 'center' }}
												rowsPerPageOptions={[ 5, 10, 20 ]}
												colSpan={3}
												count={this.state.purchaseOrder.length}
												rowsPerPage={rowsPerPage}
												page={page}
												SelectProps={{
													native: true
												}}
												onChangePage={this.handleChangePage}
												onChangeRowsPerPage={this.handleChangeRowsPerPage}
												ActionsComponent={TablePaginationActions}
											/>
										</HeaderBody>
									</HeaderBodyContainer>
								</ListTableFieldContainer>
							</RoundedBlock>
						</InputBody>
					</PageBody>
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

const TableHeaderInner = styled.div`
	width: 100%;
	padding: 0 3px;
	color: #41454e;
	vertical-align: middle;
	font-size: 13px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
`;
const Span = styled.span`
	background-color: #d6f3e3;
	margin-right: 0 !important;
	padding: 4px 10px 4px 10px;
	border-radius: 3px;
	display: inline-block;
	font-weight: 500;
`;
