// [position] [border] [width,height] [flex] [padding, margin] [bg] [text] [hover] [media]


function Summary() {
  const titleStyle = 'font-light';
    return (
      <div className="w-full h-full flex-col-style justify-start space-y-4 px-2 ">
        <table className="w-full odd:bg-white even:bg-slate-200">
          <tbody className="">
            <tr className="">
              <td className={titleStyle}>Users Count</td>
              <td>231</td>
            </tr>
            <tr>
              <td className={titleStyle}>SuperAdmins</td>
              <td>8</td>
            </tr>
            <tr>
              <td className={titleStyle}>Admins</td>
              <td>32</td>
            </tr>
            <tr>
              <td className={titleStyle}>Active</td>
              <td>225</td>
            </tr>
            <tr>
              <td className={titleStyle}>Companies</td>
              <td>8</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
export default Summary;
  