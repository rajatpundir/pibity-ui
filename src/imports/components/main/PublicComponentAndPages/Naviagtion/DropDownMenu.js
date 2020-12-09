import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class DropDown extends React.Component {
	constructor(props) {
		super();
		this.state = {
			subMenu: props.subMenu
		};
	}

	renderSubMenu(subMenu) {
		return subMenu.map((subMenuItem) => {
			return (
				<DropDownMenuItem key={subMenuItem.name}>
					<div />
					<div>
						<Heading>{subMenuItem.name}</Heading>
						<Detail>{subMenuItem.detail}</Detail>
					</div>
				</DropDownMenuItem>
			);
		});
	}

	render() {
		return <DropDownMenu>{this.renderSubMenu(this.props.subMenu)}</DropDownMenu>;
	}
}
export default DropDown;
export const DropDownContent = styled.div`
	position: absolute;
	background-color: #f9f9f9;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	top: 40px;
`;

export const DropDownAnchoer = styled.a`
	float: none;
	color: black;
	padding: 12px 16px;
	text-decoration: none;
	display: block;
	text-align: left;
`;

export const DropDownMenu = styled.div`
	position: absolute;
	z-index: 50;
	left: 20px;
	top: 100%;
	width: 100%;
	padding: 16px;
	box-shadow: 14px 14px 50px rgba(0, 0, 0, .05);
	border: 1px solid #e0e1e7;
	box-sizing: border-box;
	border-radius: 6px;
	background-color: #fff;
	box-shadow: 14px 14px 50px rgba(0, 0, 0, .05);
	border: 1px solid #e0e1e7;
	box-sizing: border-box;
	border-radius: 6px;
	background-color: #fff;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	/* grid-template-rows: repeat(2, 1fr); */
	gap: 16px;
	max-width: calc(100% - 40px);
	&::before {
		position: absolute;
		content: "";
		top: -20px;
		left: 0;
		width: 100%;
		height: 20px;
	}
	visibility: hidden;
	opacity: 0;
	transform: translateY(-10px) scale(.99);
	transition: 350ms ease-out;
`;

export const DropDownMenuItem = styled.a`
	position: relative;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	border-radius: 6px;
	padding: 16px;
	box-sizing: border-box;
	transition: 250ms ease-out;
	text-decoration: none;
	&:hover {
		transition: 250ms ease-out;
		background: #f1f6fb;
	}
`;

export const Heading = styled.h6`
	margin: 4px;
	color: #3b3b3b;
	font-size: 14px;
	font-weight: 800;
`;
export const Detail = styled.p`
	margin: 4px;
	font-family: "Inter", sans-serif;
	font-size: 12px;
	line-height: 15px;
	letter-spacing: .2px;
	color: #000;
	opacity: .5;
`;
