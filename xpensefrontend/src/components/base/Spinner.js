
const outerdiv = 'border-0 border-black rounded-full grid grid-flow-col grid-rows-2 gap-1 animate-spin mt-20';
const innerdiv = 'w-2 h-2 bg-black rounded-full';

const Spinner = ({name}) => {
  return (
    <div className='flex-col-style'>
      <div className={outerdiv}>
        <div className={innerdiv}></div>
        <div className={innerdiv}></div>
        <div className={innerdiv}></div>
        <div className={innerdiv}></div>
      </div>
      <span>Loading {name}</span>
    </div>
  )
}

export default Spinner;