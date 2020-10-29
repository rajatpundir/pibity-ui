import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = (theme) => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing(2.5),
		fontSize: '2rem'
	},
	icon: {
		fontSize: '25px',
		color: 'black'
	}
});

class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = (event) => {
		this.props.onChangePage(event, 0);
	};

	handleBackButtonClick = (event) => {
		this.props.onChangePage(event, parseInt(this.props.page - 1));
	};

	handleNextButtonClick = (event) => {
		this.props.onChangePage(event, parseInt(this.props.page + 1));
	};

	handleLastPageButtonClick = (event) => {
		this.props.onChangePage(event, parseInt(Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)));
	};

	render() {    
		const { classes, count, page, rowsPerPage, theme } = this.props;
		return (
			<div className={classes.root}>
				<IconButton
					onClick={this.handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="First Page"
					className={classes.icon}
				>
					{theme.direction === 'rtl' ? (
						<LastPageIcon fontSize="inherit" />
					) : (
						<FirstPageIcon fontSize="inherit" />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleBackButtonClick}
					disabled={page === 0}
					aria-label="Previous Page"
					className={classes.icon}
				>
					{theme.direction === 'rtl' ? (
						<KeyboardArrowRight fontSize="inherit" />
					) : (
						<KeyboardArrowLeft fontSize="inherit" />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Next Page"
					className={classes.icon}
				>
					{theme.direction === 'rtl' ? (
						<KeyboardArrowLeft fontSize="inherit" />
					) : (
						<KeyboardArrowRight fontSize="inherit" />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Last Page"
					className={classes.icon}
				>
					{theme.direction === 'rtl' ? (
						<FirstPageIcon fontSize="inherit" />
					) : (
						<LastPageIcon fontSize="inherit" />
					)}
				</IconButton>
			</div>
		);
	}
}
export default withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);
