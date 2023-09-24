const outerdiv = 'border-0 border-black rounded-full grid grid-flow-col grid-rows-2 gap-1 animate-spin mt-20';
const innerdiv = 'w-2 h-2 bg-white rounded-full';

const Spinner = ({ name }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <div className="flex flex-col items-center text-white">
        <div className={outerdiv}>
          <div className={innerdiv}></div>
          <div className={innerdiv}></div>
          <div className={innerdiv}></div>
          <div className={innerdiv}></div>
        </div>
        <span className="mt-2 font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default Spinner;
