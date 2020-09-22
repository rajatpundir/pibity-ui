import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
class CustomerList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			customer: [],
			expandedRows : [],
			activeCustomerOnly: false
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	componentDidMount() {
		this.props.clearErrors();
		this.props.getVariables('Customer');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			customer:
				nextProps.variables !== undefined
					? nextProps.variables.Customer !== undefined
						? nextProps.variables.Customer.map((x, i) => ({ ...x, Id: i }))
						: []
					: []
		};
	}


	renderInputFields() {
		const rows = [];
		const list = this.state.activeCustomerOnly
			? this.state.customer.filter((customer) => customer.values.general.values.status === 'Active')
			: this.state.customer;
		list.forEach((customer) =>{
			rows.push(

				<TableRow onClick={this.handleRowClick} key={customer.variableName} 
				>
					<TableData width="5%" />
					<TableData width="10%">
						<TableHeaderInner>
							<Link to={'/customer/' + encodeURIComponent( customer.variableName)}>{customer.variableName}</Link>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{customer.values.contacts[0].values.name}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Anchor href={'tel:' + customer.values.contacts[0].values.phone}>
								{customer.values.contacts[0].values.phone}
							</Anchor>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Anchor href={'mailto:' + customer.values.contacts[0].values.email} target="_blank">
								{customer.values.contacts[0].values.email}
							</Anchor>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Anchor href={customer.values.contacts[0].values.website} target="_blank">
								{customer.values.contacts[0].values.website}
							</Anchor>
						</TableHeaderInner>
					</TableData>
					<TableData width="20%">
						<TableHeaderInner>
							{customer.values.addresses[0] !== undefined ? (
								customer.values.addresses[0].values.line1 || 'no address found'
							) : (
								'no address found'
							)}
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>0.00</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Span>{customer.values.general.values.status}</Span>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							{customer.values.general.values.onCreditHold === false ? 'NO' : 'Yes'}
						</TableHeaderInner>
					</TableData>
				</TableRow>
			)		
		}
		);

		return rows;
	}

	render() {
		return (
			<Container>
				<PageWrapper>
					<PageBody>
						<PageToolbar>
							<ToolbarLeftItems>
								<LeftItemH1>Customer</LeftItemH1>
							</ToolbarLeftItems>
						</PageToolbar>
						<PageToolbar padding="6px 0 !important">
							<PageBarAlign padding="10px 20px" float="left">
								<LeftItemFormControl paddingBottom="0">
									<Input
										width="250px"
										height="32px"
										padding="0 10px"
										placeholder="Type text to search"
									/>
								</LeftItemFormControl>
								<LeftItemFormControl paddingBottom="0">
									<ButtonWithOutline>Search</ButtonWithOutline>
								</LeftItemFormControl>
							</PageBarAlign>
							<PageBarAlign padding="10px 20px" float="left">
								<CheckBoxContainer>
									<CheckBoxInput
										type="checkbox"
										checked={this.state.activeCustomerOnly}
										tabindex="55"
										onChange={(option) => {
											this.onChange({
												target: {
													name: 'activeCustomerOnly',
													value: !this.state.activeCustomerOnly
												}
											});
										}}
									/>
									<CheckBoxLabel>Only active customers</CheckBoxLabel>
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
													<TableRow>
														<TableHeaders width="5%">
															<SelectIconContainer>
																<SelectSpan>
																	<SelectSpanInner>
																		<i className="large material-icons">create</i>
																	</SelectSpanInner>
																</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Name</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Contact</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan textAlign="right">Phone</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Email</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="12%">
															<SelectIconContainer>
																<SelectSpan>Website</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="20%">
															<SelectIconContainer>
																<SelectSpan>Address</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Due</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>Status</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
														<TableHeaders width="10%">
															<SelectIconContainer>
																<SelectSpan>On Credit Hold</SelectSpan>
															</SelectIconContainer>
														</TableHeaders>
													</TableRow>
													{/* <TableRow>
														<HiddenTableData>
															<DataContainer>
																<TableDiv>
																	<RowContainer>
																		<Row>
																			<LeftItem>contact</LeftItem>
																			<RightItem>shubham</RightItem>
																		</Row>
																		<Row>
																			<LeftItem>mobile</LeftItem>
																			<RightItem>shubham</RightItem>
																		</Row>
																	</RowContainer>
																</TableDiv>
															</DataContainer>
														</HiddenTableData>
													</TableRow> */}
													{this.renderInputFields()}
												</TableBody>
											</BodyTable>
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
	variables: state.variables
});

export default connect(mapStateToProps, { clearErrors, getVariables })(CustomerList);

