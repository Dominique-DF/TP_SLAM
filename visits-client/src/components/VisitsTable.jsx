import React from 'react';
import VisitsTableHeader from './VisitsTableHeader.jsx';
import VisitsTableData from './VisitsTableData.jsx';

export default function VisitTable(props) {
        return (
            <table>
                <VisitsTableHeader />
                {props.visitors?.filter(v => v.leavingDate === undefined).map((visitor, index) => (
                               <VisitsTableData visitor={ visitor } />
                ))}
            </table>
        );
}