import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import { clearErrors } from "../../../redux/actions/errors";
import { getVariables } from "../../../redux/actions/variables";
import Select from "react-select";

class SupplierProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
    };
    this.onChange = this.onChange.bind(this);
  }

  // clear form errors
  componentDidMount() {
    this.props.clearErrors();
	this.props.getVariables("Supplier");
	this.props.getVariables("Currency");

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      list: nextProps.list,
    };
  }

  onChange(e, variableName) {
    const list = cloneDeep(this.state.list).map((listVariable) => {
      if (listVariable.get("variableName") === variableName) {
        const values = listVariable.get("values");
        values.set(e.target.name, e.target.value);
        listVariable.set("values", values);
        return listVariable;
      } else {
        return listVariable;
      }
    });
    this.setState({ list: list });
    this.props.updateSupplierProduct(list);
  }

  addVariableToList() {
    const list = cloneDeep(this.state.list);
    list.unshift(
      new Map([
        ["variableName", String(list.length === 0 ? 0 : Math.max(...list.map((o) => o.get('variableName'))) + 1 )],
        [
          "values",
          new Map([
            ["supplier", ""],
            ["currency", ""],
            ["dropShip", ""],
            ["fixedPrice", ""],
            ["lastSupplied", ""],
            ["latestPrice", ""],
            ["productName", ""],
            ["productUrl", ""],
            ["sku", ""],
          ]),
        ],
      ])
    );
    this.setState({ list: list });
    this.props.updateSupplierProduct(list);
  }

  onRemoveKey(e, variableName) {
    const list = cloneDeep(this.state.list).filter((listVariable) => {
      return listVariable.get("variableName") !== variableName;
    });
    this.setState({ list: list });
    this.props.updateSupplierProduct(list);
  }

  renderInputFields() {
    const rows = [];
    this.state.list.forEach((listVariable) =>
      rows.push(
        <TableRow key={listVariable.get("variableName")}>
          <TableHeader width="5%" left="0px">
            <i
              name={listVariable.get("variableName")}
              className="large material-icons"
              onClick={(e) =>
                this.onRemoveKey(e, listVariable.get("variableName"))
              }
            >
              remove_circle_outline
            </i>
          </TableHeader>

          <TableHeader width="10%" left="6%">
            <TableHeaderInner>
              <SelectWrapper>
                <Select
                  value={{
                    value: listVariable.get("values").get("supplier"),
                    label: listVariable.get("values").get("supplier"),
                  }}
                  onChange={(option) => {
                    this.onChange(
                      { target: { name: "supplier", value: option.value } },
                      listVariable.get("variableName")
                    );
                  }}
                  options={
                    this.props.variables.Customer !== undefined
                      ? this.props.variables.Customer.map((variable) => {
                          return {
                            value: variable.variableName,
                            label: variable.variableName,
                          };
                        })
                      : []
                  }
                />
              </SelectWrapper>
            </TableHeaderInner>
          </TableHeader>
          <TableHeader width="8%" left="15%">
            <TableHeaderInner>
              <Input
                name="sku"
                type="text"
                value={listVariable.get("values").get("sku")}
                onChange={(e) =>
                  this.onChange(e, listVariable.get("variableName"))
                }
              />
            </TableHeaderInner>
          </TableHeader>
          <TableHeader width="10%" left="23%">
            <TableHeaderInner>
              <Input
                name="productName"
                type="text"
                value={listVariable.get("values").get("productName")}
                onChange={(e) =>
                  this.onChange(e, listVariable.get("variableName"))
                }
              />
            </TableHeaderInner>
          </TableHeader>
          <TableHeader width="10%" left="34%">
            <TableHeaderInner>
              <Input
                name="productUrl"
                type="text"
                value={listVariable.get("values").get("productUrl")}
                onChange={(e) =>
                  this.onChange(e, listVariable.get("variableName"))
                }
              />
            </TableHeaderInner>
          </TableHeader>
          <TableHeader width="10%" left="46%">
            <TableHeaderInner>
              <Input
                name="dropShip"
                type="text"
                value={listVariable.get("values").get("dropShip")}
                onChange={(e) =>
                  this.onChange(e, listVariable.get("variableName"))
                }
              />
            </TableHeaderInner>
          </TableHeader>
          <TableHeader width="12%" left="55%">
            <TableHeaderInner>
              <SelectWrapper>
                <Select
                  value={{
                    value: listVariable.get("values").get("currency"),
                    label: listVariable.get("values").get("currency"),
                  }}
                  onChange={(option) => {
                    this.onChange(
                      { target: { name: "currency", value: option.value } },
                      listVariable.get("variableName")
                    );
                  }}
                  options={
                    this.props.variables.Customer !== undefined
                      ? this.props.variables.Customer.map((variable) => {
                          return {
                            value: variable.variableName,
                            label: variable.variableName,
                          };
                        })
                      : []
                  }
                />
              </SelectWrapper>
            </TableHeaderInner>
          </TableHeader>
          <TableHeader width="11%" left="67%">
            <TableHeaderInner>
              <Input
                name="latestPrice"
                type="text"
                value={listVariable.get("values").get("latestPrice")}
                onChange={(e) =>
                  this.onChange(e, listVariable.get("variableName"))
                }
              />
            </TableHeaderInner>
          </TableHeader>
          <TableHeader width="10%" left="78%">
            <TableHeaderInner>
              <Input
                name="fixedPrice"
                type="text"
                value={listVariable.get("values").get("fixedPrice")}
                onChange={(e) =>
                  this.onChange(e, listVariable.get("variableName"))
                }
              />
            </TableHeaderInner>
          </TableHeader>
          <TableHeader width="11%" left="89%">
            <TableHeaderInner>
              <Input
                name="lastSupplied"
                type="text"
                value={listVariable.get("values").get("lastSupplied")}
                onChange={(e) =>
                  this.onChange(e, listVariable.get("variableName"))
                }
              />
            </TableHeaderInner>
          </TableHeader>
        </TableRow>
      )
    );
    return rows;
  }

  render() {
    return (
      <PageBlock id="suppliers">
        <PageToolbar>
          <ToolbarLeftItems>
            <LeftItemH1>Suppliers</LeftItemH1>
          </ToolbarLeftItems>
        </PageToolbar>
        <PageBar>
          <PageBarAlignLeft>
            <PlusButton onClick={(e) => this.addVariableToList()}>
              <i className="large material-icons">add</i>
            </PlusButton>
          </PageBarAlignLeft>
        </PageBar>
        <InputBody borderTop="0">
          <RoundedBlock>
            <TableFieldContainer>
              <Headers>
                <HeaderContainer>
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

                          <TableHeaders width="10%" left="6%">
                            <SelectIconContainer>
                              <SelectSpan>Supplier</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="14%">
                            <SelectIconContainer>
                              <SelectSpan textAlign="right">SKU</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="23%">
                            <SelectIconContainer>
                              <SelectSpan>Product Name</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="34%">
                            <SelectIconContainer>
                              <SelectSpan>Product Url</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="46%">
                            <SelectIconContainer>
                              <SelectSpan>Drop Ship</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="12%" left="55%">
                            <SelectIconContainer>
                              <SelectSpan>Currency</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="11%" left="67%">
                            <SelectIconContainer>
                              <SelectSpan>Latest Price</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="78%">
                            <SelectIconContainer>
                              <SelectSpan>Fixed Price</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="11%" left="89%">
                            <SelectIconContainer>
                              <SelectSpan>Last Supplied</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                        </TableRow>
                      </TableBody>
                    </BodyTable>
                  </HeaderBody>
                </HeaderContainer>
              </Headers>
              <HeaderBodyContainer>
                <HeaderBody>
                  <BodyTable>
                    <TableBody>{this.renderInputFields()}</TableBody>
                  </BodyTable>
                </HeaderBody>
                {this.state.list.length === 0 ? (
                  <EmptyRow>No Supplier Found</EmptyRow>
                ) : undefined}
              </HeaderBodyContainer>
              <AddMoreBlock>
                <AddMoreButton onClick={(e) => this.addVariableToList()}>
                  <i className="large material-icons">add</i>Add More Items
                </AddMoreButton>
              </AddMoreBlock>
            </TableFieldContainer>
          </RoundedBlock>

          <RoundedBlock marginTop="10px">
            <TableFieldContainer>
              <Headers>
                <HeaderContainer>
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
                          <TableHeaders width="10%" left="6%">
                            <SelectIconContainer>
                              <SelectSpan>Supplier</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="14%">
                            <SelectIconContainer>
                              <SelectSpan textAlign="right">Lead</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="23%">
                            <SelectIconContainer>
                              <SelectSpan>Safety</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="34%">
                            <SelectIconContainer>
                              <SelectSpan>Reorder Quantity</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="46%">
                            <SelectIconContainer>
                              <SelectSpan>Minimum to Reorder</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="12%" left="55%">
                            <SelectIconContainer>
                              <SelectSpan>Location</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="11%" left="67%">
                            <SelectIconContainer>
                              <SelectSpan>Lead</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="10%" left="78%">
                            <SelectIconContainer>
                              <SelectSpan>Safety</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                          <TableHeaders width="11%" left="89%">
                            <SelectIconContainer>
                              <SelectSpan>Reorder Quantity</SelectSpan>
                            </SelectIconContainer>
                          </TableHeaders>
                        </TableRow>
                      </TableBody>
                    </BodyTable>
                  </HeaderBody>
                </HeaderContainer>
              </Headers>
              <HeaderBodyContainer>
                <HeaderBody>
                  <BodyTable>
                    <TableBody>
                      <TableRow>
                        <TableHeader width="58px" />
                        <TableHeader width="168px" />
                        <TableHeader width="168px" />
                        <TableHeader width="168px" />
                        <TableHeader width="167px" />
                        <TableHeader width="167px" />
                        <TableHeader width="58px" />
                      </TableRow>
                    </TableBody>
                  </BodyTable>
                </HeaderBody>
                <EmptyRow>No Supplier Found</EmptyRow>
              </HeaderBodyContainer>
            </TableFieldContainer>
          </RoundedBlock>
        </InputBody>
      </PageBlock>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors,
  types: state.types,
  variables: state.variables,
});

