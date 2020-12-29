import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import Modal from 'react-modal';
import { clearErrors } from '../../../../redux/actions/errors';
import { getVariables } from '../../../../redux/actions/variables';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../../main/TablePagination';
import SelectorganizationModal from '../../../main/Modal/SelectorganizationModal';
import CollapseData from './CollapseData';
import {
	InputFieldContainer,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalHeaderCloseButton,
	ModalTitle,
	ModalCustomStyles,
	ModalSubmitButton
} from '../../../../styles/main/Modal';
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
	InputRowWrapper,
	SelectSpan,
	SelectSpanInner,
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
} from '../../../../styles/inventory/Style';
import { FontAwsomeIcon } from '../../../main/Dashboard/Dashboard';
import { TablePaginationStyle } from '../../../../styles/main/TablePagination';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../styles/main/Dashboard';

class CustomerList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			customer: [],
			expandedRows: [],
			activeCustomerOnly: false,
			isOpen: false,
			page: 0,
			rowsPerPage: 5,
			open: false,
			layoutModalIsOpen: false,
			layoutFeilds: new Map([
				[ 'name', true ],
				[ 'status', true ],
				[ 'email', true ],
				[ 'phone', true ],
				[ 'due', true ],
				[ 'website', true ],
				[ 'contact', true ],
				[ 'address', true ]
			])
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onLayoutChange = this.onLayoutChange.bind(this);
		this.onManageLayoutModalClose = this.onManageLayoutModalClose.bind(this);
		this.onManageLayoutModalOpen = this.onManageLayoutModalOpen.bind(this);
		this.onRefresh = this.onRefresh.bind.bind(this);
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

	onLayoutChange(e) {
		const layout = cloneDeep(this.state.layoutFeilds);
		layout.set(e.target.name, e.target.value);
		this.setState({ layoutFeilds: layout });
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			this.props.clearErrors();
			this.props.getVariables('Customer');
		}
	}
	onManageLayoutModalOpen() {
		this.setState({ layoutModalIsOpen: true });
	}

	onManageLayoutModalClose() {
		this.setState({ layoutModalIsOpen: false });
	}

	onRefresh() {
		this.props.getVariables('Suppliers');
	}

	onResetDefaults() {
		const layout = new Map([
			[ 'name', true ],
			[ 'status', true ],
			[ 'email', true ],
			[ 'phone', true ],
			[ 'due', true ],
			[ 'website', true ],
			[ 'contact', true ],
			[ 'address', true ]
		]);
		this.setState({
			layoutFeilds: layout,
			activeSupplierOnly: false
		});
	}

	onClose() {
		this.setState({ isOpen: false });
		this.props.clearErrors();
		this.props.getVariables('Customer');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			customer:
				nextProps.variables !== undefined
					? nextProps.variables.Customer !== undefined
						? nextProps.variables.Customer.map((x, i) => ({ ...x, Id: i }))
						: []
					: []
		};
	}

	renderInputFields() {
		const rows = [];
		const list = this.state.activeCustomerOnly
			? this.state.customer.filter((customer) => customer.values.general.values.status === 'Active')
			: this.state.customer;
		list.forEach((customer) => {
			// const invoice = this.state.invoice.filter((invoice) => invoice.values.customer === customer.variableName);
			// const totalDue = invoice.reduce(function(accumulator, currentValue) {
			// 	return accumulator + currentValue.values.balanceDue;
			// }, 0);
			rows.push(
				<CollapseData
					data={customer}
					key={customer.variableName}
					// totalDue={totalDue}
					layout={this.state.layoutFeilds}
				/>
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
								<LeftItemH1>Customer</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="left">
								<Custombutton
									padding="10px"
									margin="0 5px"
									minWidth="32px"
									height="32px"
									onClick={this.onManageLayoutModalOpen}
								>
									<FontAwsomeIcon marginRight="0" className="fa fa-plus" />
								</Custombutton>
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
								<Custombutton
									padding="10px"
									color="#3b3b3b"
									backgroundColor="#F7FAFD"
									borderColor="#b9bdce"
									borderOnHover="#3b3b3b"
									backgroundOnHover="#F7FAFD"
									margin="0 5px"
									minWidth="32px"
									height="32px"
									onClick={this.onRefresh}
								>
									<FontAwsomeIcon marginRight="0" className="fa fa-refresh" />
								</Custombutton>
								<Custombutton
									padding="10px"
									color="#3b3b3b"
									backgroundColor="#F7FAFD"
									borderColor="#b9bdce"
									borderOnHover="#3b3b3b"
									backgroundOnHover="#F7FAFD"
									margin="0 5px"
									minWidth="32px"
									height="32px"
									onClick={this.onManageLayoutModalOpen}
								>
									<FontAwsomeIcon marginRight="0" className="fa fa-cog" />
								</Custombutton>
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
															{/* <SelectIconContainer>
																<SelectSpan>
																	<SelectSpanInner>
																		<i className="large material-icons">create</i>
																	</SelectSpanInner>
																</SelectSpan>
															</SelectIconContainer> */}
														</TableHeaders>
														{this.state.layoutFeilds.get('name') ? (
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Name</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														) : (
															undefined
														)}
														{this.state.layoutFeilds.get('contact') ? (
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Contact</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														) : (
															undefined
														)}
														{this.state.layoutFeilds.get('phone') ? (
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan textAlign="right">Phone</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														) : (
															undefined
														)}
														{this.state.layoutFeilds.get('email') ? (
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Email</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														) : (
															undefined
														)}
														{this.state.layoutFeilds.get('website') ? (
															<TableHeaders width="12%">
																<SelectIconContainer>
																	<SelectSpan>Website</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														) : (
															undefined
														)}
														{this.state.layoutFeilds.get('address') ? (
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Address</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														) : (
															undefined
														)}
														{this.state.layoutFeilds.get('due') ? (
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Due</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														) : (
															undefined
														)}
														{this.state.layoutFeilds.get('status') ? (
															<TableHeaders width="10%">
																<SelectIconContainer>
																	<SelectSpan>Status</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														) : (
															undefined
														)}
													</TableRow>
													{this.renderInputFields()}
												</TableBody>
											</BodyTable>
											{this.state.customer.length === 0 ? (
												<EmptyRowImageContainer>
													<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
													<EmptyRowTag>No Customers</EmptyRowTag>
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
						count={this.state.customer.length}
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
				<Modal
					isOpen={this.state.layoutModalIsOpen}
					contentLabel="Manage Layout"
					onRequestClose={this.onManageLayoutModalClose}
					className="boxed-view__box"
					style={ModalCustomStyles}
					ariaHideApp={false}
					overlayClassName="boxed-view boxed-view--modal"
				>
					<ModalHeader>
						<ModalTitle>Manage Layout</ModalTitle>
						<ModalHeaderCloseButton
							onClick={(e) => {
								this.onManageLayoutModalClose();
							}}
						>
							<span>X</span>
						</ModalHeaderCloseButton>
					</ModalHeader>{' '}
					<ModalBody>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
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
								Reset Layout
							</Custombutton>
						</PageToolbar>
						<InputFieldContainer>
							<InputRowWrapper display="flex" justifyContent="center">
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.layoutFeilds.get('name')}
										tabindex="55"
										onChange={(option) => {
											this.onLayoutChange({
												target: {
													name: 'name',
													value: !this.state.layoutFeilds.get('name')
												}
											});
										}}
									/>
									<CheckBoxLabel>Name</CheckBoxLabel>
								</CheckBoxContainer>
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.layoutFeilds.get('contact')}
										tabindex="55"
										onChange={(option) => {
											this.onLayoutChange({
												target: {
													name: 'contact',
													value: !this.state.layoutFeilds.get('contact')
												}
											});
										}}
									/>
									<CheckBoxLabel>Contact</CheckBoxLabel>
								</CheckBoxContainer>
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.layoutFeilds.get('phone')}
										tabindex="55"
										onChange={(option) => {
											this.onLayoutChange({
												target: {
													name: 'phone',
													value: !this.state.layoutFeilds.get('phone')
												}
											});
										}}
									/>
									<CheckBoxLabel>Phone</CheckBoxLabel>
								</CheckBoxContainer>
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.layoutFeilds.get('email')}
										tabindex="55"
										onChange={(option) => {
											this.onLayoutChange({
												target: {
													name: 'email',
													value: !this.state.layoutFeilds.get('email')
												}
											});
										}}
									/>
									<CheckBoxLabel>Email</CheckBoxLabel>
								</CheckBoxContainer>
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.layoutFeilds.get('website')}
										tabindex="55"
										onChange={(option) => {
											this.onLayoutChange({
												target: {
													name: 'website',
													value: !this.state.layoutFeilds.get('website')
												}
											});
										}}
									/>
									<CheckBoxLabel>Website</CheckBoxLabel>
								</CheckBoxContainer>
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.layoutFeilds.get('address')}
										tabindex="55"
										onChange={(option) => {
											this.onLayoutChange({
												target: {
													name: 'address',
													value: !this.state.layoutFeilds.get('address')
												}
											});
										}}
									/>
									<CheckBoxLabel>Address</CheckBoxLabel>
								</CheckBoxContainer>
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.layoutFeilds.get('due')}
										tabindex="55"
										onChange={(option) => {
											this.onLayoutChange({
												target: {
													name: 'due',
													value: !this.state.layoutFeilds.get('due')
												}
											});
										}}
									/>
									<CheckBoxLabel>Due</CheckBoxLabel>
								</CheckBoxContainer>
								<CheckBoxContainer margin="10px 0">
									<CheckBoxInput
										type="checkbox"
										checked={this.state.layoutFeilds.get('status')}
										tabindex="55"
										onChange={(option) => {
											this.onLayoutChange({
												target: {
													name: 'status',
													value: !this.state.layoutFeilds.get('status')
												}
											});
										}}
									/>
									<CheckBoxLabel>Status</CheckBoxLabel>
								</CheckBoxContainer>
							</InputRowWrapper>
						</InputFieldContainer>
					</ModalBody>
					{/* <ModalFooter>
						<ModalSubmitButton
							onClick={(e) => {
								this.onManageLayoutModalClose(e);
							}}
						>
							Save
						</ModalSubmitButton>
					</ModalFooter> */}
				</Modal>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors,
	variables: state.variables,
	auth: state.auth
});

export default connect(mapStateToProps, { clearErrors, getVariables })(CustomerList);
