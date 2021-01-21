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
import LocationModal from '../Modal/LocationModal';

class Locations extends React.Component {
	constructor(props) {
		super();
		this.state = {
			locations: [],
			isOpen: false,
			isCreateLocationModalOpen: false,
			activelocations: false,
			variableName: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onUpdateLocation = this.onUpdateLocation.bind(this);
		this.onCloseCreateLocationModal = this.onCloseCreateLocationModal.bind(this);
		this.onOpenCreateLocationModal = this.onOpenCreateLocationModal.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			this.props.clearErrors();
			this.props.getVariables('Location');
			this.props.getVariables('Country');
			this.props.getVariables('Status');
		}
	}

	onClose() {
		this.setState({
			isOpen: false
		});
		this.props.clearErrors();
		this.props.getVariables('Location');
	}

	onRefresh() {
		this.props.getVariables('Location');
	}

	onUpdateLocation(e, variableName) {
		this.setState({ variableName: variableName }, () => {
			this.onOpenCreateLocationModal();
		});
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			locations:
				nextProps.variables !== undefined
					? nextProps.variables.Location !== undefined ? nextProps.variables.Location : []
					: []
		};
	}

	renderLocations() {
		const rows = [];
		const list = this.state.activelocations
			? this.state.locations.filter((location) => location.values.status === 'Active')
			: this.state.locations;
		list.forEach((location) => {
			rows.push(
				<TableRow key={location.variableName}>
					<TableData left="0px" />
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
							onClick={(e) => this.onUpdateLocation(e, location.variableName)}
						>
							{location.variableName}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{location.values.address.values.line1 + ' ' + location.values.address.values.line2}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{location.values.address.values.city}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{location.values.address.values.state}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								marginLeft: '5px'
							}}
						>
							{location.values.address.values.country}
						</TableHeaderInner>
					</TableData>
					<TableData>
						<StatusSpan
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
							backgroundColor={
								location.values.status === 'Active' ? (
									StatusBackgroundColor.active
								) : (
									StatusBackgroundColor.depricated
								)
							}
						>
							{location.values.status}
						</StatusSpan>
					</TableData>
					<TableData left="0px">
						<i
							name={location.variableName}
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

	onOpenCreateLocationModal() {
		this.setState({ isCreateLocationModalOpen: true });
	}

	onCloseCreateLocationModal() {
		this.setState({
			isCreateLocationModalOpen: false,
			variableName: ''
		});
	}

	render() {
		return (
			<Container mediaPadding="0" backgroundColor="white">
				<CustomNotification limit={3} />
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onRefresh} />
				<LocationModal
					onClose={this.onCloseCreateLocationModal}
					isOpen={this.state.isCreateLocationModalOpen}
					variableName={this.state.variableName}
				/>
				<PageWrapper mediaMargin="0" mediaWidth="100%">
					<PageBody mediaWidth="100%">
						<PageToolbar borderBottom="1px solid #e0e1e7">
							<ToolbarItems>
								<LeftItemH1>Locations</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="right">
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									onClick={this.onOpenCreateLocationModal}
								>
									<FontAwsomeIcon className="fa fa-plus" />
									Add Location
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
										checked={this.state.activelocations}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activelocations',
													value: !this.state.activelocations
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active locations</CheckBoxLabel>
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
															<SelectIconContainer>
																<SelectSpan>Address</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>City</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>State</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="15%">
															<SelectIconContainer>
																<SelectSpan>Country</SelectSpan>
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
													{this.renderLocations()}
												</TableBody>
											</BodyTable>
											{this.state.locations.length === 0 ? (
												<EmptyRowImageContainer>
													<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
													<EmptyRowTag>No Locations Available</EmptyRowTag>
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

export default connect(mapStateToProps, { clearErrors, getVariables })(Locations);

export const FontAwsomeIcon = styled.i`margin-right: 5px;`;