export default connect(mapStateToProps, { clearErrors, getVariables })(
  SupplierProducts
);

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
  -webkit-transition: background-color 0.15s ease-in-out,
    color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    opacity 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
  &:hover {
    outline: none;
  }
`;
const PageBlock = styled.div`
  display: none;
  background: #fff;
  width: 100%;
  float: left;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-family: "IBM Plex Sans", sans-serif;
  vertical-align: baseline;
  align-items: center;
`;

const InputBody = styled.div.attrs((props) => ({
  alignitem: props.alignItem || "start",
  borderTop: props.borderTop || "1px solid #e0e1e7",
}))`
  align-items: ${(props) => props.alignItem};
  max-height: 4000px;
  overflow: hidden;
  animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
  -webkit-animation: expand 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards;
  transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
    padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
  -webkit-transition: padding-top 0.5s cubic-bezier(0.39, 0.575, 0.565, 1),
    padding-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
  border-top: ${(props) => props.borderTop};
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px 0 20px;
  padding-bottom: 20px !important;
`;
const SelectWrapper = styled.div`
  font-size: 13px;
  outline: none !important;
  border-width: 1px;
  border-radius: 4px;
  border-color: #b9bdce;
  color: #3b3b3b;
  font-size: 13px;
  font-weight: 400;
  font-family: inherit;
  min-width: 100px;
  flex: 1;
  min-height: 40px;
  background-color: #fff;
  -webkit-transition: border-color 0.15s ease-in-out,
    background-color 0.15s ease-in-out;
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
const Input = styled.input`
  width: inherit;
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
  -webkit-transition: border-color 0.15s ease-in-out,
    background-color 0.15s ease-in-out;
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

const RoundedBlock = styled.div.attrs((props) => ({
  marginTop: props.marginTop || "0",
}))`
  border: 1px solid #b9bdce;
  border-radius: 4px;
  width: 100%;
  float: left;
  overflow: hidden;
  margin-top: ${(props) => props.marginTop};
