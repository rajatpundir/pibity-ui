import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import itemList from './itemList.json';
import DropDown from './DropDownMenu';
import { DropDownMenu } from './DropDownMenu';

class Navigation extends React.Component {
	constructor(props) {
		super();
		this.state = {
			children: []
		};
		this.onUpdateChildren = this.onUpdateChildren.bind(this);
	}

	onUpdateChildren(subMenu) {
		this.setState({ children: subMenu });
	}

	renderMenuItem(menuItems) {
		return menuItems.map((item) => {
			if (item.subMenu) {
				return (
					<MenuItem
						key={item.name}
						onMouseEnter={(e) => this.onUpdateChildren(item.subMenu)}
						onMouseLeave={(e) => this.onUpdateChildren([])}
					>
						<ItemWithSubMenu to={item.url}>
							{item.name}
							<KeyboardArrowDownIcon />
						</ItemWithSubMenu>
						<DropDown subMenu={this.state.children} />
					</MenuItem>
				);
			}
			return (
				<MenuItem key={item.name}>
					<ItemAnchor to={item.url}>{item.name}</ItemAnchor>
				</MenuItem>
			);
		});
	}
	render() {
		return (
			<Header>
				<NavigationBarContainer>
					<NavigationBar>
						<LogoContainer>
							<LogoLink to="/">
								<Logo
									src="https://dearsystems.com/wp-content/uploads/2020/08/dear-system-logo.svg"
									alt=""
								/>
							</LogoLink>
						</LogoContainer>
						<NavMenuContainer>
							<MenuList>{this.renderMenuItem(itemList.data)}</MenuList>
						</NavMenuContainer>
					</NavigationBar>
				</NavigationBarContainer>
			</Header>
		);
	}
}
export default Navigation;

export const Header = styled.header`
	position: fixed;
	background-color: #fff;
	z-index: 999;
	top: 0;
	left: 0;
	width: 100%;
	-webkit-transition: 250ms ease-out;
	-o-transition: 250ms ease-out;
	transition: 250ms ease-out;
`;

export const NavigationBarContainer = styled.div`
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
`;

export const NavigationBar = styled.div`
	/* height: 72px; */
	position: relative;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	padding: 0 20px;
	max-width: 1410px;
	width: 100%;
	margin: 0 auto;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	@media screen and (max-width: 1410px) and (min-width: 767px) {
		padding: 0 20px;
	}
	@media screen and (min-width: 768px) {
		padding: 0 40px;
	}
`;

export const LogoContainer = styled.div`
	margin: 0;
	padding: 0;
	border: 0;
	display: flex;
`;

export const LogoLink = styled(Link)`
    text-decoration: none;
    margin: 16px 16px 16px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

`;

export const Logo = styled.img`
	display: block;
	height: auto;
`;

export const NavMenuContainer = styled.nav`
	margin-right: 30px;
	align-items: center;
	display: flex;
	@media screen and (min-width: 1200px) {
		width: 100%;
	}
	@media screen and (min-width: 1025px) {
		display: -webkit-box !important;
		display: -ms-flexbox !important;
		display: flex !important;
		max-width: 650px;
	}
	@media screen and (max-width: 1410px) {
		margin-right: 16px;
	}
	/* @media screen and (max-width: 1024px) {
	 	background-color: #fff;
	 }
	 @media screen and (max-width: 1024px) {
	 	position: absolute;
	 	z-index: 50;
	 	top: 100%;
	 	left: 0;
	 	width: 100%;
	 	height: calc(100vh - 121px);
	 	overflow: auto;
	 	display: none;
	 } */
`;

const MenuList = styled.ul`
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	width: 100%;
	list-style: none;
	height: 100%;
	/* @media screen and (min-width: 1025px) {
		height: 100%;
	} */
	/* @media screen and (max-width: 1024px) {
	 	-webkit-box-orient: vertical;
	 	-webkit-box-direction: normal;
	 	-ms-flex-direction: column;
	 	flex-direction: column;
		width: 100%;
	 } */
`;
export const ItemAnchor = styled(Link)`
	font-family: "Inter", sans-serif;
	position: relative;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	color: #3b3b3b;
	font-weight: 500;
	font-size: 1.4rem;
	line-height: 16px;
	letter-spacing: .2px;
	-webkit-transition: all 250ms ease-out;
	-o-transition: all 250ms ease-out;
	transition: all 250ms ease-out;
	text-decoration: none;
	height: 100%;
	&:hover{
		color: #04beb3;	
		}
	/* @media screen and (min-width: 1025px) {
		height: 100%;
	} */
`;

export const ItemWithSubMenu = styled(Link)`
	font-family: "Inter", sans-serif;
	position: relative;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	color: #3b3b3b;
	font-weight: 500;
	font-size: 1.4rem;
	line-height: 16px;
	letter-spacing: .2px;
	-webkit-transition: all 250ms ease-out;
	-o-transition: all 250ms ease-out;
	transition: all 250ms ease-out;
	text-decoration: none;
	&::after {
		top: 45px;
		opacity: 1;
		visibility: hidden;
		position: absolute;
		z-index: 100;
		content: "";
		bottom: -11px;
		left: calc(50% - 8px);
		width: 18px;
		height: 18px;
		background-color: #fff;
		-webkit-box-shadow: -1px 1px 1px 0 #b5b9c291;
		box-shadow: -1px 1px 1px 0 #b5b9c291;
		border-radius: 2px;
		-webkit-transform: rotate(135deg) translate(-5px,5px);
        -ms-transform: rotate(135deg) translate(-5px,5px);
        transform: rotate(135deg) translate(-5px,5px);
    /* -webkit-transition: all 250ms ease-out;
    -o-transition: all 250ms ease-out;
    transition: all 250ms ease-out; */
	}
	height: 100%;

	/* 
	@media screen and (min-width: 1025px) {
		height: 100%;
	} */
`;

export const MenuItem = styled.li`
	margin: 0;
	border: 0;
	font-size: 100%;
	padding: 0 8px;
	height: 100%;
	font: inherit;
	vertical-align: baseline;
	-webkit-transition: all 250ms ease-out;
	-o-transition: all 250ms ease-out;
	transition: all 250ms ease-out;

	/* can be used to add property to style of its child component */
	&:hover {
		${DropDownMenu} {
			visibility: visible;
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		${ItemWithSubMenu} {
			color: #04beb3;
			&::after {
				visibility: visible;
				opacity: 1;
				transform: rotate(135deg) translate(0, 0);
				/* transition: all 250ms ease-out; */
			}
		}
	}
`;
