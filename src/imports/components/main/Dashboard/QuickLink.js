import React from 'react';
import { connect } from 'react-redux';
import {
	Block,
	Heading,
	HeadingBlock,
	ItemHeading,
	Item,
	ItemBlock,
	ItemContainer,
    ItemData,
    Tool
} from '../../../styles/main/Dashboard';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
class QuickLinks extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: true
		};
	}

	render() {
		return (
			<Block>
				<HeadingBlock>
					<Heading>Quick Links</Heading>
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
				<ItemContainer>
					<ItemBlock>
						<Item to="/productList">
							<ItemHeading>Products</ItemHeading>
							<ItemData>
								{this.props.variables.Product !== undefined ? this.props.variables.Product.length : 0}
							</ItemData>
						</Item>
						<Item to="/supplierList">
							<ItemHeading>Supplier</ItemHeading>
							<ItemData>
								{this.props.variables.Supplier !== undefined ? this.props.variables.Supplier.length : 0}
							</ItemData>
						</Item>
						<Item to="/customerList">
							<ItemHeading>Customer</ItemHeading>
							<ItemData>
								{this.props.variables.Customer !== undefined ? this.props.variables.Customer.length : 0}
							</ItemData>
						</Item>
						{/* <Item>
							<ItemHeading>Accounts</ItemHeading>
							<ItemData>
								{this.props.variables.Account !== undefined ? this.props.variables.Account.length : 0}
							</ItemData>
						</Item> */}
						<Item to='/purchaseList'>
							<ItemHeading>Purchase Orders</ItemHeading>
							<ItemData>
								{this.props.variables.PurchaseOrder !== undefined ? this.props.variables.PurchaseOrder.length : 0}
							</ItemData>
						</Item>
						<Item to="/salesList">
							<ItemHeading>Sales Orders</ItemHeading>
							<ItemData>
								{this.props.variables.SalesOrder !== undefined ? this.props.variables.SalesOrder.length : 0}
							</ItemData>
						</Item>
					</ItemBlock>
				</ItemContainer>
                </Collapse>
			</Block>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	errors: state.errors,
	variables: state.variables
});

export default connect(mapStateToProps, {})(QuickLinks);
