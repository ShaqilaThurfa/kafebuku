import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI("AIzaSyA9lnkXWwK_bM2-VFjxhTRO_dHEKrwWrCM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const GeminiChat = ({ novels }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    try {
      setIsLoading(true);
      const novelTitles = novels.map((novel) => novel.title).join(", ");

      const result = await model.generateContent(
        `Here are some novel titles ${novelTitles},Recommend me a book about ${prompt} based on the ${novelTitles} novels.Don't answer with any another title that not in ${novelTitles}. Answer just the title in point format
          example: 
          *Novel Title 1
          *Novel Title 2
          and so on`
      );
      setResponse(result.response.text());
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setResponse("");
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <div className="mb-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Recommend me a book about..."
          className="border border-gray-300 h-[60px] w-[90%] md:w-[300px] text-lg text-center rounded-lg"
        />

      </div>

      <div className="flex justify-center">
        
        {response ? (
          <button
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold h-[40px] w-[100px] text-lg rounded-full flex justify-center items-center"
          >
            Reset
          </button>
        ) : (
          <button
            onClick={handleSend}
            className="btn btn-success flex h-[40px] w-[90%] md:w-[100px] text-lg rounded-full justify-center items-center"
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        )}
      </div>

      {isLoading && (
        <div className="mt-3 text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {response && !isLoading && (
        <div className="p-5 bg-white w-full rounded-lg shadow-lg">
          <p className="self-start mt-0 text-black">
            Response:
            <ReactMarkdown>{response}</ReactMarkdown>
          </p>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
