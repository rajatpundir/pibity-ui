import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	TableData,
	TableHeaderInner,
	TableRow,
	Custombutton,
	StatusSpan,
	StatusBackgroundColor,
	FontAwsomeIcon
} from '../../../../styles/inventory/Style';
const styles = (theme) => ({
	hide: {
		border: 'none'
	}
});

class SupplierSalesData extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: false,
			isModalOpen: false
		};
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onOpenClearDuesModal = this.onOpenClearDuesModal.bind(this);
	}

	onOpenClearDuesModal() {
		this.setState({ isModalOpen: true });
	}

	onCloseModal() {
		this.setState({ isModalOpen: false });
	}

	render() {
		return (
			<TableRow onClick={this.handleRowClick} key={this.props.data.variableName}>
				<TableData width="5%" />
				<TableData width="10%">
					<TableHeaderInner>{this.props.data.values.invoiceDate}</TableHeaderInner>
				</TableData>
				<TableData width="10%">
					<TableHeaderInner>{this.props.data.values.invoiceNumber}</TableHeaderInner>
				</TableData>
				<TableData width="10%">
					<TableHeaderInner>{this.props.data.values.purchaseOrder}</TableHeaderInner>
				</TableData>
				<TableData width="10%">
					<TableHeaderInner>{this.props.data.values.total}</TableHeaderInner>
				</TableData>
				<TableData width="10%">
					<TableHeaderInner>{this.props.data.values.balanceDue}</TableHeaderInner>
				</TableData>
				<TableData width="0%">
					<TableHeaderInner>
						<StatusSpan
							backgroundColor={
								this.props.data.values.paymentStatus === 'Paid' ? (
									StatusBackgroundColor.active
								) : (
									StatusBackgroundColor.depricated
								)
							}
						>
							{this.props.data.values.paymentStatus}
						</StatusSpan>
					</TableHeaderInner>
				</TableData>
				<TableData width="10%">
					<TableHeaderInner>
						<Custombutton
							padding="0 10px"
							minWidth="70px"
							height="2.5rem"
							color="#3b3b3b"
							backgroundColor="#F7FAFD"
							borderColor="#b9bdce"
							borderOnHover="#3b3b3b"
							backgroundOnHover="#F7FAFD"
							margin="0 5px"
							onClick={this.onClose}
						>
							<FontAwsomeIcon className="fa fa-print" />
							Print
						</Custombutton>
					</TableHeaderInner>
				</TableData>
			</TableRow>
		);
	}
}

export default withStyles(styles)(SupplierSalesData);
