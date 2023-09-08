import { useState } from "react";

import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Canvas from "./canvas";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Editor />
    </main>
  );
}

export default App;
