import {useState} from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CodeExplanation = ({explanation}) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        if(!explanation) return;
        navigator.clipboard.writeText(explanation);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="w-full max-w-4xl mt-6 bg-gray-50 p-6 rounded-2xl shadow-lg relative">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold mb-2">Explanation:</h2>
                <button
                    type='button'
                    onClick={copyToClipboard}
                    className='text-gray-600 hover:text-black text-sm'
                    aria-label='Copy'
                >
                    {copied ? (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                className="w-4 h-4 text-green-600"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414L8.5 11.586l6.543-6.543a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-green-700 text-xs font-semibold">
                                Copied!
                            </span>
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                className="w-4 h-4"
                                fill="currentColor"
                            >
                                <path d="M6 2a2 2 0 00-2 2v9h2V4h7V2H6z" />
                                <path d="M8 6a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2V6z" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
            <Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
        </div>
    )
}

export default CodeExplanation;