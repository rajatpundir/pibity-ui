// import React from "react";
// import styled from "styled-components";
// import { connect } from "react-redux";
// import { cloneDeep } from "lodash";
// import { clearErrors } from "../../../redux/actions/errors";
// import { getVariables } from "../../../redux/actions/variables";
// import Select from "react-select";

// class Stock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list: props.list,
//     };
//     this.onChange = this.onChange.bind(this);
//   }

//   // clear form errors
//   componentDidMount() {
//     this.props.clearErrors();
//   }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     return {
//       ...prevState,
//       list: nextProps.list,
//     };
//   }

//   onChange(e, variableName) {
//     const list = cloneDeep(this.state.list).map((listVariable) => {
//       if (listVariable.get("variableName") === variableName) {
//         const values = listVariable.get("values");
//         values.set(e.target.name, e.target.value);
//         listVariable.set("values", values);
//         return listVariable;
//       } else {
//         return listVariable;
//       }
//     });
//     this.setState({ list: list });
//     this.props.updateProductStock(list);
//   }

//   addVariableToList() {
//     const list = cloneDeep(this.state.list);
//     list.unshift(
//       new Map([
//         ["variableName", String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1 ) ],
//         [
//           "values",
//           new Map([
//             ["location", ""],
//             ["bin", ""],
//             ["stockValue", ""],
//             ["allocated", ""],
//             ["available", ""],
//             ["batch", ""],
//             ["expiryDate", ""],
//             ["nextDelivery", ""],
//             ["onHand", ""],
//             ["onOrder", ""],
//           ]),
//         ],
//       ])
//     );
//     this.setState({ list: list });
//     this.props.updateProductStock(list);
//   }

//   onRemoveKey(e, variableName) {
//     const list = cloneDeep(this.state.list).filter((listVariable) => {
//       return listVariable.get("variableName") !== variableName;
//     });
//     this.setState({ list: list });
//     this.props.updateProductStock(list);
//   }

//   renderInputFields() {
//     const rows = [];
//     this.state.list.forEach((listVariable) =>
//       rows.push(
//         <TableRow key={listVariable.get("variableName")}>
//           <TableHeader width="5%" left="0px">
//             <i
//               name={listVariable.get("variableName")}
//               className="large material-icons"
//               onClick={(e) =>
//                 this.onRemoveKey(e, listVariable.get("variableName"))
//               }
//             >
//               remove_circle_outline
//             </i>
//           </TableHeader>
//           <TableHeader width="10%" left="5%">
//             <TableHeaderInner>
//               <SelectWrapper>
//                 <Select
//                   value={{
//                     value: listVariable.get("values").get("location"),
//                     label: listVariable.get("values").get("location"),
//                   }}
//                   onChange={(option) => {
//                     this.onChange(
//                       { target: { name: "location", value: option.value } },
//                       listVariable.get("variableName")
//                     );
//                   }}
//                   options={
//                     this.props.variables.Location !== undefined
//                       ? this.props.variables.Location.map((variable) => {
//                           return {
//                             value: variable.variableName,
//                             label: variable.variableName,
//                           };
//                         })
//                       : []
//                   }
//                 />
//               </SelectWrapper>
//             </TableHeaderInner>
//           </TableHeader>

