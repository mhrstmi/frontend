import urls from "@routes/urls";
import { GiBookshelf } from "react-icons/gi";
import { GiArchiveResearch } from "react-icons/gi";
import { GiNotebook } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { IoCalendarOutline } from "react-icons/io5";



export const links = [
    {
      title: 'داشبورد',
      links: [
        {
          name: 'داشبورد',
          link: urls.adminDashboard,
          icon: <RxDashboard />,
        },
      ],
    },
  
    {
      title: 'صفحات',
      links: [
        {
          name: 'دانشنامه',
          link: urls.adminKnowledge,
          icon: <GiNotebook />,
        },
        {
          name: 'پژوهشنامه',
          link: urls.adminResearch,
          icon: <GiArchiveResearch />,
        },
        {
          name: 'کتابخانه',
          link: urls.adminLibrary,
          icon: <GiBookshelf />,
        },
        {
          name: 'تقویم مقاومت',
          link: urls.adminCalendar,
          icon: <IoCalendarOutline />,
        }
      ],
    },
];