// import React from 'react'
// import IconsBtn from './IconsBtn';

// const ConfirmationModal = ({modalData}) => {
//   return (
//     <div>
//     <div>
//         <p>
//             {modalData.text1}
//         </p>
//         <p>{modalData.text2}</p>
//     </div>
//        <IconsBtn 
//        onclick={modalData?.btn2Handler}
//        text={modalData?.btn2text}  />  
//        <button onclick={modalData?.btn2Handler} className='ml-2 rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400'>

//         {modalData?.btn1text}
//        </button>

    
    
    
//     </div>
//   )
// }

// export default ConfirmationModal


import React from 'react'

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center border   text-white backdrop-blur-sm z-50'>
      
      <div className='bg-richblack-800 p-6 rounded-md w-[350px] border border-emerald-700 '>

        <h2 className='text-xl text-white font-semibold'>
          {modalData?.text1}
        </h2>

        <p className='text-richblack-200 mt-3'>
          {modalData?.text2}
        </p>

        <div className='flex gap-4 mt-6'>

          <button
            onClick={modalData?.btn1Handler}
            className='bg-yellow-400 text-black px-4 py-2 rounded'
          >
            {modalData?.btn1Text}
          </button>

          <button
            onClick={modalData?.btn2Handler}
            className='bg-richblack-600 text-white px-4 py-2 rounded border border-richblack-400 hover:bg-gray-700'
          >
            {modalData?.btn2Text}
          </button>

        </div>

      </div>
    </div>
  )
}

export default ConfirmationModal