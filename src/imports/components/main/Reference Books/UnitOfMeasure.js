import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import { CustomNotification } from '../../main/Notification';
import SelectorganizationModal from '../../main/Modal/SelectorganizationModal';
import GlobalVariableModal from '../../main/Modal/GlobalVariableModal'
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
	Custombutton
} from '../../../styles/inventory/Style';

class UnitOfMeasure extends React.Component {
	constructor(props) {
		super();
		this.state = {
			unitOfMeasures: [],
			isOpen: false,
			isCreateUnitOfMeasureModalOpen: false
		};
		this.onChange = this.onChange.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onCloseCreateUnitOfMeasureModal = this.onCloseCreateUnitOfMeasureModal.bind(this);
		this.onOpenCreateUnitOfMeasureModal = this.onOpenCreateUnitOfMeasureModal.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount() {
		if (this.props.auth.selectedOrganization === null) {
			this.setState({ isOpen: true });
		} else {
			this.props.clearErrors();
			this.props.getVariables('UnitOfMeasure');
		}
	}

	onClose() {
		this.setState({ isOpen: false });
		this.props.clearErrors();
		this.props.getVariables('UnitOfMeasure');
	}

	onRefresh() {
		this.props.getVariables('UnitOfMeasure');
	}

	onOpenCreateUnitOfMeasureModal() {
		this.setState({ isCreateUnitOfMeasureModalOpen: true });
	}

	onCloseCreateUnitOfMeasureModal() {
		this.setState({ isCreateUnitOfMeasureModalOpen: false });
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			unitOfMeasures:
				nextProps.variables !== undefined
					? nextProps.variables.UnitOfMeasure !== undefined ? nextProps.variables.UnitOfMeasure : []
					: []
		};
	}

	renderProductCategories() {
		const rows = [];
		this.state.unitOfMeasures.forEach((variable) => {
			rows.push(
				<TableRow key={variable.variableName}>
					<TableData left="0px" />
					<TableData>
						<TableHeaderInner
							overflow="hidden"
							style={{
								textAlign: 'initial',
								marginLeft: '5px'
							}}
						>
							{variable.variableName}
						</TableHeaderInner>
					</TableData>
					<TableData left="0px">
						<i
							name={variable.variableName}
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

	render() {
		return (
			<Container mediaPadding="0" backgroundColor="white">
				<CustomNotification limit={3} />
				<SelectorganizationModal isOpen={this.state.isOpen} onClose={this.onRefresh} />
                <GlobalVariableModal
					onClose={this.onCloseCreateUnitOfMeasureModal}
					isOpen={this.state.isCreateUnitOfMeasureModalOpen}
					typeName='UnitOfMeasure'
				/>
				<PageWrapper mediaMargin="0" mediaWidth="100%">
					<PageBody mediaWidth="100%">
						<PageToolbar borderBottom="1px solid #e0e1e7">
							<ToolbarItems>
								<LeftItemH1>Units For Measurement</LeftItemH1>
							</ToolbarItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important" borderBottom="1px solid #e0e1e7">
							<PageBarAlign padding="10px 20px" float="right">
								<Custombutton
									padding="0 10px"
									minWidth="70px"
									height="32px"
									onClick={this.onOpenCreateUnitOfMeasureModal}
								>
									<FontAwsomeIcon className="fa fa-plus" />
									Add Unit For Measurement
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
						</PageToolbar>
						<InputBody borderTop="0" padding="0">
							<RoundedBlock border="none">
								<TableFieldContainer>
									<HeaderBodyContainer>
										<HeaderBody>
											<BodyTable>
												<TableBody>
													<TableRow style={{backgroundColor: '#f3f3f387'}}>
														<TableHeaders width="5%" />
														<TableHeaders width="90%">
															<SelectIconContainer
																style={{
																	justifyContent: 'initial'
																}}
															>
																<SelectSpan> Name</SelectSpan>
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
													{this.renderProductCategories()}
												</TableBody>
											</BodyTable>
											{this.state.unitOfMeasures.length === 0 ? (
												<EmptyRowImageContainer>
													<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
													<EmptyRowTag>No Product Category</EmptyRowTag>
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

export default connect(mapStateToProps, { clearErrors, getVariables })(UnitOfMeasure);

export const FontAwsomeIcon = styled.i`margin-right: 5px;`;
