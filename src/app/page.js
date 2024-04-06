"use client";
import Spinner from "./Spinner";
import { useState } from "react";
import { HfInference } from "@huggingface/inference";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inference = new HfInference("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");
  const model = "Salesforce/blip-image-captioning-large";

  async function generatePrediction() {
    if (!input.trim()) {
      alert("Please enter a valid input.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(input);
      const dataBlob = await response.blob();
      const prediction = await inference.textGeneration({
        data: dataBlob,
        model: model,
        options: null,
      });
      console.log(prediction.generated_text);
      setResult(prediction.generated_text);
    } catch (error) {
      console.error("Error occurred:", error);
      alert(
        "An error occurred while generating prediction. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleAddStock() {
    console.log(input);
  }

  return (
    <main className="h-screen w-screen bg-blue-300">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="text-black text-6xl mb-6">AI Image Identifier</div>
        <div className="text-center mb-4">
          Enter the image URL and AI will identify it
        </div>
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            placeholder="Enter image URL"
            className="h-10 px-4 rounded-md border text-black border-gray-400 focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-center mb-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={generatePrediction}
            >
              Generate
            </button>
          )}
        </div>
        <div className="text-center">{result}</div>
      </div>
    </main>
  );
}
