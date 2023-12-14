import Header from '@components/Header';
import { Sections } from '@components/Header';
import CustomTable from '@components/CustomTable';


const Library = () => {
  return (
    <div className="p-3 md:p-10 rounded-3xl h-full">
      <Header section={Sections.VIEW} title="کتابخانه" />
    </div>
  );
};
export default Library;
