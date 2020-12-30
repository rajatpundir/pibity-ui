import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {
	TableData,
	TableHeaderInner,
	TableRow,
	StatusSpan,
	StatusBackgroundColor
} from '../../../../styles/inventory/Style';
const styles = (theme) => ({
	hide: {
		border: 'none'
	}
});

class AccountData extends React.Component {
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
		const { classes } = this.props;
		return (
			<React.Fragment key={this.props.data.variableName}>
				<TableRow key={this.props.data.variableName}>
					{/* <TableData width="5%">
						<IconButton
							aria-label="expand row"
							size="small"
						>
						</IconButton>
					</TableData> */}
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">
							<Link to={'/accounts/' + encodeURIComponent(this.props.data.variableName)}>
								{this.props.data.values.name}
							</Link>
						</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">{this.props.data.values.code}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">{this.props.data.values.accountCategory}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<TableHeaderInner overflow="hidden">{this.props.data.values.accountType}</TableHeaderInner>
					</TableData>
					<TableData width="10%">
						<StatusSpan
							backgroundColor={
								this.props.data.values.status === 'Active' ? (
									StatusBackgroundColor.active
								) : (
									StatusBackgroundColor.depricated
								)
							}
						>
							{this.props.data.values.status}
						</StatusSpan>
					</TableData>
				</TableRow>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(AccountData);
