import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../../../redux/actions/errors';
import { getVariables } from '../../../../../redux/actions/variables';
import { executeFuntion } from '../../../../../redux/actions/executeFuntion';
import {
	InputRowWrapper,
	InputFieldContainer,
	Input,
	Required,
	InputBody,
	InputLabel,
	LeftItemH1,
	PageBlock,
	PageToolbar,
	SelectWrapper,
	ToolbarItems,
	FormControl,
	PageBarAlign,
	Custombutton,
	FontAwsomeIcon,
	LeftItemWrapper,
	TextAreaContainer,
	TextArea,
	StatusBackgroundColor,
	AddMoreBlock,
	AddMoreButton,
	BodyTable,
	HeaderBody,
	HeaderBodyContainer,
	HeaderContainer,
	Headers,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	TableBody,
	TableData,
	TableFieldContainer,
	TableHeaderInner,
	TableHeaders,
	TableRow,
	EmptyRow
} from '../../../../../styles/inventory/Style';

const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%'
};
class ProductMovementOrderDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			variable: props.variable,
			orderItems: props.orderItems,
			productStore: []
		};
		this.onChange = this.onChange.bind(this);
		this.updateStatus = this.updateStatus.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			variable: nextProps.variable,
			open: true,
			orderItems: nextProps.orderItems,
			productStore:
				nextProps.variables !== undefined
					? nextProps.variables.ProductStore !== undefined ? nextProps.variables.ProductStore : []
					: []
		};
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		switch (e.target.name) {
			case 'toLocation':
				variable.set(e.target.name, e.target.value);
				variable.set('fromLocation', '');
				this.props.updateOrderItems([]);
				break;
			case 'fromLocation':
				variable.set(e.target.name, e.target.value);
				this.props.updateOrderItems([]);
				break;
			default:
				variable.set(e.target.name, e.target.value);
				break;
		}
		this.setState({ variable: variable });
		this.props.updateDetails(variable);
	}

	updateStatus(e, funtionName) {
		const args = {
			productMovementOrder: this.props.variableName
		};
		this.props.executeFuntion(args, funtionName).then((response) => {
			if (response.status === 200) {
				this.props.getVariables('ProductMovementOrder');
			}
		});
	}

	onOrderItemChange(e, variableName) {
		const orderItems = cloneDeep(this.state.orderItems);
		orderItems.map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				switch (e.target.name) {
					case 'product':
						const fromProductStore = this.state.productStore.filter(
							(store) =>
								store.values.product === e.target.value &&
								store.values.location === this.state.variable.get('fromLocation')
						)[0];
						const toProductStore = this.state.productStore.filter(
							(store) =>
								store.values.product === e.target.value &&
								store.values.location === this.state.variable.get('toLocation')
						)[0];
						values.set(e.target.name, e.target.value);
						values.set('fromProductStore', fromProductStore.variableName);
						values.set('availableQuantity', fromProductStore.values.available);
						values.set('toProductStore', toProductStore.variableName);
						break;
					default:
						values.set(e.target.name, e.target.value);
						break;
				}
				listVariable.set('values', values);
				return listVariable;
			} else {
				return listVariable;
			}
		});

		this.setState({ orderItems: orderItems });
		this.props.updateOrderItems(orderItems);
	}

	addItems() {
		const orderItems = cloneDeep(this.state.orderItems);
		orderItems.unshift(
			new Map([
				[ 'typeName', 'ProductMovementOrderItems' ],
				[
					'variableName',
					String(orderItems.length === 0 ? 0 : Math.max(...orderItems.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
						[ 'orderId', '' ],
						[ 'product', '' ],
						[ 'requestedQuantity', '' ],
						[ 'availableQuantity', '' ],
						[ 'toProductStore', '' ],
						[ 'fromProductStore', '' ]
					])
				]
			])
		);
		this.setState({ orderItems: orderItems });
		this.props.updateOrderItems(orderItems);
	}

	onRemoveOrderItem(e, variableName) {
		const orderItems = this.state.orderItems.filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ orderItems: orderItems });
		this.props.updateOrderItems(orderItems);
	}

	renderOrderItems() {
		const rows = [];
		const productStore =
			this.props.variables !== undefined
				? this.props.variables.ProductStore
					? this.props.variables.ProductStore
							.filter(
								(productStore) => productStore.values.location === this.state.variable.get('fromLocation')
							)
							.map((store) => store.values.product)
					: []
				: [];
		this.state.orderItems.forEach((listVariable) =>
			rows.push(
				<TableRow key={listVariable.get('variableName')}>
					<TableData width="5%">
						{this.props.isdisabled ? (
							undefined
						) : (
							<i
								name={listVariable.get('variableName')}
								className="large material-icons"
								onClick={(e) => this.onRemoveOrderItem(e, listVariable.get('variableName'))}
							>
								remove_circle_outline
							</i>
						)}
					</TableData>
					<TableData width="35%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('product'),
										label: listVariable.get('values').get('product')
									}}
									onChange={(option) => {
										this.onOrderItemChange(
											{ target: { name: 'product', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Product !== undefined ? (
											this.props.variables.Product
												.filter((variable) => productStore.includes(variable.variableName))
												.filter((product) => {
													return !this.state.orderItems
														.map((item) => {
															return item.get('values').get('product');
														})
														.includes(product.variableName);
												})
												.map((variable) => {
													return {
														value: variable.variableName,
														label: variable.variableName
													};
												})
										) : (
											[]
										)
									}
									isDisabled={this.props.isdisabled}
								/>
							</SelectWrapper>
						</TableHeaderInner>
					</TableData>
					<TableData width="30%">
						<TableHeaderInner>
							<Input
								name="availableQuantity"
								type="number"
								value={listVariable.get('values').get('availableQuantity')}
								readOnly
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="30%">
						<TableHeaderInner>
							<Input
								name="requestedQuantity"
								type="text"
								value={listVariable.get('values').get('requestedQuantity')}
								onChange={(e) => this.onOrderItemChange(e, listVariable.get('variableName'))}
								readOnly={this.props.isdisabled}
							/>
						</TableHeaderInner>
					</TableData>
				</TableRow>
			)
		);
		return rows;
	}

	render() {
		return (
			<PageBlock paddingBottom="0">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemH1>Product Movement Order</LeftItemH1>
						{/* {this.state.variable.get('status') === 'Order Accepted' ? (
							<IconButton
								aria-label="expand row"
								size="small"
								onClick={() => this.setState({ open: !this.state.open })}
							>
								{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
							</IconButton>
						) : (
							undefined
						)} */}

						{this.props.isdisabled && this.state.variable.get('status') === 'Pending Approval' ? (
							<LeftItemWrapper
								margin="0 0 0 10px "
								backgroundColor={StatusBackgroundColor.pending}
								color="#1a1b1be6"
							>
								Pending Approval
							</LeftItemWrapper>
						) : (
							undefined
						)}
						{this.props.isdisabled &&
						this.state.variable.get('status') === 'Awaiting Order Confirmation' ? (
							<LeftItemWrapper
								margin="0 0 0 10px "
								backgroundColor={StatusBackgroundColor.pending}
								color="#1a1b1be6"
							>
								Awaiting Order Confirmation
							</LeftItemWrapper>
						) : (
							undefined
						)}
						{this.props.isdisabled && this.state.variable.get('status') === 'Canceled' ? (
							<LeftItemWrapper margin="0 0 0 10px " backgroundColor={StatusBackgroundColor.rejected}>
								Canceled
							</LeftItemWrapper>
						) : (
							undefined
						)}
						{this.props.isdisabled && this.state.variable.get('status') === 'Order Accepted' ? (
							<LeftItemWrapper margin="0 0 0 10px " backgroundColor={StatusBackgroundColor.approved}>
								Order Accepted
							</LeftItemWrapper>
						) : (
							undefined
						)}
						{this.props.isdisabled && this.state.variable.get('status') === 'Order rejected' ? (
							<LeftItemWrapper margin="0 0 0 10px " backgroundColor={StatusBackgroundColor.rejected}>
								Order rejected
							</LeftItemWrapper>
						) : (
							undefined
						)}
					</ToolbarItems>
					<PageBarAlign padding="0 20px" float="left">
						{this.props.isdisabled && this.state.variable.get('status') === 'Pending Approval' ? (
							<React.Fragment>
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									margin="0 5px"
									backgroundColor="#05cb9a"
									borderColor="#05cb9a"
									borderOnHover="#0bc295"
									backgroundOnHover="#0bc295"
									onClick={(e) => this.updateStatus(e, 'approveProductMovementOrder')}
								>
									<FontAwsomeIcon className="fa fa-check-circle" />
									Approve
								</Custombutton>
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									color="#f7f3f3"
									backgroundColor="#ed3636"
									borderColor="#ed3636"
									borderOnHover="#d82b2b"
									backgroundOnHover="#d82b2b"
									margin="0 5px"
									onClick={(e) => this.updateStatus(e, 'cancelProductMovementOrder')}
								>
									<FontAwsomeIcon className="fa fa-times " />
									Cancel
								</Custombutton>
							</React.Fragment>
						) : (
							undefined
						)}
						{this.props.isdisabled &&
						this.state.variable.get('status') === 'Awaiting Order Confirmation' ? (
							<React.Fragment>
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									margin="0 5px"
									backgroundColor="#05cb9a"
									borderColor="#05cb9a"
									borderOnHover="#0bc295"
									backgroundOnHover="#0bc295"
									onClick={(e) => this.props.onOpenCreateInvoiceModal()}
								>
									<FontAwsomeIcon className="fa fa-check-circle" />
									Accept Order
								</Custombutton>
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									color="#f7f3f3"
									backgroundColor="#ed3636"
									borderColor="#ed3636"
									borderOnHover="#d82b2b"
									backgroundOnHover="#d82b2b"
									margin="0 5px"
									onClick={(e) => this.updateStatus(e, 'rejectProductMovementOrder')}
								>
									<FontAwsomeIcon className="fa fa-times " />
									Reject Order
								</Custombutton>
							</React.Fragment>
						) : (
							undefined
						)}
					</PageBarAlign>
				</PageToolbar>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<InputBody overflow="visible">
						<InputFieldContainer>
							<InputRowWrapper>
								<FormControl flexBasis={style.flexBasis} paddingRight="10px">
									<SelectWrapper>
										<Select
											isDisabled={this.props.isdisabled}
											value={{
												value: this.state.variable.get('toLocation'),
												label: this.state.variable.get('toLocation')
											}}
											onChange={(option) => {
												this.onChange({
													target: {
														name: 'toLocation',
														value: option.value
													}
												});
											}}
											options={
												this.props.variables.Location !== undefined ? (
													this.props.variables.Location.map((variable) => {
														return {
															value: variable.variableName,
															label: variable.variableName
														};
													})
												) : (
													[]
												)
											}
										/>
									</SelectWrapper>
									<InputLabel>
										To Location <Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl flexBasis={style.flexBasis} paddingRight="10px">
									<SelectWrapper>
										<Select
											isDisabled={this.props.isdisabled}
											value={{
												value: this.state.variable.get('fromLocation'),
												label: this.state.variable.get('fromLocation')
											}}
											onChange={(option) => {
												this.onChange({
													target: {
														name: 'fromLocation',
														value: option.value
													}
												});
											}}
											options={
												this.props.variables.Location !== undefined ? (
													this.props.variables.Location
														.filter(
															(location) =>
																location.variableName !==
																this.state.variable.get('toLocation')
														)
														.map((variable) => {
															return {
																value: variable.variableName,
																label: variable.variableName
															};
														})
												) : (
													[]
												)
											}
										/>
									</SelectWrapper>
									<InputLabel>
										From Location <Required>*</Required>
									</InputLabel>
								</FormControl>
								<FormControl flexBasis={style.flexBasis} paddingRight="10px">
									<Input
										style={{
											height: ' 38px'
										}}
										name="date"
										type="date"
										placeholder="date"
										value={this.state.variable.get('date')}
										onChange={this.onChange}
										readOnly={this.props.isdisabled}
									/>
									<InputLabel> Date</InputLabel>
								</FormControl>
							</InputRowWrapper>

							<RoundedBlock overflow="visible">
								<TableFieldContainer overflow="visible">
									<Headers>
										<HeaderContainer>
											<HeaderBody>
												<BodyTable>
													<TableBody>
														<TableRow>
															<TableHeaders width="5%" />
															<TableHeaders width="35%">
																<SelectIconContainer>
																	<SelectSpan>Product</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="30%">
																<SelectIconContainer>
																	<SelectSpan>Available Quantity</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
															<TableHeaders width="30%">
																<SelectIconContainer>
																	<SelectSpan>Order Quantity</SelectSpan>
																</SelectIconContainer>
															</TableHeaders>
														</TableRow>
													</TableBody>
												</BodyTable>
											</HeaderBody>
										</HeaderContainer>
									</Headers>
									<HeaderBodyContainer>
										<HeaderBody>
											<BodyTable>
												<TableBody>{this.renderOrderItems()}</TableBody>
											</BodyTable>
										</HeaderBody>
										{this.state.orderItems.length === 0 ? (
											<EmptyRow>You do not have any Additional Cost Lines.</EmptyRow>
										) : (
											undefined
										)}
									</HeaderBodyContainer>
									{this.props.isdisabled ? (
										undefined
									) : (
										<AddMoreBlock>
											<AddMoreButton onClick={(e) => this.addItems()}>
												<i className="large material-icons">add</i>Add Additional Services
												Charges
											</AddMoreButton>
										</AddMoreBlock>
									)}
								</TableFieldContainer>
							</RoundedBlock>
							<InputRowWrapper paddingTop="15px">
								<TextAreaContainer>
									<TextArea
										name="comments"
										type="text"
										placeholder="Wrtie a note here"
										value={this.state.variable.get('comments')}
										height="60px"
										onChange={this.onChange}
									/>
									<InputLabel>Note</InputLabel>
								</TextAreaContainer>
							</InputRowWrapper>
						</InputFieldContainer>
					</InputBody>
				</Collapse>
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
	clearErrors,
	getVariables,
	executeFuntion
})(ProductMovementOrderDetails);
