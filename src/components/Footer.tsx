import { Button } from 'antd'
import { Footer as AntFooter } from 'antd/es/layout/layout'
import Text from './Text'
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { SiAparat } from "react-icons/si";
import { FiYoutube } from "react-icons/fi";
import Logo from '@assets/images/logo.png'





const Footer = () => {
  return (
    <footer className='p-5 w-full flex items-center justify-between bg-transparent'>
      <div>
        <img className="w-8 cursor-pointer" src={Logo} alt="..." />
      </div>
      <div className='flex items-center gap-5'>
        <div className='bg-white rounded-full w-8 h-8 border-mid-green border-solid border-1 flex items-center justify-center cursor-pointer'>
          <FaTelegramPlane className='text-blue-500' />
        </div>
        <div className='bg-white rounded-full w-8 h-8 border-mid-green border-solid border-1 flex items-center justify-center cursor-pointer'>
          <FaInstagram className='text-pink-500' />
        </div>
        <div className='bg-white rounded-full w-8 h-8 border-mid-green border-solid border-1 flex items-center justify-center cursor-pointer'>
          <SiAparat className='text-pink-500' />
        </div>
        <div className='bg-white rounded-full w-8 h-8 border-mid-green border-solid border-1 flex items-center justify-center cursor-pointer'>
          <FiYoutube className='text-red-500' />
        </div>
      </div>
      <div>
        <Button className='bg-blue-500 rounded-lg flex items-center justify-center'>
          <Text fontSize='sm' fontWeight='medium' className='text-white'>ورود ادمین</Text>
        </Button>
      </div>
    </footer>
  )
}

export default Footer