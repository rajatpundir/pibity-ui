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
import { EmptyRowImageContainer, EmptyRowImage, EmptyRowTag } from '../../../styles/main/Dashboard';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

class ProductBlock extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: true,
			product: []
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			...prevState,
			product:
				nextProps.variables !== undefined
					? nextProps.variables.Product !== undefined
						? nextProps.variables.Product.map((x, i) => ({ ...x, Id: i }))
						: []
					: []
		};
	}

	renderInputFields() {
		const rows = [];
		this.state.product.length !== 0
			? this.state.product.forEach((data) => {
					rows.push(
						<TableRow key={data.Id}>
							<TableData width="10%">
								<TableHeaderInner>{data.variableName}</TableHeaderInner>
							</TableData>
							<TableData width="10%">
								<TableHeaderInner>{data.values.general.values.productType}</TableHeaderInner>
							</TableData>
							<TableData width="10%">
								<TableHeaderInner>{data.values.general.values.categorey}</TableHeaderInner>
							</TableData>
							<TableData width="10%">
								<TableHeaderInner>
									<Span>{data.values.general.values.productStatus}</Span>
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
					<Heading>Product Owerview</Heading>
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
															<SelectSpan textAlign="right">Type</SelectSpan>
														</SelectIconContainer>
													</TableHeaders>
													<TableHeaders width="10%">
														<SelectIconContainer>
															<SelectSpan>Category</SelectSpan>
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
										{this.state.product.length === 0 ? (
											<EmptyRowImageContainer>
												<EmptyRowImage src="https://inventory.dearsystems.com/Content/Design2017/Images/Dashboard/no-data.png" />
												<EmptyRowTag>No Products Available</EmptyRowTag>
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

export default connect(mapStateToProps, {})(ProductBlock);
