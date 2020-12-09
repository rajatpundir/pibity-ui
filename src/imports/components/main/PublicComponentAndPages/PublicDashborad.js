import React from 'react';
import styled from 'styled-components';

class PublicDashBoard extends React.Component {
	constructor(props) {
		super();
		this.state = {};
	}
	render() {
		return (
			<MainContainer>
				<Section position="relative" padding="90px 0 0;">
					<PageHead>
						<div>
							<PageHeadingContainer>
								<PageHeading>
									Cloud ERP Software to help you
									<br />
									<span style={{ color: '#05cbbf' }}>Connect all your sales channels</span>
									<BlinkAnimation>|</BlinkAnimation>
								</PageHeading>
								<PageHeadingParagraph>
									Don’t let tech logistics limit your growth. Evolve, manage, analyze and automate
									every aspect of your business with a centralized online platform and
									enterprise-level tools.
								</PageHeadingParagraph>
							</PageHeadingContainer>
							<PageHeadingImageOuterContainer>
								<PageHeadingImageInnerContainer>
									<PageHeadingImage
										src="https://dearsystems.com/wp-content/uploads/2020/09/dash.svg"
										alt=""
									/>
								</PageHeadingImageInnerContainer>
							</PageHeadingImageOuterContainer>
						</div>
					</PageHead>
					<PageBottom>
						<PageBottomInner>
							<PageBottomHeader>
							Top Rated ERP System Worldwide by
							</PageBottomHeader>
						</PageBottomInner>
					</PageBottom>
				</Section>
			</MainContainer>
		);
	}
}
export default PublicDashBoard;

export const MainContainer = styled.main`margin-top: 120px;`;

export const Section = styled.section.attrs((props) => ({
	position: props.position,
	padding: props.padding
}))`
    position:${(props) => props.position};
    padding:${(props) => props.padding};
`;

export const PageHead = styled.div`
	position: relative;
	z-index: 5;
	max-width: 1800px;
	width: 100%;
	padding: 0 20px;
	margin: 0 auto;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	@media screen and (min-width: 768px) {
		padding: 0 40px;
	}
`;
export const PageHeadingContainer = styled.div`
	max-width: 1064px;
	margin: 0 auto;
	text-align: center;
`;

export const PageHeading = styled.h1`
	max-width: 1020px;
	margin: 0 auto;
	color: #3b3b3b;
	text-align: center;
	line-height: 1.18;
	font-weight: 900;

	@media (max-width: 1410px) and (min-width: 767px) {
		font-size: calc(32px + 32 * (100vw / 1410));
	}
`;

export const BlinkAnimation = styled.span`
	font-weight: 300;
	color: #05cbbf;
	opacity: 1;
	animation: blinkingText 1.2s infinite;
	@keyframes blinkingText {
		0% {
			color: #05cbbf;
		}
		49% {
			color: #05cbbf;
		}
		60% {
			color: transparent;
		}
		99% {
			color: transparent;
		}
		100% {
			color: #05cbbf;
		}
	}
`;

export const PageHeadingParagraph = styled.p`
	max-width: 625px;
	margin: 16px auto 0;
	text-align: center;
	color: #3e525d;
	font-size: 16px;
	line-height: 1.4;
	letter-spacing: .32px;
`;

export const PageHeadingImageOuterContainer = styled.div`
	max-width: 1570px;
	width: 100%;
	border-radius: 8px;
	position: relative;
	z-index: 10;
	margin: 66px auto 0;
`;

export const PageHeadingImageInnerContainer = styled.div`
	position: relative;
	z-index: 7;
	border-radius: 8px;
	overflow: hidden;
	margin: 0;
	padding: 0;
	border: 0;
`;
export const PageHeadingImage = styled.img`
	width: 100%;
	display: block;
	height: auto;
`;

export const PageBottom = styled.div`
	text-align: center;
	margin-top: 10px;
	border-bottom: 1px solid #e9eaee;
	padding: 54px 0 50px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
`;

export const PageBottomInner = styled.div`
	position: relative;
	z-index: 5;
	max-width: 1800px;
	padding: 0 40px;
	width: 100%;
	margin: 0 auto;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
`;
export const PageBottomHeader = styled.h6`
	font-weight: 800;
	font-size: 14px;
	line-height: 17px;
	color: #b5b9c2;
	margin-bottom: 54px;
`;
