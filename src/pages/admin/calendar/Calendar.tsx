import React, { useState } from 'react';
import { Header } from '../../../components';

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Calendar = () => {


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <PropertyPane>
        <table
          style={{ width: '100%', background: 'white' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Calendar;
