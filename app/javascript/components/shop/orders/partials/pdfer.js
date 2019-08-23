import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/* eslint-disable */
/* eslint-enable */

class Pdfer extends React.PureComponent {
    printInvoice = e => {
        e.preventDefault();
        const container = document.getElementById('pdf_container');
        var rect = container.getBoundingClientRect();
        html2canvas(container, {
            windowWidth: 998,
            width: 1100,
            height: 1406,
            y: 0,
            x: 0,
            scrollX: -40,
            scrollY: -rect.top + 50,
            scale: .85

        })
            .then((canvas) => {
                // Leaving this here for when canvases need to be debugged
                // const appender = document.createElement('div');
                // appender.appendChild(canvas);
                // const header = document.getElementById("header-nav");
                // document.body.insertBefore(appender, header);
                const { filename } = this.props;
                const imgData = canvas.toDataURL('image/jpeg');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save(filename + ".pdf");
            });
    }

    render() {
        const { title = "Create PDF" } = this.props;
        return <Button content={title} onClick={this.printInvoice} size="small" />;
    }
}

const { string } = PropTypes;
Pdfer.propTypes = {
    filename: string,
    title: string
};

export default Pdfer;
