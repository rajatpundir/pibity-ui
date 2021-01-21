import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    BlockListItemButton,
    HorizontalListPageBlock,
    HorizontalBlockListOuter,
    HorizontalBlockListInnerWrapper,
    HoizontalBlockList,
    HoizontalBlockListItems
} from '../../../styles/inventory/Style';

class ReferenceBook extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <PageContainerDiv>
                <PageBodyDiv>
                    <PageBlockDiv>
                        <PageBlockInner>
                            <PageBlockInner1>
                                <HorizontalListPageBlock>
                                    <HorizontalBlockListOuter>
                                        <HorizontalBlockListInnerWrapper padding="0 35px">
                                            <HoizontalBlockList height="auto" id="listnav">
                                                <HoizontalBlockListItems style={{ marginRight: '13px' }}>
                                                    <BlockListItemButton style={{ width: '130px' }}
                                                        onClick={(e) => {
                                                            this.setState({ visibleSection: 'All' });
                                                        }}
                                                    >
                                                        All
											        </BlockListItemButton>
                                                </HoizontalBlockListItems>
                                                <HoizontalBlockListItems style={{ marginRight: '13px' }}>
                                                    <BlockListItemButton style={{ width: '130px' }}
                                                        onClick={(e) => {
                                                            this.setState({ visibleSection: 'yourCompany' });
                                                        }}
                                                    >
                                                        Your Company
											        </BlockListItemButton>
                                                </HoizontalBlockListItems>
                                                <HoizontalBlockListItems style={{ marginRight: '13px' }}>
                                                    <BlockListItemButton style={{ width: '130px' }}
                                                        onClick={(e) => {
                                                            this.setState({ visibleSection: 'dimensions' });
                                                        }}
                                                    >
                                                        Financial
											        </BlockListItemButton>
                                                </HoizontalBlockListItems>
                                                <HoizontalBlockListItems style={{ marginRight: '13px' }}>
                                                    <BlockListItemButton style={{ width: '130px' }}
                                                        onClick={(e) => {
                                                            this.setState({ visibleSection: 'supplier' });
                                                        }}
                                                    >
                                                        Default Field Values
											        </BlockListItemButton>
                                                </HoizontalBlockListItems>
                                                <HoizontalBlockListItems style={{ marginRight: '19px' }}>
                                                    <BlockListItemButton style={{ width: '130px' }}
                                                        onClick={(e) => {
                                                            this.setState({ visibleSection: 'customPrice' });
                                                        }}
                                                    >
                                                        Other Items
											        </BlockListItemButton>
                                                </HoizontalBlockListItems>
                                                <HoizontalBlockListItems style={{ marginRight: '19px' }}>
                                                    <BlockListItemButton style={{ width: '130px' }}
                                                        onClick={(e) => {
                                                            this.setState({ visibleSection: 'reorderLevels' });
                                                        }}
                                                    >
                                                        Stocks
											        </BlockListItemButton>
                                                </HoizontalBlockListItems>
                                                <HoizontalBlockListItems style={{ marginRight: '19px' }}>
                                                    <BlockListItemButton style={{ width: '130px' }}
                                                        onClick={(e) => {
                                                            this.setState({ visibleSection: 'discounts' });
                                                        }}
                                                    >
                                                        RMA
								                    </BlockListItemButton>
                                                </HoizontalBlockListItems>
                                                <HoizontalBlockListItems style={{ marginRight: '11px' }}>
                                                    <BlockListItemButton style={{ width: '130px' }}
                                                        onClick={(e) => {
                                                            this.setState({ visibleSection: 'additionalUnitOfMeasure' });
                                                        }}
                                                    >
                                                        CRM
											        </BlockListItemButton>
                                                </HoizontalBlockListItems>
                                            </HoizontalBlockList>
                                        </HorizontalBlockListInnerWrapper>
                                    </HorizontalBlockListOuter>
                                </HorizontalListPageBlock>
                                <Section2Div>
                                    <Section2MainDiv>
                                        <Section2Part1Div>
                                            <Section2FirstDiv>
                                                <YourCompanyDiv>Your Company</YourCompanyDiv>
                                                <Section2Part1Body>
                                                    <Section2Block1>
                                                        <Section2A href='/companyAddress'>
                                                            <Section2InnerDiv>Company Addresses</Section2InnerDiv>
                                                            <div>The 'Company Addresses' page displays a list of your addresses.</div>
                                                            <Section2Span>
                                                                <i class="material-icons">menu_book</i>
                                                            </Section2Span>
                                                        </Section2A>
                                                    </Section2Block1>
                                                    <Section2Block2>
                                                        <Section2A href='/companyContact'>
                                                            <Section2InnerDiv>Company Contact</Section2InnerDiv>
                                                            <div>Add or update your contact list, phone numbers or e-mail addresses</div>
                                                            <Section2Span>
                                                                <i class="material-icons">list</i>
                                                            </Section2Span>
                                                        </Section2A>
                                                    </Section2Block2>
                                                    <Section2Block2>
                                                        <Section2A href='/pibityTopibityNetworking'>
                                                            <Section2InnerDiv>PIBITY to PIBITY Networking</Section2InnerDiv>
                                                            <div>If your supplier or customer uses PIBITY, connect with them directly and receive their invoices into your Sales and Purchases.</div>
                                                            <Section2Span>
                                                                <i class="material-icons">people_outline</i>
                                                            </Section2Span>
                                                        </Section2A>
                                                    </Section2Block2>
                                                </Section2Part1Body>
                                            </Section2FirstDiv>
                                            <PageMargin>
                                                <Section2FirstDiv>
                                                    <YourCompanyDiv>Financial</YourCompanyDiv>
                                                    <Section2Part1Body>
                                                        {/* <Section2Block1>
                                                            <Section2A href='/chartofAccount'>
                                                                <Section2InnerDiv>Charts of Acoounts</Section2InnerDiv>
                                                                <div>Add or update ledger account information, import your Chart of Accounts</div>
                                                                <Section2Span>
                                                                    <i class="material-icons">list</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block1> */}
                                                        <Section2Block2>
                                                            <Section2A to='/accounts'>
                                                                <Section2InnerDiv>Accounts</Section2InnerDiv>
                                                                <div>View  Accounts .</div>
                                                                <Section2Span>
                                                                    <i class="material-icons">subject</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2>
                                                        {/* <Section2Block2>
                                                            <Section2A href='/accountmapping'>
                                                                <Section2InnerDiv>Account Mapping</Section2InnerDiv>
                                                                <div>Set up mapping between Chart of Accounts and Business Processes.</div>
                                                                <Section2Span>
                                                                    <i class="material-icons">subject</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2> */}
                                                        {/* <Section2Block2>
                                                            <Section2A href='/openingbalance'>
                                                                <Section2InnerDiv>Opening Balance</Section2InnerDiv>
                                                                <div>Specify your accounts opening balances</div>
                                                                <Section2Span>
                                                                    <i class="material-icons">subject</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2> */}
                                                        <Section2Block2>
                                                            <Section2A to='/taxRules'>
                                                                <Section2InnerDiv>Taxation Rule</Section2InnerDiv>
                                                                <div>Add or modify tax rules. Every buy or sell transaction will use it for tax calculation</div>
                                                                <Section2Span>
                                                                    <i class="material-icons">subject</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2>
                                                        <Section2Block2>
                                                            <Section2A to='/paymentTerms'>
                                                                <Section2InnerDiv>Payments Terms</Section2InnerDiv>
                                                                <div>Specify the range of payment terms you are planning to use on your invoices.</div>
                                                                <Section2Span>
                                                                    <i class="material-icons">subject</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2>
                                                        {/* <Section2Block2>
                                                            <Section2A href='/fixedassetstype'>
                                                                <Section2InnerDiv> Fixed Assets Type</Section2InnerDiv>
                                                                <div>Specify the fixed asset types you are planning to use for product depreciation default parameters.</div>
                                                                <Section2Span>
                                                                    <i class="material-icons">subject</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2> */}
                                                    </Section2Part1Body>
                                                </Section2FirstDiv>
                                            </PageMargin>
                                            <PageMargin>
                                                <Section2FirstDiv>
                                                    <YourCompanyDiv>Defaults Value Fields</YourCompanyDiv>
                                                    <Section2Part1Body>
                                                        <Section2Block1>
                                                            <Section2A to='/productList'>
                                                                <Section2InnerDiv>Product</Section2InnerDiv>
                                                                <div>
                                                                    Define the values for the fields that will be populated
                                                                    by default in Product Dialogs within the system and in new Product creation page.
                                                            </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">menu_book</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block1>
                                                        <Section2Block2>
                                                            <Section2A to='/customerList'>
                                                                <Section2InnerDiv>Customer</Section2InnerDiv>
                                                                <div>
                                                                    Define the values for the fields that will be populated
                                                                    by default in Customer Dialogs within the system and in new Customer creation
                                                                    page.
                                                            </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">list</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2>
                                                        <Section2Block2>
                                                            <Section2A to='/supplierList'>
                                                                <Section2InnerDiv>Supplier</Section2InnerDiv>
                                                                <div>
                                                                    Define the values for the fields that will be populated
                                                                    by default in Supplier Dialogs within the system and in new Supplier creation
                                                                    page.
                                                                 </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">people_outline</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2>
                                                    </Section2Part1Body>
                                                </Section2FirstDiv>
                                            </PageMargin>
                                        </Section2Part1Div>

                                        <Section2Megin>
                                            <div>
                                                <Section2FirstDiv>
                                                    <YourCompanyDiv>Other Items</YourCompanyDiv>
                                                    <Section2Part1Body>
                                                        <Section2Block1>
                                                            <Section2A to='/carrierServices'>
                                                                <Section2InnerDiv>Carrier</Section2InnerDiv>
                                                                <div>
                                                                    List of carriers you will be using to transport your goods
                                                                </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">airport_shuttle</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block1>
                                                        {/* <Section2Block2>
                                                            <Section2A href='/shippingZones'>
                                                                <Section2InnerDiv>Shipping Zones</Section2InnerDiv>
                                                                <div>
                                                                    List of defined shipping zones to determine customer's shipping fees
                                                                </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">local_shipping</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2> */}
                                                        {/* <Section2Block2>
                                                            <Section2A href='/additionalAttribute'>
                                                                <Section2InnerDiv>Additional Attributes</Section2InnerDiv>
                                                                <div>
                                                                    Additional attributes you can choose for your products, suppliers, customers and jobs.
                                                                </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">loyalty</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2> */}
                                                        {/* <Section2Block2>
                                                            <Section2A href='/mailinglist'>
                                                                <Section2InnerDiv>Mailing List</Section2InnerDiv>
                                                                <div>
                                                                    Mailing lists can be used to group company or external contacts so that they can easily be notified.
                                                                </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">local_post_office</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2> */}
                                                    </Section2Part1Body>

                                                </Section2FirstDiv>
                                            </div>
                                            <PageMargin>
                                                <Section2FirstDiv>
                                                    <YourCompanyDiv>Stocks</YourCompanyDiv>
                                                    <Section2Part1Body>
                                                        <Section2Block1>
                                                            <Section2A to='/productCategories'>
                                                                <Section2InnerDiv>Product Catergories</Section2InnerDiv>
                                                                <div>
                                                                    Add and modify categories for product segmentation
                                                                </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">workspaces</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block1>
                                                        <Section2Block2>
                                                            <Section2A to='/brands'>
                                                                <Section2InnerDiv>Brands</Section2InnerDiv>
                                                                <div>
                                                                    Add and modify brands for product segmentation
                                                                </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">loyalty</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2>
                                                        <Section2Block2>
                                                            <Section2A to='/locationsandbins'>
                                                                <Section2InnerDiv>Locations </Section2InnerDiv>
                                                                <div>
                                                                    Manage your locations (warehouses, shops, etc) and bins.
                                                                </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">place</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2>
                                                       
                                                        <Section2Block2>
                                                            <Section2A to='/unitOfMeasure'>
                                                                <Section2InnerDiv>Unit of Measurement</Section2InnerDiv>
                                                                <div>
                                                                    Define Units of Measure you will be using.
                                                                 </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">multiline_chart</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2>
                                                        
                                                       
                                                        <Section2Block2>
                                                            <Section2A to='/warranties'>
                                                                <Section2InnerDiv> Warranties </Section2InnerDiv>
                                                                <div>
                                                                    Define warranty terms.
                                                                </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">description</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block2>
                                                    </Section2Part1Body>

                                                </Section2FirstDiv>


                                            </PageMargin>

                                            <PageMargin>

                                                <Section2FirstDiv>
                                                    <YourCompanyDiv>CRM </YourCompanyDiv>
                                                    <Section2Part1Body>
                                                        <Section2Block1>
                                                            <Section2A href='/crm'>
                                                                <Section2InnerDiv>Lead Statuses</Section2InnerDiv>
                                                                <div>
                                                                    Define custom statuses for leads.
                                                            </div>
                                                                <Section2Span>
                                                                    <i class="material-icons">list</i>
                                                                </Section2Span>
                                                            </Section2A>
                                                        </Section2Block1>


                                                    </Section2Part1Body>

                                                </Section2FirstDiv>

                                            </PageMargin>
                                        </Section2Megin>
                                    </Section2MainDiv>
                                </Section2Div>

                            </PageBlockInner1>
                        </PageBlockInner>
                    </PageBlockDiv>
                </PageBodyDiv>
            </PageContainerDiv>
        )
    }
}
export default ReferenceBook;

