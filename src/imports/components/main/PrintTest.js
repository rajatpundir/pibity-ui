import React from 'react';
import styled from 'styled-components';
import ReactToPrint from 'react-to-print';
import '../../styles/Test.css';
import { Height } from '@material-ui/icons';
class PrintTest extends React.Component {
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
					<div ref={(el) => (this.componentRef = el)}>ljhk</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="invoice-box">
				<table cellPadding="0" cellSpacing="0">
					<tbody>
						<tr className="top">
							<td colSpan="2">
								<table>
									<tbody>
										<tr>
											<td className="title">
												<img
													src="https://i.pinimg.com/originals/cb/3d/7c/cb3d7c0a0ece70290384a29e84fd00ed.jpg"
													alt="https://i.pinimg.com/originals/cb/3d/7c/cb3d7c0a0ece70290384a29e84fd00ed.jpg"
													style={{ width: '100%' ,maxWidth:"100px"}}
												/>
											</td>
											<td>
												Invoice #: 123<br />
												Created: January 1, 2015<br />
												Due: February 1, 2015
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr className="information">
							<td colSpan="2">
								<table>
									<tbody>
										<tr>
											<td>
												Sparksuite, Inc.<br />
												12345 Sunny Road<br />
												Sunnyville, CA 12345
											</td>

											<td>
												Acme Corp.<br />
												John Doe<br />
												john@example.com
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default PrintTest;
