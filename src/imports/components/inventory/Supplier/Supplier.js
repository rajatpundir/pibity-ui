import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {customErrorMessage} from '../../main/Notification';
import { clearErrors } from '../../../redux/actions/errors';
import { createVariable, getVariable, updateVariable, objToMapRec } from '../../../redux/actions/variables';
import SupplierDetails from './SupplierDetails';
import SupplierAddresses from './SupplierAddresses';
import SupplierContacts from './SupplierContacts';
import CheckIcon from '@material-ui/icons/Check';

class Supplier extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			createSupplier: true,
			prevPropVariable: {},
			prevVariable: new Map(),
			variable: new Map([
				[ 'typeName', 'Supplier' ],
				[ 'variableName', '' ],
				[
					'values',
					new Map([
						[
							'general',
							new Map([
								[ 'variableName', '' ],
								[
									'values',
									new Map([
										[ 'currency', 'INR - India Rupee' ],
										[ 'paymentTerm', '' ],
										[ 'taxRule', '' ],
										[ 'status', '' ],
										[ 'defaultCarrier', '' ],
										[ 'taxNumber', '' ],
										[ 'discount', '' ],
										[ 'attributeSet', '' ],
										[ 'comments', '' ]
									])
								]
							])
						],
						[ 'addresses', [] ],
						[ 'contacts', [] ]
					])
				]
			]),
			visibleSection: 'addresses'
		};
		this.updateDetails = this.updateDetails.bind(this);
		this.updateAddresses = this.updateAddresses.bind(this);
		this.updateContacts = this.updateContacts.bind(this);
		this.checkRequiredField = this.checkRequiredField.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.match.params.variableName && nextProps.variables.Supplier) {
			const variable = nextProps.variables.Supplier.filter(
				(variable) => variable.variableName === nextProps.match.params.variableName
			)[0];
			if (variable && prevState.prevPropVariable !== variable) {
				const variableMap = objToMapRec(variable);
				const values = variableMap.get('values');
				const general = values.get('general');
				general.set('variableName', variableMap.get('variableName'));
				values.set('general', general);
				variableMap.set('values', values);
				return {
					...prevState,
					variable: variableMap,
					prevPropVariable: variable
				};
			}
		}
		return prevState;
	}

	componentDidMount() {
		if (this.props.match.params.variableName) {
			this.props
				.getVariable(this.state.variable.get('typeName'), this.props.match.params.variableName)
				.then((variable) => {
					this.setState({ prevVariable: objToMapRec(variable) });
				});
		}
	}

	checkRequiredField(variable) {
		if (variable.get('general').get('variableName') === '') {
			customErrorMessage('Supplier Name is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('status') === '') {
			customErrorMessage('Status is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('taxRule') === '') {
			customErrorMessage('Tax Rule is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('paymentTerm') === '') {
			customErrorMessage('Payment Term is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('currency') === '') {
			customErrorMessage('Currency is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('attributeSet') === '') {
			customErrorMessage('Attribute Set is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('general').get('values').get('defaultCarrier') === '') {
			customErrorMessage('Carrier Service is missing');
			this.setState({ createSupplier: false });
		}
		if (variable.get('contacts').length === 0) {
			customErrorMessage('Add at least One Contact field');
			this.setState({ createSupplier: false });
		}
		if (variable.get('addresses').length === 0) {
			customErrorMessage('Add at least One Address field');
			this.setState({ createSupplier: false });
		}
	}

	updateDetails(details) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('general', details);
		variable.set('values', values);
		variable.set('variableName', details.get('variableName'));
		this.setState({ variable: variable });
	}

	updateAddresses(addresses) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('addresses', addresses);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	updateContacts(contacts) {
		const variable = cloneDeep(this.state.variable);
		const values = variable.get('values');
		values.set('contacts', contacts);
		variable.set('values', values);
		this.setState({ variable: variable });
	}

	render() {
		return (
			<Container>
				<ToastContainer limit={3} rtl />
				<PageWrapper>
					<PageBody>
						<SaveButtonContaier>
							<SaveButton
								onClick={(e) => {
									if (this.props.match.params.variableName) {
										this.props.updateVariable(this.state.prevVariable, this.state.variable);
									} else {
										new Promise((resolve) => {
											resolve(this.checkRequiredField(this.state.variable.get('values')));
										}).then(() => {
											if (this.state.createSupplier) {
												this.props.createVariable(this.state.variable);
											}
											this.setState({ createSupplier: true });
										});
									}
								}}
							>
								<CheckIcon />
							</SaveButton>
						</SaveButtonContaier>
						<SupplierDetails
							variable={this.state.variable.get('values').get('general')}
							updateDetails={this.updateDetails}
						/>
						<HorizontaListPageBlock>
							<HorizontalBlockListOuter>
								<HorizontalBlockListInnerWrapper>
									<HoizontalBlockList>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'addresses' });
												}}
											>
												Addresess
											</BlockListItemButton>
										</HoizontalBlockListItems>
										<HoizontalBlockListItems>
											<BlockListItemButton
												onClick={(e) => {
													this.setState({ visibleSection: 'contacts' });
												}}
											>
												Contacts
											</BlockListItemButton>
										</HoizontalBlockListItems>
									</HoizontalBlockList>
								</HorizontalBlockListInnerWrapper>
							</HorizontalBlockListOuter>
						</HorizontaListPageBlock>
						{this.state.visibleSection === 'addresses' && (
							<SupplierAddresses
								list={this.state.variable.get('values').get('addresses')}
								updateAddresses={this.updateAddresses}
							/>
						)}
						{this.state.visibleSection === 'contacts' && (
							<SupplierContacts
								list={this.state.variable.get('values').get('contacts')}
								updateContacts={this.updateContacts}
							/>
						)}
					</PageBody>
				</PageWrapper>
			</Container>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, {
	clearErrors,
	createVariable,
	getVariable,
	updateVariable
})(Supplier);

const Container = styled.div`
	padding: 0;
	width: 100%;
	margin-top: 65px;
	min-height: 100vh;
	min-width: 860px;
	border-radius: 6px;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	background-color: #e3e4e8;
	@media (max-width: 1200px) {
		flex-direction: column !important;
		padding: 20px 20px 0 20px !important;
	}
	
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
		margin: 20px 20px 0 20px;
		width: 75%;
	}
`;

const PageBody = styled.div`
	margin: 0 auto !important;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	@media (min-width: 1440px) {
		max-width: 90%;
	}
`;

export const HorizontaListPageBlock = styled.div`
	width: 100%;
	height: 60px;
	padding: 10px 10px;
	background: #fff;
	float: left;
	border-radius: 6px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	position: relative;
	margin-bottom: 20px !important;
`;

export const HorizontalBlockListOuter = styled.div`
	width: 100%;
	position: relative;
	display: block;
`;

export const HorizontalBlockListInnerWrapper = styled.div`
	width: 100%;
	overflow: hidden;
	position: relative;
`;

export const HoizontalBlockList = styled.ul`
	width: 212px;
	height: 40px;
	padding-bottom: 0%;
	transform: translate3d(0px, 0px, 0px);
	display: flex;
	flex-direction: row;
	flex: 1;
	position: relative;
	z-index: 1;
	min-width: 100%;
	padding-left: 0;
	list-style: none outside none;
	transition: all 1s;
	transition-property: transform, height;
	justify-content: start;
	float: left;
`;

export const HoizontalBlockListItems = styled.li`
	margin-right: 0px;
	display: flex;
	white-space: nowrap;
	height: 40px;
	float: left;
	margin-right: 10px;
	text-align: -webkit-match-parent;
	list-style: none outside none;
	color: #3b3b3b;
	letter-spacing: -0.2px;
`;

export const BlockListItemButton = styled.button`
	height: 40px;
	width: 100%;
	border-radius: 4px;
	font-size: 13px;
	font-size: 13px;
	font-weight: 600;
	color: #3b3b3b;
	padding: 0 10px;
	display: flex;
	align-items: center;
	cursor: pointer;
	border: 0;
	background: transparent;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	-webkit-appearance: button;
	cursor: pointer;
	text-transform: none;
	line-height: normal;
	margin: 0;
	outline: none;
	vertical-align: baseline;
	vertical-align: middle;
	&:before,
	&:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
`;
const SaveButtonContaier = styled.div`
	position: fixed;
	bottom: 50px;
	right: 50px;
	bottom: 37px;
	right: 37px;
	z-index: 300;
`;
const SaveButton = styled.button`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	background-color: #05cbbf;
	border: 0;
	color: #fff;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.15s ease-in-out;
	outline: none; 

`;
