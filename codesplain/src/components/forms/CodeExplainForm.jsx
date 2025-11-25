import { useActionState } from "react";
import { explain } from "../../actions";
import CodeExplanation from "../CodeExplanation";
import Error from "../Error";

const CodeExplainForm = () => {
    const [formState, formAction, isPending] = useActionState(explain, null);
    return (
        <div className= "w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg text-black">
            <form action= {formAction}>
                <label className= "block mb-2 font-semibold">Language:</label>
                <select name= "language" className= "border rounded-lg p2 w-full mb-4 bg-transperent">
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="C">C</option>
                </select>
                <textarea name= "code" required placeholder= "Paste your code here..." className= "border rounded-lg w-full p-3 font-mono text-sm bg-transparent min-h-[300]px"
                defaultValue={formState?.data?.code ? formState.data.code : ""}></textarea>
                <button type= "submit" disabled={isPending} className= "mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition diabled:opacity-50"
                >{isPending ? "Explaining..." : "Explain Code"}</button>
            </form>
            {
                isPending ? (
                    <p className="bg-gray-300 my-3 w-64 p-2 rounded-sm">Thinking...</p>
                ) : formState?.success ? (
                    <CodeExplanation explanation={formState?.data.explanation}/>
                ) : (
                    formState?.success === false && (
                        <Error error={formState?.error}/>
                    )
                )
            }
        </div>
    )
};
export default CodeExplainForm;