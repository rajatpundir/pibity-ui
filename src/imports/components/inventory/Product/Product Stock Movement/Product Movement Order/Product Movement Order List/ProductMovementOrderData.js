import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
	TableData,
	TableHeaderInner,
	TableRow,
	StatusSpan,
	StatusBackgroundColor
} from '../../../../../../styles/inventory/Style';
const styles = (theme) => ({
	hide: {
		border: 'none'
	}
});

class ProductMovementOrderData extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: false,
			isModalOpen: false
		};
	}

	render() {
		return (
			<React.Fragment key={this.props.data.variableName}>
				<TableRow key={this.props.data.variableName}>
					<TableData width="5%" />
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">
							<Link to={'/productMovementOrderList/' + encodeURIComponent(this.props.data.variableName)}>
								{this.props.data.values.product}
							</Link>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">{this.props.data.values.toLocation}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">{this.props.data.values.fromLocation}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">{this.props.data.values.requiredQuantity}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<StatusSpan>{this.props.data.values.status}</StatusSpan>
					</TableData>
				</TableRow>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(ProductMovementOrderData);
