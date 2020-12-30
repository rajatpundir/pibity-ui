import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import AccountsData from './AccountsData';
import CreateAccountModal from './CreateAccountsModal';
import { clearErrors } from '../../../../redux/actions/errors';
import { getVariables } from '../../../../redux/actions/variables';
import { CustomNotification } from '../../../main/Notification';
import SelectorganizationModal from '../../../main/Modal/SelectorganizationModal';
// import TablePagination from '@material-ui/core/TablePagination';
// import TablePaginationActions from '../../../main/TablePagination';
// import { TablePaginationStyle } from '../../../../styles/main/TablePagination';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../styles/main/Dashboard';
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
	SelectWrapper,
	Custombutton
} from '../../../../styles/inventory/Style';

class AccountList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			accounts: [],
			expandedRows: [],
			accountCategory: 'ALL',
			accountCategories: [],
			activeAccountsOnly: false,
			isOpen: false,
			isCreateAccountModalOpen: false,
			page: 0,
			rowsPerPage: 5
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCloseCreateAccountModal = this.onCloseCreateAccountModal.bind(this);
		this.onOpenCreateAccountModal = this.onOpenCreateAccountModal.bind(this);
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
			this.props.getVariables('Account');
			this.props.getVariables('AccountCategory');
			this.props.getVariables('AccountType');
			this.props.getVariables('AccountStatus');
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		this.props.clearErrors();
		this.props.getVariables('Account');
	}

	onRefresh() {
		this.props.getVariables('Account');
	}

	onResetDefaults() {
		this.setState({
			accountCategory: 'ALL',
			activeAccountsOnly: false
		});
	}

	onOpenCreateAccountModal() {
		this.setState({ isCreateAccountModalOpen: true });
	}

	onCloseCreateAccountModal() {
		this.setState({ isCreateAccountModalOpen: false });
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const categories =
			nextProps.variables.AccountCategory !== undefined
				? nextProps.variables.AccountCategory.map((variable) => {
						return {
							value: variable.variableName,
							label: variable.variableName
						};
					})
				: [];
		categories.unshift({ label: 'ALL', value: 'ALL' });
		return {
			...prevState,
			accountCategories: categories,
			accounts:
				nextProps.variables !== undefined
					? nextProps.variables.Account !== undefined ? nextProps.variables.Account : []
					: []
		};
	}

	renderAccounts() {
		const rows = [];
		const filteredList =
			this.state.accountCategory !== 'ALL'
				? this.state.accounts.filter((account) => account.values.accountCategory === this.state.accountCategory)
				: this.state.accounts;

		const list = this.state.activeAccountsOnly
			? filteredList.filter((account) => account.values.status === 'Active')
			: filteredList;
		list.forEach((account) => {
			rows.push(<AccountsData data={account} key={account.variableName} />);
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
		const { rowsPerPage, page } = this.state;
		return (
			<Container mediaPadding="0" backgroundColor="white">
				<CustomNotification limit={3} />
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onRefresh} />
				<CreateAccountModal
					isOpen={this.state.isCreateAccountModalOpen}
					onClose={this.onCloseCreateAccountModal}
				/>
				<PageWrapper mediaMargin="0" mediaWidth="100%">
					<PageBody mediaWidth="100%">
						<PageToolbar borderBottom="1px solid #e0e1e7">
							<ToolbarItems>
								<LeftItemH1>Chart Of Accounts</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="right">
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									onClick={this.onOpenCreateAccountModal}
								>
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
								<CheckBoxContainer>
									<CheckBoxInput
										type="checkbox"
										checked={this.state.activeAccountsOnly}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activeAccountsOnly',
													value: !this.state.activeAccountsOnly
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active Accounts</CheckBoxLabel>
								</CheckBoxContainer>
								<SelectWrapper minWidth="150px">
									<Select
										value={{
											value: this.state.accountCategory,
											label: this.state.accountCategory
										}}
										onChange={(option) => {
											this.onChange({ target: { name: 'accountCategory', value: option.value } });
										}}
										options={this.state.accountCategories}
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
														{/* <TableHeaders width="5%">
															<SelectIconContainer>
																<SelectSpan>
																	<SelectSpanInner>
																		<i className="large material-icons">create</i>
																	</SelectSpanInner>
																</SelectSpan>
															</SelectIconContainer>
														</TableHeaders> */}
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Name</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Code</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>

														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Category</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>

														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Type</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Status</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
													</TableRow>
													{this.renderAccounts()}
												</TableBody>
											</BodyTable>
											{this.state.accounts.length === 0 ? (
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

export default connect(mapStateToProps, { clearErrors, getVariables })(AccountList);
