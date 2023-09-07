const sideNavBar = {
    body: 'border-b border-purple-400 hover:opacity-80 flex flex-row justify-center items-center hover:bg-purple-300 w-full p-2 transition duration-300',
    active: 'bg-purple-200 hover:opacity-100',
}
const formStyles = {
    header: 'w-full bg-purple-50 text-center flex flex-row justify-around items-center p-2 list-none',
    headObject: 'border-r-2 text-lg font-light p-2',
    row: 'w-full text-center flex flex-row justify-around items-center p-2 border list-none',
    object: 'text-md p-2 ',
    comment: 'p-2 my-2 border bg-gray-100',
}

const noContent = {
    body: 'w-full bg-purple-50 h-screen flex items-center justify-center',
    text: 'text-[3rem] font-extralight rotate-[-45deg]'
}

const message = {
    flyoff: 'absolute top-[7%] left-[50%] w-80 text-center rounded-lg py-2 px-4 animate-wiggle',
    succuss: {
        bg: 'bg-green-700',
        text: 'text-white'
    },
    error: {
        bg: 'bg-red-700',
        text: 'text-white'
    },

}


export { sideNavBar, formStyles, noContent, message };