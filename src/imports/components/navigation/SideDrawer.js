import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class SideDrawer extends React.Component {
	constructor(props) {
		super();
	}

	render() {
		return (
			<SideDrawerContainer style={{ left: this.props.left }}>
				<Title>{this.props.title}</Title>
				<SideBarBody>
					<BodyInner>
						<ListContainer>
							<List>
								{this.props.data.map((item) => {
									return (
										<ListItem key={item.name}>
											<LS.NavFixedItem_LINK to={item.url}>
												<span>{item.name}</span>
											</LS.NavFixedItem_LINK>
										</ListItem>
									);
								})}
							</List>
						</ListContainer>
					</BodyInner>
				</SideBarBody>
			</SideDrawerContainer>
		);
	}
}

export default SideDrawer;

export const SideDrawerContainer = styled.div`
	z-index: 1200;
	position: fixed;
	left: 240px;
	top: 0;
	bottom: 0;
	width: 210px;
	background-color: #30424b;
	font-size: 13px;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
`;

export const Title = styled.div`
	color: #fff;
	padding: 18px 0 13px 20px;
	font-size: 17.8px;
	font-weight: 500;
	float: left;
	display: block;
	width: 100%;
	margin-top: 65px;
`;
export const SideBarBody = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
`;
export const BodyInner = styled.div`
	overflow-y: auto;
	height: 100%;
	padding-bottom: 20px;
`;

export const ListContainer = styled.div``;

export const List = styled.ul`
	margin-top: 5px;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	height: 100%;
	list-style: none;
`;
export const ListItem = styled.li``;

const LS = {};
LS.NavFixedItem_LINK = styled(Link)`
color: #def3ff;
	padding-left: 20px;
	text-decoration: none;
	height: 35px;
	font-size: 13px;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-webkit-flex-direction: row;
	-ms-flex-direction: row;
	flex-direction: row;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: left;
	-webkit-justify-content: left;
	-ms-flex-pack: left;
	justify-content: left;
	font-weight: 400;
`;
