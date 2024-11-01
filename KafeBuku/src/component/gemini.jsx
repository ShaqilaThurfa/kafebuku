import { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyA9lnkXWwK_bM2-VFjxhTRO_dHEKrwWrCM")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const GeminiChat = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const handleSend = async () => {
    try {
      const result = await model.generateContent(prompt + " Berikan jawaban rekomendasi novel dengan tema young adult, judulnya aja jawab sesingkat-singkatnya")
      setResponse(result.response.text())
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
    <div className="mb-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Recommend me a book about..."
              style={{ borderRadius: "20px", border: "1px solid #ccc", width:"250px", height:"120px" }}
            />
          </div>
          <button onClick={handleSend} className="btn btn-success w-100" style={{ borderRadius: "20px" }}>
            Send
          </button>
          <p>Respon: {response}</p>
          </div>
  )
}

export default GeminiChat