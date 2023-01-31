import React from 'react'
import { useIntl } from 'react-intl';

const InvoicePaggination = ({ invoice, limit, setPageNo, pageNo }) => {
    const intl = useIntl();
    const paginator = (totalPages, page, maxLength) => {
        if (maxLength < 3) throw "maxLength must be at least 2";
        function range(start, end) {
            return Array.from(Array(end - start + 1), (_, i) => i + start);
        }
        var sideWidth = maxLength < 9 ? 1 : 2;
        var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
        var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
        if (totalPages <= maxLength) {
            return range(1, totalPages);
        }
        if (page <= maxLength - sideWidth - 1 - rightWidth) {
            return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
        }
        if (page >= totalPages - sideWidth - 1 - rightWidth) {
            return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
        }
        return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
    };
    const invoicePageList = paginator(Math.ceil(invoice.totalPages), invoice?.page, 8);
    // console.log(paginationList);
    return (
        <div className="pagination-festum">
            <p className="show-text">{intl.formatMessage({ id: "SHOWING" })} {(invoice?.page - 1) * limit + 1} {intl.formatMessage({ id: "TO" })} {Math.min((invoice?.page) * limit, invoice?.totalDocs)} {intl.formatMessage({ id: "OF" })} {invoice?.totalDocs} {intl.formatMessage({ id: "INVOICE" })}</p>
            <ul className="">
                <li>
                    <button className="btns" style={invoice?.page < 2 ? { cursor: "not-allowed" } : {}} disabled={invoice.page > 1 ? false : true} onClick={() => setPageNo(current => current - 1)}>
                        <svg width="9" height="14" viewBox="0 0 9 14" fill="#25364f" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.47003 13.4701L8.99615 11.9439L4.051 6.99873L8.99616 2.05357L7.47003 0.5274L0.998702 6.99873L7.47003 13.4701Z" className="fill-current" />
                        </svg>
                    </button>
                </li>

                {invoicePageList.map((e, i) => (
                    <li key={i}>
                        <button className={invoice?.page === e ? "btns active" : "btns"} style={e != 0 ? {} : { cursor: "not-allowed" }} onClick={() => e != 0 && setPageNo(e)} disabled={e != 0 ? false : true} >
                            <span>{e != 0 ? e : "..."}</span>
                        </button>
                    </li>
                ))}

                <li>
                    <button className="btns" style={invoice?.page > invoice?.last_page - 1 ? { cursor: "not-allowed" } : {}} disabled={invoice?.page === invoice?.totalPages ? true : false} onClick={() => setPageNo(current => current + 1)}>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="#25364f" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.52612 0.527405L-2.66844e-07 2.05358L4.94516 6.99874L-1.99612e-06 11.9439L1.52612 13.4701L7.99745 6.99874L1.52612 0.527405Z" className="fill-current" />
                        </svg>
                    </button>
                </li>

                {/* {invoice.page < Math.ceil(invoice.total/limit) && <li onClick={() => setPageNo(current => current+1)}>
            <button className="btns"><svg width="8" height="14" viewBox="0 0 8 14" fill="#25364f" xmlns="http://www.w3.org/2000/svg"> <path d="M1.52612 0.527405L-2.66844e-07 2.05358L4.94516 6.99874L-1.99612e-06 11.9439L1.52612 13.4701L7.99745 6.99874L1.52612 0.527405Z" className="fill-current" /> </svg></button>
        </li>} */}
            </ul>
        </div>
    )
}

export default InvoicePaggination;