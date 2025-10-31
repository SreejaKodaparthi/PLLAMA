// // backend/src/lib/modelClient.js
// import fetch from "node-fetch";

// const MODEL_URL = "https://unmelancholy-kylah-higher.ngrok-free.dev/generate";

// async function modelClient(prompt) {
//   try {
//     const res = await fetch(MODEL_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({prompt}),
//     });

//     if (!res.ok) throw new Error(`Model API returned status ${res.status}`);

//     const data = await res.json();

//     // Always return string
//     if (typeof data.response === "string") {
//       return data.response;
//     } else if (data.response?.text) {
//       return data.response.text;
//     } else {
//       return JSON.stringify(data.response);
//     }
//   } catch (err) {
//     console.error("modelClient error:", err);
//     return "❌ Failed to get response from AI model.";
//   }
// }

// export default modelClient;


// backend/src/lib/modelClient.js
import fetch from "node-fetch";

const MODEL_URL = "https://unmelancholy-kylah-higher.ngrok-free.dev/generate";

async function modelClient(prompt) {
  try {
    const res = await fetch(MODEL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) throw new Error(`Model API returned status ${res.status}`);

    const data = await res.json();

    // Match Flask response structure
    if (typeof data.output === "string") {
      return data.output;
    } else if (data.output?.text) {
      return data.output.text;
    } else if (typeof data.response === "string") {
      return data.response; // fallback if backend uses `response`
    } else {
      return JSON.stringify(data.output || data.response);
    }

  } catch (err) {
    console.error("modelClient error:", err);
    return "❌ Failed to get response from AI model.";
  }
}

export default modelClient;

