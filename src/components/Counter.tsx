import { useState } from "react";

const Counter = () => { // Functional Component

    // const name: string = "Aman";
    let [num, setNum] = useState(0);


    // console.log(num,setNum);

    const increment = () => {
        setNum(num + 1);
        // setNum((prev) => prev + 1);
    }

    return (
        <div className="text-center my-42">
            {/* <h1>Name :{name}</h1> */}
            <h1 className="text-3xl">Num : {num} </h1>

            <button className="bg-blue-500 rounded py-1 px-4 cursor-pointer"
                onClick={increment}
            // onClick={()=>increment()}
            // onClick={() => setNum(num + 1)}
            >increment</button>

        </div>
    )
}

export default Counter