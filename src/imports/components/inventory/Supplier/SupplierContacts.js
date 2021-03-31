import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import {
	AddMoreBlock,
	AddMoreButton,
	BodyTable,
	EmptyRow,
	HeaderBody,
	HeaderBodyContainer,
	Input,
	InputBody,
	PageBlock,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	SelectSpanInner,
	TableBody,
	TableData,
	TableFieldContainer,
	TableHeaderInner,
	TableHeaders,
	TableRow,
	PageToolbar,
	ToolbarItems,
	Custombutton,
	CheckBoxInput,
	CheckBoxContainer,
	LeftItemH1
} from '../../../styles/inventory/Style';

class SupplierContacts extends React.Component {
	constructor(props) {
		super();
		this.state = {
			list: props.supplierContacts
		};
		this.onChange = this.onChange.bind(this);
	}

	// clear form errors
	componentDidMount() {
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			list: nextProps.supplierContacts
		};
	}

	onChange(e, variableName) {
		const list = cloneDeep(this.state.list).map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				values.set(e.target.name, e.target.value);
				if (this.props.updatable) {
					values.set('supplier', this.props.supplier);
				}
				listVariable.set('values', values);
				return listVariable;
			} else {
				return listVariable;
			}
		});
		this.setState({ list: list });
		this.props.updateContactsList(list);
	}

	onChangeDefault(e, variableName) {
		const list = cloneDeep(this.state.list).map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				values.set(e.target.name, e.target.value);
				listVariable.set('values', values);
				return listVariable;
			} else {
				if (e.target.value) {
					const values = listVariable.get('values');
					values.set(e.target.name, false);
					listVariable.set('values', values);
				}
				return listVariable;
			}
		});
		this.setState({ list: list });
		this.props.updateContactsList(list);
	}

	addVariableToList() {
		const list = cloneDeep(this.state.list);
		list.push(
			new Map([
				[ 'typeName', 'SupplierContact' ],
				[
					'variableName',
					String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
				],
				[
					'values',
					new Map([
						[ 'supplier', '' ],
						[ 'comment', '' ],
						[ 'email', '' ],
						[ 'fax', '' ],
						[ 'jobTitle', '' ],
						[ 'mobile', '' ],
						[ 'name', '' ],
						[ 'phone', '' ],
						[ 'website', '' ],
						[ 'isDefault', list.length === 0 ? true : false  ]
					])
				]
			])
		);
		this.setState({ list: list });
		this.props.updateContactsList(list);
	}

	onRemoveKey(e, variableName) {
		const list = cloneDeep(this.state.list).filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ list: list });
		this.props.updateContactsList(list);
	}

	renderInputFields() {
		const rows = [];
		this.state.list.forEach((listVariable) =>
			rows.push(
				<TableRow key={listVariable.get('variableName')}>
					<TableData width="5%" left="0px">
						<i
							name={listVariable.get('variableName')}
							className="large material-icons"
							onClick={(e) => this.onRemoveKey(e, listVariable.get('variableName'))}
						>
							remove_circle_outline
						</i>
					</TableData>
					<TableData width="10%" left="7%">
						<TableHeaderInner>
							<Input
								name="name"
								type="text"
								value={listVariable.get('values').get('name')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="7%">
						<TableHeaderInner>
							<Input
								name="phone"
								type="number"
								value={listVariable.get('values').get('phone')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="15%">
						<TableHeaderInner>
							<Input
								name="mobile"
								type="number"
								value={listVariable.get('values').get('mobile')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="23%">
						<TableHeaderInner>
							<Input
								name="jobTitle"
								type="text"
								value={listVariable.get('values').get('jobTitle')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="34%">
						<TableHeaderInner>
							<Input
								name="fax"
								type="text"
								value={listVariable.get('values').get('fax')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="34%">
						<TableHeaderInner>
							<Input
								name="email"
								type="text"
								value={listVariable.get('values').get('email')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="8%" left="34%">
						<TableHeaderInner>
							<Input
								name="website"
								type="text"
								value={listVariable.get('values').get('website')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%" left="81%">
						<TableHeaderInner>
							<Input
								name="comment"
								type="text"
								value={listVariable.get('values').get('comment')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData>
						<TableHeaderInner overflow="hidden">
							<CheckBoxContainer
								style={{
									justifyContent: 'center',
									marginLeft: '5px'
								}}
							>
								<CheckBoxInput
									name="isDefault"
									type="checkbox"
									checked={listVariable.get('values').get('isDefault')}
									tabindex="55"
									onChange={(e) => {
										this.onChangeDefault(
											{
												target: {
													name: 'isDefault',
													value: !listVariable.get('values').get('isDefault')
												}
											},
											listVariable.get('variableName')
										);
									}}
								/>
							</CheckBoxContainer>
						</TableHeaderInner>
					</TableData>
				</TableRow>
			)
		);
		return rows;
	}
	
	render() {
		return (
			<PageBlock id="contact">
				<PageToolbar borderBottom="1px solid #e0e1e7">
					<ToolbarItems>
						<LeftItemH1>Supplier Contacts</LeftItemH1>
					</ToolbarItems>
					<ToolbarItems>
						{this.props.updatable ? (
							<Custombutton
								height="30px"
								onClick={(e) => {
									this.props.updateSupplierContacts();
								}}
							>
								Update
							</Custombutton>
						) : (
							undefined
						)}
					</ToolbarItems>
				</PageToolbar>
				<InputBody borderTop="0" overflow="visible">
					<RoundedBlock overflow="visible">
						<TableFieldContainer overflow="visible">
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
												<TableHeaders width="10%" left="3%">
													<SelectIconContainer>
														<SelectSpan>Name</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="8%" left="12%">
													<SelectIconContainer>
														<SelectSpan>Phone Number</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="20%">
													<SelectIconContainer>
														<SelectSpan textAlign="right">Mobile Phone Number</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="8%" left="32%">
													<SelectIconContainer>
														<SelectSpan>Job Title</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="8%" left="39%">
													<SelectIconContainer>
														<SelectSpan>Fax</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="8%" left="46%">
													<SelectIconContainer>
														<SelectSpan>Email</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="54%">
													<SelectIconContainer>
														<SelectSpan>Website</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="64%">
													<SelectIconContainer>
														<SelectSpan>Comment</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%" left="75%">
													<SelectIconContainer>
														<SelectSpan>Default</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												{/* 
												<TableHeaders width="12%" left="86%">
													<SelectIconContainer>
														<SelectSpan>Include In Email</SelectSpan>
													</SelectIconContainer>
												</TableHeaders> */}
											</TableRow>
											{this.renderInputFields()}
										</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.list.length === 0 ? <EmptyRow>No Contacts found.</EmptyRow> : undefined}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToList()}>
									<i className="large material-icons">add</i>Add New Contact
								</AddMoreButton>
							</AddMoreBlock>
						</TableFieldContainer>
					</RoundedBlock>
				</InputBody>
			</PageBlock>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors
});

export default connect(mapStateToProps, { clearErrors, getVariables })(SupplierContacts);
