
// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]s

function BaseDisplay() {
    return (
        <div className='border w-full h-full flex-row-style justify-around space-x-8 p-2'>
            <div className="border w-[20%] h-full flex-col-style justify-start space-y-8">
                <div className='border w-full h-[50%]'>Filters</div>
                <div className='border w-full h-[45%]'>Saved filters</div>
            </div>
            <div className="border w-[60%] h-full">
                <div>Main Header</div>
                <div>Main display</div>
            </div>
            <div className="border w-[20%] h-full space-y-8">
                <div className="border w-full h-[30%]">Recents</div>
                <div className="border w-full h-[60%]">Summary</div>
            </div>
        </div>
    );
  }
  
  export default BaseDisplay;
  