// @flow
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Quicklinks from './QuickLink';
import CustoemrBlock from './CustoemrBlock';
import SupplierBlock from './SupplierBlock';
import ProductBlock from './ProductBlock';
import { Container, PageWrapper, PageBody, AuthorizeButton } from '../../../styles/inventory/Style';
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
	ModalFooter,
	ModalHeaderCloseButton,
	ModalTitle,
	ModalCustomStyles,
	ModalSubmitButton
} from '../../../styles/main/Modal';
import { getVariables } from '../../../redux/actions/variables';

class Dashboard extends React.Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
			supplier: true,
			customer: true,
			product: true
		};
		this.handleChnage = this.handleChnage.bind(this);
		this.openModal=this.openModal.bind(this);
		this.onClose=this.onClose.bind(this);
	}

	componentDidMount() {
		this.props.getVariables('Customer');
		this.props.getVariables('Product');
		this.props.getVariables('Supplier');
	}

	handleChnage(e){
		this.setState({[e.target.name]:!this.state.[e.target.name]})
	}

	openModal() {
		this.setState({ isOpen: true });
	}

	onClose() {
		this.setState({ isOpen: false });
	}

	render() {
		return (
			<React.Fragment>
				<PageLabelContainer>
					<PageTitle>Overview Dashboard</PageTitle>
					<PageSubTitleContainer>
						<div style={{ marginTop: '8px', display: 'contents' }}>
							<PageSubTitleAnchor>General Dashboard</PageSubTitleAnchor>
							<AuthorizeButton onClick={this.openModal}>
								<Icon style={{ color: 'white', fontSize: '15px', paddingRight: '25px' }}>settings</Icon>
								Manage Dashboard
							</AuthorizeButton>
						</div>
					</PageSubTitleContainer>
				</PageLabelContainer>
				<Container mediaPadding="20px 20px 0 20px" backgroundColor="#F0F2F4" >
					<PageWrapper>
						<PageBody>
							<Quicklinks />
							{this.state.customer ? <CustoemrBlock  /> : undefined}
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
							<ModalTitle>Manage DashBoard</ModalTitle>
							<ModalHeaderCloseButton
								onClick={(e) => {
									this.onClose();
								}}
							>
								<span>X</span>
							</ModalHeaderCloseButton>
						</ModalHeader>{' '}
						<ModalBody>
							<InputFieldContainer style={{ justifyContent: 'center' }}>
								<FormGroup>
									<FormControlLabel
										control={
											<Switch
												size="medium"
												name="customer"
												checked={this.state.customer}
												onChange={(e) => this.handleChnage(e)}
											/>
										}
										label="Customer"
									/>
									<FormControlLabel
										control={
											<Switch
												size="medium"
												name="supplier"
												checked={this.state.supplier}
												onChange={(e) => this.handleChnage(e)}
											/>
										}
										label="Supplier"
									/>
									<FormControlLabel
										control={
											<Switch
												size="normal"
												name="product"
												checked={this.state.product}
												onChange={(e) => this.handleChnage(e)}
											/>
										}
										label="Product"
									/>
								</FormGroup>
							</InputFieldContainer>
						</ModalBody>
						<ModalFooter>
							<ModalSubmitButton
								onClick={(e) => {
									this.onClose(e);
								}}
							>
								Save
							</ModalSubmitButton>
						</ModalFooter>
					</Modal>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, { getVariables })(Dashboard);
