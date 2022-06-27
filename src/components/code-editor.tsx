import MonacoEditor from "@monaco-editor/react";
import React from "react";

interface CodeEditorProps {
  initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (
    <MonacoEditor
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      language="javascript"
      theme="dark"
      height={"300px"}
      value={initialValue}
    />
  );
};

export default CodeEditor;
