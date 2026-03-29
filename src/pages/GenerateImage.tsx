import { useState } from "react"
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const GenerateImage = () => {
    const [isLoading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [base64Image, setImageBase64] = useState('');
    const generateImage = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL + "/api/v1/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: prompt
                }),
            });

            const { base64 } = await res.json();
            console.log(base64);

            setImageBase64(base64);
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="flex flex-col align-middle justify-center mb-12 mt-1">
                <div className="image-preview flex justify-center">
                    {base64Image && (
                        <img src={`data:image/png;base64,${base64Image}`} alt="preview" />
                    )}
                </div>
                <div className="chat-box flex flex-col">
                    <div className="box1 text-center">
                        <textarea rows={3} cols={50} className="border rounded px-3 py-2"
                            onChange={(e) => setPrompt(e.target.value)}
                            value={prompt}
                        >
                        </textarea>
                    </div>
                    <button className="btn btn-primary mx-auto" onClick={generateImage}>{isLoading ? "Generating..." : "Generate"}</button>
                </div>
            </div >
        </>
    )
}

export default GenerateImage    