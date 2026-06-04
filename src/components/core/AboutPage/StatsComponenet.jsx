import React from 'react'

const State = [
    {count: "5k" , labal: "Active Students"},
    {count: "10+" , labal: "Mentors "},
    {count: "200" , labal: "Courses"},
    {count: "50" , labal: "Awards"},
];

const StatsComponenet = () => {
  return (
    <section className='text-white'>
        <div>
            <div className='flex gap-5'>
                {
                    State.map( (data , index) => {
                        return (
                            <div key={index}>
                                <h1>
                                    {data.count}
                                </h1>
                                <h2>
                                    {data.labal}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    
    
    
    </section>
  )
}

export default StatsComponenet