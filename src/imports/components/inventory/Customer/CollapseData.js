import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import TableCell from '@material-ui/core/TableCell';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const styles = (theme) => ({
	hide: {
		border: 'none'
	}
});

class CollapseData extends React.Component {
	constructor(props) {
		super();
		this.state = {
			open: false,
			data: props.data
		};
	}
	render() {
		// const { classes } = this.props;
		return (
			<React.Fragment key={this.state.data.variableName}>
				<TableRow onClick={this.handleRowClick} key={this.state.data.variableName}>
					<TableData width="5%">
						{/* <IconButton
							aria-label="expand row"
							size="small"
							onClick={() => this.setState({ open: !this.state.open })}
						>
							{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton> */}
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Link to={'/customerList/' + encodeURIComponent(this.state.data.variableName)}>
								{this.state.data.variableName}
							</Link>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>{this.state.data.values.contacts[0].values.name}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Anchor href={'tel:' + this.state.data.values.contacts[0].values.phone}>
								{this.state.data.values.contacts[0].values.phone}
							</Anchor>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Anchor href={'mailto:' + this.state.data.values.contacts[0].values.email} target="_blank">
								{this.state.data.values.contacts[0].values.email}
							</Anchor>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Anchor href={this.state.data.values.contacts[0].values.website} target="_blank">
								{this.state.data.values.contacts[0].values.website}
							</Anchor>
						</TableHeaderInner>
					</TableData>
					<TableData width="20%">
						<TableHeaderInner>
							{this.state.data.values.addresses[0] !== undefined ? (
								this.state.data.values.addresses[0].values.line1 || 'no address found'
							) : (
								'no address found'
							)}
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>0.00</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							<Span>{this.state.data.values.general.values.status}</Span>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner>
							{this.state.data.values.general.values.onCreditHold === false ? 'NO' : 'Yes'}
						</TableHeaderInner>
					</TableData>
				</TableRow>

				{/* <TableRow>
					<TableCell
						style={{ padding: 0 }}
						colSpan={12}
						className={clsx({
							[classes.hide]: !this.state.open
						})}
					>
						<Collapse in={this.state.open} timeout="auto" unmountOnExit>
							<h1>T</h1>
						</Collapse>
					</TableCell>
				</TableRow> */}
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(CollapseData);

const TableRow = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: #f0f3fa;
	}
`;

const TableData = styled.td`
	font-family: inherit;
	vertical-align: middle;
	border-bottom: 1px solid #e7e8ec;
	overflow: hidden;
	padding: 5px 0;
	height: 60px;
	float: none !important;
`;

const TableHeaderInner = styled.div`
	width: 100%;
	padding: 0 3px;
	color: #41454e;
	vertical-align: middle;
	font-size: 13px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
`;
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
