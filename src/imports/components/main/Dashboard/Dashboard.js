// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import Icon from '@material-ui/core/Icon';
import Quicklinks from './QuickLink';
import CustoemrBlock from './CustoemrBlock';
import SupplierBlock from './SupplierBlock';
import ProductBlock from './ProductBlock';
import {
	Container,
	PageWrapper,
	PageBody,
	Custombutton,
	CheckBoxContainer,
	CheckBoxInput,
	CheckBoxLabel,
	InputRowWrapper,
	PageToolbar
} from '../../../styles/inventory/Style';
import {
	PageLabelContainer,
	PageTitle,
	PageSubTitleContainer,
	PageSubTitleAnchor
} from '../../../styles/main/Dashboard';
import {
	InputFieldContainer,
	ModalHeader,
	ModalBody,
	ModalBodyHeading,
	ModalFooter,
	ModalHeaderCloseButton,
	ModalTitle,
	ModalCustomStyles,
	ModalSubmitButton
} from '../../../styles/main/Modal';
import { getVariables } from '../../../redux/actions/variables';
import SelectorganizationModal from '../Modal/SelectorganizationModal';

class Dashboard extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			supplier: true,
			customer: true,
			product: true,
			isOrganizationModalOpen: false
		};
		this.handleChnage = this.handleChnage.bind(this);
		this.openModal = this.openModal.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onResetDefaults=this.onResetDefaults.bind(this);
		this.onOrganizationModalClose = this.onOrganizationModalClose.bind(this);
	}

	getData() {
		this.props.getVariables('Customer');
		this.props.getVariables('Product');
		this.props.getVariables('Supplier');
		this.props.getVariables('Account');
		this.props.getVariables('PurchaseOrder');
		this.props.getVariables('SalesOrder');
		this.props.getVariables('PurchaseInvoice');
		this.props.getVariables('SalesInvoice');
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOrganizationModalOpen: true });
		} else {
			this.getData();
		}
	}

	handleChnage(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	openModal() {
		this.setState({ isOpen: true });
	}

	onClose() {
		this.setState({ isOpen: false });
	}

	onOrganizationModalClose() {
		this.setState({ isOrganizationModalOpen: false });
		this.getData();
	}

	onResetDefaults() {
		this.setState({
			supplier: true,
			customer: true,
			product: true
		});
	}

	render() {
		return (
			<React.Fragment>
				<PageLabelContainer>
					<SelectorganizationModal
						isOpen={this.state.isOrganizationModalOpen}
						onClose={this.onOrganizationModalClose}
					/>
					<PageTitle>Overview Dashboard</PageTitle>
					<PageSubTitleContainer>
						<div style={{ marginTop: '8px', display: 'contents' }}>
							<PageSubTitleAnchor>General Dashboard</PageSubTitleAnchor>
							<Custombutton onClick={this.openModal}>
								<Icon style={{ color: 'white', fontSize: '15px', paddingRight: '25px' }}>settings</Icon>
								Manage Dashboard
							</Custombutton>
						</div>
					</PageSubTitleContainer>
				</PageLabelContainer>
				<Container mediaPadding="20px 20px 0 20px" backgroundColor="#F0F2F4">
					<PageWrapper>
						<PageBody>
							<Quicklinks />
							{this.state.customer ? <CustoemrBlock /> : undefined}
							{this.state.supplier ? <SupplierBlock /> : undefined}
							{this.state.product ? <ProductBlock /> : undefined}
						</PageBody>
					</PageWrapper>
					<Modal
						isOpen={this.state.isOpen}
						contentLabel="Manage DashBoard"
						onRequestClose={this.onClose}
						className="boxed-view__box"
						style={ModalCustomStyles}
						ariaHideApp={false}
						overlayClassName="boxed-view boxed-view--modal"
					>
						<ModalHeader>
							<ModalTitle>Manage Dashboard</ModalTitle>
							<ModalHeaderCloseButton
								onClick={(e) => {
									this.onClose();
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
									<ModalBodyHeading
										style={{
											textAlign: 'initial'
										}}
									>
										Select widgets to display:
									</ModalBodyHeading>
									<CheckBoxContainer margin="10px 0">
										<CheckBoxInput
											type="checkbox"
											checked={this.state.customer}
											tabindex="55"
											onChange={(option) => {
												this.handleChnage({
													target: {
														name: 'customer',
														value: !this.state.customer
													}
												});
											}}
										/>
										<CheckBoxLabel>Customer</CheckBoxLabel>
									</CheckBoxContainer>
									<CheckBoxContainer margin="10px 0">
										<CheckBoxInput
											type="checkbox"
											checked={this.state.supplier}
											tabindex="55"
											onChange={(option) => {
												this.handleChnage({
													target: {
														name: 'supplier',
														value: !this.state.supplier
													}
												});
											}}
										/>
										<CheckBoxLabel>Supplier</CheckBoxLabel>
									</CheckBoxContainer>
									<CheckBoxContainer margin="10px 0">
										<CheckBoxInput
											type="checkbox"
											checked={this.state.product}
											tabindex="55"
											onChange={(option) => {
												this.handleChnage({
													target: {
														name: 'product',
														value: !this.state.product
													}
												});
											}}
										/>
										<CheckBoxLabel>Products</CheckBoxLabel>
									</CheckBoxContainer>
								</InputRowWrapper>
							</InputFieldContainer>
						</ModalBody>
						{/* <ModalFooter>
							<ModalSubmitButton
								onClick={(e) => {
									this.onClose(e);
								}}
							>
								Save
							</ModalSubmitButton>
						</ModalFooter> */}
					</Modal>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	variables: state.variables,
	auth: state.auth
});

export default connect(mapStateToProps, { getVariables })(Dashboard);

export const FontAwsomeIcon = styled.i.attrs((props)=>({
	marginRight:props.marginRight||'5px'
}))`margin-right: ${(props)=>props.marginRight};`;