export const PageContainerDiv = styled.div`
    width: 100%;
    border-radius: 6px;
    padding: 20px 20px 0 20px;
    position: relative;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-flex: 1;
    flex-grow: 1;
    border: 0;
    font-size: 100%;
    font: inherit;
    margin: 0;
    box-sizing: border-box;
`;
export const PageBodyDiv = styled.div`
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    box-sizing: border-box;
    display: block;
    -webkit-box-direction: normal;
    color: #3B3B3B;
    text-align: left;
    letter-spacing: -0.2px;
    font-family: 'IBM Plex Sans', sans-serif;
`;
export const PageBlockDiv = styled.div`
    float: none;
    width: 100%;
    order-radius: 6px;
    margin-bottom: 20px;
    background: transparent !important;
    margin: 0 auto;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    box-sizing: border-box;
    display: block;
    -webkit-box-direction: normal;
    color: #3B3B3B;
    text-align: left;
    letter-spacing: -0.2px;
    font-family: 'IBM Plex Sans', sans-serif;
`;
export const PageBlockInner = styled.div`
    margin: 0 auto;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    box-sizing: border-box;
    display: block;
    -webkit-box-direction: normal;
    color: #3B3B3B;
    text-align: left;
    letter-spacing: -0.2px;
    font-family: 'IBM Plex Sans', sans-serif;
`;
export const PageBlockInner1 = styled.div`
    display: block;
    float: none;
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    box-sizing: border-box;
    display: block;
    -webkit-box-direction: normal;
    color: #3B3B3B;
    text-align: left;
    letter-spacing: -0.2px;
    font-family: 'IBM Plex Sans', sans-serif;

`;
export const Section1Div = styled.div`
flex-basis: 25%;
// width: 360px;
// height: 1968px;
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
box-sizing: border-box;
display: block;
color: #3B3B3B;
text-align: left;
letter-spacing: -0.2px;
font-family: 'IBM Plex Sans', sans-serif;
`;