const DataContainer = styled.div`
	height: auto;
	max-height: 100vh;
	text-align: left;
	font-size: 13px;
	width: 100%;
	float: left;
	overflow: hidden;
	animation-name: slideDown;
	animation-duration: 0.8s;
	animation-timing-function: ease-in-out;
`;
const TableDiv = styled.div`display: table;`;
const RowContainer = styled.div`display: table-row-group;`;
const Row = styled.div`display: table-row;`;
const LeftItem = styled.div`
	display: table-cell;
	font-weight: bold;
	text-align: left;
	padding: 10px 20px;
	width: 250px;
`;
const RightItem = styled.div`
	display: table-cell;
	text-align: left;
	padding: 10px 20px;
	width: 250px;
`;

//different Style
const Container = styled.div`
	min-height: 100vh;
	margin-top:65px;
	padding: 0;
	width: 100%;
	min-width: 860px;
	border-radius: 6px;
	border-left: 1px solid;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	@media (max-width: 1200px) {
		flex-direction: column !important;
	}
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;
// padding: 20px 20px 0 20px !important;

const PageToolbar = styled.div.attrs((props) => ({
	padding: props.padding || '16px 20px'
}))`
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
    padding: ${(props) => props.padding};
    align-items: center;
    border-bottom: 1px solid #e0e1e7;

`;

const ToolbarLeftItems = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;
const LeftItemH1 = styled.h1`
	font-size: 16px;
	text-transform: uppercase;
	font-weight: bolder;
	padding-right: 20px;
	display: flex;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
`;

const LeftItemFormControl = styled.div`
	position: relative;
	display: flex;
	align-items: start;
`;

//can be used for both left and right
const PageBarAlign = styled.div.attrs((props) => ({
	padding: props.padding || '0',
	float: props.float
}))`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: ${(props) => props.float};
    padding: ${(props) => props.padding};
`;

// const PageBarAlignRight = styled.div`
// 	display: flex;
// 	justify-content: flex-end !important;
// 	align-items: center;
// 	float: right;
// `;

const ButtonWithOutline = styled.button`
	background-color: transparent !important;
	color: #05cbbf;
	border-color: #05cbbf;
	margin-left: 5px;
	min-width: 70px;
	padding: 0 10px;
	height: 32px !important;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	align-self: center;
	white-space: nowrap;
	border-radius: 4px;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
`;

const PageWrapper = styled.div`
	 flex: 1;
    overflow: hidde
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	@media (min-width: 1201px) {
		width: 75%;

	}
`;

const PageBody = styled.div`
	margin: 0 auto !important;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: "IBM Plex Sans", sans-serif;
	vertical-align: baseline;
	@media (min-width: 1440px) {
		max-width: 1200px;
	}
`;

const PageBlock = styled.div`
	display: block;
	background: #fff;
	width: 100%;
	float: left;
	border-radius: 6px;
	margin-bottom: 20px;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	align-items: center;
`;

const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7',
	padding: props.padding || '20px 20px 0 20px'
}))`
align-items: ${(props) => props.alignItem};
	max-height: 4000px;
	overflow: hidden;
	animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	-webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	border-top:  ${(props) => props.borderTop};
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: ${(props) => props.padding};
`;
const SelectWrapper = styled.div`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-radius: 4px;
	border-color: #b9bdce;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	min-width: 100px;
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;
const Input = styled.input.attrs((props) => ({
	width: props.width || 'inherit',
	height: props.height || '40px',
	padding: props.padding || '11px 10px 10px 10px'
}))`
	width: ${(props) => props.width};
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	padding: ${(props) => props.padding};
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	flex: 1;

	min-height: ${(props) => props.height};
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;

const PageBar = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	border-top: 1px solid #e0e1e7;
`;

const RoundedBlock = styled.div.attrs((props) => ({
	marginTop: props.marginTop || '0',
	border: props.border || '1px solid #b9bdce'
}))`
	border: ${(props) => props.border};
	border-radius: 4px;
	width: 100%;
	float: left;
	overflow: hidden;
	margin-top:${(props) => props.marginTop};
`;

// float: left;
const TableFieldContainer = styled.div`
	position: relative;
	width: 100% !important;
	overflow: hidden;

	min-height: auto !important;
	text-align: center;
	top: 0 !important;
	height: inherit !important;
`;

const SelectIconContainer = styled.div`
	justify-content: center;
	padding: 0 10px !important;

	font-weight: bold;
	font-size: 11px;
	text-transform: uppercase;
	height: 100% !important;
	display: flex;
	align-self: stretch;
	width: 100%;
