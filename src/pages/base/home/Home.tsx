import urls from '@routes/urls'
import { useNavigate } from 'react-router-dom'
import { Carousel, Divider } from 'antd'
import React, { useEffect, useState } from 'react';
import Text from '@components/Text';
import useMediaQuery from '@hooks/useMediaQuery';

import { ConfigProvider } from "antd";
import { Calendar } from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import "moment/locale/fa";
import dayjs from 'dayjs'
import School from '@assets/images/school.jpg'
//@ts-ignore
dayjs.calendar('jalali');


const Home = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 768px)');


  return (
      <div className='p-5'>
        <div className='w-full pb-5 rounded-lg'>
          <Carousel effect="fade" autoplay>
            <div>
              <h3 className='h-52 md:h-[500px] bg-mid-green'>1</h3>
            </div>
            <div>
              <h3 className='h-52 md:h-[500px] bg-mid-green'>2</h3>
            </div>
            <div>
              <h3 className='h-52 md:h-[500px] bg-mid-green'>3</h3>
            </div>
            <div>
              <h3 className='h-52 md:h-[500px] bg-mid-green'>4</h3>
            </div>
          </Carousel>
        </div>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='w-full h-fit flex flex-col gap-3 col-span-2 lg:col-span-1'>
            <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-3'>
              <div onClick={() => navigate(urls.research)} className='cursor-pointer transform transition-all hover:-translate-y-2 duration-300 hover:shadow-4xl relative bg-red-500 rounded-lg shadow-2xl min-h-[150px] col-span-2 md:col-span-1'>
                <div className='absolute bottom-0 w-full rounded-lg flex items-center justify-center bg-black bg-opacity-50 p-2'>
                  <Text fontSize='sm' fontWeight='bold' className='text-white'>پژوهشنامه</Text>
                </div>
              </div>
              <div onClick={() => navigate(urls.knowledge)} className='cursor-pointer transform transition-all hover:-translate-y-2 duration-300 hover:shadow-4xl relative bg-orange-500 rounded-lg shadow-2xl min-h-[150px]'>
                <div className='absolute bottom-0 w-full rounded-lg flex items-center justify-center bg-black bg-opacity-50 p-2'>
                  <Text fontSize='sm' fontWeight='bold' className='text-white'>دانشنامه</Text>
                </div>
              </div>
              <div onClick={() => navigate(urls.library)} className='cursor-pointer transform transition-all hover:-translate-y-2 duration-300 hover:shadow-4xl relative bg-yellow-500 rounded-lg shadow-2xl min-h-[150px]'>
                <div className='absolute bottom-0 w-full rounded-lg flex items-center justify-center bg-black bg-opacity-50 p-2'>
                  <Text fontSize='sm' fontWeight='bold' className='text-white'>کتابخانه</Text>
                </div>
              </div>
            </div>
            <div className='w-full grid grid-cols-2 gap-3'>
              <div className='cursor-pointer transform transition-all hover:-translate-y-2 duration-300 hover:shadow-4xl relative bg-green-500 rounded-lg shadow-2xl min-h-[150px] col-span-2 md:col-span-1 row-span-1 md:row-span-2'>
                <div className='absolute bottom-0 w-full rounded-lg flex items-center justify-center bg-black bg-opacity-50 p-2'>
                  <Text fontSize='sm' fontWeight='bold' className='text-white'>زیارت مجازی</Text>
                </div>
              </div>
              <div className='cursor-pointer transform transition-all hover:-translate-y-2 duration-300 hover:shadow-4xl relative bg-teal-500 rounded-lg shadow-2xl min-h-[150px]'>
                <div className='absolute bottom-0 w-full rounded-lg flex items-center justify-center bg-black bg-opacity-50 p-2'>
                  <Text fontSize='sm' fontWeight='bold' className='text-white'>مدرسه مقاومت</Text>
                </div>
              </div>
              <div className='cursor-pointer transform transition-all hover:-translate-y-2 duration-300 hover:shadow-4xl relative bg-teal-500 rounded-lg shadow-2xl min-h-[150px]'>
                <div className='absolute bottom-0 w-full rounded-lg flex items-center justify-center bg-black bg-opacity-50 p-2'>
                  <Text fontSize='sm' fontWeight='bold' className='text-white'>پرسمان و گفتگو</Text>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full bg-white rounded-lg col-span-2 lg:col-span-1">
            <div className='flex flex-col gap-5 p-5 rounded-lg'>
              <Text fontSize='xl' fontWeight='black' className='text-dark-green'>درباره مدرسه مقاومت</Text>
              <Divider className='m-0' />
              <div>
                  <img className="h-48 w-full object-cover cursor-pointer" src={School} alt="..." />
              </div>
              <div>
                <Text fontSize="base" fontWeight='normal' className='text-mid-green'>
                  سپاه پاسداران انقلاب اسلامی سازمانی نظامی است که در نخستین روز‌های پس از انقلاب ایران در سال ۱۳۵۷ به حضرت امام خمینی (ره) بنیانگذار و رهبر انقلاب اسلامی ایران تشکیل شد. امام خمینی (ره) در دوم اردیبهشت سال ۱۳۵۸ طی فرمانی به شورای انقلاب اسلامی رسماً تأسیس این نهاد را اعلام کرد و شورای انقلاب با تأسیس شورای فرماندهی سپاه پاسداران انقلاب اسلامی، گام اساسی را در جهت سازماندهی این نهاد برداشت. سپاه نهادی نظامی و بازوی مسلح برای پاسداری از نظام جمهوری اسلامی است.
                </Text>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col bg-white rounded-lg col-span-2">
            <div className='flex justify-center items-center p-5'>
              <Text fontSize='3xl' fontWeight='bold'>تقویم مقاومت</Text>
            </div>
            <ConfigProvider locale={fa_IR}  direction="rtl">
              <Calendar fullscreen={isMobile ? false : true} className='flex items-center flex-col justify-center border'  />
            </ConfigProvider>
          </div>
        </div>
      </div>
  )
}

export default Home