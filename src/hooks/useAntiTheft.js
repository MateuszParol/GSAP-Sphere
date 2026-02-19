import { useEffect } from 'react';

const useAntiTheft = () => {
    useEffect(() => {
        // 1. Disable Right Click
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // 2. Disable Keyboard Shortcuts
        const handleKeyDown = (e) => {
            // F12
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                return;
            }

            // Ctrl+Shift+I (Inspector) or Ctrl+Shift+J (Console) or Ctrl+Shift+C (Element)
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
                e.preventDefault();
                return;
            }

            // Ctrl+U (View Source)
            if (e.ctrlKey && (e.key === 'U' || e.keyCode === 85)) {
                e.preventDefault();
                return;
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        // 3. Console Warning
        const warningTitle = "Stop!";
        const warningMsg = "This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or hack someone's account, it is a scam and will give them access to your account.";

        console.log(`%c${warningTitle}`, "color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 0px black;");
        console.log(`%c${warningMsg}`, "font-size: 18px; color: white; background: red; padding: 5px; border-radius: 5px;");

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
};

export default useAntiTheft;
