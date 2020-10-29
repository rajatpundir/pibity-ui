import React from 'react';
import styled from 'styled-components';

class QuickbooksExpence extends React.Component {
	constructor(props) {
		super();
		this.state = {};
	}
	render() {
		return (
			<Container>
				<Header>
					<HeaderInner>
						<HeaderRow>
							<Icon />
							<HeaderCell>
								<HeaderHeading>Purchase Order</HeaderHeading>
								<InputContainer />
							</HeaderCell>
						</HeaderRow>
					</HeaderInner>
				</Header>
				<PageBody>
					<PageUpperBlock>
						<UpperBlockBody>
							<UpperBodyRow>
								<UpperBodyCell width="90%">
									<UpperBodyInputOuter>
										<UpperBodyInputInner>
											<InputLabel>Supplier</InputLabel>
											<InputContainer width="245px">
												<Input 
                                                type="text"
                                                placeholder="Add New"
                                                />
											</InputContainer>
										</UpperBodyInputInner>
										<UpperBodyInputInner>
											<InputLabel>Email</InputLabel>
											<InputContainer width="275px">
												<Input 
                                                type="text"
                                                placeholder="email"
                                                />
											</InputContainer>{' '}
										</UpperBodyInputInner>
									</UpperBodyInputOuter>
								</UpperBodyCell>
								<UpperBodyCell width="10%">
									<HeadingRight>
										<HeadingRightInner>
											<UpperBodyRow>
												<UpperBodyCell>
													<RightItemContainer>
														<RightItemLabel>Amount</RightItemLabel>
														<RightItem>₹0.00</RightItem>
													</RightItemContainer>
												</UpperBodyCell>
											</UpperBodyRow>
										</HeadingRightInner>
									</HeadingRight>
								</UpperBodyCell>
							</UpperBodyRow>
						</UpperBlockBody>
					</PageUpperBlock>
                    <PageUpperBlock>
                    <UpperBlockBody>
							<UpperBodyRow>
								<UpperBodyCell width="25%">
									<UpperBodyInputOuter>
										<UpperBodyInputInner>
											<InputLabel>Email</InputLabel>
											<InputContainer width="275px">
												<TextArea 
                                                type="text"
                                                placeholder="email"
                                                />
											</InputContainer>{' '}
										</UpperBodyInputInner>
									</UpperBodyInputOuter>
								</UpperBodyCell>
								<UpperBodyCell width="25%">
									<UpperBodyInputOuter>
										<UpperBodyInputInner>
											<InputLabel>Email</InputLabel>
											<InputContainer width="275px">
												<Input 
                                                type="text"
                                                placeholder="email"
                                                />
											</InputContainer>{' '}
                                            <TextArea 
                                                type="text"
                                                placeholder="email"
                                                />
										</UpperBodyInputInner>
									</UpperBodyInputOuter>
								</UpperBodyCell>
                                <UpperBodyCell width="25%">
									<UpperBodyInputOuter>
										<UpperBodyInputInner>
											<InputLabel>Email</InputLabel>
											<InputContainer width="275px">
												<Input 
                                                type="textArea"
                                                placeholder="email"
                                                />
											</InputContainer>{' '}
										</UpperBodyInputInner>
									</UpperBodyInputOuter>
								</UpperBodyCell>
                                
							</UpperBodyRow>
						</UpperBlockBody>
					</PageUpperBlock>
				</PageBody>
			</Container>
		);
	}
}

export default QuickbooksExpence;

const Container = styled.div`
	margin: 0;
	min-width: 1020px;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	height: 100%;
`;
const Header = styled.header`display: block;`;

const HeaderInner = styled.div`
	border-bottom: 1px solid #d4d7dc;
	height: 50px;
	background-color: #f4f5f8;
	position: relative;
	z-index: 3;
`;

const HeaderRow = styled.div`
	display: table-row;
	vertical-align: top;
`;
const Icon = styled.div`
	width: 51px;
	border-right: none;
	height: 50px;
	padding: 0;
	cursor: pointer;
	font-size: 28px;
	color: #6b6c72;
	line-height: 50px;
	text-align: center;
`;

const HeaderCell = styled.div`
	display: table-cell;
	vertical-align: top;
	width: 100%;
`;

const HeaderHeading = styled.div`
	white-space: normal;
	line-height: normal;
	padding-top: 10px;
	font-size: 24px;
	font-weight: 700;
	display: inline-block;
`;

const PageBody = styled.div`
	flex: 1;
	overflow: auto;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
`;

const PageUpperBlock = styled.div`
	width: 100%;
	min-height: 147px;
	background-image: none;
	background-color: #f4f5f8;
	border-bottom: none;
	padding: 10px 25px;
	transition: padding .5s;
`;

const UpperBlockBody = styled.div`
	display: table;
	table-layout: fixed;
	box-sizing: border-box;
	width: 100%;
`;
const UpperBodyRow = styled.div`
	display: table-row;
	vertical-align: top;
`;
const UpperBodyCell = styled.div.attrs((props) => ({
	width: props.width
}))`
	width:${(props) => props.width};
	display: table-cell;
	padding-right: 25px;
	vertical-align: middle;
`;

const UpperBodyInputOuter = styled.div`
	vertical-align: top;
	display: inline-block;
`;
const UpperBodyInputInner = styled.div`
	padding-top: 10px;
	padding-right: 10px;
	display: inline-block;
`;
const InputLabel = styled.div`
	padding-right: 5px;
	font-weight: 600;
	line-height: 25px;
	font-size: 1.2rem;
`;

const InputContainer = styled.div.attrs((props) => ({
	width: props.width
}))`
	width:${(props) => props.width};
	display: inline-block;
	border: 0;
	padding: 0;
	vertical-align: middle;
`;

const Input = styled.input`
	box-shadow: 0 0 0 2px rgba(161, 161, 161, 0.25);
	padding: 0 38px 0 8px;
	box-sizing: border-box;
	outline: none;
	height: 32px;
	border: 1px solid #babec5;
	border-radius: 2px;
	transition-property: border;
	transition-duration: 0.35s;
	font-size: 13px;
	background-color: #ffffff;
	width: 100%;
	vertical-align: middle;
	font-weight: 400;
	font: inherit;
	line-height: normal;
	color: inherit;
	&:focus {
		border-color: #2ca01c;
		outline: none;
	}
`;

const HeadingRight = styled.div`
	float: right;
	display: table;
	table-layout: fixed;
	box-sizing: border-box;
`;
const HeadingRightInner = styled.div`
	display: table-row;
	vertical-align: top;
	margin: 0;
	padding: 0;
`;
const RightItemContainer = styled.div`
	padding-left: 10px;
	display: inline-block;
`;
const RightItemLabel = styled.div`
    padding-left: 38px;
	font-weight: 600;
	color: #6b6c72;
	font-size: 1.2rem;
	line-height: 1.2rem;
`;
const RightItem = styled.div`
	font-weight: 700;
	line-height: 44px;
	font-size: 36px;
`;

const TextArea=styled.textarea`
width: 215px;
    height: 6.6em;
    resize: none;
    font-size: 16px!important;
    padding: 7px 8px;
    vertical-align: middle;
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 2px;
    transition-property: border;
    transition-duration: 0.35s;
    border: 1px solid #BABEC5;
    outline: none;


`