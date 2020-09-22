import React from 'react';
import styled from 'styled-components';

class Dashboard extends React.Component {
	render() {
		return (
			<Container>
				<InnerContainer>
					<LogoContainer>h</LogoContainer>
					<Navbar>
						<NavigationList>
							<NavigationListElement>
								<NavigationListAnchor
									background="url(http://www.ksunsmt.com/cn/images/Top_tel.png) 24px center no-repeat"
									borderLeft="none"
								>
									123648616
								</NavigationListAnchor>
							</NavigationListElement>
							<NavigationListElement>
								<NavigationListAnchor
									background="url(http://www.ksunsmt.com/cn/images/Top_email.png) 24px center no-repeat"
									paddingLeft="48px"
								>
									shubham3480@gmail.com
								</NavigationListAnchor>
							</NavigationListElement>
							<NavigationListElement>
								<NavigationListAnchor
									background="url(http://www.ksunsmt.com/cn/images/Top_s.png) 24px center no-repeat"
									paddingLeft="56px"
								>
									shubham34800@gmail.com
								</NavigationListAnchor>
							</NavigationListElement>
						</NavigationList>
					</Navbar>
					<HomeNavigation>
						<HomeNavigationElement left="169px" top="0">
							<Anchor
								bottom="69px"
								paddingTop="70px"
								backgroundPosition="58px 0"
							>
								SMT <br />Machine
							</Anchor>
						</HomeNavigationElement>
						<HomeNavigationElement left="85px" top="148px">
							<Anchor
								bottom="69px"
								paddingTop="70px"
								backgroundPosition="-67px 0"
							>
								SMT Peripheral Equipment{' '}
							</Anchor>
						</HomeNavigationElement>
						<HomeNavigationElement left="253px" top="148px">
							<Anchor
								bottom="69px"
								paddingTop="70px"
								backgroundPosition="-181px 0"
							>
								SMT<br />Parts{' '}
							</Anchor>
						</HomeNavigationElement>
						<HomeNavigationElement left="0" bottom="0">
							<Anchor
								bottom="69px"
								paddingTop="75px"
								backgroundPosition="-290px 0"
							>
								About<br />Us{' '}
							</Anchor>
						</HomeNavigationElement>
						<HomeNavigationElement left="169px" bottom="0">
							<Anchor
								bottom="69px"
								paddingTop="80px"
								backgroundPosition="-407px 0"
							>
								Automation Equipment{' '}
							</Anchor>
						</HomeNavigationElement>
						<HomeNavigationElement right="0" bottom="0">
							<Anchor
								bottom="69px"
								paddingTop="70px"
								backgroundPosition="-519px 0"
							>
								Contact<br />Us{' '}
							</Anchor>
						</HomeNavigationElement>
					</HomeNavigation>
                    <BottomContainer>
                        <Bottom>
                            <BottomElement>

                            </BottomElement>
                        </Bottom>
                    </BottomContainer>
				</InnerContainer>
			</Container>
		);
	}
}

export default Dashboard;

const Container = styled.div`
	background: #0a0a0a url(../images/Home_bg.png) top center no-repeat;
	height: 840px;
`;

const InnerContainer = styled.div`
	position: relative;
	width: 1200px;
	margin: 0 auto;
`;

const LogoContainer = styled.div`
	width: 217px;
	height: 152px;
	float: left;
	margin-left: 66px;
	margin-top: 24px;
`;

const Navbar = styled.div`
	float: right;
	margin-top: 30px;
`;

const NavigationList = styled.ul`
	list-style: none;
	padding: 0px;
	margin: 0px;
`;
const NavigationListElement = styled.li`
	float: left;
	list-style: none;
	padding: 0px;
	margin: 0px;
`;

const NavigationListAnchor = styled.a.attrs((props) => ({
	background: props.background,
	borderLeft: props.borderLeft || '1px solid #5b5d61',
	paddingLeft: props.paddingLeft || '44px'
}))`
background:${(props) => props.background},
border-left:${(props) => props.borderLeft},
padding-left:${(props) => props.paddingLeft}
font-size: 16px;
    color: #ffffff;
    margin-left: 20px;
    text-decoration: none;
`;

const HomeNavigation = styled.div`
	width: 503px;
	height: 488px;
	position: absolute;
	right: 57px;
	top: 166px;
`;

const HomeNavigationElement = styled.div.attrs((props) => ({
	top: props.top,
	bottom: props.bottom,
	right: props.right,
	left: props.left
}))`
top:${(props) => props.top};
bottom:${(props) => props.bottom};
right:${(props) => props.right};
left:${(props) => props.left};
width: 165px;
height: 192px;
position: absolute;
background: url(http://www.ksunsmt.com/cn/images/MainNav_bg_1.png) no-repeat;
cursor: pointer;
`;

const Anchor = styled.a.attrs((props) => ({
	bottom: props.bottom,
	paddingTop: props.paddingTop,

	backgroundPosition: props.backgroundPosition
}))`
    bottom:${(props) => props.bottom};
    padding-top:${(props) => props.paddingTop};
    background-position:${(props) => props.backgroundPosition};
    background:url(http://www.ksunsmt.com/cn/images/Nav_list_bg_5.png) 56px top no-repeat;
    display: inline-block;
    height: 60px;
    color: #888888;
    font-size: 17px;
    line-height: 20px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    width: 100%;
    position: absolute;
    text-decoration: none;
    &:hover {
        text-decoration: none;
        color: #fff;
    }
    &:focus {
        outline: none;
        -moz-outline: none;
    }

`;

const BottomContainer = styled.div`
	position: absolute;
	top: 765px;
	width: 100%;
`;

const Bottom = styled.div`
	width: 730px;
	margin: 0 auto;
`;
const BottomElement = styled.div.attrs((props) => ({
	float: props.float,
	paddingTop: props.paddingTop,
	display: props.display
}))`
float: ${(props) => props.float};
padding-top:${(props) => props.paddingTop};
display:${(props) => props.display};
`;
