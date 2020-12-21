import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import { CustomNotification } from '../Notification';
import SelectorganizationModal from '../Modal/SelectorganizationModal';
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../styles/main/Dashboard';
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
} from '../../../styles/inventory/Style';
import PaymentTermModal from '../Modal/PaymentTermModal';

class PaymentTerms extends React.Component {
	constructor(props) {
		super();
		this.state = {
			paymentTerms: [],
			isOpen: false,
			isCreatePaymentTermModalOpen: false,
			activePaymentTerms: false,
			variableName: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onUpdatePaymentTerm = this.onUpdatePaymentTerm.bind(this);
		this.onCloseCreatePaymentTermModal = this.onCloseCreatePaymentTermModal.bind(this);
		this.onOpenCreatePaymentTermModal = this.onOpenCreatePaymentTermModal.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			this.props.clearErrors();
			this.props.getVariables('PaymentTerm');
			this.props.getVariables('Status');
		}
	}

	onClose() {
		this.setState({
			isOpen: false
		});
		this.props.clearErrors();
	}

	onRefresh() {
		this.props.getVariables('PaymentTerm');
	}

	onUpdatePaymentTerm(e, variableName) {
		this.setState({ variableName: variableName }, () => {
			this.onOpenCreatePaymentTermModal();
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			paymentTerms:
				nextProps.variables !== undefined
					? nextProps.variables.PaymentTerm !== undefined ? nextProps.variables.PaymentTerm : []
					: []
		};
	}

	renderPaymentTerms() {
		const rows = [];
		const list = this.state.activePaymentTerms
			? this.state.paymentTerms.filter((paymentTerm) => paymentTerm.values.status === 'Active')
			: this.state.paymentTerms;
		list.forEach((paymentTerm, index) => {
			rows.push(
				<TableRow key={index}>
					<TableData left="0px" />
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
							onClick={(e) => this.onUpdatePaymentTerm(e, paymentTerm.variableName)}
						>
							{paymentTerm.variableName}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
						>
							{paymentTerm.values.days}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<StatusSpan
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
							backgroundColor={
								paymentTerm.values.status === 'Active' ? (
									StatusBackgroundColor.active
								) : (
									StatusBackgroundColor.depricated
								)
							}
						>
							{paymentTerm.values.status}
						</StatusSpan>
					</TableData>
					<TableData left="0px">
						<i
							name={paymentTerm.variableName}
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

	onOpenCreatePaymentTermModal() {
		this.setState({ isCreatePaymentTermModalOpen: true });
	}

	onCloseCreatePaymentTermModal() {
		this.setState({ isCreatePaymentTermModalOpen: false, variableName: '' });
		this.props.getVariables('PaymentTerm');
	}
	render() {
		return (
			<Container mediaPadding="0" backgroundColor="white">
				<CustomNotification limit={3} />
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onRefresh} />
				<PaymentTermModal
					onClose={this.onCloseCreatePaymentTermModal}
					isOpen={this.state.isCreatePaymentTermModalOpen}
					variableName={this.state.variableName}
				/>
				<PageWrapper mediaMargin="0" mediaWidth="100%">
					<PageBody mediaWidth="100%">
						<PageToolbar borderBottom="1px solid #e0e1e7">
							<ToolbarItems>
								<LeftItemH1>PaymentTerms</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="right">
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									onClick={this.onOpenCreatePaymentTermModal}
								>
									<FontAwsomeIcon className="fa fa-plus" />
									Add Payment Term
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
										checked={this.state.activePaymentTerms}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activePaymentTerms',
													value: !this.state.activePaymentTerms
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active PaymentTerms</CheckBoxLabel>
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
														<TableHeaders width="20%">
															<SelectIconContainer
																style={{
																	justifyContent: 'initial'
																}}
															>
																<SelectSpan> Name</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="20%">
															<SelectIconContainer
																style={{
																	justifyContent: 'initial'
																}}
															>
																<SelectSpan>Duration(Days)</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="20%">
															<SelectIconContainer
															// style={{
															// 	justifyContent: 'initial'
															// }}
															>
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
													{this.renderPaymentTerms()}
												</TableBody>
											</BodyTable>
											{this.state.paymentTerms.length === 0 ? (
												<EmptyRowImageContainer>
													<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
													<EmptyRowTag>No PaymentTerm</EmptyRowTag>
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

export default connect(mapStateToProps, { clearErrors, getVariables })(PaymentTerms);

export const FontAwsomeIcon = styled.i`margin-right: 5px;`;
