import React from 'react';
import styled from 'styled-components';
import ReactToPrint from 'react-to-print';
import '../../styles/Test.css';

class PrintTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'JYY Automation',
			address: 'PlotNo 18 ',
			city: ' Sector 140A Gautum Budha Nagar',
			state: 'Noida,Uttar Pradesh-201305',
			contact: '+91877015489',
			email: 'yash.arya@jyyautomation.com/jhon@jyyautomation.com',
			supplierName: 'A',
			supplierAddress: 'PlotNo 18 ',
			supplierCity: ' Sector 140A Gautum Budha Nagar',
			supplierState: 'Noida,Uttar Pradesh-201305',
			supplierContactName: 'Abishek',
			supplierContact: '+91877015489',
			supplierEmail: 'yash.arya@jyyautomation.com',
			items:[
				{
					product:"ABC",
					quantity:10,
					price:250,
					total:2500,
					tax:"0%"
				},
				{
					product:"XTC",
					quantity:10,
					price:150,
					total:1500,
					tax:"0%"
				}
			]
		};
	}

	
	render() {
		return (
			<div>
				<ReactToPrint
					trigger={() => {
						// NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
						// to the root node of the returned component as it will be overwritten.
						return <a href="#">Print this out!</a>;
					}}
					content={() => this.componentRef}
				/>
				<TemplateContainer ref={(el) => (this.componentRef = el)}>
					<HeadingContainer padding="13px">
						<Heading>Quotation</Heading>
					</HeadingContainer>
					<Section>
						<OrganizationInfoContainer>
							<Heading>{this.state.name}</Heading>
							{this.state.address}
							<br />
							{this.state.city}
							<br />
							{this.state.state}
							<br />
							Contact:{this.state.contact} Email:{this.state.email}
						</OrganizationInfoContainer>
					</Section>
					<HeadingContainer padding="5px" borderTop="1px solid">
						<Heading>Quotation Number :5478900</Heading>
					</HeadingContainer>
					<Section>
						<InnnerSectionContainer>
							<InnerSection>
								<HeadingContainer borderBottom="1px solid" padding="5px">
									<H5>Supplier Details</H5>
								</HeadingContainer>

								<InnnerSectionContainer>
									<InnerSection width="30%" padding="0 2px">
										<P fontWeight="bold">Name</P>
										<P fontWeight="bold">Address</P>
									</InnerSection>
									<InnerSection width="70%">
										<P>{this.state.supplierName}</P>
										<P>{this.state.supplierAddress}</P>
										<P>{this.state.supplierCity}</P>
										<P>{this.state.supplierState}</P>
									</InnerSection>
								</InnnerSectionContainer>
							</InnerSection>
							<InnerSection borderLeft="1px solid">
								<HeadingContainer borderBottom="1px solid" padding="5px">
									<H5>Supplier Contact</H5>
								</HeadingContainer>
								<InnnerSectionContainer>
									<InnerSection width="30%" padding="0 2px">
										<P fontWeight="bold">Date -</P>
										<P fontWeight="bold">Contact Name -</P>
										<P fontWeight="bold">Contact No -</P>
										<P fontWeight="bold">Email -</P>
									</InnerSection>
									<InnerSection width="70%">
										<P>"12/1/2021"</P>
										<P>{this.state.supplierContactName}</P>
										<P>{this.state.supplierContact}</P>
										<P>{this.state.supplierEmail}</P>
									</InnerSection>
								</InnnerSectionContainer>
							</InnerSection>
						</InnnerSectionContainer>
					</Section>

					<Section style={{minHeight:"450px"}}>green</Section>
					<Section>
						<InnnerSectionContainer>
							<InnerSection>
								<HeadingContainer borderBottom="1px solid" padding="3px">
									<H5>Bank Details</H5>
								</HeadingContainer>

								<InnnerSectionContainer>
									<InnerSection width="30%" padding="0 2px">
										<P fontWeight="bold">Bank Name</P>
										<P fontWeight="bold">Account Number</P>
										<P fontWeight="bold">IFSC Code</P>
									</InnerSection>
									<InnerSection width="70%">
										<P>Indus Bank</P>
										<P>2010035684</P>
										<P>INDB0000533</P>
									</InnerSection>
								</InnnerSectionContainer>
							</InnerSection>
							<InnerSection borderLeft="1px solid">
								<HeadingContainer borderBottom="1px solid" padding="3px">
									<H5>GST </H5>
								</HeadingContainer>
								<P fontWeight="bold" margin="15px auto" padding="10px">
									09AAECJ88DD76ZF
								</P>
							</InnerSection>
						</InnnerSectionContainer>
					</Section>
					<Section>
					         <HeadingContainer borderBottom="1px solid" padding="3px">
									<H5>Terms And Condition</H5>
								</HeadingContainer>
						<InnnerSectionContainer>
							<InnerSection  width="100%">
								<InnnerSectionContainer>
									<InnerSection width="30%" padding="0 2px">
										<P fontWeight="bold">Bank Name</P>
										<P fontWeight="bold">Account Number</P>
										<P fontWeight="bold">IFSC Code</P>
									</InnerSection>
									<InnerSection width="70%">
										<P>Indus Bank</P>
										<P>2010035684</P>
										<P>INDB0000533</P>
									</InnerSection>
								</InnnerSectionContainer>
							</InnerSection>
						
						</InnnerSectionContainer>
					</Section>
				</TemplateContainer>
			</div>
		);
	}
}
export default PrintTest;
const TemplateContainer = styled.div`
	display: block;
	background: #ffffff;
	border: 1px solid;
	min-width: 1000px; // as it is only used for Print Purpose only
	margin: 10px 20px;
	//Specifies the properties during print
	@page {
		margin: 1cm;
	}
`;
const HeadingContainer = styled.div.attrs((props) => ({
	padding: props.padding,
	borderBottom: props.borderBottom,
	borderTop: props.borderTop
}))`
	display: block;
	text-align: center;
	height: max-content;
	padding: ${(props) => props.padding};
	border-top: ${(props) => props.borderTop};
	border-bottom: ${(props) => props.borderBottom};
`;

const Heading = styled.h3`font-size: 25px;`;

const H5 = styled.h5`
	font-size: medium;
	font-weight: 600;
`;

const P = styled.p.attrs((props) => ({
	fontSize: props.fontSize || 'medium',
	fontWeight: props.fontWeight,
	margin: props.margin || 0,
	padding: props.padding || '5px'
}))`
	width: fit-content;
    padding: ${(props) => props.padding};
	margin:${(props) => props.margin};
	font-size: ${(props) => props.fontSize};
	font-weight: ${(props) => props.fontWeight};
`;

const Section = styled.div.attrs((props) => ({
	display: props.display || 'block'
}))`
	display: ${(props) => props.display};
	width: 100%;
	border-top: 1px solid;
`;

const OrganizationInfoContainer = styled.div`
	width: 100%;
	height: max-content;
	display: block;
	text-align: center;
	padding: 20px 5px 10px;
	font-size: 20px;
`;

const InnnerSectionContainer = styled.div.attrs((props) => ({
	bordeTop: props.bordeTop,
	textAlign: props.textAlign || 'initial'
}))`
	display: flex;
	width: 100%;
	border-top: ${(props) => props.borderTop};

`;

const InnerSection = styled.div.attrs((props) => ({
	borderLeft: props.borderLeft,
	textAlign: props.textAlign || 'initial',
	padding: props.padding,
	width: props.width || '50%'
}))`
	width: ${(props) => props.width};
	border-left: ${(props) => props.borderLeft};
    text-align:${(props) => props.textAlign};
	padding:${(props) => props.padding}

`;
