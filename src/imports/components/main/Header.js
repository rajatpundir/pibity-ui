import React from 'react';
import styled from 'styled-components';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
class Header extends React.Component {

	// const styles = (theme) => ({
	// 	'@global': { //styling scrollbar using material Ui
	// 		'*::-webkit-scrollbar': {
	// 		  width: '0.5em'
	// 		},
	// 		'*::-webkit-scrollbar-track': {
	// 		  '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
	// 		},
	// 		'*::-webkit-scrollbar-thumb': {
	// 		  backgroundColor: 'rgba(0,0,0,.1)',
	// 		  outline: '1px solid slategrey',
	// 		  borderRadius:'10%'
	// 		}
	// 	  },
	// )}	

	render() {
		console.log(this.props.match);
		const url = this.props.match.url.split('/')[1];
		const { classes } = this.props;
		return (
			<HeaderContainer>
				<Breadcrumbs aria-label="breadcrumb">
					<Link color="inherit" href="/" >
						Home{' '}
					</Link>
					<Link color="inherit" href={'/' + `${url}`}>
						{url}{' '}
					</Link>
					if(this.match.params.variableName){
						<Link color="textPrimary" href={this.props.match.params.url} aria-current="page">
							{this.props.match.params.variableName}
						</Link>
					}
				</Breadcrumbs>
			</HeaderContainer>
		);
	}
}

export default Header;

const HeaderContainer = styled.div`
	// position: sticky;
	// width: 100%;
	// margin-bottom: 25px;
    width: 100%;
    height: 60px;
    padding: 10px 10px;
    background: #fff;
    float: left;
    border-radius: 6px;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    position: relative;
    margin-bottom: 20px !important;
}

`;
const FooterInner = styled.div`
	text-align: center;
	border-top: 1px solid #e0e1e7;
	height: 64px;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-ms-flex-pack: center;
	justify-content: center;
	background: #fff;
`;
