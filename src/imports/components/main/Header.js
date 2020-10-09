/* eslint-disable no-useless-concat */
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
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
				<Breadcrumbs aria-label="breadcrumb" >
					<Link color="inherit" href="/" className={classes.links}>
						Home{' '}
					</Link>
					<Link color="inherit" href={'/' + `${url}`} className={classes.links}>
						{url}{' '}
					</Link>
					if(this.match.params.variableName){
						<Link
							color="textPrimary"
							href={this.props.match.params.url}
							aria-current="page"
							className={classes.links}
						>
							{this.props.match.params.variableName}
						</Link>
					}
				</Breadcrumbs>
			</HeaderContainer>
		);
	}
}

export default withStyles(styles)(Header);