`;

// float: left;
const TableFieldContainer = styled.div`
  position: relative;
  width: 100% !important;
  overflow: hidden;

  min-height: auto !important;
  text-align: center;
  top: 0 !important;
  height: inherit !important;
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
  textAlign: props.textAlign || "left",
}))`
  display: flex;
  align-items: center;
  overflow: hidden;
  text-align: ${(props) => props.textAlign};
  cursor: pointer;
`;
const SelectSpanInner = styled.span`
  white-space: nowrap;
`;

const HeaderBodyContainer = styled.div`
  width: 100%;
  height: inherit !important;
  float: left;
  position: relative;
  top: 0 !important;
  left: 0 !important;
  overflow: hidden;
`;
const HeaderBody = styled.div`
  border-width: 0px;
  overflow: auto;
  margin: 0px;
  width: 100%;
`;
const BodyTable = styled.table`
  width: 100%;
  height: 1px;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f0f3fa;
  }
`;

const TableHeaders = styled.th.attrs((props) => ({
  width: props.width,
  left: props.left || "0",
}))`
  width: ${(props) => props.width};
  left: ${(props) => props.left};
  font-family: inherit;
  vertical-align: middle;
  border-bottom: 1px solid #e7e8ec;
  overflow: hidden;
  padding: 5px 0;
  height: 60px;
  float: none !important;
`;
const TableHeaderInner = styled.div`
    width:100%;
    padding: 1px 3px;
    color: #41454e;
    vertical-align: middle;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
`;
const EmptyRow = styled.div`
  text-align: center;
  border-bottom: 1px solid #e7e8ec;
  min-height: 59px !important;
  line-height: 55px;
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

const PageToolbar = styled.div`
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
`;

const ToolbarLeftItems = styled.div`
  display: flex;
  justify-content: flex-start !important;
  align-items: center;
  float: left;
`;

const LeftItemH1 = styled.h1`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  padding-right: 20px;
  display: flex;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-family: "IBM Plex Sans", sans-serif;
  vertical-align: baseline;
`;

const FormControl = styled.div`
	padding-bottom: 20px;
	min-height: 60px;
	position: relative;
	display: flex;
	align-items: start;
	@media (max-width: 991px) {
		flex-basis: calc(100% / 2 - 9px) !important;
	}
}
`;

const PageBarAlignRight = styled.div`
  display: flex;
  justify-content: flex-end !important;
  align-items: center;
  float: right;
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

const TableHeader = styled.td.attrs((props) => ({
  width: props.width,
  height: props.height || "0",
  left: props.left,
}))`
  width: ${(props) => props.width};
  left: ${(props) => props.left};
`;

const ButtonWithOutline = styled.button`
  background-color: transparent !important;
  color: #05cbbf;
  border-color: #05cbbf;
  margin-left: 5px;
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
  align-self: center;
  white-space: nowrap;
  border-radius: 4px;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
`;
