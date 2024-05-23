const ListItem = ({ text }) => {
  return (
    <div className='w-full cursor-pointer border-b p-2 font-medium text-[#757575] hover:bg-[#F5F5F5] hover:text-black hover:text-opacity-85'>
      {text}
    </div>
  );
};

const Column = ({ text }) => {
  return <div className='text-[#757575 w-full p-2 font-medium'>{text}</div>;
};

export default {
  ListItem: ListItem,
  Column: Column,
};
