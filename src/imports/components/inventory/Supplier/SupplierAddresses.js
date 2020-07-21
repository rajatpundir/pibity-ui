import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cloneDeep, keyBy } from 'lodash';
import { clearErrors } from '../../../redux/actions/errors';
import { getVariables } from '../../../redux/actions/variables';

class SupplierAddresses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list
        };
        this.onChange = this.onChange.bind(this);
    }

    // clear form errors
    componentDidMount() {
        this.props.clearErrors();
        this.props.getVariables("Country")
        this.props.getVariables("AddressType")
    }

    onChange(e, variableName) {
        const list = cloneDeep(this.state.list).map((listVariable) => {
            if (listVariable.get('variableName') === variableName) {
                const values = listVariable.get('values')
                values.set(e.target.name, e.target.value)
                listVariable.set('values', values)
                return listVariable
            } else {
                return listVariable
            }
        })
        this.setState({ list: list });
        this.props.updateAddresses(list)
    }

    addVariableToList() {
        const list = cloneDeep(this.state.list)
        list.unshift(new Map([
            ['variableName', String(list.length)],
            ['values', new Map([
                ['name', ''],
                ['line1', ''],
                ['line2', ''],
                ['city', ''],
                ['state', ''],
                ['postCode', ''],
                ['country', ''],
                ['type', '']
            ])]
        ]))
        this.setState({
            list: list
        })
    }

    renderInputFields() {
        console.log(this.props)
        const rows = [];
        this.state.list.forEach(listVariable =>
            rows.push(
                <TableRow key={listVariable.get('variableName')}>
                    <TableHeader width="5%" left="0px">
                        {' '}
                    </TableHeader>
                    <TableHeader width="10%" left="7%">
                        <Input
                            name="name"
                            type="text"
                            value={listVariable.get('values').get('name')}
                            onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                        />
                    </TableHeader>
                    <TableHeader width="10%" left="16%">
                        <Input
                            name="line1"
                            type="text"
                            value={listVariable.get('values').get('line1')}
                            onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                        />
                    </TableHeader>
                    <TableHeader width="8%" left="25%">
                        <Input
                            name="line2"
                            type="text"
                            value={listVariable.get('values').get('line2')}
                            onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                        />
                    </TableHeader>
                    <TableHeader width="8%" left="37%">
                        <Input
                            name="city"
                            type="text"
                            value={listVariable.get('values').get('city')}
                            onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                        />
                    </TableHeader>
                    <TableHeader width="8%" left="50%">
                        <Input
                            name="state"
                            type="text"
                            value={listVariable.get('values').get('state')}
                            onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                        />
                    </TableHeader>
                    <TableHeader width="8%" left="62%">
                        <Input
                            name="postCode"
                            type="text"
                            value={listVariable.get('values').get('postCode')}
                            onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                        />
                    </TableHeader>
                    <TableHeader width="8%" left="75%">
                        <Input
                            name="country"
                            type="text"
                            value={listVariable.get('values').get('country')}
                            onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                        />
                    </TableHeader>
                    <TableHeader width="10%" left="86%">
                        <Input
                            name="type"
                            type="text"
                            value={listVariable.get('values').get('type')}
                            onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                        />
                    </TableHeader>
                </TableRow>
            )
        )
        return (rows)
    }

    render() {
        return (
            <PageBlock>
                <PageBar>
                    <PageBarAlignLeft>
                        <PlusButton onClick={(e) => this.addVariableToList()}>
                            <i className="large material-icons">add</i>
                        </PlusButton>
                    </PageBarAlignLeft>
                </PageBar>
                <InputBody>
                    <RoundedBlock>
                        <TableFieldContainer>
                            <Headers>
                                <HeaderContainer>
                                    <HeaderContainerInner>
                                        <ColumnName width="6%" left="0px">
                                            <SelectIconContainer>
                                                <SelectSpan>
                                                    <SelectSpanInner>
                                                        <i className="large material-icons">create</i>
                                                    </SelectSpanInner>
                                                </SelectSpan>
                                            </SelectIconContainer>
                                        </ColumnName>
                                        <ColumnName width="10%" left="7%">
                                            <SelectIconContainer>
                                                <SelectSpan>Name</SelectSpan>
                                            </SelectIconContainer>
                                        </ColumnName>
                                        <ColumnName width="10%" left="16%">
                                            <SelectIconContainer>
                                                <SelectSpan>Line 1</SelectSpan>
                                            </SelectIconContainer>
                                        </ColumnName>
                                        <ColumnName width="10%" left="25%">
                                            <SelectIconContainer>
                                                <SelectSpan textAlign="right">Line 2</SelectSpan>
                                            </SelectIconContainer>
                                        </ColumnName>
                                        <ColumnName width="10%" left="37%">
                                            <SelectIconContainer>
                                                <SelectSpan>City / Suburb</SelectSpan>
                                            </SelectIconContainer>
                                        </ColumnName>
                                        <ColumnName width="12%" left="50%">
                                            <SelectIconContainer>
                                                <SelectSpan> State / Province</SelectSpan>
                                            </SelectIconContainer>
                                        </ColumnName>
                                        <ColumnName width="11%" left="62%">
                                            <SelectIconContainer>
                                                <SelectSpan>PostCode</SelectSpan>
                                            </SelectIconContainer>
                                        </ColumnName>
                                        <ColumnName width="10%" left="75%">
                                            <SelectIconContainer>
                                                <SelectSpan>Country</SelectSpan>
                                            </SelectIconContainer>
                                        </ColumnName>
                                        <ColumnName width="10%" left="86%">
                                            <SelectIconContainer>
                                                <SelectSpan>Type</SelectSpan>
                                            </SelectIconContainer>
                                        </ColumnName>
                                    </HeaderContainerInner>
                                </HeaderContainer>
                            </Headers>
                            <HeaderBodyContainer>
                                <HeaderBody>
                                    <BodyTable>
                                        <TableBody>
                                            {this.renderInputFields()}
                                        </TableBody>
                                    </BodyTable>
                                </HeaderBody>
                            </HeaderBodyContainer>
                            <AddMoreBlock>
                                <AddMoreButton onClick={(e) => this.addVariableToList()}>
                                    <i className="large material-icons">add</i>Add More Addresess
                                </AddMoreButton>
                            </AddMoreBlock>
                        </TableFieldContainer>
                    </RoundedBlock>
                </InputBody>
            </PageBlock>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    errors: state.errors,
    types: state.types,
    variables: state.variables
});