//           <TableHeader width="8%" left="15%">
//             <TableHeaderInner>
//               <Input
//                 name="bin"
//                 type="text"
//                 value={listVariable.get("values").get("bin")}
//                 onChange={(e) =>
//                   this.onChange(e, listVariable.get("variableName"))
//                 }
//               />
//             </TableHeaderInner>
//           </TableHeader>
//           <TableHeader width="8%" left="23%">
//             <TableHeaderInner>
//               <Input
//                 name="batch"
//                 type="Decimal"
//                 value={listVariable.get("values").get("batch")}
//                 onChange={(e) =>
//                   this.onChange(e, listVariable.get("variableName"))
//                 }
//               />
//             </TableHeaderInner>
//           </TableHeader>
//           <TableHeader width="8%" left="34%">
//             <TableHeaderInner>
//               <Input
//                 name="expiryDate"
//                 type="text"
//                 value={listVariable.get("values").get("expiryDate")}
//                 onChange={(e) =>
//                   this.onChange(e, listVariable.get("variableName"))
//                 }
//               />
//             </TableHeaderInner>
//           </TableHeader>
//           <TableHeader width="8%" left="43%">
//             <TableHeaderInner>
//               <Input
//                 name="stockValue"
//                 type="decimal"
//                 value={listVariable.get("values").get("stockValue")}
//                 onChange={(e) =>
//                   this.onChange(e, listVariable.get("variableName"))
//                 }
//               />
//             </TableHeaderInner>
//           </TableHeader>
//           <TableHeader width="8%" left="50%">
//             <TableHeaderInner>
//               <Input
//                 name="onHand"
//                 type="number"
//                 value={listVariable.get("values").get("onHand")}
//                 onChange={(e) =>
//                   this.onChange(e, listVariable.get("variableName"))
//                 }
//               />
//             </TableHeaderInner>
//           </TableHeader>
//           <TableHeader width="11%" left="59%">
//             <TableHeaderInner>
//               <Input
//                 name="available"
//                 type="decimal"
//                 value={listVariable.get("values").get("available")}
//                 onChange={(e) =>
//                   this.onChange(e, listVariable.get("variableName"))
//                 }
//               />
//             </TableHeaderInner>
//           </TableHeader>
//           <TableHeader width="9%" left="69%">
//             <TableHeaderInner>
//               <Input
//                 name="onOrder"
//                 type="number"
//                 value={listVariable.get("values").get("onOrder")}
//                 onChange={(e) =>
//                   this.onChange(e, listVariable.get("variableName"))
//                 }
//               />
//             </TableHeaderInner>
//           </TableHeader>
//           <TableHeader width="11%" left="78%">
//             <TableHeaderInner>
//               <Input
//                 name="allocated"
//                 type="number"
//                 value={listVariable.get("values").get("allocated")}
//                 onChange={(e) =>
//                   this.onChange(e, listVariable.get("variableName"))
//                 }
//               />
//             </TableHeaderInner>
//           </TableHeader>
//           <TableHeader width="10%" left="90%">
//             <TableHeaderInner>
//               <Input
//                 name="nextDelivery"
//                 type="number"
//                 value={listVariable.get("values").get("nextDelivery")}
//                 onChange={(e) =>
//                   this.onChange(e, listVariable.get("variableName"))
//                 }
//               />
//             </TableHeaderInner>
//           </TableHeader>
//         </TableRow>
//       )
//     );
//     return rows;
//   }