export const PageList = styled.ul`
    margin-bottom: 20px;
    padding: 5px 0 5px 10px;
    float: none;
    display: block;
    background: #fff;
    border-radius: 6px;
    border-bottom: none;
    -webkit-box-pack: inherit;
    justify-content: inherit;
    height: auto;
    width: 100%;
    list-style: none;
    border: 0;
    font-size: 100%;
    font: inherit;
    margin: 0;
    box-sizing: border-box;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    font-family: 'IBM Plex Sans', sans-serif;
    color: #3B3B3B;
    text-align: left;
    letter-spacing: -0.2px;

`;
export const PageListItems = styled.li`
    display: inline-block;
    margin: 5px 4px;
    height: 100%;
    position: relative;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    box-sizing: border-box;
    text-align: -webkit-match-parent;
    list-style: none;
    letter-spacing: -0.2px;
`;
export const PageLink = styled.a`
background: #f1f6fb;
    font-weight: 500;
    font-size: 13px;
    line-height: 17px;
    letter-spacing: -0.2px;
    margin: 0;
    border: 0;
    padding: 10px 15px;
    text-align: -webkit-match-parent;
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
    justify-content: center;
    box-sizing: border-box;
    width: 270px;
    text-transform: none;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    cursor: pointer;
    text-decoration: none;
    height: 100%;
    transition: color 0.15s ease-in-out;
    -webkit-box-pack: center;
    -webkit-box-align: center;
`
export const Section2Div = styled.div`
    flex-basis: 75%;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    box-sizing: border-box;
    display: block;
    -webkit-box-direction: normal;
    color: #3B3B3B;
    text-align: left;
    letter-spacing: -0.2px;
`;
export const Section2MainDiv = styled.div`
    display: flex;
    float: none;
    height: 100%;
    border-top: none;
    padding: 0;
    width: 100%;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    margin: 0;
    box-sizing: border-box;
    text-align: left;
    letter-spacing: -0.2px;
`;
export const Section2Part1Div = styled.div`
    padding-left: 20px;
    flex-basis: 50%;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    box-sizing: border-box;
    display: block;
    color: #3B3B3B;
    text-align: left;
    letter-spacing: -0.2px;
    margin-bottom:25px;
    
`;
export const Section2FirstDiv = styled.div`
    display: block !important;
    position: relative;
    overflow: hidden;
    background: #fff;
    border-radius: 6px;
    margin-bottom: 20px;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    box-sizing: border-box;
`;
export const YourCompanyDiv = styled.div`
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    letter-spacing: -0.4px;
    border-bottom: 1px solid #e0e1e7;
    color: #3b3b3b;
    padding: 15px 80px 15px 20px;
    
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    border: 0;
    display: block;
    box-sizing: border-box;
    margin: 0;
`;
export const Section2Part1Body = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    box-sizing: border-box;
    color: #3B3B3B;
    text-align: left;
    letter-spacing: -0.2px;
    box-sizing: border-box;