export default connect(mapStateToProps, { clearErrors, getVariables })(SupplierAddresses);

const PageBlock = styled.div`
	display: block;
	background: #fff;
	width: 100%;
	float: left;
	border-radius: 6px;
	margin-bottom: 20px;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'IBM Plex Sans', sans-serif;
	vertical-align: baseline;
	align-items: center;
`;

const PageBar = styled.div`
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	border-top: 1px solid #e0e1e7;
`;

const PageBarAlignLeft = styled.div`
	display: flex;
	justify-content: flex-start !important;
	align-items: center;
	float: left;
`;

const PlusButton = styled.button`
	margin-left: 5px;
	color: #04beb3;
	background-color: #05cbbf;
	border-color: #05cbbf;
	width: 32px !important;
	min-width: 32px !important;
	max-width: 32px !important;
	justify-content: center;
	padding: 0 !important;
	height: 32px !important;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	flex-direction: row;
	align-items: center;
	background: transparent;
	white-space: nowrap;
	border-radius: 4px;
`;

const InputBody = styled.div.attrs((props) => ({
    alignitem: props.alignItem || 'start',
    borderTop: props.borderTop || '1px solid #e0e1e7'
}))`
    border-top: 0px;
    align-items: ${(props) => props.alignItem};
	max-height: 4000px;
	overflow: hidden;
	animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	-webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
	transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	-webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
		padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
	border-top:  ${(props) => props.borderTop};
	-webkit-flex-flow: row wrap;
	flex-flow: row wrap;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 20px 20px 0 20px;
	padding-bottom: 20px !important;
`;

const RoundedBlock = styled.div.attrs((props) => ({
    marginTop: props.marginTop || '0'
}))`
	border: 1px solid #b9bdce;
	border-radius: 4px;
	width: 100%;
	float: left;
	overflow: hidden;
	margin-top:${(props) => props.marginTop};
`;

