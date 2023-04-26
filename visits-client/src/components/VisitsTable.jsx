import React from 'react';
import VisitsTableHeader from './VisitsTableHeader.jsx';
import VisitsTableData from './VisitsTableData.jsx';

export default function VisitTable(props) {
        return (
            <table>
                <VisitsTableHeader />
                <VisitsTableData visitors={ props.visitors } />
            </table>
        );
}