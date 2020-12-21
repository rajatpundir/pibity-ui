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
import TaxRuleModal from '../Modal/TaxRuleModal';

class TaxRule extends React.Component {
	constructor(props) {
		super();
		this.state = {
			taxRules: [],
			isOpen: false,
			isCreateTaxRuleModalOpen: false,
			activeTaxRules: false,
			variableName: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onUpdateTaxRule = this.onUpdateTaxRule.bind(this);
		this.onCloseCreateTaxRuleModal = this.onCloseCreateTaxRuleModal.bind(this);
		this.onOpenCreateTaxRuleModal = this.onOpenCreateTaxRuleModal.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			this.props.clearErrors();
			this.props.getVariables('TaxRule');
			this.props.getVariables('TaxRuleType');
			this.props.getVariables('Status');
		}
	}

	onClose() {
		this.setState({
			isOpen: false
		});
		this.props.clearErrors();
		this.props.getVariables('TaxRule');
	}

	onRefresh() {
		this.props.getVariables('TaxRule');
	}

	onUpdateTaxRule(e, variableName) {
		this.setState({ variableName: variableName }, () => {
			this.onOpenCreateTaxRuleModal();
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			taxRules:
				nextProps.variables !== undefined
					? nextProps.variables.TaxRule !== undefined ? nextProps.variables.TaxRule : []
					: []
		};
	}

	renderTaxRules() {
		const rows = [];
		const list = this.state.activeTaxRules
			? this.state.taxRules.filter((taxRule) => taxRule.values.status === 'Active')
			: this.state.taxRules;
		list.forEach((taxRule) => {
			rows.push(
				<TableRow key={taxRule.variableName}>
					<TableData left="0px" />
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
							onClick={(e) => this.onUpdateTaxRule(e, taxRule.variableName)}
						>
							{taxRule.variableName}
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
							{taxRule.values.taxPercentage}
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
							{taxRule.values.taxType}
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
							<CheckBoxContainer>
								<CheckBoxInput
									type="checkbox"
									checked={taxRule.values.isTaxForSale}
									tabindex="55"
									readOnly
								/>
							</CheckBoxContainer>
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
							<CheckBoxContainer>
								<CheckBoxInput
									type="checkbox"
									checked={taxRule.values.isTaxForPurchase}
									tabindex="55"
									readOnly
								/>
							</CheckBoxContainer>
						</TableHeaderInner>
					</TableData>
					<TableData>
						<StatusSpan
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
							backgroundColor={
								taxRule.values.status === 'Active' ? (
									StatusBackgroundColor.active
								) : (
									StatusBackgroundColor.depricated
								)
							}
						>
							{taxRule.values.status}
						</StatusSpan>
					</TableData>
					<TableData left="0px">
						<i
							name={taxRule.variableName}
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

	onOpenCreateTaxRuleModal() {
		this.setState({ isCreateTaxRuleModalOpen: true });
	}

	onCloseCreateTaxRuleModal() {
		this.setState({
			isCreateTaxRuleModalOpen: false,
			variableName: ''
		});
	}
	render() {
		return (
			<Container mediaPadding="0" backgroundColor="white">
				<CustomNotification limit={3} />
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onRefresh} />
				<TaxRuleModal
					onClose={this.onCloseCreateTaxRuleModal}
					isOpen={this.state.isCreateTaxRuleModalOpen}
					variableName={this.state.variableName}
				/>
				<PageWrapper mediaMargin="0" mediaWidth="100%">
					<PageBody mediaWidth="100%">
						<PageToolbar borderBottom="1px solid #e0e1e7">
							<ToolbarItems>
								<LeftItemH1>taxRules</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="right">
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									onClick={this.onOpenCreateTaxRuleModal}
								>
									<FontAwsomeIcon className="fa fa-plus" />
									Add Tax Rule
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
										checked={this.state.activeTaxRules}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activeTaxRules',
													value: !this.state.activeTaxRules
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active taxRules</CheckBoxLabel>
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
																<SelectSpan> Name</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer
																style={{
																	justifyContent: 'initial'
																}}
															>
																<SelectSpan>Tax Percentage</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer
																style={{
																	justifyContent: 'initial'
																}}
															>
																<SelectSpan>Tax Type</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer
																style={{
																	justifyContent: 'initial'
																}}
															>
																<SelectSpan>is TaxForSale</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer
																style={{
																	justifyContent: 'initial'
																}}
															>
																<SelectSpan>is TaxForPurchase</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
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
													{this.renderTaxRules()}
												</TableBody>
											</BodyTable>
											{this.state.taxRules.length === 0 ? (
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

export default connect(mapStateToProps, { clearErrors, getVariables })(TaxRule);

export const FontAwsomeIcon = styled.i`margin-right: 5px;`;
