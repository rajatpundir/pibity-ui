/* eslint-disable no-useless-concat */
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import { HeaderContainer } from '../../styles/main/HeaderAndFooter';

const styles = (theme) => ({
	links: {
		color: '#8b8e98',
		fontSize: '1.50em',
		fontStyle: 'italic',
		width: '100%',
		textDecoration: 'none',
		fontWeight: '500',
		'&:hover,&:focus,&:active': {
			textDecoration: 'none',
			color: 'black'
		}
	}
});

class Header extends React.Component {
	render() {
		const url = this.props.match.url.split('/')[1];
		const { classes } = this.props;
		return (
			<HeaderContainer>
				{this.props.match.params.variableName ? (
					<Breadcrumbs aria-label="breadcrumb">
						<Link color="inherit" href="/dashboard" className={classes.links}>
							Home{' '}
						</Link>
						<Link color="inherit" href={'/' + `${url}`} className={classes.links}>
							{url}{' '}
						</Link>
						<Typography color="textPrimary" aria-current="page">
							{this.props.match.params.variableName}
						</Typography>
					</Breadcrumbs>
				) : (
					<Breadcrumbs aria-label="breadcrumb">
						<Link color="inherit" href="/dashboard" className={classes.links}>
							Home{' '}
						</Link>

						<Typography color="textPrimary" aria-current="page">
							{url}{' '}
						</Typography>
					</Breadcrumbs>
				)}
			</HeaderContainer>
		);
	}
}

export default withStyles(styles)(Header);
