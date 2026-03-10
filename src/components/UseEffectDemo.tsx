import { useEffect, useState } from "react"

const UseEffectDemo = () => {

    // const [num, setNum] = useState(0);
    // const [name, setName] = useState('');
    const [clock, setClockTime] = useState(new Date());
    // useEffect(() => {
    //     console.log("num=", num);
    // }); // it will be triggered on every change in state or prop

    // useEffect(() => {
    //     console.log("Component mounted!");
    // }, []);// it will run only 1st time when component is mounted

    // useEffect(() => {
    //     return () => console.log("Component unmounted!"); // it will run when component is ummounted/ removed from DOM/UI
    // }, []); 

    // useEffect(() => {
    //     console.log('num = ', num);
    // }, [num]);
    // useEffect(() => {
    //     console.log('num = ', num," name :",name);
    // }, [num,name]);

    useEffect(() => {
        const clockReference = setInterval(() => {
            const now = new Date();
            console.log(now);
            setClockTime(now);
        }, 1000);

        return () => clearInterval(clockReference);
    }, []);   

    return (
        <div className="text-center py-12">
            <h1 className="text-3xl">{clock.toString()}</h1>
            {/* <h1>Num :{num} Name : {name} </h1>
            <button className="btn btn-primary"
                onClick={() => setNum(num + 1)}>increment</button>
            <input type="text" onChange={(e) => setName(e.target.value)}
                className="border"
            /> */}

        </div>
    )
}

export default UseEffectDemo