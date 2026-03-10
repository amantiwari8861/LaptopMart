// import { useRef, useState } from "react"

// const UseRefDemo = () => {

//     // const h1Ref = useRef(null);

//     // const styleH1 = () => {
//     //     h1Ref.current.style.color = "red";
//     // }

//     const [num, setNum] = useState(0);
//     const num2Ref = useRef(0);

//     const incrNum2 = () => {
//         num2Ref.current += 1;
//     }

//     return (
//         <div>
//             {/* <h1 ref={h1Ref} className="text-3xl">Hello there in use-ref</h1>
//             <button className="btn btn-primary"
//                 onClick={styleH1}
//             >style</button> */}

//             <h1 className="text-3xl text-center">Num :{num} Num2 :{num2Ref.current}</h1>

//             <button className="btn btn-primary"
//                 onClick={() => setNum(num + 1)}
//             >increment num</button>
//             <button className="btn btn-primary"
//                 onClick={incrNum2}
//             >increment num2</button>
//         </div>
//     )
// }

// export default UseRefDemo



import { useRef, useState, type JSX } from "react";

const UseRefDemo = (): JSX.Element => {

    const [num, setNum] = useState<number>(0);
    const num2Ref = useRef<number>(0);
    const h1Ref = useRef<HTMLHeadingElement | null>(null);

    const styleH1 = (): void => {
        if (h1Ref.current) {
            h1Ref.current.style.color = "red";
        }
    };

    const incrNum2 = (): void => {
        num2Ref.current += 1;
        console.log(num2Ref.current);
    };

    return (
        <div>
            <h1 ref={h1Ref} className="text-3xl text-center">
                Num: {num} Num2: {num2Ref.current}
            </h1>

            <button
                className="btn btn-primary"
                onClick={() => setNum(prev => prev + 1)}
            >
                Increment num
            </button>

            <button
                className="btn btn-success"
                onClick={incrNum2}
            >
                Increment num2
            </button>

            <button
                className="btn btn-primary"
                onClick={styleH1}
            >
                Style H1
            </button>
        </div>
    );
};

export default UseRefDemo;