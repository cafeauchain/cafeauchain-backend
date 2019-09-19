

const inner = `
    #header-nav,
    .ui.divider {
        display: none
    }
    .print-production-queue thead > tr:nth-child(2) {
        display: none !important;
    }
    .print-production-queue {
        box-shadow: none !important;
        border: none !important;
    }
    .print-production-queue .ui.menu {
        display: none;
    }
    .print-production-queue .order-stripe tr {
        
    }
    .print-production-queue .product-count-dropdown {
        display: none !important;
    }
    body {
        font-size: 4px;
        -webkit-print-color-adjust: exact !important;
    }
`;

const styles = `@media screen {
    
}
@media print {
    ${ inner }
}`;

export default styles;