`;
export const Section2Block1 = styled.div`
    border-top: none;
    padding: 24px 52px 24px 76px;
    position: relative;
    margin: 0;
    /* padding: 0; */
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    box-sizing: border-box;
    display: block;
`;
export const Section2Block2 = styled.div`
    border-top: 1px solid #f0f2f4;
    border-top: none;
    padding: 24px 52px 24px 76px;
    position: relative;
    margin: 0;
    /* padding: 0; */
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    box-sizing: border-box;
    display: block;
`;
export const Section2A = styled(Link)`
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    text-align: left;
    letter-spacing: -0.2px;
    text-decoration: none;
`;
export const Section2InnerDiv = styled.div`
    font-weight: bold;
    font-size: 15px;
    line-height: 19px;
    letter-spacing: -0.4px;
    text-transform: capitalize;
    color: #3b3b3b;
    margin-bottom: 5px;
    
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
    text-align: left;
`;
export const Section2Span = styled.div`

    background-color: #f1f6fb;
    border-radius: 50%;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 40px;
    color: #4dddf3;
    height: 40px;
    position: absolute;
    left: 20px;
    top: calc(50% - 20px);
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'IBM Plex Sans', sans-serif;
    vertical-align: baseline;
    text-align: left;
    letter-spacing: -0.2px;
`;
export const PageMargin = styled.div`
margin-top:25px
`;


export const Section2Megin = styled.div`
margin-left:50px
`



