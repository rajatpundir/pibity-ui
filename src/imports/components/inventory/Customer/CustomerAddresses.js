import React from 'react';
import styled from 'styled-components';
import { getTypeDetails } from '../../../redux/actions/product';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
class CustomerAddresses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keys: new Map(),
			key: new Map([
				[ 'city', '' ],
				[ 'country', '' ],
				[ 'line1', '' ],
				[ 'line2', '' ],
				[ 'postCode', '' ],
				[ 'state', '' ],
				[ 'type', '' ],
				[ 'name', '' ]
			]),
			type: '',
			counter: 0
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

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

	saveAddress() {
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

	onRemoveKey(e,key) {
		let keys = cloneDeep(this.state.keys);
	    keys.delete(key)
		this.setState({ keys: keys });
	}

	renderInputFields() {
		const rows = [];
		if (this.state.keys.size === 0) {
			return <tr />;
		} else {
			for (let key of this.state.keys) {
				rows.push(
					<TableRow key={key[0]}>
						<TableData width="5%" left="0px">
							{this.state.keys.has(key[0]) ? (
								<i name={key[0]} className="large material-icons" onClick={(e) => this.onRemoveKey(e,key[0])}>
									remove_circle_outline
								</i>
							) : null}{' '}
						</TableData>
						<TableData width="10%" left="7%">
							<TableHeaderInner>
								<Input
									name="name"
									type="text"
									value={key[1].get('name')}
									onChange={(e) => {
										const keys = cloneDeep(this.state.keys);
										keys.get(key[0]).set('name', e.target.value);
										this.setState({ keys: keys });
									}}
								/>
							</TableHeaderInner>
						</TableData>
						<TableData width="10%" left="16%">
							<TableHeaderInner>
								<Input
									name="line1"
									type="text"
									value={key[1].get('line1')}
									onChange={(e) => {
										const keys = cloneDeep(this.state.keys);
										keys.get(key[0]).set('line1', e.target.value);
										this.setState({ keys: keys });
									}}
								/>
							</TableHeaderInner>
						</TableData>
						<TableData width="8%" left="25%">
							<TableHeaderInner>
								<Input
									name="line2"
									type="text"
									value={key[1].get('line2')}
									onChange={(e) => {
										const keys = cloneDeep(this.state.keys);
										keys.get(key[0]).set('line2', e.target.value);
										this.setState({ keys: keys });
									}}
								/>
							</TableHeaderInner>
						</TableData>
						<TableData width="8%" left="37%">
							<TableHeaderInner>
								<Input
									name="city"
									type="text"
									value={key[1].get('city')}
									onChange={(e) => {
										const keys = cloneDeep(this.state.keys);
										keys.get(key[0]).set('city', e.target.value);
										this.setState({ keys: keys });
									}}
								/>
							</TableHeaderInner>
						</TableData>
						<TableData width="8%" left="50%">
							<TableHeaderInner>
								<Input
									name="state"
									type="text"
									value={key[1].get('state')}
									onChange={(e) => {
										const keys = cloneDeep(this.state.keys);
										keys.get(key[0]).set('state', e.target.value);
										this.setState({ keys: keys });
									}}
								/>
							</TableHeaderInner>
						</TableData>
						<TableData width="8%" left="62%">
							<TableHeaderInner>
								<Input
									name="postCode"
									type="number"
									value={key[1].get('postCode')}
									onChange={(e) => {
										const keys = cloneDeep(this.state.keys);
										keys.get(key[0]).set('postCode', e.target.value);
										this.setState({ keys: keys });
									}}
								/>
							</TableHeaderInner>
						</TableData>
						<TableData width="8%" left="75%">
							<TableHeaderInner>
								<Input
									name="country"
									type="text"
									list="country"
									value={key[1].get('country')}
									onChange={(e) => {
										const keys = cloneDeep(this.state.keys);
										keys.get(key[0]).set('country', e.target.value);
										this.setState({ keys: keys });
									}}
								/>
								<datalist id="country">
									{this.props.country !== undefined ? (
										this.props.country.map((item) => (
											<option key={item.variableName} value={item.variableName} />
										))
									) : null}
								</datalist>
							</TableHeaderInner>
						</TableData>
						<TableData width="10%" left="86%">
							<TableHeaderInner>
								<Input
									name="type"
									type="text"
									list="addressType"
									value={key[1].get('type')}
									onChange={(e) => {
										const keys = cloneDeep(this.state.keys);
										keys.get(key[0]).set('type', e.target.value);
										this.setState({ keys: keys });
									}}
								/>
								<datalist id="addressType">
									{this.props.addressType !== undefined ? (
										this.props.addressType.map((item) => (
											<option key={item.variableName} value={item.variableName} />
										))
									) : null}
								</datalist>
							</TableHeaderInner>
						</TableData>
					</TableRow>
				);
			}
			return rows;
		}
	}
	render() {
		return (
			<PageBlock id="address">
				<PageBar>
					<PageBarAlignLeft>
						<PlusButton onClick={(e) => this.addListVariable()}>
							<i className="large material-icons">add</i>
						</PlusButton>
					</PageBarAlignLeft>
				</PageBar>
				<InputBody borderTop="0">
					<RoundedBlock>
						<TableFieldContainer>
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable>
										<TableBody>
											<TableRow>
												<TableHeaders width="6%" left="0px">
													<SelectIconContainer>
														<SelectSpan>
															<SelectSpanInner>
																<i className="large material-icons">create</i>
															</SelectSpanInner>
														</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="7%">
													<SelectIconContainer>
														<SelectSpan>Name</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="16%">
													<SelectIconContainer>
														<SelectSpan>Line 1</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="25%">
													<SelectIconContainer>
														<SelectSpan textAlign="right">Line 2</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="37%">
													<SelectIconContainer>
														<SelectSpan>City / Suburb</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="12%" left="50%">
													<SelectIconContainer>
														<SelectSpan> State / Province</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="11%" left="62%">
													<SelectIconContainer>
														<SelectSpan>PostCode</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="75%">
													<SelectIconContainer>
														<SelectSpan>Country</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="86%">
													<SelectIconContainer>
														<SelectSpan>Type</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
											</TableRow>
											{this.renderInputFields()}
										</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.keys.size === 0 ? <EmptyRow>No Addresses found.</EmptyRow> : undefined}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addListVariable()}>
									<i className="large material-icons">add</i>Add More Addresess
								</AddMoreButton>
							</AddMoreBlock>
						</TableFieldContainer>
					</RoundedBlock>
				</InputBody>
				<button onClick={(e) => this.saveAddress()}>save</button>
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
})(CustomerAddresses);
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

const Input = styled.input`
	width: inherit;
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
    width:100%;
    padding: 0 3px;
    color: #41454e;
    vertical-align: middle;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
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
