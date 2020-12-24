import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RecievePaymentModal from './RecievePaymentModal';
import InvoiceTransactionHistory from './InvoiceTransactionHistory';
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

class CustomerAccountData extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: false,
			isModalOpen: false
		};
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onOpenRecievePaymentModal = this.onOpenRecievePaymentModal.bind(this);
	}

	onOpenRecievePaymentModal() {
		this.setState({ isModalOpen: true });
	}

	onCloseModal() {
		this.setState({ isModalOpen: false });
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.account !== undefined) {
			return {
				...prevState,
				account: nextProps.account
			};
		}

		return {
			...prevState
		};
	}

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment key={this.props.data.variableName}>
				<RecievePaymentModal
					isOpen={this.state.isModalOpen}
					onClose={this.onCloseModal}
					invoice={this.props.data}
					account={this.props.account}
				/>
				<TableRow onClick={this.handleRowClick} key={this.props.data.variableName}>
					<TableData width="5%">
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => this.setState({ open: !this.state.open })}
						>
							{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.props.data.values.invoiceDate}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.props.data.values.invoiceNumber}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.props.data.values.salesOrder}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.props.data.values.total}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.props.data.values.balanceDue}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
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
							{this.props.data.values.paymentStatus === 'Due' ? (
								<Custombutton height="2.5rem" onClick={(e) => this.onOpenRecievePaymentModal()}>
									Pay
								</Custombutton>
							) : (
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
							)}
						</TableHeaderInner>
					</TableData>
				</TableRow>
				<TableRow
					style={{
						display: this.state.open ? 'table-row' : 'none',
						transition: 'opacity 1s ease-out',
						opacity: this.state.open ? '1' : '0'
					}}
				>
					<TableCell
						style={{
							padding: '10px',
							backgroundColor: '#f6f9f9'
						}}
						colSpan={12}
						className={clsx({
							[classes.hide]: !this.state.open
						})}
					>
						<Collapse in={this.state.open} timeout="auto" unmountOnExit>
							<InvoiceTransactionHistory transactions={this.props.data.values.transactions} />
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(CustomerAccountData);
