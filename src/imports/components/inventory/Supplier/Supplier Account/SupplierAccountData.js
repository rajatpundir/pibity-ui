import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClearDuesModal from './ClearDuesModal';
import { TableData, TableHeaderInner, TableRow } from '../../../../styles/inventory/Style';
const styles = (theme) => ({
	hide: {
		border: 'none'
	}
});

class SupplierAccountData extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: false,
			data: props.data,
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
		const { classes } = this.props;
		return (
			<React.Fragment key={this.state.data.variableName}>
				<ClearDuesModal
					isOpen={this.state.isModalOpen}
					onClose={this.onCloseModal}
					invoice={this.props.data}
					account={this.props.account}
				/>
				<TableRow onClick={this.handleRowClick} key={this.state.data.variableName}>
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
						<TableHeaderInner>{this.state.data.values.invoiceDate}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.state.data.values.invoiceNumber}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.state.data.values.purchaseOrder}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.state.data.values.total}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.state.data.values.balanceDue}</TableHeaderInner>
					</TableData>
					<TableData width="0%">
						<TableHeaderInner>{this.state.data.values.paymentStatus}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner> <button onClick={(e)=>this.onOpenClearDuesModal()}>create</button></TableHeaderInner>
					</TableData>
				</TableRow>
				<TableRow>
					<TableCell
						style={{ padding: 0 }}
						colSpan={12}
						className={clsx({
							[classes.hide]: !this.state.open
						})}
					>
						<Collapse in={this.state.open} timeout="auto" unmountOnExit>
							<h1>Transaction History</h1>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(SupplierAccountData);

const Span = styled.span`
	background-color: #d6f3e3;
	margin-right: 0 !important;
	padding: 4px 10px 4px 10px;
	border-radius: 3px;
	display: inline-block;
	font-weight: 500;
`;

const Anchor = styled.a`
	text-decoration: none;
	color: #05cbbf;
`;
