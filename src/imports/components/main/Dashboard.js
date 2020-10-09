// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Container, PageWrapper, PageBody } from '../../styles/inventory/Style';
import { getVariables } from '../../redux/actions/variables';

class Dashboard extends React.Component {
	constructor(props) {
		super();
	}

	componentDidMount() {
		this.props.getVariables('Customer');
		this.props.getVariables('Product');
		this.props.getVariables('Supplier');
	}

	render() {
		console.log(this.props.variables.Customer);
		return (
			<Container mediaPadding="20px 20px 0 20px">
				<PageWrapper>
					<PageBody>
						<Block>
							<HeadingBlock>
								<Heading>Quick Links</Heading>
							</HeadingBlock>
							<ItemContainer>
								<ItemBlock>
									<Item>
										<ItemHeading>Products</ItemHeading>
										<ItemData>
											{this.props.variables.Product !== undefined ? (
												this.props.variables.Product.length
											) : (
												0
											)}
										</ItemData>
									</Item>
									<Item>
										<ItemHeading>Supplier</ItemHeading>
										<ItemData>
											{this.props.variables.Supplier !== undefined ? (
												this.props.variables.Supplier.length
											) : (
												0
											)}
										</ItemData>
									</Item>
									<Item>
										<ItemHeading>Customer</ItemHeading>
										<ItemData>
											{this.props.variables.Customer !== undefined ? (
												this.props.variables.Customer.length
											) : (
												0
											)}
										</ItemData>
									</Item>
								</ItemBlock>
							</ItemContainer>
						</Block>
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

export default connect(mapStateToProps, { getVariables })(Dashboard);

const Block = styled.div`
	display: block;
	widht: 100%;
	margin-left: 10px;
	margin-right: 10px;
	padding: 11px 20px;
	border-radius: 6px;
	background-color: #fff;
`;

const HeadingBlock = styled.div`
	border-bottom: 0;
	padding: 0;
	margin-bottom: 0;
	color: #666;
	cursor: move;
	min-height: 41px;
	display: flex;
`;
const Heading = styled.div`
	margin-left: 0px;
	margin-right: 0px;
	width: 100%;
	margin-top: auto;
	margin-bottom: auto;
	font-weight: 600;
	font-size: 18px;
	line-height: 23px;
	color: #3b3b3b;
`;

const ItemContainer = styled.div`
	padding: 10px 0 10px 0;
	letter-spacing: -0.2px;
`;
const ItemBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: space-between;
`;

const Item = styled.button`
font-weight: normal;
    font-size: 12px;
    line-height: 16px;
	width: 18.7%;
	flex-direction: column;
    background: #F1F6FB;
    height: auto;
    border-radius: 6px;
    margin-left: 4px;
	margin-right: 4px
	border-width: 1px;
    border-style: solid;
    border-color: transparent;
	font-family: inherit;
	text-align: center;
	text-decoration: none;
    display: inline-flex;
	vertical-align: middle;
	justify-content: center;
    align-items: center;
    color: #3b3b3b;
    white-space: nowrap;
    padding: 0 16px;
    cursor: pointer;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
`;
const ItemHeading = styled.div`
	padding-top: 10px;
	text-decoration: underline;
`;

const ItemData = styled.div`
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	color: #3e525d;
	padding-top: 3px;
	padding-bottom: 10px;
`;