//   render() {
//     return (
// <PageBlock id="price">
// 							<PageToolbar>
// 								<ToolbarLeftItems>
// 									<LeftItemH1>PRICES</LeftItemH1>
// 								</ToolbarLeftItems>
// 							</PageToolbar>
// 							<PageBar>
// 								<PageBarAlignLeft>
// 									<Label>Current Average 0.00000</Label>
// 								</PageBarAlignLeft>
// 							</PageBar>
// 							<InputBody borderTop="0">
// 								<RoundedBlock>
// 									<TableFieldContainer>
// 										<Headers>
// 											<HeaderContainer>
// 												<HeaderContainerInner>
// 													<ColumnName width="58px" left="0">
// 														<SelectIconContainer>
// 															<SelectSpan>
// 																<SelectSpanInner>
// 																	<i className="large material-icons">create</i>
// 																</SelectSpanInner>
// 															</SelectSpan>
// 														</SelectIconContainer>
// 													</ColumnName>
// 													<ColumnName width="267px" left="58px">
// 														<SelectIconContainer>
// 															<SelectSpan>Price Tier</SelectSpan>
// 														</SelectIconContainer>
// 													</ColumnName>
// 													<ColumnName width="100px" left="286px">
// 														<SelectIconContainer>
// 															<SelectSpan textAlign="right">Price</SelectSpan>
// 														</SelectIconContainer>
// 													</ColumnName>
// 													<ColumnName width="100px" left="386px">
// 														<SelectIconContainer>
// 															<SelectSpan>Calculated </SelectSpan>
// 														</SelectIconContainer>
// 													</ColumnName>
// 													<ColumnName width="228px" left="486px">
// 														<SelectIconContainer>
// 															<SelectSpan>Type </SelectSpan>
// 														</SelectIconContainer>
// 													</ColumnName>
// 													<ColumnName width="228px" left="714px">
// 														<SelectIconContainer>
// 															<SelectSpan>Use </SelectSpan>
// 														</SelectIconContainer>
// 													</ColumnName>
// 													<ColumnName width="100px" left="924px">
// 														<SelectIconContainer>
// 															<SelectSpan>Value </SelectSpan>
// 														</SelectIconContainer>
// 													</ColumnName>
// 												</HeaderContainerInner>
// 											</HeaderContainer>
// 										</Headers>
// 									</TableFieldContainer>
// 								</RoundedBlock>
// 							</InputBody>
// 						</PageBlock>

//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => ({
//   errors: state.errors,
//   types: state.types,
//   variables: state.variables,
// });

// export default connect(mapStateToProps, { clearErrors, getVariables })(Stock);

// const Label = styled.div`
// 	float: left;
// 	margin-right: 10px;
// `;
// const RoundedBlock = styled.div.attrs((props) => ({
// 	marginTop: props.marginTop || '0'
// }))`
//   border: 1px solid #b9bdce;
//   border-radius: 4px;
//   width: 100%;
//   float: left;
//   overflow: hidden;
//   margin-top: ${(props) => props.marginTop};
// `;
// const TableFieldContainer = styled.div`
// 	width: 100% !important;
// 	min-height: auto !important;
// 	text-align: center;
// 	position: relative !important;
// 	top: 0 !important;
// 	height: inherit !important;
// 	float: left;
// 	overflow: hidden !important;
// `;
// const Headers = styled.div`
// 	border-width: 0px;
// 	width: 100%;
// 	left: 0px;
// 	top: 0px;
// 	border-top: 0 !important;
// 	zoom: 1;
// 	cursor: default;
// 	background-color: #fff;
// 	border-bottom: 1px solid #e7e8ec !important;
// 	border-top: 1px solid #e7e8ec !important;
// 	height: 60px;
// 	overflow: hidden;
// `;
// const HeaderContainer = styled.div`
// 	width: 100%;
// 	height: 100% !important;
// 	overflow: hidden;
// 	zoom: 1;
// 	position: relative;
// 	left: 0;
// 	top: 0;
// `;

// const HeaderContainerInner = styled.div`
// 	position: absolute;
// 	left: 0px;
// 	top: 0px;
// 	height: 100% !important;
// 	width: 100% !important;
// `;
// const ColumnName = styled.div.attrs((props) => ({
// 	width: props.width,
// 	left: props.left
// }))`
//   width: ${(props) => props.width};
//   left: ${(props) => props.left};
//   border-width: 1px;
//   height: auto;
//   margin: 0px;
//   top: 0px;
//   font-size: 11px;
//   font-weight: bold;
//   font-family: inherit;
//   color: #707887;
//   text-transform: uppercase;
//   letter-spacing: -0.4px;
//   vertical-align: middle;
//   position: absolute;
//   bottom: 0;
// `;

// const SelectIconContainer = styled.div`
// 	justify-content: center;
// 	padding: 0 10px !important;

