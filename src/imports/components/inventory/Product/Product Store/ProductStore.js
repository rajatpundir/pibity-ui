import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { clearErrors } from '../../../../redux/actions/errors';
import { getVariables } from '../../../../redux/actions/variables';
import { CustomNotification } from '../../../main/Notification';
import SelectorganizationModal from '../../../main/Modal/SelectorganizationModal';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../../styles/main/Dashboard';
import {
	Container,
	PageWrapper,
	PageBody,
	PageToolbar,
	ToolbarItems,
	LeftItemH1,
	PageBarAlign,
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
	TableHeaderInner,
	TableFieldContainer,
	Custombutton,
	StatusSpan,
	CheckBoxInput,
	CheckBoxLabel,
	CheckBoxContainer,
	StatusBackgroundColor
} from '../../../../styles/inventory/Style';
import ProductStoreModal from './ProductStoreModal';

class ProductStores extends React.Component {
	constructor(props) {
		super();
		this.state = {
			productStores: [],
			products: [],
			isOpen: false,
			isCreateProductStoreModalOpen: false,
			activeProductStore: false,
			variableName: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCloseCreateProductStoreModal = this.onCloseCreateProductStoreModal.bind(this);
		this.onOpenCreateProductStoreModal = this.onOpenCreateProductStoreModal.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			this.props.clearErrors();
			this.props.getVariables('ProductStore');
			this.props.getVariables('Product');
			this.props.getVariables('Location');
			this.props.getVariables('Status');
		}
	}

	onClose() {
		this.setState({
			isOpen: false
		});
		this.props.clearErrors();
		this.props.getVariables('ProductStore');
	}

	onRefresh() {
		this.props.getVariables('ProductStore');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			products:
				nextProps.variables !== undefined
					? nextProps.variables.Product !== undefined ? nextProps.variables.Product : []
					: [],
			productStores:
				nextProps.variables !== undefined
					? nextProps.variables.ProductStore !== undefined ? nextProps.variables.ProductStore : []
					: []
		};
	}

	renderProductStores() {
		const rows = [];
		const list = this.state.activeProductStore
			? this.state.productStores.filter((productStore) => productStore.values.status === 'Active')
			: this.state.productStores;
		list.forEach((productStore) => {
			const product = this.state.products.filter(
				(product) => product.variableName === productStore.values.product
			)[0];
			rows.push(
				<TableRow key={productStore.variableName}>
					<TableData left="0px" />
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
						>
							{product ? product.values.general.values.productName : ''}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{productStore.values.location}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{productStore.values.onHand}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{productStore.values.available}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{productStore.values.onOrder}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{productStore.values.allocated}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<StatusSpan
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
							backgroundColor={
								productStore.values.status === 'Active' ? (
									StatusBackgroundColor.active
								) : (
									StatusBackgroundColor.depricated
								)
							}
						>
							{productStore.values.status}
						</StatusSpan>
					</TableData>
					<TableData left="0px">
						<i
							name={productStore.variableName}
							className="large material-icons"
							// onClick={(e) => this.onRemoveKey(e,)}
						>
							remove_circle_outline
						</i>
					</TableData>
				</TableRow>
			);
		});
		return rows;
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onOpenCreateProductStoreModal() {
		this.setState({ isCreateProductStoreModalOpen: true });
	}

	onCloseCreateProductStoreModal() {
		this.setState({
			isCreateProductStoreModalOpen: false,
			variableName: ''
		});
	}

	render() {
		return (
			<Container mediaPadding="0" backgroundColor="white">
				<CustomNotification limit={3} />
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onRefresh} />
				<ProductStoreModal
					onClose={this.onCloseCreateProductStoreModal}
					isOpen={this.state.isCreateProductStoreModalOpen}
					variableName={this.state.variableName}
				/>
				<PageWrapper mediaMargin="0" mediaWidth="100%">
					<PageBody mediaWidth="100%">
						<PageToolbar borderBottom="1px solid #e0e1e7">
							<ToolbarItems>
								<LeftItemH1>Product Stores</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="right">
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									onClick={this.onOpenCreateProductStoreModal}
								>
									<FontAwsomeIcon className="fa fa-plus" />
									Add ProductStore
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
							</PageBarAlign>
							<PageBarAlign padding="10px 20px" float="left">
								<CheckBoxContainer>
									<CheckBoxInput
										type="checkbox"
										checked={this.state.activeProductStore}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activeProductStore',
													value: !this.state.activeProductStore
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active Product Stores</CheckBoxLabel>
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
														<TableHeaders width="5%" />
														<TableHeaders width="15%">
															<SelectIconContainer
																style={{
																	justifyContent: 'initial'
																}}
															>
																<SelectSpan>Product Name</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Loacation</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>onHand</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Available</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>onOrder</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Allocated</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Status</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="5%">
															<SelectIconContainer>
																<SelectSpan>
																	<SelectSpanInner>
																		<i className="large material-icons">create</i>
																	</SelectSpanInner>
																</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
													</TableRow>
													{this.renderProductStores()}
												</TableBody>
											</BodyTable>
											{this.state.productStores.length === 0 ? (
												<EmptyRowImageContainer>
													<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
													<EmptyRowTag>No Product Stores Available</EmptyRowTag>
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

export default connect(mapStateToProps, { clearErrors, getVariables })(ProductStores);

export const FontAwsomeIcon = styled.i`margin-right: 5px;`;
