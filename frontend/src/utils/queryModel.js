// frontend/src/utils/queryModel.js
export async function queryModel({prompt}) {
  try {
    const res = await fetch("http://localhost:5000/generate", { // Or your ngrok URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({prompt}),
    });

    if (!res.ok) throw new Error(`Model API returned status ${res.status}`);

    const data = await res.json();

    // Ensure we return string only
    if (typeof data.output === "string") {
      return data.output;
    } else if (data.output?.text) {
      return data.output.text;
    } else {
      return JSON.stringify(data.output); // fallback
    }
  } catch (err) {
    console.error("queryModel error:", err);
    return "❌ Failed to get response from AI model.";
  }
}
