import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';
import Select from 'react-select';
import {
	AddMoreBlock,
	AddMoreButton,
	BodyTable,
	EmptyRow,
	HeaderBody,
	HeaderBodyContainer,
	HeaderContainer,
	Headers,
	Input,
	InputBody,
	LeftItemH1,
	PageBar,
	PageBarAlign,
	PageBlock,
	PageToolbar,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	SelectSpanInner,
	SelectWrapper,
	TableBody,
	TableData,
	TableFieldContainer,
	TableHeaderInner,
	TableHeaders,
	TableRow,
	ToolbarLeftItems,
	FormControl,
	ButtonWithOutline
} from '../../../styles/inventory/Style';

class ReorderLevels extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: props.list
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
			list: nextProps.list
		};
	}

	onChange(e, variableName) {
		const list = cloneDeep(this.state.list).map((listVariable) => {
			if (listVariable.get('variableName') === variableName) {
				const values = listVariable.get('values');
				values.set(e.target.name, e.target.value);
				listVariable.set('values', values);
				return listVariable;
			} else {
				return listVariable;
			}
		});
		this.setState({ list: list });
		this.props.updateProductReorderLevels(list);
	}

	addVariableToList() {
		const list = cloneDeep(this.state.list);
		list.unshift(
			new Map([
				[ 'variableName',String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1 ) ],
				[
					'values',
					new Map([
						[ 'location', '' ],
						[ 'minimumBeforeReorder', '' ],
						[ 'reorderQuantity', '' ],
						[ 'stockLocator', '' ]
					])
				]
			])
		);
		this.setState({ list: list });
		this.props.updateProductReorderLevels(list);
	}

	onRemoveKey(e, variableName) {
		const list = cloneDeep(this.state.list).filter((listVariable) => {
			return listVariable.get('variableName') !== variableName;
		});
		this.setState({ list: list });
		this.props.updateProductReorderLevels(list);
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
					<TableData width="20%" left="3%">
						<TableHeaderInner>
							<SelectWrapper>
								<Select
									value={{
										value: listVariable.get('values').get('location'),
										label: listVariable.get('values').get('location')
									}}
									onChange={(option) => {
										this.onChange(
											{ target: { name: 'location', value: option.value } },
											listVariable.get('variableName')
										);
									}}
									options={
										this.props.variables.Location !== undefined ? (
											this.props.variables.Location.map((variable) => {
												return {
													value: variable.variableName,
													label: variable.variableName
												};
											})
										) : (
											[]
										)
									}
								/>
							</SelectWrapper>
						</TableHeaderInner>
					</TableData>
					<TableData width="15%" left="24%">
						<TableHeaderInner>
							<Input
								name="minimumBeforeReorder"
								type="text"
								value={listVariable.get('values').get('minimumBeforeReorder')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="15%" left="40%">
						<TableHeaderInner>
							<Input
								name="reorderQuantity"
								type="text"
								value={listVariable.get('values').get('reorderQuantity')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData width="15%" left="55%">
						<TableHeaderInner>
							<Input
								name="stockLocator"
								type="text"
								value={listVariable.get('values').get('stockLocator')}
								onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
							/>
						</TableHeaderInner>
					</TableData>
					<TableData  width="20%" left="65%">
						<TableHeaderInner>
							<Input
								name="stockLocator"
								type="text"
							/>
						</TableHeaderInner>
					</TableData>
				</TableRow>
			)
		);
		return rows;
	}

	render() {
		return (
			<PageBlock id="reorderLevel">
				<PageToolbar>
					<ToolbarLeftItems>
						<LeftItemH1>REORDER LEVELS</LeftItemH1>
					</ToolbarLeftItems>
				</PageToolbar>
				<PageBar>
					<PageBarAlign>
						<FormControl>
							<Input placeholder="Type text to search" />
						</FormControl>
						<FormControl>
							<ButtonWithOutline>Search</ButtonWithOutline>
						</FormControl>
					</PageBarAlign>
				</PageBar>
				<InputBody borderTop="0" overflow="visible">
					<RoundedBlock overflow="visible">
						<TableFieldContainer overflow="visible">
							<Headers>
								<HeaderContainer>
									<HeaderBody>
										<BodyTable>
											<TableBody>
												<TableRow>
													<TableHeaders width="5%" left="0px">
														<SelectIconContainer>
															<SelectSpan>
																<SelectSpanInner>
																	<i className="large material-icons">create</i>
																</SelectSpanInner>
															</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="20%" left="3%">
														<SelectIconContainer>
															<SelectSpan>Location</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="15%" left="24%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">
																Minimum Before Reorder
															</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="15%" left="40%">
														<SelectIconContainer>
															<SelectSpan>Reorder Quantity </SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="15%" left="55%">
														<SelectIconContainer>
															<SelectSpan>Stock Locator </SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="20%" left="65%">
														<SelectIconContainer>
															<SelectSpan>Pick Zones </SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
												</TableRow>
											</TableBody>
										</BodyTable>
									</HeaderBody>
								</HeaderContainer>
							</Headers>
							<HeaderBodyContainer>
								<HeaderBody>
									<BodyTable>
										<TableBody>{this.renderInputFields()}</TableBody>
									</BodyTable>
								</HeaderBody>
								{this.state.list.length === 0 ? <EmptyRow>No Location Found</EmptyRow> : undefined}
							</HeaderBodyContainer>
							<AddMoreBlock>
								<AddMoreButton onClick={(e) => this.addVariableToList()}>
									<i className="large material-icons">add</i>Add More Items
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
	errors: state.errors,
	types: state.types,
	variables: state.variables
});

export default connect(mapStateToProps, { clearErrors, getVariables })(ReorderLevels);
