// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]


function UFilters() {
  const eachFilter = 'p-2';
    return (
      <div className="border w-full h-full flex-col-style justify-center px-2">
          <div className="border w-full h-full flex-col-style justify-around">
            <span className={`${eachFilter}`}>Filter1</span>
            <span className={`${eachFilter}`}>Filter2</span>
            <span className={`${eachFilter}`}>Filter3</span>
            <span className={`${eachFilter}`}>Filter4</span>
          </div>
      </div>
    );
  }
  
  export default UFilters;
  