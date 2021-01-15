import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
	BodyTable,
	HeaderBody,
	HeaderBodyContainer,
	TableData,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	TableHeaderInner,
	TableBody,
	TableFieldContainer,
	TableHeaders,
	TableRow
} from '../../../../styles/inventory/Style';
import { EmptyRowImageContainer, EmptyRowTag } from '../../../../styles/main/Dashboard';

class ProductStoreUpdateRecord extends React.Component {
	constructor(props) {
		super();
		this.state = {
			productStores: []
		};
		this.renderTransactionRecords = this.renderTransactionRecords.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,

			productStores:
				nextProps.variables !== undefined
					? nextProps.variables.ProductStore !== undefined ? nextProps.variables.ProductStore : []
					: []
		};
	}

	renderTransactionRecords() {
		const rows = [];
		this.props.transactions.forEach((transaction, index) => {
			const refProductStore = this.state.productStores.filter(
				(store) => store.variableName === transaction.values.refProductStore
			)[0];
			rows.push(
				<TableRow key={index}>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.date}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.updateType}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.movementType}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							{transaction.values.movementType === 'Internal' ? refProductStore ? (
								refProductStore.values.location
							) : (
								''
							) : (
								transaction.values.refProductStore
							)}
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.movementInvoice}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.quantityAdded}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.quantityRemoved}</TableHeaderInner>
					</TableData>
				</TableRow>
			);
		});
		return rows;
	}

	render() {
		return (
			<React.Fragment>
				<TableCellHeadingContainer>Transaction Record</TableCellHeadingContainer>
				<RoundedBlock overflow="visible">
					<TableFieldContainer overflow="visible">
						<HeaderBodyContainer>
							<HeaderBody>
								<BodyTable width="auto">
									<thead>
										<TableRow>
											<TableHeaders width="10%">
												<SelectIconContainer>
													<SelectSpan>Date</SelectSpan>
												</SelectIconContainer>
											</TableHeaders>
											<TableHeaders width="10%">
												<SelectIconContainer>
													<SelectSpan>Update Type</SelectSpan>
												</SelectIconContainer>
											</TableHeaders>
											<TableHeaders width="10%">
												<SelectIconContainer>
													<SelectSpan>Movement type</SelectSpan>
												</SelectIconContainer>
											</TableHeaders>
											<TableHeaders width="10%">
												<SelectIconContainer>
													<SelectSpan>Reference Store</SelectSpan>
												</SelectIconContainer>
											</TableHeaders>
											<TableHeaders width="10%">
												<SelectIconContainer>
													<SelectSpan> Reference Inovice</SelectSpan>
												</SelectIconContainer>
											</TableHeaders>
											<TableHeaders width="10%">
												<SelectIconContainer>
													<SelectSpan>Quantity Added</SelectSpan>
												</SelectIconContainer>
											</TableHeaders>
											<TableHeaders width="10%">
												<SelectIconContainer>
													<SelectSpan>Quantity Removed</SelectSpan>
												</SelectIconContainer>
											</TableHeaders>
										</TableRow>
									</thead>
									<TableBody>{this.renderTransactionRecords()}</TableBody>
								</BodyTable>
								{this.props.transactions.length === 0 ? (
									<EmptyRowImageContainer height="65px">
										<EmptyRowTag>Transaction Record Not Present</EmptyRowTag>
									</EmptyRowImageContainer>
								) : (
									undefined
								)}
							</HeaderBody>
						</HeaderBodyContainer>
					</TableFieldContainer>
				</RoundedBlock>
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	types: state.types,
	variables: state.variables
});

export default connect(mapStateToProps, {})(ProductStoreUpdateRecord);

export const TableCellHeadingContainer = styled.div`
	width: max-content;
	padding: 10px;
	margin: 0 auto;
	font-size: 1.3rem;
	font-style: italic;
	font-weight: 500;
`;
