import React from 'react';
import styled from 'styled-components';
import { getTypeDetails } from '../../../redux/actions/product';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
class Stock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keys: new Map(),
			key: new Map([
				[ 'location', '' ],
				[ 'bin', '' ],
				[ 'stockValue', '' ],
				[ 'allocated', '' ],
				[ 'available', '' ],
				[ 'batch', '' ],
				[ 'expiryDate', '' ],
				[ 'nextDelivery', '' ],
				[ 'onHand', '' ],
				[ 'onOrder', '' ]
			]),
			type: '',
			counter: 0
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	// componentDidMount() {
	// 	this.props.getTypeDetails('CustomPrice');
	// }

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	return {
	// 		...prevState,
	// 		type: nextProps.type[0]
	// 	};
	// }
	mapToObjectRec = (m) => {
		let lo = {};
		for (let [ k, v ] of m) {
			if (v instanceof Map) {
				lo[k] = this.mapToObjectRec(v);
			} else {
				lo[k] = v;
			}
		}
		return lo;
	};

	saveStock() {
		this.props.sendData(this.mapToObjectRec(this.state.keys));
	}
	addListVariable() {
		const addkey = cloneDeep(this.state.keys);
		addkey.set(this.state.counter, this.state.key);
		this.setState({
			keys: addkey
		});
		this.setState((prevState) => {
			return { counter: prevState.counter + 1 };
		});
	}
	renderInputFields() {
		const rows = [];
		if (this.state.keys.size === 0) {
			return (
				<TableRow>
					<TableHeader width="58px" />
					<TableHeader width="168px" />
					<TableHeader width="168px" />
					<TableHeader width="168px" />
					<TableHeader width="167px" />
					<TableHeader width="167px" />
					<TableHeader width="58px" />
					<TableHeader width="58px" />
					<TableHeader width="58px" />
					<TableHeader width="58px" />
				</TableRow>
			);
		} else {
			for (let key of this.state.keys) {
				rows.push(
					<TableRow key={key[0]}>
						<TableHeader width="5%" left="0px">
							{' '}
						</TableHeader>
						<TableHeader width="10%" left="7%">
							<Input
								name="location"
								type="text"
								placeholder="default"
								value={key[1].get('location')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('location', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="8%" left="15%">
							<Input
								name="bin"
								type="text"
								placeholder="bin"
								value={key[1].get('bin')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('bin', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="8%" left="23%">
							<Input
								name="batch"
								type="Decimal"
								placeholder="batch"
								value={key[1].get('batch')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('batch', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="8%" left="34%">
							<Input
								name="expiryDate"
								type="text"
								placeholder="expiryDate"
								value={key[1].get('expiryDate')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('expiryDate', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="8%" left="43%">
							<Input
								name="stockValue"
								type="decimal"
								placeholder="stockValue"
								value={key[1].get('stockValue')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('stockValue', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="8%" left="50%">
							<Input
								name="onHand"
								type="number"
								placeholder="Unit"
								value={key[1].get('onHand')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('onHand', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="8%" left="59%">
							<Input
								name="available"
								type="decimal"
								placeholder="available"
								value={key[1].get('available')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('available', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="9%" left="69%">
							<Input
								name="onOrder"
								type="number"
								placeholder="Unit"
								value={key[1].get('onOrder')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('onOrder', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="10%" left="78%">
							<Input
								name="allocated"
								type="number"
								placeholder="Unit"
								value={key[1].get('allocated')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('allocated', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
						<TableHeader width="10%" left="90%">
							<Input
								name="nextDelivery"
								type="number"
								placeholder="Unit"
								value={key[1].get('nextDelivery')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('nextDelivery', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
						</TableHeader>
					</TableRow>
				);
			}
			return rows;
		}
	}
	render() {
		return (
			<PageBlock id="stock">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>Stock</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<PageBar>
					<PageBarAlignLeft>
						<FormControl>
							<Input placeholder="Type text to search" />
						</FormControl>
						<FormControl>
							<ButtonWithOutline>Search</ButtonWithOutline>
						</FormControl>
					</PageBarAlignLeft>
				</PageBar>
				<InputBody borderTop="0">
					<RoundedBlock>
						<TableFieldContainer>
							<Headers>
								<HeaderContainer>
									<HeaderContainerInner>
										<ColumnName width="5%" left="0px">
											<SelectIconContainer>
												<SelectSpan>
													<SelectSpanInner>
														<i className="large material-icons">create</i>
													</SelectSpanInner>
												</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="5%">
											<SelectIconContainer>
												<SelectSpan>Location</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="8%" left="15%">
											<SelectIconContainer>
												<SelectSpan>Bin</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="8%" left="23%">
											<SelectIconContainer>
												<SelectSpan textAlign="right">Batch</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="8%" left="34%">
											<SelectIconContainer>
												<SelectSpan>Expiery Date</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="8%" left="43%">
											<SelectIconContainer>
												<SelectSpan>Stock Value</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="8%" left="50%">
											<SelectIconContainer>
												<SelectSpan>On Hand</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="9%" left="59%">
											<SelectIconContainer>
												<SelectSpan>Available</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="9%" left="69%">
											<SelectIconContainer>
												<SelectSpan>On Order</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="78%">
											<SelectIconContainer>
												<SelectSpan>Allocated</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="90%">
											<SelectIconContainer>
												<SelectSpan>Net Delivery</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
									</HeaderContainerInner>
								</HeaderContainer>
							</Headers>
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable>
										<TableBody>{this.renderInputFields()}</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.keys.size === 0 ? (
									<EmptyRow>You do not have any product matching the criteria</EmptyRow>
								) : (
									undefined
								)}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addListVariable()}>
									<i className="large material-icons">add</i>Add More Items
								</AddMoreButton>
							</AddMoreBlock>
						</TableFieldContainer>
					</RoundedBlock>
				</InputBody>
				<button onClick={(e) => this.saveStock()}>save</button>
			</PageBlock>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	type: state.type
});

export default connect(mapStateToProps, {
	getTypeDetails
})(Stock);
const AddMoreBlock = styled.div`
	flex-flow: row wrap;
	display: flex;
	width: 100%;
	padding: 16px 20px;
	align-items: center;
	justify-content: inherit !important;
`;
const AddMoreButton = styled.button`
	background-color: transparent;
	color: #05cbbf;
	border-color: transparent;
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
	background: transparent;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	&:hover {
		outline: none;
	}
`;
const PageBlock = styled.div`
	display: none;
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

const PageToolbar = styled.div`
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 16px 20px;
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
	font-weight: bold;
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

const InputBody = styled.div.attrs((props) => ({
	alignitem: props.alignItem || 'start',
	borderTop: props.borderTop || '1px solid #e0e1e7'
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
	padding: 20px 20px 0 20px;
	padding-bottom: 20px !important;
`;

const FormControl = styled.div`
	padding-bottom: 20px;
	min-height: 60px;
	position: relative;
	display: flex;
	align-items: start;
	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
}
`;

const Input = styled.input`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
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


const PageBar = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	border-top: 1px solid #e0e1e7;
`;
const PageBarAlignLeft = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;


const RoundedBlock = styled.div.attrs((props) => ({
	marginTop: props.marginTop || '0'
}))`
	border: 1px solid #b9bdce;
	border-radius: 4px;
	width: 100%;
	float: left;
	overflow: hidden;
	margin-top:${(props) => props.marginTop};
`;
const TableFieldContainer = styled.div`
	width: 100% !important;
	min-height: auto !important;
	text-align: center;
	position: relative !important;
	top: 0 !important;
	height: inherit !important;
	float: left;
	overflow: hidden !important;
`;
const Headers = styled.div`
	border-width: 0px;
	width: 100%;
	left: 0px;
	top: 0px;
	border-top: 0 !important;
	zoom: 1;
	cursor: default;
	background-color: #fff;
	border-bottom: 1px solid #e7e8ec !important;
	border-top: 1px solid #e7e8ec !important;
	height: 60px;
	overflow: hidden;
`;
const HeaderContainer = styled.div`
	width: 100%;
	height: 100% !important;
	overflow: hidden;
	zoom: 1;
	position: relative;
	left: 0;
	top: 0;
`;

const HeaderContainerInner = styled.div`
	position: absolute;
	left: 0px;
	top: 0px;
	height: 100% !important;
	width: 100% !important;
`;
const ColumnName = styled.div.attrs((props) => ({
	width: props.width,
	left: props.left
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
	border-width: 1px;    
    height: auto;
    margin: 0px;
    top: 0px;
   font-size: 11px;
    font-weight: bold;
    font-family: inherit;
    color: #707887;
    text-transform: uppercase;
    letter-spacing: -0.4px;
    vertical-align: middle;
    position: absolute;
    bottom: 0; 

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
	height: auto;
	height: inherit !important;
	float: left;
	height: auto !important;
	position: relative;
	top: 0 !important;
	left: 0 !important;
	overflow: hidden;
`;
const HeaderBody = styled.div`
	border-width: 0px;
	overflow: auto;
	margin: 0px;
	width: 1158px;
`;
const BodyTable = styled.table`
	width: 100%;
	height: 1px;
	table-layout: fixed;
	border-collapse: separate;
	border-collapse: collapse;
	border-spacing: 0;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const TableHeader = styled.th.attrs((props) => ({
	width: props.width,
	height: props.height || '0',
	left: props.left || '0'
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
`;

const EmptyRow = styled.div`
	text-align: center;
	border-bottom: 1px solid #e7e8ec;
	min-height: 59px !important;
	line-height: 55px;
`;

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

