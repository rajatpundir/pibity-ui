import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../../../redux/actions/errors';
import { getVariables } from '../../../../../redux/actions/variables';
import {
	InputColumnWrapper,
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
	StatusBackgroundColor
} from '../../../../../styles/inventory/Style';
const style = {
	flexBasis: 'calc(100% / 2 - 12px) !important',
	width: '50%'
};

class ProductMovementOrderDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			variable: props.variable,
			selectedProduct: '',
			selectedProductStockLocations: [],
			selectedLocationVariable: {},
			open: true
		};
		this.onChange = this.onChange.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			variable: nextProps.variable
		};
	}

	onChange(e) {
		const variable = cloneDeep(this.state.variable);
		switch (e.target.name) {
			case 'product':
				variable.set(e.target.name, e.target.value);
				variable.set('toProductStore', '');
				variable.set('fromProductStore', '');
				variable.set('toLocation', '');
				variable.set('fromLocation', '');
				variable.set('availableQuantity', '');

				break;
			case 'toLocation':
				variable.set(e.target.name, e.target.value);
				variable.set('toProductStore', e.target.data.variableName);
				variable.set('fromProductStore', '');
				variable.set('fromLocation', '');
				variable.set('availableQuantity', '');
				break;
			case 'fromLocation':
				variable.set(e.target.name, e.target.value);
				variable.set('fromProductStore', e.target.data.variableName);
				variable.set('availableQuantity', e.target.data.values.available);
				break;
			default:
				variable.set(e.target.name, e.target.value);
				break;
		}
		this.setState({ variable: variable });
		this.props.updateDetails(variable, this.state.selectedProduct, this.state.selectedLocationVariable);
	}

	render() {
		return (
			<PageBlock paddingBottom="0">
				<PageToolbar>
					<ToolbarItems>
						<LeftItemH1>Product Movement Order</LeftItemH1>
						{this.props.isdisabled &&
						this.state.variable.get('status') === 'Pending Approval' ? (
							<LeftItemWrapper margin="0 0 0 10px " backgroundColor={StatusBackgroundColor.pending} color="#1a1b1be6">
								Pending Approval
							</LeftItemWrapper>
						) : (
							undefined
						)}
						{this.props.isdisabled &&
						this.state.variable.get('status') === 'Awaiting Order Confirmation' ? (
							<LeftItemWrapper margin="0 0 0 10px " backgroundColor={StatusBackgroundColor.pending} color="#1a1b1be6">
								Awaiting Order Confirmation
							</LeftItemWrapper>
						) : (
							undefined
						)}
						{this.props.isdisabled &&
						this.state.variable.get('status') === 'Canceled' ? (
							<LeftItemWrapper margin="0 0 0 10px " backgroundColor={StatusBackgroundColor.rejected}>
								Canceled
							</LeftItemWrapper>
						) : (
							undefined
						)}
						{this.props.isdisabled &&
						this.state.variable.get('status') === 'Order Accepted' ? (
							<LeftItemWrapper margin="0 0 0 10px " backgroundColor={StatusBackgroundColor.approved}>
								Order Accepted
							</LeftItemWrapper>
						) : (
							undefined
						)}
						{this.props.isdisabled &&
						this.state.variable.get('status') === 'Order rejected' ? (
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
									onClick={this.onResetDefaults}
									backgroundColor="#05cb9a"
									borderColor="#05cb9a"
									borderOnHover="#0bc295"
									backgroundOnHover="#0bc295"
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
									onClick={this.onResetDefaults}
								>
									<FontAwsomeIcon className="fa fa-times " />
									Cancel
								</Custombutton>
							</React.Fragment>
						) : (
							undefined
						)}
						{this.props.isdisabled && this.state.variable.get('status') === 'Awaiting Order Confirmation' ? (
							<React.Fragment>
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									margin="0 5px"
									onClick={this.onResetDefaults}
									backgroundColor="#05cb9a"
									borderColor="#05cb9a"
									borderOnHover="#0bc295"
									backgroundOnHover="#0bc295"
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
									onClick={this.onResetDefaults}
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
				<InputBody overflow="visible">
					<InputFieldContainer>
						<InputColumnWrapper flexBasis={style.flexBasis} width={style.width}>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('product'),
											label: this.state.variable.get('product')
										}}
										onChange={(option) => {
											this.onChange({
												target: { name: 'product', value: option.value }
											});
										}}
										options={
											this.props.variables.Product !== undefined ? (
												this.props.variables.Product.map((variable) => {
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
									Product<Required>*</Required>
								</InputLabel>
							</FormControl>
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('toLocation'),
											label: this.state.variable.get('toLocation')
										}}
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'toLocation',
													value: option.value,
													data: option.data
												}
											});
										}}
										options={
											this.props.variables.ProductStore !== undefined ? (
												this.props.variables.ProductStore
													.filter(
														(productStore) =>
															productStore.values.product ===
															this.state.variable.get('product')
													)
													.map((variable) => {
														return {
															value: variable.values.location,
															label: variable.values.location,
															data: variable
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
							<FormControl>
								<SelectWrapper>
									<Select
										value={{
											value: this.state.variable.get('fromLocation'),
											label: this.state.variable.get('fromLocation')
										}}
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'fromLocation',
													value: option.value,
													data: option.data
												}
											});
										}}
										options={
											this.props.variables.ProductStore !== undefined ? (
												this.props.variables.ProductStore
													.filter(
														(productStore) =>
															productStore.values.product ===
																this.state.variable.get('product') &&
															productStore.values.location !==
																this.state.variable.get('toLocation')
													)
													.map((variable) => {
														return {
															value: variable.values.location,
															label: variable.values.location,
															data: variable
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
						</InputColumnWrapper>
						<InputColumnWrapper flexBasis={style.flexBasis} width={style.width}>
							<FormControl>
								<Input
									name="date"
									type="date"
									placeholder="date"
									value={this.state.variable.get('date')}
									onChange={this.onChange}
								/>
								<InputLabel> Date</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="availableQuantity"
									type="number"
									placeholder="0"
									value={this.state.variable.get('availableQuantity')}
									readOnly
								/>
								<InputLabel> Available Quantity</InputLabel>
							</FormControl>
							<FormControl>
								<Input
									name="requestedQuantity"
									type="number"
									placeholder="0"
									value={this.state.variable.get('requestedQuantity')}
									onChange={this.onChange}
								/>
								<InputLabel> Requested Quantity</InputLabel>
							</FormControl>
						</InputColumnWrapper>

						<InputRowWrapper>
							<FormControl>
								<Input
									name="comments"
									type="text"
									placeholder="comments"
									value=""
									disabled
									// onChange={this.onChange}
								/>
								<InputLabel>Comment</InputLabel>
							</FormControl>
						</InputRowWrapper>
					</InputFieldContainer>
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
	clearErrors,
	getVariables
})(ProductMovementOrderDetails);
