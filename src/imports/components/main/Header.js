import React from 'react';
import styled from 'styled-components';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
				<Breadcrumbs aria-label="breadcrumb">
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
					  {/* <Typography color="textPrimary">Breadcrumb</Typography> */}

				</Breadcrumbs>
			</HeaderContainer>
		);
	}
}

export default withStyles(styles)(Header);

const HeaderContainer = styled.div`
margin-top:70px;
    width: 100%;
    height: 45px;
    padding: 10px 10px;
    background: #fff;
    float: left;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
	position: relative;
	border-bottom: 1px solid #e0e1e7;
}
`;
