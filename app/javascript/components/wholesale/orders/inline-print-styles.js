const styles = `@media print {
    #header-nav,
    .ui.segment.print-order > *:not(.printarea),
    .noprint {
        display: none !important;
    }
    .ui.segment.printarea, 
    .ui.segment.print-order {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
    }
}`;

export default styles;