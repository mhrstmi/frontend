import { MdOutlineCancel } from 'react-icons/md';
import { Button, Text } from '.';
import { useStateContext } from '@providers/ContextProvider';
import { useAuth } from '@providers/AuthProvider';
import AdminPng from '@assets/images/admin-profile.png'
import urls from '@routes/urls';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { currentColor }: any = useStateContext();
  const { setToken }: any = useAuth()
  const navigate = useNavigate()

  return (
    <div className="nav-item absolute left-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <Text className="dark:text-gray-200" fontSize='lg' fontWeight="semibold">پروفایل ادمین</Text>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={AdminPng}
          alt="user-profile"
        />
        <div className='flex flex-col gap-1'>
          <Text className="dark:text-gray-200" fontSize='lg' fontWeight="semibold"> Admin </Text>
          <Text className="text-gray-500 dark:text-gray-400" fontSize='sm' fontWeight='medium'>  Administrator   </Text>
        </div>
      </div>
      <div onClick={() => {setToken(false); navigate(urls.login)}} className="mt-5">
        <Button
          color="#fff"
          bgColor={currentColor}
          text="خروج از داشبورد"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>

  );
};

export default UserProfile;