const TableFieldContainer = styled.div`
	width: 100% !important;
	min-height: auto !important;
	text-align: center;
	position: relative !important;
	top: 0 !important;
	height: inherit !important;
	float: left;
	overflow: hidden !important;
`;

const Headers = styled.div`
	border-width: 0px;
	width: 100%;
	left: 0px;
	top: 0px;
	border-top: 0 !important;
	zoom: 1;
	cursor: default;
	background-color: #fff;
	border-bottom: 1px solid #e7e8ec !important;
	border-top: 1px solid #e7e8ec !important;
	height: 60px;
	overflow: hidden;
`;

const HeaderContainer = styled.div`
	width: 100%;
	height: 100% !important;
	overflow: hidden;
	zoom: 1;
	position: relative;
	left: 0;
	top: 0;
`;

const HeaderContainerInner = styled.div`
	position: absolute;
	left: 0px;
	top: 0px;
	height: 100% !important;
	width: 100% !important;
`;

const ColumnName = styled.div.attrs((props) => ({
    width: props.width,
    left: props.left
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
	border-width: 1px;    
    height: auto;
    margin: 0px;
    top: 0px;
   font-size: 11px;
    font-weight: bold;
    font-family: inherit;
    color: #707887;
    text-transform: uppercase;
    letter-spacing: -0.4px;
    vertical-align: middle;
    position: absolute;
    bottom: 0; 
`;

const SelectIconContainer = styled.div`
	justify-content: center;
	padding: 0 10px !important;

	font-weight: bold;
	font-size: 11px;
	text-transform: uppercase;
	height: 100% !important;
	display: flex;
	align-self: stretch;
	width: 100%;
`;

const SelectSpan = styled.span.attrs((props) => ({
    textAlign: props.textAlign || 'left'
}))`
	display: flex;
	align-items: center;
	overflow: hidden;
	text-align: ${(props) => props.textAlign};
	cursor: pointer;
`;

const SelectSpanInner = styled.span`white-space: nowrap;`;

const HeaderBodyContainer = styled.div`
	width: 100%;
	height: auto;
	height: inherit !important;
	float: left;
	height: auto !important;
	position: relative;
	top: 0 !important;
	left: 0 !important;
	overflow: hidden;
`;

const HeaderBody = styled.div`
	border-width: 0px;
	overflow: auto;
	margin: 0px;
	width: 1158px;
`;

const BodyTable = styled.table`
	width: 100%;
	height: 1px;
	table-layout: fixed;
	border-collapse: separate;
	border-collapse: collapse;
	border-spacing: 0;
`;

const TableBody = styled.tbody``;

const AddMoreBlock = styled.div`
	flex-flow: row wrap;
	display: flex;
	width: 100%;
	padding: 16px 20px;
	align-items: center;
	justify-content: inherit !important;
`;

const AddMoreButton = styled.button`
	background-color: transparent;
	color: #05cbbf;
	border-color: transparent;
	min-width: 70px;
	padding: 0 10px;
	height: 32px !important;
	border-width: 1px;
	border-style: solid;
	font-family: inherit;
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	text-decoration: none;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	background: transparent;
	height: 40px;
	white-space: nowrap;
	border-radius: 4px;
	padding: 0 16px;
	cursor: pointer;
	-webkit-transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out,
		opacity 0.15s ease-in-out;
	&:hover {
		outline: none;
	}
`;

const Input = styled.input`
	font-size: 13px;
	outline: none !important;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	border-color: #b9bdce;
	padding: 11px 10px 10px 10px;
	color: #3b3b3b;
	font-size: 13px;
	font-weight: 400;
	font-family: inherit;
	flex: 1;
	min-height: 40px;
	background-color: #fff;
	-webkit-transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	font-family: "IBM Plex Sans", sans-serif !important;
	line-height: normal;
	font-size: 100%;
	margin: 0;
	outline: none;
	vertical-align: baseline;
`;

const TableHeader = styled.th.attrs((props) => ({
    width: props.width,
    height: props.height || '0',
    left: props.left || '0'
}))`
width: ${(props) => props.width};
left:${(props) => props.left};
`;

const TableRow = styled.tr``;

const EmptyRow = styled.div`
	text-align: center;
	border-bottom: 1px solid #e7e8ec;
	min-height: 59px !important;
	line-height: 55px;
`;
