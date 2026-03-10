// import React, { useCallback, useEffect, useMemo, useState } from "react";
// const UseMemoDemo = () => {
//     return (
//         <div className="flex justify-center flex-col items-center my-12">
//             <Parent />
//         </div>
//     )
// }
// export default UseMemoDemo;

// // const Parent = () => {
// //     const [pNum, setPnum] = useState(0);
// //     useEffect(() => {
// //         console.log("parent re-rendered");
// //     });
// //     return <>
// //         <h1 className="text-3xl justify-center">Parent Component {pNum} </h1>
// //         <Child pNum={pNum} />
// //         <button className="btn btn-primary" onClick={() => setPnum(pNum + 1)}>increment</button>
// //     </>
// // }

// // const Child = React.memo(({ pNum }) => { // Component Memoization 
// //     useEffect(() => {
// //         console.log("child re-rendered");
// //     });
// //     return <>
// //         <h1 className="text-3xl">in Child Component pNum :{pNum}</h1>
// //     </>
// // });

// const Parent = () => {
//     const [pNum, setPnum] = useState(0);
//     // const [name, setName] = useState('');

//     const heavyCalculation = useMemo(() => {
//         console.log("Running heavy calculation...");
//         let sum = 0;
//         for (let i = 0; i < 1e8; i++) {
//             sum += i;
//         }
//         return sum + pNum;
//     }, [pNum]);

//     const sayHi = useCallback(() => {
//         console.log("hiii pNum =", pNum);
//     }, [pNum])

//     return (
//         <div className="flex flex-col items-center gap-4">
//             <h1 className="text-3xl">
//                 Parent Component {heavyCalculation}
//             </h1>
//             Ener ur name : <input type="text" className="border" onChange={(e) => setName(e.target.value)} />
//             <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={() => setPnum(prev => prev + 1)}
//             >
//                 Increment
//             </button>
//             <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={() => setPnum(0)}
//             >
//                 set to 0
//             </button>
//             {/* <Child pNum={pNum} /> */}
//             <Child sayHi={sayHi} />
//         </div>
//     );
// };

// // const Child = React.memo(({ pNum }) => { // Component Memoization
// const Child = React.memo(({sayHi}) => { // Component Memoization
//     useEffect(() => {
//         console.log("child re-rendered");
//     });
//     return <>
//         <h1 className="text-3xl">in Child Component pNum :{ }</h1>
//         <button className="btn btn-primary" onClick={sayHi}>say Hi</button>
//     </>
// });