// 	font-weight: bold;
// 	font-size: 11px;
// 	text-transform: uppercase;
// 	height: 100% !important;
// 	display: flex;
// 	align-self: stretch;
// 	width: 100%;
// `;
// const SelectSpan = styled.span.attrs((props) => ({
// 	textAlign: props.textAlign || 'left'
// }))`
//   display: flex;
//   align-items: center;
//   overflow: hidden;
//   text-align: ${(props) => props.textAlign};
//   cursor: pointer;
// `;
// const SelectSpanInner = styled.span`white-space: nowrap;`;

// const HeaderBodyContainer = styled.div`
// 	width: 100%;
// 	height: auto;
// 	height: inherit !important;
// 	float: left;
// 	height: auto !important;
// 	position: relative;
// 	top: 0 !important;
// 	left: 0 !important;
// 	overflow: hidden;
// `;
// const HeaderBody = styled.div`
// 	border-width: 0px;
// 	overflow: auto;
// 	margin: 0px;
// 	width: 1158px;
// `;
// const BodyTable = styled.table`
// 	width: 100%;
// 	height: 1px;
// 	table-layout: fixed;
// 	border-collapse: separate;
// 	border-collapse: collapse;
// 	border-spacing: 0;
// `;
// const TableBody = styled.tbody``;
// const TableRow = styled.tr``;
// const TableHeader = styled.th.attrs((props) => ({
// 	width: props.width,
// 	height: props.height || '0'
// }))`
//   width: ${(props) => props.width};
// `;

// const EmptyRow = styled.div`
// 	text-align: center;
// 	border-bottom: 1px solid #e7e8ec;
// 	min-height: 59px !important;
// 	line-height: 55px;
// `;
// const AddMoreBlock = styled.div`
// 	flex-flow: row wrap;
// 	display: flex;
// 	width: 100%;
// 	padding: 16px 20px;
// 	align-items: center;
// 	justify-content: inherit !important;
// `;
// const AddMoreButton = styled.button`
// 	background-color: transparent;
// 	color: #05cbbf;
// 	border-color: transparent;
// 	min-width: 70px;
// 	padding: 0 10px;
// 	height: 32px !important;
// 	border-width: 1px;
// 	border-style: solid;
// 	font-family: inherit;
// 	font-size: 13px;
// 	font-weight: 500;
// 	text-align: center;
// 	text-decoration: none;
// 	display: inline-flex;
// 	vertical-align: middle;
// 	justify-content: center;
// 	flex-direction: row;
// 	align-items: center;
// 	background: transparent;
// 	height: 40px;
// 	white-space: nowrap;
// 	border-radius: 4px;
// 	padding: 0 16px;
// 	cursor: pointer;
// 	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
// 		opacity 0.15s ease-in-out;
// 	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
// 		opacity 0.15s ease-in-out;
// 	&:hover {
// 		outline: none;
// 	}
// `;

// const PlusButton = styled.button`
// 	margin-left: 5px;
// 	color: #04beb3;
// 	background-color: #05cbbf;
// 	border-color: #05cbbf;
// 	width: 32px !important;
// 	min-width: 32px !important;
// 	max-width: 32px !important;
// 	justify-content: center;
// 	padding: 0 !important;
// 	height: 32px !important;
// 	text-align: center;
// 	border-width: 1px;
// 	border-style: solid;
// 	font-family: inherit;
// 	font-size: 13px;
// 	font-weight: 500;
// 	text-decoration: none;
// 	display: inline-flex;
// 	vertical-align: middle;
// 	flex-direction: row;
// 	align-items: center;
// 	background: transparent;
// 	white-space: nowrap;
// 	border-radius: 4px;
// `;
// const SaveButtonContaier = styled.div`
// 	position: fixed;
// 	bottom: 50px;
// 	right: 50px;
// 	bottom: 37px;
// 	right: 37px;
// 	z-index: 300;
// `;
// const SaveButton = styled.button`
// 	border-radius: 50%;
// 	width: 40px;
// 	height: 40px;
// 	background-color: #05cbbf;
// 	border: 0;
// 	color: #fff;
// 	text-align: center;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	transition: background-color 0.15s ease-in-out;
// 	outline: none;
// `;
