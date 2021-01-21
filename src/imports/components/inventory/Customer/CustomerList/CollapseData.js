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
import {
	StatusSpan,
	StatusBackgroundColor,
	TableData,
	TableHeaderInner,
	TableRow
} from '../../../../styles/inventory/Style';
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
					{this.props.layout.get('name') ? (
						<TableData width="10%">
							<TableHeaderInner overflow="hidden">
								<Link to={'/customerList/' + encodeURIComponent(this.state.data.variableName)}>
									{this.state.data.variableName}
								</Link>
							</TableHeaderInner>
						</TableData>
					) : (
						undefined
					)}
					{this.props.layout.get('contact') ? (
						<TableData width="10%">
							<TableHeaderInner overflow="hidden">
								{this.state.data.values.contacts[0].values.name}
							</TableHeaderInner>
						</TableData>
					) : (
						undefined
					)}
					{this.props.layout.get('phone') ? (
						<TableData width="10%">
							<TableHeaderInner overflow="hidden">
								<Anchor href={'tel:' + this.state.data.values.contacts[0].values.phone}>
									{this.state.data.values.contacts[0].values.phone}
								</Anchor>
							</TableHeaderInner>
						</TableData>
					) : (
						undefined
					)}
					{this.props.layout.get('email') ? (
						<TableData width="10%">
							<TableHeaderInner overflow="hidden">
								<Anchor
									href={'mailto:' + this.state.data.values.contacts[0].values.email}
									target="_blank"
								>
									{this.state.data.values.contacts[0].values.email}
								</Anchor>
							</TableHeaderInner>
						</TableData>
					) : (
						undefined
					)}
					{this.props.layout.get('website') ? (
						<TableData width="10%">
							<TableHeaderInner overflow="hidden">
								<Anchor href={this.state.data.values.contacts[0].values.website} target="_blank">
									{this.state.data.values.contacts[0].values.website}
								</Anchor>
							</TableHeaderInner>
						</TableData>
					) : (
						undefined
					)}
					{this.props.layout.get('address') ? (
						<TableData width="20%">
							<TableHeaderInner overflow="hidden">
								{this.state.data.values.addresses[0] !== undefined ? (
									this.state.data.values.addresses[0].values.line1 || 'no address found'
								) : (
									'no address found'
								)}
							</TableHeaderInner>
						</TableData>
					) : (
						undefined
					)}
					{this.props.layout.get('due') ? (
						<TableData width="10%">
							<TableHeaderInner overflow="hidden">{this.props.totalDue}</TableHeaderInner>
						</TableData>
					) : (
						undefined
					)}
					{this.props.layout.get('status') ? (
						<TableData width="10%">
							<TableHeaderInner overflow="hidden">
								<StatusSpan
									backgroundColor={
										this.state.data.values.general.values.status === 'Active' ? (
											StatusBackgroundColor.active
										) : (
											StatusBackgroundColor.depricated
										)
									}
								>
									{this.state.data.values.general.values.status}
								</StatusSpan>
							</TableHeaderInner>
						</TableData>
					) : (
						undefined
					)}
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


const Anchor = styled.a`
	text-decoration: none;
	color: #05cbbf;
`;
