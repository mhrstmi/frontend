import React from 'react'
import { ConfigProvider } from "antd";
import { Calendar as JalaliCalandar } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import "moment/locale/fa";
import dayjs from 'dayjs'
import { Header, Text } from '../../../components';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { Sections } from '../../../components/Header';
import urls from '../../../routes/urls';
//@ts-ignore
dayjs.calendar('jalali');

const AdminCalendar = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 768px)');
    
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full overflow-auto">
      <Header title="تقویم مقاومت" onClick={() => navigate(urls.adminUploadKnowledge)} />
      <ConfigProvider locale={fa_IR}  direction="rtl">
          <JalaliCalandar fullscreen={isMobile ? false : true} className='flex items-center flex-col justify-center border'  />
      </ConfigProvider>
    </div>
  )
}

export default AdminCalendar