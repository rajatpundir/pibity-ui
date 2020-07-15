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
				['name','']
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
							<TableHeaderInner>
							<Input
								name="name"
								type="text"
								placeholder=""
								value={key[1].get('name')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('name', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
							</TableHeaderInner>
							
						</TableHeader>
						<TableHeader width="10%" left="16%">
							<TableHeaderInner>
							<Input
								name="line1"
								type="text"
								placeholder=""
								value={key[1].get('line1')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('line1', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
							</TableHeaderInner>
							
						</TableHeader>
						<TableHeader width="8%" left="25%">
							<TableHeaderInner>
							<Input
								name="line2"
								type="text"
								placeholder="line2"
								value={key[1].get('line2')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('line2', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
							</TableHeaderInner>
							
						</TableHeader>
						<TableHeader width="8%" left="37%">
							<TableHeaderInner>
							<Input
								name="city"
								type="text"
								placeholder="city"
								value={key[1].get('city')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('city', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
							</TableHeaderInner>
						
						</TableHeader>
						<TableHeader width="8%" left="50%">
							<TableHeaderInner>
							<Input
								name="state"
								type="text"
								placeholder="state"
								value={key[1].get('state')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('state', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
							</TableHeaderInner>
							
						</TableHeader>
                        <TableHeader width="8%" left="62%">
							<TableHeaderInner>
							<Input
								name="postCode"
								type="text"
								placeholder="postCode"
								value={key[1].get('postCode')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('postCode', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
							</TableHeaderInner>

						</TableHeader>
                        <TableHeader width="8%" left="75%">
							<TableHeaderInner>
							<Input
								name="country"
								type="text"
								placeholder="Default"
								value={key[1].get('country')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('country', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
							</TableHeaderInner>
							
							
						</TableHeader>
                        <TableHeader width="10%" left="86%">
							<TableHeaderInner>
							<Input
								name="type"
								type="text"
								placeholder="type"
								value={key[1].get('type')}
								onChange={(e) => {
									const keys = cloneDeep(this.state.keys);
									keys.get(key[0]).set('type', e.target.value);
									this.setState({ keys: keys });
								}}
							/>
							</TableHeaderInner>
							
						</TableHeader>
					</TableRow>
				);
			}
			return rows;
		}
	}
	render() {
		return (
			<PageBlock id="address" >
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
							<Headers>
								<HeaderContainer>
									<HeaderContainerInner>
										<ColumnName width="6%" left="0px">
											<SelectIconContainer>
												<SelectSpan>
													<SelectSpanInner>
														<i className="large material-icons">create</i>
													</SelectSpanInner>
												</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="7%">
											<SelectIconContainer>
												<SelectSpan>Name</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="16%">
											<SelectIconContainer>
												<SelectSpan>Line 1</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="25%">
											<SelectIconContainer>
												<SelectSpan textAlign="right">Line 2</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="37%">
											<SelectIconContainer>
												<SelectSpan>City / Suburb</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="12%" left="50%">
											<SelectIconContainer>
												<SelectSpan> State / Province</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="11%" left="62%">
											<SelectIconContainer>
												<SelectSpan>PostCode</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="75%">
											<SelectIconContainer>
												<SelectSpan>Country</SelectSpan>
											</SelectIconContainer>
										</ColumnName>
										<ColumnName width="10%" left="86%">
											<SelectIconContainer>
												<SelectSpan>Type</SelectSpan>
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
const Headers = styled.div`
	border-width: 0px;
	width: 90%;
	left: 0px;
	top: 0px;
	border-top: 0 !important;
	zoom: 1;
	cursor: default;
	background-color: #fff;
	border-bottom: 1px solid #e7e8ec !important;
	height: 60px;
	overflow: hidden;
`;
const HeaderContainer = styled.div`
	width: 90%;
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
// const TableHeader = styled.th.attrs((props) => ({
// 	width: props.width,
// 	height: props.height || '0',
// 	left: props.left || '0'
// }))`
// width: ${(props) => props.width};
// left:${(props) => props.left};
// `;

const TableHeader=styled.td`

font-family: inherit;
vertical-align: middle;
border-bottom: 1px solid #e7e8ec;
overflow: hidden;
padding: 5px 0;
height: 60px;
float: none !important;
`

const TableHeaderInner=styled.div`




    padding: 0 10px;
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
