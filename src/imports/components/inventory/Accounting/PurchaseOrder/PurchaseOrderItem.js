import React from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../../redux/actions/errors';
import { getVariables } from '../../../../redux/actions/variables';
import Select from 'react-select';
import PurchaseOrderAmount from './PurchaseOrderAmount'

import {
    AddMoreBlock,
    AddMoreButton,
    BodyTable,
    EmptyRow,
    HeaderBody,
    HeaderBodyContainer,
    Input,
    InputBody,
    PageBar,
    PageBarAlign,
    PageBlock,
    PlusButton,
    RoundedBlock,
    SelectIconContainer,
    SelectSpan,
    SelectSpanInner,
    TableBody,
    TableData,
    TableFieldContainer,
    TableHeaderInner,
    TableHeaders,
    TableRow,
    SelectWrapper,
    RactSelectCustomStyles
} from '../../../../styles/inventory/Style';

class PurchaseOrderItem extends React.Component {
    constructor(props) {
        super();
        this.state = {
            list: props.list
        };
        this.onChange = this.onChange.bind(this);
    }

    // clear form errors
    componentDidMount() {
        this.props.clearErrors();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState,
            list: nextProps.list
        };
    }

    onChange(e, variableName) {
        const list = cloneDeep(this.state.list).map((listVariable) => {
            if (listVariable.get('variableName') === variableName) {
                const values = listVariable.get('values');
                values.set(e.target.name, e.target.value);
                listVariable.set('values', values);
                return listVariable;
            } else {
                return listVariable;
            }
        });
        this.setState({ list: list });
        this.props.updateAddresses(list);
    }

    addVariableToList() {
        const list = cloneDeep(this.state.list);
        list.unshift(
            new Map([
                [
                    'variableName',
                    String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1)
                ],
                [
                    'values',
                    new Map([
                        ['term', ''],
                        ['description', ''],
                        ['unitPrice', ''],
                        ['city', ''],
                        ['disc', ''],
                        ['account', ''],
                        ['taxRate', ''],
                        ['amountINR', '']
                    ])
                ]
            ])
        );
        this.setState({ list: list });
        this.props.updateAddresses(list);
    }

    onRemoveKey(e, variableName) {
        const list = cloneDeep(this.state.list).filter((listVariable) => {
            return listVariable.get('variableName') !== variableName;
        });
        this.setState({ list: list });
        this.props.updateAddresses(list);
    }

    renderInputFields() {
        const rows = [];
        this.state.list.forEach((listVariable) =>
            rows.push(
                <TableRow key={listVariable.get('variableName')}>
                    <TableData width="5%" left="0px">
                        <i
                            name={listVariable.get('variableName')}
                            className="large material-icons"
                            onClick={(e) => this.onRemoveKey(e, listVariable.get('variableName'))}
                        >
                            remove_circle_outline
						</i>
                    </TableData>
                    <TableData width="10%" left="7%">
                        <TableHeaderInner>
                            <Input
                                name="Term"
                                type="text"
                                value={listVariable.get('values').get('term')}
                                onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                            />
                        </TableHeaderInner>
                    </TableData>
                    <TableData width="10%" left="16%">
                        <TableHeaderInner>
                            <Input
                                name="Description"
                                type="text"
                                value={listVariable.get('values').get('description')}
                                onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                            />
                        </TableHeaderInner>
                    </TableData>
                    <TableData width="8%" left="25%">
                        <TableHeaderInner>
                            <Input
                                name="UnitPrice"
                                type="text"
                                value={listVariable.get('values').get('unitPrice')}
                                onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                            />
                        </TableHeaderInner>
                    </TableData>
                    <TableData width="8%" left="37%">
                        <TableHeaderInner>
                            <Input
                                name="city"
                                type="text"
                                value={listVariable.get('values').get('city')}
                                onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                            />
                        </TableHeaderInner>
                    </TableData>
                    <TableData width="8%" left="50%">
                        <TableHeaderInner>
                            <Input
                                name="Disc"
                                type="text"
                                value={listVariable.get('values').get('disc')}
                                onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                            />
                        </TableHeaderInner>
                    </TableData>
                    <TableData width="8%" left="62%">
                        <TableHeaderInner>
                            <Input
                                name="Account"
                                type="text"
                                value={listVariable.get('values').get('account')}
                                onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                            />
                        </TableHeaderInner>
                    </TableData>
                    <TableData width="8%" left="62%">
                        <TableHeaderInner>
                            <Input
                                name="TaxRate"
                                type="text"
                                value={listVariable.get('values').get('taxRate')}
                                onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                            />
                        </TableHeaderInner>
                    </TableData>
                    <TableData width="8%" left="62%">
                        <TableHeaderInner>
                            <Input
                                name="AmountINR"
                                type="text"
                                value={listVariable.get('values').get('amountINR')}
                                onChange={(e) => this.onChange(e, listVariable.get('variableName'))}
                            />
                        </TableHeaderInner>
                    </TableData>
                    <TableData width="8%" left="75%">
                        <TableHeaderInner>
                            <SelectWrapper>
                                <Select
                                    styles={RactSelectCustomStyles}
                                    value={{
                                        value: listVariable.get('values').get('country'),
                                        label: listVariable.get('values').get('country')
                                    }}
                                    onChange={(option) => {
                                        this.onChange(
                                            { target: { name: 'country', value: option.value } },
                                            listVariable.get('variableName')
                                        );
                                    }}
                                    options={
                                        this.props.variables.Country !== undefined ? (
                                            this.props.variables.Country.map((variable) => {
                                                return { value: variable.variableName, label: variable.variableName };
                                            })
                                        ) : (
                                                []
                                            )
                                    }
                                />
                            </SelectWrapper>
                        </TableHeaderInner>
                    </TableData>
                    <TableData width="10%" left="86%">
                        <TableHeaderInner>
                            <SelectWrapper>
                                <Select
                                    styles={RactSelectCustomStyles}
                                    value={{
                                        value: listVariable.get('values').get('addressType'),
                                        label: listVariable.get('values').get('addressType')
                                    }}
                                    onChange={(option) => {
                                        this.onChange(
                                            { target: { name: 'addressType', value: option.value } },
                                            listVariable.get('variableName')
                                        );
                                    }}
                                    options={
                                        this.props.variables.AddressType !== undefined ? (
                                            this.props.variables.AddressType.map((variable) => {
                                                return { value: variable.variableName, label: variable.variableName };
                                            })
                                        ) : (
                                                []
                                            )
                                    }
                                />
                            </SelectWrapper>
                        </TableHeaderInner>
                    </TableData>
                </TableRow>
            )
        );
        return rows;
    }

    render() {
        return (
            <PageBlock id="address">
                <PageBar>
                    <PageBarAlign>
                        <PlusButton onClick={(e) => this.addVariableToList()}>
                            <i className="large material-icons">add</i>
                        </PlusButton>
                    </PageBarAlign>
                </PageBar>
                <InputBody borderTop="0" overflow="visible">
                    <RoundedBlock overflow="visible">
                        <TableFieldContainer overflow="visible">
                            <HeaderBodyContainer>
                                <HeaderBody>
                                    <BodyTable>
                                        <TableBody>
                                            <TableRow>
                                                <TableHeaders width="6%" left="0px">
                                                    <SelectIconContainer>
                                                        <SelectSpan>
                                                            <SelectSpanInner>
                                                                <i className="large material-icons">create</i>
                                                            </SelectSpanInner>
                                                        </SelectSpan>
                                                    </SelectIconContainer>
                                                </TableHeaders>
                                                <TableHeaders width="10%" left="7%">
                                                    <SelectIconContainer>
                                                        <SelectSpan>term</SelectSpan>
                                                    </SelectIconContainer>
                                                </TableHeaders>
                                                <TableHeaders width="20%" left="26%">
                                                    <SelectIconContainer>
                                                        <SelectSpan>Description </SelectSpan>
                                                    </SelectIconContainer>
                                                </TableHeaders>

                                                <TableHeaders width="10%" left="37%">
                                                    <SelectIconContainer>
                                                        <SelectSpan>City / Quantity</SelectSpan>
                                                    </SelectIconContainer>
                                                </TableHeaders>
                                                <TableHeaders width="12%" left="50%">
                                                    <SelectIconContainer>
                                                        <SelectSpan> Unit Price</SelectSpan>
                                                    </SelectIconContainer>
                                                </TableHeaders>
                                                <TableHeaders width="11%" left="62%">
                                                    <SelectIconContainer>
                                                        <SelectSpan>Disc%</SelectSpan>
                                                    </SelectIconContainer>
                                                </TableHeaders>
                                                <TableHeaders width="10%" left="75%">
                                                    <SelectIconContainer>
                                                        <SelectSpan>Account</SelectSpan>
                                                    </SelectIconContainer>
                                                </TableHeaders>
                                                <TableHeaders width="10%" left="86%">
                                                    <SelectIconContainer>
                                                        <SelectSpan>Tax rate</SelectSpan>
                                                    </SelectIconContainer>
                                                </TableHeaders>
                                                <TableHeaders width="10%" left="86%">
                                                    <SelectIconContainer>
                                                        <SelectSpan>Amount INR </SelectSpan>
                                                    </SelectIconContainer>
                                                </TableHeaders>
                                            </TableRow>
                                            {this.renderInputFields()}
                                        </TableBody>
                                    </BodyTable>
                                </HeaderBody>
                                {this.state.list.length === 0 ? <EmptyRow>No Item found.</EmptyRow> : undefined}
                            </HeaderBodyContainer>
                            <AddMoreBlock>
                                <AddMoreButton onClick={(e) => this.addVariableToList()}>
                                    <i className="large material-icons">add</i>Add More item
								</AddMoreButton>
                            </AddMoreBlock>

                        </TableFieldContainer>

                    </RoundedBlock>

                </InputBody>
                <PurchaseOrderAmount/>

            </PageBlock>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    errors: state.errors,
    types: state.types,
    variables: state.variables
});

export default connect(mapStateToProps, { clearErrors, getVariables })(PurchaseOrderItem);
