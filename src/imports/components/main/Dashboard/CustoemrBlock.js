import React from 'react';
import { connect } from 'react-redux';
import { Block, Heading, HeadingBlock, Tool } from '../../../styles/main/Dashboard';
import {
	Span,
	InputBody,
	RoundedBlock,
	SelectIconContainer,
	SelectSpan,
	HeaderBodyContainer,
	HeaderBody,
	BodyTable,
	TableBody,
	TableRow,
	TableHeaders,
	TableData,
	TableFieldContainer,
	TableHeaderInner
} from '../../../styles/inventory/Style';
import { EmptyRowImageContainer, EmptyRowImage,EmptyRowTag } from '../../../styles/main/Dashboard';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

class CustoemrBlock extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: true,
			customer: [],
			invoice:[]
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			invoice:
				nextProps.variables !== undefined
					? nextProps.variables.SalesInvoice !== undefined ? nextProps.variables.SalesInvoice : []
					: [],
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
		this.state.customer.length !== 0
			? this.state.customer.forEach((data) => {
					const invoice = this.state.invoice.filter((invoice) => invoice.values.customer === data.variableName);
					const totalDue = invoice.reduce(function(accumulator, currentValue) {
						return accumulator + currentValue.values.balanceDue;
					}, 0);
					rows.push(
						<TableRow key={data.Id}>
							<TableData width="10%">
								<TableHeaderInner>{data.variableName}</TableHeaderInner>
							</TableData>
							<TableData width="10%">
								<TableHeaderInner></TableHeaderInner>
							</TableData>
							<TableData width="10%">
								<TableHeaderInner>{totalDue}</TableHeaderInner>
							</TableData>
							<TableData width="10%">
								<TableHeaderInner>
									<Span>{data.values.general.values.status}</Span>
								</TableHeaderInner>
							</TableData>
						</TableRow>
					);
				})
			: rows.push();
		return rows;
	}

	render() {
		return (
			<Block>
				<HeadingBlock>
					<Heading>Customer Owerview</Heading>
					<Tool>
						<IconButton
							aria-label="expand"
							size="medium"
							onClick={() => this.setState({ open: !this.state.open })}
						>
							{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</Tool>
				</HeadingBlock>
				<Collapse in={this.state.open} timeout="auto" unmountOnExit>
					<InputBody borderTop="0" padding="0">
						<RoundedBlock border="none">
							<TableFieldContainer>
								<HeaderBodyContainer>
									<HeaderBody>
										<BodyTable>
											<TableBody>
												<TableRow>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Name</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan textAlign="right">Phone</SelectSpan>
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
												</TableRow>
												{this.renderInputFields()}
											</TableBody>
										</BodyTable>
										{this.state.customer.length === 0 ? (
											<EmptyRowImageContainer>
												<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
												<EmptyRowTag>No Suppliers</EmptyRowTag>
											</EmptyRowImageContainer>
										) : (
											undefined
										)}
									</HeaderBody>
								</HeaderBodyContainer>
							</TableFieldContainer>
						</RoundedBlock>
					</InputBody>
				</Collapse>
			</Block>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, {})(CustoemrBlock);
