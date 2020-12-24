import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getVariables } from '../../../../redux/actions/variables';

import {
	BodyTable,
	HeaderBody,
	HeaderBodyContainer,
	InputBody,
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

class InvoiceTransactionHistory extends React.Component {
	constructor(props) {
		super();
		this.state = {};
		this.renderTransactionRecords = this.renderTransactionRecords.bind(this);
	}

	renderTransactionRecords() {
		const rows = [];
		this.props.transactions.forEach((transaction, index) => {
			const refAccount = this.props.variables.Account.filter(
				(account) => account.variableName === transaction.values.refAccount
			)[0];
			rows.push(
				<TableRow key={index}>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.date}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{refAccount.values.name}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.voucherType}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.creditAmount}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{transaction.values.debitAmount}</TableHeaderInner>
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

				<InputBody borderTop="0" overflow="visible">
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
														<SelectSpan>Reference Account</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Voucher Type</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Credit</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
												<TableHeaders width="10%">
													<SelectIconContainer>
														<SelectSpan>Debit</SelectSpan>
													</SelectIconContainer>
												</TableHeaders>
											</TableRow>
										</thead>
										<TableBody>{this.renderTransactionRecords()}</TableBody>
									</BodyTable>
									{this.props.transactions.length === 0 ? (
										<EmptyRowImageContainer>
											{/* <EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" /> */}
											<EmptyRowTag>Transaction Record Not Present</EmptyRowTag>
										</EmptyRowImageContainer>
									) : (
										undefined
									)}
								</HeaderBody>
							</HeaderBodyContainer>
						</TableFieldContainer>
					</RoundedBlock>
				</InputBody>
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	types: state.types,
	variables: state.variables
});

export default connect(mapStateToProps, {
	getVariables
})(InvoiceTransactionHistory);

export const TableCellHeadingContainer = styled.div`
	width: max-content;
	padding: 10px;
	margin: 0 auto;
	font-size: 1.3rem;
    font-style: italic;
    font-weight: 500;
`;

