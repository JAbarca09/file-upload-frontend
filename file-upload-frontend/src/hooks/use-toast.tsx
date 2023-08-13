import { useState, useEffect } from "react";

const useToast = (initialContent = "") => {
    const [content, setContent] = useState<string>(initialContent);
    const [showToast, setShowToast] = useState<boolean>(false);

      useEffect(() => {
        if (content) {
          setShowToast(true);

          const timer = setTimeout(() => {
            setShowToast(false);
            setContent("");
          }, 5000);

          return () => clearTimeout(timer);
        }
      }, [content]);

    const showToastWithContent = (newContent: string) => {
        setContent(newContent);
        setShowToast(true);
    };

    return { showToast, content, showToastWithContent };
};

export default useToast;
