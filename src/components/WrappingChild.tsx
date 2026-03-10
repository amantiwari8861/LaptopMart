import type React from "react";

const WrappingChild = () => {
    return (
        <div>
            <Parent>
                <Child data={"Apple"} />
                <Child data={"Mango"} />
                <Child data={"Papaya"} />
            </Parent>

        </div>
    )
}
export default WrappingChild
const Parent = ({ children }: { children: React.ReactNode }) => {
    return <>
        <h1 className="text-3xl">Hii i am Parent </h1>
        <ul>
            {children}
        </ul>
    </>
};
const Child = ({ data }: { data: string }) => {
    return <li style={{ color: "red", backgroundColor: "greenyellow", listStyle: "disc", marginLeft: "30px" }}>
        {data}
    </li>
}