`;
const SelectSpan = styled.span.attrs((props) => ({
	textAlign: props.textAlign || 'left'
}))`
	display: flex;
	align-items: center;
	overflow: hidden;
	text-align: ${(props) => props.textAlign};
	cursor: pointer;
`;
const SelectSpanInner = styled.span`white-space: nowrap;`;

const HeaderBodyContainer = styled.div`
	width: 100%;
	height: inherit !important;
	float: left;
	position: relative;
	top: 0 !important;
	left: 0 !important;
	overflow: hidden;
`;
const HeaderBody = styled.div`
	border-width: 0px;
	overflow: auto;
	margin: 0px;
	width: 100%;
`;
const BodyTable = styled.table`
	width: 100%;
	height: 1px;
	table-layout: fixed;
	border-collapse: separate;
	border-spacing: 0;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: #f0f3fa;
	}
`;

const TableHeaders = styled.th.attrs((props) => ({
	width: props.width,
	left: props.left || '0'
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	overflow: hidden;
	padding: 5px 0;
	height: 60px;
	float: none !important;
	&:hover{
		border-right: 1px solid #e0e1e7;
		border-left: 1px solid #e0e1e7;
		background-color:none;

	}
`;

const HiddenTableData = styled.div`
	background: #fafbfd;
	border-bottom: 1px solid #e7e8ec;
	color: #707887;
	width: max-content;
`;

const TableData = styled.td`
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	overflow: hidden;
	padding: 5px 0;
	height: 60px;
	float: none !important;
`;

const TableHeaderInner = styled.div`
	width: 100%;
	padding: 0 3px;
	color: #41454e;
	vertical-align: middle;
	font-size: 13px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
`;
const Span = styled.span`
	background-color: #d6f3e3;
	margin-right: 0 !important;
	padding: 4px 10px 4px 10px;
	border-radius: 3px;
	display: inline-block;
	font-weight: 500;
`;

const Anchor = styled.a`
	text-decoration: none;
	color: #05cbbf;
`;

const EmptyRow = styled.div`
	text-align: center;
	border-bottom: 1px solid #e7e8ec;
	min-height: 59px !important;
	line-height: 55px;
`;

const PlusButton = styled.button`
	margin-left: 5px;
	color: #04beb3;
	background-color: #05cbbf;
	border-color: #05cbbf;
	width: 32px !important;
	min-width: 32px !important;
	max-width: 32px !important;
	justify-content: center;
	padding: 0 !important;
	height: 32px !important;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	flex-direction: row;
	align-items: center;
	background: transparent;
	white-space: nowrap;
	border-radius: 4px;
`;
const CheckBoxWapper = styled.div`
	float: left;
	width: 16px;
`;
const CheckBoxTable = styled.table`
	width: 35% !important;
	table-layout: auto !important;
	border-collapse: inherit !important;
	border-spacing: 0;
`;

const TBody = styled.tbody``;
const TR = styled.tr``;
const TD = styled.td`
	width: 100% !important;
	height: 16px;
	line-height: 1px;
	position: relative;
	font-weight: normal;
	overflow: hidden;
	cursor: pointer;
	vertical-align: top;
	// &:before {
	// 	border-width: 1px;
	// 	border-style: solid;
	// 	border-radius: 4px;
	// 	border-color: #b9bdce;
	// 	content: '';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	-webkit-transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
	// &:after {
	// 	content: '\e81a';
	// 	line-height: 18px;
	// 	font-style: normal;
	// 	color: transparent;
	// 	font-family: 'icons_2019';
	// 	width: 16px;
	// 	height: 16px;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	text-align: center;
	// 	font-size: 21px;
	// 	display: flex;
	// 	background-color: transparent;
	// 	justify-content: center;
	// 	transition: all 0.15s ease-in-out;
	// 	pointer-events: none;
	// }
`;
const CheckBoxInput = styled.input`
	width: 16px;
	height: 16px;
	padding: 0;
	-webkit-appearance: button;
	cursor: pointer;
	font-size: 100%;
	outline: none;
	vertical-align: baseline;
	line-height: normal;
	color: -internal-light-dark-color(buttontext, rgb(170, 170, 170));
	background-color: -internal-light-dark-color(rgb(239, 239, 239), rgb(74, 74, 74));
	border-width: 2px;
	border-style: outset;
	border-color: -internal-light-dark-color(rgb(118, 118, 118), rgb(195, 195, 195));
	border-image: initial;
	user-select: none;
	white-space: pre;
	align-items: flex-start;
	text-align: center;
`;

const CheckBoxLabel = styled.label`padding-left: 5px;`;
const CheckBoxContainer = styled.div`
	margin: 5px 0px;
	align-items: center;
	margin-right: 10px !important;
	position: relative;
	display: flex;
`;
