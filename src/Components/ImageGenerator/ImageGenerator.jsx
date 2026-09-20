import "./ImageGenerator.css";
import demoImage from "../Assets/demoImage.png";
import { useRef, useState } from "react";
import { InferenceClient } from "@huggingface/inference";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("/");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Describe something first to generate image");
      return 0;
    }
    setLoading(true);
    const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);

    const imageBlob = await client.textToImage({
      model: "Qwen/Qwen-Image",
      inputs: prompt,
    });

    const imageUrl = URL.createObjectURL(imageBlob);

    setImage(imageUrl);
    setLoading(false);
    setPrompt("");
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI image <span>generator</span>
      </div>
      <div className="imgLoading">
        <div className="img">
          <img
            src={image === "/" ? demoImage : image}
            alt="defaultImage Here"
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading.....
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          value={prompt}
          type="text"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          className="search-input"
          placeholder="Describe what you want to see"
        />
        <div onClick={generateImage} className="generate-btn">
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
