import { useState } from "react";

/* Template Text */
const PLACEHOLDER_TEXT = "Markdown Code Extractor\n(for Bing GPT)";
const PASTE_TEXT =
  "CTRL+V to paste Bing Chat's full response,\n" +
  "extracts + copies code back to clipboard";

export const CodeExtractor = () => {
  const [text, setText] = useState("");

  function setTextAreaHeightAndWidth(el, value) {
    /* background and outline */
    if (!value) {
      el.style.background = "transparent";
      el.style.outline = "none";
    } else {
      el.style.background = "black";
      el.style.outline = "1px solid var(--white)";
    }

    /* height and width */
    const lineHeight = parseInt(
      getComputedStyle(el).getPropertyValue("line-height")
    );
    const lines = value.split("\n");
    el.style.height = `${lines.length * lineHeight}px`;

    let maxWidth = 0;
    const span = document.createElement("span");
    span.style.font = getComputedStyle(el).getPropertyValue("font");
    document.body.appendChild(span);
    lines.forEach((line) => {
      span.textContent = line;
      const width = span.offsetWidth;
      if (width > maxWidth) {
        maxWidth = width;
      }
    });
    document.body.removeChild(span);
    el.style.width = `${maxWidth}px`;
  }

  const handleChange = (e) => {
    const textarea = e.target;
    textarea.style.textAlign = textarea.value ? "left" : "right";
    const code = extractCodeBlocks(textarea.value).trim();

    console.log(code);

    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        setText(code);
        setTextAreaHeightAndWidth(e.target, code);
      });
    } else {
      setText(textarea.value);
      setTextAreaHeightAndWidth(e.target, textarea.value);
    }
  };

  function handleMouseEnter(e) {
    e.target.placeholder = PASTE_TEXT;
    e.target.focus();
  }

  function handleMouseLeave(e) {
    e.target.placeholder = PLACEHOLDER_TEXT;
    if (!e.target.value) {
      e.target.style.textAlign = "right";
      e.target.blur();
    }
  }

  function handleBlur(e) {
    e.target.value = "";
    setTextAreaHeightAndWidth(e.target, "");
    handleMouseLeave(e);
  }

  return (
    <div className={"codebox"}>
      <textarea
        value={text}
        onChange={handleChange}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={(e) => handleMouseLeave(e)}
        onBlur={(e) => handleBlur(e)}
        placeholder={PLACEHOLDER_TEXT}
      ></textarea>
    </div>
  );
};

function extractCodeBlocks(markdown) {
  const regex = /```[a-z]*\n([\s\S]*?)\n```/gm;
  let match;
  let codeBlocks = [];
  while ((match = regex.exec(markdown)) !== null) {
    codeBlocks.push(match[1]);
  }
  console.log(codeBlocks.join("\n\n"));
  return codeBlocks.join("\n\n");
}
