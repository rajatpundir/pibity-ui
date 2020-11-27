import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { clearErrors } from '../../../../redux/actions/errors';
import { getVariables } from '../../../../redux/actions/variables';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import {
    InputColumnWrapper,
    InputRowWrapper,
    InputFieldContainer,
    Input,
    Required,
    InputBody,
    InputLabel,
    LeftItemH1,
    PageBlock,
    PageToolbar,
    SelectWrapper,
    ToolbarItems,
    FormControl,

} from '../../../../styles/inventory/Style';


class PurchaseOrderDetailsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            open: true
        };
        this.onChange = this.onChange.bind(this);
        this.onVariableNameChange = this.onVariableNameChange.bind(this);
    }

    // clear form errors
    componentDidMount() {
        this.props.clearErrors();
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState,
            variable: nextProps.variable
        };
    }

    onVariableNameChange(e) {
        const variable = cloneDeep(this.state.variable);
        variable.set('variableName', e.target.value);
        this.setState({ variable: variable });
        this.props.updateDetails(variable);
    }

    onChange(e) {
        const variable = cloneDeep(this.state.variable);
        const values = variable.get('values');
        values.set(e.target.name, e.target.value);
        variable.set('values', values);
        this.setState({ variable: variable });
        this.props.updateDetails(variable);
    }

    render() {
        console.log(this.state.list);
        return (
            <PageBlock paddingBottom="0">
                <PageToolbar>
                    <ToolbarItems>
                        <LeftItemH1>New Purchase Order</LeftItemH1>
                    </ToolbarItems>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => this.setState({ open: !this.state.open })}
                    >
                        {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </PageToolbar>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <InputBody overflow="visible">
                        <InputFieldContainer>
                            <InputColumnWrapper>

                                <FormControl>
                                    <Input />
                                    <InputLabel>
                                        Customer
										<Required>*</Required>
                                    </InputLabel>
                                </FormControl>
                                <FormControl>
                                    <Input
                                        name="date"
                                        type="date"
                                        placeholder="date"
                                        // value={this.state.variable.get('date')}
                                        onChange={this.onChange}
                                    />
                                    <InputLabel>
                                        Date <Required>*</Required>
                                    </InputLabel>
                                </FormControl>



                            </InputColumnWrapper>
                            <InputColumnWrapper>
                                <FormControl>
                                    <Input
                                        name="reference"
                                        type="text"
                                        placeholder="reference"
                                        // value={this.state.variable.get('reference')}
                                        onChange={this.onChange} />
                                    <InputLabel>
                                        Reference
										<Required>*</Required>
                                    </InputLabel>
                                </FormControl>
                                <FormControl>

                                    <Input
                                        name="date"
                                        type="date"
                                        placeholder="date"
                                        // value={this.state.variable.get('duedate')}
                                        onChange={this.onChange}
                                    />

                                    <InputLabel>
                                        Due Date<Required>*</Required>
                                    </InputLabel>
                                </FormControl>

                            </InputColumnWrapper>
                            <InputColumnWrapper>
                                <FormControl>
                                    <Input
                                        name="orderNumber"
                                        type="text"
                                        placeholder="PO-001"
                                        // value={this.state.variable.get('values').get('orderNumber')}
                                        onChange={this.onChange}
                                    />
                                    <InputLabel>Order Number</InputLabel>
                                </FormControl>


                                <FormControl>
                                    <SelectWrapper>
                                        <Select
                                            value={{
                                                // value: this.state.variable.get('values').get('brandingTheme'),
                                                // label: this.state.variable.get('values').get('brandingTheme')
                                            }}
                                            onChange={(option) => {
                                                this.onChange({
                                                    target: { name: 'defaultCarrier', value: option.value }
                                                });
                                            }}
                                            options={
                                                this.props.variables.CarrierService !== undefined ? (
                                                    this.props.variables.CarrierService.map((variable) => {
                                                        return {
                                                            value: variable.variableName,
                                                            label: variable.variableName
                                                        };
                                                    })
                                                ) : (
                                                        []
                                                    )
                                            }
                                        />
                                    </SelectWrapper>
                                    <InputLabel>Branding Theme</InputLabel>
                                </FormControl>

                            </InputColumnWrapper>
                            <InputRowWrapper>


                            </InputRowWrapper>
                        </InputFieldContainer>
                    </InputBody>
                </Collapse>

            </PageBlock>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    errors: state.errors,
    types: state.types,
    variables: state.variables
});

export default connect(mapStateToProps, {
    clearErrors,
    getVariables
})(PurchaseOrderDetailsItem);
