import React from 'react';
import styled from 'styled-components';
import ReactToPrint from 'react-to-print';

export default class PrintTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
    }
    
    //Reference to use 
	funPrintDef() {
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
				<div style={{ display: 'none' }}>
					<div ref={(el) => (this.componentRef = el)}>"helolsofhsjf "</div>
				</div>
			</div>
		);
    }
    
	render() {
		return <div>wsrhs</div>;
	}
}
